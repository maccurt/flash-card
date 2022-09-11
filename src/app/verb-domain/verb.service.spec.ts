import { StemChangeType } from './types/StemChangeType.enum';
import { Verb } from './types/verb.class.';
import { VerbGroup, VerbOverride } from './types/VerbGroup.class';
import { VerbService } from './verb.service';

describe('VerbService', () => {
    let service: VerbService = new VerbService(null as any);

    describe('setVerbGroupOverride', () => {

        it('stem change is overridden in group', () => {

            let verbGroup = new VerbGroup();
            verbGroup.override = new VerbOverride();
            verbGroup.override.presentTenseStemChangeType = StemChangeType.ar_verb_e_to_ei;

            const v1 = new Verb();
            v1.presentTense.stemChangeType = StemChangeType.er_verb_e_to_ei;
            const v2 = new Verb();
            v2.presentTense.stemChangeType = StemChangeType.ar_verb_o_to_ui;

            verbGroup.verbList.push(v1);
            verbGroup.verbList.push(v2);
            service.setVerbGroupOverride(verbGroup);
            expect(v1.presentTense.stemChangeType)
                .toBe(StemChangeType.ar_verb_e_to_ei as any);

            expect(v2.presentTense.stemChangeType)
                .toBe(StemChangeType.ar_verb_e_to_ei as any);
        });

        it('stem change is NOT overridden in group', () => {

            let verbGroup = new VerbGroup();
            const v1 = new Verb();
            v1.presentTense.stemChangeType = StemChangeType.er_verb_e_to_ei;

            const v2 = new Verb();
            v2.presentTense.stemChangeType = StemChangeType.ar_verb_o_to_ui;

            verbGroup.verbList.push(v1);
            verbGroup.verbList.push(v2);
            service.setVerbGroupOverride(verbGroup);
            expect(v1.presentTense.stemChangeType)
                .toBe(StemChangeType.er_verb_e_to_ei);

            expect(v2.presentTense.stemChangeType)
                .toBe(StemChangeType.ar_verb_o_to_ui);
        });
    });

});