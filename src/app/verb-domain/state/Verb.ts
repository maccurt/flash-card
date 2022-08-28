export interface FromTo {
    from: string;
    to: string;
}

export class TenseType {
    text: string = '';
    sentenceList?: FromTo[];
}

export class Sentence implements FromTo {
    from!: string;
    to!: string;
}

export class Verb implements FromTo {
    constructor() {
        this.presentTense = new Tense();
        this.preteriteTense = new Tense();
    }
    sentenceList!: FromTo[];
    to: string = '';
    from: string = '';
    presentTense!: Tense;
    preteriteTense!: Tense;
}

//https://www.bucks.edu/media/bcccmedialibrary/tutoring/documents/writingareahandoutrevision/spanish/Spanish-Subject-Pronouns.pdf
export class Tense {
    text: string = '';
    fistPersonSingular!: TenseType;
    firstPersonPlural: string = '';
    secondPersonSingular: string = '';
    secondPersonPlural: string = '';
    thirdPersonSingular: string = '';
    thirdPersonPlurual: string = '';
    constructor() {
        this.fistPersonSingular = new TenseType();
    }
}

