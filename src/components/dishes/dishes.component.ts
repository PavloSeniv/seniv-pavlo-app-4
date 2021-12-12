import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Dish } from 'src/shared/dish';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  @Output() onAdd = new EventEmitter<Dish>();
  catalogTitle = 'Catalog';

  @Input() dishes: Dish[] = [];
  public filtredDishes: Dish[] = [];
  public search: string = '';

  public totalSize = 0;
  public pageSize = 6;
  public currentPage = 0;

  ngOnInit() {
    this.filtredDishes = this.dishes;
    this.totalSize = this.dishes.length;
    this.iterator();
  }

  ngOnChanges() {
    this.filtredDishes = this.dishes;
    this.totalSize = this.dishes.length;
    this.currentPage = 0;
    this.iterator();
  }

  doSearch() {
    this.currentPage = 0;
    this.iterator();
  }

  public handlePage(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.dishes.filter((e) => e.name.includes(this.search));
    this.totalSize = part.length;
    this.filtredDishes = part.slice(start, end);
  }

  addToBusket(dish: Dish) {
    this.onAdd.emit(dish);
  }

  // Для адаптиву cols(tsconfig.json додано рядок "noImplicitAny": false,)
  colAadaptive: any = 3;
  onResize(event) {
    const element = event.target.innerWidth;
    console.log(element);

    if (element < 950) {
      this.colAadaptive = 1;
    }

    if (element > 950) {
      this.colAadaptive = 3;
    }

    if (element < 750) {
      this.colAadaptive = 1;
    }
  }
}
