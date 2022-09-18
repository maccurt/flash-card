import { Sentence, Paragraph } from './Sentence';
import { FromTo } from "./FromTo";
import { Tense } from "./Tense";

export class Verb implements FromTo {
    paragraph:Paragraph = new Paragraph();
    sentenceList: Sentence[] = [];
    to: string = '';
    from: string = '';
    //tense
    tenseList: Tense[] = [];
    presentTense: Tense = new Tense();
    preteriteTense: Tense = new Tense();

    constructor() { }
}