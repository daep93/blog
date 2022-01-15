---
title: Controller
description: NestJS Controller 간단 정리
---

## Controller

controller는 크게 라우팅을 담당한다. 클라이언트로부터 어떤 요청이 왔고 어떤 provider로 이를 처리할 것인지를 결정하여 최종적으로 어떻게 응답을 줄 것인지 결정한다.

### Prefix

HTTP 요청은 REST 형식이기 때문에 주소와 메소드로 구분이 된다. nest는 주소를 prefix와 path로 구분하는데 대략 `http://localhost:8000/prefix/path` 형식이다(`localhost:8000`은 도메인 예시일 뿐이다).

prefix 설정은 Controller 데코레이터를 통해 가능하다. 설정하고 싶은 prefix 문자열을 데코레이터에 파라미터로 넘겨주면 된다.

```js
@Controller('dogs')
export class DogsController { ... }
```

이렇게 prefix를 `dogs`로 지정하면 DogsController에 등록된 HTTP 요청 핸들러 함수는 항상 `http://localhost:8000/dogs`로 시작되는 주소에만 동작한다.

### Path and Method

prefix가 큰 범주를 지정하는 것이라면 path는 좀 더 범주를 세분화하는 것이다. REST를 생각하면 리소스와 메소드로 구분되는 것처럼 prefix + path가 리소스라고 생각하면 쉽다.

Controller에서는 path와 메소드에 따라서 HTTP 요청을 처리하는 핸들러 함수를 지정할 수 있다. 만약 내가 키우는 개들의 목록을 불러오고 싶다면 아래와 같이 controller를 구성할 수 있다.

```js
@Controller('dogs')
export class DogsController {
 constructor(private readonly dogService: DogService){}

 @Get('/')
 getDogs(){
   return this.dogService.getAllDogs();
 }
}
```

만약 `http://localhost:8000/dogs/` 주소로 GET 요청이 온다면 `getDogs` 함수가 동작을 할 것이다. 참고로 path에 `'/'` 나 `''`를 넣을 경우 생략이 가능하다.

### Body, Param, Query

HTTP 요청 시 데이터를 클라이언트로부터 받을 수 있다. `GET` 메소드의 경우에는 `@Query`로, `POST`, `PUT` 메소드의 경우에는 `@Body`로 데이터가 넘어오는데 이들을 핸들러 함수의 인자로 받을 수 있다.

```js
@Controller('dogs')
export class DogsController {
 constructor(private readonly dogService: DogService){}

 @Get()
 getDogs(@Query() query){...}

 @Post()
 registerDog(@Body() body: registerDogDto){...}
}
```

참고로 `DTO`는 Data Transfer Object의 약자로 자바에서 계층간 데이터 교환의 의미로 쓰였다. nest에서는 타입스크립트로 데이터를 검사하기 위해서 사용하는 편이다. 이후에 좀 더 설명하겠다.

동적 라우팅의 경우 동적인 값은 `@Param`으로 받을 수 있다.

```js
@Controller('dogs')
export class DogsController {
 constructor(private readonly dogService: DogService){}

 @Get('/:id')
 getDog(@Param('id') id: string){...}
}
```

### Status Code

응답코드 역시 데코레이터를 통해 편하게 지정이 가능하다.

```js
@Controller('dogs')
export class DogsController {
 constructor(private readonly dogService: DogService){}

 @Get('/')
 @HttpCode(HttpStatus.OK)
 getDogs(){
   return this.dogService.getAllDogs();
 }
}
```

`HttpStatus`는 `@nestjs/common`에 내장된 enum으로 다양한 코드값들을 가지고 있다. OK의 경우 200코드를 의미한다.

### Header

header 지정 역시 데코레이터로 간단하게 등록이 가능하다.

```js
@Post()
@Header('Cache-Control', 'none')
create(){ ... }
```
