import { FromTo } from '../../verb-domain/types/FromTo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.scss']
})
export class FlashCardComponent  {

  @Input() card!: FromTo;
  showTo: boolean = false;

  constructor() { }  

  toggleShowTo = () => {
    this.showTo = !this.showTo;
  };

}