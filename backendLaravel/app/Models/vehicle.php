<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class vehicle extends Model
{
    use HasFactory;
    protected $fillable = [
        'vin', 'licencePlate', 'customerId', 'productionYear', 'mileage', 'carBrand' , 'carMake', 'displacement','fuelType'
       ];

    public function quotation()
    {
       return $this->hasMany(Quotation::class, 'vehicleId', 'id',);
    }
}
