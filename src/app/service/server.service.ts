import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ToDo } from '../interface/ToDo';
import { Status } from '../enum/status';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private readonly apiUrl = 'http://localhost:8080/todo';

  constructor(private http: HttpClient) {}

  toDoList$ = <Observable<ToDo[]>>(
    this.http
      .get<ToDo[]>(`${this.apiUrl}/list`)
      .pipe(tap(console.log), catchError(this.handleError))
  );

  toDo$ = (id: number) => <Observable<ToDo>>(
    this.http.get<ToDo>(`${this.apiUrl}/get/${id}`)
    .pipe(tap(console.log), catchError(this.handleError))
  )

  save$ = (toDo: ToDo) => <Observable<ToDo>>(
    this.http.post<ToDo>(`${this.apiUrl}/save`, toDo)
    .pipe(tap(console.log), catchError(this.handleError))
  )

  delete$ = (id: number) => <Observable<boolean>>(
    this.http.get<boolean>(`${this.apiUrl}/delete/${id}`)
    .pipe(tap(console.log), catchError(this.handleError))
  )

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`An error occurred - Error code: ${error.status}`);
  }
}
