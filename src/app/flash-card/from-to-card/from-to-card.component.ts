import { FromTo } from '../../verb-domain/types/FromTo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-from-to-card',
  templateUrl: './from-to-card.component.html',
  styleUrls: ['./from-to-card.component.scss']
})
export class FromToCardComponent {

  constructor() { }

  @Input() card!: FromTo;
  showTo: boolean = false;
}
