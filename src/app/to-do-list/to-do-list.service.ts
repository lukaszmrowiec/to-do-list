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

  addTask(title: string, taskId: number, importanceLlevel) {
    this.today = Date.now();
    this.toDoList.push({
      id: taskId,
      name: title,
      date: this.today,
      priority: importanceLlevel
    });
  }

  updateItem(key: string, value: any) {
    this.toDoList.update(key, value);
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
