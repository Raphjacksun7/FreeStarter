import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { ProjectsComponent } from '../projects.component';
import { ProjectsService } from '../../../providers';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent implements OnInit {

  public rewards: Array<any> = []
  public mySubscription: any;
  public totalAmount: number;
  public projectDetails: Array<any> = [];
  public idReward:number;
  public isVisible = false;
  public isOkLoading = false;



  constructor(
    private projectService: ProjectsService ,
    private activeRoute: ActivatedRoute ,
    private router: Router
  ) { }


  ngOnInit() {
    this.totalAmount = 0;
    this.getProjectDetails();
    this.getProjectRewards();
  }

  public getProjectRewards(){
    this.projectService.getProjectRewardsByProjectId(this.activeRoute.snapshot.paramMap.get('id'))
  .subscribe(response => {
    this.rewards = response
    console.log(this.rewards)
  }, err => {
    console.log(err)
  })
  }

  public getProjectDetails(){
    this.projectService.getProjectAllDetailsById(this.activeRoute.snapshot.paramMap.get('id'))
  .subscribe(response => {
    this.projectDetails = response
    console.log(this.projectDetails)
  }, err => {
    console.log(err)
  })
  }

  private goToProject(){
    this.router.navigate([`projects/${this.activeRoute.snapshot.paramMap.get('id')}`]);
  }

  private goToPayement() {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
      this.router.navigate([`payment-choices/${this.idReward}`]);
    }, 2000);
  }

  private updateAmount(amount, idReward) {
    this.idReward = idReward
    this.totalAmount = amount
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }



}
