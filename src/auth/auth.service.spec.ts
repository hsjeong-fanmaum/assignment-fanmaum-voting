import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    //main.ts에 있는 게 테스트 코드에는 적용이 안 되네요
    BigInt.prototype['toJSON'] = function () {
      // 이 type 단언은 진행하지 않으면 this를 any 타입으로 취급해 에러가 발생합니다.
      // typeof this 확인을 통해 해결할 수는 있습니다. 이를 희망하신다면 수정하겠습니다.
      return (<bigint>this).toString();
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: 4 * 60 * 60 },
        }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('jwt token generation test', async () => {
    const result = await service.signIn('string', 'string');
    console.log(result);
    expect(result).toBeDefined();
  });
});
