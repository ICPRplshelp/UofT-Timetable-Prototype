import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TimetableService {

  productURL: string = "api/courses/coursesMASTER.json";
  rawURL: string = "api/courses/courses";
  rawURLend: string = ".json";
  //products: any = ;
  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get<any>(this.productURL).pipe(
      tap(data=>{})
    );
  }

  getAllCoursesInDes(des: string): Observable<any> {
    return this.http.get<any>(this.desToLink(des)).pipe(
      tap(data=>console.log({}))
    );
  }

  desToLink(des: string): string {
    return "api/courses/courses" + des + ".json";
  }



  // getCourseList(des: string): Observable<any> {
  //   return this.http.get<any>(this.rawURL + des + this.rawURLend).pipe(
  //     tap(data=>console.log('my data = ',JSON.stringify(data)))
  //   );
  // }


}

