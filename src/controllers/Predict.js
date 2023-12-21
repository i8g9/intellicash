// const express = require('express');
// const axios = require('axios');

// const app = express();
// const port = 3000; 

// app.use(express.json());

// app.post('/predict', async (req, res) => {
//   try {
//     const { text } = req.body;
//     const flaskApiResponse = await axios.post('http://localhost:8000/predict/', {
//       text: text,
//     });

//     const { status, result } = flaskApiResponse.data;
//     const { code, message } = status;
//     const { text: flaskText, entities, money } = result;

//     if (code === 200) {
//       res.status(200).json({
//         status: 'success',
//         message: message,
//         result: {
//           text: flaskText,
//           entities: entities,
//           money: money,
//         },
//       });
//     } else {
//       res.status(300).json({
//         status: 'error',
//         message: 'Failed to make prediction in Flask API',
//       });
//     }
//   } catch (error) {
//     console.error('Error in prediction:', error);
//     res.status(500).json({
//       status: 'error',
//       message: 'Internal server error',
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Express server is running at http://localhost:${port}`);
// });
