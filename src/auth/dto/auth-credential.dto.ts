import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4, {
    message: 'username must be longer than or equal to 4 characters',
  })
  @MaxLength(20, {
    message: 'username must be shorter than or equal to 20 characters',
  })
  username: string;

  @IsString()
  @MinLength(4, {
    message: 'password must be longer than or equal to 4 characters',
  })
  @MaxLength(20, {
    message: 'password must be shorter than or equal to 20 characters',
  })
  // 영어랑 숫자만
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accept alpah or num',
  })
  password: string;
}
