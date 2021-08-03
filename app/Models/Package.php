<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;
    protected  $guarded = [];

    public function scopeActive($query)
    {
        return $query->where('status', 'active')->orderByDesc('id');
    }
}
