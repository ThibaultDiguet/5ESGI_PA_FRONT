export interface Client {
  uuid: string;
  loyaltyCode: string;
  name: string;
  mail: string;
  otp_hash: number;
  otp_hash_expiration: Date
}
