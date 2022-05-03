import { CreateBoardDto } from './dto/createBoard.dto';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

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
}
