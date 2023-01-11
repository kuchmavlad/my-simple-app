import { Nullable } from "./globalTypes";
import { UserItem } from "./UserItem";

export interface AuthInitialStateProps {
  user: Nullable<UserItem>;
  signIn: (user: UserItem, cb: () => void) => void;
  signOut: (cb: () => void) => void;
}
