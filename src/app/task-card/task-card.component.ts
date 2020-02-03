import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../modals/task.model';
import {PRIORITY, STATUS} from '../constants/constants';
import { DailyTaskService } from '../services/daily-task.service';
import { AddModifyTaskComponent } from '../add-modify-task/add-modify-task.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('taskItem') taskItem: Task;
  readonly HIGH = PRIORITY.HIGH;
  readonly NORMAL = PRIORITY.NORMAL;
  readonly LOW = PRIORITY.LOW;
  readonly PENDING = STATUS.PENDING;
  readonly IN_PROGRESS = STATUS.IN_PROGRESS;
  readonly COMPLETED = STATUS.COMPLETED;
  constructor(private taskSrvc: DailyTaskService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  removeTask(id) {
    this.taskSrvc.removeTask(id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddModifyTaskComponent, {
      width: '60%',
      height: '60%' ,
      data: {taskItem: this.taskItem}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
