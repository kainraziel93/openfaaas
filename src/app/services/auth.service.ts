import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/function';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW46aGRaNlJ0YTRpUXRt'
    });
  }

  login(user_id: string, password: string, otp_code: string): Observable<any> {
    const url = `${this.baseUrl}/authenticator`;
    const headers = this.getAuthHeaders();

    return this.http.post(url, {
      user_id,
      password,
      otp_code
    }, { headers });
  }

  register(user: { user_id: string }): Observable<any> {
    const url = `${this.baseUrl}/password-generator`;
    const headers = this.getAuthHeaders();

    return this.http.post(url, user);
  }

  
setupTwoFA(user: { user_id: string }): Observable<any> {
  const url = `${this.baseUrl}/twofa-generator`;
  const headers = this.getAuthHeaders();

  return this.http.post(url, user, { headers });
}


}
