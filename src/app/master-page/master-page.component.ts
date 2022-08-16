import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent implements OnInit {
  @ViewChild(ScheduleComponent, {static: true}) child!: ScheduleComponent;   
  // @ViewChild(ScheduleComponent, {static:true}) child: ScheduleComponent;
  constructor() { }
  message = "";
  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.onWindowResize();
  }
  receiveMessage($event: any) {
    console.log("CLOSED IT");
    if (!this.notWide)
    this.child.reloadTable();
  }
  private getScreenWidth: number = 800;
  private getScreenHeight: number = 800;
  notWide: boolean = false;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if (this.getScreenWidth < 768){
      this.notWide = true;
      //console.log("SMALL");
    } else {
      this.notWide = false;
      //console.log("LARGE");
    }

    
  }


}
