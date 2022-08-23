export interface FromTo {
    from: string;
    to: string;
}

export class TenseType {
    text: string = ''
    sentenceList?: FromTo[];
}

//https://www.bucks.edu/media/bcccmedialibrary/tutoring/documents/writingareahandoutrevision/spanish/Spanish-Subject-Pronouns.pdf
export class Tense {


    constructor() {
        this.fistPersonSingular = new TenseType();
    }
    fistPersonSingular!: TenseType;
    firstPersonPlural: string = '';
    secondPersonSingular: string = '';
    secondPersonPlural: string = '';
    thirdPersonSingular: string = '';
    thirdPersonPlurual: string = '';
}

export class Verb implements FromTo {
    constructor() {
        this.presentTense = new Tense()
        this.preteriteTense = new Tense();
    }
    from: string = '';
    to: string = '';
    presentTense!: Tense;
    preteriteTense!: Tense;
}
