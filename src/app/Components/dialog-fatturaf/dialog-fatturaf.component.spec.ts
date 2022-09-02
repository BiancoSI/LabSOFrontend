import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFatturafComponent } from './dialog-fatturaf.component';

describe('DialogFatturafComponent', () => {
  let component: DialogFatturafComponent;
  let fixture: ComponentFixture<DialogFatturafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFatturafComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFatturafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
