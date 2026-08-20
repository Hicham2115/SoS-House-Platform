<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
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
        ]);

        $user = $request->user();
        $user->update($validated);

        return response()->json($user);
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
