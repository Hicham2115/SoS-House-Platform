<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', Password::defaults()],
            'phone' => ['string', 'max:20'],
            'role' => ['required', 'string', 'in:admin,client,artisan'],
            'profession' => ['string', 'max:255'],
            'avatar' => ['string', 'max:255'],
            'raison_sociale' => ['string', 'max:255'],
            'ice' => ['string', 'max:255'],
            'ville' => ['string', 'max:255'],
            'quartier' => ['string', 'max:255'],
            'adresse' => ['string', 'max:255'],
            'etage' => ['string', 'max:255'],
            'nom_du_referant' => ['string', 'max:255'],

            // Provider verification tier: n0 particulier / n1 auto-entrepreneur / n2 société.
            'niveau' => ['nullable', 'string', 'in:n0,n1,n2'],
            'rc' => ['required_if:niveau,n2', 'string', 'max:255'],
            'secteur_activite' => ['required_if:niveau,n2', 'string', 'max:255'],
            'nom_commercial' => ['required_if:niveau,n2', 'string', 'max:255'],
            'carte_auto_entrepreneur' => ['required_if:niveau,n1', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:5120'],
            'cin_recto' => ['required_if:niveau,n1,n2', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:5120'],
            'cin_verso' => ['required_if:niveau,n1,n2', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:5120'],
            'selfie' => ['required_if:niveau,n1,n2', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:5120'],
        ]);

        foreach (['carte_auto_entrepreneur', 'cin_recto', 'cin_verso', 'selfie'] as $field) {
            if ($request->hasFile($field)) {
                $path = $request->file($field)->store('verification-documents', 'public');
                $validated[$field] = Storage::disk('public')->url($path);
            }
        }

        $user = User::create($validated);

        return response()->json($user, 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Identifiants invalides.',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnexion réussie.']);
    }
}
