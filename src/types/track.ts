export interface StaredUser {
  id: number;
  email?: string;
  username?: string;
}

export interface Track {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[] | string;
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  stared_user: StaredUser[];
}

export interface User {
  email: string;
  username: string;
  _id: number;
}

export interface Tokens {
  access: string;
  refresh: string;
}