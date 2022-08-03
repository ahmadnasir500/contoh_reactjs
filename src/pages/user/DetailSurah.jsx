import React from "react";
import { useParams } from "react-router-dom";
import useTitle from "../../utils/useTitle";
import { useGetSurahByIdQuery } from "../../services/quran";
import DetailSurah from "../../components/DetailSurah";
import PageLayout from "../../layouts/PageLayout";
import LoadingSpinner from "../../components/Spinner";

const DetailSurahPage = () => {
  let params = useParams();
  const { data: surah, error, isLoading } = useGetSurahByIdQuery(params.id);
  useTitle(surah ? surah.name : "Welcome");
  return (
    <>
        {error && "Something wrong, please refresh this page"}
        {isLoading && <LoadingSpinner/>}
        {!(isLoading || error) && <DetailSurah surah={surah} />}
    </>
  );
};

export default DetailSurahPage;
