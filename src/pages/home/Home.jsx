import useSWR from "swr";
import api from "../../apis/httpClient";
import Header from "../../layouts/Header";
import QuizList from "./component/QuizList";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, error, isLoading } = useSWR('/quiz/getQuizByUser', api);
 
  return (
    <div className="">
     <QuizList data={data} />
    </div>
  );
}
