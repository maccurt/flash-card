import { FromTo, Tense } from "./Verb";

export class Verb implements FromTo {
    sentenceList!: FromTo[];
    to: string = '';
    from: string = '';
    //tense
    tenseList: Tense[] = [];
    presentTense!: Tense;
    preteriteTense!: Tense;

    constructor() {        
        this.presentTense = new Tense();
        this.preteriteTense = new Tense();        
    }
}