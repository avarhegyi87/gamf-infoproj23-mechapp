<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
    protected $fillable = [
        'quotationId', 'materialId', 'unit'
       ];

    public function quotation()
    {
       return $this->belongsTo(Quotation::class, 'id');
    }

    public function stock()
    {
       return $this->belongsTo(Stock::class, 'materialNumber');
    }
}
