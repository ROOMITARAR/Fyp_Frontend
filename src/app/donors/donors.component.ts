import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css']
})
export class DonorsComponent  implements OnInit {
  users: any[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);  // Log the data or update your component accordingly
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  generateAvatarUrl(email: string): string {
    // Use crypto-js to generate MD5 hash
    const hashedEmail = CryptoJS.MD5(email.trim().toLowerCase()).toString(CryptoJS.enc.Hex);
    return `https://www.gravatar.com/avatar/${hashedEmail}?d=mp`;
  }
}
