import { PronounOption } from 'src/app/verb-domain/types/PronounOption.interface';
import { Tense } from './../../verb-domain/types/Tense';
import { ConjugationCardComponent } from './conjugation-card.component';

describe('conjugation-card.component.spec.ts', () => {

    it('getPrononSentenceList', () => {

        let component = new ConjugationCardComponent(null as any, null as any);
        let tense = new Tense();

        tense.firstPersonSingular.sentenceList?.push({ english: 'fps', spanish: 'dont-matter' });
        tense.firstPersonPlural.sentenceList?.push({ english: 'fpp', spanish: 'dont-matter' });
        tense.secondPersonSingular.sentenceList?.push({ english: 'sps', spanish: 'dont-matter' });
        tense.secondPersonPlural.sentenceList?.push({ english: 'spp', spanish: 'dont-matter' });
        tense.thirdPersonSingular.sentenceList?.push({ english: 'tps', spanish: 'dont-matter' });
        tense.thirdPersonPlural.sentenceList?.push({ english: 'tpp', spanish: 'dont-matter' });

        expect(component.getPrononSentenceList(tense, PronounOption.firstPersonSingular))
            .toBe(tense.firstPersonSingular.sentenceList);
        expect(component.getPrononSentenceList(tense, PronounOption.firstPersonPlural))
            .toBe(tense.firstPersonPlural.sentenceList);
        expect(component.getPrononSentenceList(tense, PronounOption.firstPersonSingular))
            .toBe(tense.firstPersonSingular.sentenceList);
        expect(component.getPrononSentenceList(tense, PronounOption.secondPersonSingular))
            .toBe(tense.secondPersonSingular.sentenceList);
        expect(component.getPrononSentenceList(tense, PronounOption.secondPersonPlural))
            .toBe(tense.secondPersonPlural.sentenceList);
        expect(component.getPrononSentenceList(tense, PronounOption.thirdPersonSingular))
            .toBe(tense.thirdPersonSingular.sentenceList);
        expect(component.getPrononSentenceList(tense, PronounOption.thirdPersonPlural))
            .toBe(tense.thirdPersonPlural.sentenceList);
    });
});