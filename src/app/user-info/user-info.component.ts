import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost, IUser } from '../vaccine.interface';
import { POSTS_LIMIT, UserService, SignService, PostService } from '../vaccine.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  isEdit: boolean;
  posts: IPost[];
  user: IUser;
  userLoading: boolean;
  postLoading: boolean;
  postsOffset: number;

  updateForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  constructor(
    private userService: UserService,
    private postService: PostService,
    private signService: SignService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.signService.loadMe()
      .then(() => {
        this.isEdit = false;
        this.postLoading = false;
        this.postsOffset = 0;
        this.posts = [];
        this.user = null;
        this.loadUser();
        this.readMorePosts();
      });
  }

  public toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  public loadUser() {

  }

  public update(): void {

  }

  public readMorePosts(): void {

  }

}
