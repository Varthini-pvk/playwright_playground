export interface User {
  id?: number;
  email: string;
  name?: string;
  avatar?: string;
  details? :
  {
    experience?: number;
    job?: string;
  }
  createdAt: string;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface UpdateUserResponse  extends User {
updatedAt: string;
skills?: string[];
}