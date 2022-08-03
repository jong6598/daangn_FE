// import React, { useEffect } from "react";
// import styled from "styled-components";
// import { useQuery } from "@tanstack/react-query";
// import instance from "../axiosConfig";
// import { useParams } from "react-router-dom";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import Footer from "../components/Footer";
// import { FaCarrot } from "react-icons/fa";



// const Postchat = () => {
//   const params = useParams();
//   const postId = {postId: params.postId};

//   const getChatRoom = async () => {
//     const res = await instance.post("/api/room", postId);
//     console.log(res);
//     return res;
//   };

//   const loadChatRoom = async() =>{
//     const res = await instance.get(`/api/room/${params.postId}`);
//     console.log(res.data);
//     return res.data;
//   }

//   const roomInfo = useQuery(["room"], loadChatRoom, {
//     refetchOnWindowFocus: false,
//   });

//   console.log(roomInfo);

//   useEffect(() => {
//     loadChatRoom();
//   }, []);

 
//   return (
//     <MainDiv>
//         <MyInfoBox>
//             <span>{roomInfo.data.buyerNickname}의 채팅방</span>
//         </MyInfoBox>    
//         <ChatBox>
//             <FaCarrot />
//             <h2>{roomInfo.data.sellerNickname}과의 채팅방</h2>
//         </ChatBox>
//             <RoomBtn onClick={()=>getChatRoom()}>
//                 <AiOutlinePlusCircle />
//             </RoomBtn>
//         <Footer theme={"chat"} />
//     </MainDiv>
    
//   )


// };

// export default Postchat;

// const MainDiv = styled.div`
//   width: 40rem;
//   height: calc(100vh - 7rem);
//   margin: 0rem auto 7rem;
//   justify-content: center;
//   background-color: purple;
// `;

// const ChatBox = styled.div`
//   display: flex;
//   width: 100%;
//   height: 8rem;
//   justify-content: space-between;
//   border-bottom: 1px solid #f1f1f1;
//   cursor: pointer;
//   svg {
//     margin-left: 3rem;
//     margin-right: 2rem;
//     padding: 0.5rem;
//     border: 1px solid #e78111;
//     border-radius: 5rem;
//     color: #e78111;
//     width: 4rem;
//     height: 4rem;
//   }
// `;

// const MyInfoBox = styled.div`

// `

// const RoomBtn = styled.button`
//   cursor: pointer;
//   position: fixed;
//   bottom: 20%;
//   right: 30%;
//   background-color: transparent;
//   border: 0;
//   svg {
//     width: 6rem;
//     height: 6rem;
//     border-radius: 5rem;
//     font-size: 4rem;
//     color: #e78111;
//     background: #fffbf7;
//   }
// `;
