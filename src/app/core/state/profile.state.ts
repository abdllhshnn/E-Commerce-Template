import { Injectable, inject } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';
import { Product } from '../models/product.model';
import {
  UpdateProfile, UpdateProfileSuccess, UpdateProfileFailed,
  ChangePassword, ChangePasswordSuccess, ChangePasswordFailed,
  LoadFavorites, ToggleFavorite,
} from './actions/profile.actions';

export interface ProfileStateModel {
  favorites: Product[];
  favoritesLoaded: boolean;
  profileLoading: boolean;
  profileMessage: { type: 'success' | 'error'; text: string } | null;
  passwordLoading: boolean;
  passwordMessage: { type: 'success' | 'error'; text: string } | null;
}

const defaults: ProfileStateModel = {
  favorites: [],
  favoritesLoaded: false,
  profileLoading: false,
  profileMessage: null,
  passwordLoading: false,
  passwordMessage: null,
};

@State<ProfileStateModel>({
  name: 'profile',
  defaults,
})
@Injectable()
export class ProfileState {
  private profileService = inject(ProfileService);

  @Selector()
  static favorites(state: ProfileStateModel): Product[] {
    return state.favorites;
  }

  @Selector()
  static favoritesLoaded(state: ProfileStateModel): boolean {
    return state.favoritesLoaded;
  }

  @Selector()
  static profileLoading(state: ProfileStateModel): boolean {
    return state.profileLoading;
  }

  @Selector()
  static profileMessage(state: ProfileStateModel): { type: 'success' | 'error'; text: string } | null {
    return state.profileMessage;
  }

  @Selector()
  static passwordLoading(state: ProfileStateModel): boolean {
    return state.passwordLoading;
  }

  @Selector()
  static passwordMessage(state: ProfileStateModel): { type: 'success' | 'error'; text: string } | null {
    return state.passwordMessage;
  }

  @Action(LoadFavorites)
  loadFavorites(ctx: StateContext<ProfileStateModel>) {
    return this.profileService.getFavorites().pipe(
      tap((favorites) => ctx.patchState({ favorites, favoritesLoaded: true })),
    );
  }

  @Action(ToggleFavorite)
  toggleFavorite(ctx: StateContext<ProfileStateModel>, action: ToggleFavorite) {
    this.profileService.toggleFavorite(action.productId);
    return this.profileService.getFavorites().pipe(
      tap((favorites) => ctx.patchState({ favorites })),
    );
  }

  @Action(UpdateProfile)
  updateProfile(ctx: StateContext<ProfileStateModel>, action: UpdateProfile) {
    ctx.patchState({ profileLoading: true, profileMessage: null });
    return this.profileService.updateProfile(action.data).pipe(
      tap((res) => {
        if (res.success) {
          ctx.dispatch(new UpdateProfileSuccess(res.message));
        } else {
          ctx.dispatch(new UpdateProfileFailed(res.message));
        }
      }),
    );
  }

  @Action(UpdateProfileSuccess)
  updateProfileSuccess(ctx: StateContext<ProfileStateModel>, action: UpdateProfileSuccess) {
    ctx.patchState({
      profileLoading: false,
      profileMessage: { type: 'success', text: action.message },
    });
  }

  @Action(UpdateProfileFailed)
  updateProfileFailed(ctx: StateContext<ProfileStateModel>, action: UpdateProfileFailed) {
    ctx.patchState({
      profileLoading: false,
      profileMessage: { type: 'error', text: action.message },
    });
  }

  @Action(ChangePassword)
  changePassword(ctx: StateContext<ProfileStateModel>, action: ChangePassword) {
    ctx.patchState({ passwordLoading: true, passwordMessage: null });
    return this.profileService.changePassword(action.data).pipe(
      tap((res) => {
        if (res.success) {
          ctx.dispatch(new ChangePasswordSuccess(res.message));
        } else {
          ctx.dispatch(new ChangePasswordFailed(res.message));
        }
      }),
    );
  }

  @Action(ChangePasswordSuccess)
  changePasswordSuccess(ctx: StateContext<ProfileStateModel>, action: ChangePasswordSuccess) {
    ctx.patchState({
      passwordLoading: false,
      passwordMessage: { type: 'success', text: action.message },
    });
  }

  @Action(ChangePasswordFailed)
  changePasswordFailed(ctx: StateContext<ProfileStateModel>, action: ChangePasswordFailed) {
    ctx.patchState({
      passwordLoading: false,
      passwordMessage: { type: 'error', text: action.message },
    });
  }
}
