import { SerializedError } from "@reduxjs/toolkit";

export type UserData = {
    email: string,
    token: string,
    userId: string
}

export type AuthData = {
    success: boolean,
    data: UserData,
}

export type Auth = { data: any } | { error: { status: number, data: unknown } | SerializedError }