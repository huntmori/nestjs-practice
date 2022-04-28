## #2-2 NestCLI로 생성한 프로젝트 기본구조 알아보기 (https://youtu.be/Cz_FzSdtR_Q)

# NestJS 기본구조 설명
>##  eslint.js
> 개발자들이 특정한 규칙을 가지고 코드를 깔끔하게 짤 수 있도록<br>
> 도와주는 라이브러리.
>  타입스크립트를 쓰는 가이드라인 제시,<br>
> 문법에 오류가나면 알려주는 역할 등

>## prettierrc
>  주로 코드 형식을 맞추는데 사용합니다.<br>
> 작은따옴표(')를 사용 할 지 큰 따옴표(")를 사용할 지, <br>
> Indent 값을 2로 줄 지 4로 줄 지 등등. 에러찾는것이 아닌 코드 포메터 역할.

>## nest-cli.json
>  nest 프로젝트를 위해 특정한 설정을 할 수 있는 json 파일.
> ```
>    {
>      "$schema": "https://json.schemastore.org/nest-cli",
>      "collection": "@nestjs/schematics",
>      "sourceRoot": "src" /** 소스코드 루트 경로**/
>    }
>  ```

>## tsconfig.json
> 어떻게 타입스크립트를 컴파일 할 지 결정.

>## tsconfig.build.json
> tsconfig.json의 연장선 파일이며, build를 할때 필요한 설정들
> "excludes"에서는 빌드 할 때 필요 없는 파일들 명시

>## package.json
> #### - build: 운영 환경을 위한 빌드.
> #### - format: 린트에러가 났을 시 수정
> #### - start: 앱시작

>## src폴더
> 대부분의 비즈니스 로직이 들어가는곳.
>> ### main.ts
>>> 앱을 생성하고 실행.
>> ### app.module.ts
>>> 앱의 모듈을 정의