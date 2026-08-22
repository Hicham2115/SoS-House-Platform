<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Demande;
use App\Models\DemandeUnlock;
use App\Models\Notification;
use App\Models\Offer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OfferController extends Controller
{
    // Only the winning offer reveals the provider's phone to the client
    // (and the client's phone/address to the provider) — see acceptedOnly().
    private function acceptedOnly($offers): void
    {
        foreach ($offers as $offer) {
            if ($offer->status === 'accepted') {
                continue;
            }

            // Guard on relationLoaded() — touching an unloaded relation here
            // would lazy-load it (N+1) and pull it into the JSON response.
            if ($offer->relationLoaded('user')) {
                $offer->user?->makeHidden('phone');
            }

            if ($offer->relationLoaded('demande')) {
                $offer->demande?->makeHidden('adresse');

                if ($offer->demande?->relationLoaded('user')) {
                    $offer->demande->user?->makeHidden('phone');
                }
            }
        }
    }

    // All offers received across every demande the client owns.
    public function mine(Request $request): JsonResponse
    {
        $offers = Offer::whereHas('demande', fn($q) => $q->where('user_id', $request->user()->id))
            ->with([
                'demande:id,category,subcategory,ville,adresse,urgency,budget_min,budget_max,status,created_at',
                'user:id,name,avatar,niveau,phone',
            ])
            ->latest()
            ->get();

        $this->acceptedOnly($offers);

        return response()->json($offers);
    }

    public function index(Request $request, Demande $demande): JsonResponse
    {
        abort_unless($demande->user_id === $request->user()->id, 403);

        $offers = $demande->offers()->with('user:id,name,avatar,niveau,phone')->latest()->get();

        $this->acceptedOnly($offers);

        return response()->json($offers);
    }

    // All offers a provider has submitted, across every demande they bid on.
    public function submitted(Request $request): JsonResponse
    {
        $offers = Offer::where('user_id', $request->user()->id)
            ->with([
                'demande:id,category,subcategory,ville,adresse,urgency,budget_min,budget_max,status,created_at,user_id',
                'demande.user:id,name,phone',
            ])
            ->latest()
            ->get();

        $this->acceptedOnly($offers);

        return response()->json($offers);
    }

    public function store(Request $request, Demande $demande): JsonResponse
    {
        $user = $request->user();

        abort_unless($user->role === 'artisan', 403);

        $unlocked = DemandeUnlock::where('demande_id', $demande->id)
            ->where('user_id', $user->id)
            ->exists();

        abort_unless($unlocked, 403, 'Débloquez la demande avant de proposer un prix.');

        $existing = Offer::where('demande_id', $demande->id)
            ->where('user_id', $user->id)
            ->exists();

        // One attempt at a time — resubmitting requires withdrawing first.
        abort_if($existing, 409, 'Vous avez déjà proposé un prix pour cette demande. Retirez votre offre pour en envoyer une nouvelle.');

        $validated = $request->validate([
            'price' => ['required', 'integer', 'min:1'],
            'message' => ['nullable', 'string', 'max:1000'],
        ]);

        $offer = Offer::create(
            $validated + ['demande_id' => $demande->id, 'user_id' => $user->id, 'status' => 'pending']
        );

        Notification::create([
            'user_id' => $demande->user_id,
            'type' => 'offer_received',
            'title' => 'Nouvelle offre reçue',
            'body' => "{$user->name} a proposé {$offer->price} MAD.",
            'data' => ['demande_id' => $demande->id, 'offer_id' => $offer->id],
        ]);

        return response()->json($offer, 201);
    }

    // A provider can withdraw their own offer while it's still pending, to
    // free up the "one attempt" slot and submit a new price afterward.
    public function destroy(Request $request, Offer $offer): JsonResponse
    {
        abort_unless($offer->user_id === $request->user()->id, 403);
        abort_unless($offer->status === 'pending', 422, 'Cette offre ne peut plus être retirée.');

        $offer->delete();

        return response()->json(['message' => 'Offre retirée.']);
    }

    public function accept(Request $request, Offer $offer): JsonResponse
    {
        $demande = $offer->demande;

        abort_unless($demande->user_id === $request->user()->id, 403);

        DB::transaction(function () use ($offer, $demande) {
            Offer::where('demande_id', $demande->id)
                ->where('id', '!=', $offer->id)
                ->update(['status' => 'rejected']);

            $offer->update(['status' => 'accepted']);
            $demande->update(['status' => 'assignee']);
        });

        Notification::create([
            'user_id' => $offer->user_id,
            'type' => 'offer_accepted',
            'title' => 'Offre acceptée',
            'body' => "Vous avez été choisi pour la demande de {$demande->user->name}.",
            'data' => ['demande_id' => $demande->id, 'offer_id' => $offer->id],
        ]);

        return response()->json($offer->fresh());
    }
}
