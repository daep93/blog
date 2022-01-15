---
title: Middleware
description: NestJS Middleware 간단 정리
---

## 요약

nest는 express에서 사용했던 middleware 기능을 똑같이 제공하고 있다. 기본적으로 controller의 핸들러 함수가 실행되기 이전에 호출되며, 원한다면 핸들러 함수가 실행되고 난 이후에도 동작이 가능하다. 참고로 이후에 설명할 guard나 interceptor보다 먼저 실행된다.([공식문서](https://docs.nestjs.com/faq/request-lifecycle))

express에서는 use함수를 통해서 바로 적용이 가능했지만, nest에서는 middleware용 클래스를 만들고 이를 모듈에 등록해야한다. 좀 더 구체적으로 말하면, 모듈 데코레이터의 메타데이터에 등록하지 않고 `NestModule`이라는 인터페이스를 implements 하는 클래스에서 `configure`이라는 함수를 통해 middleware를 등록해야한다.

대표적인 middleware인 log를 구현해봄으로써 middleware의 등록과 적용을 설명하겠다.

## logger.middleware.ts

```js
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

middleware는 비록 모듈의 메타데이터로 등록되지 않지만 `@Injectable`을 요구한다. use 함수에는 미들웨어의 로직을 적으면 된다. 원한다면 `res.on('finish', ()=>{...})`를 이용해서 HTTP 핸들러 함수가 결과를 반환한 이후에도 미들웨어를 작동시킬 수 있다.

참고로 `@nestjs/common`은 Logger라는 클래스를 제공하는데 console.log 대신 아래와 같이 사용을 하면 특정한 형식으로 로그가 출력된다.

```js
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
	this.logger.log(`${req.ip} / ${req.method} / ${req.statusCode}`)
    next();
  }
}
```

이제 middleware를 등록해보자.

## Locally applying middleware

middleware의 등록은 원하는 모듈에 하면된다. 다만 `@Module()`의 메타데이터에는 이를 등록하는 부분이 없어서 아래의 예시처럼 `NestModule`을 implements한 모듈 클래스에 따로 등록해야한다.

```js
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';

@Module({...})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
```

`consumer`는 middleware를 적용하기 위한 인터페이스로,

1. apply함수를 통해 middleware를 등록하고
2. forRoutes함수를 통해 middleware가 동작할 라우트 주소를 지정한다.

- 지금처럼 문자열로 적으면 메소드 상관없이 해당 문자열에 바인딩된 모든 라우트에 반응한다.
- `{path:'...', method: RequestMethod.Get}` 처럼 path와 method 지정이 가능하다.
- controller 단위로 적용하려면 해당 controller 클래스를 적어준다.

추가로 특정 라우트에 대해서 middleware 적용을 제외시키려면 아래처럼 exclude 함수를 사용하면 된다.

```js
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)'
  )
  .forRoutes(CatsController);
```

## globally applying middleware

글로벌하게 적용하기 위해서는 main.ts 파일에서 아래처럼 `NestFactory.create()`로 인스턴스화한 nest 어플의 use함수를 이용하면 된다.

```js
const app = await NestFactory.create(AppModule);
app.use(LoggerMiddleware);
await app.listen(8000);
```
