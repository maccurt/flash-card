import { TenseType } from "./TenseType";

//https://www.bucks.edu/media/bcccmedialibrary/tutoring/documents/writingareahandoutrevision/spanish/Spanish-Subject-Pronouns.pdf

export class Tense {
    text: string = '';
    fistPersonSingular!: TenseType;
    firstPersonPlural: string = '';
    secondPersonSingular: string = '';
    secondPersonPlural: string = '';
    thirdPersonSingular: string = '';
    thirdPersonPlurual: string = '';

    isStemChange?: boolean;

    constructor() {
        this.fistPersonSingular = new TenseType();
    }
}
