import * as React from "react";
import {
  IPersonaSharedProps,
  Persona,
  PersonaSize,
} from "office-ui-fabric-react/lib/Persona";
import { Text } from "office-ui-fabric-react/lib/Text";
import { IPersonProps } from "./IPersonProps";

export const Person: React.FunctionComponent<IPersonProps> = (
  props: IPersonProps
) => {
  const { text, secondaryText, userEmail, size, tertiaryText , pictureUrl} = props;

  const personProps: IPersonaSharedProps = React.useMemo(() => {
    return {
      // imageUrl: pictureUrl ? `/_layouts/15/userphoto.aspx?size=M&accountname=${userEmail}` : undefined,
      imageUrl: `/_layouts/15/userphoto.aspx?size=M&accountname=${userEmail}`,
      text: text,
      secondaryText: secondaryText,
      tertiaryText: tertiaryText,
    };
  }, [pictureUrl, userEmail, text, secondaryText, tertiaryText]);

  const _onRenderPrimaryText = React.useCallback(() => {
    return (
      <>
        <Text
          title={text}
          variant="mediumPlus"
          styles={{ root: { fontWeight: 600, whiteSpace:"pre-wrap"} }}
          block
        >
          {text}
        </Text>
      </>
    );
  }, [text]);

  const _onRenderSecondaryText = React.useCallback(() => {
    return (
      <>
        <Text
          title={secondaryText}
          variant="smallPlus"
          block
          styles={{ root: { fontWeight: 400, whiteSpace:"pre-wrap"} }}
        >
          {secondaryText}
        </Text>
      </>
    );
  }, [secondaryText]);

  const _onRenderTertiaryText = React.useCallback(() => {
    return (
      <>
        <Text
          title={tertiaryText}
          variant="smallPlus"
          block
          styles={{ root: { fontWeight: 400, whiteSpace:"pre-wrap"} }}
        >
          {tertiaryText}
        </Text>
      </>
    );
  }, [tertiaryText]);


  return (
    <>
      <Persona
        {...personProps}
        size={size || PersonaSize.size48}
        onRenderPrimaryText={_onRenderPrimaryText}
        onRenderSecondaryText={_onRenderSecondaryText}
        onRenderTertiaryText={_onRenderTertiaryText}
        styles={{
          secondaryText: { maxWidth: 230 },
          primaryText: { maxWidth: 230 },
          tertiaryText: { maxWidth: 230 },
        }}
      />
    </>
  );
};
