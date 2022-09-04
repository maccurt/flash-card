import { Observable } from 'rxjs';
import { verbSelectors } from './../state/verb.selectos';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { VerbGroup } from "../types/VerbGroup";

@Component({
  selector: 'app-verb-group-list',
  templateUrl: './verb-group-list.component.html',
  styleUrls: ['./verb-group-list.component.scss']
})
export class VerbGroupListComponent implements OnInit {
  verbGroupList$!: Observable<VerbGroup[] | undefined>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.verbGroupList$ = this.store.select(verbSelectors.getVerbGroupList);
  }
}
