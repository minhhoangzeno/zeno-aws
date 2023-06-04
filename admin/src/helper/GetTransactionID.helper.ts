import axios from "axios";

export const GetTransactionID = async (content: string) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://www.meinvoice.vn/tra-cuu/GetXMLData",
    headers: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    },
    data: `invData=${content}`,
  };
  const response = await axios.request(config);

  if (response.data.success) {
    const data = JSON.parse(response.data.data);
    return data.transactionID;
  }
};
