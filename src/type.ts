export enum Genre {
  Action = 'Action',
  Adventure = 'Adventure',
  Animation = 'Animation',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Drama',
  Family = 'Family',
  Fantasy = 'Fantasy',
  History = 'History',
  Horror = 'Horror',
  Mystery = 'Mystery',
  Romance = 'Romance',
}

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
