import { MailerService } from '@nestjs-modules/mailer';
import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IUserFindOneByUser,
  IUsersCreate,
  IUsersFindOneByEmail,
  IUsersFindOneByNickname,
  IUsersSendToTemplate,
  IUsersUpdate,
} from './interfaces/user-service.interface';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import axios from 'axios';

import { ImagesService } from '../images/images.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly mailerService: MailerService,

    private readonly imagesService: ImagesService,
  ) {}

  //-----유저id확인-----
  async findOneByUser({ userId }: IUserFindOneByUser): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'reservations',
        'alarms',
        'boards.comments.replies',
        'boards',
      ],
    });
    if (!user) throw new ConflictException('등록되지 않은 회원입니다.');
    const restaurantIdArr = user.reservations.map((el) => el.restaurant_id);
    if (restaurantIdArr.length) {
      const reservationRestaurant = await axios.get(
        'http://road-service:7100/info/road/find/restaurant',
        { data: restaurantIdArr },
      );
      return {
        ...user,
        restaurant: reservationRestaurant.data,
      };
    }
    return {
      ...user,
    };
  }

  //-----유저email확인-----
  async findOneByEmail({ email }: IUsersFindOneByEmail): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');
    }
    return user;
  }

  //-----이메일 만드는 방식 확인-----
  async checkEmail({ email }: IUsersFindOneByEmail): Promise<string> {
    if (!email || !email.includes('@') || 30 <= email.length) {
      throw new ConflictException('제대로된 이메일을 입력해주세요');
    }
    await this.isFindOneByEmail({ email });

    await this.sendToAuthNumber({ email });

    // await this.sendToTemplate({ email });
    return email;
  }

  //-----이메일인증번호 템플릿 전송-----
  async sendToAuthNumber({ email }: IUsersSendToTemplate): Promise<string> {
    const authNumber = String(Math.floor(Math.random() * 1000000)).padStart(
      6,
      '0',
    );

    this.cacheManager.set(email, authNumber, {
      ttl: 180,
    });

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
    this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'EatsMe 인증 번호입니다', //이메일 제목
      html: eatsMeTemplate,
    });

    return '전송완료';
  }

  //-----인증번호 확인매치-----
  async matchAuthNumber({ matchAuthNumberInput }) {
    const { email, authNumber } = matchAuthNumberInput;
    const pass = await this.cacheManager.get(email);

    if (pass !== authNumber) {
      throw new UnprocessableEntityException('토큰이 잘못되었습니다.');
    }
    return true;
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

  //-----닉네임 db 유무확인 && 닉네임 값 존재 확인-----
  async isFindOneByNickname({
    nickname,
  }: IUsersFindOneByNickname): Promise<User> {
    const isValidNickname = await this.userRepository.findOne({
      where: { nickname },
    });
    if (!nickname) {
      throw new ConflictException('닉네임을 제대로 입력해주세요');
    }
    if (isValidNickname) {
      throw new ConflictException('이미 사용하고있는 닉네임입니다.');
    }
    return isValidNickname;
  }

  //-----회원가입환영template-----
  async welcomeToTemplate({ email, nickname }: IUsersSendToTemplate) {
    const eatsMeTemplate = `
    <html>
        <body>
            <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 500px;">
                    <h1>🌟🌟EatsMe 가입을 환영합니다🌟🌟</h1>
              
                    <div style="color: black;">${nickname}님의 가입을 환영합니다.</div>
                </div>
            </div>
        </body>
    </html>
  `;
    this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'EatsMe 가입을 환영합니다.', //이메일 제목
      html: eatsMeTemplate,
    });
  }

  //-----회원가입-----
  async createUser({ createUserInput }: IUsersCreate): Promise<User> {
    const { email, password, nickname } = createUserInput;

    if (!email || !email.includes('@') || 30 <= email.length) {
      throw new ConflictException('제대로된 이메일을 입력해주세요');
    }

    await this.isFindOneByEmail({ email });

    await this.isFindOneByNickname({ nickname });

    await this.welcomeToTemplate({ email, nickname });

    if (!password) {
      throw new ConflictException('제대로 비밀번호를 입력해주세요');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.save({
      email,
      password: hashedPassword,
      nickname,
    });
  }

  async updateUser({ userId, updateUserInput }: IUsersUpdate): Promise<User> {
    const user = await this.findOneByUser({ userId });

    if (user.userImg !== updateUserInput?.userImg) {
      this.imagesService.storageDelete({ storageDel: user.userImg });
    }

    if (updateUserInput.password) {
      const hashpw = await bcrypt.hash(updateUserInput.password, 10);
      return this.userRepository.save({
        ...user,
        ...updateUserInput,
        password: hashpw,
      });
    } else {
      return this.userRepository.save({
        ...user,
        ...updateUserInput,
      });
    }
  }
}
