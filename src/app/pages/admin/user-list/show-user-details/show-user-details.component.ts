import { Component, OnInit } from '@angular/core';
import { AuthService, ProjectsService } from 'src/app/providers';
import { NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-user-details',
  templateUrl: './show-user-details.component.html',
  styleUrls: ['./show-user-details.component.scss']
})
export class ShowUserDetailsComponent implements OnInit {

  private user: any = [];
  private projects: any = [];
  private contributions: any = [];
  private nbr_projects: any;
  private nbr_contrb: any;
  private loading: boolean = false;
  private isVisible = false;

  constructor(
    private auth: AuthService ,
    private projectServices: ProjectsService ,
    private modalService: NzModalService,
    private activeRoute: ActivatedRoute,
    private router: Router ) {
      
      this.getUserById()
      this.getUserProjects()

    }

  ngOnInit(): void {
    this.getUserById()
    this.getUserProjects()
  }

  onBack()  {
    this.router.navigate([`admin/user-list`]);
  }

  private getUserById() {  
    this.auth.getUserById(this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(response => {
      this.user = response
      console.log(this.user)
    }, err => {
      console.log(err)
    })
  }

  private getUserProjects() {  
    this.projectServices.getUserProjects(this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(response => {
      this.projects = response
      this.nbr_projects = this.projects.length
      console.log(this.projects)
    }, err => {
      console.log(err)
    })
  }

  private getUserContributions() {  
    this.projectServices.getUserContributons(this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(response => {
      this.contributions = response
      this.nbr_contrb = this.contributions.length
      console.log(this.contributions)
    }, err => {
      console.log(err)
    })
  }


  showDeleteConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Étes-vous sure de vouloir supprimer ce utilisateur?',
      nzContent: '<b style="color: red;">Cette action entraine également la suppression de tout ses enregistrement dans la base de données (Projets et Contributions) .<br> Noter que cette action est irréversible.</b>',
      nzOkText: 'Oui',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK')
        this.loading = true;
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 2000);
          this.auth.deleteUser(this.activeRoute.snapshot.paramMap.get('id'))
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
