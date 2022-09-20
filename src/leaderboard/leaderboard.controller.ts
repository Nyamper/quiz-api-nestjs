import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { PartialLeaderboardDto } from './dto/create-leaderboard.dto';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post()
  addUserToLeadderboard(@Body() partialLeaderboardDto: PartialLeaderboardDto) {
    return this.leaderboardService.addUserToLeaderboard(partialLeaderboardDto);
  }

  @Get()
  getLeaderboard() {
    return this.leaderboardService.getLeaderboard();
  }
}
