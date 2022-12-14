import { StemChangeType } from './types/StemChangeType.enum';
import { Verb } from "./types/verb.class.";
import { Injectable } from '@angular/core';
import { Tense } from "./types/Tense";
import { TenseType } from "./types/TenseType";
import { VerbEndingInterface } from './VerbEndingInterface';
import { VerbEnding } from './VerbEnding';

export const verbEndings = {
  presentTense: {
    ar: ['o', 'as', 'a', 'amos', 'áis', 'an'],
    er: ['o', 'es', 'e', 'emos', 'éis', 'en'],
    ir: ['o', 'es', 'e', 'imos', 'ís', 'en']
  },
  preteriteTense: {
    ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
    er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
    ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron']
  }
};

@Injectable({
  providedIn: 'root'
})
export class ConjugateService {

  constructor() { }

  getPresentTense = (verb: Verb): Tense => {

    let stem = verb.to.substring(0, verb.to.length - 2).toLowerCase();
    let bootStem = '';

    const verbEnding = this.getVerbEnding(verb.to);
    const endings = this.getVerbEndingList(verbEnding, verbEndings.presentTense);
    let tense = new Tense();
    tense.text = "Present Tense";

    switch (verb.presentTense.stemChangeType) {
      case StemChangeType.er_verb_e_to_ei:
      case StemChangeType.ar_verb_e_to_ei:
        bootStem = this.getStemChange(verb.to, verb.presentTense.stemChangeType);
        break;
      case StemChangeType.none:
        if (this.endsInCerOrCirWithVowel(verb.to)) {
          tense.firstPersonSingular.text = (verb.to.substring(0, verb.to.length - 3) + 'zco').toLowerCase();
        }
    }

    if (tense.firstPersonSingular.text === '') {
      tense.firstPersonSingular.text = this.conjugateFromStem(stem, bootStem, endings[0]);
    }

    tense.secondPersonSingular.text = this.conjugateFromStem(stem, bootStem, endings[1]);
    tense.thirdPersonSingular.text = this.conjugateFromStem(stem, bootStem, endings[2]);
    tense.firstPersonPlural.text = this.conjugateFromStem(stem, '', endings[3]);
    tense.secondPersonPlural.text = this.conjugateFromStem(stem, '', endings[4]);
    tense.thirdPersonPlural.text = this.conjugateFromStem(stem, bootStem, endings[5]);

    //TODO this could be a problem because you might remove the
    //the setence list, etc..
    return this.swapTense(verb.presentTense, tense);
  };

  getPreteriteTense = (verb: Verb): Tense => {
    let tense = this.getPreteriteTenseSpanish(verb.to);
    return this.swapTense(verb.preteriteTense, tense);
  };

  getPreteriteTenseSpanish = (verb: string): Tense => {
    let tense = new Tense();
    tense.text = "Preterite";
    tense.firstPersonSingular = new TenseType();

    verb = verb.toLowerCase();
    let stem = this.getSpanishRoot(verb);
    let endings: string[] = [];

    endings = this.getVerbEndingList(this.getVerbEnding(verb), verbEndings.preteriteTense);

    tense.firstPersonSingular.text = stem + endings[0];
    tense.secondPersonSingular.text = stem + endings[1];
    tense.thirdPersonSingular.text = stem + endings[2];
    //
    tense.firstPersonPlural.text = stem + endings[3];
    tense.secondPersonPlural.text = stem + endings[4];
    tense.thirdPersonPlural.text = stem + endings[5];
    return tense;
  };

  conjugateFromStem = (stem: string, stemChange: string, ending: string): string => {
    if (stemChange !== '') {
      return (stemChange + ending).toLowerCase();
    }
    return (stem + ending).toLowerCase();
  };

  getSpanishRoot = (verb: string): string => {
    const root = verb.substring(0, verb.length - 2);
    return root;
  };

  getVerbEnding = (verb: string): VerbEnding => {
    const lower = verb.toLowerCase();
    if (lower.endsWith('ar')) { return VerbEnding.ar; };
    if (lower.endsWith('ir')) { return VerbEnding.ir; };
    if (lower.endsWith('er')) { return VerbEnding.er; };
    return VerbEnding.unknown;
  };

