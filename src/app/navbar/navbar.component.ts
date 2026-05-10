// navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitter/emitter';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  pages: string[] = ['Home', 'Students', 'Donors', 'Contact Us', 'About Us', 'Donate Now', 'Fund Request' ];

  authenticated = false;
  menuOpen = false;



  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.http.get(`${environment.apiUrl}/stapi/user`, { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.authenticated = true;
          Emitters.authenticated = true;
        },
        (err) => {
          this.checkApiUser();
        }
      );
  }

  checkApiUser(): void {
    this.http.get(`${environment.apiUrl}/api/user`, { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.authenticated = true;
          Emitters.authenticated = true;
        },
        (err) => {
          this.checkAdApiUser();
        }
      );
  }

  checkAdApiUser(): void {
    this.http.get(`${environment.apiUrl}/adapi/aduser`, { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.authenticated = true;
          Emitters.authenticated = true;
        },
        (err) => {
          this.authenticated = false;
          Emitters.authenticated = false;
        }
      );
  }


  logout(): void {
    console.log('Before Logout:', this.authenticated);
    this.http.post(`${environment.apiUrl}/api/logout`, {}, { withCredentials: true })
      .subscribe(() => {
        this.authenticated = false;
        Emitters.authenticated = false;
        console.log('After Logout (api):', this.authenticated);
      });
   
    this.http.post(`${environment.apiUrl}/stapi/logout`, {}, { withCredentials: true })
      .subscribe(() => {
        this.authenticated = false;
        Emitters.authenticated = false;
        console.log('After Logout (stapi):', this.authenticated);
      });
      
      this.http.post(`${environment.apiUrl}/adapi/adlogout`, {}, { withCredentials: true })
      .subscribe(() => {
        this.authenticated = false;
        Emitters.authenticated = false;
        console.log('After Logout (adapi):', this.authenticated);
      });
  }
  getRouteLink(page: string): string {
    if (page === 'Fund Request') {
      return '/fundrequest';
    }
    return '/' + page.toLowerCase().replace(' ', '-');
  }

  isActive(page: string): boolean {
    return this.router.isActive(this.getRouteLink(page), true);
  }

}

  