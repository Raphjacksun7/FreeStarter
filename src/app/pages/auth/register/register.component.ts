import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../providers';
import { User } from '../../../interfaces/user-details';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  credentials : User = {
    name:'',
    email:'',
    password:''

  }

  constructor(
     private auth: AuthService ,
     private router: Router  ) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.auth.login(this.credentials.email, this.credentials.password).subscribe(
          () => {
            if (this.auth.isLoggedIn) {
              const redirect = this.auth.redirectUrl ? this.auth.redirectUrl : '/';
              this.router.navigate([redirect]);
            } else {
              //this.loginError = 'Username or password is incorrect.';
            }
          }, error => {
            console.log(error);
          });
        } , error => {
        console.log(error);
      });

    }

}
