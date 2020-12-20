import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddNote, EditNote } from '../Models/NoteModel';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl: string = env.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getNote(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-data?username=${username}`);
  }

  public addNote(data: AddNote): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  public editNote(data: EditNote): Observable<any> {
    return this.http.post(`${this.apiUrl}/edit`, data);
  }

  public deleteNote(seq: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/delete?seq=${seq}`);
  }
}
