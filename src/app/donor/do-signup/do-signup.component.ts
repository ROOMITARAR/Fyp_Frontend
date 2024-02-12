import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,  } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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
    return password.length >= 4 && password.length <= 8;
  }
   
   
   submit():void {
    let user=this.form.getRawValue()
    console.log(user)
    const password = this.form.get('password')?.value;
    const confirmpassword = this.form.get('confirm-password')?.value;
    
    

   
  if (user.name == "" || user.email == "" || user.password == "" || user.confirmpassword=="" ) {
    Swal.fire("ERROR", "PLEASE ENTER ALL THE FIELDS", "error");
    return;
  }

    else if(!this.ValidateEmail(user.email)){
       Swal.fire("ERROR","PLEASE ENTER A VALID EMAIL","error")
       return
    }
    
    else if(!this.validatePasswordLength(user.password)) {
      Swal.fire("ERROR", "PLEASE ENTER A VALID PASSWORD", "error");
      return;
    }

   else if(user.password != user.confirmpassword){
       Swal.fire("ERROR","PLEASE ENTER A VALID PASSWORD","error")
       return
   }
    else{
      this.http.post("http://localhost:8001/api/register",user,{
        withCredentials:true
      })
      .subscribe(()=> this.router.navigate(['/home']),(err) =>{
        Swal.fire("ERROR",err.error.message,"error")
        return
      })
    }
    }

    
  }




