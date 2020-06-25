import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ProjectsService } from '../../../../../providers';
import { Rewards } from '../../../../../interfaces/rewards';
import { CampaignDetailsComponent } from '../../campaign-details/campaign-details.component';

@Component({
  selector: 'app-add-reward',
  templateUrl: './add-reward.component.html',
  styleUrls: ['./add-reward.component.scss']
})
export class AddRewardComponent implements OnInit {

  rewards : Rewards = {
    projects_id: '',
    title: '',
    amount: '',
    description: '',
    image: '',
    shipDate: '',
    haveToShip: ''
}
private idProject: any;


  public Editor = DecoupledEditor;
  constructor(
    private projectService: ProjectsService ,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {  }


  ngOnInit() {

  }

  onChangeDate(result: Date): void {
    console.log('onChange: ', result);
  }
  
  addProjectReward() {
    this.rewards.projects_id = this.activedRoute.snapshot.paramMap.get('id')
    this.projectService.addProjectReward(this.rewards)
    .subscribe(data => {
      console.log('Rewards created sucessfully !');
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
