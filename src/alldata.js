// // import axios from 'axios';
// // import React, { useState } from 'react';


// // export default function AllData(){
// // //   const url ='http://localhost:8080/data';
// //     const [data,setData]=useState()

// //   function handleClick() {
// //     axios.get('http://localhost:8080/data')
// //         .then((response) => {
// //             setData(response.data);
// //             console.log(data)
// //         })
// //         .catch((error) => {
// //             console.error('Error fetching data:', error);
// //         });
// // }

// // return(
// //   <>
// //    <button onClick={handleClick}>Refresh</button>
// //   </>
// // )
// // }

// import React, { useState } from 'react';
// import axios from 'axios';

// export default function AllData() {
//   const [data, setData] = useState();

//   function handleClick() {
//     axios.get('http://localhost:8080/data')
//       .then((response) => {
//         setData(response.data);
//         console.log(response.data);
//       })
//     // .then((res=>showOutput(res)))
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }

//   return (
//     <>
//       <button onClick={handleClick}>Refresh</button>
//       {/* {data && (
//         <ul>
//           {data.map((item) => (
//             <li key={item.id}>{item.name}</li>
//           ))}
//         </ul> */}
//       {/* )} */}
//     </>
//   );
// }

import {useState,useEffect} from "react";
import axios from 'axios'
import {Table,Button} from 'react-bootstrap'


export default function Alldata(){
  
  const [data,setData]=useState([])
 

  useEffect(()=>{
    const fetchdata=async()=>{
       await axios.get('https://bankserver-rd19.onrender.com/data').then((item)=>{setData(item.data)})
    };fetchdata()
 },[]);
   
  function handleDelete(index){
    let DeleteArray=[...data];
    axios.delete(`https://bankserver-rd19.onrender.com/delete/${DeleteArray[index]._id}`);
    alert(`Account ${DeleteArray[index].id} Delete from Database `)
    DeleteArray.splice(index,1);
    setData(DeleteArray);
    
    
  }
  return(
    <>
      <h2>Bank Users Database</h2>
     <Table striped bordered hover>
      <thead>
        <tr>
          <th>Account-No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Balance</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item,index)=>  
          <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.password}</td>
          <td>{item.amount}</td>
          <td><Button onClick={()=>handleDelete(index)}>Delete</Button></td>
        </tr>)
        }
      
        </tbody>
        </Table>
    
    </>
  )
}