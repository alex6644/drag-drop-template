import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {Phone, PhoneService} from "../phone.service";
import {NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, CdkDrag, NgForOf, CdkDropList],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'drag-drop-template';

  allPhones:Phone[] = [];
  phoneOrder:Map<number,number> = new Map();

  sortedPhones: Phone[] = [];

  constructor(private phoneService:PhoneService) {
  }

  ngOnInit(): void {
    this.loadPhoneOrder();
    this.loadPhones();
    this.sortPhones();
  }

  loadPhones() {
    this.allPhones = this.phoneService.getAllPhones();
  }

  loadPhoneOrder() {
    this.phoneOrder = this.phoneService.getPhoneOrder();
  }

  sortPhones(): void {
    this.sortedPhones = this.allPhones.sort((a, b) => this.phoneOrder.get(a.id)! - this.phoneOrder.get(b.id)!);
  }

  drop(event: CdkDragDrop<Phone[]>): void {
    moveItemInArray(this.sortedPhones, event.previousIndex, event.currentIndex);
    this.sortedPhones.forEach((phone, index) => {
      this.phoneOrder.set(phone.id, index);
    });
  }
}
