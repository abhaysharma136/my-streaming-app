import { Header } from "./Header";
import { Link, useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import img3 from "./OnstreamImages/img3.png"
import img2 from "./OnstreamImages/img2.jpg"
import frame1 from "./OnstreamImages/tv_image.png"
import frame2 from "./OnstreamImages/device-pile-in.png"

export function WelcomePage() {
  const style = {
    maxWidth: "800px",
  };
  const navigate = useNavigate();

  const [quest1, setQuest1] = useState(false);
  const [quest2, setQuest2] = useState(false);
  const [quest3, setQuest3] = useState(false);
  const [quest4, setQuest4] = useState(false);
  const styles1 = {
    display: quest1 ? "block" : "none",
  };
  const styles2 = {
    display: quest2 ? "block" : "none",
  };
  const styles3 = {
    display: quest3 ? "block" : "none",
  };
  const styles4 = {
    display: quest4 ? "block" : "none",
  };
  return (
    <div>
      <div id="container-top">
        <Header />
        <div className="container-text">
          <h1 className="storyCard-title">
            Unlimited movies, TV shows and more.
          </h1>
          <h2 className="storyCard-subtitle">
            Watch anywhere. Cancel anytime.
          </h2>
          <h3>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>
        </div>
        <div className="email-elements">
          <form id="myForm" onClick={() => navigate("/Register-now")}>
            <button type="submit" className="btn-signIn-btn">
              Get Started
            </button>
          </form>
        </div>
      </div>

      <div className="left-container">
        <div className="second-container-text">
          <h1 className="storyCard-title">Enjoy on your TV.</h1>
          <h2 className="storyCard-subtitle">
            Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
            players and more.
          </h2>
        </div>
        <img
          className="second-container-img"
          src={frame1}
          alt="img"
        ></img>
      </div>
      <hr></hr>
      <div className="right-container">
        <div className="second-container-text">
          <h1 className="storyCard-title">
            Download your shows to watch offline.
          </h1>
          <h2 className="storyCard-subtitle">
            Save your favourites easily and always have something to watch.
          </h2>
        </div>
        <img
          className="second-container-img"
          src={img2}
          width="300px"
          alt="img"
        ></img>
      </div>
      <hr></hr>
      <div className="left-container">
        <div className="second-container-text">
          <h1 className="storyCard-title">Watch everywhere.</h1>
          <h2 className="storyCard-subtitle">
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </h2>
        </div>
        <img
          className="fourth-container-img"
          src={frame2}
          alt="img"
        ></img>
      </div>
      <hr></hr>
      <div className="right-container">
        <div className="second-container-text">
          <h1 className="storyCard-title">Create profiles for children.</h1>
          <h2 className="storyCard-subtitle" style={style}>
            Send children on adventures with their favourite characters in a
            space made just for them—free with your membership.
          </h2>
        </div>
        <img
          className="second-container-img"
          src={img3}
          alt="img"
        ></img>
      </div>
      <hr></hr>
      <div className="question-container">
        <div className="Frequently-Asked-Question-heading">
          <h1 className="FAQ-heading">Frequently Asked Questions</h1>
        </div>
        <div>
          <section>
            <div
              className="frequent-questions"
              id="Question1"
              onClick={() => setQuest1(!quest1)}
            >
              <h3>How much does ONSTREAM Cost?</h3>
              {quest1 ? (
                <CloseIcon fontSize="large" />
              ) : (
                <AddIcon fontSize="large" />
              )}
            </div>
            <div className="frequent-answers" id="Answer1" style={styles1}>
              Watch Onstream on your smartphone, tablet, Smart TV, laptop, or
              streaming device, all for one fixed monthly fee. Plans range from
              ₹ 149 to ₹ 649 a month. No extra costs, no contracts.
            </div>
          </section>
          <section>
            <div
              className="frequent-questions"
              id="Question2"
              onClick={() => setQuest2(!quest2)}
            >
              <h3>Where can I Watch?</h3>

              {quest2 ? (
                <CloseIcon fontSize="large" />
              ) : (
                <AddIcon fontSize="large" />
              )}
            </div>
            <div className="frequent-answers" id="Answer2" style={styles2}>
              Watch anywhere, anytime. Sign in with your Onstream account to
              watch instantly on the web at onstream.com from your personal
              computer or on any internet-connected device that offers the
              Netflix app, including smart TVs, smartphones, tablets, streaming
              media players and game consoles.
              <br></br>
              You can also download your favourite shows with the iOS, Android,
              or Windows 10 app. Use downloads to watch while you're on the go
              and without an internet connection. Take Onstream with you
              anywhere.
            </div>
          </section>
          <section>
            <div
              className="frequent-questions"
              id="Question3"
              onClick={() => setQuest3(!quest3)}
            >
              <h3>How do I cancel?</h3>
              {quest3 ? (
                <CloseIcon fontSize="large" />
              ) : (
                <AddIcon fontSize="large" />
              )}
            </div>
            <div className="frequent-answers" id="Answer3" style={styles3}>
              ONSTREAM is flexible. There are no annoying contracts and no
              commitments. You can easily cancel your account online in two
              clicks. There are no cancellation fees – start or stop your
              account anytime.
            </div>
          </section>
          <section>
            <div
              className="frequent-questions"
              id="Question4"
              onClick={() => setQuest4(!quest4)}
            >
              <h3>What can I watch on ONSTREAM?</h3>
              {quest4 ? (
                <CloseIcon fontSize="large" />
              ) : (
                <AddIcon fontSize="large" />
              )}
            </div>
            <div className="frequent-answers" id="Answer4" style={styles4}>
              ONSTREAM has an extensive library of feature films, documentaries,
              TV shows, anime, award-winning Onstream originals, and more. Watch
              as much as you want, anytime you want.
            </div>
          </section>
          <hr></hr>
        </div>
      </div>

      <div className="last-container" id="more-links">
        <div className="additionalal-link-container">
        <p className="Additional-links-heading">Questions? Call 000-800-040-1843</p>
        <div className="links-bottom-click">
        
          <li>
            <Link to="/FAQ">FAQ</Link>
          </li>
          <li>
            <Link to="/FAQ">Help Centre</Link>
          </li>
          <li>
            <Link to="/FAQ">Account</Link>
          </li>
          <li>
            <Link to="/FAQ">Media Centre</Link>
          </li>
          <li>
            <Link to="/FAQ">Investor Relation</Link>
          </li>
          <li>
            <Link to="/FAQ">Jobs</Link>
          </li>
          <li>
            <Link to="/FAQ">Ways to Watch</Link>
          </li>
          <li>
            <Link to="/FAQ">Terms of Use</Link>
          </li>
          <li>
            <Link to="/FAQ">Privacy</Link>
          </li>
          <li>
            <Link to="/FAQ">Cookie Preference</Link>
          </li>
          <li>
            <Link to="/FAQ">Corporate Information</Link>
          </li>
          <li>
            <Link to="/FAQ">Contact Us</Link>
          </li>
        </div>
        </div>
        
      </div>
    </div>
  );
}
