import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersGridComponent implements OnInit{

  private users: any;
  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get(environment.apiURI+'/users')
      .subscribe(results=>{
        this.users = results
      })
  }

}
