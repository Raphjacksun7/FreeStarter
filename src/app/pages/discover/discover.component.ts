import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService, UploadsService, AuthService } from '../../providers';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  private projects: Array<any> = []

  constructor(
    private projectService: ProjectsService ,
    private uploadService: UploadsService ,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProjects()
  }

  getProjects() {  
    this.projectService.getProjects( )
    .subscribe(projects => {
      for (const project of projects ){
        this.projectService.getProjectDetailsByProjectId(project.id)
        .subscribe(projectDetails => {
          this.auth.getUserById(project.user_id)
          .subscribe(user => {
            if(project.valider == true) {
            this.projects.push({
              id: project.id,
              user_id: project.user_id,
              owner: user.name,
              title: project.title,
              category: project.category,
              progression: project.progression,
              slogan: projectDetails.slogan,
              image: projectDetails.image,
            })
            }
            }, err => {
            console.log(err)
          })
          }, err => {
            console.log(err)
          })  
        } 
        console.log(this.projects)
      }, err => {
        console.log(err)
      })
      
    }


  getImage(filename) {  
    this.uploadService.getImage(filename)
    .subscribe(image => {
      console.log(image)
      return image
    }, err => {
      console.log(err)
    })
    
  }

}
