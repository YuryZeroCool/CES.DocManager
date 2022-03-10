import axios from "axios";




export const VehicleExpenseSheet: React.FC = () => {

    const handlSubmit = async (event:any) => {
        event.preventDefault();
        const formData = new FormData(event.target[0].form);
        //formData.append("file", event.target[0].files[0]);
        console.log(formData);

        axios
          .post("https://localhost:5001/api/Report", formData, {
            headers: {
              "Content-type": "multipart/form-data",
              
            },
            
          })
          .then((res) => {
            console.log(`Success` + res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        }

  return (
 
  <>
     <form encType="multipart/form-data" onSubmit= {handlSubmit} >
    <p>
        <input type="file" name="file" multiple/>
         <button type="submit"  >Отправить</button>
    </p>
   </form> 
  </>
 
  )
}