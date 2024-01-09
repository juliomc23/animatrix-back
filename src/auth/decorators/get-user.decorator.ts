import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUserData = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user)
      throw new InternalServerErrorException(
        'Token was not provide in the request header',
      );

    return data ? user[data] : user;
  },
);
