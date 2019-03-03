<?php
namespace Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model {
    /**
     * The players that belong to the game
     */
    public function players()
    {
        return $this->belongsToMany('Models\\User');
    }

    /**
     * The teams that belong to the game
     */
    public function teams()
    {
        return $this->belongsToMany('Models\\Team');
    }
}
