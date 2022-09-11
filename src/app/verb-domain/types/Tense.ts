import { PronounOption } from "./PronounOption.interface";
import { StemChangeType } from "./StemChangeType.enum";
import { TenseType } from "./TenseType";

export class Tense {
    stemChangeType: StemChangeType = StemChangeType.none;
    text: string = '';
    fistPersonSingular!: TenseType;
    firstPersonPlural!: TenseType;
    secondPersonSingular!: TenseType;
    secondPersonPlural!: TenseType;
    thirdPersonSingular!: TenseType;
    thirdPersonPlurual!: TenseType;
    isStemChange?: boolean;
    pronounOption: PronounOption = PronounOption.unknown;

    constructor() {
        this.fistPersonSingular = new TenseType();
        this.secondPersonSingular = new TenseType();
        this.thirdPersonSingular = new TenseType();
        //
        this.firstPersonPlural = new TenseType();
        this.secondPersonPlural = new TenseType();
        this.thirdPersonPlurual = new TenseType();
    }
}