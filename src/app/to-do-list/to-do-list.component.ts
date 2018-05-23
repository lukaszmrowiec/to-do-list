import { Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { MatSortModule } from "@angular/material/sort";
import { ToDoListService } from './to-do-list.service';

@Component({
  selector: "app-to-do-list",
  templateUrl: "./to-do-list.component.html",
  styleUrls: ["./to-do-list.component.css"],
  providers: [ToDoListService]
})
export class ToDoListComponent implements OnInit {
  toDoListArray: any[];
  displayedColumns = ["name", "delete"];
   dataSource = new MatTableDataSource(this.toDoListArray);
  importanceLevels = [
    {value: 'Normal'},
    {value: 'High'},
  ];

  constructor (private todoListService: ToDoListService ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.todoListService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.toDoListArray.push(x);
      });
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addTask(task) {
    console.log(this.toDoListArray[0]);
    this.todoListService.addTask(task.value);
    task.value = null;
    this.dataSource.paginator = this.paginator;
  }

  // deleteTask(){

  // }
}

export interface Task {
  id: number;
  name: string;
  date: Date
}

let tasks: Task[] = [];
