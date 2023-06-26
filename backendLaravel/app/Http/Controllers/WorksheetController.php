<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use App\Models\User;
use App\Models\Worksheet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
                $validator =  Validator::make($request->all(), [
                    'mechanicId' => ['required'],
                    'startDate' => ['required'],
                    'endDate' => ['nullable'],
                    'garageId' => ['required'],
                    'quotationId' => ['required'],
                    'comment' => ['nullable'],
                    'invoiced' => ['nullable'],
                
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        'status' => false,
                        'message' => 'validation error',
                        'errors' => $validator->errors()
                    ], 400);
                } else {
                    $worksheet = Worksheet::create($request->all());

                    return response()->json($worksheet);
                }
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
    public function update(Request $request, Worksheet $worksheet)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3) {
            return abort(403);
        }*/

        if (Quotation::where('id', $request->quotationId)->exists())
        {
            if (User::where('id', $request->mechanicId)->exists())
            {
                // validate form data

                $validator =  Validator::make($request->all(), [
                    'mechanicId' => ['required'],
                    'startDate' => ['required'],
                    'endDate' => ['required'],
                    'garageId' => ['required'],
                    'quotationId' => ['required'],
                    'comment' => ['nullable'],
                    'invoiced' => ['required'],
                
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        'status' => false,
                        'message' => 'validation error',
                        'errors' => $validator->errors()
                    ], 400);
                } else {
                    $worksheet->update($request->all());
                    return response()->json($worksheet);
                }
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
