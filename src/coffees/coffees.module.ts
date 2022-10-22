import { Module, Scope } from "@nestjs/common";
import { CoffeesController } from "./coffees.controller";
import { CoffeesService } from "./coffees.service";
import { Coffee, CoffeeSchema } from "./entities/coffee.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { Event, EventSchema } from "../events/entities/event.entity";
import { COFFEES_BRANDS } from "./coffees.constants";

class MockCoffeeService {
}

class ConfigService {
}

class DevelopmentConfigService {
}

class ProductionConfigService {
}

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Coffee.name,
        schema: CoffeeSchema
      },
      {
        name: Event.name,
        schema: EventSchema
      }
    ])
  ],
  controllers: [CoffeesController],
  // providers: [{provide: CoffeesService, useValue: new MockCoffeeService()}],
  providers: [
    CoffeesService,
    // {
    //   provide: ConfigService,
    //   useClass: process.env.NODE_ENV === "development"
    //     ? DevelopmentConfigService
    //     : ProductionConfigService
    // },
    // { provide: COFFEES_BRANDS, useValue: ["Gloria Jeans", "La Cafe"] }
    { provide: COFFEES_BRANDS, useFactory: () => ["Gloria Jeans", "La Cafe"],
    scope: Scope.REQUEST}
  ],
  exports: [CoffeesService]
})
export class CoffeesModule {
}
