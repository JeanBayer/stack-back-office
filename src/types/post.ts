export interface Post {
  id: string;
  title: string;
  views: number;
  author?: string;
  date?: string;
}

export interface PostResponse {
  first: number;
  prev:  number;
  next:  number;
  last:  number;
  pages: number;
  items: number;
  data:  Post[];
}
