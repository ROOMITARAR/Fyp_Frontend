import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Component({
  selector:'app-fundrequest',
  templateUrl:'./fundrequest.component.html',
  styleUrls: ['./fundrequest.component.css']
})
export class FundrequestComponent implements OnInit {
  studentEmail = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get(`${environment.apiUrl}/stapi/user`, { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.studentEmail = res.email;
        },
        () => {
          // Not logged in or admin/donor
        }
      );
  }
  submitForm(form: NgForm) {
    const { email, fundraisingOption, fundraisingAmount, fundraisingRequest } = form.value;
    if(fundraisingAmount<=0){
      Swal.fire("ERROR", "Please enter a correct amount greater than 0.", "error");
    }
    else{
    this.httpClient.post(`${environment.apiUrl}/fundrequestapi/fundrequest`, {
      email: email,
      identity: fundraisingOption === 'yes' ? true : false,
      amount: fundraisingAmount,
      whyneed: fundraisingRequest
    }, { withCredentials: true }).subscribe(
      (response) => {
        console.log('API Response:', response);
        Swal.fire("Success!", "Request submitted successfully. Status update via email soon.", "success");
      },
      (error) => {
        console.error('API Error:', error);
        Swal.fire('ERROR', error.error?.message || 'Failed to submit request. Please ensure you use a student registered email.', 'error');
      }
    );
    form.resetForm();
  }
}
}