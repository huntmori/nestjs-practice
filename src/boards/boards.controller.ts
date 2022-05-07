import { CreateBoardDto } from './dto/createBoard.dto';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('boards')
export class BoardsController {
  // private boardsService: BoardsService;

  // constructor(boardsService: BoardsService) {
  //   this.boardsService = boardsService;
  // }
  constructor(private boardsService: BoardsService) {}

  @Get()
  public getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  public createBoard(@Body() createBoardDto: CreateBoardDto) {
    console.log('title', createBoardDto.title);
    console.log('description', createBoardDto.description);
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/:id')
  public getBoardById(@Param('id') id: string) {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }
}
