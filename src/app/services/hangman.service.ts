import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { IProgrammingLanguages } from '../../models/programmingLanguage';
const defaultJSONPath = 'assets/languages.json'

@Injectable({
  providedIn: 'root'
})

export class HangmanService {

  constructor(private http: HttpClient) { }

  getQuestions(jsonPath: string = defaultJSONPath) {
    return this.http.get<IProgrammingLanguages>(jsonPath)
    // .pipe(
    //   catchError(error => {
    //     console.error('Error loading questions:', error);
    //     return throwError(() => new Error('Error loading questions')); 
    //   })
    // );
  }
}
