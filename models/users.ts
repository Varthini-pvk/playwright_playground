export interface User {
  id?: number;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  details? :
  {
    experience?: number;
    job?: string;
  }
  createdAt?: string;
  skills?: string[];
  role?: string;
  password?:string;
  active?:boolean;
  country?:string;
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