export interface IOrgChartItem {
    ID: number;
    gg_email?: string;
    gg_first_name_ru?: string;
    gg_patr_name_ru?: string;
    gg_last_name_ru?: string;
    gg_work_phone?: string;
    gg_office_phone?: string;
    Director_full_nameId?: number;
    gg_position?: gg_position;
    gg_departament?: gg_departament;
    //ParentList/ImageUrl ссылка на img
}

export interface gg_position{
    gg_name_ru?: string;
}

export interface gg_departament{
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
    officePhone?: string;
    position?: string;
    parent_id?: number;
    Parent?: ChartItem;
    pictureUrl?: string;
    department?: string;

    constructor(id: number, firstName: string, surName: string, lastName: string, email?: string, workPhone?: string, officePhone?: string, position?: string, department?: string, parent_id?: number) {
        this.id = id;
        this.title = lastName + " " + firstName + " " + surName; 
        this.firstName = firstName;
        this.surName = surName;
        this.lastName = lastName;
        this.email = email;
        this.workPhone = workPhone;
        this.officePhone = officePhone;
        this.position = position;
        this.pictureUrl = `/_layouts/15/userphoto.aspx?size=M&accountname=${email}`
        this.parent_id = parent_id;
        this.department = department;
    }
}