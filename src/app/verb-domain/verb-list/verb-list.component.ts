import { Sentence } from './../types/Sentence';
import { verbGroupSelectors } from '../state/verb-group.selectors';
import { verbGroupActions } from './../state/verb-group.actions';
import { FromTo } from '../types/FromTo';
import { VerbGroup } from "../types/VerbGroup.class";
import { ConjugateService } from './../conjugate.service';
import { verbActions } from './../state/verb.actions';
import { verbSelectors } from './../state/verb.selectos';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { FormControl, FormGroup } from '@angular/forms';
import { Verb } from '../types/verb.class.';
import { Tense } from '../types/Tense';

@Component({
  selector: 'app-verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.scss']
})
export class VerbListComponent implements OnInit, AfterViewInit {
  verbList: Verb[] = [];
  verb!: Verb;
  showTranslation: boolean = false;

  presentTense!: Tense | null;
  preteriteTense!: Tense | null;
  sentence!: Sentence | null;
  showSentence: boolean = false;
  sentenceList: Sentence[] = [];

  verbGroupList?: VerbGroup[] = [];
  //form
  formGroup!: FormGroup;
  verbGroupListControl!: FormControl;

  //
  constructor(private store: Store,
    private conjugationService: ConjugateService

  ) { }

  ngOnInit(): void {

    //Set up form
    this.verbGroupListControl = new FormControl([]);    
    this.formGroup = new FormGroup({
      verbGroupList: this.verbGroupListControl
    });

    //get the verb group list for the select
    this.store.select(verbGroupSelectors.getVerbGroupList).subscribe((verbGroupList) => {
      this.verbGroupList = verbGroupList;
    });

    //set the to drop down select to selected verb group
    this.store.select(verbGroupSelectors.getVerbGroup).subscribe((verbGroup)=>{
      this.verbGroupListControl.setValue(verbGroup);
    });
    
    // this.store.select(verbSelectors.getVerbListFromGroup).subscribe((verbList) => {            
    //   if (verbList.length > 0) {
    //     this.verbList = verbList;
    //     //toFromList.sort(() => Math.random() - 0.5)        
    //     this.flashToFromList([...this.verbList]);
    //   }
    // });
  }

  ngAfterViewInit(): void {

    this.verbGroupListControl.valueChanges.subscribe((value) => {
      this.store.dispatch(verbGroupActions.setVerbGroupSelected({ verbGroup: value }));
    });
  }

  flashToFromList = (verbList: Verb[]) => {

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const waitTime = 3000;

    const loop = async () => {
      for (const verb of verbList) {

        //baseline
        this.verb = verb;
        this.presentTense = null;
        this.showTranslation = false;

        this.presentTense = this.conjugationService.getPresentTense(verb);
        //TOOO fix this so it uses the a non string version
        this.preteriteTense = this.conjugationService.getPreteriteTense(verb);

        this.sentence = null;
        if (verb.presentTense && verb.presentTense.firstPersonSingular && verb.presentTense.firstPersonSingular.sentenceList) {
          if (verb.presentTense.firstPersonSingular.sentenceList.length > 0) {
            this.sentence = verb.presentTense.firstPersonSingular.sentenceList[0];
            this.sentenceList = verb.presentTense.firstPersonSingular.sentenceList;
          }
        }
        //show the translation
        await wait(waitTime);
        this.showTranslation = true;

        //Wait to rotate to next verb
        await wait(waitTime + 8000);

      }
    };
    loop();

  };
}