import { ConjugateService } from './../../verb-domain/conjugate.service';
import { Tense, Verb } from './../../verb-domain/state/Verb';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-conjugation-card',
  templateUrl: './conjugation-card.component.html',
  styleUrls: ['./conjugation-card.component.scss']
})
export class ConjugationCardComponent implements OnInit {

  @Input() verb!: Verb;
  tense!: Tense;
  constructor(private conjugationService: ConjugateService) { }

  ngOnInit(): void {
    this.tense = new Tense();
    this.tense = this.conjugationService.getSpanishPresentTest(this.verb);
  }
}
