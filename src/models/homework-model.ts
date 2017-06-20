
export class HomeworkModel {
    id: string;
    content: string;
    creationDate: string;
    dueDate: string;
    subject: string;
    completedStudents: any;

    public fromObject(obj: any):HomeworkModel {
        this.id = obj.id
        this.content = obj.content
        this.creationDate = obj.creationDate
        this.dueDate = obj.dueDate
        this.subject = obj.subject
        this.completedStudents = obj.completedStudents

        return this;
    }
}
