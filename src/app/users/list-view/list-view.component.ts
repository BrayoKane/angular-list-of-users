import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {UsersService} from "../services/users.service";
import {debounceTime, distinctUntilChanged, filter, fromEvent} from "rxjs";
import {map} from "rxjs/operators";
import {ICustomColumn, IUser} from "../interfaces/User";

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

  constructor(private _usersService: UsersService) {
  }

  ngOnInit(): void {
    this.initializeColumnProperties();
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        // if character length greater then 2
        filter(res => res.length > 1),

        // Time in milliseconds between key events
        debounceTime(3000),

        // If previous query is different from current
        distinctUntilChanged()

        // subscription for response
      ).subscribe((search: string) => {
      this.fetchItems(search);
    });

    this.populateTable();
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
    }, (err: any) => {
      console.log(err);
    });
  }

  private fetchItems(searchInput: string) {
    this.isLoading = true;
    this._usersService.queryNationality(searchInput).subscribe((res: any) => {
        this.userData = res['results']
        this.dataSource.data = this.userData;
        this.isLoading = false;
      },
      (err: any) => {
        console.log(err);
        this.isLoading = false;
      })
  }

  exportToCSV() {

  }

  exportToXML() {

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
}
