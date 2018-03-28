import { Component, OnInit } from '@angular/core';
import { UserService, MypageService } from '../vaccine.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  private isEdit: boolean;

  constructor(private userService: UserService, private mypageService: MypageService) { }

  ngOnInit() {
    this.isEdit = false;
  }

  public get ie(): boolean { return this.isEdit; }
  public set ie(state: boolean) { this.isEdit = state; }

  public toggleEdit() {
    this.isEdit = !this.isEdit;
  }

}
