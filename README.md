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

~~install the sample db to get working quickly.~~ After that you will need to update the records of ~~the site table~~ the gitUtils file for the field - githubToken, to have your github oauth token. That way the api can connect to github. If you don't do this the server will crash when it tries to connect.

~~you could do that with a command like this in PSQL:~~
~~``` ```~~


then start the server like this

```$ foreman start -f Procfile.dev```


## Run tests

```$ npm run test```