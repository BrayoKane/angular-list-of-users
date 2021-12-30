import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURI = `https://randomuser.me/api/`;

  // Retrieve Name, Gender, Location, Nationality, E-mail, DOB, Registration, Phone No. & Picture info
  public _getRequiredColumns = this.baseURI + '?inc=name,gender,location,nat,email,dob,registered,phone,picture&results=100';

  constructor(private _http: HttpClient) {
  }

  getRequiredColumns(): any {
    return this._http.get(this._getRequiredColumns);
  }

}
