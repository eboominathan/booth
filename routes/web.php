<?php

use App\Http\Controllers\BoothController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BoothMasterController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Booth resource routes
    Route::resource('booths', BoothController::class)->except(['show']);

    // BoothMaster resource routes
    Route::resource('booth-masters', BoothMasterController::class)->except(['show']);
    Route::get('/booths/export', [BoothController::class, 'export'])->name('booths.export');
});

// Admin routes
use App\Http\Controllers\Admin\StaffController;

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('admin.users.index');
    Route::post('users/{user}/approve', [\App\Http\Controllers\Admin\UserController::class, 'approve'])->name('admin.users.approve');
    // Staff CRUD
    Route::resource('staff', StaffController::class);
});

require __DIR__ . '/auth.php';