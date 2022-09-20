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
    return quizzes.map((quiz) => ({
      category: quiz.category,
      quiz: quiz.quizName,
      id: quiz.id,
      description: quiz.description,
      cardImageUrl: quiz.cardImageUrl,
    }));
  }

  public async getQuiz(id: string) {
    const quiz = await this.quizModel.findById(id);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    const noCorrectAnswers = {
      category: quiz.category,
      quizName: quiz.quizName,
      id: quiz._id,
      description: quiz.description,
      cardImageUrl: quiz.cardImageUrl,
      questions: quiz.questions.map((question) => {
        return {
          question: question.question,
          answers: this.shaffleAnswers(question.answers),
        };
      }),
    };
    return noCorrectAnswers;
  }

  private shaffleAnswers(answers: string[]) {
    return answers.sort(() => Math.random() - 0.5);
  }

  public async getQuizAnswers(id: string) {
    const quiz = await this.quizModel.findById(id);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    return quiz.questions.map((question) => {
      return {
        question: question.question,
        answers: question.answers,
        correctAnswer: question.correctAnswer,
      };
    });
  }
}
