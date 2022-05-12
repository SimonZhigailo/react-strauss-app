import { ChartItem } from "./IOrgChartItem";

export interface IErrorInfo {
    hasError: boolean;
    errorMessage: string;
  }

export interface IOrgChartViewerWebPartState {
    isLoading: boolean;
    error:IErrorInfo;
    currentUser?: ChartItem;
    renderManagers:JSX.Element[];
}