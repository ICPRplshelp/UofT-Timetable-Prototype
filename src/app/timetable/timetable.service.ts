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
      tap(data=>console.log('my python data = ',JSON.stringify(data)))
    );
  }

  getCourseList(des: string): Observable<any> {
    return this.http.get<any>(this.rawURL + des + this.rawURLend).pipe(
      tap(data=>console.log('my python data = ',JSON.stringify(data)))
    );
  }


}

