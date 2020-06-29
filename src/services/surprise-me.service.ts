const fetch = require("node-fetch");
class SurpriseMeService {
  /**
   * If this type was chosen, we should return a random Kanye West quote.
   * You can use this API to get quotes.
   * This type should be chosen only if the user’s birth year is after 2000 and the user’s first
   * name doesn’t start with ‘A’ or ‘Z’.
   */

  public async doKanyeMethode() {
    let url = "https://api.kanye.rest";
    let response;
    await fetch(url)
      .then((response: any) => response.json())
      .then((data: any) => {
        response = data;
      });
    return await response;
  }

  /**
   * If this type was chosen, we should return a random Chuck Norris joke.
   *	You can use this API to get jokes.
   *	This type should be chosen only if the user’s birth year is 2000 or before.
   */
  public async doChucknorrisMethode() {
    let url = "https://api.chucknorris.io/jokes/random";
    let response;
    await fetch(url)
      .then((response: any) => response.json())
      .then((data: any) => {
        response = data;
      });
    return await response;
  }

  /**
   *
   * If this type was chosen, we should convert the user’s name to numbers and return the
   * sum. Each letter should be converted to a number (‘A’ = 1, ‘B’ = 2, ‘C’ = 3 etc.), then,
   * those numbers should be summed and the sum should be returned to the user.
   * e.g: “Sun Tzu” = 19 + 21 + 14 + 20 + 26 + 21 = 121.
   * This type should be chosen only if the user’s first name doesn’t start with ‘Q’.
   */
  public async doRandomMethode() {
    let url = "https://api.chucknorris.io/jokes/random";
    let response;
    await fetch(url)
      .then((response: any) => response.json())
      .then((data: any) => {
        response = data;
      });
    return await response;
  }
}

export const surpriseMeService = new SurpriseMeService();
