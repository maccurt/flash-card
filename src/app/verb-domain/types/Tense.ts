import { PronounOption } from "./PronounOption.interface";
import { StemChangeType } from "./StemChangeType.enum";
import { TenseType } from "./TenseType";

export class Tense {
    stemChangeType: StemChangeType = StemChangeType.none;
    text: string = ''; //this is the title, perhaps it should change
    firstPersonSingular!: TenseType;
    firstPersonPlural!: TenseType;
    secondPersonSingular!: TenseType;
    secondPersonPlural!: TenseType;
    thirdPersonSingular!: TenseType;
    thirdPersonPlural!: TenseType;
    
    isStemChange?: boolean;
    pronounOption: PronounOption = PronounOption.unknown;

    constructor() {
        this.firstPersonSingular = new TenseType();
        this.secondPersonSingular = new TenseType();
        this.thirdPersonSingular = new TenseType();
        //
        this.firstPersonPlural = new TenseType();
        this.secondPersonPlural = new TenseType();
        this.thirdPersonPlural = new TenseType();
    }
}