import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFornituraComponent } from './dialog-fornitura.component';

describe('DialogFornituraComponent', () => {
  let component: DialogFornituraComponent;
  let fixture: ComponentFixture<DialogFornituraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFornituraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFornituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
