<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class stock extends Model
{
    use HasFactory;
    protected $fillable = [
        'materialNumber', 'description', 'currentStock', 'netPrice'
       ];

    public function job()
    {
        return $this->hasMany(Job::class, 'materialId', 'id');
    }
}
