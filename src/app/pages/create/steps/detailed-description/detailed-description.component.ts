import { Component,OnInit} from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ProjectDetails } from '../../../../interfaces/project-details';
import { ProjectsService } from '../../../../providers';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detailed-description',
  templateUrl: './detailed-description.component.html',
  styleUrls: ['./detailed-description.component.scss']
})
export class DetailedDescriptionComponent implements OnInit {

  public Editor = DecoupledEditor;
  private projectDetails: ProjectDetails = {
    projects_id: '',
    localisation: '',
    image: '',
    video: '',
    slogan: '',
    description: '',
    target: '',
  }

  private imageError: string = '';
  private imageName: string = '';
  private project: any;

  constructor(
    private projectService: ProjectsService ,
    private activeRoute: ActivatedRoute,
    private router: Router  ) 
    { 
      this.getProjectById()
      this.getProjects()
    }
  ngOnInit() {
    this.getProjectById()
    this.getProjects()
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }

  getProjectById() {  
    this.projectService.getProjectById(this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(response => {
      this.project = response
    }, err => {
      console.log(err)
    })
}

  getProjects() {  
    this.projectService.getProjectDetailsByProjectId( this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(projectDetail => { 
      this.projectDetails  = projectDetail
      this.imageName = this.projectDetails.image
      if(!this.projectDetails.description)
      { 
        this.projectDetails.description = 
        `<h4>Présentez-vous et présentez votre projet. </h4>
        <p>Il faut capter votre audience : 
        racontez-leur une histoire ! Expliquez-leur qui vous êtes, ce que vous faites (la nature de votre projet), 
        ce qu'ils gagnent à vous soutenir. Soyez clair, engageant et positif. N'hésitez pas à illustrer vos propos par 
        des images, des gifs ou des vidéos afin de donner encore plus envie à vos visiteurs de vous soutenir.</p> `
      }
      if(!this.projectDetails.target)
      { 
        this.projectDetails.target = 
        `<h4>Ici, démontrez que votre projet de financement est mature et réfléchi.</h4> 
                <p>Il est nécessaire d'être
                transparent sur la manière dont vous utiliserez les fonds récoltés. Là encore, illustrez vos besoins 
                par des schémas et expliquez vos paliers de financement si vous en avez. La crédibilité qui se dégagera 
                de vos explications permettra d'engager encore plus vos contributeurs potentiels qui vous feront 
                confiance car ils comprendront que votre projet ira au bout.</p> `
      }
         
    }, err => {
      console.log(err)
    })
    
  }

  updateProjectDetail() {
    this.projectService.updateProjectDetail(this.projectDetails, this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(data => {
      console.log('Project Details updated sucessfully !');
      this.router.navigate([`steps/rewards/${data.projects_id}`]);
      },
      error => {
            console.log(error);
        return;
      });

    }

    handleUpload(fileInput: any) {
      console.log(fileInput.target.files[0]);

      if (fileInput.target.files && fileInput.target.files[0]) {
          // Size Filter Bytes
          const max_size = 5971520;
          if (fileInput.target.files[0].size > max_size) {
              this.imageName = 'Veillez respecter les ' + max_size / 1000000 + 'Mo recommandées.';
              return false;
          }

          if (fileInput.target.files[0].type == "image/png" || fileInput.target.files[0].type == "image/jpeg"  ) {
            
              let reader = new FileReader();
              reader.readAsDataURL(fileInput.target.files[0]);
              reader.onload = (e: any) => {
                //me.modelvalue = reader.result;
                //console.log(e.target.result);
                this.projectDetails.image = e.target.result
                this.imageName = fileInput.target.files[0].name
                this.imageError = null;

              }
              reader.onerror = function (error) {
                console.log('Error: ', error);
              } 
              
            
          } else {
              this.imageName = null;
              this.imageError= 'There is error';
              return false;
          }
      }
  }


}