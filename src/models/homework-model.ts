
export class HomeworkModel {
   id: string;
   content: string;
   creationDate: string;
   // timestamp
   dueDate: number;
   subject: number;
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
