import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  toDoList: AngularFireList<any>;
  today;

  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList() {
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;
  }

  getDate() {
    let today = new Date();
    return today;
  }

  addTask(title: string, counter: number, importanceLlevel) {
    this.today = Date.now();
    this.toDoList.push({
      id: counter,
      name: title,
      date: this.today,
      importance: importanceLlevel
    });
    console.log(this.today);
  }

  removeTask($key: string) {
    this.toDoList.remove($key);
  }
}

export interface Task {
  id: number;
  name: string;
  date: Date
}
