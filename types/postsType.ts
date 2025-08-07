export interface PostsType {
  id: number;
  image: string;
  image_url: string;
  title: string;
  content: string;
  created_at: string;
  user_id: number;
  FOREIGN: number;
}

export interface PostType {
  id: number;
  image: string;
  title: string;
  userFirstName: string;
  createdAt: string;
  content: string;
}
