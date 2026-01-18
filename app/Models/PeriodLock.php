<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PeriodLock extends Model
{
    protected $fillable = ['month', 'year', 'locked_at', 'locked_by'];
}
