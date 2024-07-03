import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import gsap from 'gsap';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import { isPlatformBrowser } from '@angular/common';

export const isAuthenticatedGuard: CanActivateFn = (route,state) => {
  const url = state.url.substring(1);
  const _platformId = inject(PLATFORM_ID);

  const isAuthenticated = Boolean(inject(AuthService).currentUserSig());
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const  scrollTo = (id:string) => {
    gsap.to(window, {
      scrollTo: id,
      duration: 1,
      ease: 'power2',
    });
  }

  if (isAuthenticated) return true;

  snackBar.open("You Don't Have Permission" , 'Okay',{
    verticalPosition: 'bottom',
    horizontalPosition: 'center',
    duration: 4000,
    panelClass:['snackbar-container','bg-main-color']
  });

  if(isPlatformBrowser(_platformId)) {
    if(document?.getElementById('section-'+url)) {
      gsap.registerPlugin(ScrollToPlugin);
      scrollTo("#section-"+url);
    }
  }
  
  

  router.navigateByUrl('/');
  return false;
};
