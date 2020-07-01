import { RequestType } from "./request-type.enum";

export interface statsModel {
  requests: number;
  distribution: distributionItem[];
}
export interface distributionItem {
  type: RequestType;
  count: number;
}

// {
//     "requests": 27,
//     "distribution": [
//         {
//             "type": "chuck-norris-joke",
//             "count": 12
//         },
//         {
//             "type": "kanye-quote",
//             "count": 9
//         },
//         {
//             "type": "name-sum",
//             "count": 6
//         }
//     ]
// }
