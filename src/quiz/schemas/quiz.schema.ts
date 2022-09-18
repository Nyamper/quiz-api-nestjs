import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema({ versionKey: false, timestamps: true })
export class Question {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answers: string[];

  @Prop({ required: true })
  correctAnswer: string;
}
export const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema({ versionKey: false, timestamps: true })
export class Quiz {
  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  quizName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  cardImageUrl: string;

  @Prop({ required: true, type: [QuestionSchema], default: [] })
  questions: Question[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
