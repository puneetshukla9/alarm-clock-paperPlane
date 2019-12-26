import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmPlayComponent } from './alarm-play.component';

describe('AlarmPlayComponent', () => {
  let component: AlarmPlayComponent;
  let fixture: ComponentFixture<AlarmPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
