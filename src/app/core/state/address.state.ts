import { Injectable, inject } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address.model';
import { LoadAddresses, AddAddress, UpdateAddress, DeleteAddress } from './actions/address.actions';

export interface AddressStateModel {
  addresses: Address[];
  loaded: boolean;
}

const defaults: AddressStateModel = {
  addresses: [],
  loaded: false,
};

@State<AddressStateModel>({
  name: 'address',
  defaults,
})
@Injectable()
export class AddressState {
  private addressService = inject(AddressService);

  @Selector()
  static addresses(state: AddressStateModel): Address[] {
    return state.addresses;
  }

  @Selector()
  static loaded(state: AddressStateModel): boolean {
    return state.loaded;
  }

  @Action(LoadAddresses)
  loadAddresses(ctx: StateContext<AddressStateModel>) {
    return this.addressService.getAddresses().pipe(
      tap((addresses) => ctx.patchState({ addresses, loaded: true })),
    );
  }

  @Action(AddAddress)
  addAddress(ctx: StateContext<AddressStateModel>, action: AddAddress) {
    this.addressService.addAddress(action.address);
    return ctx.dispatch(new LoadAddresses());
  }

  @Action(UpdateAddress)
  updateAddress(ctx: StateContext<AddressStateModel>, action: UpdateAddress) {
    this.addressService.updateAddress(action.address);
    return ctx.dispatch(new LoadAddresses());
  }

  @Action(DeleteAddress)
  deleteAddress(ctx: StateContext<AddressStateModel>, action: DeleteAddress) {
    this.addressService.deleteAddress(action.id);
    return ctx.dispatch(new LoadAddresses());
  }
}
