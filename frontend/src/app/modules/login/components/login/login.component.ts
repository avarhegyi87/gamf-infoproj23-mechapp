import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../../users/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../users/models/user.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  currentUser: User | undefined;
  users: User[] | any;
  error = '';
  loading = false;
  submitted = false;
  hide = true;

  private _credentials = { username: '', password: '' };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
  ) {
    authService.getCurrentUser.subscribe(x => (this.currentUser = x));
    if (this.currentUser?.id) {
      (async () => {
        await this.router.navigate(['/']);
      })();
    }
  }

  ngOnInit(): void {
    this.loading = false;

    this.loginFormGroup = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.email,
          Validators.pattern(/@mechapp.hu$/),
          Validators.required,
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,25}$/,
          ),
        ]),
      ],
    });
  }

  onKeyDown(event: { keyCode: number }) {
    if (event.keyCode === 13) this.onSubmit();
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginFormGroup.invalid) return;

    this.loading = true;
    this._credentials.username = this.loginFormGroup.get('username')?.value;
    this._credentials.password = this.loginFormGroup.get('password')?.value;

    this.authService
      .login(this._credentials.username, this._credentials.password)
      .pipe(first())
      .subscribe({
        next: user => {
          if (user == undefined) {
            this.loginFormGroup.controls['username'].setValue('');
            this.loginFormGroup.controls['password'].setValue('');
            this.loginFormGroup.controls['username'].setErrors({
              incorrect: true,
            });
            this.loginFormGroup.controls['password'].setErrors({
              incorrect: true,
            });
          } else {
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/';
            (async () => {
              await this.router.navigate([returnUrl]);
            })();
          }
        },
        error: error => {
          this.error = error;
          this.loading = false;
        },
      });
  }

  onLogout() {
    this.authService.logout();
    (async () => {
      await this.router.navigate(['/login']);
    })();
  }
}
