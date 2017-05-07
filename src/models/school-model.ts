export class SchoolModel {
    id: string;
    name: string;
    membershipEnd: number;
    membershipStart: number;
    buildingAddress: string;
    branchId: string;
    isActivated: boolean;
    logoURL: string;
    managerName: string;
    managerTel: string;
    activationEmail: string;
    schoolTelephone: string;
    secondContactPersonName: string;
    secondContactTelNo: string;
    branchAdminId: string;
    schoolAdminId: string;

    public fromObject(obj: any):SchoolModel {

        this.id = obj.$key
        this.name = obj.name
        this.membershipEnd = obj.membershipEnd
        this.membershipStart = obj.membershipStart
        this.buildingAddress = obj.buildingAddress
        this.branchId = obj.branchId
        this.isActivated = obj.isActivated
        this.logoURL = obj.logoURL
        this.managerName = obj.managerName
        this.managerTel = obj.managerTel
        this.activationEmail = obj.activationEmail
        this.schoolTelephone = obj.schoolTelephone
        this.secondContactPersonName = obj.secondContactPersonName
        this.secondContactTelNo = obj.secondContactTelNo
        this.branchAdminId = obj.branchAdminId
        this.schoolAdminId = obj.schoolAdminId

        return this;
    }
}
