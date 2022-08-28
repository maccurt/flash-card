import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VerbState } from "./verb.reducer";

const getVerbStateSelector = createFeatureSelector<VerbState>('verb');
export const getVerbListSelector = createSelector(getVerbStateSelector, state => state.verbList);

export const getVerbSelector = () => createSelector(getVerbStateSelector, (state) => {
    return state.verb;
});

export const getVerbFromListSelector = (verb: string) => createSelector(getVerbStateSelector, (state) => {
    const result = state.verbList.find((v) => {
        return v.to.toLowerCase() === verb.toLowerCase();
    });
    return result;
});

export const verbSelectors = {
    getVerbListSelector,
    getVerbSelector,
    getVerbFromListSelector
};

export default verbSelectors; 