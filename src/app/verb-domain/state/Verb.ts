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

