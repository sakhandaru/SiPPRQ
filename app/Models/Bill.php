<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use \Illuminate\Database\Eloquent\Factories\HasFactory;

    protected $table = 'bills';

    protected $fillable = [
        'user_id',
        'type',
        'title',
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
