export interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  role: string;
  iat?: number; // timestamp when the token was issued
  exp?: number; // timestamp when the token expires
}
