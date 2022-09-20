import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto) {
    try {
      return this.quizService.addQuiz(createQuizDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return this.quizService.getAllQuizzes();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.quizService.getQuiz(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/answers/:id')
  async getQuizCorrectAnswers(@Param('id') id: string) {
    try {
      return this.quizService.getQuizAnswers(id);
    } catch (error) {
      console.log(error);
    }
  }
}
