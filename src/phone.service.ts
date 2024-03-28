import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  //create an array of phone objects
  allPhones: Phone[] = [
    { id: 1, name: 'Samsung Galaxy S10' },
    { id: 2, name: 'iPhone 11' },
    { id: 3, name: 'Huawei P30 Pro' },
    { id: 4, name: 'Google Pixel 4' },
    { id: 5, name: 'OnePlus 7T' }
    ];

  phoneOrder: Map<number,number> = new Map([
    [1, 0],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 4]
  ]);

  constructor() { }

  public getAllPhones(): Phone[] {
    return this.allPhones;
  }

  public getPhoneOrder(): Map<number,number> {
    return this.phoneOrder;
  }

  public updatePhoneOrder(phoneOrder: Map<number,number>) {
    this.phoneOrder = phoneOrder;
  }
}

export interface Phone {
  id: number;
  name: string;
}
