import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../vaccine.service';
import { IPost, IUser } from '../vaccine.interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post: IPost;
  private isCommentOpen: boolean;

  constructor() { }

  ngOnInit() {
    this.isCommentOpen = false;
  }

  public get ico() { return this.isCommentOpen; }
  public set ico(state: boolean) { this.isCommentOpen = state; }

  public toggleComments() {
    this.isCommentOpen = !this.isCommentOpen;
  }

  public reloadCommentCount() {

  }

}
