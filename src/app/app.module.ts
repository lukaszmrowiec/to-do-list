import { BrowserModule } from "@angular/platform-browser";
import { Directive,NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material";
import { MatPaginatorModule } from "@angular/material/paginator";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

import { AppComponent } from "./app.component";
import { ToDoListComponent } from "./to-do-list/to-do-list.component";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [AppComponent, ToDoListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    FormsModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule

  ],

  // exports: [
  //   MatTooltipModule
  // ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}

