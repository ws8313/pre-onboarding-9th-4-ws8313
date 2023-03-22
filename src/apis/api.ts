import axios from 'axios';
import { ITableData } from '../types/ITableData';

export const getTableData = async () => {
  try {
    const response = await axios.get<ITableData[]>('/mock_data.json');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
