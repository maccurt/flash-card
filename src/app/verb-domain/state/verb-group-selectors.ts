import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VerbState } from "./verb.reducer";
import { selectRouteParams } from '../../router-state/router.selectors';

const getVerbStateSelector = createFeatureSelector<VerbState>('verb');

export const getVerbGroup = createSelector(getVerbStateSelector, (state) => state.verbGroup);

export const getVerbGroupFromRouteSelector = createSelector(
    getVerbStateSelector,
    selectRouteParams,
    ({ verbGroupList }, { id }) => {

        if (verbGroupList) {
            return verbGroupList.find((v) => {
                return v.id === id
            });
        }
        //What should happen here, never should happen?
        return undefined
    }
);

export const getVerbGroupList = createSelector(getVerbStateSelector, (state) => {
    return state.verbGroupList;
});

export const verbGroupSelectors = {
    getVerbGroupList,
    getVerbGroup
};

export default verbGroupSelectors;


