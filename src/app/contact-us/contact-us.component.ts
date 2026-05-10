import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  onSubmit(event: Event): void {
    event.preventDefault();
    Swal.fire({
      title: 'Success!',
      text: 'Your message has been sent successfully. We will get back to you shortly.',
      icon: 'success',
      confirmButtonColor: '#d4af37'
    });
  }
}
