import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Leaderboard {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  quizName: string;

  @Prop({ required: true })
  time: number;
}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);
