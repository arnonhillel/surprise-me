import { SupriseMeModel } from "../models/SurpriseMeMethodeModel";
import { statsController } from "../controllers/stats.controller";
import { RequestType } from "../models/request-type.enum";
const db = require("../models/statsModel/index.js");
const Stats = db.stats;

const fetch = require("node-fetch");
class SurpriseMeService {
  public async doSurpriseMeMethode(n: string, bYear: string) {
    var randomArray: any[] = [];
    let name = "";
    if (n) {
      name = n.toLowerCase();
    }

    randomArray = await this.getTrueConArrayMethod(n, bYear);
    let requestType =
      randomArray[Math.floor(Math.random() * randomArray.length)];
    console.log("random met:  " + requestType);

    const response = {
      type: requestType,
      result: await this.getResultByType(requestType, name),
    };
    
    this.saveInDB(requestType);

    return response;
  }

  public async saveInDB(requestType: RequestType) {
    await Stats.create({ type: requestType });
    console.log(`Created user`);
  }

  /**
   *
   * return array with valid methode
   *
   * @param n - name from q param
   * @param bYear birth year from q param
   */

  public getTrueConArrayMethod(n: string, bYear: string): any[] {
    const surpriseMeMethod: SupriseMeModel = {
      [RequestType.CHUCK_NORRIS_JOKE]: false,
      [RequestType.KANYE_QUOTE]: false,
      [RequestType.NAME_SUM]: false,
    };
    var randomArray: any[] = [];
    let birthYear;
    let name = "";
    if (bYear) {
      birthYear = parseInt(bYear);
    }
    if (n) {
      name = n.toLowerCase();
    }

    //init surpriseme
    surpriseMeMethod[RequestType.CHUCK_NORRIS_JOKE] =
      !!birthYear && birthYear <= 2000;
    surpriseMeMethod[RequestType.KANYE_QUOTE] =
      !!birthYear &&
      birthYear > 2000 &&
      !!name &&
      !name.startsWith("a") &&
      !name.startsWith("z");
    surpriseMeMethod[RequestType.NAME_SUM] = !!name && !name.startsWith("q");

    for (let [key, value] of Object.entries(surpriseMeMethod)) {
      console.log(key + ": " + value);
      if (value) {
        randomArray.push(key);
      }
    }
    return randomArray;
  }

  /**
   * If this type was chosen, we should return a random Kanye West quote.
   * You can use this API to get quotes.
   * This type should be chosen only if the user’s birth year is after 2000 and the user’s first
   * name doesn’t start with ‘A’ or ‘Z’.
   */

  public async chuckNorrisJoke() {
    let url = "https://api.chucknorris.io/jokes/random";
    let response;
    await fetch(url)
      .then((response: any) => response.json())
      .then((data: any) => {
        response = data;
      });
    if (response && response["value"]) {
      return (await "") + response["value"];
    }

    return await "";
  }

  /**
   * If this type was chosen, we should return a random Chuck Norris joke.
   *	You can use this API to get jokes.
   *	This type should be chosen only if the user’s birth year is 2000 or before.
   */
  public async kanyeWestQuote() {
    let url = "https://api.kanye.rest";
    let response;
    await fetch(url)
      .then((response: any) => response.json())
      .then((data: any) => {
        response = data;
      });
    if (response && response["quote"]) {
      return (await "") + response["quote"];
    }
    return (await "") + response;
  }

  /**
   *
   * If this type was chosen, we should convert the user’s name to numbers and return the
   * sum. Each letter should be converted to a number (‘A’ = 1, ‘B’ = 2, ‘C’ = 3 etc.), then,
   * those numbers should be summed and the sum should be returned to the user.
   * e.g: “Sun Tzu” = 19 + 21 + 14 + 20 + 26 + 21 = 121.
   * This type should be chosen only if the user’s first name doesn’t start with ‘Q’.
   */
  public async userNamesSum(name: string) {
    name = name.replace(/\s/g, "");
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      const character = name.charAt(i);
      sum += character.charCodeAt(0) - 97 + 1;
    }
    console.log("the sume is: " + sum);
    return (await "") + sum;
  }

  private async getResultByType(requestType: RequestType, name: string) {
    switch (requestType) {
      case RequestType.CHUCK_NORRIS_JOKE:
        return await this.chuckNorrisJoke();

      case RequestType.KANYE_QUOTE:
        return await this.kanyeWestQuote();

      case RequestType.NAME_SUM:
        return await this.userNamesSum(name);

      default: {
        //statements;
        break;
      }
    }
  }
}

export const surpriseMeService = new SurpriseMeService();
