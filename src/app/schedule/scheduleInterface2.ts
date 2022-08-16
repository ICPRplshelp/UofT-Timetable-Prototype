/*
WOAH

Is an hour taken? If so, that hour is taken.
SU [123456]
MO [123456]

*/

// import { exit } from "process";
// import { range } from "rxjs";
import { crsMeeting } from "../timetable/courseInterfaces";

const d2m = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']


export class Cal {
  // COPY THIS ARRAY EVERY TIME
  static t24Long = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  static f: CourseIn[] = [];
  static s: CourseIn[] = [];
  static tt: (CalEntry | number)[][] = [[], [], [], [], []];
  static coursesSoFar: string[] = [];

  static get24long(): number[] {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  static resetCal(): void {
    this.f = [];
    this.s = [];
    this.tt = [];
    this.coursesSoFar = [];
  }

  static addToCal(crs: CourseIn): void {
    if(crs.section === 'F'){
      this.f.push(crs);
    } else if (crs.section === 'S'){
      this.s.push(crs);
    } else {
      this.f.push(crs); this.s.push(crs);
    }
  }

  /**
   * 
   * @param winter Winter?
   * @returns output transposed, list of all courses contained
   */
  static exportTimetable(winter: boolean): any {
    this.resetCal();
    let courseIns = Schedule.selectedCourseInfo;
    // empty the cal list first
    

    courseIns.forEach(crs => this.addToCal(crs));
    this.exportTimetable1(winter);
    console.log(this.tt);
    let output = this.tt[0].map((_, colIndex) => this.tt.map(row => row[colIndex]));
    // for each in output
    let i = 0;
    for(let trow of output){
      output[i] = output[i].filter(cell => cell !== 1);
      i++;
    }
    
    return [output, this.coursesSoFar];
  }
  static exportTimetable1(winter: boolean): void {
    console.log('Trying to export the timetable',
    this.s);
    let coursesSoFar = new Set<string>();
    let exportSoFar: (CalEntry | number)[][] = [this.get24long(), this.get24long(), this.get24long(), 
      this.get24long(), this.get24long()];
    
    let ce = winter ? this.s : this.f;
    if(ce.length === 0){
      this.tt = [this.get24long(), this.get24long(), this.get24long(), 
        this.get24long(), this.get24long()];
      this.coursesSoFar = [];
      return;
    }

    for (let crsEntryTemp of ce){
      for(let mt of crsEntryTemp.meetings) {
        let tCalEntry = new CalEntry('TEMPTTILE',
        crsEntryTemp.code, crsEntryTemp.lecSession, mt.start + '-' + mt.end,
        mt.location_fall, mt.location_winter, mt.day,
        crsEntryTemp.section)
        let sten = tCalEntry.getTimes();
        let st = sten[0]; let en = sten[1];
        coursesSoFar.add(tCalEntry.course_code + tCalEntry.course_session);

        if(mt.day === NaN || st === NaN){
          continue;
        }
        if(mt.day == undefined || st === undefined){
          continue;
        }
        // if it seems to conflict here
        
        if(isNaN(st)){
          continue;
        }
        console.log(mt.day, st);
        console.log(isNaN(st));
        if(exportSoFar[mt.day][st] !== 0){
          continue;
          // let tgt = exportSoFar[mt.day][st];
          // if(tgt == 1){
          //   let tst = st;
          //   while (tgt === 1 && tst >= 0){
          //     tgt = exportSoFar[mt.day][tst - 1];
          //     tst -= 1;
          //   }
          // }
          // // exit();
        }

        // conflict dealer finished
        exportSoFar[mt.day][st] = tCalEntry;
        for(let i = st + 1; i < en; i++){
          exportSoFar[mt.day][i] = 1;
        }

      }
      this.tt = exportSoFar;
      this.coursesSoFar = Array.from(coursesSoFar);
    }
  }
}


export class Schedule {
    static selectedCourses: string[] = [];  // CSC110Y1-F-LEC0101
    static selectedCourseInfo: CourseIn[] = [];

    /**
     * 
     * @param crsCode CSC110Y1
     * @param session F
     * @param lecSession LEC0101
     * @returns whether that was the case.
     */
    static checkIfInCourse(crsCode: string, session: string, lecSession: string): boolean {
      const crsc = crsCode + '-' + session + '-' + lecSession;
      return this.selectedCourses.includes(crsc);
    }

  /**
   * Do not run this command if the course already exists.
   * @param crsCode CSC110Y1
   * @param session
   * @param lecSession LEC0101
   * @returns whether this command was successful.
   */
  static addCourse(crsCode: string, session: string, lecSession: string,
    courseIn: CourseIn): boolean{
      if (this.selectedCourses.includes(crsCode + '-' + session + '-' + lecSession)){
        return false;
      }
      this.selectedCourses.push(crsCode + '-' + session + '-' + lecSession)
      this.selectedCourseInfo.push(courseIn);
      return true;
    }

  static removeCourse(crsCode: string, session: string, lecSession: string): boolean{
    const cl = this.selectedCourses.indexOf(crsCode + '-' + session + '-' + lecSession);
    if (cl === -1){
      return false;
    }
    this.selectedCourses.splice(cl, 1);  // remove from the existing list
    // and also remove it from the existing coursein list
    this.selectedCourseInfo.splice(cl, 1);
    return true;
    
    // this.selectedCourses = this.selectedCourses.filter(e => e !== crsCode + '-' + 
    // session + '-' + lecSession);
    // this.selectedCourses.remove(crsCode + '-' + session + '-' + lecSession)
  }

