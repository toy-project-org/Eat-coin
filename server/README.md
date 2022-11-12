# Server

## 환경 구축
    - 서버 컴퓨터 - AWS EC2
    - 데이터베이스 - MySql
    - 프레임워크 - express.js (Node.js)

## 테이블 명세
| table | column | example1 | example2 | data type | condition | PK | FK | memo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| User | uid | 1 | 2 | int | NOT NULL | PK |  |  |
|  | name | 류수진 | 김유진 | varchar(10) |  |  |  |  |
|  | email | aa@aa.com | b@b.com | varchar(50) | UNIQUE |  |  |  |
|  | password | aa123 | 123 | varchar(20) |  |  |  |  |
|  |  |  |  |  |  |  |  |  |
| Category | cid | 1 | 8 | int | NOT NULL | PK |  |  |
|  | name | 식비 | 신한은행 | varchar(10) |  |  |  |  |
|  | type | 지출 | 자산 | varchar(10) |  |  |  |  |
|  | image | http://~~ | http://~~ | varchar(100) |  |  |  |  |
|  |  |  |  |  |  |  |  |  |
| Menu | mid | 2 | 5 | int | NOT NULL | PK |  |  |
|  | name | 히스토리 | 딜력 | varchar(20) |  |  |  |  |
|  | parent_mid |  | 2 | varchar(10) |  |  |  |  |
|  | url | http://~ | http://~ | varchar(100) |  |  |  |  |
|  |  |  |  |  |  |  |  |  |
| History | hid | 1 | 2 | int | NOT NULL | PK |  |  |
|  | title | 김밥천국 | 월급 | varchar(20) |  |  |  |  |
|  | money | 7000 | 100,000,000 | int |  |  |  |  |
|  | date | 22-10-31 | 22-11-08 | date |  |  |  |  |
|  | category | 1 | 7 | int |  |  | FK(Category_cid) |  |
|  |  |  |  |  |  |  |  |  |
| Detail | did | 1 | 2 | int | NOT NULL | PK |  |  |
|  | isfixed |  | Y | varchar(5) |  |  |  |  |
|  | card | 8 | 8 | int |  |  | FK(Category_cid) |  |
|  | memo | 라면, 참치김밥 |  | varchar(100) |  |  |  |  |
|  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |

## REST API 명세
    - 공통 URI: http:// ~~~~ **/eatcoin-api**
    
    [디테일](https://www.notion.so/2ab0c1988daa4d3ab5b6821f3c3cc75f)
    

| Category | Method | Summary | URI | 비고 |
| --- | --- | --- | --- | --- |
| 내역 | get | 내역 조회 | /histrorys (/{hid}) | 전체 or 특정 내역 조회 |
|  | post | 내역 추가 | /historys |  |
|  | put | 내역 수정 | /historys/{hid} |  |
|  | delete | 내역 삭제 | /historys/{hid} |  |
|  | get | 특정 내역 상세보기 | /historys/detail/{hid} |  |
|  |  |  |  |  |
| 통계 | get | 카테고리/자산 별 통계 조회 | /statistics |  |
|  |  |  |  |  |
| 메뉴 | get | 메뉴 조회 | /menues (/{mid}) |  |
|  | post | 메뉴 추가 | /menues |  |
|  | put | 메뉴 수정 | /menues/{mid} |  |
|  | delete | 메뉴 삭제 | /menues/{mid} |  |
|  |  |  |  |  |
| 카테고리 | get | 목록 조회 | /categories (/{cid}) |  |
|  | post | 카테고리 추가 | /categories |  |
|  | put | 카테고리 수정 | /categories/{cid} |  |
|  | delete | 카테고리 삭제 | /categories/{cid} |  |
|  |  |  |  |  |
| 로그인 | get | 로그인 | /login |  |
|  |  |  |  |  |
| 회원 | get | 회원 조회 | /users  (/{uid}) |  |
|  | post | 회원 추가 | /users |  |
|  | put | 회원 수정 | /users/{uid} |  |
|  | delete | 회원 삭제 | /users/{uid} |  |
|  |  |  |  |  |