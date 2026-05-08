const API_BASE = 'https://webdev-music-003b5b991590.herokuapp.com';

export interface SignupData {
  email: string;
  password: string;
  username: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface TokensResponse {
  access: string;
  refresh: string;
}

export interface UserResponse {
  email: string;
  username: string;
  _id: number;
}

export const signup = async (data: SignupData): Promise<{ success: boolean; message: string; result?: UserResponse }> => {
  const response = await fetch(`${API_BASE}/user/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const login = async (data: LoginData): Promise<UserResponse> => {
  const response = await fetch(`${API_BASE}/user/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Ошибка входа');
  }
  
  return response.json();
};

export const getTokens = async (data: LoginData): Promise<TokensResponse> => {
  const response = await fetch(`${API_BASE}/user/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Ошибка получения токенов');
  }
  
  return response.json();
};

export const refreshToken = async (refresh: string): Promise<{ access: string }> => {
  const response = await fetch(`${API_BASE}/user/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Ошибка обновления токена');
  }
  
  return response.json();
};