# Alexandria Lib - Server

![image](https://github.com/dev-goraebap/jwt-auth-seed_BE/blob/develop/public/readme-01.jpg)

## API 데모 문서
- https://alexandrialib-api-azikzwlurq-du.a.run.app/api

## 아키택처 및 코드 스타일

### 논리적 구조
- 레이어드 아키택처의 개념 사용

### 물리적 구조
- [FSD](https://feature-sliced.design/kr/) 아키택처를 사용하여 물리적인 패키지 구조 적용
- 기존의 레이어를 그대로 사용하지 않고 System -> App -> Features -> Shared 레이어 구조를 적용
- System, Shared는 각각 최상위 레이어, 최하위 레이어로 슬라이스 대신 세그먼트가 직접 구성되므로 서로 참조 가능하고 그 외엔 불가능

### 실험적 기능
제어를 담당하는 클래스외에 도메인모델, DTO 와 같은 클래스들은 속성들을 private 하게 관리하지 않음

몇가지 이유로는 자바와 같이 Lombok 라이브러리를 사용할 수 없는 타입스크립트에서 getter, setter를 찍어내는 부분이
생산성이 많이 떨어진다고 느낌. 

대신 불변객체 생성방식을 일부 차용.
- readonly 키워드를 통해 생성 이후에 값을 수정할 수 없도록 처리 (getter 사용 X)
- readonly 키워드의 영향으로 setter를 통해서도 내부 속성을 바꿀 수 없기 때문에 변경된 값을 통해 새로운 객체를 반환. 
- 생성은 주로 정적 메서드를 활용. new 키워드를 사용하여 생성 이후 프로퍼티 인젝션도 readonly 키워드에
막히기 때문에 `Object.assin` 또는 `class-transformer` 라이브러리 활용

  ```ts
  // core model
  static from(param: Pick<UserModel, 'email' | 'password'>) {
      const now = new Date();
      return plainToInstance(UserModel, {
          id: nanoid(30),
          email: param.email,
          password: hashPassword(param.password),
          nickname: generateRandomNickname(),
          otp: null,
          otpExpiryDate: null,
          isEmailVerified: false,
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
      } as UserModel);
  }
  ```
- 수정은 기존의 값을 복사하여 변경될 값을 넣어 새로운 객체를 할당
  ```ts
  // core model
  withUpdateEmailVerified() {
      return plainToInstance(UserModel, {
          ...this,
          isEmailVerified: true,
          updatedAt: new Date()
      } as UserModel);
  }
    
  // updateEmail from core service..
  user = user.withUpdateEmailVerified();
  await this.userRepository.save(user);
  ```
