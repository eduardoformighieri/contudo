export interface JwtPayload {
  sub: string;
  iat?: number; // timestamp when the token was issued
  exp?: number; // timestamp when the token expires
}
