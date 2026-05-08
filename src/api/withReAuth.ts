import { store } from '@/store/store';
import { refreshAccessToken, logout } from '@/store/slices/authSlice';

export async function withReAuth<T>(
  apiCall: (token: string) => Promise<T>,
  retryCount: number = 0
): Promise<T> {
  const state = store.getState();
  const token = state.auth.accessToken;
  
  if (!token) {
    throw new Error('No access token');
  }
  
  try {
    return await apiCall(token);
  } catch (error: any) {
    if (error.message?.includes('401') || error.status === 401) {
      if (retryCount >= 1) {
        store.dispatch(logout());
        throw new Error('Session expired. Please login again.');
      }
      
      try {
        const newToken = await store.dispatch(refreshAccessToken()).unwrap();
        return await apiCall(newToken);
      } catch (refreshError) {
        store.dispatch(logout());
        throw new Error('Session expired. Please login again.');
      }
    }
    throw error;
  }
}