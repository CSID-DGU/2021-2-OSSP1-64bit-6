# 문제은행 서버

문제은행 서버부분입니다.

## 개발 환경
> Node.js   
> MySql

## 설치
```bash
cd problembank-server

npm install --unsafe-perm

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
PORT=3003

# 원하는 signture 입력
TOKEN= 
======

# 필요한 packge 설치
npm i nodemon -g

# 실행
nodemon

```
## License
[MIT](https://choosealicense.com/licenses/mit/)
