<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use App\Models\User;
use App\Models\Worksheet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class WorksheetController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function create(Request $request)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 && && Auth::user()->role != 4) {
            return abort(403);
        }*/

        if (Quotation::where('id', $request->quotationId)->exists()) 
        {
            if (User::where('id', $request->mechanicId)->exists()) 
            {
                // validate form data
                $formFields = $request->validate([
                    'mechanicId' => ['required'],
                    'startDate' => ['required'],
                    'endDate' => ['nullable'],
                    'garageId' => ['required'],
                    'quotationId' => ['required'],
                    'comment' => ['nullable'],
                    'additionalWork' => ['nullable'],
                    'additionalParts' => ['nullable'],
                    'invoiced' => ['nullable'],
                ]);
        
                Worksheet::create($formFields);
        
                return response()->json("Succesfully created");
            }
            else 
            {
                return response()->json("Mechanic with given ID not exist!");
            }
        }
        else 
        {
            return response()->json("Quotation with given ID not exist!");
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
        
        if (Quotation::where('id', $request->quotationId)->exists()) 
        {
            if (User::where('id', $request->mechanicId)->exists()) 
            {
                // validate form data
                $formFields = $request->validate([
                    'mechanicId' => ['required'],
                    'startDate' => ['required'],
                    'endDate' => ['nullable'],
                    'garageId' => ['required'],
                    'quotationId' => ['required'],
                    'comment' => ['nullable'],
                    'additionalWork' => ['nullable'],
                    'additionalParts' => ['nullable'],
                    'invoiced' => ['nullable'],
                ]);
        
                $quotation->update($formFields);
        
                return response()->json("Succesfully created");
            }
            else 
            {
                return response()->json("Mechanic with given ID not exist!");
            }
        }
        else 
        {
            return response()->json("Quotation with given ID not exist!");
        }

        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(string $id)
    {
        $worksheet = Worksheet::findOrFail($id);
        /*if ( Auth::id() != 2 && Auth::user()->role != 3) {
            return abort(403);
        }*/
        $worksheet->delete();

        return response()->json('Successfully deleted');
    }

    public function get(Worksheet $worksheet)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 && && Auth::user()->role != 4) {
            return abort(403);
        }*/
        return response()->json($worksheet);
    }

    public function getAll()
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 && && Auth::user()->role != 4) {
            return abort(403);
        }*/
        return response()->json(Worksheet::get());
    }
}
