<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DemandeController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::patch('/user', [UserController::class, 'update'])->middleware('auth:sanctum');
Route::post('/user/avatar', [UserController::class, 'uploadAvatar'])->middleware('auth:sanctum');
Route::put('/user/password', [UserController::class, 'updatePassword'])->middleware('auth:sanctum');

Route::post('/users', [AuthController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/demandes', [DemandeController::class, 'index'])->middleware('auth:sanctum');
Route::post('/demandes', [DemandeController::class, 'store'])->middleware('auth:sanctum');
Route::post('/demandes/photos', [DemandeController::class, 'uploadPhoto'])->middleware('auth:sanctum');
