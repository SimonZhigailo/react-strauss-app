import {
    Stack,
    FontIcon,
    Text,
    IStackTokens,
    PersonaSize,
    Link,
  } from  "office-ui-fabric-react"
  import * as React from "react";
  import { Person } from "../Person/Person";
  import { IExpandedCardProps } from "./IExpandedCardProps";
  import { useHoverCardStyles } from "./useHoverCardStyles";
  import {
    useGetUserProperties,
  } from "../../hooks/useGetUserProperties";
  import { ChartItem } from "../../webparts/orgChartViewerWebPart/components/IOrgChartItem";
  export const ExpandedCard: React.FunctionComponent<IExpandedCardProps> = (
    props: IExpandedCardProps
  ) => {
    const { user } = props;
    const { expandedCardStackStyle, hoverCardStyles } = useHoverCardStyles();
  
    const stackFieldTokens: IStackTokens = {
      childrenGap: 15,
  
    };
  
  
    // React.useEffect(() => {
    //   if (!user.manager) {
    //     return;
    //   }
  
    //   (async () => {
    //     const { currentUserProfile } = await getUserProfile(user.manager);
    //     const wManager: IUserInfo = await manpingUserProperties(
    //       currentUserProfile
    //     );
    //     setManager(wManager);
    //   })();
    // }, [getUserProfile, user.manager]);
  
    return (
      <>
        <Stack tokens={{ childrenGap: 10 }} styles={expandedCardStackStyle}>
          <Text variant="medium" style={{ fontWeight: 600 }}>
            Contact
          </Text>
          {
            user.email && (
              <>
              <Stack
              horizontal
              horizontalAlign="start"
              verticalAlign="center"
              styles={{root:{padding: 5}}}
              tokens={stackFieldTokens}
            >
              <FontIcon iconName="mail" className={hoverCardStyles.iconStyles} />
              <Link href={`MAILTO:${user.email}`}   target="_blank"
                    data-interception="off">
                <Text variant="smallPlus">{user.email}</Text>
              </Link>
            </Stack>
            <div className={hoverCardStyles.separatorHorizontal}></div>
            </>
            )
          }
  
          {user.workPhone && (
            <>
              <Stack
                horizontal
                horizontalAlign="start"
                verticalAlign="center"
                tokens={stackFieldTokens}
                styles={{root:{padding: 5}}}
              >
                <FontIcon
                  iconName="Phone"
                  className={hoverCardStyles.iconStyles}
                />
                <Link href={`CALLTO:${user.workPhone}`}   target="_blank"
                  data-interception="off">
                  <Text variant="smallPlus">{user.workPhone}</Text>
                </Link>
              </Stack>
              <div className={hoverCardStyles.separatorHorizontal}></div>
            </>
          )}
  
          {user.officePhone && (
            <>
              <Stack
                horizontal
                horizontalAlign="start"
                verticalAlign="center"
                tokens={stackFieldTokens}
                styles={{root:{padding: 5}}}
              >
                <FontIcon
                  iconName="Home"
                  className={hoverCardStyles.iconStyles}
                />
                <Link href={`CALLTO:${user.officePhone}`}   target="_blank"
                  data-interception="off">
                  <Text variant="smallPlus">{user.officePhone}</Text>
                </Link>
              </Stack>
              <div className={hoverCardStyles.separatorHorizontal}></div>
            </>
          )}

        </Stack>
      </>
    );
  };
  