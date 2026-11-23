import {
  Body, Controller, HttpCode, Injectable, Module, Post, UnauthorizedException,
} from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule, PassportStrategy } from "@nestjs/passport";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IsEmail, IsString, MaxLength } from "class-validator";
import { requestValidationPipe } from "../common/request-validation.pipe";

const user = { id: 1, email: "student@example.com" };
const jwtSecret = process.env.JWT_SECRET || randomBytes(48).toString("hex");

// La cuenta y su clave de ejemplo son ficticias y se usan solo en local.
const salt = randomBytes(16);
const passwordHash = scryptSync("PrintLab2026", salt, 64);

class LoginDto {
  @IsEmail()
  @MaxLength(120)
  email!: string;

  @IsString()
  @MaxLength(128)
  password!: string;
}

@Injectable()
class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async login(dto: LoginDto) {
    const candidate = scryptSync(dto.password, salt, 64);
    if (dto.email.trim().toLowerCase() !== user.email || !timingSafeEqual(candidate, passwordHash)) {
      throw new UnauthorizedException("Credenciales incorrectas.");
    }
    const access_token = await this.jwt.signAsync({ sub: user.id });
    return { access_token };
  }
}

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      algorithms: ["HS256"],
    });
  }

  validate(payload: { sub: number }) {
    if (payload.sub !== user.id) throw new UnauthorizedException();
    return user;
  }
}

@Controller("auth")
class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("login")
  @HttpCode(200)
  login(@Body(requestValidationPipe) dto: LoginDto) {
    return this.auth.login(dto);
  }
}

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({ secret: jwtSecret, signOptions: { expiresIn: "3h", algorithm: "HS256" } }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
