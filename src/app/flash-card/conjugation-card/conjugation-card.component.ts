import { ConjugateService } from './../../verb-domain/conjugate.service';
import { Tense } from './../../verb-domain/state/Verb';
import { Verb } from "../../verb-domain/state/verb.class.";
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-conjugation-card',
  templateUrl: './conjugation-card.component.html',
  styleUrls: ['./conjugation-card.component.scss']
})
export class ConjugationCardComponent implements OnInit {

  @Input() header!: string | null | undefined;
  @Input() tense!: Tense;
  constructor(private conjugationService: ConjugateService) { }

  ngOnInit(): void {

  }
}
