import { StemChangeType } from './StemChangeType.enum';
import { Instruction } from './Instruction';
import { Verb } from './verb.class.';

export class VerbOverride {
    presentTenseStemChangeType: StemChangeType = StemChangeType.none;
}
export class VerbGroup {
    override!: VerbOverride;
    id!: number;
    name: string = '';
    description!: string;
    instruction?: Instruction;
    verbList: Verb[] = [];
}