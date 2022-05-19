import * as React from 'react';
import SearchInput, {createFilter} from 'react-search-input'

import { ChartItem } from "../../webparts/orgChartViewerWebPart/components/IOrgChartItem";
import { OrgChartReducer } from '../../webparts/orgChartViewerWebPart/components/OrgChartReducer';
import { ISearchInputProps } from './ISearchInputProps';

const KEYS_TO_FILTERS = ['lastName', 'email', 'position']
// развернуть приложение и спросить как фотки в azure взять

// export const SearchInput: React.FunctionComponent<ISearchInputProps> = (
//     props: ISearchInputProps
//   ) => {
//     const { userInfo, onUserSelected, showActionsBar } = props;

//   };