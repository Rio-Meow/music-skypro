import { Track } from '@/types/track';

const API_BASE = 'https://webdev-music-003b5b991590.herokuapp.com';

export const getAllTracks = async (): Promise<Track[]> => {
  const response = await fetch(`${API_BASE}/catalog/track/all/`);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки треков: ${response.status}`);
  }
  const data = await response.json();
  return data.data as Track[];
};

export const getFavoriteTracks = async (accessToken: string): Promise<Track[]> => {
  const response = await fetch(`${API_BASE}/catalog/track/favorite/all/`, {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error('Ошибка загрузки избранных треков');
  }
  const data = await response.json();
  return data.data as Track[];
};

export const addToFavorite = async (id: number, accessToken: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/catalog/track/${id}/favorite/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Ошибка добавления в избранное');
  }
};

export const removeFromFavorite = async (id: number, accessToken: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/catalog/track/${id}/favorite/`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error('Ошибка удаления из избранного');
  }
};