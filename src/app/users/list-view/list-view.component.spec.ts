import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewComponent } from './list-view.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SharedModule} from "../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {UsersService} from "../services/users.service";
import {mockData} from "../services/mock-data";

export class UserServiceMock {

  getRequiredColumns() {
    return of(mockData.users);
  }
}

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListViewComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        {
          provide: UsersService,
          useClass: UserServiceMock,
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ListViewComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the filters (when filters have been selected already) after reset button clicked', () => {
    const reassignBtn = fixture.nativeElement.querySelector('#resetFilterBtn');
    spyOn(component, 'resetFilters').and.callThrough();
    reassignBtn.click();
    expect(component.resetFilters).toHaveBeenCalled();
  });

  it('should call onTableScroll() when scrolling through the table items', () => {
    const table = fixture.nativeElement.querySelector('#table');

    spyOn(component, 'onTableScroll').and.callThrough();

    table.dispatchEvent(new Event('scroll'));

    expect(component.onTableScroll).toHaveBeenCalled();
  });

  it('should make a call to createFilter() and return a boolean for the filter predicate', () => {
    const fixture = TestBed.createComponent(ListViewComponent);
    const app = fixture.debugElement.componentInstance;

    const filterFxn =  app.createFilter();

    let item = {
      gender: 'male',
    }
    expect(filterFxn(mockData.users.results,  JSON.stringify(item))).toBeTruthy();
  });

  it('should call filterChange() when filtering column items', () => {
    const selectBtn = fixture.nativeElement.querySelector('#select-filter-btn');

    spyOn(component, 'filterChange').and.callThrough();

    selectBtn.dispatchEvent(new Event('change'));

    expect(component.filterChange).toHaveBeenCalled();
  });
});
