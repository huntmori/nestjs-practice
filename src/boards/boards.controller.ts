import { AuthGuard } from '@nestjs/passport';
import { Board } from './entities/board.entity';
import { BoardStatus } from './enum/board-status.enum';
import { BoardStatusValidationPipe } from './pipe/board-status-validation.pipe';
import { CreateBoardDto } from './dto/createBoard.dto';
import { BoardsService } from './boards.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  public createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    console.log('title', createBoardDto.title);
    console.log('description', createBoardDto.description);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  public getBoardById(@Param('id') id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): void {
    this.boardsService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    console.log(`id : ${id}`);
    console.log(`status : ${status}`);
    return this.boardsService.updateBoardStatus(id, user, status);
  }

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoard();
  }

  @Get('/user/my')
  getThisUserBoard(@GetUser() user: User): Promise<Board[]> {
    console.log('user', user);
    // console.log('/boards/my');
    return this.boardsService.getThisUserBoard(user);
  }

  @Get('/user/:id')
  getTargetUserBoard(@Param('id', ParseIntPipe) id: number): Promise<Board[]> {
    return this.boardsService.getTargetUserBoard(id);
  }
}
