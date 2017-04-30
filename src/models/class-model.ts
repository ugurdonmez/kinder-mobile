export class ClassModel {
    id: string;
    name: string;
    teacher_id: string;
    teacher_name: string;
    age: number;
    current: number;
    maximum: number;
    schoolId: string;
    attendance: any;
    gallery: any;
    homeworks: any;
    invitations: any;
    wall: any;
    wallRead: any;

    public fromObject(obj: any):ClassModel {
        this.id = obj.id;
        this.name = obj.name;
        this.teacher_id = obj.teacher_id;
        this.teacher_name = obj.teacher_name;
        this.age = obj.age;
        this.current = obj.current;
        this.maximum = obj.maximum;
        this.schoolId = obj.schoolId;
        this.attendance = obj.attendance;
        this.gallery = obj.gallery;
        this.homeworks = obj.homeworks;
        this.invitations = obj.invitations;
        this.wall = obj.wall;
        this.wallRead = obj.wallRead;
        return this;
    }
}
