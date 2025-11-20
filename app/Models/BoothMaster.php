<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoothMaster extends Model
{
    use HasFactory;
    protected $fillable = [
        'booth_no',
        'name',
    ];
}
