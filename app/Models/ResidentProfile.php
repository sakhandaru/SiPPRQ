<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResidentProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'wali_nama',
        'wali_kontak',
        'alamat_asal',
        'pendidikan',
        'institusi',
        'tahun_masuk',
        'tahun_keluar',
        'social_instagram',
        'social_facebook',
        'social_linkedin',
        'foto_profile',
    ];

    protected $casts = [
        'tahun_masuk' => 'integer',
        'tahun_keluar' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
