import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LogoComponent } from '../../shared/logo/logo.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { itemsSelector, totalItemsInCart } from '../../../store/cart/selectors';
import { AppStateInterface } from '../../../store/appStateInterface';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../shared/Models/productType';
import { RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from '../../../services/auth.service';
import { AvatarModule } from 'primeng/avatar';
import {MatMenuModule} from '@angular/material/menu';

/**
 * @title Toolbar overview
 */
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.style.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    // need to change (we only need cart icon)
    MatIconModule,
    LogoComponent,
    NgIf,
    RouterLink,
    AsyncPipe,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    FlexLayoutModule,
    AvatarModule,
    MatMenuModule
  ],
})
export class MenubarComponent  {
  cartItemsLength$!: Observable<number>;

  constructor(
    private store: Store<AppStateInterface>,
    public authService: AuthService
  ) {
    this.cartItemsLength$ = this.store.pipe(select(totalItemsInCart));
  }

  logout() {
    this.authService.logout();
  }

}
