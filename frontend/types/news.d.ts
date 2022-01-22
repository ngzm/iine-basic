export interface News {
  id: number;
  category: string;
  title: string;
  body: string;
  image?: string;
  link?: string;
  publishOn: Date;
}

type NewsListItem = Pick<News, 'id' | 'category'|'title'|'publishOn'>;
