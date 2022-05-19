import { BoardStatus } from './enum/board-status.enum';
import { Board } from './entities/board.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CreateBoardDto } from './dto/createBoard.dto';
import { v1 as uuid } from 'uuid';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const boardItem = this.create({
      uuid: uuid(),
      title: title,
      description,
      status: BoardStatus.PUBLIC,
      user: user,
    });

    await this.save(boardItem);

    return boardItem;
  }
}
