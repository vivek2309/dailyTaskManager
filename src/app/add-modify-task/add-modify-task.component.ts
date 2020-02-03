import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../modals/task.model';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { STATUS, PRIORITY } from '../constants/constants';
import { DailyTaskService } from '../services/daily-task.service';

@Component({
  selector: 'app-add-modify-task',
  templateUrl: './add-modify-task.component.html',
  styleUrls: ['./add-modify-task.component.scss']
})
export class AddModifyTaskComponent implements OnInit {
  form: FormGroup;
  priorityOptions: Array<any> = [{
    label: 'High',
    value: PRIORITY.HIGH
  },
  {
    label: 'Normal',
    value: PRIORITY.NORMAL
  },
  {
    label: 'Low',
    value: PRIORITY.LOW
  }];
  minDate = new Date();
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, public dialog: MatDialog, private taskSrvc: DailyTaskService, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.form = this.fb.group({
      id: '',
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      creationDate: ['', Validators.required],
      status: ''
    });
    if (this.data && this.data.taskItem) {
      this.form.patchValue(this.data.taskItem);
    }
  }

  onSubmitHandler(value) {
    const task = new Task(this.form.value);
    this.taskSrvc.insertTask(task);
    this.closeDialog();
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
