class Question {
  readonly question: string;
  readonly answers: string[];
  readonly correctAnswer: string;
}

export class CreateQuizDto {
  readonly category: string;
  readonly quizName: string;
  readonly description: string;
  readonly cardImageUrl: string;
  readonly questions: Question[];
}
