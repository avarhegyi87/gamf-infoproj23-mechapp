<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        $validator =  Validator::make($request->all(), [
            'vin' => ['required'],
            'licencePlate' => ['required'],
            'customerId' => ['required'],
            'productionYear' => ['required'],
            'mileage' => ['required'],
            'carBrand' => ['required'],
            'carMake' => ['required'],
            'displacement' => ['required'],
            'fuelType' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 400);
        } else {
            Vehicle::create($request->all());
            return response()->json('Successfully added');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vehicle $vehicle)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 &&  Auth::user()->role != 4) {
            return abort(403);
        }*/
        $validator =  Validator::make($request->all(), [
            'vin' => ['required'],
            'licencePlate' => ['required'],
            'customerId' => ['required'],
            'productionYear' => ['required'],
            'mileage' => ['required'],
            'carBrand' => ['required'],
            'carMake' => ['required'],
            'displacement' => ['required'],
            'fuelType' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 400);
        } else {
            $vehicle->update($request->all());
            return response()->json('Successfully modified');
        }
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
