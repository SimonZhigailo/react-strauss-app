import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {OrgChartViewerWebPart} from './components/OrgChartViewerWebPart';
import { IOrgChartViewerWebPartProps } from './components/IOrgChartViewerWebPartProps';
import { sp } from "@pnp/sp";

export interface IOrgChartViewerWebPartWebPartProps {
  description: string;
}

export default class OrgChartViewerWebPartWebPart extends BaseClientSideWebPart<IOrgChartViewerWebPartWebPartProps> {

  protected onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context,
    });
return Promise.resolve();
  }

  public render(): void {
    const element: React.ReactElement<IOrgChartViewerWebPartProps> = React.createElement(
      OrgChartViewerWebPart,
      {
        currentUserName: this.context.pageContext.user["email"],
        // currentUserName: "svetlana.abramova@strauss.coffee",  //заглушка!
        context: this.context,
        siteUrl: this.context.pageContext.web.absoluteUrl
      }
    );
    ReactDom.render(element, this.domElement);
  }

  // private _getEnvironmentMessage(): string {
  //   if (!!this.context.sdks.microsoftTeams) { // running in Teams
  //     return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
  //   }

  //   return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  // }

  // protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
  //   if (!currentTheme) {
  //     return;
  //   }

  //   this._isDarkTheme = !!currentTheme.isInverted;
  //   const {
  //     semanticColors
  //   } = currentTheme;
  //   this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
  //   this.domElement.style.setProperty('--link', semanticColors.link);
  //   this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  // }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

//   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
//     return {
//       pages: [
//         {
//           header: {
//             description: strings.PropertyPaneDescription
//           },
//           groups: [
//             {
//               groupName: strings.BasicGroupName,
//               groupFields: [
//                 PropertyPaneTextField('description', {
//                   label: strings.DescriptionFieldLabel
//                 })
//               ]
//             }
//           ]
//         }
//       ]
//     };
//   }
}
