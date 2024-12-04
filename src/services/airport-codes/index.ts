import { autocomplete } from "air-port-codes-node";

const apca = autocomplete({
  key: process.env.APP_API_TOKEN,
  // secret: "some secret",
  limit: 15,
});

export default apca;
