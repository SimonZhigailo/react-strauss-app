// import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { sp } from "@pnp/sp/";

import { ChartItem } from "../webparts/orgChartViewerWebPart/components/IOrgChartItem";
import * as React from "react";

type getUserProfileFunc = ( currentUser: string, siteUrl: string) => Promise<returnProfileData>;

type getUserSearhInfoFunc = ( searchQuery: string) => Promise<returnSearchInfoData>;

type returnProfileData =  { userTree:ChartItem, renderManagersArray: ChartItem []} ;

type returnSearchInfoData = {users: ChartItem []};

export const useGetUserProperties  =  ():  { getUserProfile:getUserProfileFunc }  => {
  const getUserProfile = React.useCallback(
    async (
      currentUser: string,
      siteUrl: string
    ): Promise<returnProfileData> => {
        var userTree: ChartItem;
        var renderManagersArray: ChartItem[];
        const allItems: any[] = await sp.web.lists.getByTitle("Employees").
        items.select("ID", "gg_email", "gg_first_name_ru", "gg_patr_name_ru", "gg_last_name_ru", "gg_work_phone", 
        "gg_manager_idId", "gg_departament/gg_name_ru", "gg_position/gg_name_ru")
        .expand("gg_departament", "gg_position").orderBy("ID", true).getAll();
        // const allItems: any[] = await sp.web.lists.getByTitle("Employees").items.getAll();
        let orgChartNodes: Array<ChartItem> = [];
            var count: number;
            for (count = 0; count < allItems.length; count++) {
              
              orgChartNodes.push(new ChartItem(
                allItems[count].ID,
                allItems[count].gg_first_name_ru ? allItems[count].gg_first_name_ru.replace(/ /g,'') : "",
                allItems[count].gg_patr_name_ru ? allItems[count].gg_patr_name_ru.replace(/ /g,'') : "",
                allItems[count].gg_last_name_ru ? allItems[count].gg_last_name_ru.replace(/ /g,'') : "",
                allItems[count].gg_email,
                allItems[count].gg_work_phone, 
                allItems[count].gg_office_phone, 
                allItems[count].gg_position ? allItems[count].gg_position.gg_name_ru : "", 
                allItems[count].gg_departament ? allItems[count].gg_departament.gg_name_ru : "",
                allItems[count].gg_manager_idId
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
              return {userTree, renderManagersArray}
    },
    []
  );

  return   { getUserProfile }  ;
};
export const useGetUsersSearchInfo = (): {getUserSearhInfo:getUserSearhInfoFunc} => {
  const getUserSearhInfo = React.useCallback(
    async (
      searchQuery: string
    ): Promise<returnSearchInfoData> => {
      const allItems: any[] = await sp.web.lists.getByTitle("Employees").
      items.select("ID", "gg_email", "gg_first_name_ru", "gg_patr_name_ru", "gg_last_name_ru", "gg_work_phone", 
      "gg_manager_idId", "gg_departament/gg_name_ru", "gg_position/gg_name_ru").filter("substringof('"+searchQuery+"', gg_last_name_ru)")
      .expand("gg_departament", "gg_position").orderBy("ID", true).top(5).get();
        let users: Array<ChartItem> = [];
            var count: number;
            for (count = 0; count < allItems.length; count++) {
              
              users.push(new ChartItem(
                allItems[count].ID,
                allItems[count].gg_first_name_ru ? allItems[count].gg_first_name_ru.replace(/ /g,'') : "",
                allItems[count].gg_patr_name_ru ? allItems[count].gg_patr_name_ru.replace(/ /g,'') : "",
                allItems[count].gg_last_name_ru ? allItems[count].gg_last_name_ru.replace(/ /g,'') : "",
                allItems[count].gg_email,
                allItems[count].gg_work_phone, 
                allItems[count].gg_office_phone, 
                allItems[count].gg_position ? allItems[count].gg_position.gg_name_ru : "", 
                allItems[count].gg_department ? allItems[count].gg_departament.gg_name_ru : "",
                allItems[count].gg_manager_idId
                ));
            }
              return {users}
    },
    []
  );

  return   { getUserSearhInfo }  ;
};