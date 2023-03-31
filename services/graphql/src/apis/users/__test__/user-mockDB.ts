export class MockUserService {
  mydb = [
    { email: 'aaa@aaa.com', password: '12341234', nickname: '짱구' },
    { email: 'qqq@qqq.com', password: '1q2w3e4r', nickname: '철수' },
    { email: 'www@www.com', password: 'qwerty12', nickname: '훈이' },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];

    const nicknames = this.mydb.filter((el) => el.nickname === where.nickname);
    if (nicknames.length) return nicknames[0];
    return null;
  }

  save({ email, password, nickname }) {
    this.mydb.push({ email, password, nickname });

    return { email, password, nickname };
  }
}
