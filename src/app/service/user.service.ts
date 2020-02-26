import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://128.199.167.160:3000"
  constructor(private http:HttpClient,private commonService:CommonService) { }

  get(page,limit,offset,filter,sortBy,sortType){
    let sort = sortBy
    let type = sortType ? 'asc' : 'desc'
    let params = { page,limit }
    if (filter != null) {
      Object.keys(filter).forEach(searchKey => {
        if (filter[searchKey] != null) params = Object.assign({[searchKey]: filter[searchKey]}, params);
      });
    }
    const options = this.commonService.setHeaderAndParams(params);
    return this.http.get(this.url + '/api/v1/users',options);
  }
  getById(id){
    const options = this.commonService.setHeaderAndParams(null);
    return this.http.get(this.url + '/api/v1/users/'+id,options);
  }
  post(data){
    const options = this.commonService.setHeaderAndParams(null);
    return this.http.post(this.url + '/api/v1/users',data,options);
  }
  put(id,data){
    const options = this.commonService.setHeaderAndParams(null);
    return this.http.put(this.url + '/api/v1/users/'+id,data,options);
  }
  delete(id){
    const options = this.commonService.setHeaderAndParams(null);
    return this.http.delete(this.url + '/api/v1/users/'+id,options);
  }
}
