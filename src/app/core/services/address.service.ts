import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address } from '../models/address.model';
import { MOCK_ADDRESSES } from '../data/mock-addresses';

@Injectable({ providedIn: 'root' })
export class AddressService {
  private addresses$ = new BehaviorSubject<Address[]>([...MOCK_ADDRESSES]);

  getAddresses(): Observable<Address[]> {
    return this.addresses$.asObservable();
  }

  getAddressById(id: number): Observable<Address | undefined> {
    return this.addresses$.pipe(map((list) => list.find((a) => a.id === id)));
  }

  addAddress(address: Omit<Address, 'id'>): void {
    const current = this.addresses$.value;
    const newId = current.length > 0 ? Math.max(...current.map((a) => a.id)) + 1 : 1;

    let updated: Address[];
    if (address.isDefault) {
      updated = current.map((a) => ({ ...a, isDefault: false }));
    } else {
      updated = [...current];
    }

    updated.push({ ...address, id: newId });
    this.addresses$.next(updated);
  }

  updateAddress(address: Address): void {
    let current = this.addresses$.value;

    if (address.isDefault) {
      current = current.map((a) => ({ ...a, isDefault: false }));
    }

    const updated = current.map((a) => (a.id === address.id ? address : a));
    this.addresses$.next(updated);
  }

  deleteAddress(id: number): void {
    const updated = this.addresses$.value.filter((a) => a.id !== id);
    this.addresses$.next(updated);
  }
}
