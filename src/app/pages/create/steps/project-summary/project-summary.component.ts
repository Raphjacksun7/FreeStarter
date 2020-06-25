import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../../providers';
import { Communities } from '../../../../interfaces/communities';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent implements OnInit {

  private communities : Communities = {
    projects_id:'',
    website: '',
    facebook:'',
    twitter: '',
    youtube: '',
  }

  private project : any;

  constructor(
    private projectService: ProjectsService ,
    private activeRoute: ActivatedRoute,
    private router: Router  
  ) { 
    this.getProjectById()
    this.getCommunitiesById()
  }

  ngOnInit() {
    this.getProjectById()
    this.getCommunitiesById()
  }

  updateCommunities() {
    this.projectService.updateCommunities(this.communities,this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(data => {
      console.log('Project Summary updated sucessfully !');
      this.router.navigate([`steps/detailed-description/${data.projects_id}`]);
      },
      error => {
            console.log(error);
        return;
      });

    }

    getProjectById() {  
      this.projectService.getProjectById(this.activeRoute.snapshot.paramMap.get('id'))
      .subscribe(response => {
        this.project = response
      }, err => {
        console.log(err)
      })
  }

  getCommunitiesById() {  
    this.projectService.getCommunitiesById(this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(response => {
      this.communities = response
    }, err => {
      console.log(err)
    })
}

}
