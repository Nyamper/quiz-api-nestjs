export class CreateLeaderboardDto {
  username: string;
  category: string;
  quizName: string;
  time: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class PartialLeaderboardDto {
  id: string;
  spentTime: number;
  username: string;
}
