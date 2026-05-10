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
      Swal.fire({
        title: 'Empty Fields',
        text: 'Please fill out all the fields to register.',
        icon: 'warning'
      });
      return;
    }
    else if (!this.ValidateEmail(user.email)) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        icon: 'warning'
      });
      return;
    }
    else if (!this.validatePasswordLength(user.password)) {
      Swal.fire({
        title: 'Weak Password',
        text: 'Your password must be at least 8 characters long.',
        icon: 'warning'
      });
      return;
    }
    else if (user.password != user.confirmpassword) {
      Swal.fire({
        title: 'Password Mismatch',
        text: 'Confirm password does not match your password.',
        icon: 'warning'
      });
      return;
    }
    else if (!this.validateCGPA(user.cgpa)) {
      Swal.fire({
        title: 'Invalid CGPA',
        text: 'Please enter a valid CGPA format (e.g. 3.50).',
        icon: 'warning'
      });
      return;
    }
    else if (!this.transcriptFile) {
      Swal.fire({
        title: 'No Transcript',
        text: 'Please upload your official transcript file.',
        icon: 'warning'
      });
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
          Swal.fire({
            title: 'Welcome to StuCare!',
            text: 'Your student account has been successfully created.',
            icon: 'success'
          });
        },
        (err) => {
          Swal.fire({
            title: 'Registration Failed',
            text: err.error.message || 'An error occurred during registration.',
            icon: 'error'
          });
        }
      );
    }
  }
}