import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {TimetableService} from './timetable.service';
import {DialogExampleComponent} from '../dialog-example/dialog-example.component';
import {elementAt} from 'rxjs';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  // allDes: Set<string> = new Set( ['ABP', 'ACT', 'AFR', 'AMS', 'ANA', 'ANT', 'APM', 'ARH', 'AST', 'BCB', 'BCH', 'BIO', 'BMS', 'BPM', 'CAR', 'CAS', 'CDN', 'CHC', 'CHM', 'CIN', 'CJH', 'CJS', 'CLA', 'CLT', 'COG', 'CRE', 'CRI', 'CSB', 'CSC', 'CSE', 'CTA', 'DHU', 'DRM', 'DTS', 'EAS', 'ECO', 'EDS', 'EEB', 'ENG', 'ENT', 'ENV', 'ESS', 'EST', 'ETH', 'EUR', 'FAH', 'FCS', 'FIN', 'FOR', 'FRE', 'FSL', 'GER', 'GGR', 'GRK', 'HIS', 'HMB', 'HPS', 'HST', 'HUN', 'IFP', 'IMM', 'INI', 'INS', 'IRE', 'IRW', 'ITA', 'JAL', 'JCA', 'JCI', 'JCR', 'JEG', 'JEH', 'JFG', 'JFP', 'JGA', 'JGE', 'JGJ', 'JGU', 'JHA', 'JHM', 'JIG', 'JLN', 'JLP', 'JLS', 'JNH', 'JNR', 'JNS', 'JPA', 'JPE', 'JPH', 'JPI', 'JPM', 'JPR', 'JPS', 'JQR', 'JRC', 'JRN', 'JSC', 'JSH', 'JSU', 'JWE', 'LAS', 'LAT', 'LCT', 'LIN', 'LMP', 'MAT', 'MCS', 'MGR', 'MGT', 'MGY', 'MHB', 'MIJ', 'MST', 'MUN', 'MUS', 'NEW', 'NFS', 'NMC', 'NML', 'PCJ', 'PCL', 'PDC', 'PHC', 'PHL', 'PHS', 'PHY', 'PLN', 'POL', 'PPG', 'PRT', 'PSL', 'PSY', 'REN', 'RLG', 'RSM', 'SAS', 'SDS', 'SLA', 'SMC', 'SOC', 'SPA', 'STA', 'TRN', 'UNI', 'URB', 'VIC', 'WDW', 'WGS', 'WRR']
  // );

  coursesData: any;

  constructor(private timetableService: TimetableService,
              public dialog: MatDialog) {
  }

  // openDialog() {
  //   this.dialog.open(DialogExampleComponent);
  // }

  // this value is binded.
  courseFilter: string = '';  // this value is binded.
  splitted: string[] = [];
  courseList: any[] = [];
  allCourses: any[][] = [];
  splitCourseList: any[][] = [];

  clicked(): void {

    this.splitted = this.courseFilter.split(',');
    this.splitted = this.splitted.map(item => item.trim());
    console.log(this.splitted);

    if (this.courseFilter.replace(" ", "") !== "") {
      let tempCourseList = this.courseList.filter(course => this.splitted.includes(course.org));

      this.splitCourseList = splitListToLevels(tempCourseList);
    } else {
      this.splitCourseList = splitListToLevels(this.courseList);
    }
   // console.log('clicked!!!');

    // let splitted = this.courseFilter.split(',');
    // this.splitCourseList.forEach(
    //   indLevel => indLevel.forEach(indCourse => indCourse.org == this.courseFilter ? indCourse.show = true : indCourse.show = false)
    // )
    // console.log(this.splitCourseList, splitted);

  }

  ngOnInit(): void {
    this.timetableService.getCourses().subscribe(
      data => {
        // console.log('timetable', data);
        this.coursesData = data;

        // console.log('timetable1', this.coursesData.length);

        // all converted to a list
        this.courseList = items(this.coursesData);
        console.log(this.coursesData);
        console.log(this.courseList);

        // process the courses we have
        processCourselist(this.courseList);
        console.log(this.courseList);
        this.courseList.filter(course => course.org === this.courseFilter);
        // this.courseList.forEach(course => console.log(course.org));

        // split the entire course list
        this.splitCourseList = splitListToLevels(this.courseList);
        console.log(this.splitCourseList);
      })
  }

  clearHTMLTags(text: string): string {
    // let temp = text.replace('</p> <p>', '\n\n').replace('<p>', '').replace('</p>', '').replace('<br />', '');
    let temp = removeTags(text);
    // console.log(temp);
    return temp
  }

  dialogConfig = new MatDialogConfig();

  onCourseClicked(course: any): void {
    console.log('course clicked: ' + course.code);
    course.infoVisible = !course.infoVisible;
    course.cardWidth = course.cardWidth == defaultCardWidth ? expandedCardWidth : defaultCardWidth;
    // this.dialog.open(DialogExampleComponent,
    //   {  });
  }

  openDialog(): void {

  }

}


