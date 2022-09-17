import { Verb } from "./types/verb.class.";
import { ConjugateService, verbEndings } from './conjugate.service';
import { VerbEnding } from "./VerbEnding";
import { TenseType } from "./types/TenseType";
import { StemChangeType } from "./types/StemChangeType.enum";
import { Tense } from "./types/Tense";

describe('ConjugateService', () => {
  let service: ConjugateService;

  beforeEach(() => {
    service = new ConjugateService();
  });

  describe('swapTenseType', () => {

    it('undefined should not override', () => {

      let orignalTense: Tense = new Tense();
      orignalTense.firstPersonSingular.text = undefined;

      let tense: Tense = new Tense();
      tense.firstPersonSingular.text = "should be this";

      service.swapTenseType(orignalTense.firstPersonSingular, tense.firstPersonSingular);
      expect(tense.firstPersonSingular.text).toBe('should be this');
    });

  });

  describe('swap tense', () => {

    it('orginal text is undefined, should not swap', () => {
      let orignalTense: Tense = new Tense();
      orignalTense.firstPersonSingular.text = undefined;
      let tense: Tense = new Tense();
      tense.firstPersonSingular.text = "should be this";
      service.swapTense(orignalTense, tense);
      expect(tense.firstPersonSingular.text).toEqual('should be this');
    });

    it('if I overide all the tenses it should put those tenses there', () => {

      let orignalTense: Tense = new Tense();
      orignalTense.firstPersonSingular.text = "fps override";
      orignalTense.firstPersonPlural.text = "fpp override";
      orignalTense.secondPersonSingular.text = "sps override";
      orignalTense.secondPersonPlural.text = "spp override";
      orignalTense.thirdPersonSingular.text = "tps override";
      orignalTense.thirdPersonPlural.text = "tpp override";
      let tense: Tense = new Tense();
      let result = service.swapTense(orignalTense, tense);

      expect(result.firstPersonSingular.text).toBe('fps override');
      expect(result.firstPersonPlural.text).toBe('fpp override');
      expect(result.secondPersonSingular.text).toBe('sps override');
      expect(result.secondPersonPlural.text).toBe('spp override');
      expect(result.thirdPersonSingular.text).toBe('tps override');
      expect(result.thirdPersonPlural.text).toBe('tpp override');
    });

    it('If I DO NOT overide all the tenses it should put orignal test tenses there', () => {

      let orignalTense: Tense = new Tense();
      orignalTense.firstPersonSingular.sentenceList =
        [{ spanish: 'spanish', english: 'english' }];
      let tense: Tense = new Tense();

      tense.firstPersonSingular.text = "fps override";
      tense.firstPersonPlural.text = "fpp override";
      tense.secondPersonSingular.text = "sps override";
      tense.secondPersonPlural.text = "spp override";
      tense.thirdPersonSingular.text = "tps override";
      tense.thirdPersonPlural.text = "tpp override";
      let result = service.swapTense(orignalTense, tense);

      expect(result.firstPersonSingular.sentenceList)
        .toEqual([{ spanish: 'spanish', english: 'english' }]);

      expect(result.firstPersonSingular.text).toBe('fps override');
      expect(result.firstPersonPlural.text).toBe('fpp override');
      expect(result.secondPersonSingular.text).toBe('sps override');
      expect(result.secondPersonPlural.text).toBe('spp override');
      expect(result.thirdPersonSingular.text).toBe('tps override');
      expect(result.thirdPersonPlural.text).toBe('tpp override');
    });

  });

  describe('getPresentTenseStemChange', () => {

    it('empezar should be empiez.', () => {
      expect(service.getPresentTenseStemChange('empezar')).toBe('empiez');
    });

    describe('getStemChange', () => {

      it('present tense stem change ar verbs e to ie', () => {
        expect(service.getStemChange('cerrar', StemChangeType.ar_verb_e_to_ei)).toBe('cierr');
        expect(service.getStemChange('acertar', StemChangeType.ar_verb_e_to_ei)).toBe('aciert');
        expect(service.getStemChange('encerrar', StemChangeType.ar_verb_e_to_ei)).toBe('encierr');
      });

      it('present tense stem change er verbs e to ie', () => {
        expect(service.getStemChange('defender', StemChangeType.ar_verb_e_to_ei))
          .toBe('defiend');
        expect(service.getStemChange('perder', StemChangeType.ar_verb_e_to_ei))
          .toBe('pierd');
      });

      it('ar o to ue verb', () => {
        expect(service.getStemChange('contar', StemChangeType.ar_verb_o_to_ui)).toBe('cuent');
        expect(service.getStemChange('colgar', StemChangeType.ar_verb_o_to_ui)).toBe('cuelg');
      });

      it('er o to ue verb', () => {
        expect(service.getStemChange('volver', StemChangeType.er_verb_o_to_ui)).toBe('vuelv');
        expect(service.getStemChange('poder', StemChangeType.er_verb_o_to_ui)).toBe('pued');
      });
    });

    it('should return cierrar', () => {
      expect(service.getPresentTenseStemChange('cerrar')).toBe('cierr');
      expect(service.getPresentTenseStemChange('querer')).toBe('quier');
      expect(service.getPresentTenseStemChange('contar')).toBe('cuent');
      expect(service.getPresentTenseStemChange('volver')).toBe('vuelv');
      expect(service.getPresentTenseStemChange('encerar')).toBe('encier');
    });
  });

  //TODO change this description once you figure it out
  describe('getPresentTenseNew', () => {

    it('agradecer', () => {
      let verb = new Verb();
      verb.to = 'agradecer';
      let tense = service.getPresentTense(verb);
      expect(tense.firstPersonSingular.text).toBe('agradezco');
      expect(tense.secondPersonSingular.text).toBe('agradeces');
      expect(tense.thirdPersonSingular.text).toBe('agradece');
      expect(tense.firstPersonPlural.text).toBe('agradecemos');
      expect(tense.secondPersonPlural.text).toBe('agradecéis');
      expect(tense.thirdPersonPlural.text).toBe('agradecen');
    });

    it('TRADUCIR', () => {
      let verb = new Verb();
      verb.to = 'TRADUCIR';
      let tense = service.getPresentTense(verb);

      expect(tense.firstPersonSingular.text).toBe('traduzco');
    });

    it('hablar', () => {
      let verb = new Verb();
      verb.to = 'hablar';
      let tense = service.getPresentTense(verb);

      expect(tense.firstPersonSingular.text).toBe('hablo');
      expect(tense.secondPersonSingular.text).toBe('hablas');
      expect(tense.secondPersonPlural.text).toBe('habláis');
      expect(tense.thirdPersonSingular.text).toBe('habla');
      expect(tense.firstPersonPlural.text).toBe('hablamos');
      expect(tense.thirdPersonPlural.text).toBe('hablan');
    });

    it('beber', () => {
      let verb = new Verb();
      verb.to = 'beber';
      let tense = service.getPresentTense(verb);

      expect(tense.firstPersonSingular.text).toBe('bebo');
      expect(tense.secondPersonSingular.text).toBe('bebes');
      expect(tense.thirdPersonSingular.text).toBe('bebe');
      expect(tense.firstPersonPlural.text).toBe('bebemos');
      expect(tense.secondPersonPlural.text).toBe('bebéis');
      expect(tense.thirdPersonPlural.text).toBe('beben');
    });

    it('vivir', () => {
      let verb = new Verb();
      verb.to = 'vivir';
      let tense = service.getPresentTense(verb);
      expect(tense.firstPersonSingular.text).toBe('vivo');
      expect(tense.secondPersonSingular.text).toBe('vives');
      expect(tense.thirdPersonSingular.text).toBe('vive');
      expect(tense.firstPersonPlural.text).toBe('vivimos');
      expect(tense.secondPersonPlural.text).toBe('vivís');
      expect(tense.thirdPersonPlural.text).toBe('viven');
    });

    it('CONDUCIR', () => {
      let verb = new Verb();
      verb.to = "CONDUCIR";
      let tense = service.getPresentTense(verb);
      expect(tense.firstPersonSingular.text).toBe('conduzco');
      expect(tense.secondPersonSingular.text).toBe('conduces');
      expect(tense.thirdPersonSingular.text).toBe('conduce');
      expect(tense.firstPersonPlural.text).toBe('conducimos');
      expect(tense.secondPersonPlural.text).toBe('conducís');
      expect(tense.thirdPersonPlural.text).toBe('conducen');
    });

    it('hablar with with not present test should be correct', () => {
      let verb = new Verb();
      verb.to = 'hablar';
      verb.presentTense = new Tense();
      verb.presentTense.firstPersonSingular = new TenseType();
      verb.presentTense.firstPersonSingular.sentenceList?.push({ spanish: '', english: '' });
      let tense = service.getPresentTense(verb);

      expect(tense.firstPersonSingular.text).toBe('hablo');
      expect(tense.secondPersonSingular.text).toBe('hablas');
      expect(tense.secondPersonPlural.text).toBe('habláis');
      expect(tense.thirdPersonSingular.text).toBe('habla');
      expect(tense.firstPersonPlural.text).toBe('hablamos');
      expect(tense.thirdPersonPlural.text).toBe('hablan');
    });

    xit('hacer.', () => {
      let verb = new Verb();
      verb.to = 'hacer';
      verb.presentTense = new Tense();
      verb.presentTense.firstPersonSingular = new TenseType();
      verb.presentTense.firstPersonSingular.text = 'hago';
      verb.presentTense.secondPersonSingular.text = '';
      verb.presentTense.thirdPersonSingular = undefined as any;
      verb.presentTense.firstPersonPlural = null as any;
      const tense = service.getPresentTense(verb);

      expect(tense.firstPersonSingular?.text).toBe('hago');
      expect(tense.secondPersonSingular.text).toBe('haces');
      expect(tense.thirdPersonSingular.text).toBe('hace');
      expect(tense.firstPersonPlural.text).toBe('hacemos');
      expect(tense.secondPersonPlural.text).toBe('hacéis');
      expect(tense.thirdPersonPlural.text).toBe('hacen');
    });

    it('defender StemChangeType.er_verb_e_to_ei', () => {
      let verb = new Verb();
      verb.presentTense.stemChangeType = StemChangeType.er_verb_e_to_ei;
      verb.to = "defender";
      const tense = service.getPresentTense(verb);
      //single
      expect(tense.firstPersonSingular?.text).toBe('defiendo');
      expect(tense.secondPersonSingular.text).toBe('defiendes');
      expect(tense.thirdPersonSingular.text).toBe('defiende');
      //plural
      expect(tense.firstPersonPlural.text).toBe('defendemos');
      expect(tense.secondPersonPlural.text).toBe('defendéis');
      expect(tense.thirdPersonPlural.text).toBe('defienden');
    });

    it('cerrar StemChangeType.ar_verb_e_to_ei', () => {
      let verb = new Verb();
      verb.presentTense.stemChangeType = StemChangeType.ar_verb_e_to_ei;
      verb.to = "cerrar";
      const tense = service.getPresentTense(verb);
      //single
      expect(tense.firstPersonSingular?.text).toBe('cierro');
      expect(tense.secondPersonSingular.text).toBe('cierras');
      expect(tense.thirdPersonSingular.text).toBe('cierra');
      //plural
      expect(tense.firstPersonPlural.text).toBe('cerramos');
      expect(tense.secondPersonPlural.text).toBe('cerráis');
      expect(tense.thirdPersonPlural.text).toBe('cierran');
    });

    it('empezar should conguate as stem change it begins with e', () => {
      let verb = new Verb();
      verb.to = "empezar";
      verb.presentTense.stemChangeType = StemChangeType.ar_verb_e_to_ei;
      const tense = service.getPresentTense(verb);
      //single
      expect(tense.firstPersonSingular?.text).toBe('empiezo');
      expect(tense.secondPersonSingular.text).toBe('empiezas');
      expect(tense.thirdPersonSingular.text).toBe('empieza');
      //plural
      expect(tense.firstPersonPlural.text).toBe('empezamos');
      expect(tense.secondPersonPlural.text).toBe('empezáis');
      expect(tense.thirdPersonPlural.text).toBe('empiezan');
    });
  });

  describe('Name of the group', () => {
    it('should behave...', () => {
      let verb = new Verb();
      verb.from = 'to attack';
      verb.to = 'atacar';

      expect(verb.presentTense.firstPersonPlural.text).toEqual('');
      expect(verb.preteriteTense.firstPersonPlural.text).toEqual('');
      service.setAllTense(verb);
      expect(verb.presentTense.firstPersonPlural.text).not.toEqual('');
      expect(verb.preteriteTense.firstPersonPlural.text).not.toEqual('');
    });
  });

  describe('getPreteriteTense', () => {

    it('should set actacar correctly and override correctly', () => {
      let verb = new Verb();

      verb.from = 'to attack';
      verb.to = 'atacar';
      verb.preteriteTense = new Tense();
      verb.preteriteTense.firstPersonSingular.text = 'actaqué';
      let tense = service.getPreteriteTense(verb);

      //single
      expect(tense.firstPersonSingular?.text).toBe('actaqué');
      expect(tense.secondPersonSingular.text).toBe('atacaste');
      expect(tense.thirdPersonSingular.text).toBe('atacó');
      //plural
      expect(tense.firstPersonPlural.text).toBe('atacamos');
      expect(tense.secondPersonPlural.text).toBe('atacasteis');
      expect(tense.thirdPersonPlural.text).toBe('atacaron');
    });

  });

  describe('getVerbEndingList', () => {

    it('ending should be correct', () => {
      let endings = service.getVerbEndingList(VerbEnding.ar, verbEndings.presentTense);
      expect(endings.length).toBe(6);
      expect(endings).toEqual(verbEndings.presentTense.ar);
      expect(endings[0]).toEqual('o');
    });

  });

  describe('getVerbEnding', () => {

    it('should get correct ending', () => {
      expect(service.getVerbEnding('hablar')).toBe(VerbEnding.ar);
      expect(service.getVerbEnding('vivir')).toBe(VerbEnding.ir);
      expect(service.getVerbEnding('comer')).toBe(VerbEnding.er);
      expect(service.getVerbEnding('')).toBe(VerbEnding.unknown);
    });
  });

  describe('past tense', () => {

    it('hablar', () => {
      let tense = service.getPreteriteTenseSpanish('hablar');
      //single
      expect(tense.firstPersonSingular?.text).toBe('hablé');
      expect(tense.secondPersonSingular.text).toBe('hablaste');
      expect(tense.thirdPersonSingular.text).toBe('habló');
      //plural
      expect(tense.firstPersonPlural.text).toBe('hablamos');
      expect(tense.secondPersonPlural.text).toBe('hablasteis');
      expect(tense.thirdPersonPlural.text).toBe('hablaron');
    });

    it('vivir', () => {
      let tense = service.getPreteriteTenseSpanish('vivir');
      //single
      expect(tense.firstPersonSingular?.text).toBe('viví');
      expect(tense.secondPersonSingular.text).toBe('viviste');
      expect(tense.thirdPersonSingular.text).toBe('vivió');
      //plural
      expect(tense.firstPersonPlural.text).toBe('vivimos');
      expect(tense.secondPersonPlural.text).toBe('vivisteis');
      expect(tense.thirdPersonPlural.text).toBe('vivieron');
    });

    it('comer', () => {
      let tense = service.getPreteriteTenseSpanish('comer');
      //single
      expect(tense.firstPersonSingular?.text).toBe('comí');
      expect(tense.secondPersonSingular.text).toBe('comiste');
      expect(tense.thirdPersonSingular.text).toBe('comió');
      //plural
      expect(tense.firstPersonPlural.text).toBe('comimos');
      expect(tense.secondPersonPlural.text).toBe('comisteis');
      expect(tense.thirdPersonPlural.text).toBe('comieron');
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
      //expect(service.endsInCerOrCirWithVowel('hacer')).toBeFalse();
      //hacer would be hago, so you will have to override it

    });
  });
});