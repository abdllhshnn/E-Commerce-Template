import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AddressService } from '../../../core/services/address.service';
import { Address } from '../../../core/models/address.model';

@Component({
  selector: 'app-addresses',
  imports: [ReactiveFormsModule],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss',
})
export class AddressesComponent {
  private addressService = inject(AddressService);
  private fb = inject(FormBuilder);

  addresses = toSignal(this.addressService.getAddresses(), {
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
      this.addressService.updateAddress({ ...data, id });
    } else {
      this.addressService.addAddress(data);
    }

    this.cancelForm();
  }

  deleteAddress(id: number): void {
    this.addressService.deleteAddress(id);
  }
}
