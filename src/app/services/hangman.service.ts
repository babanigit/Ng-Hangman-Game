import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProgrammingLanguages } from '../../models/programmingLanguage';

const defaultTSPath = 'assets/languages.json';

@Injectable({
  providedIn: 'root',
})

export class HangmanService {
  private loadingSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getLoadingState() {
    return this.loadingSubject.asObservable();
  }

  getQuestions(tsPath: string = defaultTSPath): Observable<IProgrammingLanguages> {
    this.loadingSubject.next(true); // Emit loading true before HTTP request

    return this.http.get<any>(tsPath).pipe(
      delay(1200), // Introduce a delay of 1200 milliseconds (1.2 seconds) - optional
      catchError((error) => {
        console.error('Error loading questions:', error);
        return throwError(() => new Error('Error loading questions'));
      }),
      finalize(() => {
        this.loadingSubject.next(false); // Emit loading false after HTTP request completes
      })
    );
  }
}
