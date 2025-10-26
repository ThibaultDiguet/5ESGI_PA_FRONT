import {Injectable} from '@angular/core';
import {delay, Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly validEmail = 'user@example.com';
  private readonly validOtp = '123456';

  sendOtp(email: string): Observable<{ success: boolean }> {
    // Simulation d'un délai réseau de 1 seconde
    return of({success: true}).pipe(delay(1000));
  }

  verifyOtp(email: string, otp: string): Observable<{ token: string }> {
    // Simulation d'une vérification OTP
    if (email === this.validEmail && otp === this.validOtp) {
      // Retourne un "faux" token
      return of({token: 'fake-jwt-token-123'}).pipe(delay(1000));
    } else {
      return throwError(() => new Error('Code invalide')).pipe(delay(1000));
    }
  }
}
