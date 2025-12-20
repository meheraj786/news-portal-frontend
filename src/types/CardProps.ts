export interface CardProps {
  _id: string;

  title: string;
  content?: string;
  createdAt?: string;

  image?: {
    url?: string;
  };

  category?: {
    name?: string;
  };
}
