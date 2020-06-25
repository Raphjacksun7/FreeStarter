import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers'
import { User } from '../../../interfaces/user-details'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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

 login() {
   this.auth.login(this.credentials.email, this.credentials.password).subscribe(
     () => {
      this.auth.profile().subscribe( (data) => {
          console.log(data);
          if (this.auth.isLoggedIn) {
            const redirect = this.auth.redirectUrl ? this.auth.redirectUrl : '/';
            this.router.navigate([redirect]);
          } else {
            //this.loginError = 'Username or password is incorrect.';
          }
        }, error => {
          console.log(error);
        })
      }, error => {
       console.log(error);
     });

   }

}
