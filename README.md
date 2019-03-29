# Mc3TagCloud

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

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

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## @piecioshka 's feedback

- Plus: Stworzenie interfejsu `WordsInterface`
- Plus: Aplikacja realizuje wymagania
- Plus: Zrealizowana obsługa błędów
- Plus: Stworzenie komponentu na potrzeby prezentacji komunikatu
- Plus: Stworzenie pipe-a (Szkoda, że nie użyłeś `Objects.keys()`)
- Minus: W katalogu assets/ nie powinno być żadnego pliku .ts
- Minus: Brak katalogu agregującgo serwisy, pipe-y
- Minus: Skomplikowana logika generowania błędu pobrania pliku
- Minus: Używanie pętli `for..in` (mamy `for..of` albo `Object.prototype.forEach`)