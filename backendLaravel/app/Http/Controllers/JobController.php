<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Quotation;
use App\Models\Stock;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class JobController extends Controller
{
    public function create(Request $request)
    {

        if (Quotation::where('id', $request->quotationId)->exists()) {
            if (Stock::where('materialNumber', $request->materialId)->exists()) {
                $validator =  Validator::make($request->all(), [
                    'quotationId' => ['required'],
                    'materialId' => ['required'],
                    'unit' => ['required'],
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        'status' => false,
                        'message' => 'validation error',
                        'errors' => $validator->errors()
                    ], 400);
                } else {

                    $material = DB::table('stocks')->where('materialNumber', $request->materialId)->first();
                    $currentStock = $material->currentStock;
                    $newStock = $currentStock - $request->unit;
                    if ($request->unit > $currentStock && $currentStock != 0) {
                        return response()->json([
                            'message' => 'Unit is greater than current stock',
                        ], 400);
                    }
                    if ($currentStock < 1) {
                        return response()->json([
                            'message' => 'Out of stock',
                        ], 400);
                    }
                    Job::create($request->all());
                    if (Str::startsWith('This is my name', 'This')) {
                        Stock::where('materialNumber', $request->materialId)->update(['currentStock' => $newStock]);
                    }
                    return response()->json('Successfully added');
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Material not found',
                ], 400);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Quotation not found',
            ], 400);
        }
    }

    public function getAll()
    {
        return response()->json(Job::get());
    }
}
