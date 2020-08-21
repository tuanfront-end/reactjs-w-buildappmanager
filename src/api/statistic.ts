export interface StatisticMobileAppItem {
  ID: string;
  userID: string;
  website: string;
  productID: string;
  category: string;
  description: string;
  version: string;
  updatedAt: string;
}

export interface StatisticMobileAppRes {
  status: 'success';
  items: StatisticMobileAppItem[];
}
