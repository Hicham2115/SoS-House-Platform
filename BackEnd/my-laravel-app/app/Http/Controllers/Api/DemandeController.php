<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DemandeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(
            $request->user()->demandes()->latest()->get()
        );
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
        $validated = $request->validate([
            'category' => ['required', 'string', 'max:255'],
            'subcategory' => ['required', 'string', 'max:255'],
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
            'budget_min' => ['nullable', 'integer', 'min:0'],
            'budget_max' => ['nullable', 'integer', 'min:0'],
            'invoice_required' => ['required', 'string', 'in:aucune,simple,tva'],
        ]);

        $demande = $request->user()->demandes()->create($validated);

        return response()->json($demande, 201);
    }
}
