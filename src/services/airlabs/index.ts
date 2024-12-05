// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getList(_string: string) {
  return fetch(
    process.env.AIRLABS_API +
      `?country_code=${process.env.COUNTRY_CODE}&api_key=${process.env.AIRLABS_API_KEY}`,
    {
      method: "POST",
      headers: {
        "APC-Auth": process.env.APP_API_TOKEN ?? "",
      },
    }
  ).then((response) => {
    response.json().then((data) => {
      return data;
    });
  });
}
