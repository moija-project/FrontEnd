## 모이자 프로젝트 소개
모이자 는 모임 모집 웹 서비스 입니다. 

모이자는 다음과 같은 기능을 제공합니다.
- 모이자는 익명 웹 서비스지만, 나이와 성별 등을 공개하고 건전하고 안전한 대면 만남을 돕습니다.
- 커뮤니티/댓글과 연결된 서비스가 아니기 때문에 인터넷을 통한 소통을 최소화했습니다.
- 모임장은 미리 가입 조건 질문을 작성하여 유저들이 모임 참여 요청을 하기 전에 작성한 가입 조건 답변을 확인하여 가입 요청 수락 혹은 거절을 할 수 있습니다.
- 모임장은 가입 요청을 한 사용자의 가입 조건 답변, 성별, 나이, 신뢰도를 확인하여 가입 요청 수락 혹은 거절을 할 수 있습니다.
- 모임을 만들고 나서 사용자는 해당 모임과 모임원들을 대상으로 평가를 할 수 있습니다.

## 차별점
- 함께할 사람을 구하려고 할 때 인터넷을 통해 사람을 만나는 일이 많아졌지만, 그 사람이 어떤 사람일 지 모르고, 나와는 다른 목적을 가지고 만나려 하는 걸 수 도 있습니다.
- 더 안전한 만남을 추구해보세요! 평가와 점수 기능을 통해 내가 만날 상대방이 모임의 목적에 맞지 않은 행동을 할 사람일까 걱정을 줄일 수 있습니다.
- 모바일 커뮤니티를 보는 것은 때로 피로합니다. 실제로 만나서 취미 활동 할 친구를 구하고 싶은데, 마땅히 만남을 시작할 곳을 못 찾으셨나요?
- 마음이 들지 않는 사람과는 아무런 대화를 하지 않습니다. 내 질문에 대한 타인의 답변을 신중하게 읽고, 연락해볼지 결정하세요.
## 서비스 대상
- 인터넷 만남이나 모르는 사람과 소통 하는 것이 힘든 사람
- 함께 도전활동, 취미활동 할 사람을 찾고 있지만, 마땅한 만남의 장이 없어 혼자 공부하거나 취미생활 하는 사람. 

