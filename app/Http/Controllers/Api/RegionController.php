<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Province;

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
