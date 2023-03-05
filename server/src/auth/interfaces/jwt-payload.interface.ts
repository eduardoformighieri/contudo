export interface JwtPayload {
  sub: string; // identificador do usuário
  username: string; // nome de usuário
  email: string; // endereço de email
  roles: string[]; // array com os cargos/roles do usuário
  iat?: number; // timestamp de quando o token foi emitido
  exp?: number; // timestamp de quando o token expira
}
