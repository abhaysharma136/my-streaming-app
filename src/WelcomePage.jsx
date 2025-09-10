import { Header } from "./Header";
import { Link, useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import img3 from "./OnstreamImages/img3.png";
import img2 from "./OnstreamImages/img2.jpg";
import frame1 from "./OnstreamImages/tv_image.png";
import frame2 from "./OnstreamImages/device-pile-in.png";
import MainHeader from "./components/Header";
import heroImage from "./assets/Images/ImageBackground.jpg";
import Button from "./components/ui/button";
import { Award, Calendar, Play, TrendingUp } from "lucide-react";
import MovieCard from "./components/movieCard";
import { API } from "./global";

export function WelcomePage() {
  const navigate = useNavigate();
  const [featuredMovies, setFeaturedMovies] = useState([]);
  // const featuredMovies = [
  //   {
  //     id: "1",
  //     title: "Stellar Odyssey",
  //     year: 2024,
  //     rating: 8.7,
  //     poster:
  //       "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
  //     genre: "Sci-Fi",
  //   },
  //   {
  //     id: "2",
  //     title: "Midnight Chronicles",
  //     year: 2024,
  //     rating: 8.2,
  //     poster:
  //       "https://images.unsplash.com/photo-1489599243109-0c2b5be3b3a5?w=400&h=600&fit=crop",
  //     genre: "Action",
  //   },
  //   {
  //     id: "3",
  //     title: "Digital Dreams",
  //     year: 2023,
  //     rating: 7.9,
  //     poster:
  //       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
  //     genre: "Drama",
  //   },
  //   {
  //     id: "4",
  //     title: "Ocean's Edge",
  //     year: 2024,
  //     rating: 8.4,
  //     poster:
  //       "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
  //     genre: "Thriller",
  //   },
  // ];
  let isAuth = localStorage.getItem("token");

  function GetMovies() {
    // Get the URLSearchParams from the current URL
    const urlParams = new URLSearchParams(window.location.search);
    // Get the Genres parameter from the URL
    const genres = urlParams.get("Genres");

    // Build the base URL
    let url = `${API}/movies/last/10`;

    // Add genres query parameter if it exists in the URL
    if (genres) {
      url += `?Genres=${encodeURIComponent(genres)}`;
    }

    const res = fetch(url, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    res
      .then((data) => data.json())
      .then((result) => {
        setFeaturedMovies(result); // Set the movies array
      });
  }
  useEffect(() => {
    GetMovies();
  }, []);
  return (
    <div>
      <div>
        {/* <Header /> */}
        <MainHeader />
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* backgroundImage */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0" />
          <div className="relative z-10 space-y-6">
            <h1 className="text-5xl mx-auto font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Stream the Future
            </h1>
            <p className="text-lg mx-auto text-muted-foreground">
              Discover exclusive movie trailers and experience cinema like never
              before
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="hero"
                size="lg"
                className="rounded-xl h-[50px] px-8"
              >
                <Link
                  to="/dashboard"
                  className="flex justify-center items-center text-black hover:text-black"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Watching
                </Link>
              </Button>
              {!isAuth ? (
                <Button
                  variant="glass"
                  size="lg"
                  className="rounded-xl h-[50px] px-8"
                >
                  <Link to="/register" className="text-white">
                    Join CineStream
                  </Link>
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
        {/* Featured Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex justify-start items-center space-x-2 mb-8">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-3xl">Trending Now</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className="py-16 px-4 bg-card">
          <div className="container mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold">Why Choose CineStream?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience the best in entertainment with our premium streaming
                platform
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Instant Streaming</h3>
                <p className="text-muted-foreground">
                  Watch exclusive trailers and content instantly in high quality
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-accent/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Premium Content</h3>
                <p className="text-muted-foreground">
                  Access to exclusive trailers and behind-the-scenes content
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-cinema-gold/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-cinema-gold" />
                </div>
                <h3 className="text-xl font-semibold">Latest Releases</h3>
                <p className="text-muted-foreground">
                  Be the first to see upcoming movie trailers and releases
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="container-text">
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
        </div> */}
      </div>

      {/* <div className="left-container">
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
      </div> */}
      {/* <hr></hr> */}
      {/* <div className="question-container">
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
      </div> */}

      {/* <div className="last-container" id="more-links">
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
        
      </div> */}
    </div>
  );
}
