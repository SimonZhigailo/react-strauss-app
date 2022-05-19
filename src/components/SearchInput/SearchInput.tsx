import * as React from 'react';
import SearchInput, {createFilter} from 'react-search-input'

import { ChartItem } from "../../webparts/orgChartViewerWebPart/components/IOrgChartItem";
import { OrgChartReducer } from '../../webparts/orgChartViewerWebPart/components/OrgChartReducer';

const KEYS_TO_FILTERS = ['lastName', 'email', 'position']
// развернуть приложение и спросить как фотки в azure взять

// const [state, dispatch] = React.useReducer(OrgChartReducer, initialState);

// const initialState: IOrgChartViewerWebPartState = {
//     isLoading: true,
//     currentUser: null,
//     error: undefined,
//     renderManagers: []
//   };