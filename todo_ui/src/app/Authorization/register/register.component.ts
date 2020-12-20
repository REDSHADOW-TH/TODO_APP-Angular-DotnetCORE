import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  ngOnInit(): void {
  }

  register(): void {
    if (this.username !== '' && this.password !== '' && this.confirmPassword !== '') {
      if (this.password !== this.confirmPassword) {
        Swal.fire({
          icon: 'warning', title: 'Warning', text: 'Passwords do not match.', heightAuto: false
        })
        return;
      }
      this.auth.register(this.username, this.password)
      .subscribe((r: any) => {
        if (r.status === 200) {
          Swal.fire({
            icon: 'success', title: 'Register Success', text: 'You can lonin now.', heightAuto: false
          })
          this.router.navigate(['/main']);
        } else if (r.status < 500) {
          Swal.fire({
            icon: 'warning', title: 'Warning', text: r.message, heightAuto: false
          })
        } else {
          Swal.fire({
            icon: 'error', title: 'Register Fail', text: 'Server error', heightAuto: false
          })
        }
      });
    }
  }

  goLogin(): void {
    this.router.navigate(['/login']);
  }

}
