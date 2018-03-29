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

  async ngOnInit() {

    this.isEdit = false;
    this.postsOffset = 0;
    this.posts = [];
    this.user = null;

    try {

      await this.signService.loadMe();
      await this.loadUser();
      await this.readMorePosts();

    } catch (err) {
      if (err.error) {
        this.toastrService.error(err.error.message, 'ERROR');
      } else {
        this.toastrService.error(err.message, 'ERROR');
      }
    }

  }

  public toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  public async loadUser(): Promise<void> {
    this.user = await this.userService.readOne(this.route.snapshot.params['id']);
  }

  public async readMorePosts(): Promise<void> {
    const posts = await this.postService.read({
      limit: POSTS_LIMIT.toString(),
      offset: this.postsOffset.toString(),
      by: 'author',
      q: this.route.snapshot.params['id'],
      regex: 'false'
    });
    this.posts.push(...posts);
    this.postsOffset += POSTS_LIMIT;
  }

  public update(): void {

  }

}
