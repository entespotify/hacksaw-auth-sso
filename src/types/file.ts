export type FileType = {
    name: string,
    type: string,
    size: number,
    createdAt: string
}

export type DirectoryCreationRequestType = {
    dirname: string,
    path: string
}

export type UploadRequestType = {
    body: FormData,
    path: string
}

export type BreadcrumbType = {
    name: string,
    path: string
}
