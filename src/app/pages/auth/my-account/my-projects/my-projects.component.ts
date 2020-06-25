import { Component, OnInit } from '@angular/core';
import { ProjectsService, AuthService } from 'src/app/providers';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  public projects: any;

  constructor(
    private auth: AuthService,
    private projectservices: ProjectsService
  ) {
    this.getUserProject()
   }

  ngOnInit(): void {
  }

  getUserProject() {
    this.projectservices.getUserProjects(this.auth.getUserData().id).subscribe(
      response => {
        this.projects = response
      }, error => {
        console.log(error);
      })
    }   

}
