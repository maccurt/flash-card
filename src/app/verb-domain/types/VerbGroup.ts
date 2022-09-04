import { Verb } from './verb.class.';
export class VerbGroup {
    id!:number;
    name: string = '';
    description!: string;
    verbList: Verb[] = [];
}