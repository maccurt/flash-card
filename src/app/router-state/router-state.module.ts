import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('router', routerReducer),
    StoreRouterConnectingModule.forRoot()
  ],
  exports: [StoreModule, StoreRouterConnectingModule]
})
export class RouterStateModule { }
