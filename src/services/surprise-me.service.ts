import { SupriseMeModel } from "../models/SurpriseMeMethodModel";
import { statsController } from "../controllers/stats.controller";
import { RequestType } from "../models/request-type.enum";
const db = require("../models/statsModel/index.js");
const Stats = db.stats;

const fetch = require("node-fetch");
class SurpriseMeService {
  public async doSurpriseMeMethod(_name: any, _birthYear: any) {
    let response = undefined;
    let randomArray: any[] = [];
    const birthYear = parseInt(_birthYear);
    const name = _name.toLowerCase();
    randomArray = await this.getArrayWithTrueCondition(name, birthYear);
    const requestType = this.getRandomMethod(randomArray);
    console.log("Selected method:  " + requestType);
    if (requestType) {
      response = {
        type: requestType,
        result: await this.getResultByType(requestType, name),
      };
    }
    this.saveInDB(requestType);
    return response;
  }

  public async saveInDB(requestType: RequestType) {
    await Stats.create({ type: requestType });
    console.log(`Request saved`);
  }

  /**
   * return array with methods whit True Conditions
   */
  public getArrayWithTrueCondition(name: string, birthYear: number): any[] {
    let surpriseMeMethod: SupriseMeModel = {
      [RequestType.CHUCK_NORRIS_JOKE]: false,
      [RequestType.KANYE_QUOTE]: false,
      [RequestType.NAME_SUM]: false,
    };
    let ArrayWithTrueCondition: any[] = [];

    surpriseMeMethod = this.checkMethodsConditions(
      surpriseMeMethod,
      name,
      birthYear
    );

    //init surpriseme

    for (let [key, value] of Object.entries(surpriseMeMethod)) {
      // console.log(key + ": " + value);
      if (value) {
        ArrayWithTrueCondition.push(key);
      }
    }
    return ArrayWithTrueCondition;
  }

  public checkMethodsConditions(
    surpriseMeMethod: SupriseMeModel,
    name: string,
    birthYear: number
  ): SupriseMeModel {
    //CHUCK_NORRIS_JOKE Condition
    surpriseMeMethod[RequestType.CHUCK_NORRIS_JOKE] =
      !!birthYear && birthYear <= 2000;
    //KANYE QUOTE Condition
    surpriseMeMethod[RequestType.KANYE_QUOTE] =
      !!birthYear &&
      birthYear > 2000 &&
      !!name &&
      !name.startsWith("a") &&
      !name.startsWith("z");
    //NAME SUM Condition
    surpriseMeMethod[RequestType.NAME_SUM] = !!name && !name.startsWith("q");
    return surpriseMeMethod;
  }

  public getRandomMethod(randomArray: any) {
    return randomArray[Math.floor(Math.random() * randomArray.length)];
  }

  
  /**
   * If this type was chosen, we should return a random Chuck Norris joke.
   *	You can use this API to get jokes.
   *	This type should be chosen only if the user’s birth year is 2000 or before.
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
   * If this type was chosen, we should return a random Kanye West quote.
   * You can use this API to get quotes.
   * This type should be chosen only if the user’s birth year is after 2000 and the user’s first
   * name doesn’t start with ‘A’ or ‘Z’.
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
    // console.log("the sume is: " + sum);
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
        break;
      }
    }
  }
}

export const surpriseMeService = new SurpriseMeService();
