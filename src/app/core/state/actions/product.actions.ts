export class LoadPopularProducts {
  static readonly type = '[Product] Load Popular Products';
  constructor(public count: number) {}
}

export class LoadNewProducts {
  static readonly type = '[Product] Load New Products';
  constructor(public count: number) {}
}

export class LoadCategories {
  static readonly type = '[Product] Load Categories';
}

export class LoadHeroBanners {
  static readonly type = '[Product] Load Hero Banners';
}

export class LoadPromoBanners {
  static readonly type = '[Product] Load Promo Banners';
}

export class LoadBrands {
  static readonly type = '[Product] Load Brands';
}

export class LoadAllProducts {
  static readonly type = '[Product] Load All Products';
}
