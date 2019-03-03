paths:
    migrations: '%%PHINX_CONFIG_DIR%%/db/migrations'
    seeds: '%%PHINX_CONFIG_DIR%%/db/seeds'

environments:
    default_migration_table: phinxlog
    default_database: development
    production:
        adapter: mysql
        host: localhost
        name: DB_NAME
        user: DB_USER
        pass: DB_PASS
        port: 3306
        charset: utf8

    development:
        adapter: mysql
        host: localhost
        name: laser_profile
        user: root
        pass: ''
        port: 3306
        charset: utf8

version_order: creation
