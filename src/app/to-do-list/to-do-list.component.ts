import { Component, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { MatSortModule } from "@angular/material/sort";


@Component({
  selector: "app-to-do-list",
  templateUrl: "./to-do-list.component.html",
  styleUrls: ["./to-do-list.component.css"]
})
export class ToDoListComponent {
  // displayedColumns = ["position", "name", "weight", "symbol"];
  displayedColumns = ["id","name", "date", "delete"];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource(tasks);
  importanceLevels = [
    {value: 'Normal'},
    {value: 'High'},
  ];
  // today: Date;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addTask(e) {
    tasks.push({
      id: tasks.length + 1,
      name: e.value,
      date: new Date()
    });
    e.value = null;
    this.dataSource.paginator = this.paginator;
  }
}

export interface Task {
  id: number;
  name: string;
  date: Date
}

let tasks: Task[] = [];
