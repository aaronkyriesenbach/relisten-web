import { Meta } from "./Meta";

export type ReceivedData<T> = {
    data: T[],
    meta: Meta;
};