import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/env';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class TerminalService {
  private apiUrl = environment.apiUrl;
  private http: HttpClient;

  constructor(
  ) {
    this.http = inject(HttpClient);
  }
  registerTerminal(uuid: string) {
    return this.http.get(`${this.apiUrl}/terminal/config/${uuid}`);
  }
}
