import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { describe } from "node:test";
import { async } from "rxjs";
import { User } from "src/apis/users/entities/user.entity";
import { UserService } from "src/apis/users/users.service";
import { MockUserService } from "src/apis/users/__test__/user-mockDB";
import { Repository } from "typeorm";
import { CommentsService } from "../comments.service";

describe('commentService', () => {
 let commentsService: CommentsService;
 let userRepository: Repository<User>;
 let usersService: UserService;

 beforeEach(async () => {
   const moduleRef: TestingModule = await Test.createTestingModule({
    providers: [
     CommentsService, //
     UserService,
     {
      provide: getRepositoryToken(User),
      useClass: MockUserService,
     },
    ],
   }).compile();
   commentsService =  moduleRef.get<CommentsService>(CommentsService);
   usersService =  moduleRef.get<UserService>(UserService);
 });

//  describe('createComment', () => {
//   it('로그인 인증한 유저가 게시판을 생성할 경우', async () => {

//   })
//  })
})