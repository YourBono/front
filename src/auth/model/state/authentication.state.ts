import type { SignInRequest } from "../request/sign-in.request";
import type { SignUpRequest } from "../request/sign-up.request";
import type { NavigateFunction } from "react-router-dom";

export interface AuthenticationState {
  isSignedIn: boolean;
  userId: number;
  username: string;
  currentToken: () => string | null;
  signIn: (request: SignInRequest, navigate: NavigateFunction) => Promise<void>;
  signUp: (request: SignUpRequest, navigate: NavigateFunction) => Promise<void>;
  signOut: (navigate: NavigateFunction) => void;
}