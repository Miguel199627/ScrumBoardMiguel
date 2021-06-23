import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginData: any;
  public errorMessage: String;

  constructor(private auth: AuthService, private router: Router) {
    this.loginData = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {}

  login() {
    if (!this.loginData.email || !this.loginData.password) {
      console.log('Failed process: Incomplete data');
      this.errorMessage = 'Failed process: Incomplete data';
      this.closeAlert();
      this.loginData = {};
    } else {
      this.auth.login(this.loginData).subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('token', res.jwtToken);
          this.router.navigate(['/listTask']);
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert();
          this.loginData = {};
        }
      );
    }
  }

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  closeX() {
    this.errorMessage = '';
  }
}
