import { autocomplete } from "air-port-codes-node";

const apca = autocomplete({
  key: "xxxxxxxxxxx",
  secret: "xxxxxxxxxxxxxxx", // Your API Secret Key: use this if you are not connecting from a web server
  limit: 15,
});

export default apca;
