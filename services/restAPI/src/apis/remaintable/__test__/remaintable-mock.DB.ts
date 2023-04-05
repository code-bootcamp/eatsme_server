import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class MockRemainTableRepository {
  restaurantInfo = [
    {
      _id: '641a99d0a08af8b1067f88aa',
      section: '서울시 종로구',
      restaurantName: '헤비스테이크 종로구청점',
      address: '대한민국 서울특별시 종로구 삼봉로 42',
      location: {
        lat: 37.572337,
        lng: 126.9795505,
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
      _id: '641a99d0a08af8b1067f88ad',
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
      _id: '641a99d0a08af8b1067f88b0',
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
      _id: '641a99d0a08af8b1067f88b3',
      section: '서울시 종로구',
      restaurantName: '엘샌드위치',
      address: '대한민국 서울특별시 종로구 율곡로4길 14',
      location: {
        lat: 37.5750186,
        lng: 126.981752,
      },
      userRatingsTotal: '79',
      phoneNumber: '02-723-2589',
      openingDays: [
        '월요일: 오전 9:00 ~ 오후 9:00',
        '화요일: 오전 9:00 ~ 오후 9:00',
        '수요일: 오전 9:00 ~ 오후 9:00',
        '목요일: 오전 9:00 ~ 오후 9:00',
        '금요일: 오전 9:00 ~ 오후 9:00',
        '토요일: 오전 10:00 ~ 오후 9:00',
        '일요일: 오전 10:00 ~ 오후 9:00',
      ],
      rating: '4.6',
      __v: 0,
    },
    {
      _id: '641a99d0a08af8b1067f88b6',
      section: '서울시 종로구',
      restaurantName: '스페이스오',
      address:
        '대한민국 KR 서울특별시 종로구 인사동길 49 나인트리호텔 스페이스오 12층',
      location: {
        lat: 37.5746689,
        lng: 126.9831217,
      },
      userRatingsTotal: '43',
      phoneNumber: '02-737-4222',
      openingDays: [
        '월요일: 오전 11:00 ~ 오후 11:00',
        '화요일: 오전 11:00 ~ 오후 11:00',
        '수요일: 오전 11:00 ~ 오후 11:00',
        '목요일: 오전 11:00 ~ 오후 11:00',
        '금요일: 오전 11:00 ~ 오후 11:00',
        '토요일: 오전 11:00 ~ 오후 11:00',
        '일요일: 휴무일',
      ],
      rating: '4.5',
      __v: 0,
    },
    {
      _id: '641a99d3a08af8b1067f88b9',
      section: '서울시 종로구',
      restaurantName: '장가네',
      address: '대한민국 서울특별시 종로구 중학동 종로1길 57',
      location: {
        lat: 37.5754026,
        lng: 126.9789565,
      },
      userRatingsTotal: '47',
      phoneNumber: '02-732-7522',
      openingDays: [
        '월요일: 오전 11:00 ~ 오후 9:00',
        '화요일: 오전 11:00 ~ 오후 9:00',
        '수요일: 오전 11:00 ~ 오후 9:00',
        '목요일: 오전 11:00 ~ 오후 9:00',
        '금요일: 오전 11:00 ~ 오후 9:00',
        '토요일: 오전 11:00 ~ 오후 9:00',
        '일요일: 오전 11:00 ~ 오후 9:00',
      ],
      rating: '4.6',
      __v: 0,
    },
    {
      _id: '641a99d3a08af8b1067f88bc',
      section: '서울시 종로구',
      restaurantName: '암소서울',
      address: '대한민국 서울특별시 종로구 신문로1가 새문안로 76 B1',
      location: {
        lat: 37.5697911,
        lng: 126.9728243,
      },
      userRatingsTotal: '231',
      phoneNumber: '02-6744-0123',
      openingDays: [
        '월요일: 오전 11:30 ~ 오후 10:00',
        '화요일: 오전 11:30 ~ 오후 10:00',
        '수요일: 오전 11:30 ~ 오후 10:00',
        '목요일: 오전 11:30 ~ 오후 10:00',
        '금요일: 오전 11:30 ~ 오후 10:00',
        '토요일: 오전 11:00 ~ 오후 10:00',
        '일요일: 오전 11:00 ~ 오후 10:00',
      ],
      rating: '4.6',
      __v: 0,
    },
    {
      _id: '641a99d3a08af8b1067f88bf',
      section: '서울시 종로구',
      restaurantName: '온지음',
      address: '대한민국 서울특별시 종로구 효자로 49 4층',
      location: {
        lat: 37.5804867,
        lng: 126.9733488,
      },
      userRatingsTotal: '80',
      phoneNumber: '02-6952-0024',
      openingDays: [
        '월요일: 휴무일',
        '화요일: 오후 12:00~10:00',
        '수요일: 오후 12:00~10:00',
        '목요일: 오후 12:00~10:00',
        '금요일: 오후 12:00~10:00',
        '토요일: 휴무일',
        '일요일: 휴무일',
      ],
      rating: '4.7',
      __v: 0,
    },
  ];
  remainTables = [
    {
      _id: 'bd33bca9-3a69-4f4b-aafa-9d91902eb4ee',
      remainTable: 1,
      reservation_time: 1,
      restaurant: {
        _id: '1f440225-d3e1-495b-a94e-874f7750d3cd',
        area: '서울시',
        section: '종로구',
        restaurantName: '헤비스테이크 종로구청점',
        address: '대한민국 서울특별시 종로구 삼봉로 42',
        location: {
          lat: 37.572337,
          lng: 126.9795505,
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
      },
    },

    {
      _id: '1f440225-d3e1-495b-a94e-874f7750d3cd',
      remainTable: 1,
      reservation_time: 1,
      restaurant: {
        _id: '05858a63-3ae9-4e21-8933-d7cbefb661dc',
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
    },
    {
      _id: '1f440225-2134-495b-a94e-874f7750d3cd',
      remainTable: 0,
      reservation_time: 1,
      restaurant: {
        _id: '05858a63-aaaa-4e21-8933-d7cbefb661dc',
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
    },
  ];

  findOne(query) {
    const { restaurant, reservation_time } = query;
    const restaurants = this.remainTables.filter((el) => {
      return (
        el.restaurant._id === restaurant.id &&
        el.reservation_time === reservation_time
      );
    });
    if (restaurants.length > 0) {
      return {
        ...restaurants[0],
        exec: jest.fn().mockResolvedValue(restaurants[0]),
      };
    }
    throw new ConflictException('식당정보가 없습니다.');
  }

  updateOne({ _id }, { $inc: { remainTable } }) {
    const restaurant = this.remainTables.filter((el) => {
      return el._id === _id;
    });
    if (20 - restaurant[0].remainTable > Number(remainTable)) {
      this.remainTables.forEach(
        (el) => (el.reservation_time += Number(remainTable)),
      );
      return { matchedCount: true };
    }
    return { matchedCount: false };
  }
}
