export interface FromTo {
    from: string;
    to: string;
}

export class TenseType {
    text!: string;
    sentenceList?: FromTo[];
}

//https://www.bucks.edu/media/bcccmedialibrary/tutoring/documents/writingareahandoutrevision/spanish/Spanish-Subject-Pronouns.pdf
export class Tense {
    
    fistPersonSingular!: TenseType;
    firstPersonPlural!: string;    //we/nosotoros    
    secondPersonSingular!: String;//you/tu        
    secondPersonPlural!: string;  //vosotros    
    thirdPersonSingular!: string; //she/ella
    thirdPersonPlurual!: string; //ellos/ellas/ustedes    
}

export class Verb implements FromTo {
    constructor() { }
    from!: string;
    to!: string;
    presentTense!: Tense;
}
