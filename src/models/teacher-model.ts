export class TeacherModel {
   id: string;
   name: string;
   surname: string;
   notes: string;
   profileImageUrl: string;
   schoolId: string;
   branchAdminId: string;
   schoolAdminId: string;

   public fromObject(obj: any): TeacherModel {
      this.id = obj.$key
      this.name = obj.name
      this.surname = obj.surname
      this.notes = obj.notes
      this.profileImageUrl = obj.profileImageUrl
      this.schoolId = obj.schoolId
      this.branchAdminId = obj.branchAdminId
      this.schoolAdminId = obj.schoolAdminId

      return this;
   }
}
