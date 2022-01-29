export interface FeatureType {
  id: number;
  category: string; // 'service', 'work', 'menu', 'reason', etc
  title: string;
  listImage: string;
  listComment: string;
  image?: string;
  body: string;
  link?: string;
}

type FeatureListItem = Pick<FeatureType, 'id' | 'category'|'title'|'listImage'|'listComment'>;
