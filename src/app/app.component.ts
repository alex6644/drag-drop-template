import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {
  Phone,
  PhoneService,
   ProductBrand,
  ProductBrandWrapper,
  ProductType,
} from "../phone.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CdkDropList,
    NgForOf,
    CdkDrag
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'drag-drop-template';

  sortedPhones: Phone[] = [];

  staticPhones: Phone[] = [];

  selectedTypes: ProductType[] = [];
  selectedPhones: Phone[] = [];
  selectedBrand: ProductBrand =  {brand: 'Apple', types: []};

  organizedDataArray: ProductBrand[] = [];


  constructor(private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.loadPhones();
    this.staticPhones = this.phoneService.getAllPhones();
    this.organizedDataArray = this.organizeData();
    console.log(this.organizedDataToOrderMap(this.organizeData()));
  }


  public organizeData(): ProductBrand[] {
    let brands: ProductBrand[] = [];
    this.staticPhones.forEach(phone => {
      let brand = brands.find(b => b.brand === phone.brand.brand);
      if (!brand) {
        brand = { brand: phone.brand.brand, types: [] };
        brands.push(brand);
      }
      let type = brand.types.find(t => t.type === phone.type.type);
      if (!type) {
        type = { type: phone.type.type, phones: [] };
        brand.types.push(type);
      }
      type.phones.push(phone);
    });
    return brands;
  }

  public organizedDataToOrderMap(organizedData: ProductBrand[]): Map<number,number> {
    let orderMap = new Map<number, number>();
    let order = 0;
    organizedData.forEach(brand => {
      brand.types.forEach(type => {
        type.phones.forEach(phone => {
          orderMap.set(phone.id, order++);
        });
      });
    });
    console.log(orderMap);
    return orderMap;
  }

  loadPhones() {
    this.sortedPhones = this.phoneService.getAllPhones();
  }

  getAllBrands(): ProductBrand[] {
    return this.staticPhones.map(phone => phone.brand).filter((brand, index, self) =>
      index === self.findIndex((t) => (
        t.brand === brand.brand
      ))
    );
  }

  getTypesForBrand(brand: ProductBrand):void {
    this.selectedTypes = [];
    this.selectedPhones = [];
    this.selectedBrand = brand;
    this.selectedTypes = this.staticPhones
      .filter(phone => phone.brand.brand === brand.brand)
      .map(phone => phone.type);
  }


  getPhonesForTypeAndBrand(type: ProductType, brand: ProductBrand): void {
    this.selectedTypes = [type];
  this.selectedPhones = this.staticPhones
    .filter(phone => phone.type.type === type.type && phone.brand.brand === brand.brand);
}

  dropBrand(event: CdkDragDrop<ProductBrand[]>): void {
    moveItemInArray(this.organizedDataArray, event.previousIndex, event.currentIndex);
  }

  dropType(event: CdkDragDrop<ProductType[]>): void {
    if (this.selectedBrand) {
      moveItemInArray(this.selectedBrand.types, event.previousIndex, event.currentIndex);
    }
  }

  dropPhone(event: CdkDragDrop<Phone[]>): void {
    if (this.selectedBrand && this.selectedTypes) {
      let type = this.selectedBrand.types.find(t => t.type === this.selectedTypes[0].type);
      if (type) {
        moveItemInArray(type.phones, event.previousIndex, event.currentIndex);
      }
    }
  }

  getTypesForSelectedBrand(): ProductType[] {
    if (this.selectedBrand) {
      return this.selectedBrand.types;
    }
    return [];
  }

  getPhonesForSelectedTypeAndBrand(): Phone[] {
    if (this.selectedBrand && this.selectedTypes) {
      let type = this.selectedBrand.types.find(t => t.type === this.selectedTypes[0].type);
      if (type) {
        return type.phones;
      }
    }
    return [];
  }

  getAllPhonesFromOrganizedData(): Phone[] {
    let allPhones: Phone[] = [];
    this.organizedDataArray.forEach(brand => {
      brand.types.forEach(type => {
        type.phones.forEach(phone => {
          allPhones.push(phone);
        });
      });
    });
    return allPhones;
  }

  sortPhonesByOrder(): Phone[] {
    let allPhones = this.getAllPhonesFromOrganizedData();
    let orderMap = this.organizedDataToOrderMap(this.organizedDataArray);
    allPhones.sort((a, b) => (orderMap.get(a.id) || 0) - (orderMap.get(b.id) || 0));
    return allPhones;
  }

}
