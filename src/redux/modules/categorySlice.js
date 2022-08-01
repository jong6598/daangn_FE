import { createSlice } from "@reduxjs/toolkit"; 

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        ALL: "전체",
        DIGITAL: "디지털기기",
        APPLIANCES: "생활가전",
        HOUSEHOLD: "가구/인테리어",
        KID: "유아",
        GROCERIES: "생활/가공식품",
        SPORT: "스포츠/레저",
        CLOTHES: "의류",
        INTEREST: "게임/취미",
        BEAUTY: "뷰티/미용",
        PET: "반려동물용품",
        BOOK: "도서/티켓/음반",
        PLANT: "식물",
        ETC: "기타"
    },
    reducers: {},
});

export default categorySlice.reducer;