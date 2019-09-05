<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $token
 * @property int $user_id
 * @property bool $active
 * @property string $ip
 * @property string $valid_till
 * @property string $created_at
 * @property string $updated_at
 *
 * @property-read User $user
 */
class UserToken extends Model
{
    use Traits\CompositeKey;

    protected $primaryKey = ['user_id', 'created_at'];
    protected $fillable = ['token', 'user_id', 'active', 'ip', 'valid_till'];
    protected $casts = [
        'active' => 'boolean',
    ];


    /**
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\Model\User');
    }
}