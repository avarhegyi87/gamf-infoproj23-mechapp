<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
     /**
     * Store a newly created resource in storage.
     */
    public function create(Request $request)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3) {
            return abort(403);
        }*/
        // validate form data
        $formFields = $request->validate([
            'vin' => ['required', 'size: 12'],
            'licencePlate' => ['required', 'min:6', 'max:7'],
            'customerId' => ['required'],
            'productionYear' => ['required'],
            'mileage' => ['required'],
            'carBrand' => ['required'],
            'carMake' => ['required'],
            'displacement' => ['required'],
            'fuelType' => ['required'],
        ]);

        Vehicle::create($formFields);

        return response()->json('Successfully added');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vehicle $vehicle)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 &&  Auth::user()->role != 4) {
            return abort(403);
        }*/
        $formFields = $request->validate([
            'vin' => ['required', 'size: 12'],
            'licencePlate' => ['required', 'min:6', 'max:7'],
            'customerId' => ['required'],
            'productionYear' => ['required'],
            'mileage' => ['required'],
            'carBrand' => ['required'],
            'carMake' => ['required'],
            'displacement' => ['required'],
            'fuelType' => ['required'],
        ]);


        $vehicle->update($formFields);

        return response()->json('Successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(string $id)
    {
        $stock = Vehicle::findOrFail($id);
         /*if ( Auth::id() != 2 && Auth::user()->role != 3) {
            return abort(403);
        }*/
        $stock->delete();

        return response()->json('Successfully deleted');
    }

    public function get(Vehicle $vehicle)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 &&  Auth::user()->role != 4) {
            return abort(403);
        }*/
        return response()->json($vehicle);
    }

    public function getAll()
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 &&  Auth::user()->role != 4) {
            return abort(403);
        }*/
        return response()->json(Vehicle::get());
    }
}
