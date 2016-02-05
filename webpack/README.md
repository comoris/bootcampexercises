
## serve

Serves the developer to start the app in the browser

- Use webpack-dev-server

Npm command

    > npm run serve

## build

Prepare/build app for production

- Create dist folder for production
- Compile and bundle scss files to style.css
- Bundle and minify js files to main.js
- Run 'webpack -p' from gulp

Folder/files

    /dist
        index.html
        style-301dc14ca41271e02b3a.css
        main-301dc14ca41271e02b3a.js

Npm command

    > npm build         -> "build": "gulp build"

## add revision to build files (optional)

- Add revision to css and js file
- Update index.html to load correct files.

## build the css as a separated bundle (optional)

- Extract the css in a separated bundle. But do this only in the production build

