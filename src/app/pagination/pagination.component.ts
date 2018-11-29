import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Data } from '../data';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
pages:number;
nopage:number = 0;
page:number = 0;
limit:number = 2;
data:Data;
mid:boolean = true;
totpage:number = 0;
exist:string;
med:boolean = true;
pageno = [2,3,4,5];
  constructor(private auth:AuthService) { }

  ngOnInit() {
  	this.count();
  this.getpeers();

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
	if(p!=0)
		p=this.limit*p;
	this.page = p;
	this.getpeers();
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
this.auth.getpeep(this.limit,this.page).subscribe(data123 => {
    this.data = data123,
    console.log(this.data),
    console.log(typeof this.data),
    this.med = true;
    });
    this.count();
}

}
