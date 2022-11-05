import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private http:HttpClient, private courseService: CourseService) { }

  ngOnInit(): void {
  }

  data: any = {};
  c: Course = new Course();
  courses : Array<Course> = [];

  addCourseDetails(){
    this.courseService.addCourse(this.c).subscribe(data =>
      {
        this.courses.push(data);
      },
      error => {
        console.log(error);
      })
      this.c = new Course();
  }

  viewAllCourses(){
    this.courseService.getAllCourse().subscribe(data =>
      {
        this.courses = data;
      }, 
      error =>{
        console.log(error);
      })
  }

  deleteCourse(id:number){
    this.courseService.deleteCourse(id).subscribe(data=>
      {
        let courseIndex = this.courses.findIndex(c=>c.id===id);
        this.courses.splice(courseIndex, 1);
        this.viewAllCourses();
      }, 
      error =>{
        console.log(error);
      })
  }

}
