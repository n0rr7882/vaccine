import { Component } from '@angular/core';
import { SignService } from './vaccine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private signService: SignService) { }

}