  /**
   * 
   * @param meetings The array of meetings to check against
   * @param fys Whether that meeting is F, Y, or S
   * @returns Whether the courses conflict
   */
  static checkCourseConflict(meetings: crsMeeting[], fys: string,
    lecSession: string, courseCode: string): string {

    let schMeetingToCompare: SchMeeting[] = [];
    for (let crsMeet of meetings){
      schMeetingToCompare.push(
        new SchMeeting(crsMeet.meetingStartTime,
          crsMeet.meetingEndTime, 'NO', 'NO',
          crsMeet.meetingDay)
      )
    }

    for (let scf of this.selectedCourseInfo){
      // console.log(scf.section, fys)
      if ((scf.section === 'F' && fys === 'S') || (scf.section === 'S' && fys === 'F')){
        continue;  // only check if the sections are the same OR either of them
        // are Y courses
      }
      if (scf.courseIdentifier === courseCode && scf.lecSession === lecSession){
        continue;
      }
      for (let tempMeeting of scf.meetings){
        for (let tempMeeting2 of schMeetingToCompare){
          if (meetingsConflict(tempMeeting, tempMeeting2)){
            
            return `Meeting conflict with\n${scf.code}${scf.section} ${scf.lecSession} ${d2m[tempMeeting.day]}s\n${tempMeeting.start}-${tempMeeting.end}`
            // return true;
          }
        }
      }
    }
    return '';

  }

  /**
   * Export courses to the exact same format I did in Python.
   */
  static exportCourses(){

  }

  static removeAllCourses(){
    this.selectedCourses = [];
    this.selectedCourseInfo = [];
  }
}

/**
 * 
 * @param cm1 m1
 * @param cm2 m2
 * @returns whether they conflict
 */
function meetingsConflict(cm1: SchMeeting, cm2: SchMeeting): boolean {
  const d1 = cm1.day === cm2.day;

  const p1 = cm1.startHour <= cm2.startHour && cm2.startHour < cm1.endHour;
  const p2 = cm2.startHour <= cm1.startHour && cm1.startHour < cm2.endHour;
  // if (d1 && (p1 || p2)){
  //   console.log(cm1.startHour, cm1.endHour, cm2.startHour, cm2.endHour);
  // }
  return d1 && (p1 || p2);
}

/**
 * Contains information about a course-lecture section.
 * This means CSC110Y1-LEC0101 is a different object than
 * CSC110Y1-LEC0201.
 */
export class CourseIn {

    code: string;
    section: string;  // F, S, Y
    // actually, the course title.
    desc: string;
    delivery: string;
    courseIdentifier: string;  // CSC110Y1-F-LEC0201
    meetings: SchMeeting[] = [];
    lecSession: string;

  /**
   *
   * @param cI CSC110Y1
   * @param meetings [][]
   * @param section F/S/Y
   * @param desc Foundations of Comp Sci
   * @param lecSession LEC0101
   * @param delivery SYNC ASYNCIF 
   */
    constructor(cI: string, meetings: crsMeeting[],  // {WE: ___, TH: ___}
      section: string, desc: string,
                lecSession: string, delivery: string){
        this.courseIdentifier = cI;
        // this.meetings = meetings;
      this.lecSession = lecSession;
        this.desc = desc;
        this.code = cI;
        this.section = section;
        this.delivery = delivery;
        meetings.forEach(item => {
          this.meetings.push(
            new SchMeeting(item.meetingStartTime, item.meetingEndTime,
              item.assignedRoom1, item.assignedRoom2,
              item.meetingDay
              )
          )
        })

        // Schedule.addCourse(this.code, this.section, this.lecSession)

    }
}

export class CalEntry {
  course_title: string
  course_code: string
  course_section: string
  time_to_time: string
  room_fall: string
  room_winter: string
  // day_info_hidden: string
  day_number: number
  course_session: string

  constructor(course_title: string,
    course_code: string,
    course_section: string,
    time_to_time: string,
    room_fall: string,
    room_winter: string,
    day_number: number,
    course_session: string){
      this.course_title = course_title
      this.course_code = course_code
      this.course_section = course_section
      this.time_to_time = time_to_time
      this.room_fall = room_fall
      this.room_winter = room_winter
      this.day_number = day_number
      this.course_session= course_session
  }

  getTimes(): number[] {
    let sp1 = this.time_to_time.split('-');
    let sp2 = sp1.map(x => parseInt(x.trim().split(':')[0]));
    if (sp2[0] === NaN || sp2[1] === NaN){
      return [2, 2];

    }
    return [sp2[0], sp2[1]]
  }

  getDuration(): number {
    let t1t2 = this.getTimes();
    return t1t2[1] - t1t2[0];
  }

  getDay(): number {
    return this.day_number;
  }
}

export class SchMeeting {
    start: string;  // when does it start? 19:00
    end: string;  // when does it end? 20:00
    startHour: number;
    endHour: number;
    location_fall: string = '';
    location_winter: string = '';
    day: number;

    constructor(startTime: string, endTime: string, room1: string,
      room2: string, meetingDay: string) {
        this.start = startTime;
        this.end = endTime;
        this.startHour = this.timeToNumber(this.start);
        this.endHour = this.timeToNumber(this.end);
        this.day = dayToNumm(meetingDay);
        this.location_fall = room1;
        this.location_winter = room2;
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


}


function dayToNumm(day: string): number {
  switch(day){
    case 'MO':
    return 0;
    case 'TU':
    return 1;
    case 'WE':
    return 2;
    case 'TH':
    return 3;
    case 'FR':
    return 4;
    case 'SA':
    return 5;
    case 'SU':
    return 6;
    default:
    return 6;
    }
}
