import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitter/emitter';
import Swal from 'sweetalert2';

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
      Swal.fire("ERROR", "PLEASE ENTER ALL THE FIELDS", "error");
      return;
    }
    else if(!this.ValidateEmail(user.email)){
      Swal.fire("ERROR","PLEASE ENTER A VALID EMAIL","error")
      return
   }
   else{

    this.http.post("http://localhost:8001/stapi/login",user,{
      withCredentials:true
    })
    .subscribe((res)=>{ 
      this.router.navigate(['/fundrequest']);
      Emitters.authEmitter.emit(true);
    },(err) =>{
      Swal.fire("ERROR",err.error.message,"error")
      return
    })

   }

  }
}
  