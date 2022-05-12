import { IErrorInfo, IOrgChartViewerWebPartState } from "../../orgChartViewerWebPart/components/IOrgChartViewerWebPartState";
import { ChartItem } from "../../orgChartViewerWebPart/components/IOrgChartItem";
import { EOrgChartTypes } from "./EOrgChartTypes";

export const OrgChartReducer = (
  state: IOrgChartViewerWebPartState,
  action: { type: EOrgChartTypes; payload: unknown }
):IOrgChartViewerWebPartState => {
  switch (action.type) {
    case EOrgChartTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload  as boolean};
    case EOrgChartTypes.SET_HAS_ERROR:
      return { ...state,  error: action.payload as IErrorInfo};
    case EOrgChartTypes.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload  as ChartItem};
      case EOrgChartTypes.SET_RENDER_MANAGERS:
        return { ...state, renderManagers: action.payload as JSX.Element[] };
    default:
      return state;
  }
};
