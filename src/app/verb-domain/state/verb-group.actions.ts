import { VerbGroup } from "../types/VerbGroup";
import { createAction, props } from "@ngrx/store";

export const loadVerbGroup = createAction('[verb group] load verb group',props<{verbGroup:VerbGroup}>());
export const loadVerbGroupSuccess = createAction('[verb group] load verb group success',props<{verbGroup:VerbGroup}>());
export const setVerbGroupSelected = createAction('[verb group] setVerbGroup selected',props<{verbGroup:VerbGroup}>());
export const loadVerbGroupSelectedInRoute = createAction('[verb group] setVerbGroup selected in route');
export const setVerbGroupSelectedSuccess = createAction('[verb group] setVerbGroup selected success',props<{verbGroup:VerbGroup}>());
export const loadVerbGroupList = createAction('[verb group] get verb group list');
export const loadVerbGroupListError = createAction('[verb group] load verb group list error', props<{ error: Error }>());
export const loadVerbGroupListSuccess = createAction('[verb group] get verb group list success', props<{ verbGroupList: VerbGroup[] }>());
export const verbGroupActions = {    
    loadVerbGroup,    
    loadVerbGroupSelectedInRoute,
    setVerbGroupSelected,
    setVerbGroupSelectedSuccess,
    loadVerbGroupListError,
    loadVerbGroupListSuccess,
    loadVerbGroupList    
};

export default verbGroupActions;