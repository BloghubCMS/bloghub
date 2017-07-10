BlogHub
=========================

Bloghub is a cms for editing Jekyll sites with a common WYSIWYG interface, with the ambition of being developed into a centralized blogging management cms for publishing to all of your publishing platforms.

Currently the classic branch has a more feature complete ui than the master branch. The api backend server should be the same though.

## How to start a development server

If you don't have yarn installed then
```$ npm install yarn -g```

then
```$ yarn install```

If you don't have foreman installed then
```$ yarn global add foreman```

install the sample db to get working quickly. After that you will need to update the records of the site table to have your github oauth token so that the api can connect to github. If you don't do this the server will crash when it tries to connect.

you could do that with a command like this in PSQL:
``` ```

then start the server like this

```$ foreman start -f Procfile.dev```

sometimes on a new computer for some reason the first time you start the server it crashes saying

```WebpackOptionsValidationError: Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.```

I haven't had time to figure out whats causing that yet, but you should be able to just restart the server and the second time it should start fine.

## Run tests

```$ npm run test```