import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrdineComponent } from './dialog-ordine.component';

describe('DialogOrdineComponent', () => {
  let component: DialogOrdineComponent;
  let fixture: ComponentFixture<DialogOrdineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOrdineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOrdineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
