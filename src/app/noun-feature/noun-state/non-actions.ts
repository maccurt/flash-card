import { Noun } from './noun-reducer';
import { props } from '@ngrx/store';
import { createAction } from '@ngrx/store';

export const loadNounList = createAction('[Noun] Load Noun List');
export const loadNounListSucess = createAction('[Noun] Load Noun List Success', props<{ nounList: Noun[] }>());
export const loadNounListError = createAction('[Noun] Load Noun List Error', props<{ error: Error }>());

export const nounActions = {
    loadNounList,
    loadNounListSucess,
    loadNounListError
};

export default nounActions;