import { Component, OnInit } from '@angular/core';
import { APPCONFIG } from '../../../config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public AppConfig: any;

  constructor() { }

  ngOnInit() {
    this.AppConfig = APPCONFIG;
  }

}
