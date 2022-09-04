import { Verb } from "./types/verb.class.";
import { Injectable } from '@angular/core';
import { Tense } from "./types/Tense";
import { TenseType } from "./types/TenseType";

export enum VerbEnding {
  unknown = 0, ar, ir, er
};

export interface VerbEndingInterface {
  ar: string[],
  er: string[],
  ir: string[]
};

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
  // á = 0225; Á = 0193. // é = 0233; É = 0201. // í = 0237; Í = 0205.
  // ó = 0243; Ó = 0211. // ú = 0250; Ú = 0218. // ý = 0253; Ý = 0221.
  constructor() { }

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

  setAllTense = (verb: Verb) => {

    verb.presentTense = this.getPresentTense(verb);
    verb.preteriteTense = this.getPreteriteTense(verb);
    verb.tenseList = [];
    verb.tenseList.push(verb.presentTense);
    verb.tenseList.push(verb.preteriteTense);

  };

  getPresentTense = (verb: Verb): Tense => {
    let tense = this.getPresentTenseSpanish(verb.to, verb.presentTense.isStemChange);
    return this.swapTense(verb.presentTense, tense);
  };

  getPreteriteTense = (verb: Verb): Tense => {
    let tense = this.getPreteriteTenseSpanish(verb.to);
    return this.swapTense(verb.preteriteTense, tense);
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

  getPreteriteTenseSpanish = (verb: string): Tense => {

    let tense = new Tense();
    tense.text = "Preterite";
    tense.fistPersonSingular = new TenseType();

    verb = verb.toLowerCase();
    let stem = this.getSpanishRoot(verb);
    let endings: string[] = [];

    endings = this.getVerbEndingList(this.getVerbEnding(verb), verbEndings.preteriteTense);

    tense.fistPersonSingular.text = stem + endings[0];
    tense.secondPersonSingular = stem + endings[1];
    tense.thirdPersonSingular = stem + endings[2];
    tense.firstPersonPlural = stem + endings[3];
    tense.secondPersonPlural = stem + endings[4];
    tense.thirdPersonPlurual = stem + endings[5];
    return tense;
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

  getPresentTenseSpanish = (verb: string, isStemChange: boolean = false): Tense => {

    let tense = new Tense();
    verb = verb.toLowerCase();
    let stem = this.getSpanishRoot(verb);
    let stemChange = '';

    if (isStemChange) {
      stemChange = this.getPresentTenseStemChange(verb);
    }
    else {
      stemChange = stem;
    }

    tense.text = "Present Tense";
    tense.fistPersonSingular = new TenseType();
    let endings = this.getVerbEndingList(this.getVerbEnding(verb), verbEndings.presentTense);

    if (this.endsInCerOrCirWithVowel(verb)) {
      tense.fistPersonSingular.text = verb.substring(0, verb.length - 3) + 'zco';
    }
    else {
      tense.fistPersonSingular.text = stemChange + endings[0];
    }
    tense.secondPersonSingular = stemChange + endings[1];
    tense.thirdPersonSingular = stemChange + endings[2];

    tense.firstPersonPlural = stem + endings[3];
    tense.secondPersonPlural = stem + endings[4];
    tense.thirdPersonPlurual = stemChange + endings[5];
    return tense;
  };

  swapTense = (orignalTense: Tense, tense: Tense): Tense => {

    if (!orignalTense) { return tense; }

    if (orignalTense.fistPersonSingular.text) {
      tense.fistPersonSingular = orignalTense.fistPersonSingular;
    };

    if (orignalTense.secondPersonSingular) {
      tense.secondPersonSingular = orignalTense.secondPersonSingular;
    };

    if (orignalTense.thirdPersonSingular) {
      tense.thirdPersonSingular = orignalTense.thirdPersonSingular;
    };

    if (orignalTense.firstPersonPlural) {
      tense.firstPersonPlural = orignalTense.firstPersonPlural;
    };

    if (orignalTense.secondPersonPlural) {
      tense.secondPersonPlural = orignalTense.secondPersonPlural;
    };

    if (orignalTense.thirdPersonPlurual) {
      tense.thirdPersonPlurual = orignalTense.thirdPersonPlurual;
    };

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