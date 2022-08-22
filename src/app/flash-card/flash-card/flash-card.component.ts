import { FromTo } from './../../verb-domain/state/Verb';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.scss']
})
export class FlashCardComponent implements OnInit {

  @Input() card!: FromTo;
  showTo: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  toggleShowTo = () => {
    this.showTo = !this.showTo;
  };

}