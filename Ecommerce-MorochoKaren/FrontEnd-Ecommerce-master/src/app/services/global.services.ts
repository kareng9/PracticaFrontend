import {
    HttpClient,
    HttpParams,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { environment } from 'src/environments/environment';
  import { Router } from '@angular/router';
  
  @Injectable({
    providedIn: 'root'
  })
  export class GlobalService {
    API_URL: string = environment.baseUrl;
    token: string = '';
    constructor(private httpClient: HttpClient, private router: Router) {}
  
    get(url: string, params = new HttpParams()) {
      url = this.API_URL + url;
      return this.httpClient
        .get(url, { params });
    }
  
    post(url: string, data?: any, params = new HttpParams()) {
      url = this.API_URL + url;
      return this.httpClient
        .post(url, data, { params });
    }
  
    put(url: string, data?: any, params = new HttpParams()) {
      url = this.API_URL + url;
      return this.httpClient.put(url, data, { params });
    }
  
    delete(url: string, params = new HttpParams()) {
      url = this.API_URL + url;
      return this.httpClient.delete(url, { params });
    }
  }
  