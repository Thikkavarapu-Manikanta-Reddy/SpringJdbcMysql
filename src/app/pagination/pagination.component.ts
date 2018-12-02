import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Data } from '../data';
import { Bank } from '../bank';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
pages:number;
king:boolean = false;
runpage:number;
nopage:number = 0;
page:number = 0;
limit:number = 2;
data:Data;
banks:Bank;
mid:boolean = true;
totpage:number = 0;
exist:string;
med:boolean = true;
pageno = [2,3,4,5];
rule:number;
  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.count();
  this.getpeers();

  }
count()
{
  localStorage.setItem("limits",JSON.stringify(this.limit));
  localStorage.setItem("pages",JSON.stringify(this.nopage));
    this.auth.pages(this.limit).subscribe(datauser => {
    this.pages = datauser
  });
}
setpage(p,event:any)
{
  event.preventDefault();
  this.runpage = p;
    localStorage.setItem("pages",JSON.stringify(p));
  if(p!=0)
    p=this.limit*p;
  this.page = p;
  this.getpeers();
}

getpeers()
{
  if(!this.auth.issignedup())
  {
  this.auth.getpeep(this.limit,this.page).subscribe(data123 => {
    this.data = data123
    //console.log(this.data[1].email),
    //console.log(this.data),
    //console.log(typeof this.data),
      localStorage.setItem("names"+ JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limits")), JSON.stringify(this.data));
      console.log("From Dtabase!!");
    });
  this.auth.setsignedup(true);
}
else
{
  console.log("From Cache!!");
  //console.log(JSON.parse(localStorage.getItem("pages")),JSON.parse(localStorage.getItem("limits")));
  //console.log(localStorage.getItem("names"+ JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limits"))));
this.data = JSON.parse(localStorage.getItem("names"+ JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limits"))));
}

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
    //console.log(this.page);
    if(this.values!='')
    {
    this.med = true;
      this.auth.check(this.values,this.limit).subscribe(datauser => {
        if(datauser!='')
        {
          this.data = datauser
        //console.log(this.data),
        //console.log(typeof this.data)
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
   // console.log(this.data),
    //console.log(typeof this.data),
    this.med = true;
    });
    }
}

onChange(np:number)
{
    this.limit = np;
    localStorage.setItem("limits",JSON.stringify(this.limit));
    //console.log()
    //localStorage.setItem("pages",JSON.stringify(this.runpage));
    //localStorage.setItem("names"+ JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limit")), JSON.stringify(this.data));
    localStorage.setItem("pages",JSON.stringify(0));
if(!this.auth.issignedup())
  {
  this.auth.getpeep(this.limit,0).subscribe(data123 => {
    this.data = data123
    //console.log(this.data[1].email),
    //console.log(this.data),
    //console.log(typeof this.data),

      localStorage.setItem("names"+ JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limits")), JSON.stringify(this.data));
      //console.log(localStorage.getItem("names"+ JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limits"))),JSON.parse(localStorage.getItem("pages")),JSON.parse(localStorage.getItem("limits")));
      console.log("From Dtabase!!");
    });
  this.auth.setsignedup(true);
}
else
{
  console.log("From Cache!!");
  //console.log(localStorage.getItem("names"+ JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limits"))));
this.data = JSON.parse(localStorage.getItem("names"+ JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limits"))));
}
    this.count();
}

DispBank(id:number)
{
  console.log(id);
    this.auth.bank(id).subscribe(data123 => {
    this.banks = data123,
    console.log(this.banks),
    console.log(typeof this.banks)
    });
}

}
