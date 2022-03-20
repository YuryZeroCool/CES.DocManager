import React from 'react';
// import axios from 'axios';

// export default function VehicleExpenseSheet() {
//   const handlSubmit = async (event): Promise<void> => {
//     event.preventDefault();
//     const formData: FormData | null = new FormData(event.target[0].form);
//     console.log(formData);
//     if (formData !== null) {
//       try {
//         const response = await axios.post('https://localhost:5001/api/Report', formData, {
//           headers: {
//             'Content-type': 'multipart/form-data',
//           },
//         });
//         console.log('Success' + response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <form encType="multipart/form-data" onSubmit={handlSubmit}>
//       <p>
//         <input type="file" name="file" multiple />
//         <button type="submit">Отправить</button>
//       </p>
//     </form>
//   );
// }
