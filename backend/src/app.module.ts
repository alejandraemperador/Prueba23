import { Controller, Get, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { PrintRequestsModule } from "./print-requests/print-requests.module";

@Controller("health")
class HealthController {
  @Get()
  health() {
    return { status: "ok" };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "127.0.0.1",
      port: Number(process.env.DB_PORT ?? 5442),
      username: "print_lab",
      password: "print_lab_local",
      database: "print_lab",
      autoLoadEntities: true,
      // Solo para la base local, exclusiva y descartable de este ejercicio.
      synchronize: true,
      retryAttempts: 4,
      retryDelay: 1000,
    }),
    AuthModule,
    PrintRequestsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
