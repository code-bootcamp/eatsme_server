import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IUserFindOneByUser,
  IUsersCheckNickname,
  IUsersCreate,
  IUsersFindOneByEmail,
  IUsersFindOneByNickname,
  IUsersSendToTemplate,
} from './interfaces/user-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly mailerService: MailerService,
  ) {}

  //-----유저id확인-----
  async findOneByUser({ userId }: IUserFindOneByUser): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new ConflictException('등록되지 않은 회원입니다.');
    return user;
  }

  //-----이메일 만드는 방식 확인-----
  async checkEmail({ email }: IUsersFindOneByEmail): Promise<string> {
    if (!email || !email.includes('@') || 30 <= email.length) {
      throw new ConflictException('제대로된 이메일을 입력해주세요');
    }
    await this.isFindOneByEmail({ email });
    // await this.sendToTemplate({ email });
    return email;
  }

  //-----이메일인증번호 템플릿 전송-----
  async sendToTemplate({ email }: IUsersSendToTemplate) {
    const authNumber = String(Math.floor(Math.random() * 1000000)).padStart(
      6,
      '0',
    );

    const eatsMeTemplate = `
    <html>
        <body>
            <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 500px;">
                    <h1>EatsMe에서 전송한 인증번호입니다.</h1>
                    <hr />
                    <div style="color: black;">인증번호는 ${authNumber} 입니다.</div>
                </div>
            </div>
        </body>
    </html>
  `;
    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'EatsMe 인증 번호입니다', //이메일 제목
      html: eatsMeTemplate,
    });
    return authNumber;
  }

  //-----이메일 db 유무확인-----
  async isFindOneByEmail({ email }: IUsersFindOneByEmail): Promise<User> {
    const isValidEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (isValidEmail) {
      throw new ConflictException('이미 회원가입이 되어있는 이메일입니다.');
    }
    return isValidEmail;
  }

  //-----닉네임 값 존재 확인-----
  async checkNickname({
    nickname, //
  }: IUsersCheckNickname): Promise<string> {
    if (!nickname) {
      throw new ConflictException('닉네임을 입력해주세요');
    }
    return nickname;
  }

  //-----닉네임 db 유무확인 &&-----
  async isFindOneByNickname({
    nickname,
  }: IUsersFindOneByNickname): Promise<User> {
    const isValidNickname = await this.userRepository.findOne({
      where: { nickname },
    });

    if (isValidNickname) {
      throw new ConflictException('이미 사용하고있는 닉네임입니다.');
    }
    return isValidNickname;
  }

  //-----회원가입-----
  async create({ createUserInput }: IUsersCreate): Promise<User> {
    const { email, password, nickname } = createUserInput;

    await this.checkEmail({ email });

    await this.isFindOneByEmail({ email });

    await this.isFindOneByNickname({ nickname });

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.save({
      email,
      password: hashedPassword,
      nickname,
    });
  }

  // //-----유저정보변경----- //로그인코드 만든 후 다시 작업
  // async update({
  //   userId,
  //   password,
  //   userImg,
  // }: IUpdateUserServiceInput): Promise<User> {
  //   const user = await this.findOneByUser({ userId });

  //   //이미지 후에 다시 리팩토링 필요!
  //   return this.userRepository.save({
  //     ...user,
  //     password,
  //     userImg,
  //   });
  // }
}
