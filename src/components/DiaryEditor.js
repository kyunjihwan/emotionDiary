import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion1.png",
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion2.png",
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion3.png",
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion4.png",
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + "/assets/emotion5.png",
    emotion_descript: "끔찍함",
  },
];

// 날짜 초기값 생성
const getStringDate = (date) => {
  // toISOString : ISO형식의 문자열을 반환하는 메소드
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  // 감정 State
  const [emotion, setEmotion] = useState(3);
  // 날짜 입력 State
  const [date, setDate] = useState(getStringDate(new Date()));
  // 일기내용 State
  const [content, setContent] = useState("");
  // 일기 ref
  const contentRef = useRef();

  // 감정 상태 저장
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  // 작성 완료 버튼
  const { onCreate } = useContext(DiaryDispatchContext);
  const handleSubmit = () => {
    if (content < 1) {
      contentRef.current.focus();
      return;
    }

    onCreate(date, content, emotion);
    // replace : true로 하면 뒤로가기 버튼을 못함
    navigate("/", { replace: true });
  };

  // navigate 사용
  const navigate = useNavigate();
  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새로운 일기쓰기"}
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              ref={contentRef}
              placeholder="오늘은 어땠나요?"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
