export class MockPersonalMapsDb {
  body = {
    course: '장풍이가 만든 지도',
    startPoint: '서울시 구로구',
    endPoint: '서울시 관악구',
    info: [
      {
        restaurantName: '오비스트로',
        recommend: '까르보나라 파스타',
        location: {
          lat: 37.4938576,
          lng: 126.889008,
        },
      },
      {
        restaurantName: '샐러드박스 구로 지타워몰점',
        recommend: '맛있는 샐러드',
        location: {
          lat: 37.4800597,
          lng: 126.8950651,
        },
      },
      {
        restaurantName: '전라도밥상',
        recommend: '뽕쟁이 족발',
        location: {
          lat: 37.4823711,
          lng: 126.8972692,
        },
      },
    ],
  };
  result = [
    {
      _id: '641cebe87b24b54160a21935',
      section: '서울시 구로구',
      restaurantName: '오비스트로',
      address: '대한민국 서울특별시 구로구 구로동 번지 101호 85-12',
      location: {
        lat: 37.4938576,
        lng: 126.889008,
      },
      userRatingsTotal: '77',
      phoneNumber: '010-4443-6751',
      openingDays: [
        '월요일: 휴무일',
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
      _id: '641cebe87b24b54160a21938',
      section: '서울시 구로구',
      restaurantName: '샐러드박스 구로 지타워몰점',
      address: '대한민국 서울특별시 구로구 디지털로26길 38 지하3층',
      location: {
        lat: 37.4800597,
        lng: 126.8950651,
      },
      userRatingsTotal: '2',
      phoneNumber: null,
      openingDays: null,
      rating: '5',
      __v: 0,
    },
    {
      _id: '641d3c37f0af05bacfac0037',
      section: '서울시 구로구',
      restaurantName: '전라도밥상',
      location: {
        lat: 37.4823711,
        lng: 126.8972692,
      },
      userRatingsTotal: '8',
      phoneNumber: '02-6124-5666',
      openingDays: [
        '월요일: 오전 11:30 ~ 오후 9:30',
        '화요일: 오전 11:30 ~ 오후 9:30',
        '수요일: 오전 11:30 ~ 오후 9:30',
        '목요일: 오전 11:30 ~ 오후 9:30',
        '금요일: 오전 11:30 ~ 오후 9:30',
        '토요일: 오전 11:30 ~ 오후 9:30',
        '일요일: 오전 11:30 ~ 오후 9:30',
      ],
      rating: '3.9',
      __v: 0,
    },
  ];
}
