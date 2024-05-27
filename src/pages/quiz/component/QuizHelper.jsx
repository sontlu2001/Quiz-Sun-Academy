import Countdown from "react-countdown";
import { MdOutlineTimer } from "react-icons/md";

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return (
      <button
        onClick={() => navigate(`/quiz/${quizId}`)}
        className="bg-gradient-primary text-white p-2 rounded-xl mt-2 cursor-pointer"
      >
        Kết thúc
      </button>
    );
  } else {
    // Render a countdown
    return (
      <>
        <span
          className="text-primary font- bg-opacity-5 p-2 rounded-xl cursor-pointer"
          disabled
        >
          {hours < 10 ? `0${hours}` : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </>
    );
  }
};

export default function QuizHelper({
  indexQuestion,
  setIndexQuestion,
  quizList,
  isSubmit,
}) {
  return (
    <div className="w-1/4 bg-white rounded-lg flex flex-col h-fit">
      <h2 className=" text-center py-2 rounded-lg bg-gradient-primary text-white text-primary font-bold text-xl">
        Danh sách câu hỏi
      </h2>
      <div>
        <div className="rounded-lg mt-2 grid grid-cols-10 text-center p-4 gap-4">
          {quizList.length > 0 &&
            quizList.map((_, index) => (
              <span
                onClick={() => setIndexQuestion(index)}
                key={index}
                className={`d-flex items-center justify-center cursor-pointer w-7 h-7 text-lg rounded-full ${
                  indexQuestion === index
                    ? "bg-gradient-primary text-white"
                    : "bg-white text-primary"
                }`}
              >
                {index + 1}
              </span>
            ))}
        </div>
        {/* <div className="mt-[30px]">
          <div className="justify-center bg-white bg-primary rounded-lg flex items-center ">
            {!isSubmit && (
              <>
                <MdOutlineTimer fontSize={24} />
                <Countdown
                  date={new Date("2024-06-11T17:00:00.000Z")}
                  renderer={renderer}
                />
              </>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}
