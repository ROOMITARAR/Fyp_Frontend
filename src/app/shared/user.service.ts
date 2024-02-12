// // user.service.ts
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private userName: string = "";

//   setUserName(name: string) {
//     this.userName = name;
//   }

//   getUserName(): string {
//     return this.userName;
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8001/api';  // Adjust the URL based on your server configuration

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allUsers`);
  }
}
