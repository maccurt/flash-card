import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatCardModule,
    MatChipsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
