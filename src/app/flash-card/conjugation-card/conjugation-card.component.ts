import { ConjugateService } from './../../verb-domain/conjugate.service';
import { Component, Input, OnInit } from '@angular/core';
import { Tense } from 'src/app/verb-domain/types/Tense';

@Component({
  selector: 'app-conjugation-card',
  templateUrl: './conjugation-card.component.html',
  styleUrls: ['./conjugation-card.component.scss']
})
export class ConjugationCardComponent {

  @Input() header!: string | null | undefined;
  @Input() tense!: Tense;
  constructor(private conjugationService: ConjugateService) { }
}