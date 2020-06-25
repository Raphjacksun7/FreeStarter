import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { ProjectsService } from 'src/app/providers';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-by-owner',
  templateUrl: './view-by-owner.component.html',
  styleUrls: ['./view-by-owner.component.scss']
})
export class ViewByOwnerComponent implements OnInit {

  videoOnFrame: any;
  videoUrl = "https://www.youtube.com/watch?v=izGDTD5IRys";
  public details: any = [];
  public static rewards: Array<any> = [];
  public image: any;

  constructor(
     private embedService: EmbedVideoService,
     private projectService: ProjectsService,
     private activeRoute: ActivatedRoute,
     private router: Router
  ) { }

  ngOnInit() {
  this.getProjectAllDetailsById()
  }


private getProjectAllDetailsById() {  
  this.projectService.getProjectAllDetailsById(this.activeRoute.snapshot.paramMap.get('id'))
  .subscribe(response => {
    this.details = response
    console.log(this.details)
    this.image = "http://127.0.0.1:8000/api/getImage/"+this.details.project_details.image
    if (this.details.project_details.video)  {
      this.videoOnFrame = this.embedService.embed(this.details.project_details.video,{
        query: { portrait: 0, color: '333' },
        attr: { width:"100%", height: "100%" }
      });
    }else {
      this.videoOnFrame = false;
    }

    console.log(this.videoOnFrame)
  }, err => {
    console.log(err)
  })
}


private goToEditProject() {
  this.router.navigate([`project/${this.details.project.id}`]);
}

}
