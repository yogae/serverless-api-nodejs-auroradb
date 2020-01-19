# api

## 설정

1. 환경설정 file 생성

   * env/.env_{stag}.json에 file을 생성
     * ex) env/.env_dev.json -> default로 .env_dev.json을 설정 file로 사용한다.

   * env/.env_{stag}.json에 file에 아래와 같이 작성

   ```json
   {
       "database": "db 이름",
       "username": "db username",
       "password": "db password",
       "host": "db host url",
       "dialect": "mysql",
       "BUCKET_NAME": "s3 bucket name",
       "CF_DOMAIN": "cloud front 주소",
       "SECURITY_GROUP_ID": "db security group id",
       "SUBNET_1": "db subnect id",
       "SUBNET_2": "db subnect id"
   }
   ```

2. install dependency

    ```bash
    yarn install

    # or
    npm install
    ```

3. db migration

    * db table을 생성한다.

    ```bash
    node_modules/.bin/sequelize db:migrate
    ```

## sequelize-cli 사용법

```bash
# sequelize-cli에서 기본적으로 사용하는 file을 생성한다.
# 기존에 구성한 config file을 사용하기 위해서 config 폴더에 생성되는 config정보는 사용하지 않았다.
node_modules/.bin/sequelize init

# sequelize model을 생성한다.
node_modules/.bin/sequelize model:generate --name image --attributes name:string

# db table 생성
node_modules/.bin/sequelize db:migrate
```

## Reference

* [Sequelize CLI를 사용하여 User API 만들기](https://velog.io/@jeff0720/Sequelize-CLI%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EA%B0%84%EB%8B%A8%ED%95%9C-User-API-%EB%A7%8C%EB%93%A4%EA%B8%B0-vdjpb8nl0k)
