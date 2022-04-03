import { AuthorizationStatus } from '../../const';
import { State } from '../../types/state';
import { UserData } from '../../types/user-info-type';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state.DATA_USER.authorizationStatus;
export const getIsAuthorized = (state: State): boolean => state.DATA_USER.authorizationStatus === AuthorizationStatus.Auth;
export const getUserInfo = (state: State): UserData | null => state.DATA_USER.userInformation;
export const getUserLoadingStatus = (state: State): string | null => state.DATA_USER.loadingUserStatus;
export const getUserError = (state: State): string | null => state.DATA_USER.errorUser;
