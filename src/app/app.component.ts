import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'drag-drop-template';
}
