import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  toDoList: AngularFireList<any>;
  today = Date.now();

  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList() {
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;
  }

  addTask(title: string, counter: number, importanceLlevel: string) {
    this.toDoList.push({
      id: counter,
      name: title,
      date: this.today,
      importance: importanceLlevel
    });
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
