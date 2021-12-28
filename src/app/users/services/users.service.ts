import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURI = `https://randomuser.me/api/`;

  // Retrieve Name, Gender, Location, E-mail, DOB, Registration, Phone No. & Picture info
  private _getRequiredColumns = this.baseURI + '?inc=name,gender,location,email,dob,registered,phone,picture&results=200';

  // Filter Nationality
  private _queryNationality = this.baseURI + '?results=200&nat=';

  constructor(private _http: HttpClient) {
  }

  getRequiredColumns(): any {
    return this._http.get(this._getRequiredColumns);
  }

  queryNationality(search: string): any {
    return this._http.get(this._queryNationality + search);
  }

}
