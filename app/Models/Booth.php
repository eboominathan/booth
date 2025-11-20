<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booth extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'booth_master_id',
        'name',
        'place',
        'mobile',
        'photo',
        'created_by',
        'updated_by',
    ];
    public function boothMaster()
    {
        return $this->belongsTo(BoothMaster::class, 'booth_master_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
