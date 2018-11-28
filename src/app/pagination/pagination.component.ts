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
page:number = 0;
data:Data;
totpage:number = 0;
exist:string;
med:boolean = true;
  constructor(private auth:AuthService) { }

  ngOnInit() {
  	this.count();
  	this.getpeers();
  }

count()
{
		this.auth.pages().subscribe(datauser => {
		this.pages = datauser,
		console.log(this.pages),
		console.log(typeof this.pages)
	});
}
setpage(p,event:any)
{
	event.preventDefault();
	if(p!=0)
		p=2*p;
	this.page = p;
	this.getpeers();
}

getpeers()
{
	this.auth.getpeep(this.page).subscribe(data123 => {
		this.data = data123,
		console.log(this.data),
		console.log(typeof this.data)
    });
}
tot()
{
		this.auth.totpage().subscribe(data123 => {
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
    	this.auth.check(this.values).subscribe(datauser => {
    		if(datauser!='')
    		{
    			this.data = datauser,
				console.log(this.data),
				console.log(typeof this.data)
    		}
    		else
    		{
    			console.log("asshole");
    			this.exist = "there is no such user!!";
    			this.med = false;
    		}

		});
    }
    else
    {
    	this.auth.getpeep(this.page).subscribe(data123 => {
		this.data = data123,
		console.log(this.data),
		console.log(typeof this.data),
		this.med = true;
    });
    }


}

}
