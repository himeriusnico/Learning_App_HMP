import { Component, OnInit } from '@angular/core';

interface Product {
  productName: string;
  productPrice: number;
  productDate: Date;
}

interface Book{
  title: string,
  author: string,
  publishedDate: Date,
  price: number
  discount: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {

  // Date properties
  currentDate = new Date();
  reset = new Date();
  is5daysago: boolean = false;
  is5daysTomorrow: boolean = false;

  // Counters
  yesterdaysClicked: number = 0;
  tomorrowsClicked: number = 0;

  // Product properties
  quantity = 0;
  maxQuantity = 10;
  totalAmount: number = 0;
  product: Product = {
    productName: 'Iphone 14',
    productPrice: 10000000,
    productDate: new Date(),
  };

  // Coupon properties
  couponcode: string = "";
  couponDiscount: number = 0;
  strvalid: string = "Invalid";
  discount: number = 0;

  // Profile Photo URL
  profilePhotoUrl: string = '';

  //color text
  textcolor:string = 'red';

  books:Book[] = [
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publishedDate: new Date('1960-07-11'),
      price: 7.99,
      discount: 10
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedDate: new Date('1925-04-10'),
      price: 10.99,
      discount: 5
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publishedDate: new Date('1813-01-28'),
      price: 12.75,
      discount: 15
    }
  ]

  constructor() { }

  ngOnInit() {}

  // Date handling methods
  today_ind(): string {
    const bulan = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d = this.currentDate.getDate();
    const m = this.currentDate.getMonth();
    const y = this.currentDate.getFullYear();
    return `${d} ${bulan[m]} ${y}`;
  }

  goYesterday() {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.yesterdaysClicked++;
    this.is5daysago = this.yesterdaysClicked === 5;
  }

  resetDate() {
    this.currentDate = new Date(this.reset);  // Reset the currentDate to the original date
    this.is5daysago = false;
    this.is5daysTomorrow = false;
    this.yesterdaysClicked = 0;
    this.tomorrowsClicked = 0;
  }

  goTomorrow() {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.tomorrowsClicked++;
    this.is5daysTomorrow = this.tomorrowsClicked === 5;
  }

  // Quantity management methods
  increaseQty() {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
      this.calculateTotalAmount();
    }
  }

  decreaseQty() {
    if (this.quantity > 0) {
      this.quantity--;
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount() {
    this.totalAmount = this.product.productPrice * this.quantity;
  }

  // Coupon validation method
  checkValid() {
    switch (this.couponcode) {
      case '1234':
        this.strvalid = "valid";
        this.discount = 5;
        this.textcolor = "green";
        this.couponDiscount = 5;
        break;
      case '6789':
        this.strvalid = "valid";
        this.discount = 10;
        this.textcolor = "green";
        this.couponDiscount = 10; 
        break;
      default:
        this.strvalid = "Invalid";
        this.discount = 0;
        this.textcolor;
    }
  }

  getDiscountedPrice(book: Book): number {
    if (book.discount) {
      return book.price - (book.price * book.discount / 100);
    }
    return book.price;
  }

  checkCouponDiscount(book: Book): number {
    let finalDiscount = 0;
    if (this.couponDiscount > 0) {
      finalDiscount = this.couponDiscount;
    }
    
    const discountedPrice = this.getDiscountedPrice(book);
    return discountedPrice - (discountedPrice * (finalDiscount / 100));
  }
  
}
