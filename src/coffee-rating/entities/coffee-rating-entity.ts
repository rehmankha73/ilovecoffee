import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class CoffeeRating extends Document{
  @Prop()
  name: string;

  @Prop()
  coffee_id: string;

  @Prop()
  comment: string;

  @Prop()
  rating: number;
}

export const CoffeeRatingSchema = SchemaFactory.createForClass(CoffeeRating);
