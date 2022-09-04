import { VerbGroup } from "../types/VerbGroup";
import { Verb } from '../types/verb.class.';
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

// export const getVerbListFromGroup = createSelector(
//     getVerbStateSelector,
//     (state) => {

//         //TODO rethink this, not efficient, can you do with lodash?
//         const verbListFilter: Verb[] = [];
//         state.verbGroup?.verbList.forEach((v1) => {

//             const verb = state.verbList.find((v2) => {
//                 return v1.toLowerCase() === v2.to.toLowerCase();
//             });
//             if (verb) {
//                 verbListFilter.push(verb);
//             }
//         });
//         return verbListFilter;
//     }
// );

export const getVerbGroup = createSelector(getVerbStateSelector, (state) => state.verbGroup);

export const getVerbGroupList = createSelector(getVerbStateSelector, (state) => {
    return state.verbGroupList;
});



export const verbSelectors = {
    getVerbListSelector,
    getVerbSelector,
    getVerbFromRouteSelector,
    //
    getVerbGroupList,
    //getVerbListFromGroup,
    getVerbGroup
};

export default verbSelectors; 