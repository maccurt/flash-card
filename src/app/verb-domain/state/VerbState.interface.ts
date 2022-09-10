import { PronounOption } from './../types/PronounOption.interface';
import { VerbGroup } from "../types/VerbGroup.class";
import { Verb } from "../types/verb.class.";

export interface VerbState {
    verbList: Verb[];
    verb?: Verb;
    error: string;
    verbGroupList?: VerbGroup[];
    verbGroup?: VerbGroup;
    verbGroupOptions?: {
        presentTensePronoun: PronounOption
        preteriteTensePronou: PronounOption
    }
}

export const verbStateInitial: VerbState = {
    verbList: [],
    error: ''
};

