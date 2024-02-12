import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stu-signup',
  templateUrl: './stu-signup.component.html',
  styleUrls: ['./stu-signup.component.css']
})
export class StuSignupComponent implements OnInit {
  form: FormGroup;
  transcriptFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
      gender: '',
      cgpa: '',
      transcriptFile: null
    });
  }

  ValidateEmail = (email: any): boolean => {
    const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.match(validRegex) ? true : false;
  };

  validatePasswordLength(password: string): boolean {
    return password.length >= 4 && password.length <= 8;
  }

  validateCGPA(cgpa: string): boolean {
    const cgpaRegex = /^[0-4]\.[0-9]{1,2}$/;
    return cgpaRegex.test(cgpa);
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.transcriptFile = event.target.files[0];
    }
  }

  submit(): void {
    const user = this.form.getRawValue();
    const password: string = this.form.get('password')?.value;
    const confirmpassword: string = this.form.get('confirmpassword')?.value;

    ///////////////////////////////////////////////////////////////////////////////////////
    if (user.name == "" || user.email == "" || user.password == "" || user.confirmpassword == "" || user.gender == "" || user.cgpa == "") {
      Swal.fire("ERROR", "PLEASE ENTER ALL THE FIELDS", "error");
      return;
    }
    
    else if (!this.ValidateEmail(user.email)) {
      Swal.fire("ERROR", "PLEASE ENTER A VALID EMAIL", "error")
      return
    }
  else if(!this.validatePasswordLength(user.password)) {
    Swal.fire("ERROR", "PLEASE ENTER A VALID PASSWORD", "error");
    return;
  }

    else if (user.password != user.confirmpassword) {
      Swal.fire("ERROR", "PASSWORD DO NO MATCH", "error")
      return
    }

   else if(!this.validateCGPA(user.cgpa)){
    Swal.fire("ERROR", "PLEASE ENTER A VALID CGPA", "error")
      return
   }

    else {

      //////////////////////////////////////////////////////////////////////////////////////
      if (this.transcriptFile) {
        const formData = new FormData();
        Object.entries(user).forEach(([key, value]: [string, any]) => {
          formData.append(key, value as string | Blob);
        });
        formData.append('transcriptFile', this.transcriptFile, this.transcriptFile.name);

        this.http.post('http://localhost:8001/stapi/sregister', formData, {
          withCredentials: true,
        }).subscribe(
          () => this.router.navigate(['/fundrequest']),
          (err) => {
            Swal.fire('ERROR', err.error.message, 'error');
            return;
          }
        );
      } else {
        Swal.fire('ERROR', 'No transcript file uploaded', 'error');
        return;
      }
    }
  }
}