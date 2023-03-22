import * as bcrypt from 'bcrypt';

class MockAuthService {
  mydb = [
    { email: 'aaa@aaa.com', password: '1234qwer' }, //
    { email: 'qqq@qqq.com', password: '1q2w3e4r' },
  ];

  async findOne({ where }) {
    const user = await this.mydb.filter((el) => el.email === where.email);
    if (user.length) return user[0];

    const isAuth = await this.mydb.filter((el) =>
      bcrypt.compare(el.password, where.user.password),
    );
    console.log(isAuth, '@@@@@@@@@@@@@@@@@@@');
  }
}
