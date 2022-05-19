export interface IOrgChartItem {
    ID: number;
    gg_email?: string;
    gg_first_name_ru?: string;
    gg_patr_name_ru?: string;
    gg_last_name_ru?: string;
    gg_work_phone?: string;
    Director_full_nameId?: number;
    gg_position?: gg_position;
    //ParentList/ImageUrl ссылка на img
}

export interface gg_position{
    gg_name_ru?: string;
}

export class ChartItem {
    id?: number;
    title?: string;
    firstName?: string;
    surName?: string;
    lastName?: string;
    email?: string;
    workPhone?: string;
    position?: string;
    parent_id?: number;
    Parent?: ChartItem;
    pictureUrl?: string;

    constructor(id: number, firstName: string, surName: string, lastName: string, email?: string, workPhone?: string, position?: string, parent_id?: number) {
        this.id = id;
        this.title = firstName + " " + surName + " " + lastName; 
        this.firstName = firstName;
        this.surName = surName;
        this.lastName = lastName;
        this.email = email;
        this.workPhone = workPhone;
        this.position = position;
        this.parent_id = parent_id;
    }
}