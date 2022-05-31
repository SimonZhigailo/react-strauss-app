import * as React from 'react';
import { IOrgChartViewerWebPartProps } from './IOrgChartViewerWebPartProps';
import { IOrgChartViewerWebPartState } from './IOrgChartViewerWebPartState';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

import {
  useGetUserProperties,
  useGetUsersSearchInfo
} from "../../../hooks";
import {
  MessageBar,
  MessageBarType,
  Overlay,
  Spinner,
  SpinnerSize,
  Text,
} from "office-ui-fabric-react";
import styles from '../../../components/SearchInput/PeopleSearch.module.scss';
import { EOrgChartTypes } from "./EOrgChartTypes";
import { ChartItem } from './IOrgChartItem';
import { OrgChartReducer } from "./OrgChartReducer";
import { IStackStyles, Stack } from "office-ui-fabric-react/lib/Stack";
import { useOrgChartStyles } from "./useOrgChartStyles";
import { getGUID } from "@pnp/common";
import { PersonCard } from "../../../components/PersonCard/PersonCard";
import { SearchItem } from '../../../components/SearchCard/SearchItem';

const initialState: IOrgChartViewerWebPartState = {
  isLoading: true,
  currentUser: null,
  error: undefined,
  renderManagers: [],
  renderSearchItems: [],
  searchQuery:""
};

const titleStyle: IStackStyles = {
  root: {
    paddingBottom: 40,
  },
};

export const OrgChartViewerWebPart: React.FunctionComponent<IOrgChartViewerWebPartProps> = (
  props: IOrgChartViewerWebPartProps
) => {
  const [state, dispatch] = React.useReducer(OrgChartReducer, initialState);
  const { orgChartClasses } = useOrgChartStyles();
  const { getUserProfile } = useGetUserProperties();
  const { getUserSearhInfo } = useGetUsersSearchInfo();

  const onUserSelected = React.useCallback((userEmail: string) => {
    loadOrgChart(userEmail);
  }, []);


  const {
    currentUser,
    renderManagers,
    isLoading,
    error,
    renderSearchItems,
    searchQuery
  }: IOrgChartViewerWebPartState = state;

  const {
    currentUserName,
    context,
    siteUrl
  }: IOrgChartViewerWebPartProps = props;

  const loadOrgChart = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (selectedUser: string): Promise<any> => {
      const wRenderManagers: JSX.Element[] = [];
      const { userTree, renderManagersArray } = await getUserProfile(
        selectedUser ?? currentUserName,
        siteUrl
      );
      try {
        renderManagersArray.forEach((element) => {
          wRenderManagers.push(
            <>
              { element.Parent && 
              <div
                key={getGUID()}
                className={orgChartClasses.separatorVertical}
              ></div> 
              }
              <PersonCard
                key={getGUID()}
                userInfo={element}
                onUserSelected={onUserSelected}
                selectedUser={currentUser}
                showActionsBar={true}
              ></PersonCard>
            </>
          );
        });

        dispatch({
          type: EOrgChartTypes.SET_HAS_ERROR,
          payload: { hasError: false, errorMessage: "" },
        });
        dispatch({
          type: EOrgChartTypes.SET_IS_LOADING,
          payload: false,
        });
        
        dispatch({
          type: EOrgChartTypes.SET_RENDER_MANAGERS,
          payload: wRenderManagers,
        });

        ClearSearchBox();

      } catch (error) {
        console.log(error);
        dispatch({
          type: EOrgChartTypes.SET_IS_LOADING,
          payload: false,
        });
        dispatch({
          type: EOrgChartTypes.SET_HAS_ERROR,
          payload: {
            hasError: true,
            errorMessage: "error",
          },
        });
      }

      return {userTree, wRenderManagers};
    },

    [
      getUserProfile,
      onUserSelected,
      currentUser,
      currentUserName
      // orgChartClasses.separatorVertical,
    ]
  );

  const loadSearchUsers = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (searchQuery: string): Promise<any> => {

      dispatch({
        type: EOrgChartTypes.SET_SEARCH_QUERY,
        payload: searchQuery,
      });
      
      const wRenderSearchManager: JSX.Element[] = [];
      const { users } = await getUserSearhInfo(searchQuery);

      users.forEach((element) => {
        wRenderSearchManager.push(
          <>
            <SearchItem onUserSelected={onUserSelected} userInfo={element}
            ></SearchItem>
          </>
        );
      });

      if(searchQuery === "")
      {
        wRenderSearchManager.length = 0;
      }

      dispatch({
        type: EOrgChartTypes.SET_REDNDER_SEARCH_INFO,
        payload: wRenderSearchManager,
      });
      return {wRenderSearchManager};
    },

    [
      getUserSearhInfo,
      onUserSelected,
      searchQuery,
    ]
  );

  const ClearSearchBox = () => {
    dispatch({
      type: EOrgChartTypes.SET_SEARCH_QUERY,
      payload: "",
    });
    
    dispatch({
      type: EOrgChartTypes.SET_REDNDER_SEARCH_INFO,
      payload: [],
    });
  }

  React.useEffect(() => {
    (async () => {
      dispatch({
        type: EOrgChartTypes.SET_IS_LOADING,
        payload: true,
      });
      const { userTree, wRenderManagers } = await loadOrgChart(
        currentUser ? currentUser.email : currentUserName
      );
      dispatch({
        type: EOrgChartTypes.SET_RENDER_MANAGERS,
        payload: wRenderManagers,
      });
      dispatch({
        type: EOrgChartTypes.SET_IS_LOADING,
        payload: false,
      });
    })();
  }, [currentUser, loadOrgChart]);
  
const onTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
  if(e?.target?.value !== "")
    loadSearchUsers(e.target.value);
  else
    ClearSearchBox();
};

const onTextSubmited = (e: React.ChangeEvent<HTMLInputElement>) => {
  if(state.renderSearchItems.length != 0){
    // onUserSelected()
  }
};

const onClear = (e: React.ChangeEvent<HTMLInputElement>) => {
  ClearSearchBox();
};

  if (isLoading) {
    return (
      <Overlay style={{ height: "100%", position: "fixed" }}>
        <Stack style={{ height: "100%" }} verticalAlign="center">
          <Spinner
            styles={{ root: { zIndex: 9999 } }}
            size={SpinnerSize.large}
            label={"Загрузка иерархии..."}
            labelPosition={"bottom"}
          ></Spinner>
        </Stack>
      </Overlay>
    );
  }

  if (error && error.hasError) {
    return (
      <Stack
        horizontal
        horizontalAlign="center"
        styles={{root:{padding: 20}}}
        tokens={{ childrenGap: 10 }}
      >
        <MessageBar messageBarType={MessageBarType.error} isMultiline>
          {error.errorMessage}
        </MessageBar>
      </Stack>
    );
  }

    return (
      <>
      <Stack  styles={{root:{padding: 20}}} >
      <>
              <div className = { styles.peopleSearch } >
              <div className={styles.container}>
                <div className={styles.row}>
                  <div className={styles.column}>
            <SearchBox
              className="react-search-box" 
              value={searchQuery}
              onChange={onTextChanged}
              onSearch={onTextSubmited}
              onClear={onClear}
              // onBlur={onClear}
              >
            </SearchBox>
                  {/* <SearchInput className="search-input" onChange={searchUpdated}/> */}
                    <div className={styles.resultdiv}>
                        {renderSearchItems}
                      </div>
                  </div>
                </div>
              </div>
              </div >
        </>
        {/* <Stack horizontal horizontalAlign="center" styles={titleStyle}>
          <Text variant="xLarge" block>
            {"Иерархия Strauss"}
          </Text>
        </Stack> */}
        <Stack horizontalAlign="center" verticalAlign="center">
        {renderManagers}
        </Stack>
        <Stack
          horizontal
          horizontalAlign="center"
          styles={{root:{padding: 10}}}
          tokens={{ childrenGap: 15 }}
          wrap
        >
        </Stack>
      </Stack>
    </>
    );
}
