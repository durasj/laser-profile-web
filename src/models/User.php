<?php
namespace Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['nick', 'email'];
    protected $hidden = ['password'];

    protected $roles = ['admin', 'operator', 'player'];

    /**
     * The games that belong to the user (if he has role player)
     */
    public function games()
    {
        return $this->belongsToMany('Models\\Game');
    }

    /**
     * Set the user's role.
     *
     * @param  string  $value
     * @return void
     */
    public function setRoleAttribute(string $value)
    {
        if (!in_array($value, $this->roles)) {
            $rolesHr = implode(', ', $this->roles);
            throw new \Exception(
                'Unsupported user role "' . $value . '". Supported roles: ' . $rolesHr . '.',
            );
        }

        $this->attributes['role'] = strtolower($value);
    }

    /**
     * Set the user's password.
     *
     * @param  string  $value
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        if (empty($value)) {
            throw new \Exception('Password can not be empty.');
        }

        $this->attributes['password'] = password_hash($value, PASSWORD_ARGON2ID);
    }

    /**
     * Verify the user's password.
     *
     * @param  string  $value
     * @return void
     */
    public function verifyPassword($value)
    {
        return password_verify($value, $this->attributes['password']);
    }
}
