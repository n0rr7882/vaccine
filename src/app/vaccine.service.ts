import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { IUser, IPost, IComment } from './vaccine.interface';

export const API_URL = 'http://localhost:3000/api';

interface Response {
  message: string;
}

interface TokenRes {
  message: string;
  token: string;
}

interface UserRes {
  message: string;
  user: IUser;
}

interface UsersRes {
  message: string;
  users: IUser[];
}

interface PostRes {
  message: string;
  post: IPost;
}

interface PostsRes {
  message: string;
  posts: IPost[];
}

interface CommentRes {
  message: string;
  comment: IComment;
}

interface CommentsRes {
  message: string;
  comments: IComment[];
}

@Injectable()
export class SignService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public login(sign: { email: string, password: string }): Promise<void> {
    return this.http.post<TokenRes>(`${API_URL}/sign`, sign).toPromise()
      .then(res => {
        this.cookieService.set('ene', res.token);
      });
  }

  public logout(): void {
    this.cookieService.delete('ene');
  }

  public isLogin(): boolean {
    return this.cookieService.check('ene');
  }

}

@Injectable()
export class MypageService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public getFollowingsPosts(params: { limit: string, offset: string }): Promise<IPost[]> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.get<PostsRes>(`${API_URL}/mypages/followings-posts`, { headers, params }).toPromise()
      .then(res => res.posts);
  }

  public getLikedPosts(params: { limit: string, offset: string }): Promise<IPost[]> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.get<PostsRes>(`${API_URL}/mypages/liked-posts`, { headers, params }).toPromise()
      .then(res => res.posts);
  }

  public getCommentedPosts(params: { limit: string, offset: string }): Promise<IPost[]> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.get<PostsRes>(`${API_URL}/mypages/commented-posts`, { headers, params }).toPromise()
      .then(res => res.posts);
  }

  public getMe(): Promise<IUser> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.get<UserRes>(`${API_URL}/mypages/me`, { headers }).toPromise()
      .then(res => res.user);
  }

}

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public create(user: { username: string, email: string, password: string }): Promise<IUser> {
    return this.http.post<UserRes>(`${API_URL}/users`, user).toPromise()
      .then(res => res.user);
  }

  public readOne(id: string): Promise<IUser> {
    return this.http.get<UserRes>(`${API_URL}/users/${id}`).toPromise()
      .then(res => res.user);
  }

  public read(params: { limit: string, offset: string, by?: string, q?: string }): Promise<IUser[]> {
    return this.http.get<UsersRes>(`${API_URL}/users`, { params }).toPromise()
      .then(res => res.users);
  }

  public update(id: string, user: { username?: string, email?: string, password?: string }): Promise<IUser> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.put<UserRes>(`${API_URL}/users/${id}`, user, { headers }).toPromise()
      .then(res => res.user);
  }

  public delete(id: string): Promise<IUser> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.delete<UserRes>(`${API_URL}/users/${id}`, { headers }).toPromise()
      .then(res => res.user);
  }

}

@Injectable()
export class PostService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public create(post: { content: string }): Promise<IPost> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.post<PostRes>(`${API_URL}/posts`, post, { headers }).toPromise()
      .then(res => res.post);
  }

  public readOne(id: string): Promise<IPost> {
    return this.http.get<PostRes>(`${API_URL}/posts/${id}`).toPromise()
      .then(res => res.post);
  }

  public read(params: { limit: string, offset: string, by?: string, q?: string }): Promise<IPost[]> {
    return this.http.get<PostsRes>(`${API_URL}/users`, { params }).toPromise()
      .then(res => res.posts);
  }

  public update(id: string, post: { content?: string }): Promise<IPost> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.put<PostRes>(`${API_URL}/posts/${id}`, post, { headers }).toPromise()
      .then(res => res.post);
  }

  public delete(id: string): Promise<IPost> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.delete<PostRes>(`${API_URL}/users/${id}`, { headers }).toPromise()
      .then(res => res.post);
  }

}

@Injectable()
export class CommentService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public create(comment: { content: string }): Promise<IComment> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.post<CommentRes>(`${API_URL}/comments`, comment, { headers }).toPromise()
      .then(res => res.comment);
  }

  public readOne(id: string): Promise<IComment> {
    return this.http.get<CommentRes>(`${API_URL}/comments/${id}`).toPromise()
      .then(res => res.comment);
  }

  public read(params: { limit: string, offset: string, by?: string, q?: string }): Promise<IComment[]> {
    return this.http.get<CommentsRes>(`${API_URL}/comments`, { params }).toPromise()
      .then(res => res.comments);
  }

  public update(id: string, comment: { content?: string }): Promise<IComment> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.put<CommentRes>(`${API_URL}/comments/${id}`, comment, { headers }).toPromise()
      .then(res => res.comment);
  }

  public delete(id: string): Promise<IComment> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.delete<CommentRes>(`${API_URL}/users/${id}`, { headers }).toPromise()
      .then(res => res.comment);
  }

}

@Injectable()
export class FollowService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public follow(targetId: string): Promise<void> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.post<Response>(`${API_URL}/follows/${targetId}`, {}, { headers }).toPromise()
      .then(() => { });
  }

  public unfollow(targetId: string): Promise<void> {
    const headers = new HttpHeaders({ 'Authorization': this.cookieService.get('ene') });
    return this.http.delete<Response>(`${API_URL}/follows/${targetId}`, { headers }).toPromise()
      .then(() => { });
  }

}
