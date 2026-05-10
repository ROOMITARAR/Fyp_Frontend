import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-donate-now',
  templateUrl: './donate-now.component.html',
  styleUrls: ['./donate-now.component.css']
})
export class DonateNowComponent implements OnInit {
  authenticated = Emitters.authenticated;

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }
}
