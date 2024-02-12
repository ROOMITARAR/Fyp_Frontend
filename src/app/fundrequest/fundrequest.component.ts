// fundrequest.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector:'app-fundrequest',
  templateUrl:'./fundrequest.component.html',
  styleUrls: ['./fundrequest.component.css']
})
export class FundrequestComponent {

  constructor(private httpClient: HttpClient) {}
  submitForm(form: NgForm) {
    const { email, fundraisingOption, fundraisingAmount, fundraisingRequest } = form.value;
    if(fundraisingAmount<=0){
      Swal.fire("ERROR,PLEASE ENTER THE CORRECT AMOUNT")
    }
    else{
    this.httpClient.post("http://localhost:8001/fundrequestapi/fundrequest", {
      email: email,
      identity: fundraisingOption === 'yes' ? true : false,
      amount: fundraisingAmount,
      whyneed: fundraisingRequest
    }).subscribe(
      (response) => {
        console.log('API Response:', response);
        Swal.fire("Request submitted successfully. Status update via email soon.");
      },
      (error) => {
        console.error('API Error:', error);
        Swal.fire('PLEASE ENTER A STUDENT REGISTERED EMAIL', error.error.message, 'error');
      }
    );
    form.resetForm();
  }
}
}