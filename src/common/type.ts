import { cast_roles, seat_class } from '@prisma/client';

// export enum Genre {
//   Action = 'Action',
//   Adventure = 'Adventure',
//   Animation = 'Animation',
//   Comedy = 'Comedy',
//   Crime = 'Crime',
//   Documentary = 'Documentary',
//   Drama = 'Drama',
//   Family = 'Family',
//   Fantasy = 'Fantasy',
//   History = 'History',
//   Horror = 'Horror',
//   Mystery = 'Mystery',
//   Romance = 'Romance',
// }

export type Language = {
  title: string;
  code: string;
  id: string;
};

export type Movie = {
  id: string;
  name: string;
  imageUrl: string;
};

export type BookSnackType = {
  snackId: string;
  qtyOrdered: number;
};

export type MovieCastsCreateType = {
  castId: string;
  role: cast_roles;
};

export type MovieTheatreCreateType = {
  theatreId: string;
  screenId: string;
  showTiming: string;
};

export type UpdateBookingSeatType = {
  row: number;
  section: seat_class;
  seatNumber: string;
};

export enum ActionPermissions {
  UpdateOwn = 'update-own',
}
