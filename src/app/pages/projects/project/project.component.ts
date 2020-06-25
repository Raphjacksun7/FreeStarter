import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../providers';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public projectDetails: any = [];
  constructor(
     private projectService: ProjectsService ,
     private activeRoute: ActivatedRoute ,
     private router: Router
  ) { }

  ngOnInit() {
    this.getProjectAllDetailsById()
  }

  private getProjectAllDetailsById() {  
    this.projectService.getProjectAllDetailsById(this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(response => {
      this.projectDetails = response
      console.log(this.projectDetails)
    }, err => {
      console.log(err)
    })
  }

  private goToUpdateProject(){
    this.router.navigateByUrl(`steps/campaign-details/update/${this.projectDetails.project.id }`);
  }

  private goToUpdateCommunities(){
    this.router.navigate([`steps/project-summary/${this.projectDetails.project.id }`]);
  }

  private goToUpdateProjectDetails(){
    this.router.navigate([`steps/detailed-description/${this.projectDetails.project.id }`]);
  }

  private goToUpdateRewards(){
    this.router.navigate([`steps/rewards/${this.projectDetails.project.id }`]);
  }

  private goToUpdateProjectBank(){
    this.router.navigate([`steps/means-of-payment/${this.projectDetails.project.id }`]);
  }


}
