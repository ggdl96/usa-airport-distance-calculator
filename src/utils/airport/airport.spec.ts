import { getNameFromAirportCode } from ".";

describe("getNameFromAirportCode", () => {
  test("given x should return y", () => {
    const airportList = [
      {
        code: "MDQ",
        name: "Astor Piazzolla  International Airport",
      },
      {
        code: "WHP",
        name: "Whiteman Airport",
      },
    ];

    const name = getNameFromAirportCode(airportList, "MDQ");

    expect(name).toBe(name);
  });
});
