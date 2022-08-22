import { Tense, TenseType, Verb } from './state/Verb';
import { ConjugateService, VerbEnding } from './conjugate.service';

// á = 0225; Á = 0193.
// é = 0233; É = 0201.
// í = 0237; Í = 0205.
// ó = 0243; Ó = 0211.
// ú = 0250; Ú = 0218.
// ý = 0253; Ý = 0221.

describe('ConjugateService', () => {
  let service: ConjugateService;

  beforeEach(() => {
    service = new ConjugateService();
  });

  describe('getVerbEnding', () => {

    it('should get correct ending', () => {
      expect(service.getVerbEnding('hablar')).toBe(VerbEnding.ar);
      expect(service.getVerbEnding('vivir')).toBe(VerbEnding.ir);
      expect(service.getVerbEnding('comer')).toBe(VerbEnding.er);
      expect(service.getVerbEnding('')).toBe(VerbEnding.unknown);
    });
  });

  describe('setSpanishPresentTest', () => {

    it('hacer with hago should be correct', () => {

      let verb = new Verb();
      verb.to = 'hacer';
      verb.presentTense = new Tense();
      verb.presentTense.fistPersonSingular = { text: 'hago' };
      verb.presentTense.secondPersonSingular = '';
      verb.presentTense.thirdPersonSingular = undefined as any;
      verb.presentTense.firstPersonPlural = null as any;
      const tense = service.getSpanishPresentTest(verb);

      expect(tense.fistPersonSingular?.text).toBe('hago');
      expect(tense.secondPersonSingular).toBe('haces');
      expect(tense.thirdPersonSingular).toBe('hace');
      expect(tense.firstPersonPlural).toBe('hacemos');
      expect(tense.secondPersonPlural).toBe('hacéis');
      expect(tense.thirdPersonPlurual).toBe('hacen');
    });

    it('hablar with with not present test should be correct', () => {
      let verb = new Verb();
      verb.to = 'hablar';
      verb.presentTense = new Tense();
      verb.presentTense.fistPersonSingular = new TenseType();
      verb.presentTense.fistPersonSingular.sentenceList?.push({to:'',from:''});
      let tense = service.getSpanishPresentTest(verb);

      expect(tense.fistPersonSingular.text).toBe('hablo');
      expect(tense.secondPersonSingular).toBe('hablas');
      expect(tense.secondPersonPlural).toBe('habláis');
      expect(tense.thirdPersonSingular).toBe('habla');
      expect(tense.firstPersonPlural).toBe('hablamos');
      expect(tense.thirdPersonPlurual).toBe('hablan');
    });
  });

  describe('getSpanishPresentTense', () => {

    it('CONDUCIR', () => {
      let tense = service.getSpanishPresentTense('CONDUCIR');
      expect(tense.fistPersonSingular.text).toBe('conduzco');
      expect(tense.secondPersonSingular).toBe('conduces');
      expect(tense.thirdPersonSingular).toBe('conduce');
      expect(tense.firstPersonPlural).toBe('conducimos');
      expect(tense.secondPersonPlural).toBe('conducís');
      expect(tense.thirdPersonPlurual).toBe('conducen');
    });

    it('CONDUCIR', () => {
      let tense = service.getSpanishPresentTense('TRADUCIR');
      expect(tense.fistPersonSingular.text).toBe('traduzco');
    });

    it('agradecer', () => {
      let tense = service.getSpanishPresentTense('agradecer');
      expect(tense.fistPersonSingular.text).toBe('agradezco');
      expect(tense.secondPersonSingular).toBe('agradeces');
      expect(tense.thirdPersonSingular).toBe('agradece');
      expect(tense.firstPersonPlural).toBe('agradecemos');
      expect(tense.secondPersonPlural).toBe('agradecéis');
      expect(tense.thirdPersonPlurual).toBe('agradecen');
    });

    it('hablar', () => {
      let tense = service.getSpanishPresentTense('hablar');
      expect(tense.fistPersonSingular.text).toBe('hablo');
      expect(tense.secondPersonSingular).toBe('hablas');
      expect(tense.secondPersonPlural).toBe('habláis');
      expect(tense.thirdPersonSingular).toBe('habla');
      expect(tense.firstPersonPlural).toBe('hablamos');
      expect(tense.thirdPersonPlurual).toBe('hablan');
    });

    it('beber', () => {
      let tense = service.getSpanishPresentTense('beber');
      expect(tense.fistPersonSingular.text).toBe('bebo');
      expect(tense.secondPersonSingular).toBe('bebes');
      expect(tense.thirdPersonSingular).toBe('bebe');
      expect(tense.firstPersonPlural).toBe('bebemos');
      expect(tense.secondPersonPlural).toBe('bebéis');
      expect(tense.thirdPersonPlurual).toBe('beben');
    });

    it('vivir', () => {
      let tense = service.getSpanishPresentTense('vivir');
      expect(tense.fistPersonSingular.text).toBe('vivo');
      expect(tense.secondPersonSingular).toBe('vives');
      expect(tense.thirdPersonSingular).toBe('vive');
      expect(tense.firstPersonPlural).toBe('vivimos');
      expect(tense.secondPersonPlural).toBe('vivís');
      expect(tense.thirdPersonPlurual).toBe('viven');
    });

  });

  describe('getSpanishRoot', () => {
    it('should return proper root', () => {
      expect(service.getSpanishRoot('hablar')).toEqual('habl');
      expect(service.getSpanishRoot('vivir')).toEqual('viv');
      expect(service.getSpanishRoot('correr')).toEqual('corr');
    });
  });

  describe('endsInCerOrCirWithVowel', () => {

    it('endsInCerOrCirWithVowel', () => {

      expect(service.endsInCerOrCirWithVowel('agradecer')).toBeTrue();
      expect(service.endsInCerOrCirWithVowel('APARECER')).toBeTrue();
      expect(service.endsInCerOrCirWithVowel('Conducir')).toBeTrue();
      expect(service.endsInCerOrCirWithVowel('ejercer')).toBeFalse();
      expect(service.endsInCerOrCirWithVowel('vencer')).toBeFalse();

      //TODO how do you fix hacer? It is not in the grop
      //https://www.fluentin3months.com/spanish-irregular-verbs/
      //Use this
      // expect(service.endsInCerOrCirWithVowel('hacer')).toBeFalse();

    });

  });

});
