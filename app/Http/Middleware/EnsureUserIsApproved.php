<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsApproved
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && !auth()->user()->approved) {
            auth()->logout();
            return redirect()->route('login')->withErrors(['email' => __('messages.approval_required')]);
        }
        return $next($request);
    }
}
