# 2021-2-OSSP1-64bit-6
문제은행 : 가시화 도구를 통한 데이터 시각화   

## 개발 환경
> Ubuntu Linux   
> Node.js   
> React.js   
> MySql

## 실행 방법
1. 기본 프로그램 설치
```bash
apt-get update
apt-get install git
apt-get install openssh-server
apt-get install ssh
apt-get install net-tools
apt-get install vim

apt-get install curl
curl -sL http://deb.nodesource.com/setup_12.x | sudo -E bash --
apt-get install -y nodejs
apt-get install docker.io
apt-get install mysql-server
mysql -u root -p (password 입력)
> CREATE DATABASE problems;
> use problems;
> show databases;
> exit
```
2. 깃허브에서 코드 가져온 후 DB dump
```bash
git clone https://github.com/CSID-DGU/2021-2-OSSP1-64bit-6.git
cd 2021-2-OSSP1-64bit-6.git
mysql -u root -p problems < problems_1126.sql
```

3. 데이터베이스와 서버 연결
```bash
cd /etc/mysql/mysql.conf.d
vim mysqld.cnf
(하단 bind-address = 0.0.0.0으로 수정 후 :wq)
/etc/init.d/mysql restart
```

## 주요 구현 사항
+ Mypage   
  + Heatmap calender   
  + 문제 유형/난이도별 해결 비율   
  + 카테고리별 해결 비율   
  + 틀린 문제   
  + 다시 볼 문제   

+ Admin Dashboard   
  + 유저, 방문자 정보   
  + 문제 정보   
  + Rank   
  + 정,오답률   
  + 난이도별 풀이 비율   

## 실행 화면
+ Mypage   
![image](https://user-images.githubusercontent.com/90669873/146289437-b47a19f1-adf3-48f8-a118-959ca853c890.png)
+ Admin Dashboard   
![image](https://user-images.githubusercontent.com/90669873/146289454-30be5a17-5a4b-4d2d-8d52-cb0945b51f41.png)

## Reference
+ [https://www.chartjs.org/](https://www.chartjs.org/)
+ [https://github.com/uiwjs/react-heat-map](https://github.com/uiwjs/react-heat-map)

## License
[MIT](https://choosealicense.com/licenses/mit/)
