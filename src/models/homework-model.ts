
export class HomeworkModel {
   id: string;
   content: string;
   creationDate: number;
   // timestamp
   dueDate: number;
   subject: string;
   completedStudents: any;
   parentId: string

   public fromObject(obj: any): HomeworkModel {
      this.id = obj.id
      this.content = obj.content
      this.creationDate = obj.creationDate
      this.dueDate = obj.dueDate
      this.subject = obj.subject
      this.completedStudents = obj.completedStudents
      this.parentId = obj.parentId

      return this;
   }
}
