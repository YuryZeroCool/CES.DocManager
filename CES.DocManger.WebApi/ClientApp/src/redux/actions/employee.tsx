import axios from 'axios';

interface IEployee {
  firstName: string;
  lastName: string;
}

export default function gethEmployeesFull() {
  return async () => {
    const response = await axios.get<IEployee[]>('https://localhost:5001/api/Employee');
  };
}
