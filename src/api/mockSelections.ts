import { Track } from '@/types/track';

export interface Selection {
  _id: number;
  name: string;
  items: Track[];
}

export const getSelectionById = (id: number, tracks: Track[]): Selection => {
  if (!tracks.length) {
    throw new Error('Треки не загружены');
  }
  
  let items: Track[] = [];
  let name = '';
  
  switch (Number(id)) {
    case 1:
      name = 'Плейлист дня';
      items = tracks.slice(0, 8);
      break;
    case 2:
      name = '100 танцевальных хитов';
      items = tracks.slice(3, 12);
      break;
    case 3:
      name = 'Инди-заряд';
      items = tracks.slice(6, 14);
      break;
    default:
      throw new Error('Подборка не найдена');
  }
  
  return {
    _id: Number(id),
    name,
    items,
  };
};