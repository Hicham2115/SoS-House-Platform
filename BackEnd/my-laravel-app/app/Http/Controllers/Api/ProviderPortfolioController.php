<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProviderCertification;
use App\Models\ProviderRealisation;
use App\Models\ProviderTravauxPhoto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProviderPortfolioController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        abort_unless($user->role === 'artisan', 403);

        return response()->json([
            'certifications' => $user->certifications()->latest()->get(),
            'realisations' => $user->realisations()->latest()->get(),
            'travaux_photos' => $user->travauxPhotos()->latest()->get(),
        ]);
    }

    public function storeCertification(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'artisan', 403);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'file' => ['required', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:5120'],
            'organisme' => ['nullable', 'string', 'max:255'],
        ]);

        $validated['file'] = Storage::disk('public')->url(
            $request->file('file')->store('provider-certifications', 'public')
        );

        $certification = $request->user()->certifications()->create($validated);

        return response()->json($certification, 201);
    }

    public function destroyCertification(Request $request, ProviderCertification $certification): JsonResponse
    {
        abort_unless($certification->user_id === $request->user()->id, 403);

        $certification->delete();

        return response()->json(['message' => 'Certification supprimée.']);
    }

    public function storeRealisation(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'artisan', 403);

        $validated = $request->validate([
            'photo_avant' => ['required', 'image', 'max:5120'],
            'photo_apres' => ['required', 'image', 'max:5120'],
            'description' => ['nullable', 'string', 'max:255'],
            'categorie' => ['nullable', 'string', 'max:255'],
        ]);

        $validated['photo_avant'] = Storage::disk('public')->url(
            $request->file('photo_avant')->store('provider-realisations', 'public')
        );
        $validated['photo_apres'] = Storage::disk('public')->url(
            $request->file('photo_apres')->store('provider-realisations', 'public')
        );

        $realisation = $request->user()->realisations()->create($validated);

        return response()->json($realisation, 201);
    }

    public function destroyRealisation(Request $request, ProviderRealisation $realisation): JsonResponse
    {
        abort_unless($realisation->user_id === $request->user()->id, 403);

        $realisation->delete();

        return response()->json(['message' => 'Réalisation supprimée.']);
    }

    public function storeTravauxPhoto(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'artisan', 403);

        $validated = $request->validate([
            'photo' => ['required', 'image', 'max:5120'],
            'legende' => ['nullable', 'string', 'max:255'],
        ]);

        $validated['photo'] = Storage::disk('public')->url(
            $request->file('photo')->store('provider-travaux-photos', 'public')
        );

        $photo = $request->user()->travauxPhotos()->create($validated);

        return response()->json($photo, 201);
    }

    public function destroyTravauxPhoto(Request $request, ProviderTravauxPhoto $travauxPhoto): JsonResponse
    {
        abort_unless($travauxPhoto->user_id === $request->user()->id, 403);

        $travauxPhoto->delete();

        return response()->json(['message' => 'Photo supprimée.']);
    }
}
