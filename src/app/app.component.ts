import { Component } from '@angular/core';
import { Dish } from 'src/shared/dish';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { BucketItem } from 'src/shared/buscketItem';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BucketDialogComponent } from 'src/components/dishes/bucket-dialog/bucket-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'seniv-pavlo-app-4';
  dishes: Dish[] = [];
  filtredDishes: Dish[] = [];
  groups: any[] = [];
  public bucketItems: BucketItem[] = [];

  constructor(
    public spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.spinner.show();

    for (let i = 1; i < 99; i++) {
      let dish = {
        id: i,
        name: 'Item ' + i,
        image: 'https://picsum.photos/600/430',
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
        weight: i * Math.floor(Math.random() * 12),
        category: 'Category ' + (1 + Math.floor(Math.random() * 6)),
        price: i * Math.floor(Math.random() * 22),
      };
      this.dishes.push(dish);
    }

    setTimeout(() => {
      this.groups = _(this.dishes)
        .groupBy((x) => x.category)
        .map((value, key) => ({ category: key, dishes: value }))
        .value();
      this.filtredDishes = this.dishes;
      this.spinner.hide();
    }, 2000);
  }

  filterDishes(dishes: Dish[]) {
    this.spinner.show();

    setTimeout(() => {
      this.filtredDishes = dishes;
      this.spinner.hide();
    }, 1500);
  }

  removeFromBusket(dish: Dish) {
    console.log(dish);
  }

  addToBusket(dish: Dish) {
    let exist = this.bucketItems.find((e) => e.dish.id === dish.id);
    if (exist) {
      exist.count++;
    } else {
      let item = new BucketItem(dish, 1);
      this.bucketItems.push(item);
    }
    this._snackBar.open('Item added to trash!', 'Cool');
  }

  openBucket(): void {
    this.dialog.open(BucketDialogComponent, {
      width: '600px',
      data: this.bucketItems,
    });
  }
}
