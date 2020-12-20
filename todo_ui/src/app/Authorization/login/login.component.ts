import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

    username: string = '';
    password: string = ''; 

  ngOnInit(): void {
  }

  login(): void {
    if (this.username !== '' && this.password !== '') {
      this.auth.login(this.username, this.password)
      .subscribe((r: any) => {
        if (r.status === 200) {
          this.auth.setLoginState(true, this.username);
          this.router.navigate(['/main']);
        } else {
          Swal.fire({
            icon: 'warning', title: 'Login Fail', text: 'Username or password is wrong.', heightAuto: false
          })
        }
      });
    }
  }

  goRegister(): void {
    this.router.navigate(['/register']);
  }

}
