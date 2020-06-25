import { Component, OnInit, Input } from '@angular/core';
import { Projects } from '../../../../interfaces/projects';
import { ProjectsService, AuthService } from '../../../../providers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {
  
  public project : Projects = {
    user_id: '',
    title: '',
    category: '',
    current_budget: '',
    budget: '',
    contributors_number: '',
    duration: '',
    progression: '',
    contact: ''
  }

  constructor(
     private projectService: ProjectsService ,
     private auth: AuthService ,
     private router: Router  
  ) { }

  ngOnInit() {
    if (this.auth.isLoggedIn) {
      this.auth.profile().subscribe(
        (data) => {
          this.project.user_id = data.id
        })
        ,
        error => {
          console.log(error);
        }
    } 
  }



    createProject() {
      this.projectService.createProject(this.project)
      .subscribe(data => {
        //this.projectService.dataSender(data.id);
        console.log('Project created sucessfully !');
        this.router.navigate([`steps/project-summary/${data.id}`]);
        },
        error => {
              console.log(error);
          return;
        });
  
      }


}
