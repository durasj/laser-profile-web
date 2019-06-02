<?php
namespace Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['name'];

    /**
     * The games that belong to the team
     */
    public function games()
    {
        return $this->belongsToMany('Models\\Game');
    }
}
