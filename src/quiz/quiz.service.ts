import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
// import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<QuizDocument>,
  ) {}

  async addQuiz(createQuizDto: CreateQuizDto) {
    const createdQuiz = await this.quizModel.create(createQuizDto);
    return createdQuiz;
  }

  async getAllQuizzes() {
    const quizzes = await this.quizModel.find();
    if (!quizzes) {
      throw new NotFoundException('No quizzes found');
    }
    return quizzes;
  }

  async getQuiz(id: string) {
    const quiz = await this.quizModel.findById(id);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }
}
