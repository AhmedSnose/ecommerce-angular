import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private cartService: CartService, private router: Router) {
    if (
      this.cartService.groupSlug == null ||
      this.cartService.groupSlug == undefined
    )
      this.router.navigateByUrl('/cart');
  }
  canActivate(): boolean {
    return true;
  }
}

export const cartGuard: CanActivateFn = () =>
  inject(PermissionsService).canActivate();
