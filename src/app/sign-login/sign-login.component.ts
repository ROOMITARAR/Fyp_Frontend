import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-sign-login',
  templateUrl: './sign-login.component.html',
  styleUrls: ['./sign-login.component.css']
})
export class SignLoginComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (Emitters.authenticated) {
      this.router.navigate(['/home']);
    }
  }
}
