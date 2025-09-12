import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    //main.ts에 있는 게 테스트 코드에는 적용이 안 되네요
    BigInt.prototype['toJSON'] = function () {
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
