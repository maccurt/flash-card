import { Paragraph } from './types/Sentence';
import { StemChangeType } from './types/StemChangeType.enum';
import { Verb } from './types/verb.class.';
import { VerbGroup, VerbOverride } from './types/VerbGroup.class';
import { VerbService } from './verb.service';

describe('VerbService', () => {
    let service: VerbService = new VerbService(null as any);



    describe('getSetenceListFromStringParagraph', () => {

        it('it should seperate by ! ? and .', () => {
            let paragraph = 'We close the box! You close the top of the carton? She close the window. They close all the shutters due to rain?'
            const list = service.getSetenceListFromStringParagraph(paragraph)
            expect(list[0]).toEqual('We close the box!');
            expect(list[1]).toEqual('You close the top of the carton?');
            expect(list[2]).toEqual('She close the window.');
            expect(list[3]).toEqual('They close all the shutters due to rain?');
        });

        it('it should seperate by ! ? and .', () => {
            let paragraph = 'Cerramos la caja. Tú cierras la parte superior de la caja. Ella cierra la ventana. Cierran todas las persianas debido a la lluvia.'
            const list = service.getSetenceListFromStringParagraph(paragraph)
            expect(list[0]).toEqual('Cerramos la caja.');
            expect(list[1]).toEqual('Tú cierras la parte superior de la caja.');
            expect(list[2]).toEqual('Ella cierra la ventana.');
            expect(list[3]).toEqual('Cierran todas las persianas debido a la lluvia.');
        });

    });
    describe('getSentenceListFromParagraph', () => {

        it('should populate correctly.', () => {
            let paragraph: Paragraph = new Paragraph();
            paragraph.english = 'We close the box! You close the top of the carton? She close the window. They close all the shutters due to rain?';
            paragraph.spanish = 'Cerramos la caja. Tú cierras la parte superior de la caja. Ella cierra la ventana. Cierran todas las persianas debido a la lluvia.';

            let list = service.getSentenceListFromParagraph(paragraph);
            expect(list.length).toEqual(4);

            expect(list[0].english).toEqual('We close the box!');
            expect(list[1].english).toEqual('You close the top of the carton?');
            expect(list[2].english).toEqual('She close the window.');
            expect(list[3].english).toEqual('They close all the shutters due to rain?');

            expect(list[0].spanish).toEqual('Cerramos la caja.');
            expect(list[1].spanish).toEqual('Tú cierras la parte superior de la caja.');
            expect(list[2].spanish).toEqual('Ella cierra la ventana.');
            expect(list[3].spanish).toEqual('Cierran todas las persianas debido a la lluvia.');
            

        });

    });

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