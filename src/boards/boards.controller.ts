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
  NotImplementedException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('boards')
export class BoardsController {
  // private boardsService: BoardsService;

  // constructor(boardsService: BoardsService) {
  //   this.boardsService = boardsService;
  // }
  constructor(private boardsService: BoardsService) {}

  @Get()
  public getAllBoard(): Board[] {
    // return this.boardsService.getAllBoards();
    throw new NotImplementedException();
  }

  @Post()
  @UsePipes(ValidationPipe)
  public createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    console.log('title', createBoardDto.title);
    console.log('description', createBoardDto.description);
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  public getBoardById(@Param('id') id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    console.log(`id : ${id}`);
    console.log(`status : ${status}`);
    return this.boardsService.updateBoardStatus(id, status);
  }
}
