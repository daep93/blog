---
title: Get and Set method in Computed
description: Vue의 Computed 옵션에서 사용이 가능한 get과 set 메소드에 대한 정리
---

[vue-property-decorator 공식문서](https://github.com/kaorun343/vue-property-decorator)를 보던 와중에 너무 낯선 Vue 코드가 보여서 이를 정리한다.

먼저 간단하게 `vue-property-decorator`를 설명하면, Vue에 TS(TypeScript)를 지원해주는 라이브러리인데 기존의 Vue 인스턴스의 [Options / Data](https://vuejs.org/v2/api/#Options-Data)를 대체할 수 있는 데코레이터들을 제공한다. 이 데코레이터를 사용하면 Vue 컴포넌트를 클래스 형태로 정의하면서 TS를 사용할 수 있다.

이 라이브러리는 `@PropSync`라는 데코레이터를 제공하는데, 간단하게 설명하면 부모와 자식 컴포넌트가 같은 데이터를 공유할 수 있도록 해주는 데코레이터다. 자식 컴포넌트에서 props로 데이터를 받고 이 데이터를 변경할 땐 `$emit`을 통해 부모 컴포넌트에게 이벤트를 전달하는 방식이다.

사용법은 아래와 같고,

```ts
import { Vue, Component, PropSync } from 'vue-property-decorator';

@Component
export default class YourComponent extends Vue {
  @PropSync('name', { type: String }) syncedName!: string;
}
```

기존의 Vue코드는 아래와 같다.

```js
export default {
  props: {
    name: {
      type: String,
    },
  },
  computed: {
    syncedName: {
      get() {
        return this.name;
      },
      set(value) {
        this.$emit('update:name', value);
      },
    },
  },
};
```

기존 코드를 보면 computed에 get과 set 메소드를 포함한 객체를 반환하는 방식인데, 이렇게 get, set을 이용하는 방식은 처음봤다. 이제까지 함수를 반환하는 방식만 허용되는 줄 알았다. 그래서 구글링을 하면서 이를 조사했는데 [또야](https://tofusand-dev.tistory.com/44)님께서 제일 잘 정리해주신 것 같아 이를 참조한다.

간단하게 설명하면, computed에 등록된 메소드들은 원래 값의 대입이 허용되지 않는데, set 메소드를 등록해두면 대입이 허용되어 set 메소드가 호출된다는 것이다. 위의 코드를 예시로 들면, `this.syncedName = 'wood'` 이런식으로 대입하면 `update:name` 이벤트가 발생하면서 `wood`를 부모 컴포넌트에게 넘겨준다.
