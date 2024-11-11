import { Injectable, SimpleChange } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Instructions{
  pasta_id?: number,
  step?: number,
  instruction?: string
}

export interface user{
  id: number,
  username: string,
  password: string,
  fullname: string
}

export interface Pasta{
  id?: number,
  name?: string,
  url?: string,
  description?: string,
  price?: number,
  spicy?: boolean
  instructions?: Instructions[]
}

@Injectable({
  providedIn: 'root'
})
export class FoodserviceService {
  pastas:Pasta[] = [];
  // pastas = [
  //   {
  //   name: "SALMON AGLIO OLIO",
  //   url: "https://www.pizzahut.co.id/assets/images/digital_menu/phr/menu/pasta-rice/salmon-aglio-olio.png",
  //   description: "Pasta Spaghetti, Cabai, Paprika Hijau, Bawang Putih dengan Salmon Panggang",
  //   price :52000,
  //   spicy :true
  //   },
  //   {
  //   name: "CLASSIC FETTUCCINE",
  //   url:"https://www.pizzahut.co.id/assets/images/digital_menu/phr/menu/pasta-rice/Classic-Fettuccine-With-Crispy-Chicken.png",
  //   description: "Pasta Fettuccine, Daging Ayam Asap, Saus Creamy dengan Chicken Strip dibalur Cream Cheese Mayo dan Beef Bits.",
  //   price: 35000,
  //   spicy :true
  //   },
  //   {
  //   name: "CHEESE LAVA",
  //   url:"https://www.pizzahut.co.id/assets/images/digital_menu/phr/menu/pasta-rice/Cheese-Lava.png",
  //   description: "Pasta Fusilli, Pepperoni Sapi, Saus Keju Cheddar, Beef Bits dengan Saus Cheese Fondue",
  //   price: 38000,
  //   spicy:false
  //   },
  //    {
  //   name: "CREAMY TRUFFLE",
  //   url:"https://www.pizzahut.co.id/assets/images/digital_menu/phr/menu/pasta-rice/CREAMY-TRUFFLE.png",
  //   description: "Pasta Penne, Sosis Beef Chorizo,Bayam, Saus Alfredo, dan Truffle Oil",
  //   price: 42000,
  //   spicy: false
  //   },
  //    {
  //   name: "SALMON MENTAIKO",
  //   url:"https://www.pizzahut.co.id/assets/images/digital_menu/phr/menu/pasta-rice/CLASSIC-SALMON-MENTAIKO.png",
  //   description: "Pasta Spaghetti, Ikan Salmon Fillet, Saus Mayo Mentai, dan Nori.",
  //   price: 56000,
  //   spicy: false
  //   }
    // ];

  constructor(private http: HttpClient) { }
  
  pastaList():Observable<any>{
    return this.http.get("https://ubaya.xyz/hybrid/160422019/pastas.php");
  }

  pastaDetail(id: number): Observable<any>{
    return this.http.get("https://ubaya.xyz/hybrid/160422019/pastas_detail.php?id="+id)
  }

  addPasta(p_name:string,p_url:string,p_description:string,p_price:number)
  {
  // this.pastas.push({name:p_name, url:p_url,
  //   description:p_description,price:p_price,spicy: p_spicy})

  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
   const body = new URLSearchParams();
   body.set('name', p_name);
   body.set('desc', p_description);
   body.set('url', p_url);
   body.set('price', p_price.toString());
  //  body.set('spicy', p_spicy ? 'true' : 'false');
   const urlEncodedData = body.toString();
   return this.http.post(
	"https://ubaya.xyz/hybrid/160422019/new_pasta.php", urlEncodedData, { headers });

  }

  updatePasta(p_id:number,p_name:string,p_url:string,p_description:string,p_price:number)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
    body.set('name', p_name);
    body.set('desc', p_description);
    body.set('url', p_url);
    body.set('price', p_price.toString());
    const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.xyz/hybrid/160422019/edit_pasta.php", urlEncodedData, { headers });
  }

  deletePasta(p_id:number)
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('id', p_id.toString()); const urlEncodedData = body.toString();
    
    return this.http.post("https://ubaya.xyz/hybrid/160422019/delete_pasta.php", urlEncodedData, { headers });
  }

  addInstruction(p_id: number, p_step: number, p_instruction: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    
    body.set('pasta_id', p_id.toString());
    body.set('step', p_step.toString());
    body.set('instruction', p_instruction);

    const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.xyz/hybrid/160422019/add_instruction.php", urlEncodedData, { headers });
  }

  login(p_username: string, p_password: string){
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams();

    body.set('username', p_username);
    body.set('password', p_password);

    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.xyz/hybrid/160422019/login.php", urlEncodedData, { headers });
  }
}
