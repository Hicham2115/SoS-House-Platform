<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Demande;
use App\Models\DemandeUnlock;
use App\Models\Offer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OfferController extends Controller
{
    // All offers received across every demande the client owns.
    public function mine(Request $request): JsonResponse
    {
        $offers = Offer::whereHas('demande', fn ($q) => $q->where('user_id', $request->user()->id))
            ->with([
                'demande:id,category,subcategory,ville,adresse,urgency,budget_min,budget_max,status,created_at',
                'user:id,name,avatar,niveau',
            ])
            ->latest()
            ->get();

        return response()->json($offers);
    }

    public function index(Request $request, Demande $demande): JsonResponse
    {
        abort_unless($demande->user_id === $request->user()->id, 403);

        return response()->json(
            $demande->offers()->with('user:id,name,avatar,niveau')->latest()->get()
        );
    }

    public function store(Request $request, Demande $demande): JsonResponse
    {
        $user = $request->user();

        abort_unless($user->role === 'artisan', 403);

        $unlocked = DemandeUnlock::where('demande_id', $demande->id)
            ->where('user_id', $user->id)
            ->exists();

        abort_unless($unlocked, 403, 'Débloquez la demande avant de proposer un prix.');

        $validated = $request->validate([
            'price' => ['required', 'integer', 'min:1'],
            'message' => ['nullable', 'string', 'max:1000'],
        ]);

        $offer = Offer::updateOrCreate(
            ['demande_id' => $demande->id, 'user_id' => $user->id],
            $validated + ['status' => 'pending']
        );

        return response()->json($offer, 201);
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

        return response()->json($offer->fresh());
    }
}
