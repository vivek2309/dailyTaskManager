import { Injectable } from '@angular/core';
import { Task } from '../modals/task.model';
import { STATUS } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class DailyTaskService {
  pendingTaskList: Array<Task> = [];
  inProgressTaskList: Array<Task> = [];
  completedTaskList: Array<Task> = [];
  constructor() { }

  listRenderer() {
    let taskList: Array<Task> = this.getAllTasks();
    this.pendingTaskList = [];
    this.inProgressTaskList = [];
    this.completedTaskList = [];
    taskList = this.sortList(taskList);
    taskList.forEach(item => {
      if (item.status === STATUS.PENDING) {
        this.pendingTaskList.push(item);
      } else if (item.status === STATUS.IN_PROGRESS) {
        this.inProgressTaskList.push(item);
      } else if (item.status === STATUS.COMPLETED) {
        this.completedTaskList.push(item);
      }
    });

  }

  display() {
    console.log(this.pendingTaskList, this.inProgressTaskList, this.completedTaskList);
  }

  insertTask(task: Task) {
    if (task && (task.id === null || task.id === '')) {
      task.id = this.generateUniqueId();
      task.status = STATUS.PENDING;
    }
    const taskList: Array<Task> = this.getAllTasks();
    if (taskList) {
      const oldTaskIndex = taskList.findIndex(x => x.id === task.id);
      if (oldTaskIndex !== -1) {
        taskList[oldTaskIndex] = task;
        localStorage.setItem('taskList', JSON.stringify(taskList));
      } else {
        taskList.push(task);
        localStorage.setItem('taskList', JSON.stringify(taskList));
      }
    }
    this.listRenderer();
    // if (task.status === STATUS.PENDING) {
    //   this.pendingTaskList.push(task);
    // } else if (task.status === STATUS.IN_PROGRESS) {
    //   this.inProgressTaskList.push(task);
    // } else if (task.status === STATUS.COMPLETED) {
    //   this.completedTaskList.push(task);
    // }
  }

  removeTask(id) {
    const temp =  localStorage.getItem('taskList');
    const taskList: Array<Task> = temp ? JSON.parse(temp) : [];
    const taskIndex = taskList.findIndex(x => x.id === id);
    if (taskIndex !== -1) {
      taskList.splice(taskIndex, 1);
    }
    localStorage.setItem('taskList', JSON.stringify(taskList));
    this.listRenderer();
  }

  generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  getAllTasks(): Array<Task> {
    const temp =  localStorage.getItem('taskList');
    return temp ? JSON.parse(temp) : [];
  }

  sortList(taskList: Array<Task>): Array<Task> {
    return taskList.sort((a, b) => {
      const two: any = new Date(b.creationDate);
      const one: any = new Date(a.creationDate);
      return two - one;
    });
  }

  manageStatus() {
    const taskList: Array<Task> = [];
    for (const item of this.pendingTaskList) {
      item.status = STATUS.PENDING;
      taskList.push(item);
    }
    for (const item of this.inProgressTaskList) {
      item.status = STATUS.IN_PROGRESS;
      taskList.push(item);
    }
    for (const item of this.completedTaskList) {
      item.status = STATUS.COMPLETED;
      taskList.push(item);
    }
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

  getScore() {
    const total = this.getAllTasks().length;
    if (total) {
      return Math.floor((this.completedTaskList.length / total) * 100);
    }
    return 0;
  }

}