  getTenselist = (verb: Verb): Tense[] => {
    const tenseList: Tense[] = [];
    tenseList.push(this.getPresentTense(verb));
    tenseList.push(this.getPreteriteTense(verb));
    return tenseList;
  };

  setAllTense = (verb: Verb) => {
    verb.presentTense = this.getPresentTense(verb);
    verb.preteriteTense = this.getPreteriteTense(verb);
    verb.tenseList = [];
    verb.tenseList.push(verb.presentTense);
    verb.tenseList.push(verb.preteriteTense);
  };

  getVerbEndingList = (verbEnding: VerbEnding, tenseVerbEnding: VerbEndingInterface): string[] => {
    let endingListToReturn: string[];
    switch (verbEnding) {
      case VerbEnding.ar:
        endingListToReturn = tenseVerbEnding.ar;
        break;
      case VerbEnding.er:
        endingListToReturn = tenseVerbEnding.er;
        break;
      case VerbEnding.ir:
        endingListToReturn = tenseVerbEnding.ir;
        break;
      default:
        endingListToReturn = [];
    }
    return endingListToReturn;
  };

  getStemChange = (verb: string, stemChangeType: StemChangeType): string => {
    let stem = verb.substring(0, verb.length - 2);

    switch (stemChangeType) {
      case StemChangeType.ar_verb_e_to_ei:
      case StemChangeType.er_verb_e_to_ei:

        let split = stem.split('e');
        //TODO refactor this to work with all for verbs 
        //that have an 2 e in stems > defender = defiend        
        //Provde a different examplw
        stem = split.length === 3 ?
          stem = stem.replace(split[1] + 'e', split[1] + 'ie') :
          stem = stem[0] + stem.substring(1).replace('e', 'ie');
        break;
      case StemChangeType.ar_verb_o_to_ui:
      case StemChangeType.er_verb_o_to_ui:
        stem = stem[0] + stem.substring(1).replace('o', 'ue');
        break;
    }

    return stem;
  };

  getPresentTenseStemChange = (verb: string): string => {

    let stem = verb.substring(0, verb.length - 2);
    if (stem.indexOf('e') > -1) {
      //consider empezer (to begin) begins with e
      if (verb[0].toLowerCase() === "e") {
        stem = 'e' + stem.substring(1).replace('e', 'ie');
      }
      else {
        stem = stem.replace('e', 'ie');
      }
      return stem;
    }

    if (stem.indexOf('o')) {
      stem = stem.replace('o', 'ue');
      return stem;
    }
    return stem;
  };

  swapTenseType = (orginalTenseType: TenseType, tense: TenseType): void => {
    if (orginalTenseType) {
      //TODO what happens as you add more, is there a way to spread this for all 
      //new properties      
      tense.sentenceList = orginalTenseType.sentenceList;
      if (orginalTenseType.text !== '' && orginalTenseType.text) {
        tense.text = orginalTenseType.text;
      }
    };
  };

  swapTense = (orignalTense: Tense, tense: Tense): Tense => {
    if (!orignalTense) { return tense; };
    //first person
    this.swapTenseType(orignalTense.firstPersonSingular, tense.firstPersonSingular);
    this.swapTenseType(orignalTense.firstPersonPlural, tense.firstPersonPlural);
    //second person
    this.swapTenseType(orignalTense.secondPersonSingular, tense.secondPersonSingular);
    this.swapTenseType(orignalTense.secondPersonPlural, tense.secondPersonPlural);
    //third person
    this.swapTenseType(orignalTense.thirdPersonSingular, tense.thirdPersonSingular);
    this.swapTenseType(orignalTense.thirdPersonPlural, tense.thirdPersonPlural);
    return tense;
  };

  endsInCerOrCirWithVowel = (verb: string): boolean => {

    if (verb.length > 4) {
      let last4 = verb.slice(-4).toLowerCase();
      let vowels = ['a', 'e', 'i', 'o', 'u'];

      if (last4.endsWith('cer') || last4.endsWith('cir')) {
        let firstChar = last4.substring(0, 1);
        return (vowels.findIndex((v) => { return v === firstChar; }) > -1);
      }
    }
    return false;
  };
}

// á = 0225; Á = 0193. // é = 0233; É = 0201. // í = 0237; Í = 0205.
  // ó = 0243; Ó = 0211. // ú = 0250; Ú = 0218. // ý = 0253; Ý = 0221.