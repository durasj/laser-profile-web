<?php
namespace Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model {
    /**
     * The games that belong to the user (if he has role player)
     */
    public function games()
    {
        return $this->belongsToMany('Models\\Game');
    }
}
