import { Injectable, signal } from '@angular/core';
import { UserIF } from '../components/shared/Models/userType';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  currentUserSig = signal<UserIF | undefined | null>(null);

  loadToken() {
    const ls = localStorage.getItem('token');
    const isLocalStorageHasToken = (ls !== '') && (ls !== undefined) && (ls !== null)
    if(isLocalStorageHasToken) {
      this.http
      .get<{ user: UserIF }>('https://api.realworld.io/api/user')
      .subscribe({
        next: (response) => {
          console.log('response', response);
          this.currentUserSig.set(response.user);
        },
        error: () => {
          this.currentUserSig.set(null);
        },
      });
    }
  }

  register(user: any) {
    return this.http
      .post<{ user: UserIF }>('https://api.realworld.io/api/users', {
        user,
      })
      .subscribe(({ user }) => {
        localStorage.setItem('token', user.token);
        this.currentUserSig.set(user);
        this.router.navigateByUrl('/');
      });
  }

  login(user: any) {
    return this.http
      .post<{ user: UserIF }>('https://api.realworld.io/api/users/login', {
        user,
      })
      .subscribe(({ user }) => {
        localStorage.setItem('token', user.token);
        this.currentUserSig.set(user);
        this.router.navigateByUrl('/');
      });
  }

  logout() {    
    localStorage.setItem('token', '');
    this.currentUserSig.set(null);
    this.router.navigateByUrl('/');
  }
}
