<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DemandeController;
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
    Route::post('/demandes', [DemandeController::class, 'store']);
    Route::post('/demandes/photos', [DemandeController::class, 'uploadPhoto']);

    Route::post('/contacts', [ContactController::class, 'store']);
});
