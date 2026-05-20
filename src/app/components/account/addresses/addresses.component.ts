import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddressState } from '../../../core/state/address.state';
import { LoadAddresses, AddAddress, UpdateAddress, DeleteAddress } from '../../../core/state/actions/address.actions';
import { Address } from '../../../core/models/address.model';

@Component({
  selector: 'app-addresses',
  imports: [ReactiveFormsModule],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss',
})
export class AddressesComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  addresses = toSignal(this.store.select(AddressState.addresses), {
    initialValue: [],
  });

  showForm = signal(false);
  editingId = signal<number | null>(null);

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    fullName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^05\d{9}$/)]],
    city: ['', Validators.required],
    district: ['', Validators.required],
    addressLine: ['', Validators.required],
    zipCode: ['', Validators.required],
    isDefault: [false],
  });

  constructor() {
    this.store.dispatch(new LoadAddresses());
  }

  openAddForm(): void {
    this.editingId.set(null);
    this.form.reset({ isDefault: false });
    this.showForm.set(true);
  }

  openEditForm(address: Address): void {
    this.editingId.set(address.id);
    this.form.patchValue(address);
    this.showForm.set(true);
  }

  cancelForm(): void {
    this.showForm.set(false);
    this.editingId.set(null);
    this.form.reset({ isDefault: false });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.getRawValue();
    const id = this.editingId();

    if (id !== null) {
      this.store.dispatch(new UpdateAddress({ ...data, id }));
    } else {
      this.store.dispatch(new AddAddress(data));
    }

    this.cancelForm();
  }

  deleteAddress(id: number): void {
    this.store.dispatch(new DeleteAddress(id));
  }
}
