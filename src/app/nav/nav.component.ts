import { Component, OnInit } from '@angular/core';
import { SignService, SearchService } from '../vaccine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public keywords: string;

  constructor(
    private signService: SignService,
    private searchService: SearchService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.signService.loadMe();
  }

  public get me() {
    return this.signService.me;
  }

  public handleSearch() {
    this.router.navigate([`/search/${this.keywords}`]);
  }

}
