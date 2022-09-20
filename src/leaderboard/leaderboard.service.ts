import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from 'src/quiz/schemas/quiz.schema';
import { PartialLeaderboardDto } from './dto/create-leaderboard.dto';
import { Leaderboard } from './schemas/leaderboard.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<QuizDocument>,
    @InjectModel(Leaderboard.name)
    private readonly leaderboardModel: Model<Leaderboard>,
  ) {}
  async addUserToLeaderboard({
    id,
    spentTime,
    username,
  }: PartialLeaderboardDto) {
    const id2 = new ObjectId(id);
    const quiz = await this.quizModel.findById(id2);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const leaderBoard = new this.leaderboardModel({
      username,
      category: quiz.category,
      quizName: quiz.quizName,
      time: spentTime,
    });

    return await leaderBoard.save();
  }

  getLeaderboard() {
    const leaderboard = this.leaderboardModel.find();
    return leaderboard.sort({ time: 1 });
  }
}
