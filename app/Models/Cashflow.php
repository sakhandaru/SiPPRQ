<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cashflow extends Model
{
    protected $fillable = [
        'source_type',
        'source_id',
        'direction',
        'category',
        'amount',
        'description',
        'created_by',
        'proof_file_path',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
