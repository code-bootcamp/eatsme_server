import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';

export class MockUserRepository {
  database = [
    {
      id: '3a5c87ac-41da-4719-aebb-425e36c4fd1f',
      email: 'a1@a.com',
      password: '1234',
      nickname: '짱아',
      userImg: 'http://~~.png',
      reservations: [
        {
          restaurant_id: '0aee4419-25e6-4cbe-b286-6a895cd7ea51',
          time: '2023-03-31',
          reservation_time: 1,
          table: 1,
        },
        {
          restaurant_id: '05858a63-3ae9-4e21-8933-d7cbefb661dc',
          time: '2023-03-31',
          reservation_time: 1,
          table: 1,
        },
        {
          restaurant_id: '05858a63-qwer-4e21-8933-d7cbefb661dc',
          time: '2023-03-31',
          reservation_time: 1,
          table: 1,
        },
      ],
    },
  ];

  findOne({ where }) {
    const user = this.database.filter((el) => el.id === where.id);

    if (user.length) return user[0];

    throw new ConflictException('등록되지 않은 회원입니다.');
  }
}

export class MockRestaurantRepository {
  restaurant = [
    {
      _id: '1f440225-d3e1-495b-a94e-874f7750d3cd',
      section: '서울시 종로구',
      restaurantName: '헤비스테이크 종로구청점',
      address: '대한민국 서울특별시 종로구 삼봉로 42',
      location: {
        lat: '37.572337',
        lng: '126.9795505',
      },
      userRatingsTotal: '1923',
      phoneNumber: '02-733-3309',
      openingDays: [
        '월요일: 오전 11:00 ~ 오후 9:00',
        '화요일: 오전 11:00 ~ 오후 9:00',
        '수요일: 오전 11:00 ~ 오후 9:00',
        '목요일: 오전 11:00 ~ 오후 9:00',
        '금요일: 오전 11:00 ~ 오후 9:00',
        '토요일: 오전 11:00 ~ 오후 9:00',
        '일요일: 오전 11:00 ~ 오후 9:00',
      ],
      rating: '4.8',
      __v: 0,
    },
    {
      _id: '0b8f8a92-67fa-480d-93ed-057401790551',
      section: '서울시 종로구',
      restaurantName: '질할브로스 디타워점',
      address: 'D Tower, Soho Street, 17 종로3길 종로구 서울특별시 대한민국',
      location: {
        lat: 37.570528,
        lng: 126.9789736,
      },
      userRatingsTotal: '30',
      phoneNumber: '02-2251-8122',
      openingDays: [
        '월요일: 오전 11:00 ~ 오후 10:00',
        '화요일: 오전 11:00 ~ 오후 10:00',
        '수요일: 오전 11:00 ~ 오후 10:00',
        '목요일: 오전 11:00 ~ 오후 10:00',
        '금요일: 오전 11:00 ~ 오후 10:00',
        '토요일: 오전 11:00 ~ 오후 10:00',
        '일요일: 오전 11:00 ~ 오후 10:00',
      ],
      rating: '4.5',
      __v: 0,
    },
    {
      _id: '05858a63-3ae9-4e21-8933-d7cbefb661dc',
      section: '서울시 종로구',
      restaurantName: '슈가스컬 종로점',
      address: '대한민국 8F~9F 종로구 관철동 18-10 KR 서울특별시',
      location: {
        lat: 37.5696352,
        lng: 126.9847142,
      },
      userRatingsTotal: '102',
      phoneNumber: '050-71442-8704',
      openingDays: [
        '월요일: 오전 11:00 ~ 오후 10:00',
        '화요일: 오전 11:00 ~ 오후 10:00',
        '수요일: 오전 11:00 ~ 오후 10:00',
        '목요일: 오전 11:00 ~ 오후 10:00',
        '금요일: 오전 11:00 ~ 오후 10:00',
        '토요일: 오전 11:00 ~ 오후 10:00',
        '일요일: 오전 11:00 ~ 오후 10:00',
      ],
      rating: '4.5',
      __v: 0,
    },
    {
      _id: '05858a63-aaaa-4e21-8933-d7cbefb661dc',
      section: '서울시 종로구',
      restaurantName: '슈가스컬 종로점',
      address: '대한민국 8F~9F 종로구 관철동 18-10 KR 서울특별시',
      location: {
        lat: 37.5696352,
        lng: 126.9847142,
      },
      userRatingsTotal: '102',
      phoneNumber: '050-71442-8704',
      openingDays: [
        '월요일: 오전 11:00 ~ 오후 10:00',
        '화요일: 오전 11:00 ~ 오후 10:00',
        '수요일: 오전 11:00 ~ 오후 10:00',
        '목요일: 오전 11:00 ~ 오후 10:00',
        '금요일: 오전 11:00 ~ 오후 10:00',
        '토요일: 오전 11:00 ~ 오후 10:00',
        '일요일: 오전 11:00 ~ 오후 10:00',
      ],
      rating: '4.5',
      __v: 0,
    },
  ];
}

export class MockReservationsRepository {
  reservation = [
    {
      id: 'ff8fb024-fd2b-4261-a3ee-50f4b22aaf19',
      table: 1,
      time: '2023-03-31',
      reservation_time: 1,
      restaurant_id: '05858a63-3ae9-4e21-8933-d7cbefb661dc',
      users: [
        {
          id: '3a5c87ac-41da-4719-aebb-425e36c4fd1f',
          email: 'a1@a.com',
          password: '1234',
          nickname: '짱아',
          userImg: 'http://~~.png',
        },
      ],
    },
  ];

  save({ table, time, reservation_time, restaurant_id, users }) {
    const id = '임의아이디';

    this.reservation.push({
      id,
      table,
      time,
      reservation_time,
      restaurant_id,
      users,
    });
    return {
      id,
      table,
      time,
      reservation_time,
      restaurant_id,
      users,
    };
  }

  delete({ restaurant_id }) {
    const reservation = this.reservation.filter((el, i) => {
      if (el.restaurant_id === restaurant_id) {
        return this.reservation.splice(i - 1, i);
      }
    });
    return reservation ? { affected: true } : { affecfed: false };
  }
}
