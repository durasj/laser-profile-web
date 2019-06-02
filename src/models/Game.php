<?php
namespace Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = ['played', 'mode', 'players', 'teams', 'settings', 'attachment'];
    protected $dates = ['played'];

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
