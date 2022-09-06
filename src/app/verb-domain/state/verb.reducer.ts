import { VerbGroup } from "../types/VerbGroup.class";
import { verbActions } from './verb.actions';
import { createReducer, on } from "@ngrx/store";
import { Verb } from "../types/verb.class.";
import verbGroupActions from "./verb-group.actions";

export interface VerbState {
    verbList: Verb[];
    verb?: Verb
    error: string;
    verbGroupList?: VerbGroup[];
    verbGroup?: VerbGroup
};

export const verbStateInitial: VerbState = {
    verbList: [],
    error: ''
};

export const verbReducer = createReducer<VerbState>(verbStateInitial,

    on(verbActions.setVerb, (state, action): VerbState => {        
        return {
            ...state,
            verb: action.verb,
            error: ''
        };
    }),
    on(verbGroupActions.loadVerbGroupSuccess, (state, action): VerbState => {
        //console.log('in effect',action.verbGroup);
        return {
            ...state,
            verbGroup: action.verbGroup,
            error: ''
        };
    }),

    on(verbGroupActions.loadVerbGroupList, (state): VerbState => {
        return {
            ...state,
            error: ''
        };
    }),

    on(verbGroupActions.loadVerbGroupListSuccess, (state, action): VerbState => {
        return {
            ...state,
            error: '',
            verbGroupList: action.verbGroupList
        };
    }),

    on(verbGroupActions.loadVerbGroupListError, (state, action): VerbState => {
        return {
            ...state,
            error: action.error.message,
            verbGroupList: []
        };
    }),

    on(verbActions.loadVerbList, (state): VerbState => {
        return {
            ...state,
            error: ''
        };
    }),

    on(verbActions.loadVerbListSucess, (state, action): VerbState => {
        return {
            ...state,
            error: '',
            verbList: action.verbList
        };
    }),

    on(verbActions.loadVerbListError, (state, action): VerbState => {
        return {
            ...state,
            error: action.error.message,
            verbList: []
        };
    }),
    on(verbActions.loadVerb, (state, action): VerbState => {
        return {
            ...state,
            error: ''
        };
    }),
    on(verbActions.loadVerbSuccess, (state, action): VerbState => {
        return {
            ...state,
            verb: action.verb,
            error: ''
        };
    }),
    on(verbGroupActions.setVerbGroupSelectedSuccess, (state, action): VerbState => {
        return {
            ...state,
            verbGroup: action.verbGroup,
            error: ''
        };
    }),

);