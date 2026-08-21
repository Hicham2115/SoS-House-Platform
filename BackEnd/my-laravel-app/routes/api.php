<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DemandeController;
use App\Http\Controllers\Api\ProviderPortfolioController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/users', [AuthController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::patch('/user', [UserController::class, 'update']);
    Route::post('/user/avatar', [UserController::class, 'uploadAvatar']);
    Route::put('/user/password', [UserController::class, 'updatePassword']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/demandes', [DemandeController::class, 'index']);
    Route::get('/demandes/disponibles', [DemandeController::class, 'available']);
    Route::post('/demandes', [DemandeController::class, 'store']);
    Route::post('/demandes/photos', [DemandeController::class, 'uploadPhoto']);
    Route::get('/demandes/{demande}', [DemandeController::class, 'show']);
    Route::put('/demandes/{demande}', [DemandeController::class, 'update']);
    Route::delete('/demandes/{demande}', [DemandeController::class, 'destroy']);

    Route::post('/contacts', [ContactController::class, 'store']);

    Route::get('/provider/portfolio', [ProviderPortfolioController::class, 'index']);
    Route::post('/provider/certifications', [ProviderPortfolioController::class, 'storeCertification']);
    Route::delete('/provider/certifications/{certification}', [ProviderPortfolioController::class, 'destroyCertification']);
    Route::post('/provider/realisations', [ProviderPortfolioController::class, 'storeRealisation']);
    Route::delete('/provider/realisations/{realisation}', [ProviderPortfolioController::class, 'destroyRealisation']);
    Route::post('/provider/travaux-photos', [ProviderPortfolioController::class, 'storeTravauxPhoto']);
    Route::delete('/provider/travaux-photos/{travauxPhoto}', [ProviderPortfolioController::class, 'destroyTravauxPhoto']);
});
