<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DemandeController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\OfferController;
use App\Http\Controllers\Api\ProviderPortfolioController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public auth endpoints.
Route::post('/users', [AuthController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // Account.
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::patch('/user', [UserController::class, 'update']);
    Route::post('/user/avatar', [UserController::class, 'uploadAvatar']);
    Route::put('/user/password', [UserController::class, 'updatePassword']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Demandes (client requests) and the provider unlock flow.
    Route::get('/demandes', [DemandeController::class, 'index']);
    Route::get('/demandes/disponibles', [DemandeController::class, 'available']);
    Route::post('/demandes', [DemandeController::class, 'store']);
    Route::post('/demandes/photos', [DemandeController::class, 'uploadPhoto']);
    Route::get('/demandes/{demande}', [DemandeController::class, 'show']);
    Route::put('/demandes/{demande}', [DemandeController::class, 'update']);
    Route::delete('/demandes/{demande}', [DemandeController::class, 'destroy']);
    Route::post('/demandes/{demande}/unlock', [DemandeController::class, 'unlock']);

    // Offers: providers propose a price on an unlocked demande, clients pick one.
    Route::get('/demandes/{demande}/offers', [OfferController::class, 'index']);
    Route::post('/demandes/{demande}/offers', [OfferController::class, 'store']);
    Route::get('/offers', [OfferController::class, 'mine']);
    Route::get('/offers/submitted', [OfferController::class, 'submitted']);
    Route::delete('/offers/{offer}', [OfferController::class, 'destroy']);
    Route::post('/offers/{offer}/accept', [OfferController::class, 'accept']);

    // Messaging: chat opens once a demande has an accepted offer (a "mission").
    Route::get('/conversations', [MessageController::class, 'conversations']);
    Route::get('/demandes/{demande}/messages', [MessageController::class, 'index']);
    Route::post('/demandes/{demande}/messages', [MessageController::class, 'store']);

    // Notifications.
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{notification}/read', [NotificationController::class, 'markRead']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllRead']);

    // Contact / support form.
    Route::post('/contacts', [ContactController::class, 'store']);

    // Admin: platform overview and provider verification queue.
    Route::get('/admin/overview', [AdminController::class, 'overview']);
    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::get('/admin/verifications', [AdminController::class, 'pendingVerifications']);
    Route::get('/admin/verifications/{artisan}', [AdminController::class, 'showVerification']);
    Route::post('/admin/verifications/{artisan}/approve', [AdminController::class, 'approveVerification']);
    Route::post('/admin/verifications/{artisan}/reject', [AdminController::class, 'rejectVerification']);

    // Provider public profile: certifications, past work, photos.
    Route::get('/provider/portfolio', [ProviderPortfolioController::class, 'index']);
    Route::post('/provider/certifications', [ProviderPortfolioController::class, 'storeCertification']);
    Route::delete('/provider/certifications/{certification}', [ProviderPortfolioController::class, 'destroyCertification']);
    Route::post('/provider/realisations', [ProviderPortfolioController::class, 'storeRealisation']);
    Route::delete('/provider/realisations/{realisation}', [ProviderPortfolioController::class, 'destroyRealisation']);
    Route::post('/provider/travaux-photos', [ProviderPortfolioController::class, 'storeTravauxPhoto']);
    Route::delete('/provider/travaux-photos/{travauxPhoto}', [ProviderPortfolioController::class, 'destroyTravauxPhoto']);
});
