export interface CardProps {
  image: {
    url?: string;};
  tag?: string;
  category:{
    name?: string
  }
  title: string;
  createdAt?: string; // optional
  content?: string; // optional
}
