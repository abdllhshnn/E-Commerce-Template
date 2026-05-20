import { Address } from '../../models/address.model';

export class LoadAddresses {
  static readonly type = '[Address] Load Addresses';
}

export class AddAddress {
  static readonly type = '[Address] Add Address';
  constructor(public address: Omit<Address, 'id'>) {}
}

export class UpdateAddress {
  static readonly type = '[Address] Update Address';
  constructor(public address: Address) {}
}

export class DeleteAddress {
  static readonly type = '[Address] Delete Address';
  constructor(public id: number) {}
}
