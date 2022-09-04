import { VerbGroup } from "../types/VerbGroup";
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
//verb group list
// export const loadVerbGroupListError = createAction('[verb] get verb group list error', props<{ error: Error }>());
// export const loadVerbGroup = createAction('[verb] load verb group',props<{verbGroup:VerbGroup}>());
// export const loadVerbGroupSuccess = createAction('[verb] load verb group success',props<{verbGroup:VerbGroup}>());
// export const setVerbGroupSelected = createAction('[verb] setVerbGroup selected',props<{verbGroup:VerbGroup}>());
// export const setVerbGroupSelectedSuccess = createAction('[verb] setVerbGroup selected success',props<{verbGroup:VerbGroup}>());

export const verbActions = {
    loadVerbList,
    loadVerbListSucess,
    loadVerbListError,    
    loadVerb,
    loadVerbSuccess,
    loadVerbError,    
    loadVerbTense,
    loadVerbTenseSuccess
};

export default verbActions;