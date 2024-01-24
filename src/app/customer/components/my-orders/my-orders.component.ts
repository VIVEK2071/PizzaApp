import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent{
 
  myOrder:any;
  constructor(private customerService:CustomerService){}

  ngOnInit(){
      this.getMyOrder();
      
  }

  getMyOrder(){
      this.customerService.getOrdersByUserId().subscribe(res=>{
          this.myOrder=res;
          console.log(res)
      })
  }
}
