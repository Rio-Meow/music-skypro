const API_BASE = 'https://webdev-music-003b5b991590.herokuapp.com';
import { Track } from './tracks';

export interface Selection {
  _id: number;
  name: string;
  items: Track[];
}

export const getAllSelections = async (): Promise<Selection[]> => {
  const response = await fetch(`${API_BASE}/catalog/selection/all`);
  
  if (!response.ok) {
    throw new Error('Ошибка загрузки подборок');
  }
  
  const data = await response.json();
  return data.data;
};

export const getSelectionById = async (id: number): Promise<Selection> => {
  const response = await fetch(`${API_BASE}/catalog/selection/${id}/`);
  
  if (!response.ok) {
    throw new Error('Ошибка загрузки подборки');
  }
  
  const data = await response.json();
  return data.data;
};