(url : http://front.mo.ija.kro.kr/)

## 팀원 소개
```FE``` 이가영
```BE``` 곽신영

## 기술 스택
- FE
<br/>
<div align=center display=flex> 
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white">
</div>

- BE
<br/>
<div align=center display=flex> 
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
<img src="https://img.shields.io/badge/kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white">
<img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white">
  <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
</div>

## 기능별 소개
### ✏ 로그인 / 회원가입
- **안전하게 개인 정보를 보관합니다.**
    - 비밀번호는 bycrypt를 이용하여 관리자도 알 수 없도록 안전히 관리하고, 비밀번호 분실 시 본인 인증/재발급을 통해 도용을 방지합니다.
    - JWT 토큰과 Spring security 인증 서버를 이용하여 사용자를 인증하고, 적절한 권한을 부여합니다.
    - 액세스토큰과 리프레시 토큰을 사용하고, 더 강화된 보안을 제공하기 위해 RTR(Refresh Token Rotation)을 적용하여 리프레쉬 토큰 탈취 시나리오를 대응하도록 설계했습니다.
 
### ✏️ 마이페이지
<div display=flex >
  <div align=center>
<img width="350" alt="11" src="https://github.com/moija-project/FrontEnd/assets/87481901/c258c417-52fa-4b43-99ad-1fdc0780e58b"></div>
  <br/>
  
- 프로필사진을 자유롭게 설정 및 변경할 수 있습니다.
- 닉네임은 변경할 수 있지만, 신뢰성을 위해 잦은 주기로 변경할 수 는 없습니다. 90일에 한 번씩 변경 가능합니다.

  <br/>
  <br/>
</div>

<div display=flex >
  <div align=center>
    <img width="350" alt="222" src="https://github.com/moija-project/FrontEnd/assets/87481901/3e3d4dc1-b961-4a8e-a921-6bc41a8183fd"> 
  </div>
  <br/>
  
- 마이페이지 탭에서는 나와 관련있는 모임을 모아 볼 수 있습니다.
</div>


### ✏️ 게시물 목록
<div display=flex >
  <div align=center>
<img width="350" alt="333" src="https://github.com/moija-project/FrontEnd/assets/87481901/863902e9-97bc-44ac-9803-052344ea01c3">

  </div>
  <br/>
  
- **다양한 모임 모집 글을 볼 수 있어요!**
    - 분야 별로 볼 수 있고, 최신순, 조회수순, 좋아요순 으로 정렬해서 볼 수 있습니다

  <br/>
  <br/>
</div>


### ✏️ 게시물 작성
<div display=flex >
  <div align=center>
<img width="350" alt="444" src="https://github.com/moija-project/FrontEnd/assets/87481901/9c68ee8f-4e0d-406a-8f06-8cff00f5eda6">

  </div>
  <br/>
  
- **게시물을 작성하여 직접 모임원을 모집할 수 있어요!**
    - 글 뿐만 아니라 사진, 가입 조건 질문(최대 10개)을 작성할 수 있습니다.

  <br/>
  <br/>
</div>



### ✏️ 게시물 상세
<div display=flex direction=row >
<div display=flex >
  <div align=center>
<img width="350" alt="555" src="https://github.com/moija-project/FrontEnd/assets/87481901/df3f217c-260d-4450-b259-56a40105b7ec">
  </div>
  <br/>
  
- **일반 유저일 경우**
    - 참여요청을 누르면 가입조건 질문에 대한 답변을 작성하는 페이지로 이동합니다.
    - 답변을 작성하고 가입 요청을 할 수 있습니다.

  <br/>
  <br/>
</div>

<div display=flex >
  <div align=center>
<img width="350" alt="666" src="https://github.com/moija-project/FrontEnd/assets/87481901/56ffb8cf-eea9-4ff8-b9b7-6c381af9f62c">

  </div>
  <br/>
  
- **게시물 작성자 (= 모임장) 일 경우**
    - 해당 게시물을 수정 및 삭제할 수 있으며 모임을 종료할 수 있습니다.
    - 모임과 팀원들을 평가할 수 있습니다.
    - 게시물 작성 혹은 수정 이후 30시간 간격으로 모집글을 끌어올릴 수 있습니다.
</div>
</div>

### ✏️ 평가
<table> 
  <tr>
    <td valign="top">
      <img width="350" alt="777" src="https://github.com/moija-project/FrontEnd/assets/87481901/8fc7f8fa-696e-48ea-822f-746a8e339e21">
    </td>
    <td valign="top">
      <img width="350" alt="888" src="https://github.com/moija-project/FrontEnd/assets/87481901/146c6b06-a59a-4b0c-b7a2-66054964730d">
    </td>
  </tr>
  
  <tr>
    <td valign="top">
      <b>모임 평가</b>
    </td>
    <td valign="top">
      <b>개인 평가</b>
    </td>
  </tr>

  <tr>
    <td valign="top">
    - 모임은 괜찮지만, 간혹 모임의 목표와 어긋나는 행동을 하는 사람이 있진 않을까? 하는 걱정이 있을 수도 있습니다.
      <br/>
    - 모임과는 별개로, 다른 유저의 신뢰도를 확인할 수 있어 더욱 안전한 온라인 만남을 돕습니다.
    </td>
    <td valign="top">
      - 모임의 목적과는 별개의 목적으로 모임에 가입한 사람에겐 냉정한 평가를 할 수 있습니다.
      <br/>
- 다른 사용자의 서비스 이용을 더 안전하게 할 수 있게 익명 상호 평가를 이용해보세요.
    </td>
  </tr>
  
</table>

### ✏️ 참여요청 / 가입조건 질문 답변
<table width="100%">
  <tr>
    <td valign="top">
      <img width="350" alt="스크린샷 2024-04-20 오후 4 01 53" src="https://github.com/moija-project/FrontEnd/assets/87481901/edfdfffa-3097-4d40-a6c6-37b2c8968197">
    </td>
    <td valign="top">
      <img width="350" alt="999" src="https://github.com/moija-project/FrontEnd/assets/87481901/a4792a14-80d8-4e0e-8e8c-0fed340b2126">
    </td>
  </tr>
</table>

- **모임에 참여하려는 사람에게 궁금한점을 물어봐요.**
    - 모임에 가입하려는 사람이 어떤 사람인지 궁금합니다. 모임장이 직접 설정한 참여 질문에 성실하게 대답했는지, 나이/성별 조건에 맞는지, 다른 유저는 이 유저를 어떻게 생각했는지 살펴보고 모임 가입 여부를 결정할 수 있습니다.
- **낯선 사람과의 대화가 불편해요.**
    - 모임장은 가입 질문에 충실히 대답한 적합한 유저와 1대1 채팅 여부를 결정할 수 있어요. 모임에 적합하지 않은 유저에게 불편한 거절의 메시지를 전했다가, 서로에게 상처가 되는 상황이 일어날까 걱정하지 않아도 됩니다.




