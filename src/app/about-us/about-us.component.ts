import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  authenticated = Emitters.authenticated;

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }
}
