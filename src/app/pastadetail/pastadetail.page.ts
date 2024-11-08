import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  newStep = 0;
  newInstruction = "";

  constructor(
    private route : ActivatedRoute,
    private foodService : FoodserviceService,
    private router: Router) { }

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

   deletepasta(id:any) {
      this.foodService.deletePasta(id).subscribe((response: any) => {
        if(response.result==='success'){
          alert("success")
          this.router.navigate(['/pasta']) 
        }
        else {
          alert(response.message)
        }
    });
  }

  addInstruction(){
    if(this.newStep > 0 && this.newInstruction.length > 0){
      this.foodService.addInstruction(this.pasta.id!, this.newStep, this.newInstruction).subscribe((response: any) => {
        if(response.result === 'success'){
          this.pasta.instructions?.push({
            pasta_id: this.pasta.id,
            step: this.newStep,
            instruction: this.newInstruction
          });
          this.newStep = 0;
          this.newInstruction = '';
        }else{
          alert('gagal')
        }
      });
    }
  }
}
