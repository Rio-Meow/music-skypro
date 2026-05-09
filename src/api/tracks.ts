import { withReAuth } from './withReAuth';

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

export const getFavoriteTracks = async (accessToken: string): Promise<Track[]> => {
  return withReAuth(async (token) => {
    const response = await fetch(`${API_BASE}/catalog/track/favorite/all/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка загрузки избранных треков: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  });
};

export const addToFavorite = async (id: number, accessToken: string): Promise<void> => {
  return withReAuth(async (token) => {
    const response = await fetch(`${API_BASE}/catalog/track/${id}/favorite/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка добавления в избранное: ${response.status}`);
    }
  });
};

export const removeFromFavorite = async (id: number, accessToken: string): Promise<void> => {
  return withReAuth(async (token) => {
    const response = await fetch(`${API_BASE}/catalog/track/${id}/favorite/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка удаления из избранного: ${response.status}`);
    }
  });
};