<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Demande;


class DemandeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(
            $request->user()->demandes()->latest()->get()
        );
    }

    // Higher rank sees everything a lower rank sees, plus its own tier.
    private const NIVEAU_RANK = ['n0' => 0, 'n1' => 1, 'n2' => 2];

    // Minimum provider niveau required to see a demande with this invoice_required.
    private const INVOICE_MIN_RANK = ['aucune' => 0, 'simple' => 1, 'tva' => 2];

    public function available(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'artisan', 403);

        $userRank = self::NIVEAU_RANK[$request->user()->niveau] ?? 0;

        $demandes = Demande::latest()->get()->filter(
            fn (Demande $demande) => $userRank >= (self::INVOICE_MIN_RANK[$demande->invoice_required] ?? 0)
        )->values();

        return response()->json($demandes);
    }

    public function uploadPhoto(Request $request): JsonResponse
    {
        $request->validate([
            'photo' => ['required', 'image', 'max:5120'],
        ]);

        $path = $request->file('photo')->store('demande-photos', 'public');

        return response()->json([
            'photo_url' => Storage::disk('public')->url($path),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate($this->rules());

        // Subcategory picker is temporarily disabled on the frontend, but the
        // column is still NOT NULL in the DB — default it until it's re-enabled.
        $validated['subcategory'] = $validated['subcategory'] ?? '';

        $demande = $request->user()->demandes()->create($validated);

        return response()->json($demande, 201);
    }

    public function show(Request $request, Demande $demande): JsonResponse
    {
        abort_unless($demande->user_id === $request->user()->id, 403);

        return response()->json($demande);
    }

    public function update(Request $request, Demande $demande): JsonResponse
    {
        abort_unless($demande->user_id === $request->user()->id, 403);

        $validated = $request->validate($this->rules());

        $demande->update($validated);

        return response()->json($demande);
    }

    public function destroy(Request $request, Demande $demande): JsonResponse
    {
        abort_unless($demande->user_id === $request->user()->id, 403);

        $demande->delete();

        return response()->json(['message' => 'Demande supprimée.']);
    }

    private function rules(): array
    {
        return [
            'category' => ['required', 'string', 'max:255'],
            // Subcategory selection temporarily disabled on the frontend.
            // 'subcategory' => ['required', 'string', 'max:255'],
            'property_type' => ['nullable', 'string', 'max:255'],
            'qualification' => ['nullable', 'array'],
            'photos' => ['nullable', 'array'],
            'photos.*' => ['string'],
            'description' => ['required', 'string', 'min:10', 'max:500'],
            'ville' => ['required', 'string', 'max:255'],
            'adresse' => ['required', 'string', 'max:255'],
            'etage' => ['nullable', 'string', 'max:255'],
            'urgency' => ['required', 'string', 'in:programmee,sous-48h,urgente'],
            'scheduled_date' => ['nullable', 'date'],
            'scheduled_time' => ['nullable', 'string', 'max:255'],
            'budget_min' => ['required', 'integer', 'min:0'],
            'budget_max' => ['required', 'integer', 'min:0', 'gte:budget_min'],
            'invoice_required' => ['required', 'string', 'in:aucune,simple,tva'],
        ];
    }
}
