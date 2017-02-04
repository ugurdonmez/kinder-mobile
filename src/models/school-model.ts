export class SchoolModel {
    id: string;
    name: string;
    membershipEnd: number;
    membershipStart: number;
    buildingAddress: string;
    branchId: string;
    classes: Array<string>;
    isActivated: boolean;
    logoURL: string;
    managerName: string;
    managerTel: string;
    activationEmail: string;
    schoolTelephone: string;
    secondContactPersonName: string;
    secondContactTelNo: string;
}
