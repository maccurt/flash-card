import { Store } from '@ngrx/store';
import { AppModule } from './app.module';
import { Component } from '@angular/core';
import verbActions from './verb-domain/state/verb.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flash-card';

  constructor(public store:Store) {
    this.store.dispatch(verbActions.loadVerbList());
  }
}
