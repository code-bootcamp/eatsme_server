export class MockUserService {
  mydb = [
    {
      id: '1',
      email: 'aaa@aaa.com',
      password: '12341234',
      nickname: '짱구',
      userImg: null,
    },
    {
      id: '2',
      email: 'qqq@qqq.com',
      password: '1q2w3e4r',
      nickname: '철수',
      userImg: null,
    },
    {
      id: '3',
      email: 'www@www.com',
      password: 'qwerty12',
      nickname: '훈이',
      userImg: null,
    },
  ];

  findOne({ where }) {
    const isEmail = this.mydb.filter((el) => el.email === where.email);
    if (isEmail.length) return isEmail[0];

    const isNickname = this.mydb.filter((el) => el.nickname === where.nickname);
    if (isNickname.length) return isNickname[0];
    return null;
  }

  save({ id, email, password, nickname, userImg }) {
    // const a = { id, email, password, nickname, userImg };

    // const user = this.findOne({ where: { id } });

    this.mydb.push({ id, email, password, nickname, userImg });

    return { email, password, nickname };
  }
  // findOneByUser({});

  // updateUser({ userId, updateUserInput }) {
  //   const user = this.findOne({ where: { id: userId } });

  //   const keys = Object.keys(updateUserInput)[0];

  //   const value = user[keys];

  //   this.mydb.forEach((el) => {
  //     if (el.id === userId) {
  //       user[keys] === value;
  //     }
  // });
  // }
}

// 기존 데이터가 없으면 새로 넣고 , 있으면 업데이트,,,,!
