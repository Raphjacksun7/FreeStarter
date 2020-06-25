import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/providers';
import { ActivatedRoute, Router } from '@angular/router';
import { Rewards } from 'src/app/interfaces/rewards';
import { Contributors } from 'src/app/interfaces/contibutors';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-payment-choices',
  templateUrl: './payment-choices.component.html',
  styleUrls: ['./payment-choices.component.scss']
})
export class PaymentChoicesComponent implements OnInit {

  private reward: any;
  private projectDetails: any;
  private contributors: Contributors = {
    projects_id: '',
    user_id: '',
    rewards_id: ''
  }
  userId: any;

  constructor(
    private projectService: ProjectsService ,
    private modalService: NzModalService,
    private activeRoute: ActivatedRoute ,
    private router: Router
  ) { }

  ngOnInit() {
    this.getReward()
  }

  public getReward(){
    this.projectService.getProjectRewardsById(this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(response => {
      this.reward = response
      this.projectService.getProjectAllDetailsById(this.reward.projects_id)
      .subscribe(data => {
        this.projectDetails = data
        this.userId = data.users.id
        console.log(this.projectDetails)
      }, err => {
      console.log(err)
    })
      console.log(this.reward)
    }, err => {
      console.log(err)
    })
  }

  private goToRewards() {
    this.router.navigate([`contribute/${this.reward.projects_id}`]);
  }

  private validatePayment() {
    this.contributors.projects_id = this.reward.projects_id
    this.contributors.rewards_id = this.reward.id
    this.contributors.user_id = this.userId
    this.projectService.saveContributor(this.contributors)
    .subscribe( data => {
      console.log(data)
    })
    this.modalService.success({
      nzTitle: 'Votre paiement à été effectuer avec succès',
      nzContent: "Merci d'avoir contribuer au projet  "+this.projectDetails.project.title,
      nzOnOk: () => {
        this.router.navigate([`projects/${this.contributors.projects_id}`]);
      }
    });
  }


}
