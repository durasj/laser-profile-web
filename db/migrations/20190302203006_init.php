<?php


use Phinx\Migration\AbstractMigration;
use Phinx\Util\Literal;

class Init extends AbstractMigration
{
    public function change()
    {
        $this->table('users')
            ->addColumn('nick', 'string')
            ->addColumn('email', 'string')
            ->addColumn('password', 'string')
            ->addColumn('role', 'string')
            ->addColumn('created_at', 'timestamp', ['default' => Literal::from('now()')])
            ->addColumn('updated_at', 'timestamp', ['null' => true])
            ->addIndex(['email'], ['unique' => true])
            ->create();

        $this->table('teams')
            ->addColumn('name', 'string')
            ->addColumn('created_at', 'timestamp', ['default' => Literal::from('now()')])
            ->addColumn('updated_at', 'timestamp', ['null' => true])
            ->create();

        $this->table('games')
            ->addColumn('played', 'timestamp', ['default' => Literal::from('now()')])
            ->addColumn('mode', 'string', ['default' => 'Default'])
            ->addColumn('players', 'integer')
            ->addColumn('teams', 'string', ['null' => true])
            ->addColumn('settings', 'string', ['null' => true])
            ->addColumn('attachment', 'string', ['null' => true])
            ->addColumn('created_at', 'timestamp', ['default' => Literal::from('now()')])
            ->addColumn('updated_at', 'timestamp', ['null' => true])
            ->create();

        $this->table('game_user')
            ->addColumn('game_id', 'integer')
            ->addColumn('user_id', 'integer')
            ->addColumn('score', 'integer')
            ->addColumn('shots', 'integer')
            ->addColumn('hitrate', 'integer')
            ->addColumn('kills', 'integer')
            ->addColumn('deaths', 'integer')
            ->addColumn('additional', 'string', ['null' => true])
            ->addColumn('created_at', 'timestamp', ['default' => Literal::from('now()')])
            ->addColumn('updated_at', 'timestamp', ['null' => true])
            ->create();

        $this->table('game_team')
            ->addColumn('game_id', 'integer')
            ->addColumn('team_id', 'integer')
            ->addColumn('score', 'integer')
            ->addColumn('shots', 'integer')
            ->addColumn('hitrate', 'integer')
            ->addColumn('kills', 'integer')
            ->addColumn('deaths', 'integer')
            ->addColumn('additional', 'string', ['null' => true])
            ->addColumn('created_at', 'timestamp', ['default' => Literal::from('now()')])
            ->addColumn('updated_at', 'timestamp', ['null' => true])
            ->create();
    }
}
