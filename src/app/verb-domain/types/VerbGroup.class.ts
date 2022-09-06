import { StemChangeType } from './StemChangeType.enum';
import { Instruction } from './Instruction';
import { Verb } from './verb.class.';
export class VerbGroup {    
    presentTenseStemChangeType:StemChangeType = StemChangeType.none
    id!: number;
    name: string = '';
    description!: string;
    instruction?: Instruction;
    verbList: Verb[] = [];
}

