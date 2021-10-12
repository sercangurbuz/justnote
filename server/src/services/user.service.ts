import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Auth0Service {
  constructor(private readonly prisma: PrismaService) {}

  appendUser({ email, user_id }: { email: string; user_id: string }) {
    return this.prisma.user.create({
      data: {
        email,
        sub: user_id,
      },
    });
  }
}
