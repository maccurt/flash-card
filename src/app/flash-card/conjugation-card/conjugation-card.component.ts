import { ConjugateService } from './../../verb-domain/conjugate.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tense } from 'src/app/verb-domain/types/Tense';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-conjugation-card',
  templateUrl: './conjugation-card.component.html',
  styleUrls: ['./conjugation-card.component.scss']
})
export class ConjugationCardComponent implements OnInit {

  @Input() header!: string | null | undefined;
  @Input() tense!: Tense;  

  testId: string = '';
  constructor(private conjugationService: ConjugateService,
    private store:Store) { }

  ngOnInit(): void {
    if (this.tense) {
      const searchRegExp = /\s/g;
      this.testId = this.tense.text.replace(searchRegExp, '-').toLowerCase();
    }
  }

  firstPersonSingular = () => {
    
  };

  firstPersonPlural = () => {        
  }; 

  secondPersonSingular = ()=> {
  };

  secondPersonPlural = ()=> {
  };

  thirdPersonSingular = ()=> {
  };

  thirdPersonPlural = ()=> {

  };
}