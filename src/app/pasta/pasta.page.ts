import { Component, OnInit } from '@angular/core';
import { FoodserviceService } from '../foodservice.service';
import { DexieService } from '../dexie.service';

@Component({
  selector: 'app-pasta',
  templateUrl: './pasta.page.html',
  styleUrls: ['./pasta.page.scss'],
})
export class PastaPage implements OnInit {
  jenistampilan:string = "accordion"
  pastas:any[]=[]
  filteredPastas: any[] = [];
  searchTerm: string = "";
  
  constructor(private foodservice: FoodserviceService, private dex:DexieService){};
     

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
    // this.pastas=this.foodservice.pastas;

    this.foodservice.pastaList().subscribe(
      (data)=> {
        console.log("data:", data);
          this.pastas=data;
          this.filteredPastas = data;
        }
     );
  }

  filterPastas() {
    this.filteredPastas = this.pastas.filter(pasta =>
      pasta.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  ionViewWillEnter(){
    this.foodservice.pastaList().subscribe(
      (data)=> {
        console.log("data:", data);
          this.pastas=data;
          this.filteredPastas = data;
        }
     );
  }

  addtocart(id:number,name:string,price:number,num:number){
    this.dex.addItem(id,name,price,num).then(() => {
      alert('Item added successfully.');
    })
    .catch(error => {
      alert('Error adding item:'+ error);
    });
  }
}
