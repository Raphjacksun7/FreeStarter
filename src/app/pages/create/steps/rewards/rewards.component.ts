import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../../../providers';
import { CampaignDetailsComponent } from '../campaign-details/campaign-details.component';


@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
  private rewards: any = [];
  private idProject: any;
  private project: any;

  constructor(
    private projectService: ProjectsService ,
    private router: Router ,
    private activedRoute: ActivatedRoute
    ) 
    {
      this.getProjectById()
      this.getProjectRewardsByProjectId()
    }

  ngOnInit() {
    this.getProjectById()
  this.getProjectRewardsByProjectId()
  }

  getProjectById() {  
    this.projectService.getProjectById(this.activedRoute.snapshot.paramMap.get('id'))
    .subscribe(response => {
      this.project = response
    }, err => {
      console.log(err)
    })
}

  getProjectRewardsByProjectId() {  
      this.projectService.getProjectRewardsByProjectId(this.activedRoute.snapshot.paramMap.get('id'))
      .subscribe(response => {
        this.rewards = response
        console.log(this.rewards)
      }, err => {
        console.log(err)
      })
  }
  
  deleteRow(index) {
     
  }


  public goToUpdateReward(idReward){
    this.router.navigate([`steps/rewards/update/${ idReward }`]);
  }

  public goToAddReward(){
    this.router.navigate([`steps/rewards/add/${ this.activedRoute.snapshot.paramMap.get('id') }`]);
  }

  public goToBankSatus(){
    this.router.navigate([`steps/means-of-payment/${ this.activedRoute.snapshot.paramMap.get('id') }`]);
  }


}
