export class CreateFirebaseStorageFileParams {
    readonly fileName: string;
    readonly path: string;
    readonly mimeType: string;
    readonly buffer: Buffer<ArrayBufferLike>;
}
