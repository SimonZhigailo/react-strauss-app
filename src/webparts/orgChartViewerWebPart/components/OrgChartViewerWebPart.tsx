import * as React from 'react';
import { IOrgChartViewerWebPartProps } from './IOrgChartViewerWebPartProps';
import { IOrgChartViewerWebPartState } from './IOrgChartViewerWebPartState';
import {
  useGetUserProperties,
} from "../../../hooks";
import {
  MessageBar,
  MessageBarType,
  Overlay,
  Spinner,
  SpinnerSize,
  Text,
} from "office-ui-fabric-react";
import { EOrgChartTypes } from "./EOrgChartTypes";
import { IOrgChartItem, ChartItem } from './IOrgChartItem';
import { OrgChartReducer } from "./OrgChartReducer";
import { IStackStyles, Stack } from "office-ui-fabric-react/lib/Stack";
import { useOrgChartStyles } from "./useOrgChartStyles";
import { getGUID } from "@pnp/common";
import { PersonCard } from "../../../components/PersonCard/PersonCard";

const initialState: IOrgChartViewerWebPartState = {
  isLoading: true,
  currentUser: null,
  error: undefined,
  renderManagers: []
};

const titleStyle: IStackStyles = {
  root: {
    paddingBottom: 40,
  },
};

export const OrgChartViewerWebPart: React.FunctionComponent<IOrgChartViewerWebPartProps> = (
  props: IOrgChartViewerWebPartProps
) => {
  console.log('Start!');
  const [state, dispatch] = React.useReducer(OrgChartReducer, initialState);
  const { orgChartClasses } = useOrgChartStyles();
  const { getUserProfile } = useGetUserProperties();

  const onUserSelected = React.useCallback((selectedUser: ChartItem) => {
    dispatch({
      type: EOrgChartTypes.SET_CURRENT_USER,
      payload: selectedUser,
    });
  }, []);

  const {
    currentUser,
    renderManagers,
    isLoading,
    error,
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
      console.log(state.currentUser, "loadOrgChart:state.currentUser"); 

      try {
        renderManagersArray.forEach((element) => {
          wRenderManagers.push(
            <>
              <PersonCard
                key={getGUID()}
                userInfo={element}
                onUserSelected={onUserSelected}
                selectedUser={currentUser}
                showActionsBar={true}
              ></PersonCard>
              <div
                key={getGUID()}
                className={orgChartClasses.separatorVertical}
              ></div>
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

  // React.useEffect(() => {
  //   (async () => {
  //     try {
  //       if (startFromUserId === undefined)  return;
  //       if (startFromUserId === ''){
  //         dispatch({
  //           type: EOrgChartTypes.SET_IS_LOADING,
  //           payload: false,
  //         });
  //         dispatch({
  //           type: EOrgChartTypes.SET_HAS_ERROR,
  //           payload: {
  //             hasError: true,
  //             errorMessage: "User don't have email defined",
  //           },
  //         });
  //         return;
  //       }
  //       const { currentUserProfile } = await getUserProfile(startFromUserId);
  //       const wCurrentUser: IUserInfo = await manpingUserProperties(
  //         currentUserProfile
  //       );
  //       dispatch({
  //         type: EOrgChartTypes.SET_CURRENT_USER,
  //         payload: wCurrentUser,
  //       });
  //       dispatch({
  //         type: EOrgChartTypes.SET_HAS_ERROR,
  //         payload: { hasError: false, errorMessage: "" },
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       dispatch({
  //         type: EOrgChartTypes.SET_IS_LOADING,
  //         payload: false,
  //       });
  //       dispatch({
  //         type: EOrgChartTypes.SET_HAS_ERROR,
  //         payload: {
  //           hasError: true,
  //           errorMessage: "error",
  //         },
  //       });
  //     }
  //   })();
  // }, [getUserProfile, startFromUserId]);

  React.useEffect(() => {
    (async () => {
      if (!currentUser) return;
      dispatch({
        type: EOrgChartTypes.SET_IS_LOADING,
        payload: true,
      });

      const { userTree, wRenderManagers } = await loadOrgChart(
        currentUser.email
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
        <Stack horizontal horizontalAlign="center" styles={titleStyle}>
          <Text variant="xLarge" block>
            {"Иерархия Strauss"}
          </Text>
        </Stack>
        <Stack horizontalAlign="center" verticalAlign="center">
        {renderManagers}
          {/* <PersonCard
            key={getGUID()}
            userInfo={currentUser}
            onUserSelected={onUserSelected}
            selectedUser={currentUser}
          ></PersonCard>
          {currentUser.Parent && <PersonCard key={getGUID()}
            userInfo={currentUser.Parent}
            onUserSelected={onUserSelected} />} */}
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
