import http from '@/shared/services/http-common';
import type { SignInRequest } from '@/auth/model/request/sign-in.request';
import type { SignUpRequest } from '@/auth/model/request/sign-up.request';
import type { SignInResponse } from '@/auth/model/response/sign-in.response';

export class AuthenticationService {
  async signIn(signInRequest: SignInRequest): Promise<SignInResponse> {
    const response = await http.post<SignInResponse>('/authentication/sign-in', signInRequest);
    return response.data;
  }

  async signUp(signUpRequest: SignUpRequest): Promise<void> {
    await http.post('/authentication/sign-up', signUpRequest);
  }
}