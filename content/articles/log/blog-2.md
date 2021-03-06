---
title: 개인 블로그 만들기(2)
description: NuxtJS로 만드는 개인 블로그 만들기 일지
---

## intro

1편에서 개인 블로그를 만들기 위해서 기본적인 사항들을 구현하며 블로그의 틀을 다졌었다. 이후에 한 작업들을 굵직하게 나열하자면 다음과 같다.

1. toast-editer 도입
2. multer를 통해 이미지 업로드 기능 구현
3. s3를 이용해서 백엔드에서 받은 이미지 업로드 기능 구현

## problem

2번, 3번의 경우 윤상석님의 강의를 보고 쉽게 따라할 수 있어서 금방 해결되었지만 toast-editor는 솔직히 조금 다루기 어려웠다. 내가 원하는 것은 toast-editor 사용 중에 `ctrl + s`를 누르면 어떤 이벤트가 발생하고 이 이벤트를 감지해서 특정 콜백을 실행시키는 것이었는데 해당 키가 이미 단축키로 등록되어 있는 상태였고, 다른 키로 진행하고 싶었지만 새로운 이벤트 등록과 처리 부분에 대한 예제가 거의 없어서 어떻게 해야할지 막막한 상태이다. 현재는 일단 무시하고 다른 마크업부터 하기로 했는데, 이후에는 편집기 사용법을 좀 더 뒤져보고 안되면 편집기를 바꿀 예정이다. 최악은 직접 편집기를 만들 수도 있고.

현재는 tailwind를 통해서 마크업 작업을 하고 있는데 `container` 클래스가 예상한 것과 다르게 작동해서 난감한 상태이다. 브레이크포인트와 함께 쓰면 max-width가 지정된다고 적혀있는데, 해당 브레이크포인트를 넘겨도 너비가 증가하는 문제가 발생하고 있다. 현재는 `max-w-screen-{breakpoint}`로 해결을 하고 있는데 나중에 한번 더 확인해봐야겠다.

## current

지금까지 내가 한 작업들을 페이지별로 크게 분류하면,

1. 페이지네이션된 글 미리보기 항목들이 표시된 홈
2. 글 작성하기 페이지
3. 글을 리뷰할 수 있는 페이지
   이렇게 3가지로 분류했다.
   로그인해서 글 작성 권한을 얻고, 글을 작성하면 홈에서 미리보기를 통해 볼 수 있고, 클릭하면 글 리뷰 페이지로 이동하는 아주 간단한 형태로 제작이 되었다. 여기에 추가적으로 미리보기를 분류해서 볼 수 있는 drawer와 로그인 모달 컴포넌트도 제작했다.

## after

이후에는 마크업 작업과 더불어, 로그인 버튼을 숨기는 방법을 고민할 것이다. 나 또는 나와 블로그를 같이 편집하는 사람만 웹 상으로 글을 편집할 것이기 때문에 accessToken 관리도 xss가 통하지 않도록 하면서 refreshToken도 필요없게 진행할 것이다.

지금까지는 마크업 작업을 많이 하지 못해서 이미지를 올릴 수가 없었는데 향후에는 같이 올릴 수 있도록 노력하겠다.
