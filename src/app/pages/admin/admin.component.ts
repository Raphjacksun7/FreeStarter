import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private fullname: string;
  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUserInfos()
  }

  private getUserInfos(){
    this.auth.profile().subscribe(
      (data) => {
        this.fullname = data.name
       }, error => {
        console.log(error);
      });
  }
  

}
