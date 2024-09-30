import { Component, OnInit } from '@angular/core';
import { FoodserviceService } from '../foodservice.service';

@Component({
  selector: 'app-pasta',
  templateUrl: './pasta.page.html',
  styleUrls: ['./pasta.page.scss'],
})
export class PastaPage implements OnInit {
  jenistampilan:string = "accordion"
  pastas:any[]=[]
  
  constructor(private foodservice: FoodserviceService){};
     

  gantiTampilan(event: any){
    this.jenistampilan = event.detail.value;
  }

  chunkArray(arr: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
    }
    return result;
   }

  ngOnInit() {
    this.pastas=this.foodservice.pastas;
  }

}
