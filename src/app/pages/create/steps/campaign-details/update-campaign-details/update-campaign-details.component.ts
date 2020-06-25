import { Component, OnInit, Input } from '@angular/core';
import { Projects } from '../../../../../interfaces/projects';
import { ProjectsService, AuthService } from '../../../../../providers';
import { Router } from '@angular/router';
import { id_ID } from 'ng-zorro-antd';

@Component({
  selector: 'app-update-campaign-details',
  templateUrl: './update-campaign-details.component.html',
  styleUrls: ['./update-campaign-details.component.scss']
})
export class UpdateCampaignDetailsComponent implements OnInit {
  
  private project: any;
  private idProject;


  constructor(
     private projectService: ProjectsService ,
     private auth: AuthService ,
     private router: Router  
  ) {
    this.idProject = this.router.getCurrentNavigation().extras.state
   }

  ngOnInit() {
   this.getProjects();
  }


    updateProject() {
      console.log(this.idProject)
      this.projectService.updateProject(this.project, this.idProject)
      .subscribe(data => {
        console.log('Project update sucessfully !');
        this.router.navigate(['steps/project-summary']);
        },
        error => {
              console.log(error);
          return;
        });
  
      }

      getProjects() {  
        this.projectService.getProjectById( this.idProject)
        .subscribe(projects => { 
          this.project  = projects
        }, err => {
          console.log(err)
        })
        
      }


}
