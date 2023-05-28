<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class worksheet extends Model
{
    use HasFactory;
    protected $fillable = [
        'mechanicId', 'startDate', 'endDate', 'garageId', 'quotationId', 'comment', 'additionalWork', 'additionalParts', 'invoiced'
       ];

    public function quotation()
    {
       return $this->belongsTo(Quotation::class, 'id');
    }
}
