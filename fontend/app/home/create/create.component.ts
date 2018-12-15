import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {ProfilesService}  from'../../Services/profiles.service';
import{AlertService} from '../../shared/service_alert/alert.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  errorMsg: string;
  form: FormGroup;
  personID: any;
  items: any;
  errMsg: string;


  constructor(private builder: FormBuilder,
    private router: Router,
    private profilestSV: ProfilesService,
    private activateRouter: ActivatedRoute,
    private alertSV: AlertService

  ) { this.CreateFormData(),this.activateRouter.params.forEach(
    params => {
      this.personID = params.id;
    }
  )
}

  ngOnInit() {
  }

  private CreateFormData(){
    this.form = this.builder.group({
      proCardId : ['',[Validators.required]],
      proName: ['',[Validators.required]],
      proLastname :['',[Validators.required]],
      proTel:['',[Validators.required]],
      proEmail:['',[Validators.required]],
      proStudy:['',[Validators.required]]
    });
  }

  onSubmit() {
    const patt = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/i;
    if (this.form.invalid) {
      console.log('ข้อมูลไม่ครบ');
    } else if (patt.test(this.form.get('proEmail').value) === false) {
      console.log('email ผิดพลาด');
    } else if (this.form.get('personID').value === '') {
      this.profilestSV
        .createProfile(JSON.stringify(this.form.value))
        .then(res => {
          this.alertSV.notify('เพิ่มข้อมูลเรียบร้อยแล้ว','info')
          this.router.navigate(['/', 'home']);
        })
        .catch(err => this.errorMsg = err);
    }
  }
}
