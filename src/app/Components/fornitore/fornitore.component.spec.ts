import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornitoreComponent } from './fornitore.component';

describe('FornitoreComponent', () => {
  let component: FornitoreComponent;
  let fixture: ComponentFixture<FornitoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FornitoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FornitoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
