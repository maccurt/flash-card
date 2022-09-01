import { verbActions } from './verb.actions';
import { Verb } from './verb.class.';
import { verbReducer, VerbState, verbStateInitial } from "./verb.reducer";

describe('verbReducer', () => {

    let mockState: VerbState = {
        verbList: [],
        error: 'previous error'
    };
    let verbList: Verb[] = [{ to: 'to practice' } as any];

    it('loadVerbList', () => {
        let result = verbReducer(mockState, verbActions.loadVerbList);
        expect(result).toEqual(verbStateInitial);
        expect(result.error).toBe('');
    });

    it('loadVerbListSucess', () => {
        let result = verbReducer(mockState,
            verbActions.loadVerbListSucess({ verbList }));
        expect(result.verbList).toEqual(verbList);
        expect(result.error).toBe('');
    });

    it('loadVerbListError', () => {
        let result = verbReducer(mockState,
            verbActions.loadVerbListError({ error: new Error('mocked error') }));
        expect(result.verbList).toEqual([]);
        expect(result.error).toEqual('mocked error');
    });

    it('loadVerb', () => {
        let result = verbReducer(mockState,
            verbActions.loadVerb());
        expect(result.error).toBe('');
    });

    it('loadVerbSuccess', () => {
        let result = verbReducer(mockState,
            verbActions.loadVerbSuccess({ verb: verbList[0] }));
        expect(result.verb).toBe(verbList[0]);
        expect(result.error).toBe('');
    });

});