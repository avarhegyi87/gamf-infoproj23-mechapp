import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorksheetComponent } from './add-worksheet.component';

describe('AddWorksheetComponent', () => {
  let component: AddWorksheetComponent;
  let fixture: ComponentFixture<AddWorksheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorksheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
