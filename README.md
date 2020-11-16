> ## 📚Project Name: MEP ( MINIMAL ERP PROJECT )
>
> > ### Develop Environment
> >
> > Front-End : [React](https://github.com/consolekakao/react-client)
> >
> > Back-End : [Node.js 12.16.3](https://github.com/consolekakao/react-server)
> >
> > DataBase : MariaDB 10.1 v
>
> > ### 🦸🏻‍♂️Contributors
> >
> > [Consolekakao] (https://github.com/consolekakao)
>
> > [edcs960] (https://github.com/edcs960)
>
> > [jang421] (https://github.com/jang421)
>
> > ### Main Function
> >
> > 📆 Share Schedule :
> >
> > > KO: 같은 등급의 사람들 끼리 일정을 공유 할 수 있고 개별적으로 일정을 등록할 수 있으며 전체보기,
> > >
> > > 부서별로 보기, 나만보기가 적용됩니다. 다양한 색상으로 적용 할 수 있으며 일정은 일자 별, 시간대 별로 디테일하게
> > >
> > > 작성이 가능합니다.
> >
> > > EN: Schedules can be shared with people of the same level, and personal schedules can be registered by date and time.
> > > ![img](http://alpacao.cafe24.com/proimg1.PNG)
> >
> > 📋 Board :
> >
> > > KO: 게시판은 전체게시판 및 부서 별 게시판으로 나누어 사용이 가능하며 부서 게시판은 해당되는 부서의 게시글만 표시됩니다.
> >
> > > ![img](http://alpacao.cafe24.com/proimg2.PNG)
> > > EN: Posts can be shared among people of the same level, and bulletin boards can be used for each department.
> >
> > 📞 Chat :
> >
> > > Planning.
> >
> > 💾 FTP:
> >
> > > KO: 전체 및 부서별, 개인 FTP를 제공합니다. (Planning.)

## 📢NOTICE

> 모든 테스트는 인트라넷에서 테스트 중이며 개인 포트폴리오용으로 제작되었습니다.
>
> MEP 프로젝트는 비상업적 용도로 제작중입니다.
>
> DB Connet Info를 제외한 모든 코드는 오픈소스이며 MIT를 적용합니다.
>
> ### Client Src in Github https://github.com/consolekakao/react-client
>
> ### Server Src in Github https://github.com/consolekakao/react-server
>
> 날카로운 피드백은 언제나 환영합니다.

## 🛠 UPDATE LOG

## ~2020-11-06

> 로그인 및 회원가입(미적용),로그아웃 구현
>
> [Fullcalendar](https://fullcalendar.io/)를 이용한 캘린더 구현.
>
> > 전체일정 등록 및 개인일정 등록 Component 생성.
> >
> > Drag를 활용해서 바로 DB삽입 가능하게 구현.
> >
> > 월간 일정, 주간 타임라인 일정,주간 리스트 일정 세개로 나누어 Component 생성.
> >
> > 스크롤바 투명 및 Smooth 사용으로 부드럽게 스크롤 되도록 변경.
>
> 템플릿 리터럴 일부 적용.
>
> 전체 게시판 및 부서게시판 구현.
>
> CSS 전체 미적용.
>
> 임시 더미데이터 URL추가.

## ~2020-11-10

> 전면적인 CSS 레이아웃 수정.
>
> > 프로필사진 영역 추가.
> > 카테고리 클릭시 메뉴 색상 변경.
>
> Api요청 방식 변경

## ~2020-11-11

> File Update ADD.
>
> CSS & Layout Update
>
> Board 구동 방식 변경.
>
> Sweetalert2로 Login시 알림 추가.
>
> > ![img](http://alpacao.cafe24.com/proimg3.PNG)

## ~2020-11-13

> > Multer-sftp를 이용한 ftp업로드
> > 회원가입 기능 구현

## ~2020-11-16

> > 로그인시 DB에 LOG추가. (IPv6)
