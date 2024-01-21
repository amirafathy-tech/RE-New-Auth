import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, of } from 'rxjs';

import { User } from './user.model';
import { AuthUser } from './auth-user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
export interface AuthResponseBackend {
  access_token: string;
  refresh_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({ providedIn: 'root' })

export class AuthService {

  private authURL = "";
  private clientID = "a5e7a1df-1cc6-4086-af10-72a89858065a"
  private clientSecret = "tZ-fGugMHfP[F]oaLd9g5mLIrQSei4NmB4"

  user = new BehaviorSubject<User>(null);
  userBackend = new BehaviorSubject<AuthUser>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRrnmAf8MMp9w6ydXaN0fINl_7xIrB8rc',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  submitSignup(value: string, familyName: string, givenName: string, userName: string) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const data={
      'value' :value,
      'familyName':familyName,
      'givenName':givenName,
      'userName': userName
    }
    const config = {
      maxBodyLength:Infinity,
      headers,
      body: JSON.stringify(data)
    };

    this.http
      .post<any>(
        'https://security.c-8339c63.kyma.ondemand.com/iasusers',
        data,{headers}
      )
      .pipe(
           catchError(error => {
              console.error(error);
              return of(null);
            })
          )
          .subscribe(response => {
            if (response) {
              console.log(response);
              if (response) {
                console.log(response);
                this.router.navigate(['/about']);
              
              } else if (response.error_description === "User authentication failed.") {
                console.log("40000000");
              } else {
                console.log(response);
              }
            }
    
          });
  }

  // will be integrated with SAP Auth idenetity service
  submitLogin(email: string, password: string) {

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const data = new URLSearchParams();
    data.set('grant_type', 'password');
    data.set('username', email);
    data.set('password', password);

    return this.http
      .post<AuthResponseBackend>(
        'https://cors-anywhere.herokuapp.com/https://abahe3uqu.trial-accounts.ondemand.com/oauth2/token',
        data.toString(), { headers }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          console.log(resData.id_token);
          const user = new AuthUser(email, resData.id_token);
          // const user = new AuthUser(email, resData.id_token,"admin");
          this.userBackend.next(user);
          localStorage.setItem('token', resData.id_token);
        })
      );

    // this.http.post<any>('https://cors-anywhere.herokuapp.com/https://abahe3uqu.trial-accounts.ondemand.com/oauth2/token', 
    // data.toString(), { headers })
    //   .pipe(
    //     catchError(error => {
    //       console.error(error);
    //       return of(null);
    //     })
    //   )
    //   .subscribe(response => {
    //     if (response) {
    //       console.log(response);
    //       if (response) {
    //         console.log(response.id_token);
    //         localStorage.setItem('token', response.id_token);
    //         // setUserData();
    //         // goToHome();
    //       } else if (response.error_description === "User authentication failed.") {
    //         console.log("40000000");
    //       } else {
    //         console.log(response);
    //       }
    //     }

    //   });
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRrnmAf8MMp9w6ydXaN0fINl_7xIrB8rc',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.userBackend.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('token');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

}