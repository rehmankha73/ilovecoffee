import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoffeesModule } from "./coffees/coffees.module";
import { MongooseModule } from "@nestjs/mongoose";
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeesModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
