export class AlbumModel {
    id: string
    name: string;

    public fromObject(obj: any):AlbumModel {
        this.id = obj.$key
        this.name = obj.$value

        return this;
    }
}
