import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddModifyTaskComponent } from './add-modify-task/add-modify-task.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from './modals/task.model';
import { STATUS } from './constants/constants';
import { DailyTaskService } from './services/daily-task.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'planify';
  taskTitle = {
    columnOne: 'Pending',
    columnTwo: 'In Process',
    columnThree: 'Completed'
  };
  constructor(public dialog: MatDialog, private taskSrvc: DailyTaskService) {
  }
  ngOnInit(): void {
    this.taskSrvc.listRenderer();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddModifyTaskComponent, {
      width: '60%',
      height: '60%' ,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.taskSrvc.manageStatus();
  }
}
