<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class customer extends Model
{
    use HasFactory;
    protected $fillable = [
         'name', 'country', 'postcode', 'street', 'houseNumber','email' , 'phoneNumber', 'taxNumber'
        ];

    public function quotation()
    {
        return $this->hasMany(Quotation::class, 'customerId', 'id',);
    }
}
