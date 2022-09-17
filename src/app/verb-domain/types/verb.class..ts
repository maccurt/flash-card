import { Sentence } from './Sentence';
import { FromTo } from "./FromTo";
import { Tense } from "./Tense";

export class Verb implements FromTo {
    paragraph?:string;
    sentenceList: Sentence[] = [];
    to: string = '';
    from: string = '';
    //tense
    tenseList: Tense[] = [];
    presentTense: Tense = new Tense();
    preteriteTense: Tense = new Tense();

    constructor() { }
}