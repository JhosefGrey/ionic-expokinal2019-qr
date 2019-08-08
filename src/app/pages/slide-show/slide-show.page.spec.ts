import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideShowPage } from './slide-show.page';

describe('SlideShowPage', () => {
  let component: SlideShowPage;
  let fixture: ComponentFixture<SlideShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideShowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
