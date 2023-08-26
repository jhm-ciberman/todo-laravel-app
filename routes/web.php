<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::prefix('api')->group(function () {
    Route::get('/user-info', fn () => Auth::user())->name('user')->middleware('auth');

    Route::apiResource('tasks', TaskController::class);
});

// Catch-all route for Vue Router. This let us have pretty URLs in our Vue Powered SPA.
Route::get('/{path?}', HomeController::class)->where('path', '.*');
