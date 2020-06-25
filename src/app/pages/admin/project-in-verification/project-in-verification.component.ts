import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService, AuthService } from 'src/app/providers';
  
  @Component({
    selector: 'app-project-in-verification',
    templateUrl: './project-in-verification.component.html',
    styleUrls: ['./project-in-verification.component.scss']
  })
  export class ProjectInVerificationComponent implements OnInit {
  
  
    public projects: Array<any> = []
  
    constructor(
      private projectService: ProjectsService ,
      private auth: AuthService,
      private router: Router
    ) { 
     
    }
  
    ngOnInit() {
      this.getProjects()
    }
  
    getProjects() {  
      this.projectService.getProjects( )
      .subscribe(projects => {
        for (const project of projects ){
          this.auth.getUserById(project.user_id)
            .subscribe(user => {
              if(project.valider == false) {
              this.projects.push({
                id: project.id,
                user_id: project.user_id,
                owner: user.name,
                title: project.title,
                category: project.category,
                budget: project.budget
              })
            }
            }, err => {
            console.log(err)
          }) 
        } 
        console.log(this.projects)
      }, err => {
        console.log(err)
      })
      
    }
  
  
  
  }
  
