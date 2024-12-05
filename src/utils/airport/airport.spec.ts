import { getNameFromAirportCode } from ".";

describe("getNameFromAirportCode", () => {
  test("given MDQ iata (airport code) should return 'Astor Piazzolla  International Airport' name", () => {
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

    expect(name).toBe("Astor Piazzolla  International Airport");
  });
});
