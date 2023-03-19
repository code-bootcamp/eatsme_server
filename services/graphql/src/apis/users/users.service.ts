import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IUsersCreate,
  IUsersFindOneByEmail,
  IUsersFindOneByNickname,
} from './interfaces/user-service.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly mailerService: MailerService,
  ) {}

  //-----이메일 만드는 방식 확인-----
  async checkEmail({ email }) {
    if (!email || !email.includes('@') || 30 <= email.length) {
      console.log('@@@@@@@@@@@@@@', email);
      throw new ConflictException('제대로된 이메일을 입력해주세요');
    }
  }

  //-----이메일인증번호 템플릿 전송-----
  async sendToTemplate({ email }) {
    const token = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    //mytemplate 안
    const mytemplate = `
    <html>
        <body>
            <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 500px;">
                    <h1>EatsMe에서 전송한 인증번호입니다.</h1>
                    <hr />
                    <div style="color: black;">인증번호는 ${token} 입니다.</div>
                </div>
            </div>
        </body>
    </html>
  `;
    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'EatsMe 인증 번호입니다', //이메일 제목
      html: mytemplate,
    });
    return token;
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

  //-----닉네임 db 유무확인-----
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

    return this.userRepository.save({
      email,
      password,
      nickname,
    });
  }
}
