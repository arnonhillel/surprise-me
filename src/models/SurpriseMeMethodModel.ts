import { RequestType } from "./request-type.enum";

export class SupriseMeModel {
    [RequestType.CHUCK_NORRIS_JOKE]: boolean;
    [RequestType.KANYE_QUOTE]: boolean;
    [RequestType.NAME_SUM]: boolean;
    [RequestType.BINARY_BIRTH_YEAR]: boolean;
}

