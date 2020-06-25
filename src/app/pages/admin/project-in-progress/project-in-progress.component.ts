import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService, AuthService } from 'src/app/providers';

@Component({
  selector: 'app-project-in-progress',
  templateUrl: './project-in-progress.component.html',
  styleUrls: ['./project-in-progress.component.scss']
})
export class ProjectInProgressComponent implements OnInit {

  private projects: Array<any> = []

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
            if(project.valider == true) {
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
