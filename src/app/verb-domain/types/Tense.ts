import { StemChangeType } from "./StemChangeType.enum";
import { TenseType } from "./TenseType";

export class Tense {
    stemChangeType: StemChangeType = StemChangeType.none
    text: string = '';
    fistPersonSingular!: TenseType;
    //TODO in the future this should be a TenseType not a string; does it have value?
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
