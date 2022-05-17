import { Component, OnInit } from '@angular/core';
import {crsInstructor, crsMeeting, lecSession} from "../timetable/courseInterfaces";
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  sampleMeetings: lecSession[] = [
    {
      "schedule": [
        {
          "meetingDay": "MO",
          "meetingStartTime": "14:00",
          "meetingEndTime": "16:00",
          "meetingScheduleId": "224399",
          "assignedRoom1": "BT 319",
          "assignedRoom2": null,
          "key": "MO-224399"
        }
      ],
      "instructors": [
        {
          "instructorId": "7253352",
          "firstName": "J",
          "lastName": "Zilcosky",
          "key": "7253352"
        }
      ],
      "meetingId": "156884",
      "teachingMethod": "LEC",
      "sectionNumber": "0101",
      "subtitle": "Literature, Trauma, Modernity",
      "cancel": "",
      "waitlist": "Y",
      "deliveryMode": "CLASS",
      "online": "In Person -- See Delivery Instructions.",
      "enrollmentCapacity": "1",
      "actualEnrolment": "1",
      "actualWaitlist": "0",
      "enrollmentIndicator": "E",
      "meetingStatusNotes": "",
      "enrollmentControls": [],
      "key": "LEC-0101"
    },
    {
      "schedule": [
        {
          "meetingDay": "TU",
          "meetingStartTime": "10:00",
          "meetingEndTime": "12:00",
          "meetingScheduleId": "224400",
          "assignedRoom1": "",
          "assignedRoom2": null,
          "key": "TU-224400"
        }
      ],
      "instructors": [
        {
          "instructorId": "7253353",
          "firstName": "J",
          "lastName": "Ricco",
          "key": "7253353"
        }
      ],
      "meetingId": "156887",
      "teachingMethod": "LEC",
      "sectionNumber": "0201",
      "subtitle": "Women and Sex Talk",
      "cancel": "",
      "waitlist": "Y",
      "deliveryMode": "ONLSYNC",
      "online": "Online - Synchronous -- See Delivery Instructions.",
      "enrollmentCapacity": "4",
      "actualEnrolment": "0",
      "actualWaitlist": "0",
      "enrollmentIndicator": "E",
      "meetingStatusNotes": "",
      "enrollmentControls": [],
      "key": "LEC-0201"
    },
    {
      "schedule": [
        {
          "meetingDay": "TU",
          "meetingStartTime": "15:00",
          "meetingEndTime": "17:00",
          "meetingScheduleId": "224401",
          "assignedRoom1": "",
          "assignedRoom2": null,
          "key": "TU-224401"
        }
      ],
      "instructors": [
        {
          "instructorId": "7253354",
          "firstName": "B",
          "lastName": "Havercroft",
          "key": "7253354"
        }
      ],
      "meetingId": "156882",
      "teachingMethod": "LEC",
      "sectionNumber": "0301",
      "subtitle": "Gender, Agency and Life Writing",
      "cancel": "",
      "waitlist": "Y",
      "deliveryMode": "ONLSYNC",
      "online": "Online - Synchronous -- See Delivery Instructions.",
      "enrollmentCapacity": "4",
      "actualEnrolment": "0",
      "actualWaitlist": "0",
      "enrollmentIndicator": "E",
      "meetingStatusNotes": "",
      "enrollmentControls": [],
      "key": "LEC-0301"
    },
    {
      "schedule": [
        {
          "meetingDay": "TH",
          "meetingStartTime": "10:00",
          "meetingEndTime": "12:00",
          "meetingScheduleId": "224404",
          "assignedRoom1": "",
          "assignedRoom2": null,
          "key": "TH-224404"
        }
      ],
      "instructors": [
        {
          "instructorId": "7253355",
          "firstName": "A",
          "lastName": "Sakaki",
          "key": "7253355"
        }
      ],
      "meetingId": "156883",
      "teachingMethod": "LEC",
      "sectionNumber": "0401",
      "subtitle": "Diasporic Cities: Itinerant Narratives of Metroples by Travellers and Expatriates",
      "cancel": "",
      "waitlist": "Y",
      "deliveryMode": "ONLSYNC",
      "online": "Online - Synchronous -- See Delivery Instructions.",
      "enrollmentCapacity": "4",
      "actualEnrolment": "2",
      "actualWaitlist": "0",
      "enrollmentIndicator": "E",
      "meetingStatusNotes": "",
      "enrollmentControls": [],
      "key": "LEC-0401"
    },
    {
      "schedule": [
        {
          "meetingDay": "FR",
          "meetingStartTime": "11:00",
          "meetingEndTime": "13:00",
          "meetingScheduleId": "224405",
          "assignedRoom1": "",
          "assignedRoom2": null,
          "key": "FR-224405"
        }
      ],
      "instructors": [
        {
          "instructorId": "7253356",
          "firstName": "M",
          "lastName": "Revermann",
          "key": "7253356"
        }
      ],
      "meetingId": "156885",
      "teachingMethod": "LEC",
      "sectionNumber": "0501",
      "subtitle": "Tragedy: Instantiations of a Dramatic Form in Theatre, Philosophy, Opera and Popular Cinema",
      "cancel": "",
      "waitlist": "Y",
      "deliveryMode": "ONLSYNC",
      "online": "Online - Synchronous -- See Delivery Instructions.",
      "enrollmentCapacity": "4",
      "actualEnrolment": "1",
      "actualWaitlist": "0",
      "enrollmentIndicator": "E",
      "meetingStatusNotes": "",
      "enrollmentControls": [],
      "key": "LEC-0501"
    },
    {
      "schedule": [
        {
          "meetingDay": "MO",
          "meetingStartTime": "14:00",
          "meetingEndTime": "16:00",
          "meetingScheduleId": "236908",
          "assignedRoom1": null,
          "assignedRoom2": null,
          "key": "MO-236908"
        }
      ],
      "instructors": [
        {
          "instructorId": "7253357",
          "firstName": "J",
          "lastName": "Zilcosky",
          "key": "7253357"
        }
      ],
      "meetingId": "187466",
      "teachingMethod": "LEC",
      "sectionNumber": "9101",
      "subtitle": "Literature, Trauma, Modernity",
      "cancel": "",
      "waitlist": "Y",
      "deliveryMode": "ONLSYNC",
      "online": "Online - Synchronous -- See Delivery Instructions.",
      "enrollmentCapacity": "3",
      "actualEnrolment": "1",
      "actualWaitlist": "0",
      "enrollmentIndicator": "E",
      "meetingStatusNotes": "",
      "enrollmentControls": [],
      "key": "LEC-9101"
    }
  ]

  // objective: display a table based on the sample
  // meetings list.

  constructor() { }

  ngOnInit(): void {
  }

  // getMeetingTimes(crsSession: lecSession): any[] {
  //
  // }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  obtainInstructors(insts: crsInstructor[]): string {
    const insNameList: string[] = [];
    insts.forEach((ins) => {
      insNameList.push(ins.firstName + ". " + ins.lastName);
    })
    return insNameList.join(", ");
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
  for (let[k, v] of Object.entries(obj)) {
    v.key = k;
    arr.push(v);
  }
  return arr;
}
