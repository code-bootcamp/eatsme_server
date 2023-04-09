# 🕊 [EatsMe](https://eatsme.site) 

기존 여행을가거나, 출장을 다닐 때 그 지역의 맛집에 대한 정보를 얻으려면 블로그나 SNS를 통해서 접하게 되는데, 

광고성 글들이 많아 방문 후 실망스러운 경험을 많이하는데 이러한 문제점을 해결하기위해 주관성이 높은 내가 추천하는 맛집과 

AI(chatGPT)를 통해서 객관적인 맛집 추천하는 서비스를 제공함으로서, 무분별한 광고성 맛집을 제거하고, 신뢰도가 있는 맛집을 소개하여, 

맛집찾는 시간을 줄이고, 여행의 질을 높인다.

<br/>

## 📆 프로젝트 기간

- 2023.03.13 - 2023.04.04

<br/>

## 🧱 아키택처


<img src="https://user-images.githubusercontent.com/105111888/229747590-7f8e5533-b9a7-4d02-b388-b8f3c9a14dfd.png" width="1000"/>

- 백엔드는 NestJs 서버를 구성.

- 대규모 서비스를 생각를 해서 MSA 방식을 채택.(독립적으로 개발과, 운용이 가능하고, 의존성이 낮아진다.)

- Nginx를 통해서 Api-GateWat를 만들어서 proxy_pass를 통해 MSA방식을 구축했다.

- 각각의 서버를 Docker-Container를 사용함으로써, 동일한 환경에서 작업할 수 있게 사용했다.

- Container 관리툴인 Kubernetes, ECS, Dokcer Swarm 중, Docker Swarm 를 채택했다.

- Kubernetes는 대규모 서비스에서 더 적합하고, 다루기가 어렵다, ECS(비용 문제)

- Dokcer Swarm은 소규모 서비스에 더 적합하고, CLI를 통해 간단하게 배포가 가능해 진다. -> Kubernetes 보다는 적은 기능을 가지고 있다.

- Github Action을 통해서 Image Build를 하고 VM SSH로 접속후 Docker Swarm Rolling 배포를 선택했다.

- Graphql, RestAPI 통신을 통해, 데이터의 효율성을 생각해 RestAPI <-> MongoDB(mongoose), Graphql <-> MySQL(TypeOrm)을 선택.

- Graphql은 원하는 정보만 받을 수 있기때문에 MySQL과 연결 해서 사용한다. -> 데이터의 전송량이 줄어들어 불필요한 데이터를 전송하지 않는다.

- RestAPI은 모든 정보를 다받기 때문에 데이터를 처리하는데 있어 빠른 MongoDB와 연결해서 사용했다.

- Redis를 통해 일회용성 데이터, 로그아웃시 토큰을 저장해 로그아웃 한 유저는 사용을 제한 하는 용도로 쓰이고 -> 추후 과제 : MySQL과 MongDB의 트랜잭션으로써 사용 하게 될 것이다.

<br/>

## 🏖 ERD

<img src="https://cdn.discordapp.com/attachments/1085810673411432513/1092751874672820224/2023-04-04_7.05.04.png" width="1000"/>

<br/>

## 🛠 기술 스택

