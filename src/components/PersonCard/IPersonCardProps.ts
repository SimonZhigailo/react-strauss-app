import { ChartItem } from "../../webparts/orgChartViewerWebPart/components/IOrgChartItem";

export interface IPersonCardProps {
  userInfo: ChartItem;
  onUserSelected: (userMail: string) => void;
  selectedUser?: ChartItem;
  showActionsBar?: boolean;
}
