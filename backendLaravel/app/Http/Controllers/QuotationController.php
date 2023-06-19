<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use App\Models\Customer;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class QuotationController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function create(Request $request)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 && && Auth::user()->role != 4) {
            return abort(403);
        }*/
        $quotation = new Quotation();
        if (Customer::where('id', $request->customerId)->exists()) 
        {
            if (Vehicle::where('id', $request->vehicleId)->exists()) 
            {
                // validate form data
                $formFields = $request->validate([
                    'vehicleId' => ['required'],
                    'customerId' => ['required'],
                    'description' => ['nullable', 'max:255'],
                    'state' => ['required'],
                    'finalizeDate' => ['nullable'],
                    'createdBy' => ['required'],
                    'updatedBy' => ['nullable'],
                ]);
                Quotation::create($formFields);
        
                return response()->json("Succesfully created");
            }
            else 
            {
                return response()->json("Vehicle with given ID not exist!");
            }
        }
        else 
        {
            return response()->json("Customer with given ID not exist!");
        }


        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quotation $quotation)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3) {
            return abort(403);
        }*/
        
        if (Customer::where('id', $request->customerId)->exists())
        {
            if (Vehicle::where('id', $request->vehicleId)->exists())
            {
                // validate form data
                $formFields = $request->validate([
                    'vehicleId' => ['required'],
                    'customerId' => ['required'],
                    'description' => ['nullable', 'max:255'],
                    'state' => ['required'],
                    'finalizeDate' => ['nullable']
                ]);
                $quotation->updatedBy = Auth::user()->id;
                $quotation->update($formFields);

                return response()->json('Successfully updated');
            }
            else 
            {
                return response()->json("Customer with given ID not exist!");
            }
        }
        else 
        {
            return response()->json("Customer with given ID not exist!");
        }

        
    }

    public function get(Quotation $quotation)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 && && Auth::user()->role != 4) {
            return abort(403);
        }*/
        return response()->json($quotation);
    }

    public function getByCustomerId(int $id){
        $jobs = Quotation::where('customerId', $id)->get();
        return response()->json($jobs);
    }

    public function getByVehicleId(int $id){
        $jobs = Quotation::where('vehicleId', $id)->get();
        return response()->json($jobs);
    }

    public function getCreatedByVehicleId(int $id){
        $jobs = Quotation::where('vehicleId', $id)->where('state', 0)->get();
        return response()->json($jobs);
    }

    public function getActiveByVehicleId(int $id){
        $jobs = Quotation::where('vehicleId', $id)->where('state', 1)->get();
        return response()->json($jobs);
    }

    public function getInactiveByVehicleId(int $id){
        $jobs = Quotation::where('vehicleId', $id)->where('state', 2)->get();
        return response()->json($jobs);
    }


    public function getByState(string $state){
        $jobs = Quotation::where('state', $state)->get();
        return response()->json($jobs);
    }

    public function getAll()
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 && && Auth::user()->role != 4) {
            return abort(403);
        }*/
        return response()->json(Quotation::get());
    }
}
