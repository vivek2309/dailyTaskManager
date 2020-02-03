import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { AddModifyTaskComponent } from './add-modify-task/add-modify-task.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DailyTaskService } from './services/daily-task.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskCardComponent,
    AddModifyTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule
  ],
  providers: [MatDatepickerModule, DailyTaskService],
  bootstrap: [AppComponent],
  entryComponents: [AddModifyTaskComponent]
})
export class AppModule { }
