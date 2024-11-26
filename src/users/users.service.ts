import { Injectable } from '@nestjs/common';

export enum MemberRoles {
  'Customer' = 'Customer',
  'Admin' = 'Admin',
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: MemberRoles;
};

const users: User[] = [
  {
    id: 'f75800c4-4ded-4043-b56e-46fefdf0d363',
    name: 'Maverick Bradley',
    password: 'topsecret',
    email: 'mavy@testmail.com',
    role: MemberRoles.Admin,
  },
  {
    id: '0910839e-cfb2-474f-bc29-ad4ed586b312',
    name: 'Tucker Budzyn',
    password: 'thisismytopsecret',
    email: 'chucher@testmail.com',
    role: MemberRoles.Customer,
  },
];

@Injectable()
export class UsersService {
  async findUser(mail: string): Promise<User | undefined> {
    return users.find((user) => user.email === mail);
  }
}
