import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  toDoList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList() {
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;
  }

  addTask(title: string) {
    this.toDoList.push({
      name: title,
      date: new Date()
    });
  }

  // addTask(e: string) {
  //   tasks.push({
  //     id: tasks.length + 1,
  //     name: e,
  //     date: new Date()
  //   });
  // }

  removeTask($key: string) {
    this.toDoList.remove($key);
  }
}

export interface Task {
  id: number;
  name: string;
  date: Date
}
