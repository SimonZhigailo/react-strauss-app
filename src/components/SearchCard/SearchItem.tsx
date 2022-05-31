import * as React from 'react';
import styles from '../SearchInput/PeopleSearch.module.scss';
import { ISearchItemProps } from './ISearchItemProps';
import { getGUID } from "@pnp/common";
import { Person } from '../Person/Person';
import { PersonaSize } from 'office-ui-fabric-react';


export const SearchItem: React.FunctionComponent<ISearchItemProps> = (
    props: ISearchItemProps
  ) => {
    const { userInfo, onUserSelected} = props;

    const onSearchQuerySelected = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onUserSelected(userInfo.email);
      }
      

    return (
        <>
                {/* <div key={getGUID()} className={styles.resultrow} onClick={onSearchQuerySelected}>
                <Person
                  text={userInfo.title}
                  secondaryText={userInfo.department}
                  tertiaryText={userInfo.position}
                  userEmail={userInfo.email}
                  pictureUrl={userInfo.pictureUrl}
                  size={PersonaSize.size24}
                />
          </div>  */}

          <div key={getGUID()} className={styles.resultrow} onClick={onSearchQuerySelected}>
               { userInfo['pictureUrl'] ? 
                 <img src={userInfo['pictureUrl']} alt={userInfo['title']}></img> : 
                 <img src='/_layouts/15/images/PersonPlaceholder.96x96x32.png' alt={userInfo['title']}></img> 
               }
               { userInfo['title'] ? <p style={{fontWeight:'bold'}}>{userInfo['title']}</p> : undefined }
               <p>{userInfo['department']}</p>
               <p>{userInfo['position']}</p>
               { userInfo['email'] ? <a href='mailto:{item["email"]}'>{userInfo['email']}</a> : undefined }
               <div className={styles.clear}></div>
          </div> 
      </>
    );
  }