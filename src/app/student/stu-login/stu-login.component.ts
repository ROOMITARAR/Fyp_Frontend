import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitter/emitter';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-stu-login',
  templateUrl: './stu-login.component.html',
  styleUrls: ['./stu-login.component.css']
})
export class StuLoginComponent implements OnInit {
  form:FormGroup

  constructor(private fb: FormBuilder,private http:HttpClient, private router:Router,) {
  
    }
    ngOnInit(): void {
      if (Emitters.authenticated) {
        this.router.navigate(['/fundrequest']);
        return;
      }
      this.form=this.fb.group({
        email:"",
        password:"",
       })
  };

  ValidateEmail =   (email : any)=>{
    var validRegex=  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.match(validRegex)){
     return true
    }else{
     return false
    }
 }

  submit():void{
    let user=this.form.getRawValue()

    if (user.email == "" || user.password == ""  ) {
      Swal.fire({
        title: 'Empty Fields',
        text: 'Please enter both your email and password.',
        icon: 'warning'
      });
      return;
    }
    else if(!this.ValidateEmail(user.email)){
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        icon: 'warning'
      });
      return;
    }
    else {
      this.http.post(`${environment.apiUrl}/stapi/login`, user, {
        withCredentials: true
      })
      .subscribe((res) => {
        this.form.reset();
        this.router.navigate(['/fundrequest']);
        Emitters.authenticated = true;
      }, (err) => {
        Swal.fire({
          title: 'Login Failed',
          text: err.error.message || 'Invalid email or password.',
          icon: 'error'
        });
        return;
      });
    }

  }
}
  