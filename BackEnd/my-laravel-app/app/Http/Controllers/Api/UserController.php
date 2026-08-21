<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($request->user()->id)],
            'phone' => ['nullable', 'string', 'max:20'],
            'profession' => ['nullable', 'string', 'max:255'],
            'account_type' => ['nullable', 'string', 'in:particulier,professionnel,entreprise'],
            'raison_sociale' => ['nullable', 'string', 'max:255'],
            'ice' => ['nullable', 'string', 'max:255'],
            'nom_du_referant' => ['nullable', 'string', 'max:255'],
            'ville' => ['nullable', 'string', 'max:255'],
            'quartier' => ['nullable', 'string', 'max:255'],
            'adresse' => ['nullable', 'string', 'max:255'],
            'etage' => ['nullable', 'string', 'max:255'],
            'notification_Channel' => ['nullable', 'string', 'in:whatsapp,email'],
            'avatar' => ['nullable', 'string', 'max:255'],
            'niveau' => ['nullable', 'string', 'in:n0,n1,n2'],

            // Provider onboarding — Zone and Profil steps.
            'radius_km' => ['nullable', 'integer', 'min:1', 'max:100'],
            'provider_categories' => ['nullable', 'array'],
            'provider_categories.*' => ['string', 'max:255'],
            'disponibilite_jours' => ['nullable', 'array'],
            'disponibilite_jours.*' => ['string', 'max:255'],
            'heure_debut' => ['nullable', 'string', 'max:255'],
            'heure_fin' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string', 'max:2000'],
            'annees_experience' => ['nullable', 'integer', 'min:0', 'max:80'],
            'specialites' => ['nullable', 'array'],
            'specialites.*' => ['string', 'max:255'],
        ]);

        $user = $request->user();
        $user->update($validated);

        return response()->json($user);
    }

    public function updatePassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'string'],
            'new_password' => ['required', 'string', Password::defaults()],
        ]);

        $user = $request->user();

        if (! Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'message' => 'Mot de passe actuel incorrect.',
            ], 422);
        }

        $user->update(['password' => $validated['new_password']]);

        return response()->json(['message' => 'Mot de passe mis à jour.']);
    }

    public function uploadAvatar(Request $request): JsonResponse
    {
        $request->validate([
            'avatar' => ['required', 'image', 'max:2048'],
        ]);

        $path = $request->file('avatar')->store('avatars', 'public');

        return response()->json([
            'avatar_url' => Storage::disk('public')->url($path),
        ]);
    }
}
