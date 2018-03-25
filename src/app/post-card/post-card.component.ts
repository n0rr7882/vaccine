import { Component, OnInit, Input } from '@angular/core';
import { MypageService, PostService } from '../vaccine.service';
import { IPost, IUser } from '../vaccine.interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post: IPost;
  private isCommentOpen: boolean;
  public isCommented: boolean;
  public isLiked: boolean;

  constructor(
    private mypageService: MypageService,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.isCommentOpen = false;
    this.getMyActions();
  }

  public get ico(): boolean { return this.isCommentOpen; }
  public set ico(state: boolean) { this.isCommentOpen = state; }

  public toggleComments() {
    this.isCommentOpen = !this.isCommentOpen;
  }

  public getMyActions() {
    this.mypageService.getMe()
      .then(user => {
        console.log(user);
        console.log(this.post.comments);
      });
  }

  public reloadPost() {

  }

}
