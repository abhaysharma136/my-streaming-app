import { Header } from "./Header";
import { Link, useNavigate } from "react-router-dom";
import './WelcomePage.css'
import { useState } from "react";


export function WelcomePage() {

  
  const navigate=useNavigate();

  const[quest1,setQuest1]=useState(false);
  const[quest2,setQuest2]=useState(false);
  const[quest3,setQuest3]=useState(false);
  const[quest4,setQuest4]=useState(false);
  const styles1={
    display:quest1?"block":"none",
  }
  const styles2={
    display:quest2?"block":"none",
  }
  const styles3={
    display:quest3?"block":"none",
  }
  const styles4={
    display:quest4?"block":"none",
  } 
  return (
    <div>
      <div id="container-top">
      <Header />
      <div className="container-text">
        <h1 className="storyCard-title">Unlimited movies, TV shows and more.</h1>
        <h2 className="storyCard-subtitle">Watch anywhere. Cancel anytime.</h2>
        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
      </div>
      <div className="email-elements">
        <form id="myForm" onClick={()=>navigate("/Register-now")}>
          <button type="submit"
           className="btn-signIn-btn">
            Get Started
            </button>
        </form>

      </div>

      </div>
      
      <div className="second-container">
        <div className="second-container-text">
          <h1 className="storyCard-title">Enjoy on your TV.</h1>
          <h2 className="storyCard-subtitle">Watch on smart TVs, PlayStation, Xbox, Chromecast,
            Apple TV, Blu-ray players and more.</h2>

        </div>
        <img className="second-container-img" src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="img"></img>
        <hr></hr>
      </div>

      <div className="second-container">
        <div className="second-container-text">
          <h1 className="storyCard-title">Download your shows to watch offline.</h1>
          <h2 className="storyCard-subtitle">Save your favourites easily and always have
            something to watch.</h2>

        </div>
        <img className="second-container-img" src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="img"></img>
        <hr></hr>
      </div>

      <div className="second-container">
        <div className="second-container-text">
          <h1 className="storyCard-title">Watch everywhere.</h1>
          <h2 className="storyCard-subtitle">Stream unlimited movies and TV shows on
            your phone, tablet, laptop, and TV.</h2>

        </div>
        <img className="second-container-img" src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-in.png" alt="img"></img>
        <hr></hr>
      </div>

      <div className="second-container">
        <div className="second-container-text">
          <h1 className="storyCard-title">Create profiles for children.</h1>
          <h2 className="storyCard-subtitle">Send children on adventures with their
            favourite characters in a space made just for
            them—free with your membership.</h2>

        </div>
        <img className="second-container-img" src="https://occ-0-6546-3647.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVxdX2WnFSp49eXb1do0euaj-F8upNImjofE77XStKhf5kUHG94DPlTiGYqPeYNtiox-82NWEK0Ls3CnLe3WWClGdiJP.png?r=5cf" alt="img"></img>
        <hr></hr>
      </div>

      <div className="question-container">
        <div className="Frequently-Asked-Question-heading">
            <h1>Frequently Asked Questions</h1>
        </div>
        <div>
            <section >
                <div className="frequent-questions" id="Question1" onClick={()=>setQuest1(!quest1)}>
                    How much does ONSTREAM Cost?
                </div>
                <div className="frequent-answers" id="Answer1" style={styles1}>
                    Watch Onstream on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts.
                </div>

            </section>
            <section >
                <div className="frequent-questions" id="Question2" onClick={()=>setQuest2(!quest2)}>
                    Where can I Watch?
                </div>
                <div className="frequent-answers" id="Answer2" style={styles2}>
                    Watch anywhere, anytime. Sign in with your Onstream account to watch instantly on the web at onstream.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
                    <br></br>
                    You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Onstream with you anywhere.
                </div>
            </section>
            <section >
                <div className="frequent-questions" id="Question3" onClick={()=>setQuest3(!quest3)}>
                    How do I cancel?
                </div>
                <div className="frequent-answers" id="Answer3" style={styles3}>
                    ONSTREAM is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.
                </div>
            </section>
            <section >
                <div className="frequent-questions" id="Question4" onClick={()=>setQuest4(!quest4)}>
                    What can I watch on ONSTREAM?
                </div>
                <div className="frequent-answers" id="Answer4" style={styles4}>
                    ONSTREAM has an extensive library of feature films, documentaries, TV shows, anime, award-winning Onstream originals, and more. Watch as much as you want, anytime you want.
                </div>
            </section>
            <hr></hr>
        </div>
    </div>

     <div className="second-container" id="more-links">
<p>Questions? Call 000-800-040-1843</p>
    <div className="links-bottom-click">
    <li className="link"><Link to="/FAQ">FAQ</Link></li>
    <li><Link to="/FAQ">Help Centre</Link></li>
    <li><Link to="/FAQ">Account</Link></li>
    <li><Link to="/FAQ">Media Centre</Link></li>
    <li><Link to="/FAQ">Investor Relation</Link></li>
    <li><Link to="/FAQ">Jobs</Link></li>
    <li><Link to="/FAQ">Ways to Watch</Link></li>
    <li><Link to="/FAQ">Terms of Use</Link></li>
    <li><Link to="/FAQ">Privacy</Link></li>
    <li><Link to="/FAQ">Cookie Preference</Link></li>
    <li><Link to="/FAQ">Corporate Information</Link></li>
    <li><Link to="/FAQ">Contact Us</Link></li>
    <li>
        <select id="language-option">
       <option value="English">English</option>
       <option value="Hindi">हिन्दी</option>
        </select>
        </li>
        </div>
</div>
    </div>
  );
}
