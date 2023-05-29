<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('vin')->unique();
            $table->string('licencePlate')->unique();
            $table->integer('customerId')->constrained('customers', 'id')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('productionYear');
            $table->integer('mileage');
            $table->string('carBrand');
            $table->string('carMake');
            $table->integer('displacement');
            $table->string('fuelType');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};