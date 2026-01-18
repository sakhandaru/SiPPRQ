<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MonthlyBill extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'month',
        'amount',
        'status',
        'paid_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payments()
    {
        return $this->hasMany(KasPayment::class, 'bill_id');
    }

    public function latestPayment()
    {
        return $this->hasOne(KasPayment::class, 'bill_id')->latestOfMany();
    }
}
