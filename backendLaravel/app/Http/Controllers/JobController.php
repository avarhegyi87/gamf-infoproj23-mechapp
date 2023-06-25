<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Quotation;
use App\Models\Worksheet;
use App\Models\Stock;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class JobController extends Controller
{
    public function create(Request $request)
    {
        if (Quotation::where('id', $request->quotationId)->exists() || $request->quotationId == null) {
            if (Worksheet::where('id', $request->worksheetId)->exists() || $request->worksheetId == null) {
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
                        if (Str::startsWith($material->materialNumber, '1')) {
                            $currentStock = $material->currentStock;
                            $newStock = $currentStock - $request->unit;
                            if ($request->unit > $currentStock && $currentStock != 0) {
                                return response()->json([
                                    'message' => 'Quantity is greater than current stock',
                                ], 400);
                            }
                            if ($currentStock < 1) {
                                return response()->json([
                                    'message' => 'Out of stock',
                                ], 400);
                            }
                        }
                        if ($request->has('worksheetId')) {
                            $job = Job::create($request->all());
                            if (Str::startsWith($material->materialNumber, '1')) {
                                Stock::where('materialNumber', $request->materialId)->update(['currentStock' => $newStock]);
                            }
                        } else {
                            $job = Job::create($request->except('worksheetId'));
                        }
                        return response()->json($job);
                    }
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Material not found',
                    ], 400);
                }
            } else {
                return response()->json([
                    'message' => 'Worksheet not found'
                ], 404);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Quotation not found',
            ], 400);
        }
    }

    public function update(Request $request, Job $job)
    {
        if (Quotation::where('id', $request->quotationId)->exists() || $request->quotationId == null) {
            if (Worksheet::where('id', $request->worksheetId)->exists() || $request->worksheetId == null) {
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
                        if (!Str::startsWith($material->materialNumber, '6')) {
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
                        }
                        if ($request->unit != $job->unit && Str::startsWith($request->materialId, '1')) {
                            if ($request->unit > $job->unit) {
                                $corrected = $currentStock - ($request->unit - $job->unit);
                                Stock::where('materialNumber', $request->materialId)->update(['currentStock' => $corrected]);
                            } else if ($request->unit > $job->unit) {
                                $corrected = $currentStock + ($job->unit - $request->unit);
                                Stock::where('materialNumber', $request->materialId)->update(['currentStock' => $corrected]);
                            }
                        }
                        if (Str::startsWith($request->materialId, '1')) {
                            Stock::where('materialNumber', $request->materialId)->update(['currentStock' => $newStock]);
                        }
                        $job->update($request->all());
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
                    'message' => 'Worksheet not found'
                ], 404);
            }
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Quotation not found',
            ], 400);
        }
    }

    public function getByQuotationId(int $quotationId)
    {
        $jobs = Job::where('quotationId', $quotationId)->get();
        return response()->json($jobs);
    }

    public function getByWorksheetId(int $worksheetId)
    {
        $jobs = Job::where('worksheetId', $worksheetId)->get();
        return response()->json($jobs);
    }

    public function getAll()
    {
        return response()->json(Job::get());
    }

    public function delete(string $id)
    {
        $job = Job::findOrFail($id);
        /*if ( Auth::id() != 2 && Auth::user()->role != 3) {
            return abort(403);
        }*/
        $job->delete();

        return response()->json('Successfully deleted');
    }
}
