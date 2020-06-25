import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../providers';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  videoOnFrame: any;
  videoUrl = "https://www.youtube.com/watch?v=izGDTD5IRys";
  private details: any = [];
  public static rewards: Array<any> = [];
  private image: any;

  constructor(
     private embedService: EmbedVideoService,
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


private goToContribute(index) {
  this.router.navigate([`contribute/${index}`]);
}

}
