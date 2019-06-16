# laser-profile-web

## Frontend assets

To compile the frontend assets, you need the [node.js with npm](https://nodejs.org/en/) (tested on the latest LTS). Dependencies should be installed by running `npm install`. One time build can be done by running `npm run build`. Watching for changes and automatic recompiling by `npm start`.

## Backend

You can run the backend by running `php -S localhost:8080 -t public` - also available as `npm run php`. Please make sure you have MySQL (or compatible alternative) running and `src/settings.php` configured. If you want to run db migrations/seeders, you also need to configure the `phinx.yml`.

Alternatively, you can also use the bundled `docker-compose.yml` which can create and start PHP, MySQL and nginx proxy for you. Tested only on the Linux.
