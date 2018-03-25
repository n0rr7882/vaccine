import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { POSTS_LIMIT, PostService, MypageService } from '../vaccine.service';
import { IPost } from '../vaccine.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  private writeLoading: boolean;
  private postLoading: boolean;
  private postsOffset: number;

  public posts: IPost[];

  writeForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
  });

  constructor(
    public postService: PostService,
    public mypageService: MypageService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.writeLoading = false;
    this.postLoading = false;
    this.postsOffset = 0;
    this.posts = [];
    this.readMorePosts();
  }

  public get wl(): boolean { return this.writeLoading; }
  public get pl(): boolean { return this.postLoading; }

  public set wl(state: boolean) { this.writeLoading = state; }
  public set pl(state: boolean) { this.postLoading = state; }

  public write(): void {

    Promise.resolve()
      .then(() => {
        if (this.writeForm.valid) {
          return this.writeForm.value;
        }
        throw new Error('나의 소식을 적어주세요!');
      })
      .then(data => {
        this.writeLoading = true;
        return this.postService.create(data);
      })
      .then(post => {
        this.posts.unshift(post);
        this.writeForm.setValue({ content: '' });
        this.toastrService.success('업로드 성공');
        this.writeLoading = false;
      })
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, '업로드 실패');
        } else {
          this.toastrService.error(err.message, '업로드 실패');
        }
        this.writeLoading = false;
      });

  }

  public readMorePosts(): void {

    Promise.resolve()
      .then(() => {
        this.postLoading = true;
        const params = { limit: POSTS_LIMIT.toString(), offset: this.postsOffset.toString() };
        return this.mypageService.getFollowingsPosts(params);
      })
      .then(posts => {
        this.posts.push(...posts);
        return this.postLoading = false;
      })
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, 'ERROR!');
        } else {
          this.toastrService.error(err.message, 'ERROR!');
        }
        this.postLoading = false;
      });

  }

}
