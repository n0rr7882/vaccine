import { Component, OnInit } from '@angular/core';
import { SignService } from '../vaccine.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private signService: SignService) { }

  async ngOnInit() {
    await this.signService.loadMe();
  }

  public get me() {
    return this.signService.me;
  }

}
