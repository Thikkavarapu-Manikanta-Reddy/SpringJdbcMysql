import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Data } from './data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  LoginForm: FormGroup;
  UpdateForm: FormGroup;
  data1:Data;
  data2:Data;
  data3:Data;
  expression:boolean = false;
  constructor(private formBuilder: FormBuilder,private auth:AuthService) { }

  ngOnInit() {
  	this.createform();
  }

createform()
{
this.LoginForm = this.formBuilder.group({
	id: ['', [Validators.required] ],
     email: ['', [Validators.required] ],
     password: ['', [Validators.required] ],
    });
this.UpdateForm = this.formBuilder.group({
	oldid: ['', [Validators.required] ],
	id: ['', [Validators.required] ],
     email: ['', [Validators.required] ],
     password: ['', [Validators.required] ],
    });
}
onSubmit()
{
	this.auth.
	putuser(this.LoginForm.value.id,this.LoginForm.value.email,this.LoginForm.value.password)
	.subscribe(data123 => {
		this.data1 = data123,
		console.log(this.data1),
		console.log(typeof this.data1),
		this.expression = true;
    });
}
hello()
{
	this.auth.getusers().subscribe(datauser => {
		this.data2 = datauser,
		console.log(this.data2),
		console.log(typeof this.data2),
		this.expression = true});
}

deletuser(id:number)
{
	this.auth.deleteuser(id).subscribe(datauser => {
		this.data2 = datauser,
		console.log(this.data2),
		console.log(typeof this.data2),
		this.expression = true});
}

updateuser()
{
	this.auth.
	updatuser(this.UpdateForm.value.oldid,this.UpdateForm.value.id,this.UpdateForm.value.email,this.UpdateForm.value.password)
	.subscribe(datapop => {
		this.data3 = datapop,
		console.log(this.data3),
		console.log(typeof this.data3),
		this.expression = true;
    });
}

}
