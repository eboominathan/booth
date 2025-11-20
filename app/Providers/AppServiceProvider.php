<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Share authenticated user with roles to Inertia so frontend can use role-based nav
        Inertia::share('auth.user', function () {
            $user = Auth::user();
            if (! $user) {
                return null;
            }

            // Ensure roles are available as simple array
            $roles = [];
            if (method_exists($user, 'getRoleNames')) {
                $roles = $user->getRoleNames()->toArray();
            }

            return array_merge($user->only(['id', 'name', 'email', 'approved'] ?? []), [
                'roles' => $roles,
            ]);
        });
    }
}
