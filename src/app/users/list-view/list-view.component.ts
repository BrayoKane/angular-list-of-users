import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {UsersService} from "../services/users.service";
import {ICustomColumn, IFilterObj, IUser} from "../interfaces/User";
import * as JsonToXML from "js2xmlparser";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {SweetAlertService} from "../../shared/services/sweet-alert.service";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'gender', 'location', 'email', 'age', 'registered', 'phone', 'picture'];
  columnShowHideList: ICustomColumn[] = [];

  userData: IUser[] = [];

  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true})
  sort!: MatSort;
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;
  isLoading!: boolean;
  items!: string[];
  filterSelectObj: IFilterObj[] = [];
  filterValues = {};
  userXML!: string;
  fileUrl!: SafeResourceUrl;

  constructor(private _usersService: UsersService, private sanitizer: DomSanitizer,
              private _sweetAlertService: SweetAlertService) {
    // Object to create Filter for
    this.filterSelectObj = [
      {
        name: 'GENDER',
        columnProp: 'gender',
        options: []
      }, {
        name: 'NATIONALITY',
        columnProp: 'nat',
        options: []
      }
    ]
  }

  ngOnInit(): void {
    this.initializeColumnProperties();

    this.populateTable();
    // Override default filter behaviour of Material Datatable
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  populateTable() {
    this.isLoading = true;
    this._usersService.getRequiredColumns().subscribe((res: any) => {
      this.isLoading = false;
      this.userData = res['results']
      this.dataSource.data = this.userData;

      this.userXML = JsonToXML.parse("user", res);

      this.filterSelectObj.filter((o: any) => {
        o['options'] = this.getFilterObject(this.userData, o.columnProp);
      });
    }, (err: Error) => {
      this._sweetAlertService.showErrorAlert(err.message);
    });
  }

  exportToXML() {
    const fileToExport = new Blob([this.userXML], {type: "text/xml"});
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(fileToExport));
  }

  // Get Unique values from columns to build filter
  getFilterObject(fullObj: any[], key: string) {
    const uniqChk: string[] = [];
    let uniqueVals: string[] = [];
    fullObj.filter((obj: { [x: string]: any; }) => {
      uniqChk.push(obj[key])
      uniqueVals = [...new Set(uniqChk)];
    });
    return uniqueVals;
  }

  toggleColumn(column: { isActive: boolean; position: number; name: string; }) {
    if (column.isActive) {
      if (column.position > this.displayedColumns.length - 1) {
        this.displayedColumns.push(column.name);
      } else {
        this.displayedColumns.splice(column.position, 0, column.name);
      }
    } else {
      let i = this.displayedColumns.indexOf(column.name);
      let opr = i > -1 ? this.displayedColumns.splice(i, 1) : undefined;
    }
  }

  initializeColumnProperties() {
    this.displayedColumns.forEach((element, index) => {
      this.columnShowHideList.push(
        {position: index, name: element, isActive: true}
      );
    });
  }

  onTableScroll($event: any) {
    const tableViewHeight = $event.target.offsetHeight // viewport: ~500px
    const tableScrollHeight = $event.target.scrollHeight // length of all table
    const scrollLocation = $event.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      this.dataSource.data = this.dataSource.data.concat(this.userData);
    }
  }

  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

  // Called on Filter change
  filterChange(filter: any, $event: any) {
    // @ts-ignore
    this.filterValues[filter.columnProp] = $event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    return function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col] + '' !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach((word: string) => {
              if (data[col] + '' .toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
  }
}
