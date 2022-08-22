import { createAction, props } from "@ngrx/store";
import { Verb } from "./Verb";

export const loadVerbList = createAction('[verb] load verb list');
export const loadVerbListSucess = createAction('[verb] load verb list success', props<{ verbList: Verb[] }>());
export const loadVerbListError = createAction('[verb] load verb list error', props<{ error: Error }>());

export const loadVerb = createAction('[verb] load verb');

export const verbActions = {
    loadVerbList,
    loadVerbListSucess,
    loadVerbListError,
    //
    loadVerb
};

export default verbActions;