<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct()
    {
        // simple role check since kernel middleware alias may not be registered
        $this->middleware(function ($request, $next) {
            $user = $request->user();
            if (! $user || ! method_exists($user, 'hasRole') || ! $user->hasRole('admin')) {
                abort(403);
            }
            return $next($request);
        });
    }
    public function index()
    {
        $users = User::latest()->paginate(20);
        return Inertia::render('Admin/Users', ['users' => $users]);
    }

    public function approve(User $user)
    {
        $user->approved = true;
        $user->save();
        // ensure role
        if (method_exists($user, 'assignRole')) {
            $user->assignRole('staff');
        }
        return redirect()->back();
    }
}
