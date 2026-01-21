<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (! $request->user() || $request->user()->role !== $role) {
            if ($request->expectsJson()) {
                abort(403, 'Unauthorized.');
            }
            return redirect()->route('dashboard')->with('error', 'You do not have permission to access that page.');
        }

        return $next($request);
    }
}
