import axios from 'axios';

const getData = async () => {
  try {
    const data = await axios.get('/data/mock_data.json');

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getData;
