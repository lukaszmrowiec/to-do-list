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
  toDoTaks: any[];
  doneTasks: any[];
  // displayedColumns = ["name"];
  displayedColumns = ["checkBox", "name", "isChecked", "priority", "date", "delete"];
  dataSource;
  taskId: number = 0;
  importanceLlevel: string = "Normal";
  value = "";
  lang: string = "Language";
  options: string = "Options";
  cols: string = "Columns";
  appTitle: string = "To Do List";
  taskPlaceholder: string = "Enter task...";
  searchPlaceholder: string = "Search...";
  all: string = "All";
  toDo: string = "Do do";
  done: string = "Done";
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
  langVer: string = "eng";
  taskPriority: string;
  tasksNumber: number;
  todoTasksNumber: number;
  doneTasksNumber: number;

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
        this.showToDoTasks();
        this.showDoneTasks();
        this.getFireData();
        this.tasksNumber = this.toDoListArray.length;
      });
  }

  showColumns() {
    this.displayedColumns = ["checkBox", "name", "isChecked", "priority", "date", "delete"];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getFireData();
    // this.columns = true;
    // return this.displayedColumns = ["name", "priority", "date", "delete"];
  }

  showToDoTasks() {
    this.toDoTaks = [];
    for(let i =0; i < this.toDoListArray.length; i++) {
      if(!this.toDoListArray[i].isChecked) {
        this.toDoTaks.push(this.toDoListArray[i]);
      }
    }
    this.dataSource = this.toDoTaks;
    this.todoTasksNumber = this.toDoTaks.length;
    console.log(this.toDoTaks.length);
  }

  showDoneTasks() {
    this.doneTasks = [];
    for(let i =0; i < this.toDoListArray.length; i++) {
      if(this.toDoListArray[i].isChecked) {
        this.doneTasks.push(this.toDoListArray[i]);
      }
    }
    this.dataSource = this.doneTasks;
    this.doneTasksNumber = this.doneTasks.length;
    console.log(this.doneTasks.length);
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
    this.lang = "Język";
    this.options = "Opcje";
    this.cols = "Kolumny";
    this.appTitle = "Lista zadań";
    this.taskPlaceholder = "Wpisz zadanie...";
    this.searchPlaceholder = "Szukaj...";
    this.all = "Wszystkie";
    this.toDo = "Do zrobienia";
    this.done = "Zrobione";
    this.show = "Pokaż";
    this.columShow = "Pokaż kolumny";
    this.hide = "Ukryj";
    this.columHide = "Ukryj kolumny";
    this.columNameTitle = "Nazwa zadania";
    this.columPriorityTitle = "Priorytet";
    this.columPriorityTitleValue1 = "Normalny";
    this.columPriorityTitleValue2 = "Wysoki";
    this.columDateTitle = "Data";
    // this.paginatorItemsPerPage = this.matPaginatorIntlCro.labelPl();
    this.langVer = "pl";
    this.replaceImportanceLlevelLang();
  }

  changeLangVerToEn() {
    this.appTitle = "To Do List";
    this.lang = "Language";
    this.options = "Options";
    this.cols = "Columns";
    this.taskPlaceholder = "Enter task...";
    this.searchPlaceholder = "Search...";
    this.all = "All";
    this.toDo = "To do";
    this.done = "Done";
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
    this.langVer = "eng";
    this.replaceImportanceLlevelLang();
  }

  changeStatus($key: string, isChecked) {
    console.log(isChecked);
    this.todoListService.checkOrUnChecked($key, !isChecked);
  }

  priorityUdate($key: string, option: string) {
    console.log(option);
    this.todoListService.updateItem($key, { priority: option });
  }

  deletingTask($key: string) {
    this.todoListService.removeTask($key);
  }

  replaceImportanceLlevelLang() {
    this.toDoListArray.forEach((item, index) => {

      if (this.langVer === "pl" && this.toDoListArray[index].priority === "Normalny") {
      } else if (this.langVer === "pl" && this.toDoListArray[index].priority === "Wysoki") {
      } else if (this.langVer === "pl" && this.toDoListArray[index].priority === "Normal") {
        this.toDoListArray[index].priority = "Normalny";
      } else if (this.langVer === "pl" && this.toDoListArray[index].priority === "High") {
        this.toDoListArray[index].priority = "Wysoki";
      } else if (this.langVer === "eng" && this.toDoListArray[index].priority === "Normalny") {
        this.toDoListArray[index].priority = "Normal";
      } else if (this.langVer === "eng" && this.toDoListArray[index].priority === "Wysoki") {
        this.toDoListArray[index].priority = "High";
      } else if (this.langVer === "eng" && this.toDoListArray[index].priority === "Normal") {
      } else if (this.langVer === "eng" && this.toDoListArray[index].priority === "High") {;
      }
    });
  }
}