![TypeScript](https://img.shields.io/badge/typescript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJs](https://img.shields.io/badge/nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Graphql](https://img.shields.io/badge/graphql-E10098.svg?style=for-the-badge&logo=graphql&logoColor=white)
<img src="https://images.velog.io/images/minsu8834/post/01a0c73b-5b5e-491c-ac11-9e5b6173240b/image.png" width=35> <pr>Rest Api</pr>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHIr7-CrooKTDdBG92EwA-pbNIsUh-9mJDMQ&usqp=CAU" width=25> <pr>Chat gpt</pr>
<br>
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white)
![Eslint](https://img.shields.io/badge/Eslint-4B32C3?style=for-the-badge&logo=Eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-47A248.svg?style=for-the-badge&logo=Nginx&logoColor=white)
<br>
![Mysql](https://img.shields.io/badge/MYSQL-4479A1?style=for-the-badge&logo=MYSQL&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-009639.svg?style=for-the-badge&logo=MongoDB&logoColor=white)
![GitHubActions](https://img.shields.io/badge/GitHubActions-2088FF.svg?style=for-the-badge&logo=GitHubActions&logoColor=white)
![GateWay](https://img.shields.io/badge/Gateway-FF4F8B.svg?style=for-the-badge&logo=AmazonAPIGateway&logoColor=white)
<img src="https://blog.kakaocdn.net/dn/4KSOB/btrIFICtbrP/xWAylv0m3JnmmI2XiAgsKK/img.png" width=25> <pr>Type Orm</pr>

<br>


<br>

<br/>

## 🕹️ 주요 기능

1. Chat Gpt를 통해서 원하는 정보를 받아올 수 있다.
2. 지역에 맞는 4.5이상의 맛집 정보를 불러올 수 있다.
3. 게시물 작성시 좌표를 하나씩 찍을때마다 실시간으로 반영되여 최적의 길찾기를 볼 수 있다.
4. 게시물에 댓글을 작성시 실시간으로 게시물을 작성한 유저에게 알람을 보내준다.
5. 맛집을 누르게 되었을시 지도에 좌표와 함께 표시 된다.


<br/>

## 📖 라이브러리

| 이름                 | 설명                     |
| :-----------------: | :--------------------- | 
| typeorm             | 객체지향적인 코드로 인해 직관적이고 로직에 더 집중할 수 있고 테이블 간 관계설정을 SQL에 비해 쉽게 할 수 있다는 장점때문에 대표적인 ORM인 Sequelize를 선택
| mongoose            | 스키마를 기반으로 객체 모델링을 지원하기때문(Camo와mongorito는 스키마를 지원하지 않는다.) mongoose는 작업 전후에 로직을 수행할 수 있어서 선택
| openai              | Chat Gpt 연동하는 라이브로써 사용됨
| axios               | Fetch API와는 달리 요청및 응답객체를 직접작성하지 않고 매서드와 속성을 제공하여 코드가 간결해지고, Promise 처리과정에서 에러를 catch블록으로 던져주기에 자동으로 에러를 다룰수 있으므로 axios를 사용한다.
| redis               | 클라이언트에서 동일한 요청이 계속 올때 서버에서 직접 데이터를 찾으면 상당히 비효율적이고 데이터의 크기에 따라 응답속도가 느려짐. 이때 요청결과를 미리 저장해 두었다가, 동일한 데이터 요청이 오면 바로 전달할 수 있도록 redis를 사용 
| bcrypt              | 해시 함수들은 무결성 검사를 위해 빠른 속도가 필요하지만, 해커가 DB를 탈취 했을때 빠른 속도로 비밀번호를 알아낼 수 있음. 패스워드 저장에서의 해시 함수의 문제점을 보완해서 나온것이 pbkfd2. 8글자 부터는 동일 시스템에서 bcrypt가 pbkfd2보다 4배 이상의 시간을 소모해야 비밀번호를 알아낼 수 있기 때문에 보안성을 위해 사용
| passport            | passport는 express 프레임워크 상에서 사용되는 인증 미들웨어 라이브러리. strategies로 알려져 있는 인증 메커니즘을 각 모듈로 패키지화해서 제공. 즉, 앱은 passport에서 지원하는 전략을 선택해 의존성 없이 독립적으로 이용 가능함
| nodemailer          | 이메일 인증을 위해서 이메일 전송에 필요한 네트워크 프로토콜인 SMTP(우편 전송 프로토콜)을 사용해야 함. Node.js SMTP기반으로 개발된 전용 모듈인 nodemailer는 사용법이 매우 간단하여 사용하게 됨
| eslint              | 코드를 분석해 문법적인 오류를 찾아주거나 프로젝트 내에서 일관된 코드 스타일을 유지하기 위해 사용. 프로젝트에는 Airbnb의 코딩 컨벤션을 적용.
| jest                | 배포 전 작성한 코드가 예상한 대로 실행하는지 체크하고 코드 품질 향상 및 코드 문서화를 위해 테스트 코드를 작성. 여러 테스트 프레임워크 중 Jest는 코드 작성이 심플하고 테스트를 병렬로 실행해 테스트 실행 속도가 빠르다는 장점이 있어 선택

<br/>

## ✍ 커밋 메세지 규칙

- feat : 새로운 기능 추가
- fix : 버그 수정
- chore : 그 외 자잘한 수정
- docs : 문서 수정
- refactor : 코드 리팩토링
- test : 테스트 코드 수정

<br/>

## 🔥 트러블 슈팅

<br/>

## 🧑‍💻 팀 구성
<table>
   <tr>
     <td colspan='4' align="center">
       <b>Backend</b>
     </td>
   </tr>
   <tr>
    <td align="center"><b><a href="https://github.com/HUMBLE25">김진겸</a></b></td>
    <td align="center"><b><a href="https://github.com/onionsss11 ">이상언</a></b></td>
    <td align="center"><b><a href="https://github.com/sounwoo">박선우</a></b></td>
    <td align="center"><b><a href="https://github.com/kimjeayoon">김재윤</a></b></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/HUMBLE25"><img src="https://avatars.githubusercontent.com/u/119857714?v=4" width="80px" /></a>
    <td align="center"><a href="https://github.com/onionsss11"><img src="https://avatars.githubusercontent.com/u/110672368?v=4" width="80px" /></a></td>
    <td align="center"><a href="https://github.com/sounwoo"><img src="https://avatars.githubusercontent.com/u/105111888?v=4" width="80px" /></a></td>
    <td align="center"><a href="https://github.com/kimjeayoon"><img src="https://avatars.githubusercontent.com/u/120061280?v=4" width="80px" /></a></td>
  </tr>
</table>

<table>
   <tr>
     <td colspan='3' align="center">
       <b>Frontend</b>
     </td>
   </tr>
   <tr>
    <td align="center"><b><a href="https://github.com/kimet1987">김병수</a></b></td>
    <td align="center"><b><a href="https://github.com/DumakIt">최민기</a></b></td>
    <td align="center"><b><a href="https://github.com/zeon8080">전은찬</a></b></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ted-jv"><img src="https://avatars.githubusercontent.com/u/91305377?v=4" width="80px" /></a></td>
    <td align="center"><a href="https://github.com/DumakIt"><img src="https://avatars.githubusercontent.com/u/112146844?v=4" width="80px" /></a></td>
    <td align="center"><a href="https://github.com/zeon8080"><img src="https://avatars.githubusercontent.com/u/119851517?v=4" width="80px" /></a>
  </tr>
</table>
