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
        // 'alamat_asal', // Removed
        'province_id',
        'city_id',
        'district_id',
        'address_detail',
        'pendidikan',
        'institusi',
        'tahun_masuk',
        'tahun_keluar',
        'social_instagram',
        'social_facebook',
        'social_linkedin',
        'foto_profile',
        'birth_date',
        'study_program',
        'student_id_number',
    ];

    protected $casts = [
        'tahun_masuk' => 'integer',
        'tahun_keluar' => 'integer',
        'birth_date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }
}
