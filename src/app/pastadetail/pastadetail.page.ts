import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodserviceService, Pasta } from '../foodservice.service';

@Component({
  selector: 'app-pastadetail',
  templateUrl: './pastadetail.page.html',
  styleUrls: ['./pastadetail.page.scss'],
})
export class PastadetailPage implements OnInit {
  index:number = 0;
  // pasta: any;
  pasta:Pasta = {};

  constructor(
    private route : ActivatedRoute,
    private foodService : FoodserviceService) { }

    ngOnInit() {
      // this.pastas = this.foodService.pastas;
    
      // this.route.params.subscribe(params => {
      //   this.index = +params['id']; 
      //     this.pasta = this.pastas[this.index];  
      // });

      this.route.params.subscribe(params => {
        //this.index = params['index'];
        this.foodService.pastaDetail(params['id']).subscribe(
         (data)=> {
          this.pasta=data;
         }
        );
      });
   }
   
}
