import { Instruction } from './Instruction';
import { Verb } from './verb.class.';
export class VerbGroup {
    id!: number;
    name: string = '';
    description!: string;
    instruction?: Instruction;
    verbList: Verb[] = [];
}

