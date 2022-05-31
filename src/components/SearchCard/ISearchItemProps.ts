import { ChartItem } from "../../webparts/orgChartViewerWebPart/components/IOrgChartItem";

export interface ISearchItemProps {
  userInfo: ChartItem;
  onUserSelected: (userMail: string) => void;
}
