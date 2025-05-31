export type User = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  password?: string; // Optional password for demo purposes
};

export interface AuthContextType {
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
