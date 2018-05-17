import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotizComponent } from './notiz.component';

describe('NotizComponent', () => {
  let component: NotizComponent;
  let fixture: ComponentFixture<NotizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
