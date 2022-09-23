import { createAction, props } from "@ngrx/store";
import { Verb } from "../types/verb.class.";

export const loadVerbList = createAction('[verb] load verb list');
export const loadVerbListSucess = createAction('[verb] load verb list success', props<{ verbList: Verb[] }>());
export const loadVerbListError = createAction('[verb] load verb list error', props<{ error: Error }>());
///
export const loadVerb = createAction('[verb] load verb');
export const loadVerbSuccess = createAction('[verb] load verb success', props<{ verb: Verb }>());
export const loadVerbError = createAction('[verb] load verb error', props<{ error: Error }>());
export const loadVerbTense = createAction('[verb] load verb tense', props<{ verb: Verb }>());
export const loadVerbTenseSuccess = createAction('[verb] load verb tense success', props<{ verb: Verb }>());

export const populateVerb = createAction('[verb group component] populate verb properties', props<{ verb: Verb }>());
export const populateVerbSuccess = createAction('[verb group effect] populate verb properties success', props<{ verb: Verb }>());

export const verbActions = {
    loadVerbList,
    loadVerbListSucess,
    loadVerbListError,
    loadVerb,
    loadVerbSuccess,
    loadVerbError,
    loadVerbTense,
    loadVerbTenseSuccess,
    populateVerb,
    populateVerbSuccess
};

export default verbActions;