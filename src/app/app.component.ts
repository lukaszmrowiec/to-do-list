import { Directive, Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
}

@Directive({
  selector: '[tooltip]',
  exportAs: 'tooltip'
 })

 export class tooltip {
 }
