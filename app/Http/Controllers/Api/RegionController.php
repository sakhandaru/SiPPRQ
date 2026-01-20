<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Province;
use App\Models\City;
use App\Models\District;

class RegionController extends Controller
{
    public function provinces()
    {
        return response()->json(Province::all());
    }

    public function cities(Province $province)
    {
        return response()->json($province->cities);
    }

    public function districts(City $city)
    {
        return response()->json($city->districts);
    }
}
