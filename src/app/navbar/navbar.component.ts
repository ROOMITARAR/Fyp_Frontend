// navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitter/emitter';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  pages: string[] = ['Home', 'Students', 'Donors', 'Contact Us', 'About Us', 'Donate Now', 'Fundrequest' ];

  authenticated = false;
 


  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.http.get('http://localhost:8001/stapi/user', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.authenticated = true;
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          this.checkApiUser();
        }
      );
  }

  checkApiUser(): void {
    this.http.get('http://localhost:8001/api/user', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.authenticated = true;
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          this.checkAdApiUser();
        }
      );
  }

  checkAdApiUser(): void {
    this.http.get('http://localhost:8001/adapi/aduser', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.authenticated = true;
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          this.authenticated = false;
          Emitters.authEmitter.emit(false);
        }
      );
  }


  logout(): void {
    console.log('Before Logout:', this.authenticated);
    this.http.post('http://localhost:8001/api/logout', {}, { withCredentials: true })
      .subscribe(() => {
        this.authenticated = false;
        Emitters.authEmitter.emit(false);
        console.log('After Logout (api):', this.authenticated);
      });
   
    this.http.post('http://localhost:8001/stapi/logout', {}, { withCredentials: true })
      .subscribe(() => {
        this.authenticated = false;
        Emitters.authEmitter.emit(false);
        console.log('After Logout (stapi):', this.authenticated);
      });
      
      this.http.post('http://localhost:8001/adapi/adlogout', {}, { withCredentials: true })
      .subscribe(() => {
        this.authenticated = false;
        Emitters.authEmitter.emit(false);
        console.log('After Logout (adapi):', this.authenticated);
      });
  }
  isActive(page: string): boolean {
    return this.router.isActive(`/${page.toLowerCase().replace(' ', '-')}`, true);
  }

}

  