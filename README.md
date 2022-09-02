# FrontendBB

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


##Per Iniziare
Keycloak: 
  -Scaricare versione 18.0.2 direttamente dul sito di keycloak
  -Per avviare keycloak andare sulla sotto directory bin aprire un bash e digitare
  - .\kc.bat start-dev
  -Potrebbe generare errori ( Per me era la versione un po' datata della open JDK. In caso scaricare e configurare le Path delle variabili d'ambiente)
  -Oppure Porta 8080 occupata. Leggere attentamente cosa c'e scritto e comportarsi di conseguenza.
  -Per inizializzare il tutto Seguire la procedura su Keycloak docs Open JDK
  -Per questo Progetto il nome del realm è serverbb e il client-id : login-app, roles: admin
  
Angular:
  -Scaricare npm modules:
    -scaricare np.
    -andare nella directory di progetto
    -Apire una bash
    -npm install -g @angular/cli
    -ng add @angular/material
    --(Per Keycloak)
    -npm install keycloak-angular keycloak-js
  
