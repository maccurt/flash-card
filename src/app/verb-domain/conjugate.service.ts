import { Verb, Tense, TenseType } from './state/Verb';
import { Injectable } from '@angular/core';

export enum VerbEnding {
  unknown = 0,
  ar,
  ir,
  er
};

@Injectable({
  providedIn: 'root'
})
export class ConjugateService {
  //â, ê, î, ô, û Â, Ê, Î, Ô, Û
  //ã, ñ, õ Ã, Ñ, Õ
  //é

  // á = 0225; Á = 0193. // é = 0233; É = 0201. // í = 0237; Í = 0205.
  // ó = 0243; Ó = 0211. // ú = 0250; Ú = 0218. // ý = 0253; Ý = 0221.
  verbEndings = {
    presentTense: {
      ar: ['o', 'as', 'a', 'amos', 'áis', 'an'],
      er: ['o', 'es', 'e', 'emos', 'éis', 'en'],
      ir: ['o', 'es', 'e', 'imos', 'ís', 'en']
    },
    pastTense: {
      ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
      er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
      ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron']
    }
  };

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

  getPresentTense = (verb: Verb): Tense => {
    let tense = this.getSpanishPresentTense(verb.to);
    return this.swapTense(verb.presentTense, tense);
  };

  swapTense = (orignalTense: Tense, tense: Tense): Tense => {

    if (!orignalTense) {
      return tense;
    }

    if (orignalTense.fistPersonSingular.text) {
      tense.fistPersonSingular = orignalTense.fistPersonSingular;
    }

    if (orignalTense.secondPersonSingular) {
      tense.secondPersonSingular = orignalTense.secondPersonSingular;
    }

    if (orignalTense.thirdPersonSingular) {
      tense.thirdPersonSingular = orignalTense.thirdPersonSingular;
    }

    if (orignalTense.firstPersonPlural) {
      tense.firstPersonPlural = orignalTense.firstPersonPlural;
    }

    if (orignalTense.secondPersonPlural) {
      tense.secondPersonPlural = orignalTense.secondPersonPlural;

    }
    if (orignalTense.thirdPersonPlurual) {
      tense.thirdPersonPlurual = orignalTense.thirdPersonPlurual;
    }

    return tense;
  };


  getPastTense = (verb: string): Tense => {

    let tense = new Tense()
    tense.fistPersonSingular = new TenseType();

    verb = verb.toLowerCase();
    let stem = this.getSpanishRoot(verb);
    let verbEnding = this.getVerbEnding(verb);
    let endings: string[] = [];

    switch (verbEnding) {
      case VerbEnding.ar:
        endings = this.verbEndings.pastTense.ar;
        break;
      case VerbEnding.er:
        endings = this.verbEndings.pastTense.er;
        break;
      case VerbEnding.ir:
        endings = this.verbEndings.pastTense.ir;
        break;
    }

    tense.fistPersonSingular.text = stem + endings[0];
    tense.secondPersonSingular = stem + endings[1];
    tense.thirdPersonSingular = stem + endings[2];
    tense.firstPersonPlural = stem + endings[3];
    tense.secondPersonPlural = stem + endings[4];
    tense.thirdPersonPlurual = stem + endings[5];

    return tense
  }

  getSpanishPresentTense = (verb: string): Tense => {

    let tense = new Tense();
    //TODO consider this, do you want to change all input to lower case
    verb = verb.toLowerCase();
    let verbEnding = this.getVerbEnding(verb);
    let stem = this.getSpanishRoot(verb);

    tense.fistPersonSingular = new TenseType();
    let endings: string[] = [];

    switch (verbEnding) {
      case VerbEnding.ar:
        endings = this.verbEndings.presentTense.ar;
        break;
      case VerbEnding.er:
        endings = this.verbEndings.presentTense.er;
        break;
      case VerbEnding.ir:
        endings = this.verbEndings.presentTense.ir;
        break;
    }

    if (this.endsInCerOrCirWithVowel(verb)) {
      tense.fistPersonSingular.text = verb.substring(0, verb.length - 3) + 'zco';
    }
    else {
      tense.fistPersonSingular.text = stem + endings[0];
    }

    tense.secondPersonSingular = stem + endings[1];
    tense.thirdPersonSingular = stem + endings[2];
    tense.firstPersonPlural = stem + endings[3];
    tense.secondPersonPlural = stem + endings[4];
    tense.thirdPersonPlurual = stem + endings[5];

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