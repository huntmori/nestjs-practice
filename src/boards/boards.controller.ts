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
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoard(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    console.log('title', title);
    console.log('description', description);
    return this.boardsService.createBoard(title, description);
  }
}
