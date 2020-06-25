import { Component, OnInit } from '@angular/core';
import { BankStatus } from 'src/app/interfaces/bank-status';
import { ProjectsService } from '../../../../providers';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-means-of-payment',
  templateUrl: './means-of-payment.component.html',
  styleUrls: ['./means-of-payment.component.scss']
})
export class MeansOfPaymentComponent implements OnInit {

  public bankStatus :BankStatus = {
    projects_id: '',
    realName: '',
    nameOfBank: '',
    bankAccountNumber: 'string',
    RIB: '',
    status: '',
    statusProof: null,
  };

  public checkValue = true;
  public requireShow: any;
  public zipName: string;
  public imageError: string;
  public idProject: any;
  public project: any;

  constructor(
    private projectService: ProjectsService ,
    private activeRoute: ActivatedRoute,
    private router: Router  
  ) { 
    this.getProjectById()
    this.getProjetBankInfo()
   }

  ngOnInit() {
    this.getProjectById()
    this.getProjetBankInfo()
  }

  getProjetBankInfo() {
    this.projectService.getBankInfoByProjectId(this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(data => {
      this.bankStatus = data
      },
      error => {
            console.log(error);
        return;
      });

  }

  getProjectById() {  
    this.projectService.getProjectById(this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(response => {
      this.project = response
    }, err => {
      console.log(err)
    })
}

  updateProjetBankInfo() {
    this.projectService.updateBankInfoByProjectId(this.bankStatus,this.activeRoute.snapshot.paramMap.get('id'))
    .subscribe(data => {
      console.log('Project Bank Information updated sucessfully !');
      this.router.navigate([`project/${this.project.id}`]);
      },
      error => {
            console.log(error);
        return;
      });

  }

  private isChecked() {

    switch(this.bankStatus.status) { 
      case "Particulier ou Entrepreneur": { 
        this.requireShow = 
        `<ul style="margin:10px;">
            <li><b>Preuve d’identité (Carte Nationale d’Identité, Passeport)</b></li>
            <li><b>Relevé d’Identité Bancaire</b></li>
            <li><b>Justificatif de domicile 3</b></li>
        </ul>`;
        this.checkValue = false;
         break; 
      } 
      case "Association": { 
        this.requireShow = 
        `<ul style="margin:10px;">
            <li><b>Preuve d’identité (Carte Nationale d’Identité, Passeport)</b></li>
            <li><b>Relevé d’Identité Bancaire</b></li>
            <li><b>Justificatif de domicile 6</b></li>
        </ul>`;
        this.checkValue = false;
         break; 
      }
      case "Société": { 
        this.requireShow = 
            `<ul style="margin:10px;">
                <li><b>Preuve d’identité (Carte Nationale d’Identité, Passeport)</b></li>
                <li><b>Relevé d’Identité Bancaire</b></li>
                <li><b>Justificatif de domicile 7</b></li>
            </ul>`;
          this.checkValue = false;
        break; 
        }
      case "PME ou Startup": { 
        this.requireShow = 
        `<ul style="margin:10px;">
            <li><b>Preuve d’identité (Carte Nationale d’Identité, Passeport)</b></li>
            <li><b>Relevé d’Identité Bancaire</b></li>
            <li><b>Justificatif de domicile 5</b></li>
        </ul>`;
        this.checkValue = false; 
          break; 
      }
      case "Collectivité Territoriale": { 
        this.requireShow = 
            `<ul style="margin:10px;">
                <li><b>Preuve d’identité (Carte Nationale d’Identité, Passeport)</b></li>
                <li><b>Relevé d’Identité Bancaire</b></li>
                <li><b>Justificatif de domicile 2</b></li>
            </ul>`;
            this.checkValue = false; 
        break; 
      } 

      default: { 
         this.checkValue = true; 
         break; 
      } 
   } 

  }

  handleUpload(fileInput: any) {
    console.log(fileInput.target.files[0]);
   this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 9995971520;
        if (fileInput.target.files[0].size > max_size) {
            this.imageError = 'Veillez respecter les ' + max_size / 1000000 + 'Mo recommandées.';
            return false;
        }

        if (fileInput.target.files[0].type == "application/zip" || 
            fileInput.target.files[0].type == "application/x-xz" || 
            fileInput.target.files[0].type == "application/x-7z-compressed"|| 
            fileInput.target.files[0].type == "application/x-apple-diskimage" ) {
          
            let file: File = fileInput.target.files[0];
            this.bankStatus.statusProof = file
            this.zipName = fileInput.target.files[0].name
                    
        } else {
            this.imageError = 'Ceci n\'est pas un fichier zip';
            return false;
        }
    }
  }

}

