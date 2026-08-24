<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Demande;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Artisans whose niveau requires document review before they can operate.
    private const VERIFIABLE_NIVEAUX = ['n1', 'n2'];

    public function overview(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'admin', 403);

        return response()->json([
            'total_clients' => User::where('role', 'client')->count(),
            'artisans_par_niveau' => [
                'n0' => User::where('role', 'artisan')->where('niveau', 'n0')->count(),
                'n1' => User::where('role', 'artisan')->where('niveau', 'n1')->count(),
                'n2' => User::where('role', 'artisan')->where('niveau', 'n2')->count(),
            ],
            'demandes_actives' => Demande::where('status', 'publiee')->count(),
            'missions_terminees' => Offer::where('status', 'accepted')->count(),
            'demandes_recentes' => Demande::with('user:id,name')
                ->latest()
                ->take(10)
                ->get(['id', 'category', 'user_id', 'status', 'created_at']),
        ]);
    }

    public function users(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'admin', 403);

        $users = User::latest()->get([
            'id', 'name', 'email', 'phone', 'role', 'niveau',
            'ville', 'credits', 'verification_status', 'created_at',
        ]);

        return response()->json($users);
    }

    public function pendingVerifications(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'admin', 403);

        $artisans = User::where('role', 'artisan')
            ->whereIn('niveau', self::VERIFIABLE_NIVEAUX)
            ->where('verification_status', 'pending')
            ->oldest()
            ->get(['id', 'name', 'phone', 'niveau', 'created_at']);

        return response()->json($artisans);
    }

    public function showVerification(Request $request, User $artisan): JsonResponse
    {
        abort_unless($request->user()->role === 'admin', 403);
        abort_unless($artisan->role === 'artisan' && in_array($artisan->niveau, self::VERIFIABLE_NIVEAUX), 404);

        return response()->json($artisan->only([
            'id', 'name', 'phone', 'niveau', 'verification_status', 'verification_rejection_reason', 'created_at',
            'rc', 'secteur_activite', 'nom_commercial',
            'carte_auto_entrepreneur', 'cin_recto', 'cin_verso', 'selfie',
        ]));
    }

    public function approveVerification(Request $request, User $artisan): JsonResponse
    {
        abort_unless($request->user()->role === 'admin', 403);
        abort_unless($artisan->role === 'artisan' && in_array($artisan->niveau, self::VERIFIABLE_NIVEAUX), 404);

        $artisan->update([
            'verification_status' => 'approved',
            'verification_rejection_reason' => null,
        ]);

        return response()->json($artisan);
    }

    public function rejectVerification(Request $request, User $artisan): JsonResponse
    {
        abort_unless($request->user()->role === 'admin', 403);
        abort_unless($artisan->role === 'artisan' && in_array($artisan->niveau, self::VERIFIABLE_NIVEAUX), 404);

        $validated = $request->validate([
            'reason' => ['required', 'string', 'max:1000'],
        ]);

        $artisan->update([
            'verification_status' => 'rejected',
            'verification_rejection_reason' => $validated['reason'],
        ]);

        return response()->json($artisan);
    }
}
