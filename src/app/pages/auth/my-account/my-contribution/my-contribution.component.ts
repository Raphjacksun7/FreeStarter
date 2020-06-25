import { Component, OnInit } from '@angular/core';
import { AuthService, ProjectsService } from 'src/app/providers';

@Component({
  selector: 'app-my-contribution',
  templateUrl: './my-contribution.component.html',
  styleUrls: ['./my-contribution.component.scss']
})
export class MyContributionComponent implements OnInit {

  public contributions: Array<any> = [];

  constructor(
    private auth: AuthService,
    private projectService: ProjectsService)
   { this.getUserContributions() }

  ngOnInit(): void {
  }

  getUserContributions() {
    this.projectService.getUserContributons(this.auth.getUserData().id).subscribe(
      user_contributions => {
        for (const user_contribution of user_contributions ){
          this.projectService.getProjectById(user_contribution.projects_id)
          .subscribe(projects => {
            this.projectService.getProjectRewardsById(user_contribution.rewards_id)
            .subscribe(rewards => {
              this.contributions.push({
                id: projects.id,
                title: projects.title,
                amount: rewards.amount,
              })
              console.log(this.contributions)
              }, err => {
              console.log(err)
            })
            }, err => {
              console.log(err)
            })  
          } 
      }, error => {
        console.log(error);
      })
    }
    

}
