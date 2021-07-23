import React from "react";
import Header from "../components/Header";
import SendText from "../components/SendText";
import ResponsesContainer from "../components/ResponsesContainer";

const Home = () => {
  return (
    <div className="home">
      {/*Header component for logout/menu options */}
      <Header />
      <h1>Welcome to Review Software</h1>
      {/*Component for first name and phone number */}
      <SendText />
      {/*Component for the three response options */}
      <ResponsesContainer />
    </div>
  );
};

export default Home;
