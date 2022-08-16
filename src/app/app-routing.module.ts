import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimetableComponent } from './timetable/timetable.component';
import { CourseListComponent } from './course-list/course-list.component';
import {ScheduleComponent} from "./schedule/schedule.component";
import { MasterPageComponent } from './master-page/master-page.component';



const routes: Routes = [
  {path: 'tc', component: TimetableComponent},
  {path: 'cl', component: CourseListComponent},
  {path: 'sc', component: ScheduleComponent},
  {path: '', component: MasterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
