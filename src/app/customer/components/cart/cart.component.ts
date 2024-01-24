import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
 
  cartItems:any[]=[];
  order:any;
  order1={couponName:null};
  code:any;
  
  
 
  couponForm!:FormGroup;
 
  constructor(private customerService:CustomerService,
    private snackbar:MatSnackBar,
    private fb: FormBuilder,
    public dialog:MatDialog,){}
   
    ngOnInit():void{
      this.couponForm = this.fb.group({
        code:[null,[Validators.required]]
      })
      this.getCart();
    }
 
    applyCoupon(){
       this.code=this.couponForm.get(['code'])!.value;
      if(this.code==null)
      {
        this.code='code0'
      }
      console.log(this.code)
      this.customerService.applyCoupon(this.code).subscribe(res=>{
        this.order1.couponName=res.couponName;
        console.log(res)
        this.snackbar.open("Coupon Applied Successfully", 'Close',{
          duration:5000
        });
        this.getCart();
      }, error =>{
        this.snackbar.open(error.error, 'Close',{
          duration:5000
        });
      })
    }
 
    getCart(){
      this.cartItems=[];
      this.customerService.getCartByUserId().subscribe(res=>{
        this.order=res;
        console.log(res)
        res.cartItems.forEach(element => {
          element.processedImg='data:image/jpeg;base64,'+element.returnedImg;
          this.cartItems.push(element);
        });
      })
    }
 
    increaseQuantity(productId:any){
        
      this.customerService.increaseProductQuantity(productId).subscribe(res=>{
        console.log(res)
        this.snackbar.open('Product quantity increased.','close',{duration:5000});
        this.getCart();
      })
    }

    decreaseQuantity(productId:any){
     
      this.customerService.decreaseProductQuantity(productId).subscribe(res=>{
        console.log(res)
        this.snackbar.open('Product quantity decreased.','close',{duration:5000});
        this.getCart();
      })
    }

    placeOrder(){

      if(this.order1.couponName==null){
        
        this.applyCoupon();
      }
      this.dialog.open(PlaceOrderComponent);
    }
}
 