export interface ReviewResponse {
  id: number;
  comment: string;
  rating: number;
  date: string;
  userFirstName: string;
  userLastName: string;
  owner: boolean;
  canDelete: boolean;
}

export interface ReviewRequest {
  comment: string;
  rating: number;
}