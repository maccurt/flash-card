import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { VerbState } from "./verb.reducer";

const getVerbStateSelector = createFeatureSelector<VerbState>('verb');
export const getVerbListSelector = createSelector(getVerbStateSelector, state => state.verbList);

export const verbSelectors = {
    getVerbListSelector
};

export default verbSelectors; 