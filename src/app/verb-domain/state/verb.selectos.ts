import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VerbState } from "./verb.reducer";
import { selectRouteParams } from '../../router-state/router.selectors';

const getVerbStateSelector = createFeatureSelector<VerbState>('verb');
export const getVerbListSelector = createSelector(getVerbStateSelector,
    (state) => {
        return state.verbList;
    });

export const getVerbSelector = createSelector(getVerbStateSelector, (state) => {
    return state.verb;
});

export const getVerbFromRouteSelector = createSelector(
    getVerbStateSelector,
    selectRouteParams,
    ({ verbList }, { verb }) => {
        return verbList.find((v) => {
            return v.to.toLowerCase() === verb.toLowerCase();
        });
    }
);

export const verbSelectors = {
    getVerbListSelector,
    getVerbSelector,
    getVerbFromRouteSelector
};

export default verbSelectors; 