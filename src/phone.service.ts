import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  //create an array of phone objects
  allPhones: Phone[] = [
    {id: 1, name: 'iPhone 12', brand: {brand: 'Apple', types: []}, type: {type: 'Smartphone', phones: []}},
    {id: 2, name: 'Galaxy S21', brand: {brand: 'Samsung', types: []}, type: {type: 'Smartphone', phones: []}},
    {id: 3, name: 'Pixel 5', brand: {brand: 'Google', types: []}, type: {type: 'Smartphone', phones: []}},
    {id: 4, name: 'iPhone 11', brand: {brand: 'Apple', types: []}, type: {type: 'Smartphone', phones: []}},
    {id: 5, name: 'Galaxy S20', brand: {brand: 'Samsung', types: []}, type: {type: 'Smartphone', phones: []}},
    {id: 6, name: 'Pixel 4', brand: {brand: 'Google', types: []}, type: {type: 'Smartphone', phones: []}},
    {id: 7, name: 'iPhone SE', brand: {brand: 'Apple', types: []}, type: {type: 'Smartphone', phones: []}},
    {id: 8, name: 'Galaxy A71', brand: {brand: 'Samsung', types: []}, type: {type: 'Smartphone', phones: []}},
    {id: 9, name: 'Pixel 3a', brand: {brand: 'Google', types: []}, type: {type: 'Smartphone', phones: []}},
    {id: 10, name: 'iPhone XR', brand: {brand: 'Apple', types: []}, type: {type: 'Smartphone', phones: []}},
    {id: 11, name: 'Galaxy A51', brand: {brand: 'Samsung', types: []}, type: {type: 'Smartphone', phones: []}},
    {id: 12, name: 'Pixel 3', brand: {brand: 'Google', types: []}, type: {type: 'Smartphone', phones: []}},
    {id: 13, name: 'Mac Book Pro', brand: {brand: 'Apple', types: []}, type: {type: 'Laptop', phones: []}},
    {id: 14, name: 'Galaxy Book Flex', brand: {brand: 'Samsung', types: []}, type: {type: 'Laptop', phones: []}},
    {id: 15, name: 'Pixel Book', brand: {brand: 'Google', types: []}, type: {type: 'Laptop', phones: []}},
    {id: 16, name: 'Mac Book Air', brand: {brand: 'Apple', types: []}, type: {type: 'Laptop', phones: []}},
    {id: 17, name: 'Galaxy Book S', brand: {brand: 'Samsung', types: []}, type: {type: 'Laptop', phones: []}},
    {id: 18, name: 'Pixel Book Go', brand: {brand: 'Google', types: []}, type: {type: 'Laptop', phones: []}},
  ];

  constructor() { }

  public getAllPhones(): Phone[] {
    return this.allPhones;
  }
}

export interface Phone {
  id: number;
  name: string;
  brand: ProductBrand;
  type: ProductType;
}

export interface ProductType {
  type: string,
  phones: Phone[], // Hinzufügen eines Phone-Arrays zu ProductType
}

export interface ProductBrand {
  brand: string,
  types: ProductType[], // Hinzufügen eines ProductType-Arrays zu ProductBrand
}

export interface ProductBrandWrapper {
  brand: ProductBrand,
  order: number,
}
