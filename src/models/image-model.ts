export class ImageModel {
    id: string
    imgUrl: string;
    albumId: string;

    public fromObject(obj: any):ImageModel {
        this.id = obj.$key
        this.imgUrl = obj.imgUrl
        this.albumId = obj.albumId

        return this;
    }
}
