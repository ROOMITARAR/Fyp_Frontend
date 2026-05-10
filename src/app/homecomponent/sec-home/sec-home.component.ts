import { Component } from '@angular/core';

@Component({
  selector: 'app-sec-home',
  templateUrl: './sec-home.component.html',
  styleUrls: ['./sec-home.component.css']
})
export class SecHomeComponent {
  showHowWeWorkContent: boolean = false;

  showHowWeWork() {
    this.showHowWeWorkContent = true;
  }
  showIntroduction() {
    this.showHowWeWorkContent = false;
  }

}
