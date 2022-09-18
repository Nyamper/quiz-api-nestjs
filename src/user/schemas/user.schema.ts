import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TUser = User;

@Schema({ versionKey: false, timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);