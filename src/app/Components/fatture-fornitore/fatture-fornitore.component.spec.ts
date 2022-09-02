import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FattureFornitoreComponent } from './fatture-fornitore.component';

describe('FattureFornitoreComponent', () => {
  let component: FattureFornitoreComponent;
  let fixture: ComponentFixture<FattureFornitoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FattureFornitoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FattureFornitoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
