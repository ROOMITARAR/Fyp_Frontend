import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,  } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { Emitters } from 'src/app/emitter/emitter';


@Component({
  selector: 'app-do-signup',
  templateUrl: './do-signup.component.html',
  styleUrls: ['./do-signup.component.css']
})
export class DoSignupComponent implements OnInit {

  form:FormGroup

  constructor(private fb: FormBuilder,private http:HttpClient, private router:Router,) {
  
    };
    
   ngOnInit():void{
      if (Emitters.authenticated) {
        this.router.navigate(['/home']);
        return;
      }
      this.form=this.fb.group({
        name:"",
        email:"",
        password:"",
        confirmpassword:"",
          })

   }

  ValidateEmail =   (email : any)=>{
     var validRegex=  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(email.match(validRegex)){
      return true
     }else{
      return false
     }
  }

  validatePasswordLength(password: string): boolean {
    return password.length >= 8;
  }
   
   
   submit():void {
    let user=this.form.getRawValue()
    const password = this.form.get('password')?.value;
    const confirmpassword = this.form.get('confirm-password')?.value;
    
    

   
    if (user.name == "" || user.email == "" || user.password == "" || user.confirmpassword=="" ) {
      Swal.fire({
        title: 'Empty Fields',
        text: 'Please fill out all the fields to register.',
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
    else if(!this.validatePasswordLength(user.password)) {
      Swal.fire({
        title: 'Weak Password',
        text: 'Your password must be at least 8 characters long.',
        icon: 'warning'
      });
      return;
    }
    else if(user.password != user.confirmpassword){
      Swal.fire({
        title: 'Password Mismatch',
        text: 'Confirm password does not match your password.',
        icon: 'warning'
      });
      return;
    }
    else {
      this.http.post(`${environment.apiUrl}/api/register`, user, {
        withCredentials: true
      })
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(['/home']);
        Emitters.authenticated = true;
        Swal.fire({
          title: 'Welcome to StuCare!',
          text: 'Your donor account has been successfully created.',
          icon: 'success'
        });
      }, (err) => {
        Swal.fire({
          title: 'Registration Failed',
          text: err.error.message || 'An error occurred during registration.',
          icon: 'error'
        });
        return;
      });
    }
    }

    
  }




