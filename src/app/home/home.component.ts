// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitter/emitter';
import { UserService } from 'src/app/shared/user.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message = "";

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    // this.http.get(`${environment.apiUrl}/stapi/user`, { withCredentials: true })
    //   .subscribe(
    //     (res: any) => {
    //       this.message = `Hi ${res.name}`;
    //       Emitters.authEmitter.emit(true);
    //       this.userService.setUserName(res.name);
    //     },
    //     (err) => {
    //       this.message = "YOU ARE NOT LOGGED IN";
    //       Emitters.authEmitter.emit(false);
    //     }
    //   );

    // // Another API call
    // this.http.get(`${environment.apiUrl}/api/user`, { withCredentials: true })
    //   .subscribe(
    //     (res: any) => {
    //       this.message = `Hi ${res.name}`;
    //       Emitters.authEmitter.emit(true);
    //       this.userService.setUserName(res.name);
    //     },
    //     (err) => {
    //       this.message = "YOU ARE NOT LOGGED IN";
    //       Emitters.authEmitter.emit(false);
    //     }
    //   );

    //   this.http.get(`${environment.apiUrl}/adapi/aduser`, { withCredentials: true })
    //   .subscribe(
    //     (res: any) => {
    //       this.message = `Hi ${res.name}`;
    //       Emitters.authEmitter.emit(true);
    //       this.userService.setUserName(res.name);
    //     },
    //     (err) => {
    //       this.message = "YOU ARE NOT LOGGED IN";
    //       Emitters.authEmitter.emit(false);
    //     }
    //   );
  }
}
