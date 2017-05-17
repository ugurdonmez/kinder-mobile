export class BranchModel {
    id: string;
    name: string;
    tel: string;
    logoURL: string;
    manager: string;
    manager_tel: string;
    manager_mail: string;
    address: string;
    branchAdminId: string;

    public fromObject(obj: any):BranchModel {

        this.id = obj.$key
        this.name = obj.name
        this.tel = obj.tel
        this.logoURL = obj.logoURL
        this.manager = obj.manager
        this.manager_tel = obj.manager_tel
        this.manager_mail = obj.manager_mail
        this.address = obj.address
        this.branchAdminId = obj.branchAdminId

        return this;
    }
}
