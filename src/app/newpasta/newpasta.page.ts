import { Component, OnInit } from '@angular/core';
import { FoodserviceService } from '../foodservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpasta',
  templateUrl: './newpasta.page.html',
  styleUrls: ['./newpasta.page.scss'],
})
export class NewpastaPage implements OnInit {
  new_name:string="";
  new_desc:string="";
  new_price:number = 0;
  arr_price:number[] = [];
  new_url:string="";
  is_spicy: boolean = false;
  alertButtons = [{
    text: "OK",
    role: "confirm",
    handler: () =>{
      this.router.navigate(['/pasta'])
    }
  }]

  constructor(private foodServices: FoodserviceService, private router:Router) { }

  ngOnInit() {
    this.arr_price = this.generateNumberOptions(30000,50000,2000)
  }

  generateNumberOptions(start: number, end: number, step: number): number[] {
    const options: number[] = [];
    for (let i = start; i <= end; i += step) {
      options.push(i);
    }
    return options;
  }

  submitPasta(){
    this.foodServices.addPasta(this.new_name, this.new_url, this.new_desc, this.new_price, this.is_spicy);
    console.log("Data: ", this.foodServices.pastas);
  }
}
