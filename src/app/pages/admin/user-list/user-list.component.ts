import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers';
import { NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private users: any = [];
  constructor(
    private auth: AuthService ,
    private modalService: NzModalService,
    private activeRoute: ActivatedRoute,
    private router: Router ) {
      
      this.getUsers()
    }

  ngOnInit(): void {
  }

  private getUsers() {  
    this.auth.getUsers()
    .subscribe(response => {
      this.users = response
      console.log(this.users)
    }, err => {
      console.log(err)
    })
  }

}
