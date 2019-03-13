import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';

const timerDelay: number = 3000;

export default [
    { 
        text: 'Prezentacja różnych wyrazów',
        check$: (words): Observable<boolean> => {
            /**
             * we can calculate `checked` value
             */
            const checked = true;
            return timer((Math.random() * timerDelay) + 500).pipe(map((_) => {
                return checked;
            }));
        }
    },
    { 
        text: 'Każdy wyraz ma inną ilość znaków',
        check$: (words): Observable<boolean> => {
            /**
             * we can calculate `checked` value
             */
            const checked = true;
            return timer((Math.random() * timerDelay) + 500).pipe(map((_) => {
                return checked;
            }));
        }
    },
    { 
        text: 'Każdy wyraz ma inną wielkość',
        check$: (words): Observable<boolean> => {
            /**
             * we can calculate `checked` value
             */
            const checked = true;
            return timer((Math.random() * timerDelay) + 500).pipe(map((_) => {
                return checked;
            }));
        }
    },
    { 
        text: 'Wyrazy wraz ich wielkościami należy pobrać z plik *.json',
        check$: (words): Observable<boolean> => {
            /**
             * we can calculate `checked` value
             */
            const checked = true;
            return timer((Math.random() * timerDelay) + 500).pipe(map((_) => {
                return checked;
            }));
        }
    },
    { 
        text: 'Dodatkowy punkt za dodanie obsługi błędów w przypadku braku pliku *.json',
        check$: (words): Observable<boolean> => {
            /**
             * we can calculate `checked` value
             */
            const checked = true;
            return timer((Math.random() * timerDelay) + 500).pipe(map((_) => {
                return checked;
            }));
        }
    },
    { 
        text: 'Dodatkowy punkt za zbudowanie interfejsu odpowiedzi z serwera',
        check$: (words): Observable<boolean> => {
            /**
             * we can calculate `checked` value
             */
            const checked = true;
            return timer((Math.random() * timerDelay) + 500).pipe(map((_) => {
                return checked;
            }));
        }
    }
]