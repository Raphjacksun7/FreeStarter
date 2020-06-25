import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ProjectsService } from '../../../../../providers';
import { Rewards } from '../../../../../interfaces/rewards';
import { CampaignDetailsComponent } from '../../campaign-details/campaign-details.component';

@Component({
  selector: 'app-update-rewards',
  templateUrl: './update-rewards.component.html',
  styleUrls: ['./update-rewards.component.scss']
})
export class UpdateRewardsComponent implements OnInit {

  public rewards :any;
  public idReward: any;


  public Editor = DecoupledEditor;
  constructor(
    private projectService: ProjectsService ,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    this.getProjectReward()
  }

  onChangeDate(result: Date): void {
    console.log('onChange: ', result);
  }
  
  getProjectReward() {
    this.projectService.getProjectRewardsById(this.activedRoute.snapshot.paramMap.get('id'))
    .subscribe(data => {
      this.rewards = data
      },
      error => {
            console.log(error);
        return;
      });

    }

  updateProjectReward() {
    this.projectService.updateProjectReward(this.rewards,this.activedRoute.snapshot.paramMap.get('id'))
    .subscribe(data => {
      console.log('Reward updated sucessfully !');
      this.router.navigate([`steps/rewards/${ data.projects_id }`]);
      },
      error => {
            console.log(error);
        return;
      });
    }

    public onReady( editor ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
  }
}
