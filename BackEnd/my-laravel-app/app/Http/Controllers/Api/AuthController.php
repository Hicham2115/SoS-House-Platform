<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
            'account_type' => ['string', 'in:particulier,entreprise'],
            'raison_sociale' => ['string', 'max:255'],
            'ice' => ['string', 'max:255'],
            'ville' => ['string', 'max:255'],
            'quartier' => ['string', 'max:255'],
            'adresse' => ['string', 'max:255'],
            'etage' => ['string', 'max:255'],
        ]);

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
}
