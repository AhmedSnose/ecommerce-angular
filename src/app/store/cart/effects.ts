import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ACTIONS from '../cart/actions';
import { concatMap, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../appStateInterface';
import { CartService } from '../../services/cart.service';

@Injectable()
export class cartEffects {
  changeProductQty$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ACTIONS.changeProductQty),
      switchMap((data) => {
        this.store.dispatch(ACTIONS.changeProductQtySucceed({ ...data }));
        return of(ACTIONS.calculateTotalPrice({ groupIndex: data.groupIndex }));
      })
    );
  });


  constructor(
    private actions$: Actions,
    private store: Store<AppStateInterface>,
    private cartService: CartService
  ) {}
}
