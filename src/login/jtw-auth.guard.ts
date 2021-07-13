import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const [prop, token] = authHeader.split(' ');
        if (prop !== 'Bearer' || !token) {
          throw new UnauthorizedException({ message: 'Unauthorized!' });
        }
        this.jwtService.verify(token);
        return true;
      } else {
        throw new UnauthorizedException({ message: 'Unauthorized!' });
      }
    } catch (error) {
      throw new UnauthorizedException({ message: 'Unauthorized!' });
    }
  }
}
