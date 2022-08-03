import { apiQuran } from "../apis/quran";

export const reqQuran = apiQuran.injectEndpoints({
  endpoints: (builder) => ({
    getAllSurah: builder.query({
      query: () => ({
        url: "/surahs",
      }),
    }),
    getSurahById: builder.query({
      query: (id) => ({
        url: `/surahs/${id}`,
      }),
    }),
    getAllAyah: builder.query({
      query: (idSurah) => ({
        url: `/surahs/${idSurah}/ayahs`,
      }),
    }),
    getAyahById: builder.query({
        query: (idSurah, idAyah) => ({
          url: `/surahs/${idSurah}/ayahs/${idAyah}`,
        }),
      }),
  }),
});

export const {
  useGetAllSurahQuery,
  useGetSurahByIdQuery,
  useGetAllAyahQuery,
  useGetAyahByIdQuery,
} = reqQuran;
