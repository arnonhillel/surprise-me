import { RequestType } from "./request-type.enum";

export interface statsModel {
  requests: number;
  distribution: distributionItem[];
}
export interface distributionItem {
  type: RequestType;
  count: number;
}
