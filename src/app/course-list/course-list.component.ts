import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {crsInstructor, crsMeeting, lecSession} from "../timetable/courseInterfaces";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {utilities} from "../timetable/utilities";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {courseListPreferences} from "./preferences";
import { scheduled } from 'rxjs';
import { ScheduleComponent } from '../schedule/schedule.component';
import { CourseIn, Schedule } from '../schedule/scheduleInterface2';
import { MatCheckboxChange } from '@angular/material/checkbox';


// import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CourseListComponent implements OnInit {

  meetingsArray: lecSession[][] = [];
  meetingsArrayType: string[] = [];
  // sampleMeetings: lecSession[] = [];

  // objective: display a table based on the sample
  // meetings list.


  chooseHead = "";
  lecHead = "LEC";
  enrollHead = "ENROLL";
  insHead = "INST";
  timeHead = "TIME";
  delivHead = "DELIVERY";
  courseCode: string = '';  // CSC110Y1
  fys: string[] = ['F', 'S', 'Y'];

  fys_actual(mat: string): string {
    // console.log(mat);
    switch(mat){
      case 'fall': return 'F';
      case 'winter': return 'S';
      case 'year': return 'Y';
      default: return 'Y';

    }
  }


  darkMode: boolean = false;  // whether dark mode is on or off
  stretchCourse: boolean = true;  // true -> courses are stretched  !!
  // depending on time
  noDeliverySymbols: boolean = false;  // true -> delivery shows word

  private getScreenWidth: number = 800;
  private getScreenHeight: number = 800;
  roomsVisible: boolean = true;
  private _spaceVisible: boolean = false;
  public get spaceVisible(): boolean {
    return this._spaceVisible;
  }
  public set spaceVisible(value: boolean) {
    this._spaceVisible = value;
    if(value){
      // this.displayedColumns.push("space");
      let s1 = this.displayedColumns.slice(0, 4);
      let s2 = this.displayedColumns.splice(4, this.displayedColumns.length);
      s1.push('space')
      s1.push(...s2);
      this.displayedColumns = s1;
    } else {
      let tmp = this.displayedColumns.indexOf("space");
      if(tmp !== undefined && tmp !== null){
        this.displayedColumns.splice(tmp, 1);
      }
    }
  }
  toggleRooms(){
    this.roomsVisible = !this.roomsVisible;
  }
  toggleSpace(){
    this.spaceVisible = !this.spaceVisible;
  }

  constructor(
    private dialogRef: MatDialogRef<CourseListComponent>,
    @Inject(MAT_DIALOG_DATA) data: { fallMeetings: lecSession[], winterMeetings: lecSession[], yearMeetings: lecSession[],
    crsCode: string }
  ) {
    console.log(data);
    this.courseCode = data.crsCode;  // CSC110Y1
    this.stretchCourse = courseListPreferences.stretchCourse;
    this.darkMode = courseListPreferences.darkMode;
    this.noDeliverySymbols = courseListPreferences.noDeliverySymbols;
    this.meetingsArray = [];


    // data.fallMeetings = data.fallMeetings.filter((meeting) => meeting.cancel !== 'Cancelled');
    // data.winterMeetings = data.winterMeetings.filter((meeting) => meeting.cancel !== 'Cancelled');
    // data.yearMeetings = data.yearMeetings.filter((meeting) => meeting.cancel !== 'Cancelled');


    // this.sampleMeetings = data.yearMeetings;
    if (data.fallMeetings !== undefined) {
      this.meetingsArray.push(data.fallMeetings);
      this.meetingsArrayType.push('fall');
    }
    if (data.winterMeetings !== undefined) {
      this.meetingsArray.push(data.winterMeetings);
      this.meetingsArrayType.push('winter');
    }
    if (data.yearMeetings !== undefined) {
      this.meetingsArray.push(data.yearMeetings);
      this.meetingsArrayType.push('year');
    }
    console.log("the meetings array is", this.meetingsArray);
    console.log(this.meetingsArrayType);
  }

  makeInt(arg: string): number {
    return parseInt(arg);
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.onWindowResize();
  }


  /**
   * Return the sync icon.
   * @param mode SYNC, INPER, and so on.
   */
  getSyncIcon(mode: string): string {
    const inper = 'group';
    const sync = 'wifi';
    const syncif = 'wifi group';
    const async = 'wifi_off';
    const asyncif = 'wifi_off group';


    switch(mode){
      case 'INPER':
        return inper;
      case 'CLASS':
        return inper;
      case 'SYNIF':
        return syncif;
      case 'SYNC':
        return sync;
      case 'ONL':
        return sync;
      case 'ONLSYNC':
        return sync;
      case 'ASYNC':
        return async;
      case 'ONLASYNC':
        return async;
      case 'ASYIF':
        return asyncif;
      default:
        return 'question_mark';

    }

  }

  /**
   * What happens when you choose
   * an unchosen course.
   */
  // chooseCourse(): void {
  //   Schedule.addCours
  // }

  getDayColor(day: string): string[] {
    let tempColor: string;
    let bgColor: string;
    let dayColor: string;
    // why didn't I just use an object for this? that could've been way faster
    switch (day) {
      case 'MO':
        bgColor = utilities.dayColorText[0];
        tempColor = utilities.dayColors[0];
        dayColor = utilities.dayBrightenedColors[0];
        break;
      case 'TU':
        bgColor = utilities.dayColorText[1];
        tempColor = utilities.dayColors[1];
        dayColor = utilities.dayBrightenedColors[1];
        break;
      case 'WE':
        bgColor = utilities.dayColorText[2];
        tempColor = utilities.dayColors[2];
        dayColor = utilities.dayBrightenedColors[2];
        break;
      case 'TH':
        bgColor = utilities.dayColorText[3];
        tempColor = utilities.dayColors[3];
        dayColor = utilities.dayBrightenedColors[3];
        break;
      case 'FR':
        bgColor = utilities.dayColorText[4];
        tempColor = utilities.dayColors[4];
        dayColor = utilities.dayBrightenedColors[4];
        break;
      case 'SA':
        bgColor = utilities.dayColorText[5];
        tempColor = utilities.dayColors[5];
        dayColor = utilities.dayBrightenedColors[5];
        break;
      case 'SU':
        bgColor = utilities.dayColorText[5];
        tempColor = utilities.dayColors[5];
        dayColor = utilities.dayBrightenedColors[5];
        break;
      case 'CO':
        bgColor = utilities.dayColorText[5];
        tempColor = utilities.dayColors[5];
        dayColor = utilities.dayBrightenedColors[5];
        break;
      default:
        bgColor = utilities.dayColorText[6];
        tempColor = utilities.dayColors[6];
        dayColor = utilities.dayBrightenedColors[6];
    }
    return [bgColor, tempColor, dayColor];


  }

  getSessionColor(keyword: string): string[]{
    let temp: string;
    let textColor: string;
    switch(keyword){
      case 'fall':   textColor = 'black'; temp = utilities.tableSessionColors[0]; break;
      case 'winter': textColor = 'black'; temp = utilities.tableSessionColors[1]; break;
      case 'year':   textColor = 'white'; temp = utilities.tableSessionColors[2]; break;
      default: textColor = 'black'; temp = 'white';
    }
    return [temp, textColor];
  }

  // getMeetingTimes(crsSession: lecSession): any[] {
  //
  // }
  displayedColumns: string[] = ['chosen', 'lectureCode', 'instructor', 'time', 'deliveryMode'];

  obtainInstructors(insts: crsInstructor[]): string {
    const insNameList: string[] = [];
    insts.forEach((ins) => {
      insNameList.push(ins.firstName + ". " + ins.lastName);
    })

    const toReturn = insNameList.join(", ");
    if (toReturn === "")
      return "";
    else return toReturn;
  }

  obtainSchedule(sch: crsMeeting[]): string {
    const schList: string[] = [];
    sch.forEach((sc) => {
      schList.push(
        safeString(sc.meetingDay) + ' ' +
        safeString(sc.meetingStartTime) + '-' +
        safeString(sc.meetingEndTime) + ' ' +
        safeString(sc.assignedRoom1)
      )
    })
    return schList.join('\n');
  }
  /**
   * Returns the duration of a meeting. If the duration is
   * less than 1, the duration will be replaced with 1.
   * @param startTime start time of the meeting
   * @param endTime end time of the meeting
   * @param maxDuration the maximum duration of the meeting
   */
  getMeetingDuration(startTime: string, endTime: string, maxDuration: number = 3): number {
    if (!this.stretchCourse) return 1;

    const st = this.trimTimesAlways(startTime);
    const en = this.trimTimesAlways(endTime);
    const stI = parseInt(st);
    const enI = parseInt(en);
    if (isNaN(stI) || isNaN(enI)){
      return 1;
    }
    let finalNum = Math.abs(enI - stI);
    return Math.max(Math.min(maxDuration, finalNum), 1);  // meetings last at least 1 hour long.
  }

  processAssignedRooms(r1: string, r2: string) {
    // console.log('the assigned rooms are', r1, r2)
    // return r1 === r2 ? r1 : r1 + ' ' + r2;

    if (r1 === 'Contact DEPT'){
      r1 = '???';
    }
    if (r2 === 'Contact DEPT'){
      r2 = '???';
    }
    if (r1 === null){
      r1 = '';
    }
    if (r2 === null){
      r2 = '';
    }
    if (r1 !== '' && r2 !== '' && r1 === r2){
      r2 = '';
    }
    return (r1 + ' ' + r2).trim();


    // if (r1 === null) {
    //   return '';
    // }
    // if (r2 === null) {
    //   return r1;
    // }
    // if (r1 === r2){
    //   return r1;
    // } else {
    //   return r1 + ' ' + r2;
    // }
  }

  trimTimes(curTime: string): string {
    if (curTime === null || curTime == undefined)
      return 'NA';

    if (curTime.includes(':')) {
      const splitted = curTime.split(':');
      let timeStr = splitted[0];
      if (splitted[1] !== '00') {
        timeStr = timeStr + ':' + splitted[1]
      }
      return timeStr;
    } else return 'NA';
  }

  trimTimesAlways(curTime: string): string {
    if (curTime === null || curTime == undefined)
      return 'NA';

    if (curTime.includes(':')) {
      const splitted = curTime.split(':');
      return splitted[0];
    } else return '0';
  }

  /**
   *
   * @param curTime HH:MM time format
   * @returns That, but in hours. Return -1 on failure.
   */
  timeToNumber(curTime: string): number {

    let sp1: number;

    if (curTime === null || curTime == undefined)
    return -1;
    if (curTime.includes(':')) {
      const splitted = curTime.split(':');
      if (splitted.length == 2){
        sp1 = parseInt(splitted[0]) + (parseInt(splitted[1]) / 60);
    } else {sp1 = parseInt(splitted[0]);}
    return sp1;
  } else {return -1;}
  }

  smallScreen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if(!this.smallScreen && this.getScreenWidth < 768){
      // displayedColumns: string[] = ['lectureCode', 'instructor', 'time', 'deliveryMode'];
      this.displayedColumns = ['chosen', 'instructor', 'time', 'deliveryMode'];
      this.smallScreen = true;
      this.delivHead = "DELIV";
      this.roomsVisible = false;
      console.log("The screen is small");
    } else if (this.smallScreen && this.getScreenWidth >= 768) {
      this.displayedColumns = ['chosen', 'lectureCode', 'instructor', 'time', 'deliveryMode'];
      this.smallScreen = false;
      this.delivHead = "DELIVERY";
      console.log("Screen small no more");
    }
  }

  /**
   *
   * @param cc course code CSC110Y1-F-20229
   * @param lecType LEC
   * @param lecNum 0101
   * @param startTime 19:00
   * @param endTime 20:00
   */
  addCourse(lecType: string, lecNum: string,
    startTime: string, endTime: string, fws: string) {
    const isTut = lecType.toLowerCase() !== 'lec';
    const courseIdString = this.courseCode + '-' + fws + '-' + lecType + lecNum;
    // let tempMeeting: Meeting = new Meeting(
    //   startTime, endTime, courseIdString, isTut
    // )
  }


  checkInCourseController(crsCode: string,
    session: string, lecSession: string): boolean {
    return Schedule.checkIfInCourse(crsCode, session, lecSession);
  }

  /**
   *
   * @param crsCode CSC110Y1
   * @param session F
   * @param lecSession LEC0101
   * @param meetings The list of meetings
   * @param delivery SYNC ASYNCIF
   * @returns
   */
  addCourseController(crsCode: string, session: string, lecSession: string,
    meetings: crsMeeting[], delivery: string): boolean{
      const cInfo = new CourseIn(crsCode, meetings, session, 'TBA',
      lecSession, 'SYNC');
      return Schedule.addCourse(crsCode, session, lecSession, cInfo);
    }

    /**
     *
     * @param crsCode CSC110Y1
     * @param session F
     * @param lecSession LEC0101
     * @returns whether it was successful
     */
  removeCourseController(crsCode: string, session: string, lecSession: string){
    return Schedule.removeCourse(crsCode, session, lecSession);
  }

  checkCourseConflictController(meetings: crsMeeting[], fys: string,
    lecSession: string): string | boolean{
      const ccf = Schedule.checkCourseConflict(meetings, fys, lecSession, this.courseCode);
      // console.log(ccf);
      return ccf === '' ? false : Schedule.checkCourseConflict(meetings, fys, lecSession, this.courseCode);
  }

  ensureString(valueToTest: boolean | string): string {
    if (valueToTest === false) {
      return '';
    } else{
      // @ts-ignore
      return valueToTest;  // @ts-ignore
    }
  }

  onChange($event: MatCheckboxChange, session: string, lecSession: string,
    meetings: crsMeeting[], delivery: string) {
    console.log('Trying to change...');
    // console.log($event.checked);
    if ($event.checked){
    console.log(this.courseCode, session, lecSession, meetings, delivery);
    this.addCourseController(this.courseCode, session, lecSession, meetings, delivery);
    } else {
      this.removeCourseController(this.courseCode, session, lecSession);
    }
    // ScheduleComponent.reloadTable();
  }


}


function blendingOverlay(r: Number, g: Number, b: Number) {

}


function safeString(theString: string | undefined | null): string {
  if (theString === undefined || theString === null) {
    return "-";
  } else {
    return theString;
  }
}


/**
 * Return obj = [K, V] as a list of V, with V.key = K.
 * @param obj The object to be passed in.
 */
export function cItems(obj: Object): any[] {
  const arr = [];
  for (let [k, v] of Object.entries(obj)) {
    v.key = k;
    arr.push(v);
  }
  return arr;
}
