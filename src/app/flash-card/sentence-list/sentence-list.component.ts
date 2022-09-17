import { Sentence } from './../../verb-domain/types/Sentence';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sentence-list',
  templateUrl: './sentence-list.component.html',
  styleUrls: ['./sentence-list.component.scss']
})
export class SentenceListComponent implements OnInit {
  @Input() sentenceList: Sentence[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
