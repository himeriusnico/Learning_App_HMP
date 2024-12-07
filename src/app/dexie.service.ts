import { Injectable } from '@angular/core';
import Dexie from 'dexie';

export interface MyItem {
  id: number;
  name: string;
  price: number;
  num: number;
}

@Injectable({
  providedIn: 'root',
})
export class DexieService extends Dexie {
  myStore: Dexie.Table<MyItem, number>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      myStore: '++id, name',
    });

    this.myStore = this.table('myStore');
  }

  // async addItem(
  //   id: number,
  //   name: string,
  //   price: number,
  //   num: number
  // ): Promise<void> {
  //   await this.myStore.add({ id, name, price, num });
  // }
  // diubah gunakan yang dibawah untuk pengecekan
  async addItem(
    id: number,
    name: string,
    price: number,
    num: number
  ): Promise<void> {
    const existingItem = await this.myStore.where('id').equals(id).first();

    if (existingItem) {
      await this.increaseNum(existingItem.id);
    } else {
      await this.myStore.add({ id, name, price, num });
    }
  }

  async removeItem(itemId: number): Promise<void> {
    await this.myStore.delete(itemId);
  }

  async getAllItems(): Promise<any[]> {
    return this.myStore.toArray();
  }

  async increaseNum(itemId: number): Promise<void> {
    const item = await this.myStore.get(itemId);

    if (item) {
      item.num += 1;
      await this.myStore.update(itemId, { num: item.num });
    }
  }

  async decreaseNum(itemId: number): Promise<void> {
    const item = await this.myStore.get(itemId);

    if (item) {
      item.num -= 1;

      if (item.num <= 0) {
        await this.myStore.delete(itemId);
      } else {
        // Otherwise, update the item in the database
        await this.myStore.update(itemId, { num: item.num });
      }
    }
  }
}
