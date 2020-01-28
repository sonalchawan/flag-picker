import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagPickerComponent } from './flag-picker.component';

describe('FlagPickerComponent', () => {
  let component: FlagPickerComponent;
  let fixture: ComponentFixture<FlagPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
