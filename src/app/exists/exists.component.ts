import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Data } from '../data';
import { Bank } from '../bank';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl  } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-exists',
  templateUrl: './exists.component.html',
  styleUrls: ['./exists.component.css']
})
export class ExistsComponent implements OnInit {
pno:number = 0;
pages:number;
nopage:number = 0;
page:number = 0;
limit:number = 2;
data:Data;
data1:Data;
mid:boolean = true;
totpage:number = 0;
exist:string;
med:boolean = true;
pageno = [2,3,4,5];
myForm: FormGroup;
LoginForm: FormGroup;
 dcount:number;
 message:string;
  constructor(private auth:AuthService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createform();
    this.count();
  this.getpeers();
  this.tot();
  }
  createform()
{
	this.LoginForm = this.formBuilder.group({
	id: ['', [Validators.required] ],
     email: ['', [Validators.required] ],
     password: ['', [Validators.required] ],
    });
    this.myForm = this.formBuilder.group({
      useremail: this.formBuilder.array([])
    });
}
count()
{
		this.auth.pages(this.limit).subscribe(datauser => {
		this.pages = datauser
	});
}
setpage(p,event:any)
{
	event.preventDefault();
	this.pno = p;
	if(p!=0)
		p=this.limit*p;
	this.page = p;
	this.getpeers();
}
setpageleft(event:any)
{
	event.preventDefault();
	if(this.pno>0)
	{
	this.pno = this.pno-1;
	var p = this.pno;
	if(p!=0)
		p=this.limit*p;
	this.page = p;
	this.getpeers();
	}	
}
setpageright(event:any)
{
	event.preventDefault();
	if(this.pno<this.totpage-1)
	{
	this.pno = this.pno+1;
	var p = this.pno;
	console.log(p);
	if(p!=0)
		p=this.limit*p;
	this.page = p;
	this.getpeers();
	}
}

getpeers()
{
	this.auth.getpeep(this.limit,this.page).subscribe(data123 => {
		this.data = data123
    //console.log(this.data[1].email),
		console.log(this.data),
		console.log(typeof this.data)
    });
}

getpeers123()
{
	this.auth.getpeep(this.limit,0).subscribe(data123 => {
		this.data = data123
		console.log(this.data),
		console.log(typeof this.data)
    });
}

tot()
{
		this.auth.totpage(this.limit).subscribe(data123 => {
		this.totpage = data123,
		console.log(this.totpage),
		console.log(typeof this.totpage)
    });
}

values = '';

  onKey(event: any) { // without type info
    this.values = event.target.value ;
    console.log(this.page);
    if(this.values!='')
    {
		this.med = true;
    	this.auth.check(this.values,this.limit).subscribe(datauser => {
    		if(datauser!='')
    		{
    			this.data = datauser,
				console.log(this.data),
				console.log(typeof this.data)
    		}
    		else
    		{
    			this.exist = "there is no such user!!";
    			this.med = false;
    		}

		});
    }
    else
    {
    	this.auth.getpeep(this.limit,this.page).subscribe(data123 => {
		this.data = data123,
		console.log(this.data),
		console.log(typeof this.data),
		this.med = true;
    });
    }
}

onChange(np:number)
{
    this.limit = np;
    this.page = 0;
    this.pno = 0;
this.auth.getpeep(this.limit,this.page).subscribe(data123 => {
    this.data = data123,
    console.log(this.data),
    console.log(typeof this.data),
    this.med = true;
    });
    this.count();
    this.tot();
}

  onChange123(id: number, isChecked: boolean) {
  	const emailFormArray = <FormArray>this.myForm.controls.useremail;

    if (isChecked) {
      emailFormArray.push(new FormControl(id));
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == id)
      emailFormArray.removeAt(index);
    }
    console.log(this.myForm.value.useremail);
    console.log(typeof this.myForm.value.useremail[0]);
  	}

checkdelete()
  	{
      if(this.myForm.value.useremail.length>0)
      {
        const emailFormArray = <FormArray>this.myForm.controls.useremail;
        this.dcount = this.myForm.value.useremail.length;
        for(var i =0;i<this.dcount;i++)
        {
  		  this.auth.deletecheck(this.myForm.value.useremail[i]).subscribe(datauser => {
        emailFormArray.removeAt(this.myForm.value.useremail[i]);
		    this.data = datauser,
		    console.log(this.data),
		    console.log(typeof this.data),
		     this.count();
  			this.getpeers123();
		  });
    	}
      }
      else
      {
        alert("no user selected to deleted");
      }

  	}

onSubmit()
{
	this.auth.
	putuser(this.LoginForm.value.id,this.LoginForm.value.email,this.LoginForm.value.password)
	.subscribe(data123 => {
		this.data1 = data123,
		console.log(this.data1),
		console.log(typeof this.data1),
		this.count();
  		this.getpeers123();
    });
}

modify()
{
	if(this.myForm.value.useremail.length == 1)
	{
		this.message = "Good You Can Proceed Further!!";
		$('#myModal').modal('show');
	}
	else if(this.myForm.value.useremail.length == 0)
	{
		this.message = "Select Atmost One User to Modify!!";
		$('#myModal').modal('show');
	}
	else
	{
		this.message = "At a time You Can Modify One User Only!!";
		$('#myModal').modal('show');
	}

}

}
