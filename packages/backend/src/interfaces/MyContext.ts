import { Profile } from '../entity/Profile';

export interface MyContext {
  isAuthenticated: boolean;
  loggedUser: Profile | null;
}
