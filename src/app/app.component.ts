import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  toggleBadgeVisibility() {
    throw new Error('Method not implemented.');
  }
  title = 'joblisting';
  hidden: any;
}
