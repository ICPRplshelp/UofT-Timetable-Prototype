import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimetableComponent } from './timetable/timetable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { FormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CourseListComponent } from './course-list/course-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";
import { HelpPageComponent } from './help-page/help-page.component';
import { ScheduleComponent } from './schedule/schedule.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MasterPageComponent } from './master-page/master-page.component';


@NgModule({
  declarations: [
    AppComponent,
    TimetableComponent,
    DialogExampleComponent,
    CourseListComponent,
    HelpPageComponent,
    ScheduleComponent,
    MasterPageComponent,
  ],
  entryComponents: [DialogExampleComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatSidenavModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatListModule,
        MatTooltipModule,
        MatOptionModule,
        MatSelectModule,
        MatCheckboxModule
    ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
