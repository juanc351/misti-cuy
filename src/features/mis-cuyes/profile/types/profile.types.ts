export interface AdminProfile {
  id: string;

  name: string;

  farmName: string;

  phone: string;

  department: string;

  location: string;

  description: string;

  createdAt?: string;

  updatedAt?: string;
}

export interface AdminProfileInput {
  name: string;

  farmName: string;

  phone: string;

  department: string;

  location: string;

  description: string;
}