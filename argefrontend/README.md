# argefrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## environment help

// farklı bir environment dosyasıyla calışmak için
ng serve --host 10.55.25.184 --configuration ip
ng build --configuration ip

export const environment = {
production: false,
serverUrl: 'http://10.55.25.184:5000/api',
envName: 'Development',
appName: 'Kanka Dev'
};

    sudo apt-get install ca-certificates -y

bash generate.sh
bash install-cert.sh
bash docker.sh

docker run --name fc -v "$PWD/ssl/n:/etc/nginx/certs" -v $PWD/ssl/nginx-default.conf:/etc/nginx/conf.d/default.conf:ro" -v $PWD/dist/argefrontend:/usr/share/nginx/html:ro -p 8080:443 -d nginx
