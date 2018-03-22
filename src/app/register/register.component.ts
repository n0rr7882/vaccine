import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../vaccine.service';
import { SignService } from '../vaccine.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private pwHide: boolean;
  private registerLoading: boolean;
  private loginLoading: boolean;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*).{2,20}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,20}$/)
    ])
  });

  constructor(
    public userService: UserService,
    public signService: SignService,
    private toastrService: ToastrService
  ) {
    this.pwHide = true;
    this.registerLoading = false;
    this.loginLoading = false;
  }

  public get pv() { return this.pwHide; }
  public get rl() { return this.registerLoading; }
  public get ll() { return this.loginLoading; }

  public set pv(state: boolean) { this.pwHide = state; }
  public set rl(state: boolean) { this.registerLoading = state; }
  public set ll(state: boolean) { this.loginLoading = state; }

  public changePwView(): void {
    this.pwHide = !this.pwHide;
  }

  public register(): void {

    Promise.resolve()
      .then(() => {
        if (this.registerForm.valid) {
          return this.registerForm.value;
        }
        throw new Error('폼을 모두 작성해주세요.');
      })
      .then(user => {
        this.registerLoading = true;
        return this.userService.create(user);
      })
      .then(user => {
        const { email, password } = this.registerForm.value;
        return this.signService.login({ email, password });
      })
      .then(() => {
        this.registerLoading = false;
        this.toastrService.success(`${this.registerForm.value.username}님`, '회원가입 성공');
      })
      .catch(err => {
        if (err.error) {
          this.toastrService.error(err.error.message, '회원가입 실패');
        } else {
          this.toastrService.error(err.message, '회원가입 실패');
        }
        this.registerLoading = false;
      });

  }

  public login(): void {

  }

}
