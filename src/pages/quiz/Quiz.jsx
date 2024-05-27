import useSWR from "swr";
import api from "../../apis/httpClient";
import { useParams, useSearchParams } from "react-router-dom";
import QuizQuestion from "./component/QuizQuestion";
import { useEffect, useRef, useState } from "react";
import QuizHelper from "./component/QuizHelper";
import iconSubmitQuiz from "../../assets/bestSeller.gif";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { set } from "lodash";

export default function Quiz() {
  const { quizId } = useParams();
  const [quizList, setQuizList] = useState([]);
  const [answers, setAnswers] = useState({});
  const [indexQuestion, setIndexQuestion] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModelResult,
    onOpen: onOpenModelResult,
    onClose: onCloseModelResult,
  } = useDisclosure();
  const cancelRef = useRef();
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/quiz/generateQuestions/${quizId}`);
        if (!res.data.data) {
          console.log("No data found");
          return;
        }
        setQuizList(res?.data?.data?.questions);
        // store quizResultId in sessionStorage
        sessionStorage.setItem(
          "quizResultId",
          JSON.stringify(res?.data?.data?.quizResultId)
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (isSubmit) {
      const getQuizResult = async () => {
        const res = await api.post(`/quiz/submit`, {
          quizId,
          quizResultId: JSON.parse(sessionStorage.getItem("quizResultId")),
          answers: answers
        });
        if (res.data) {
          setQuizList(res.data.questions);
          (res.data.questions);
        }
      };
      getQuizResult();
    }
  }, [isSubmit]);

  const handleNextQuestion = () => {
    setIndexQuestion(indexQuestion + 1);
  };
  const handlePrevQuestion = () => {
    setIndexQuestion(indexQuestion - 1);
  };
  const handleSubmitQuiz = () => {
    onClose();
    onOpenModelResult();
    setIsSubmit(true);
  };
  const handleCorrectAnswer = (questions) => {
    let countCorrect = 0;
    let countWrong = 0;
    questions.forEach((question) => {
      if (question.correct_answer === question.answer) {
        countCorrect++;
      } else {
        countWrong++;
      }
    });

    return { countCorrect, countWrong };
  };
  
  return (
    <div className="flex justify-center pt-20 gap-8 h-screen bg-second-background bg-cover">
      <QuizQuestion
        handleNextQuestion={handleNextQuestion}
        handlePrevQuestion={handlePrevQuestion}
        hiddenNextQuestion={indexQuestion === quizList.length - 1}
        hiddenPrevQuestion={indexQuestion === 0}
        indexQuestion={indexQuestion}
        answers={answers}
        setAnswers={setAnswers}
        onOpen={onOpen}
        isSubmit={isSubmit}
        question={quizList.length > 0 ? quizList[indexQuestion] : {}}
      />
      <QuizHelper
        quizList={quizList}
        indexQuestion={indexQuestion}
        setIndexQuestion={setIndexQuestion}
        isSubmit={isSubmit}
      />

      {/* Button submit */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Thông báo</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Bạn đã chắc chắn muốn nộp bài?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Huỷ
            </Button>
            <Button onClick={handleSubmitQuiz} colorScheme="red" ml={3}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* UI Result */}
      <Modal onClose={onCloseModelResult} isOpen={isOpenModelResult} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderRadius={4} textColor={"white"} bgColor={"#f8516d"}>
            Chúc mừng bạn đã hoàn thành bài thi !
          </ModalHeader>
          <ModalBody>
            <Box justifyContent={"center"} height={250}>
              <Image
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                marginRight={0}
                src={iconSubmitQuiz}
                alt="Dan Abramov"
              />
            </Box>
            <Text fontSize={15} fontWeight={600}>
              Kết quả
            </Text>
            <Text textColor={"green"}>Số câu trả lời đúng: {handleCorrectAnswer(quizList).countCorrect}</Text>
            <Text textColor={"red"}>Số câu trả lời sai: {handleCorrectAnswer(quizList).countWrong}</Text>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button colorScheme="red" onClick={onCloseModelResult}>
              Xem chi tiết
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
