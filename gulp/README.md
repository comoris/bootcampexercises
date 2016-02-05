## bower

Configure bower so we can use the bower_components

## serve

Serves the developer to start the app in the browser

- Serves the app on a browser using 'browsersync'
- Watch for changes and reload when files changes

Gulp command

    > gulp serve

## build

Prepare/build app for production

- Create dist folder for production
- Bundle scss files to style.css
- Bundle js files to main.js

Folder

    /dist
        index.html
        style.css
        main.js

Gulp command

    > gulp build

## wiredep (optional)

Create script dependency injection into the index.html

Gulp command

    > gulp wiredep
