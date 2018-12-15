import { Component, OnInit } from '@angular/core';
import {ProfilesService} from '../Services/profiles.service';
import { Router } from '@angular/router';
import{AlertService} from '../../app/shared/service_alert/alert.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  item = [];
  errMsg ="";
  constructor(private profilesSV:ProfilesService,
    private route:Router,
    private alertSV:AlertService) 
  {

   }

   ngOnInit() {
    this.fetchData();
  }
  fetchData(){
    this.profilesSV.getProfile()
    .subscribe(
      data => this.item = data,
      error => this.errMsg = error
      );
  }
  gotoCreateProfile(){
    this.route.navigate(['/','create']);
  }
}

