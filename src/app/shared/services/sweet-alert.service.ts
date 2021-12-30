import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() {
  }

  showErrorAlert(message: string, title?: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Close',
      confirmButtonColor: 'orange',
      width: 400,
      // timer: 5000
    });
  }

}
