<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesPage extends Model
{
    protected $fillable = [
        'user_id',
        'product_name',
        'input_data',
        'content',
        'status',
    ];

    protected $casts = [
        'input_data' => 'array',
        'content'    => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
