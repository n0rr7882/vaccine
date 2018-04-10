import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { POSTS_LIMIT, USERS_LIMIT, SearchService } from '../vaccine.service';
import { IPost, IUser } from '../vaccine.interface';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keywords: string;
  posts: IPost[];
  users: IUser[];
  postsOffset: number;
  usersOffset: number;
  usersLoading: boolean;

  constructor(
    private searchService: SearchService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.reset();
    this.route.params
      .subscribe(params => {
        this.reset();
        if (params['keywords'] !== '') {
          this.keywords = params['keywords'];
          this.readMorePosts();
          this.readMoreUsers();
        }
      });
  }

  reset() {
    this.posts = [];
    this.users = [];
    this.postsOffset = 0;
    this.usersOffset = 0;
    this.usersLoading = false;
  }

  readMorePosts() {

    Promise.resolve()
      .then(() => {
        const params = { limit: POSTS_LIMIT.toString(), offset: this.postsOffset.toString(), q: this.keywords };
        return this.searchService.posts(params);
      })
      .then(posts => {
        this.posts.push(...posts);
        this.postsOffset += POSTS_LIMIT;
      })
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, 'ERROR!');
        } else {
          this.toastrService.error(err.message, 'ERROR!');
        }
      });

  }

  readMoreUsers() {

    this.usersLoading = true;

    Promise.resolve()
      .then(() => {
        const params = { limit: USERS_LIMIT.toString(), offset: this.usersOffset.toString(), q: this.keywords };
        return this.searchService.users(params);
      })
      .then(users => {
        this.users.push(...users);
        this.usersOffset += USERS_LIMIT;
        this.usersLoading = false;
      })
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, 'ERROR!');
        } else {
          this.toastrService.error(err.message, 'ERROR!');
        }
        this.usersLoading = false;
      });

  }

}
