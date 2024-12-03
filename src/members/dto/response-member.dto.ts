import { ApiProperty } from '@nestjs/swagger';
import { MemberRoles } from '@prisma/client';

export class ResponseMemberDto {
  @ApiProperty({ example: '259bd9cd-d1ae-4305-aeba-0ba4ade57973' })
  id: string;

  @ApiProperty({ example: 'JohnDoe' })
  name: string;

  @ApiProperty({ example: 'johndoe@mail.com' })
  email: string;

  @ApiProperty({ example: 'Averydifferen#p@$$w0rdwhichisH@$hed&isl00000000ng' })
  password: string;

  @ApiProperty({ example: MemberRoles.Customer })
  role: MemberRoles;
}

export class ResponseMemberDetailsDto extends ResponseMemberDto {
  @ApiProperty()
  bookings: {
    id: string;
    bookingDate: Date;
  }[];
}
