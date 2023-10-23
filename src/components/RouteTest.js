import { Link } from "react-router-dom";

const RouteTest = () => {
  return (
    <>
      <Link to={"/home"}>Home</Link>
      <br />
      <Link to={"/new"}>new</Link>
      <br />
      <Link to={"/diary"}>Diary</Link>
      <br />
      <Link to={"/edit"}>Edit</Link>
    </>
  );
};

export default RouteTest;
