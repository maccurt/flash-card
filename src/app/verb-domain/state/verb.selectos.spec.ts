import { VerbState } from "./VerbState.interface";
import { verbSelectors } from './verb.selectos';

describe('verb.selectors', () => {

    const verbToPractice = { to: 'practicar' };
    let verbStore: VerbState;

    beforeEach(() => {
        verbStore = { verb: { to: 'estudiar' } as any, verbList: [verbToPractice] } as VerbState;
    });

    it('getVerbListSelector should return verblist', () => {
        const result = verbSelectors.getVerbListSelector.projector(verbStore);
        expect(result).toBe(verbStore.verbList);
    });

    it('getVerbSelector should return verb', () => {
        const result =
            verbSelectors.getVerbSelector.projector(verbStore);

        expect(result?.to).toBe('estudiar');;
    });

    it('getVerbFromRouteSelector should return', () => {

        const result = verbSelectors.getVerbFromRouteSelector
            .projector(verbStore, { verb: 'practicar' });
        expect(result).toBe(verbToPractice as any);
    });
});