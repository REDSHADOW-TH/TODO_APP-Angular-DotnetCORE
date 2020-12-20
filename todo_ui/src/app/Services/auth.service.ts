import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${env.apiUrl}/auth`;

  public isLogin(): boolean {
    const loginLocalStorage: string | null = localStorage.getItem('login');

    let result: boolean = false;

    if (loginLocalStorage === (undefined || null || '')) {
      return false;
    } else if (loginLocalStorage === 'success') {
      return true;
    }

    return result;
  }

  public getUserName(): string | null {
    return localStorage.getItem('username');
  }


  public setLoginState(status: boolean, username: string = ''): void {
    if (status && username !== '') {
      localStorage.setItem('login', 'success');
      localStorage.setItem('username', username);
    } else {
      localStorage.setItem('login', 'fail');
      localStorage.removeItem('username');
    }
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/login?user=${username}&password=${password}`);
  }

  public register(username: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/register?user=${username}&password=${password}`);
  }

  public logout(): boolean {
    try {
      localStorage.removeItem('login');
      localStorage.removeItem('username');
      return true;
    } catch (e) {
      return false;
    }
  }

}
