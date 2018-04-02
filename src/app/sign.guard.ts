import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SignService } from './vaccine.service';

@Injectable()
export class SignGuard implements CanActivate {

  constructor(
    private signService: SignService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.signService.isLogin()) {
      return true;
    } else {
      this.router.navigate(['/sign']);
      return false;
    }
  }
}
