import {getTestBed, TestBed} from '@angular/core/testing';

import { UsersService } from './users.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {mockData} from "./mock-data";

describe('UsersService', () => {
  let service: UsersService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UsersService);

    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRequiredColumns() should return list of users with relevant columns', () => {
    service.getRequiredColumns().subscribe((res: any) => {
      expect(res).toEqual(mockData.users);
    });

    const url = service._getRequiredColumns;

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockData.users);
  });
});
