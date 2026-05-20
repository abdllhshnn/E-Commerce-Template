export class UpdateProfile {
  static readonly type = '[Profile] Update Profile';
  constructor(public data: { firstName: string; lastName: string; email: string; phone: string }) {}
}

export class UpdateProfileSuccess {
  static readonly type = '[Profile] Update Profile Success';
  constructor(public message: string) {}
}

export class UpdateProfileFailed {
  static readonly type = '[Profile] Update Profile Failed';
  constructor(public message: string) {}
}

export class ChangePassword {
  static readonly type = '[Profile] Change Password';
  constructor(public data: { currentPassword: string; newPassword: string }) {}
}

export class ChangePasswordSuccess {
  static readonly type = '[Profile] Change Password Success';
  constructor(public message: string) {}
}

export class ChangePasswordFailed {
  static readonly type = '[Profile] Change Password Failed';
  constructor(public message: string) {}
}

export class LoadFavorites {
  static readonly type = '[Profile] Load Favorites';
}

export class ToggleFavorite {
  static readonly type = '[Profile] Toggle Favorite';
  constructor(public productId: number) {}
}
