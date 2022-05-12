import { ChartItem } from "../../webparts/orgChartViewerWebPart/components/IOrgChartItem";

export interface IPersonCardProps {
  userInfo: ChartItem;
  onUserSelected: (user: ChartItem) => void;
  selectedUser?: ChartItem;
  showActionsBar?: boolean;
}
