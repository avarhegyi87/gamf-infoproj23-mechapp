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
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicleId')->constrained('vehicles', 'id')->onUpdate('cascade');
            $table->foreignId('customerId')->constrained('customers', 'id')->onUpdate('cascade');
            $table->string('jobList');
            $table->string('partList');
            $table->string('description');
            $table->timestamp('finalizeDate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};
