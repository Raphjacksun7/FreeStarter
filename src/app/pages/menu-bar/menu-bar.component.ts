import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  private fullname: string;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { this.getUserInfos()}

  ngOnInit(): void {
    this.getUserInfos()
  }

  private getUserInfos(){
    if(this.auth.isLoggedIn()) {
      this.fullname = this.auth.getUserData().name     
    }  
  }

  private logout(){
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
  

}
