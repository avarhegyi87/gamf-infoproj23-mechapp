<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\WorksheetController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\JobController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//User routes
Route::post('/auth/register', [UserController::class, 'register'])->name('register');
Route::post('/auth/login', [UserController::class, 'login'])->name('login');
Route::post('/auth/logout', [UserController::class, 'logout'])->name('logout');


//Customer routes
Route::get('/customer/get/{customer}', [CustomerController::class, 'get'])->name('get');
Route::get('/customer/getAll', [CustomerController::class, 'getAll'])->name('getAll');
Route::post('/customer/create', [CustomerController::class, 'create'])->name('create');
Route::post('/customer/put/{customer}', [CustomerController::class, 'update'])->name('update');
Route::delete('/customer/delete/{customer}', [CustomerController::class, 'delete'])->name('delete');

//Stock routes
Route::get('/stock/get/{stock}', [StockController::class, 'get'])->name('get');
Route::get('/stock/getAll', [StockController::class, 'getAll'])->name('getAll');
Route::post('/stock/create', [StockController::class, 'create'])->name('create');
Route::post('/stock/put/{stock}', [StockController::class, 'update'])->name('update');
Route::delete('/stock/delete/{stock}', [StockController::class, 'delete'])->name('delete');
Route::get('/stock/getLastService', [StockController::class, 'getLastService'])->name('getLastService');
Route::get('/stock/getLastMaterial', [StockController::class, 'getLastMaterial'])->name('getLastMaterial');

//Vehicle routes
Route::get('/vehicle/get/{vehicle}', [VehicleController::class, 'get'])->name('get');
Route::get('/vehicle/getAll', [VehicleController::class, 'getAll'])->name('getAll');
Route::post('/vehicle/create', [VehicleController::class, 'create'])->name('create');
Route::post('/vehicle/put/{vehicle}', [VehicleController::class, 'update'])->name('update');
Route::delete('/vehicle/delete/{vehicle}', [VehicleController::class, 'delete'])->name('delete');

//Quotation routes
Route::get('/quotation/getByCustomerId/{id}', [QuotationController::class, 'getByCustomerId'])->name('getByCustomerId');
Route::get('/quotation/getByVehicleId/{id}', [QuotationController::class, 'getByVehicleId'])->name('getByVehicleId');
Route::get('/quotation/getByState/{state}', [QuotationController::class, 'getByState'])->name('getByState');
Route::get('/quotation/get/{quotation}', [QuotationController::class, 'get'])->name('get');
Route::get('/quotation/getAll', [QuotationController::class, 'getAll'])->name('getAll');
Route::post('/quotation/create', [QuotationController::class, 'create'])->name('create');
Route::post('/quotation/{quotation}', [QuotationController::class, 'update'])->name('update');
Route::delete('/quotation/{quotation}', [QuotationController::class, 'delete'])->name('delete');

//Job routes
Route::get('/job/get/{job}', [JobController::class, 'get'])->name('get');
Route::get('/job/getAll', [JobController::class, 'getAll'])->name('getAll');
Route::get('/job/getByQuotationId', [JobController::class, 'getByQuotationId'])->name('getByQuotationId');
Route::post('/job/create', [JobController::class, 'create'])->name('create');
Route::post('/job/{job}', [JobController::class, 'update'])->name('update');
Route::delete('/job/{job}', [JobController::class, 'delete'])->name('delete');


//Worksheet routes
Route::get('/worksheet/get/{worksheet}', [WorksheetController::class, 'get'])->name('get');
Route::get('/worksheet/getAll', [WorksheetController::class, 'getAll'])->name('getAll');
Route::post('/worksheet/create', [WorksheetController::class, 'create'])->name('create');
Route::post('/worksheet/{worksheet}', [WorksheetController::class, 'update'])->name('update');
Route::delete('/worksheet/{worksheet}', [WorksheetController::class, 'delete'])->name('delete');
