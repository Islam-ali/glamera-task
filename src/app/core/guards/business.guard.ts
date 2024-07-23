import { CanActivateFn } from '@angular/router';

export const businessGuard: CanActivateFn = (route, state) => {

  if(!localStorage.getItem('business')) {
    return false;
  }

  return true;
};
