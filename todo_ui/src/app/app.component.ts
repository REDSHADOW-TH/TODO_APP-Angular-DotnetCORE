import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TestService } from './Services/test.service';
import { TestModel } from './Models/TestModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    private test: TestService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.auth.isLogin()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/main']);
    }
  }

  ngAfterViewInit(): void {
    //this.testApi();
  }

  testApi(): void {
    setTimeout(() => {
      this.test.test()
        .subscribe((s: TestModel) => {
          if (s.status === 200) {
            Swal.fire({
              icon: 'success', title: 'Welcome', text: s.message
            });
          }
        }, () => {
          Swal.fire({
            icon: 'error', title: 'Error', text: 'Can not connect api.'
          });
        });
    }, 300);
  }

  title = 'todo-ui';
}
