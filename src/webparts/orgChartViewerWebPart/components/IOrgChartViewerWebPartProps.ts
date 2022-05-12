import { WebPartContext } from "@microsoft/sp-webpart-base";


export interface IOrgChartViewerWebPartProps {
  currentUserName: string;
  context: WebPartContext;
  siteUrl: string;
}
