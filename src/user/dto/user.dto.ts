export class UserDto {
  readonly _id?: string;
  readonly username: string;
  readonly password: string;
  readonly token?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
