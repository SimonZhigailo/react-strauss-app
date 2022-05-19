// import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { sp } from "@pnp/sp/";

import { ChartItem } from "../webparts/orgChartViewerWebPart/components/IOrgChartItem";
import * as React from "react";

type getUserProfileFunc = ( currentUser: string,
    siteUrl: string) => Promise<returnProfileData>;

type returnProfileData =  { userTree:ChartItem, renderManagersArray: ChartItem []} ;

export const useGetUserProperties  =  ():  { getUserProfile:getUserProfileFunc }  => {
  const getUserProfile = React.useCallback(
    async (
      currentUser: string,
      siteUrl: string
    ): Promise<returnProfileData> => {
        var userTree: ChartItem;
        var renderManagersArray: ChartItem[];
        const allItems: any[] = await sp.web.lists.getByTitle("Сотрудники").items.select("ID", "gg_email", "gg_first_name_ru", "gg_patr_name_ru", "gg_last_name_ru", "gg_work_phone", "Director_full_nameId", "gg_position/gg_name_ru").expand("gg_position").orderBy("ID", true).getAll();
            let orgChartNodes: Array<ChartItem> = [];
            var count: number;
            for (count = 0; count < allItems.length; count++) {
              orgChartNodes.push(new ChartItem(
                allItems[count].ID,
                allItems[count].gg_first_name_ru ? allItems[count].gg_first_name_ru: "",
                allItems[count].gg_patr_name_ru ? allItems[count].gg_patr_name_ru: "",
                allItems[count].gg_last_name_ru ? allItems[count].gg_last_name_ru: "",
                allItems[count].gg_email,
                allItems[count].gg_work_phone, 
                allItems[count].gg_position ? allItems[count].gg_position.gg_name_ru : "", 
                allItems[count].Director_full_nameId
                ));
            }

            userTree = orgChartNodes.filter(x => x.email === currentUser)[0];
            var firstUser = userTree;
            renderManagersArray = new Array();
            renderManagersArray.push(firstUser);
            var user =  firstUser;
            var parentUser = orgChartNodes.filter(x => x.id === user.parent_id)[0];
        
            while(user.id !== user.parent_id){
              user.Parent = parentUser;
              user = parentUser;
              parentUser = orgChartNodes.filter(x => x.id === user.parent_id)[0];

              renderManagersArray.push(user);
            }

              renderManagersArray.reverse();
              console.log(renderManagersArray, "useGetUserProperties array");
              return {userTree, renderManagersArray}
    },
    []
  );

  return   { getUserProfile }  ;
};

// export const readOrgChartItems(): Promise<IOrgChartItem[]> {
//     return new Promise<IOrgChartItem[]>((resolve: (itemId: IOrgChartItem[]) => void, reject: (error: any) => void): void => {
//         this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('Сотрудники')/items?$select=ID,gg_email,gg_first_name_ru,gg_patr_name_ru,gg_last_name_ru,gg_work_phone,Director_full_nameId,gg_position/gg_name_ru&$expand=gg_position&$top=1000`,
//       SPHttpClient.configurations.v1,
//       {
//         headers: {
//           'Accept': 'application/json;odata=nometadata',
//           'odata-version': ''
//         }
//       })
//       .then((response: SPHttpClientResponse): Promise<{ value: IOrgChartItem[] }> => {
//         return response.json();
//       })
//       .then((response: { value: IOrgChartItem[] }): void => {
//         resolve(response.value);
//       }, (error: any): void => {
//         reject(error);
//       });
//     });    
//   }

//   private processOrgChartItems(): void {
//     this.readOrgChartItems()
//       .then((orgChartItems: IOrgChartItem[]): void => {
//         let orgChartNodes: Array<ChartItem> = [];
//         var count: number;
//         for (count = 0; count < orgChartItems.length; count++) {
//           orgChartNodes.push(new ChartItem(
//             orgChartItems[count].ID,
//             orgChartItems[count].gg_first_name_ru,
//             orgChartItems[count].gg_patr_name_ru,
//             orgChartItems[count].gg_last_name_ru,
//             orgChartItems[count].gg_email,
//             orgChartItems[count].gg_work_phone, 
//             orgChartItems[count].gg_name_ru, 
//             orgChartItems[count].Director_full_nameId
//             ));
//         }
        

//         this.setState({
//           orgChartItems: orgChartNodes,
//           orgChartTree: this.buildUserTree(orgChartNodes)
//         });
//       });
//   }

//   private buildUserTree(itemsToFilter: ChartItem[]): any
//   {
//     var firstUser = itemsToFilter.filter(x => x.email === this.props.listName)[0];
//     var user =  firstUser;
//     var parentUser = itemsToFilter.filter(x => x.id === user.parent_id)[0];

//     while(user.id !== user.parent_id){
//       user.Parent = parentUser;
//       user = parentUser;
//       parentUser = itemsToFilter.filter(x => x.id === user.parent_id)[0];
//     }

//     return firstUser;
//   }

