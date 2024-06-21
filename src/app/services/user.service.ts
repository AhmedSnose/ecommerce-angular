import { Injectable } from '@angular/core';
import { UserIF } from '../components/shared/Models/userType';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}


}
