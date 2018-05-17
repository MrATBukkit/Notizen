import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotizenListComponent } from './notizen-list.component';

describe('NotizenListComponent', () => {
  let component: NotizenListComponent;
  let fixture: ComponentFixture<NotizenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotizenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotizenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
