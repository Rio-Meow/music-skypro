import { useState, useCallback, useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { addToFavorite, removeFromFavorite } from '@/api/tracks';

export const useLike = (trackId: number, initialIsLiked: boolean = false) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken, isAuthenticated } = useAppSelector((state) => state.auth);

  const toggleLike = useCallback(async () => {
    if (!isAuthenticated) {
      setError('Необходимо авторизоваться');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (isLiked) {
        await removeFromFavorite(trackId, accessToken!);
        setIsLiked(false);
      } else {
        await addToFavorite(trackId, accessToken!);
        setIsLiked(true);
      }
    } catch (err) {
      setError('Ошибка при изменении статуса лайка');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isLiked, trackId, accessToken, isAuthenticated]);

  const likeState = useMemo(() => ({
    isLiked,
    isLoading,
    error,
    toggleLike,
  }), [isLiked, isLoading, error, toggleLike]);

  return likeState;
};