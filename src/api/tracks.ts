const API_BASE = 'https://webdev-music-003b5b991590.herokuapp.com';

export interface Track {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  stared_user: any[];
}

export const getAllTracks = async (): Promise<Track[]> => {
  const response = await fetch(`${API_BASE}/catalog/track/all/`);
  
  if (!response.ok) {
    throw new Error(`Ошибка загрузки треков: ${response.status}`);
  }
  
  const data = await response.json();
  return data.data;
};