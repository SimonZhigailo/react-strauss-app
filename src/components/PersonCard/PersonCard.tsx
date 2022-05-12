/* tslint:disable */
import * as React from "react";
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardDetails,
  IDocumentCard,
} from "office-ui-fabric-react/lib/DocumentCard";

import {
  Stack,
  IButtonProps,
  HoverCard,
  HoverCardType,
  IExpandingCardProps,
  PersonaSize,
  DirectionalHint,
} from "office-ui-fabric-react";
import { Person } from "../Person/Person";
import { ChartItem } from "../../webparts/orgChartViewerWebPart/components/IOrgChartItem";
import { ExpandedCard, CompactCard } from "../HoverCard";
import { usePersonaCardStyles } from "./usePersonaCardStyles";
import { IPersonCardProps } from "./IPersonCardProps";

const currentTheme = window.__themeState__.theme;

export const PersonCard: React.FunctionComponent<IPersonCardProps> = (
  props: IPersonCardProps
) => {
  const { userInfo, onUserSelected, showActionsBar } = props;

  const documentCardRef = React.useRef<IDocumentCard>(undefined);
  const {
    personaCardStyles,
    documentCardActionStyles,
    buttonStyles,
    stackPersonaStyles,
  } = usePersonaCardStyles();

  const documentCardActions: IButtonProps[] = React.useMemo(() => {
    const cardActions: IButtonProps[] = [];

    cardActions.push({
      iconProps: { iconName: "Chat" },
      title: "Chat",
      styles: buttonStyles,
      onClick: (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        window.open(
          `https://teams.microsoft.com/l/chat/0/0?users=${userInfo.email}&message=Hi ${userInfo.title} `,
          "_blank"
        );
      },
    });

    if (userInfo?.email) {
      cardActions.push({
        iconProps: { iconName: "Mail" },
        title: "Mail",
        styles: buttonStyles,
        onClick: (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          window.open(`MAILTO:${userInfo.email}`, "_blank");
        },
      });
    }

    if (userInfo?.workPhone) {
      cardActions.push({
        iconProps: { iconName: "Phone" },
        title: "Call",
        styles: buttonStyles,
        onClick: (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          window.open(`CALLTO:${userInfo.workPhone}`, "_blank");
        },
      });
    }

    return cardActions;
  }, [
    buttonStyles,
    userInfo.title,
    userInfo.email,
    userInfo.position,
    userInfo.workPhone,
  ]);

  const onRenderCompactCard = React.useCallback(
    (user: ChartItem): JSX.Element => <CompactCard user={user} />,
    []
  );

  const onRenderExpandedCard = React.useCallback(
    (user: ChartItem): JSX.Element => <ExpandedCard user={user} />,
    []
  );

  const expandingCardProps: IExpandingCardProps = React.useMemo(() => {
    return {
      onRenderCompactCard: onRenderCompactCard,
      onRenderExpandedCard: onRenderExpandedCard,
      renderData: userInfo,
      directionalHint: DirectionalHint.rightTopEdge,
      styles: {
        expandedCard: { backgroundColor: currentTheme.neutralLighterAlt },
      },
      gapSpace: 5,
      calloutProps: {
        isBeakVisible: false,
      },
    };
  }, [onRenderCompactCard, onRenderExpandedCard, userInfo]);

  return (
    <>
      <DocumentCard
        className={personaCardStyles.tile}
        componentRef={documentCardRef}
        onClick={() => {
          //  documentCardRef.current.focus();
        //   if (userInfo.hasDirectReports) {
        //     onUserSelected(userInfo);
        //     //
        //   }
        }}
      >
        <HoverCard
          expandingCardProps={expandingCardProps}
          type={HoverCardType.expanding}
        >
          <DocumentCardDetails>
            <Stack
              horizontal
              horizontalAlign="space-between"
              styles={stackPersonaStyles}
            >
              <Person
                text={userInfo.title}
                secondaryText={userInfo.position}
                userEmail={userInfo.email}
                pictureUrl={userInfo.pictureUrl}
                size={PersonaSize.size40}
              />
            </Stack>
          </DocumentCardDetails>
        </HoverCard>
        {showActionsBar && (
          <DocumentCardActions
            actions={documentCardActions}
            styles={documentCardActionStyles}
          />
        )}
      </DocumentCard>
    </>
  );
};
