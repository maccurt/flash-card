import { TenseType } from './types/TenseType';
import { ConjugateService } from './conjugate.service';
import { Paragraph, Sentence } from './types/Sentence';
import { StemChangeType } from './types/StemChangeType.enum';
import { Verb } from './types/verb.class.';
import { VerbGroup, VerbOverride } from './types/VerbGroup.class';
import { VerbService } from './verb.service';

describe('VerbService', () => {

    let service: VerbService = new VerbService(null as any);

    const englishParagraph = 'I close.      We close.           You close?  You close now!           She close.     They close.'
    const spanishParagraph = 'Yo cierro.    Nosotros Cerramos.  Tú cierras? Vosotros cerráis ahora!  Ella cierra.   Ellos cierran.'

    describe('verb', () => {

        describe('setTenseTypeSentence', () => {
            it('cierra with period at end  should be found in cierras', () => {


                let w = 'found'
                let s = 'I am found'
                console.log(new RegExp(`\\b${w}\\b`).test(s));
            });

            it('cierra should NOT be found in cierras', () => {
                let sentence = new Sentence();
                sentence.spanish = "cierras";
                let tenseType = new TenseType();
                tenseType.text = 'cierra'

                service.setTenseTypeSentence(sentence, tenseType);
                expect(tenseType.sentenceList.length).toBe(0);
            });

            it('cierra should be found in cierra', () => {
                let sentence = new Sentence();
                sentence.spanish = "ella cierra";
                let tenseType = new TenseType();
                tenseType.text = 'cierra'
                service.setTenseTypeSentence(sentence, tenseType);
                expect(tenseType.sentenceList.length).toBe(1);
            });
        });

        it('getSentenceListFromParagraph', () => {

            let paragraph: Paragraph = new Paragraph();
            paragraph.english = englishParagraph;
            paragraph.spanish = spanishParagraph;
            let sentenceList = service.getSentenceListFromParagraph(paragraph);

            let conjugationService = new ConjugateService();

            let verb = new Verb();

            verb.paragraph.english = englishParagraph;
            verb.paragraph.spanish = spanishParagraph;
            verb.to = 'cerrar';
            verb.presentTense.stemChangeType = StemChangeType.ar_verb_e_to_ei;
            let tense = conjugationService.getPresentTense(verb);

            service.setTenseSentence(sentenceList, tense);

            //1st
            expect(tense.firstPersonSingular.sentenceList[0].spanish)
                .toEqual('Yo cierro.');


            expect(tense.firstPersonPlural.sentenceList[0].spanish)
                .toEqual('Nosotros Cerramos.');
            //2nd
            expect(tense.secondPersonSingular.sentenceList[0].spanish)
                .toEqual('Tú cierras?');
            expect(tense.secondPersonPlural.sentenceList[0].spanish)
                .toEqual('Vosotros cerráis ahora!');

            //3rd
            expect(tense.thirdPersonSingular.sentenceList[0].spanish)
                .toEqual('Ella cierra.');
            expect(tense.thirdPersonPlural.sentenceList[0].spanish)
                .toEqual('Ellos cierran.');

        });

    });

    describe('getSetenceListFromStringParagraph', () => {
        it('it should seperate by ! ? and .', () => {
            const list = service.getSetenceListFromStringParagraph(englishParagraph)
            expect(list[0]).toEqual('I close.');
            expect(list[1]).toEqual('We close.');
            expect(list[2]).toEqual('You close?');
            expect(list[3]).toEqual('You close now!');
            expect(list[4]).toEqual('She close.');
            expect(list[5]).toEqual('They close.');
        });

        it('it should seperate by ! ? and .', () => {
            const list = service.getSetenceListFromStringParagraph(spanishParagraph)
            expect(list[0]).toEqual('Yo cierro.');
            expect(list[1]).toEqual('Nosotros Cerramos.');
            expect(list[2]).toEqual('Tú cierras?');
            expect(list[3]).toEqual('Vosotros cerráis ahora!');
            expect(list[4]).toEqual('Ella cierra.');
            expect(list[5]).toEqual('Ellos cierran.');
        });
    });

    describe('getSentenceListFromParagraph', () => {

        it('should populate correctly.', () => {
            let paragraph: Paragraph = new Paragraph();
            paragraph.english = englishParagraph;
            paragraph.spanish = spanishParagraph;

            let list = service.getSentenceListFromParagraph(paragraph);
            expect(list.length).toEqual(6);
           // 'I close.      We close.           You close?  You close now!           She close.     They close.'
           // 'Yo cierro.    Nosotros Cerramos.  Tú cierras? Vosotros cerráis ahora!  Ella cierra.   Ellos cierran.'
            expect(list[0].english).toEqual('I close.');
            expect(list[1].english).toEqual('We close.');
            expect(list[2].english).toEqual('You close?');
            expect(list[3].english).toEqual('You close now!');
            expect(list[4].english).toEqual('She close.');

            expect(list[0].spanish).toEqual('Yo cierro.');
            expect(list[1].spanish).toEqual('Nosotros Cerramos.');
            expect(list[2].spanish).toEqual('Tú cierras?');
            expect(list[3].spanish).toEqual('Vosotros cerráis ahora!');
            expect(list[4].spanish).toEqual('Ella cierra.');
            expect(list[5].spanish).toEqual('Ellos cierran.');
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