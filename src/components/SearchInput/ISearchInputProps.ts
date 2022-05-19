import { ChartItem } from "../../webparts/orgChartViewerWebPart/components/IOrgChartItem";

export interface ISearchInputProps {
  userInfo: ChartItem;
  onUserSelected: (user: ChartItem) => void;
  selectedUser?: ChartItem;
  showActionsBar?: boolean;
}