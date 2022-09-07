import { Verb } from "./types/verb.class.";
import { ConjugateService, verbEndings } from './conjugate.service';
import { VerbEnding } from "./VerbEnding";
import { Tense } from "./types/Tense";
import { TenseType } from "./types/TenseType";
import { StemChangeType } from "./types/StemChangeType.enum";

describe('ConjugateService', () => {
  let service: ConjugateService;

  beforeEach(() => {
    service = new ConjugateService();
  });

  describe('getPresentTenseStemChange', () => {

    it('should behave...', () => {
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

      expect(tense.fistPersonSingular.text).toBe('agradezco');
      expect(tense.secondPersonSingular).toBe('agradeces');
      expect(tense.thirdPersonSingular).toBe('agradece');
      expect(tense.firstPersonPlural).toBe('agradecemos');
      expect(tense.secondPersonPlural).toBe('agradecéis');
      expect(tense.thirdPersonPlurual).toBe('agradecen');
    });

    it('TRADUCIR', () => {
      let verb = new Verb();
      verb.to = 'TRADUCIR';
      let tense = service.getPresentTense(verb);

      expect(tense.fistPersonSingular.text).toBe('traduzco');
    });

    it('hablar', () => {
      let verb = new Verb();
      verb.to = 'hablar';
      let tense = service.getPresentTense(verb);

      expect(tense.fistPersonSingular.text).toBe('hablo');
      expect(tense.secondPersonSingular).toBe('hablas');
      expect(tense.secondPersonPlural).toBe('habláis');
      expect(tense.thirdPersonSingular).toBe('habla');
      expect(tense.firstPersonPlural).toBe('hablamos');
      expect(tense.thirdPersonPlurual).toBe('hablan');
    });

    it('beber', () => {
      let verb = new Verb();
      verb.to = 'beber';
      let tense = service.getPresentTense(verb);

      expect(tense.fistPersonSingular.text).toBe('bebo');
      expect(tense.secondPersonSingular).toBe('bebes');
      expect(tense.thirdPersonSingular).toBe('bebe');
      expect(tense.firstPersonPlural).toBe('bebemos');
      expect(tense.secondPersonPlural).toBe('bebéis');
      expect(tense.thirdPersonPlurual).toBe('beben');
    });

    it('vivir', () => {
      let verb = new Verb();
      verb.to = 'vivir';
      let tense = service.getPresentTense(verb);
      expect(tense.fistPersonSingular.text).toBe('vivo');
      expect(tense.secondPersonSingular).toBe('vives');
      expect(tense.thirdPersonSingular).toBe('vive');
      expect(tense.firstPersonPlural).toBe('vivimos');
      expect(tense.secondPersonPlural).toBe('vivís');
      expect(tense.thirdPersonPlurual).toBe('viven');
    });

    it('CONDUCIR', () => {
      let verb = new Verb();
      verb.to = "CONDUCIR";
      let tense = service.getPresentTense(verb);
      expect(tense.fistPersonSingular.text).toBe('conduzco');
      expect(tense.secondPersonSingular).toBe('conduces');
      expect(tense.thirdPersonSingular).toBe('conduce');
      expect(tense.firstPersonPlural).toBe('conducimos');
      expect(tense.secondPersonPlural).toBe('conducís');
      expect(tense.thirdPersonPlurual).toBe('conducen');
    });

    it('hablar with with not present test should be correct', () => {
      let verb = new Verb();
      verb.to = 'hablar';
      verb.presentTense = new Tense();
      verb.presentTense.fistPersonSingular = new TenseType();
      verb.presentTense.fistPersonSingular.sentenceList?.push({ to: '', from: '' });
      let tense = service.getPresentTense(verb);

      expect(tense.fistPersonSingular.text).toBe('hablo');
      expect(tense.secondPersonSingular).toBe('hablas');
      expect(tense.secondPersonPlural).toBe('habláis');
      expect(tense.thirdPersonSingular).toBe('habla');
      expect(tense.firstPersonPlural).toBe('hablamos');
      expect(tense.thirdPersonPlurual).toBe('hablan');
    });

    it('hacer.', () => {
      let verb = new Verb();
      verb.to = 'hacer';
      verb.presentTense = new Tense();
      verb.presentTense.fistPersonSingular = { text: 'hago' };
      verb.presentTense.secondPersonSingular = '';
      verb.presentTense.thirdPersonSingular = undefined as any;
      verb.presentTense.firstPersonPlural = null as any;
      const tense = service.getPresentTense(verb);

      expect(tense.fistPersonSingular?.text).toBe('hago');
      expect(tense.secondPersonSingular).toBe('haces');
      expect(tense.thirdPersonSingular).toBe('hace');
      expect(tense.firstPersonPlural).toBe('hacemos');
      expect(tense.secondPersonPlural).toBe('hacéis');
      expect(tense.thirdPersonPlurual).toBe('hacen');
    });

    it('defender StemChangeType.er_verb_e_to_ei', () => {
      let verb = new Verb();
      verb.presentTense.stemChangeType = StemChangeType.er_verb_e_to_ei;
      verb.to = "defender";
      const tense = service.getPresentTense(verb);
      //single
      expect(tense.fistPersonSingular?.text).toBe('defiendo');
      expect(tense.secondPersonSingular).toBe('defiendes');
      expect(tense.thirdPersonSingular).toBe('defiende');
      //plural
      expect(tense.firstPersonPlural).toBe('defendemos');
      expect(tense.secondPersonPlural).toBe('defendéis');
      expect(tense.thirdPersonPlurual).toBe('defienden');
    });

    it('cerrar StemChangeType.ar_verb_e_to_ei', () => {
      let verb = new Verb();
      verb.presentTense.stemChangeType = StemChangeType.ar_verb_e_to_ei;
      verb.to = "cerrar";
      const tense = service.getPresentTense(verb);
      //single
      expect(tense.fistPersonSingular?.text).toBe('cierro');
      expect(tense.secondPersonSingular).toBe('cierras');
      expect(tense.thirdPersonSingular).toBe('cierra');
      //plural
      expect(tense.firstPersonPlural).toBe('cerramos');
      expect(tense.secondPersonPlural).toBe('cerráis');
      expect(tense.thirdPersonPlurual).toBe('cierran');
    });

    it('empezar should conguate as stem change it begins with e', () => {
      let verb = new Verb();
      verb.to = "empezar";
      verb.presentTense.stemChangeType = StemChangeType.ar_verb_e_to_ei;
      const tense = service.getPresentTense(verb);
      //single
      expect(tense.fistPersonSingular?.text).toBe('empiezo');
      expect(tense.secondPersonSingular).toBe('empiezas');
      expect(tense.thirdPersonSingular).toBe('empieza');
      //plural
      expect(tense.firstPersonPlural).toBe('empezamos');
      expect(tense.secondPersonPlural).toBe('empezáis');
      expect(tense.thirdPersonPlurual).toBe('empiezan');
    });
  });

  describe('Name of the group', () => {
    it('should behave...', () => {
      let verb = new Verb();
      verb.from = 'to attack';
      verb.to = 'atacar';

      expect(verb.presentTense.firstPersonPlural).toEqual('');
      expect(verb.preteriteTense.firstPersonPlural).toEqual('');
      service.setAllTense(verb);
      expect(verb.presentTense.firstPersonPlural).not.toEqual('');
      expect(verb.preteriteTense.firstPersonPlural).not.toEqual('');
    });
  });

  describe('getPreteriteTense', () => {

    it('should set actacar correctly and override correctly', () => {
      let verb = new Verb();

      verb.from = 'to attack';
      verb.to = 'atacar';
      verb.preteriteTense = new Tense();
      verb.preteriteTense.fistPersonSingular.text = 'actaqué';
      let tense = service.getPreteriteTense(verb);

      //single
      expect(tense.fistPersonSingular?.text).toBe('actaqué');
      expect(tense.secondPersonSingular).toBe('atacaste');
      expect(tense.thirdPersonSingular).toBe('atacó');
      //plural
      expect(tense.firstPersonPlural).toBe('atacamos');
      expect(tense.secondPersonPlural).toBe('atacasteis');
      expect(tense.thirdPersonPlurual).toBe('atacaron');
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
      expect(tense.fistPersonSingular?.text).toBe('hablé');
      expect(tense.secondPersonSingular).toBe('hablaste');
      expect(tense.thirdPersonSingular).toBe('habló');
      //plural
      expect(tense.firstPersonPlural).toBe('hablamos');
      expect(tense.secondPersonPlural).toBe('hablasteis');
      expect(tense.thirdPersonPlurual).toBe('hablaron');
    });

    it('vivir', () => {
      let tense = service.getPreteriteTenseSpanish('vivir');
      //single
      expect(tense.fistPersonSingular?.text).toBe('viví');
      expect(tense.secondPersonSingular).toBe('viviste');
      expect(tense.thirdPersonSingular).toBe('vivió');
      //plural
      expect(tense.firstPersonPlural).toBe('vivimos');
      expect(tense.secondPersonPlural).toBe('vivisteis');
      expect(tense.thirdPersonPlurual).toBe('vivieron');
    });

    it('comer', () => {
      let tense = service.getPreteriteTenseSpanish('comer');
      //single
      expect(tense.fistPersonSingular?.text).toBe('comí');
      expect(tense.secondPersonSingular).toBe('comiste');
      expect(tense.thirdPersonSingular).toBe('comió');
      //plural
      expect(tense.firstPersonPlural).toBe('comimos');
      expect(tense.secondPersonPlural).toBe('comisteis');
      expect(tense.thirdPersonPlurual).toBe('comieron');
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