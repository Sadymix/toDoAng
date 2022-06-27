import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ToDo } from './interface/ToDo';
import { ServerService } from './service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  appState$: Observable<ToDo[]>;
  private dataSubject = new BehaviorSubject<ToDo[]>(null);


  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.appState$ = <Observable<ToDo[]>>(
      this.serverService.toDoList$.pipe(
        map((response) => {
          this.dataSubject.next(response);
          return { appData: {...response} };
        }),
        catchError((error: string) => {
          return error;
        })
      )
    );
  }


}
