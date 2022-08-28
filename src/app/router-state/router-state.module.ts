import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({ router: routerReducer }),
    
    //TODO odd this is for root, need to explain or understand
    //Yes this does have to be the for the root
    StoreRouterConnectingModule.forRoot()
  ],
  //TODO why do we have to export these?
  //1. So the app module can get it?
  exports:[StoreModule, StoreRouterConnectingModule]
})
export class RouterStateModule { }
