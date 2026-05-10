import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { Emitters } from 'src/app/emitter/emitter';

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
    if (Emitters.authenticated) {
      this.router.navigate(['/fundrequest']);
      return;
    }
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
    return password.length >= 8;
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

    if (user.name == "" || user.email == "" || user.password == "" || user.confirmpassword == "" || user.gender == "" || user.cgpa == "") {
      Swal.fire("ERROR", "PLEASE ENTER ALL THE FIELDS", "error");
      return;
    }
    else if (!this.ValidateEmail(user.email)) {
      Swal.fire("ERROR", "PLEASE ENTER A VALID EMAIL", "error");
      return;
    }
    else if (!this.validatePasswordLength(user.password)) {
      Swal.fire("ERROR", "PASSWORD MUST BE AT LEAST 8 CHARACTERS", "error");
      return;
    }
    else if (user.password != user.confirmpassword) {
      Swal.fire("ERROR", "PASSWORDS DO NOT MATCH", "error");
      return;
    }
    else if (!this.validateCGPA(user.cgpa)) {
      Swal.fire("ERROR", "PLEASE ENTER A VALID CGPA (e.g. 3.50)", "error");
      return;
    }
    else if (!this.transcriptFile) {
      Swal.fire('ERROR', 'Please upload your transcript file', 'error');
      return;
    }
    else {
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('gender', user.gender);
      formData.append('cgpa', user.cgpa);
      formData.append('transcriptFile', this.transcriptFile);

      this.http.post(`${environment.apiUrl}/stapi/sregister`, formData, {
        withCredentials: true,
      }).subscribe(
        () => {
          this.form.reset();
          this.router.navigate(['/fundrequest']);
          Emitters.authenticated = true;
        },
        (err) => Swal.fire('ERROR', err.error.message, 'error')
      );
    }
  }
}