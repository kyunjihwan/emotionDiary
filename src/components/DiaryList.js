import { useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./Diaryitem";

// option 태그 리스트
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

// select문 컴포넌트
const ControllerMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControllerMenu"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {optionList.map((it, idx) => (
        <option value={it.value} key={idx}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

// DiaryList 컴포넌트
const DiaryList = ({ diaryList }) => {
  // useNavigate
  const navigate = useNavigate();
  // 날짜별로 일기 정렬 State
  const [sortType, setSortType] = useState("latest");
  // 감정별로 일기 정렬 State
  const [filter, setFilter] = useState("all");

  // 검색 기능 함수
  const getProcessedDiaryList = () => {
    // 오름차순, 내림차순 정렬
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    // 감정 검사해주는 함수
    const filterCallback = (it) => {
      if (filter === "good") {
        return parseInt(it.emotion) <= 3;
      } else {
        return parseInt(it.emotion) > 3;
      }
    };

    // 깊은 복사
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 감정 검사
    const filteredList =
      filter === "all"
        ? copyList
        : copyList.filter((it) => {
            return filterCallback(it);
          });

    // 정렬 후 값 리턴
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControllerMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControllerMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
