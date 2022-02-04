export interface NewsType {
  id: number;
  category: string;
  title: string;
  body: string;
  image?: string;
  link?: string;
  publishOn: Date;
}

type NewsListItem = Pick<NewsType, 'id' | 'category'|'title'|'publishOn'>;
