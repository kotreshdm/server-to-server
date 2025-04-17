import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { fetchJwtToken, getStoredToken } from "./token-manager/tokenManager.js"
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

(async () => {
  await fetchJwtToken();
})();


const token = getStoredToken();
app.get('/get-from-private-server', async (req, res) => {
  await axios('http://127.0.0.1:3001/api/app1/data1', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  }).then((response) => {
   // modify the response data here according to your needs
      // For example, you can change the message property of the response data
      console.log(response.data)
      return res.status(200).json(`Data recived from private server, ${response.data.message}`);
  }).catch((error) => {
    const errorMessage = error.response ? error.response.data : 'Error fetching data from private server';
      // Log the error message for debugging purposes

      console.error('Error fetching data from private server:',errorMessage);
      // Handle the error response from the private server
      return res.status(500).send('Error fetching data from private server : ' + errorMessage);
  });
})

app.listen(PORT, () => {
  console.log(`Server A is running on port ${PORT}`);
});
