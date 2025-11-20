<?php

namespace App\Policies;

use App\Models\Booth;
use App\Models\User;

class BoothPolicy
{
    public function viewAny(User $user)
    {
        return $user->hasRole('admin') || $user->hasRole('staff');
    }

    public function view(User $user, Booth $booth)
    {
        return $user->hasRole('admin') || $booth->created_by === $user->id;
    }

    public function create(User $user)
    {
        return $user->hasAnyRole(['admin', 'staff']);
    }

    public function update(User $user, Booth $booth)
    {
        return $user->hasRole('admin') || $booth->created_by === $user->id;
    }

    public function delete(User $user, Booth $booth)
    {
        return $user->hasRole('admin') || $booth->created_by === $user->id;
    }
}
