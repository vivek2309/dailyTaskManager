import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyTaskComponent } from './add-modify-task.component';

describe('AddModifyTaskComponent', () => {
  let component: AddModifyTaskComponent;
  let fixture: ComponentFixture<AddModifyTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModifyTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
