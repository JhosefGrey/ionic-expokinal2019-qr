import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenciasPage } from './conferencias.page';

describe('ConferenciasPage', () => {
  let component: ConferenciasPage;
  let fixture: ComponentFixture<ConferenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferenciasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
