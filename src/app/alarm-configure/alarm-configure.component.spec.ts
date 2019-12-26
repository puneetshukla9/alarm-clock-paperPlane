import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmConfigureComponent } from './alarm-configure.component';

describe('AlarmConfigureComponent', () => {
  let component: AlarmConfigureComponent;
  let fixture: ComponentFixture<AlarmConfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmConfigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