const defaultCardWidth = '20%';
const expandedCardWidth = '100%';
const allowHTMLTags = true;
const maxCards = 49999;
const colorRed = '#ff6600';
const colorBlue = '#52b1ff';
const colorGreen = '#00c427';
const colorPurple = '#9436ff'
const colorYellow = '#ffbf00';

// determine the level.
function processCourselist(cList: any[]): void {
  // determine the level of the course.
  cList.forEach(element => {

    let levelNumber = element.code[3]
    // console.log(levelNumber);
    if (levelNumber == 1) {
      // console.log('case 1');
      element.level = 1;
      element.levelColor = colorGreen;
    } else if (levelNumber == 2) {
      // console.log('case 2');
      element.level = 2;
      element.levelColor = colorBlue;
    } else if (levelNumber == 3) {
      // console.log('case 3');
      element.level = 3;
      element.levelColor = colorPurple;
    } else if (levelNumber == 4) {
      // console.log('case 4');
      element.level = 4;
      element.levelColor = colorRed;
    } else {
      console.log('case default');
      element.level = 4;
      element.levelColor = colorGreen;


    }
    element.cardWidth = '20%';

    // add a display
    element.infoVisible = false;
    element.show = true;
    // element.courseDescription = (element.CourseDescription);
    element.courseDescription = removeTags(element.courseDescription)
    console.log('next up')
  })
}


function items(obj: any) {
  let i, arr = [];
  let j = 0;
  for (i in obj) {
    arr.push(obj[i]);
    j++
    if (j >= maxCards) {
      break;
    }
  }
  // arr.sort((a, b) => a.code.localeCompare(b.code));
  return removeDuplicates(arr);
}

function removeDuplicates(tempCourseList: any[]): any[] {
  let checkedCodes: string[] = [];
  let uniques: any[] = [];
  tempCourseList.forEach(element => {
    if (!checkedCodes.includes(element.code)) {
      // if the course is not already in
      uniques.push(element);
      checkedCodes.push(element.code);
    }
  })
  return uniques

}

function removeTags(str: string) {

  if (!allowHTMLTags) {
    if ((str === null) || (str === ''))
      return '';
    else
      str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/ig, '');
  } else {
    return str;
  }
}

function splitListToLevels(cList: any[]): any[][] {
  // split all courses to 100, 200, 300, and 400 level
  // courses, based on the order they appear in.
  // we will assume that the courses are sorted.
  // let targetLevel = 1;
  console.log(cList);
  let courses: any[][] = [[], [], [], []];
  cList.forEach(element => {
    if (element.level >= 1 && element.level <= 4) {
      courses[element.level - 1].push(element);
    } else {
      console.log('invalid element level that isn\'t 0 to 4');
    }
  })

  return courses
}

