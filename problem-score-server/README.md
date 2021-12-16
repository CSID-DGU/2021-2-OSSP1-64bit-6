# 문제은행 채점 서버

문제은행 채점 서버 부분입니다.

## 개발 환경
> Node.js

## 설치
```bash

# 프로젝트 github에서 받음
git clone `` 
cd problem-score-server/server

# 필요한 packge 설치
npm start

# 컴파일 할때 소스코드 저장할 Folder를 만들 
mkdir DEBUG_TEMP_PATH

# C언어 채점용 컴파일러 설치
apt-get install clang-7

# C++ 채점용 컴파일러 설치
apt-get install g++

# Java 채점용 컴파일러 설치
apt-get install javac

# .env 파일을 만들어서 환경변수를 추가함
vim .env
======= 
# .env 파일 내용을 다음과 같음.
# DB연결하기 위한 정보
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_ID= [db id]
MYSQL_PASS= [db password]
MYSQL_DB= [db 이름]


BOILERPLATE_PATH=boilerplates
DEBUG_TEMP_PATH=DEBUG_TEMP_PATH
DEBUG_TEMP_PATH_TEST=DEBUG_TEMP_PATH_TEST


DEBUG_TEMP_PATH_BANK_PROBLEMS=DEBUG_TEMP_PATH_BANK_PROBLEMS

# 서버 PORT
PORT=5111

# 원하는 signture 입력
TOKEN= 
======


```
## License
[MIT](https://choosealicense.com/licenses/mit/)
