import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  setHeaderAndParams(params) {
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return {headers, params: params != null ? params : {}};
  }
}
