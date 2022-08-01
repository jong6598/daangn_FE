import { createSlice } from "@reduxjs/toolkit";

const areaSlice = createSlice({
  name: "area",
  initialState: {
    ALL: "대구시 전체",
    NAMGU: "남구",
    DALSEOGU: "달서구",
    DALSEONGGUN: "달성군",
    DONGGU: "동구",
    BUKGU: "북구",
    SEOGU: "서구",
    SUSEONGGU: "수성구",
    JUNGGU: "중구",
  },
  reducers: {},
});

export default areaSlice.reducer;