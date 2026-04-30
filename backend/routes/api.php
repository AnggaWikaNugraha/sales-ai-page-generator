<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SalesPageController;
use Illuminate\Support\Facades\Route;

// Public auth routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected routes (require Sanctum token)
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });

    Route::prefix('sales-pages')->group(function () {
        Route::get('/', [SalesPageController::class, 'index']);
        Route::post('/', [SalesPageController::class, 'store']);
        Route::get('/{id}', [SalesPageController::class, 'show']);
        Route::delete('/{id}', [SalesPageController::class, 'destroy']);
        Route::post('/{id}/regenerate', [SalesPageController::class, 'regenerate']);
        Route::post('/{id}/regenerate-section', [SalesPageController::class, 'regenerateSection']);
    });
});
