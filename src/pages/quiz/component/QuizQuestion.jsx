import { FaAngleRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import _ from "lodash";
import { useState } from "react";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";

export default function QuizQuestion({
  question,
  indexQuestion,
  handleNextQuestion,
  handlePrevQuestion,
  hiddenNextQuestion,
  hiddenPrevQuestion,
  onOpen,
  setAnswers,
  answers,
  isSubmit,
}) {
  const idQuestion = question?.id;

  if (_.isEmpty(question)) return <></>;

  const handleChooseAnswer = (value) => {
    setAnswers((prev) => {
      return {
        ...prev,
        [idQuestion]: value,
      };
    });
  };

  if (!isSubmit) {
    return (
      <div className="w-4/6 z-10 px-10 py- shadow-lg rounded-xl text-center">
        <h1 className="z-10 px-32 text-center py-5 font-medium text-2xl font-semibold mb-4 bg-white text-primary rounded-full">
          Câu{indexQuestion + 1}: {question?.title}
        </h1>

        <div className="px-32 relative ml-3 cursor-pointer flex flex-col gap-4 text-left">
          <p
            onClick={() => handleChooseAnswer("A")}
            className={`px-2 py-4 rounded-full border pl-4 rounded-full border hover:bg-gradient-primary hover:text-white hover:font-semibold 
            ${
              answers[idQuestion] === "A"
                ? "bg-gradient-primary text-white font-semibold"
                : "bg-white "
            }`}
          >
            {question?.option_a}
          </p>
          <p
            onClick={() => handleChooseAnswer("B")}
            className={`px-2 py-4 rounded-full border pl-4 rounded-full border hover:bg-gradient-primary hover:text-white hover:font-semibold
            ${
              answers[idQuestion] === "B"
                ? "bg-gradient-primary text-white font-semibold"
                : "bg-white "
            }`}
          >
            {question?.option_b}
          </p>
          <p
            onClick={() => handleChooseAnswer("C")}
            className={`px-2 py-4 rounded-full border pl-4 rounded-full border hover:bg-gradient-primary hover:text-white hover:font-semibold
            ${
              answers[idQuestion] === "C"
                ? "bg-gradient-primary text-white font-semibold"
                : "bg-white"
            }`}
          >
            {question?.option_c}
          </p>
          <p
            onClick={() => handleChooseAnswer("D")}
            className={`px-2 py-4 rounded-full border pl-4 rounded-full border hover:bg-gradient-primary hover:text-white hover:font-semibold first-letter
            ${
              answers[idQuestion] === "D"
                ? "bg-gradient-primary text-white font-semibold"
                : "bg-white"
            }`}
          >
            {question?.option_d}
          </p>

          {!hiddenNextQuestion && (
            <button
              onClick={() => handleNextQuestion()}
              className="absolute top-1/2 right-0 w-8 h-8 flex items-center rounded-full shadow-xl bg-white text-center hover:bg-gradient-primary hover:text-white"
            >
              <FaChevronRight className="flex-1" />
            </button>
          )}

          {!hiddenPrevQuestion && (
            <button
              onClick={() => handlePrevQuestion()}
              className="absolute center top-1/2 left-0 w-8 h-8 flex items-center rounded-full shadow-xl bg-white hover:bg-gradient-primary hover:text-white"
            >
              <FaChevronLeft className="flex-1" />
            </button>
          )}
        </div>

        <div>
          <button
            onClick={() => onOpen()}
            className="mt-10 text-xl bg-gradient-primary text-white py-2 px-8  rounded-xl cursor-pointer"
          >
            Nộp bài
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-4/6 z-10 px-10 py- shadow-lg rounded-xl text-center">
        <h1 className="z-10 px-32 text-center py-5 font-medium text-2xl font-semibold mb-4 bg-white text-primary rounded-full">
          Câu{indexQuestion + 1}: {question?.title}
        </h1>

        <div className="px-32 relative ml-3 cursor-pointer flex flex-col gap-4 text-left">
          <p
            className={`px-2 py-4 rounded-full border pl-4
          ${
            question?.correct_answer === "A"
              ? "bg-correct text-white font-semibold"
              : question?.answer === "A" && question?.correct_answer !== "A"
              ? "bg-wrong text-white font-semibold"
              : "bg-white"
          }`}
          >
            {question?.option_a}
          </p>
          <p
            className={`px-2 py-4 rounded-full border pl-4
          ${
            question?.correct_answer === "B"
              ? "bg-correct text-white font-semibold"
              : question?.answer === "B" && question?.correct_answer !== "B"
              ? "bg-wrong text-white font-semibold"
              : "bg-white"
          }`}
          >
            {question?.option_b}
          </p>
          <p
            className={`px-2 py-4 rounded-full border pl-4 
          ${
            question?.correct_answer === "C"
              ? "bg-correct text-white font-semibold"
              : question?.answer === "C" && question?.correct_answer !== "C"
              ? "bg-wrong text-white font-semibold"
              : "bg-white"
          }`}
          >
            {question?.option_c}
          </p>
          <p
            className={`px-2 py-4 rounded-full border pl-4 
          ${
            question?.correct_answer === "D"
              ? "bg-correct text-white font-semibold"
              : question?.answer === "D" && question?.correct_answer !== "D"
              ? "bg-wrong text-white font-semibold"
              : "bg-white"
          }`}
          >
            {question?.option_d}
          </p>

          {!hiddenNextQuestion && (
            <button
              onClick={() => handleNextQuestion()}
              className="absolute top-1/2 right-0 w-8 h-8 flex items-center rounded-full shadow-xl bg-white text-center hover:bg-gradient-primary hover:text-white"
            >
              <FaChevronRight className="flex-1" />
            </button>
          )}

          {!hiddenPrevQuestion && (
            <button
              onClick={() => handlePrevQuestion()}
              className="absolute center top-1/2 left-0 w-8 h-8 flex items-center rounded-full shadow-xl bg-white hover:bg-gradient-primary hover:text-white"
            >
              <FaChevronLeft className="flex-1" />
            </button>
          )}
        </div>

      </div>
    );
  }
}
