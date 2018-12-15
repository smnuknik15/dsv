import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profiles} from '../Models/profiles';
@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  url:string = "https://localhost:44380/api/Profiles"

  constructor(private http:HttpClient) { }


getProfile(){
  return this.http.get<Profiles[]>(this.url)
}

createProfile(data){
  let promise = new Promise((resolve,reject) =>{
    let apiURL = this.url ;
    this.http.post(apiURL,data)
    .toPromise()
    .then(
      res => {//success
        console.log(res);
        resolve(data);
        }
    );
  });
  return promise;
}
getOnePerson(personID) {
    return this.http.get<Profiles[]>(this.url + 'cmd=select&personID=' + personID);
  }
}