import { Store } from '@ngrx/store';
import { AppModule } from './app.module';
import { Component } from '@angular/core';
import verbActions from './verb-domain/state/verb.actions';
import verbSelectors from './verb-domain/state/verb.selectos';
import verbGroupActions from './verb-domain/state/verb-group.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flash-card';

  constructor(public store: Store) {

    //TODO put all of this in an init function/action/ in the store NOT HERE!!
    this.store.dispatch(verbActions.loadVerbList());
    this.store.dispatch(verbGroupActions.loadVerbGroupList());
    this.store.select(verbSelectors.getVerbGroupList).subscribe((verbGroupList) => {
      if (verbGroupList && verbGroupList.length > 0) {
        this.store.dispatch(verbGroupActions.setVerbGroupSelected({ verbGroup: verbGroupList[0] }));
      }
    });
  }
}
