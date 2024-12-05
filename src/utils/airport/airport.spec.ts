import { getNameFromAirportCode } from ".";

describe("getNameFromAirportCode", () => {
  test("given MDQ iata (airport code) should return 'Astor Piazzolla  International Airport' name", () => {
    const airportList = [
      {
        value: "MDQ",
        label: "Astor Piazzolla  International Airport",
      },
      {
        value: "WHP",
        label: "Whiteman Airport",
      },
    ];

    const name = getNameFromAirportCode(airportList, "MDQ");

    expect(name).toBe("Astor Piazzolla  International Airport");
  });
});
