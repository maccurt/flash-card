import { PronounOption } from 'src/app/verb-domain/types/PronounOption.interface';
import { Tense } from './../../verb-domain/types/Tense';
import { ConjugationCardComponent } from './conjugation-card.component';

describe('conjugation-card.component.spec.ts', () => {    

    describe('getPrononSentenceList', () => {        

        it('should bring back the correct sentence list for each tense type', () => {            
            let component = new ConjugationCardComponent(null as any, null as any);
            let presentTense = new Tense();           
            presentTense.firstPersonSingular.sentenceList?.push({ english: 'fps', spanish: 'dont-matter' });
            presentTense.firstPersonPlural.sentenceList?.push({ english: 'fpp', spanish: 'dont-matter' });
            presentTense.secondPersonSingular.sentenceList?.push({ english: 'sps', spanish: 'dont-matter' });
            presentTense.secondPersonPlural.sentenceList?.push({ english: 'spp', spanish: 'dont-matter' });
            presentTense.thirdPersonSingular.sentenceList?.push({ english: 'tps', spanish: 'dont-matter' });
            presentTense.thirdPersonPlural.sentenceList?.push({ english: 'tpp', spanish: 'dont-matter' });

            //first person singular should get sentences from pers
            expect(component.getPrononSentenceList(presentTense, PronounOption.firstPersonSingular))
                .toBe(presentTense.firstPersonSingular.sentenceList);

            expect(component.getPrononSentenceList(presentTense, PronounOption.firstPersonPlural))
                .toBe(presentTense.firstPersonPlural.sentenceList);
            expect(component.getPrononSentenceList(presentTense, PronounOption.firstPersonSingular))
                .toBe(presentTense.firstPersonSingular.sentenceList);
            expect(component.getPrononSentenceList(presentTense, PronounOption.secondPersonSingular))
                .toBe(presentTense.secondPersonSingular.sentenceList);                
            expect(component.getPrononSentenceList(presentTense, PronounOption.secondPersonPlural))
                .toBe(presentTense.secondPersonPlural.sentenceList);
            expect(component.getPrononSentenceList(presentTense, PronounOption.thirdPersonSingular))
                .toBe(presentTense.thirdPersonSingular.sentenceList);
            expect(component.getPrononSentenceList(presentTense, PronounOption.thirdPersonPlural))
                .toBe(presentTense.thirdPersonPlural.sentenceList);
        });
    });
});