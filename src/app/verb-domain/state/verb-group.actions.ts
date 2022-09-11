import { VerbGroup } from "../types/VerbGroup.class";
import { createAction, props } from "@ngrx/store";

export const loadVerbGroupSelectedInRoute = createAction('[verb group] load VerbGroup Selected In Route');
export const loadVerbGroup = createAction('[verb group] load verb group',props<{verbGroup:VerbGroup}>());
export const loadVerbGroupSuccess = createAction('[verb group] load verb group success',props<{verbGroup:VerbGroup}>());
export const loadVerbGroupError = createAction('[verb group] load verb group error', props<{ error: Error }>());
//

export const setVerbGroupSelected = createAction('[verb group] setVerbGroup selected',props<{verbGroup:VerbGroup}>());
export const setVerbGroupSelectedSuccess = createAction('[verb group] setVerbGroup selected success',props<{verbGroup:VerbGroup}>());
//list
export const loadVerbGroupList = createAction('[verb group] load verb group list');
export const loadVerbGroupListError = createAction('[verb group] load verb group list error', props<{ error: Error }>());
export const loadVerbGroupListSuccess = createAction('[verb group] get verb group list success', props<{ verbGroupList: VerbGroup[] }>());

export const verbGroupActions = {    
    loadVerbGroup,    
    loadVerbGroupSuccess,
    loadVerbGroupError,
    loadVerbGroupSelectedInRoute,
    setVerbGroupSelected,
    setVerbGroupSelectedSuccess,
    loadVerbGroupListError,
    loadVerbGroupListSuccess,
    loadVerbGroupList    
};

export default verbGroupActions;