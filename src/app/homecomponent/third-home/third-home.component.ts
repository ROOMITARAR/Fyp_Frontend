import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-third-home',
  templateUrl: './third-home.component.html',
  styleUrls: ['./third-home.component.css']
})
export class ThirdHomeComponent implements OnInit {
  authenticated = Emitters.authenticated;

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }
}
