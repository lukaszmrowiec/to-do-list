import { Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { MatSortModule } from "@angular/material/sort";
import { ToDoListService } from "./to-do-list.service";
import { FormControl } from "@angular/forms";
import { MatPaginatorIntlCro } from "../matPaginatorIntlCroClass";

@Component({
  selector: "app-to-do-list",
  templateUrl: "./to-do-list.component.html",
  styleUrls: ["./to-do-list.component.css"],
  providers: [ToDoListService, MatPaginatorIntlCro]
})
export class ToDoListComponent implements OnInit {
  toDoListArray: any[];
  // displayedColumns = ["name"];
  displayedColumns = ["name", "priority", "date", "delete"];
  dataSource;
  taskId: number = 0;
  importanceLlevel: string = "Normal";
  appTitle: string = "To Do List";
  taskPlaceholder: string = "Enter task...";
  searchPlaceholder: string = "Search";
  show: string = "Show";
  columShow: string = "Show columns";
  hide: string = "Hide";
  columHide: string = "Hide columns";
  columNameTitle: string = "Task name";
  columPriorityTitle: string = "Priority";
  columPriorityTitleValue: string = "Normal";
  columPriorityTitleValue1: string = "Normal";
  columPriorityTitleValue2: string = "High";
  columDateTitle: string = "Date";
  paginatorItemsPerPage: string;
  value = ' ';

  constructor(
    private todoListService: ToDoListService,
    private matPaginatorIntlCro: MatPaginatorIntlCro
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.todoListService
      .getToDoList()
      .snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x["$key"] = element.key;
          this.toDoListArray.push(x);
        });
        this.getFireData();
      });
  }

  showColumns() {
    this.displayedColumns = ["name", "priority", "date", "delete"];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getFireData();
    // this.columns = true;
    // return this.displayedColumns = ["name", "priority", "date", "delete"];
  }

  hideColumns() {
    this.displayedColumns = ["name"];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.columns = false;
  }

  getFireData() {
    this.dataSource = new MatTableDataSource(this.toDoListArray);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    return this.dataSource;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addTask(task) {
    if (task.value.length > 0) {
      console.log(task.value);
      this.taskId++;
      this.todoListService.addTask(
        task.value,
        this.taskId,
        this.importanceLlevel
      );
      task.value = null;
      this.dataSource.paginator = this.paginator;
    }
  }

  changeLangVerToPl() {
    this.appTitle = "Lista zadań";
    this.taskPlaceholder = "Wpisz zadanie...";
    this.searchPlaceholder = "Szukaj...";
    this.show = "Pokaż";
    this.columShow = "Pokaż kolumny";
    this.hide = "Ukryj";
    this.columHide = "Ukryj kolumny";
    this.columNameTitle = "Nazwa zadania";
    this.columPriorityTitle = "Priorytet";
    this.columPriorityTitleValue1 = "Normalny`";
    this.columPriorityTitleValue2 = "Wysoki";
    this.columDateTitle = "Data";
    // this.paginatorItemsPerPage = this.matPaginatorIntlCro.labelPl();
    this.dataSource.paginator = this.paginator;
  }

  changeLangVerToEn() {
    this.appTitle = "To Do List";
    this.taskPlaceholder = "Enter task...";
    this.searchPlaceholder = "Search...";
    this.show = "Show";
    this.columShow = "Show columns";
    this.hide = "Hide";
    this.columHide = "Hide columns";
    this.columNameTitle = "Task name";
    this.columPriorityTitle = "Priority";
    this.columPriorityTitleValue1 = "Normal";
    this.columPriorityTitleValue2 = "High";
    this.columDateTitle = "Date";
    // this.paginatorItemsPerPage = "Items par page:";
    this.dataSource.paginator = this.paginator;
  }

  priorityUdate($key: string, option: string) {
    console.log(option);
    this.todoListService.updateItem($key, { priority: option });
  }

  deletingTask($key: string) {
    this.todoListService.removeTask($key);
  }
}
