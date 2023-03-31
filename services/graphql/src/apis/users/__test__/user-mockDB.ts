export class MockUserService {
  mydb = [
    { id: '1', email: 'aaa@aaa.com', password: '12341234', nickname: '짱구' },
    { id: '2', email: 'qqq@qqq.com', password: '1q2w3e4r', nickname: '철수' },
    { id: '3', email: 'www@www.com', password: 'qwerty12', nickname: '훈이' },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];

    const nicknames = this.mydb.filter((el) => el.nickname === where.nickname);
    if (nicknames.length) return nicknames[0];
    return null;
  }

  save({ id, email, password, nickname }) {
    this.mydb.push({ id, email, password, nickname });

    return { email, password, nickname };
  }

  update({ id, email, password, nickname }) {
    this.mydb.push({ id, email, password, nickname });
    return { password, nickname };
  }
}
