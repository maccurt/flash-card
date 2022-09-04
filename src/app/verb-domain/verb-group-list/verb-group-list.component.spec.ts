import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbGroupListComponent } from './verb-group-list.component';

describe('VerbGroupListComponent', () => {
  let component: VerbGroupListComponent;
  let fixture: ComponentFixture<VerbGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbGroupListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerbGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
