import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    MatCardModule,
    MatChipsModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
