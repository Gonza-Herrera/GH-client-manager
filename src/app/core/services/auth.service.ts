import { Injectable, computed, inject } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private afAuth = inject(Auth);
  private user$ = authState(this.afAuth);
  user = toSignal<User | null>(this.user$, { initialValue: null });

  isLoggedIn = computed(() => !!this.user());

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.afAuth, email, password);
  }

  async logout() {
    await signOut(this.afAuth);
  }
  
}
