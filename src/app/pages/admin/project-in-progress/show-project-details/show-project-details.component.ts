import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService, AuthService } from 'src/app/providers';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-show-project-details',
  templateUrl: './show-project-details.component.html',
  styleUrls: ['./show-project-details.component.scss']
})
export class ShowProjectDetailsValidComponent implements OnInit {

  public details: any = [];
  public image: string;
  public loading: boolean = false;
  public isVisible = false;

  constructor(
    private projectService: ProjectsService ,
    private modalService: NzModalService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { 
   
  }

  ngOnInit() {
    this.getProjectAllDetailsById()
  }

  private getProjectAllDetailsById() {  
    this.projectService.getProjectAllDetailsById(this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(response => {
      this.details = response
      this.image = "http://127.0.0.1:8000/api/getImage/"+this.details.project_details.image
      console.log(this.details)
    }, err => {
      console.log(err)
    })
  }

  onBack()  {
    this.router.navigate([`admin/project-in-progress`]);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Étes-vous sure de vouloir supprimer ce project?',
      nzContent: '<b style="color: red;">Une fois ce projet supprimer il est impossible au porteur de ce projet de le voir.<br> Noter que cette action est irréversible.</b>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK')
        this.loading = true;
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 2000);
          this.projectService.deleteProject(this.activeRoute.snapshot.paramMap.get('id'))
            .subscribe(response => {
              this.loading = false;
              console.log(response) 
              this.onBack()
            }, err => {
              console.log('Oops something wrong',err)
            })
        }).catch(() => console.log('Oops errors!'))

      },
      nzCancelText: 'Non',
      nzOnCancel: () => console.log('Cancel')
    });
  }


}