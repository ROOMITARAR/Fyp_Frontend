import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  authenticated = Emitters.authenticated;

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }
}
