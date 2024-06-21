import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/must-match.validator';
import { UserService } from '../../services/user.service';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf,RouterLink],
  template: `
    <div class="flex flex-wrap bg-main-color-three">
      <div class="flex w-full flex-col md:w-1/2">
        <div
          class="mt-5 lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0"
        >
          <button
            class="-2 mt-8 flex items-center justify-center rounded-md  px-4 py-1 outline-none ring-offset-2 transition focus:ring-2 hover:border-transparent border-color-fourth hover:bg-black hover:text-white"
          >
            <img
              class="mr-2 h-5"
              src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
              alt="Google logo"
            />
            Log in with Google
          </button>
          <div class="relative mt-8 flex h-px place-items-center bg-main-color">
            <div
              class="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-main-color text-center text-sm text-main-color"
            >
              or
            </div>
          </div>

          <form
            [formGroup]="loginForm"
            (ngSubmit)="onSubmit()"
            class="grid grid-cols-1 gap-4 pt-3 md:pt-8 md:grid-cols-2"
          >
 

            <div class="col-span-1 md:col-span-2">
              <label class="block text-gray-700">Email</label>
              <input
                type="text"
                formControlName="email"
                class="w-full p-2 border border-color-two bg-main-color rounded mt-1"
                [ngClass]="{ 'border-red-500': submitted && f['email'].errors }"
              />
              <div
                *ngIf="submitted && f['email'].errors"
                class="text-red-500 text-sm mt-1"
              >
                <div *ngIf="f['email']['errors']['required']">Email is required</div>
                <div *ngIf="f['email']['errors']['email']">
                  Email must be a valid email address
                </div>
              </div>
            </div>

            <div class="col-span-1 md:col-span-2">
            <label class="block text-gray-700">Password</label>
              <input
                type="password"
                formControlName="password"
                class="w-full p-2 border border-color-two bg-main-color rounded mt-1"
                [ngClass]="{ 'border-red-500': submitted && f['password'].errors }"
              />
              <div
                *ngIf="submitted && f['password'].errors"
                class="text-red-500 text-sm mt-1"
              >
                <div *ngIf="f['password']['errors']['required']">
                  Password is required
                </div>
                <div *ngIf="f['password']['errors']['minlength']">
                  Password must be at least 6 characters
                </div>
              </div>
            </div>

            <div class="col-span-1 md:col-span-2">
              <button
                type="submit"
                class="w-full rounded-lg  px-4 py-2 text-center text-base font-semibold border-color-two bg-main-color hover:!bg-[#A79277] hover:text-[#FFF2E1] border-[1px] shadow-md ring-offset-2 transition focus:ring-2"
              >
                Log in
              </button>
            </div>
          </form>

          <div class="py-12 text-center">
            <p class="whitespace-nowrap text-gray-600">
              Don't have an account?
              <a
                [routerLink]="['/register']"
                class="underline-offset-4 font-semibold text-gray-900 underline"
                >Register Now.</a
              >
            </p>
          </div>
        </div>
      </div>

      <div
        class="pointer-events-none relative hidden select-none bg-black md:block md:w-1/2 h-auto"
      >
        <div class="absolute bottom-0 z-10 px-8 text-white opacity-100">
          <p class="mb-8 text-3xl font-semibold leading-10">
            We work 10x faster than our competitors and stay consistent. While
            they're bogged down with technical debt, we're releasing new
            features.
          </p>
          <p class="mb-4 text-3xl font-semibold">John Elmond</p>
          <p>Founder, Emogue</p>
          <p class="mb-7 text-sm opacity-70">Web Design Agency</p>
        </div>
        <img
          class="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
          src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="Background image"
        />
      </div>
    </div>
  `,
})
export default class LoginPage implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }
    );
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;    
    if (this.loginForm.invalid) {
      return;
    }
    const formData = this.loginForm.getRawValue();
    const _user = {
      email: formData.email,
      password: formData.password,
      username: formData.firstName + ' ' + formData.lastName,
    };
    this.authService.login(_user);
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
}
