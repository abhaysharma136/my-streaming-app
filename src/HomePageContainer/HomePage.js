import './HomePage.css';
import smallImg1 from './small-movie1.jpg';
import smallImg2 from './small-movie2.jpg';
import smallImg3 from './small-movie3.jpg';
import smallImg4 from './small-movie4.jpg';
import smallImg5 from './small-movie5.jpg';
import smallImg6 from './small-movie6.jpg';
import smallImg7 from './small-movie7.jpg';
import smallImg8 from './small-movie8.jpg';
import movieposter1 from './large-movie1.jpg'
import movieposter2 from './large-movie2.jpg'
import movieposter3 from './large-movie3.jpg'
import movieposter4 from './large-movie4.jpg'
import movieposter5 from './large-movie5.jpg'
import movieposter6 from './large-movie6.jpg'
import movieposter7 from './large-movie7.jpg'
import movieposter8 from './large-movie8.jpg'
import avatar from './netflix-avatar.png'
import { Link } from 'react-router-dom';

export function HomePage() {

  return (
    <div className="homePage-container">
      <div class="navbar-homePage">
        <ul>
          <li><Link to="/"></Link>ONSTream</li>
          <li><Link to="/ProfilePage/Onstream"><img src={avatar} alt="profile pix" id="user_avatar" /></Link></li>
        </ul>
      </div>

      <div class="banner">
        <div class="banner_contents">
          <h1 class="banner_title">Money Heist</h1>
          <div class="banner_buttons">
            <form action="MoviePage.html">
              <button class="banner_button" id="Play-button">Play</button>
              <button class="banner_button" id="My-List-button">My List</button>
            </form>

          </div>
          <div class="banner_description">
            To carry out the biggest heist in history, a mysterious man called the professor recruits
            a band of eight robbers who have a single characterstics:n...
          </div>
        </div>
      </div>


      <div class="row">
        <h2>ONStream Orignals</h2>
        <div class="row_posters">
          <img src={movieposter1} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter2} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter3} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter4} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter5} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter6} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter7} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter8} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter1} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter2} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter3} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter4} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter5} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter6} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter7} alt="" class="row_poster row_posterLarge" />
          <img src={movieposter8} alt="" class="row_poster row_posterLarge" />
        </div>
      </div>


      <div class="row">
        <h2>Trending Now</h2>
        <div class="row_posters">
          <img src={smallImg1} alt="" class="row_poster" />
          <img src={smallImg2} alt="" class="row_poster" />
          <img src={smallImg3} alt="" class="row_poster" />
          <img src={smallImg4} alt="" class="row_poster" />
          <img src={smallImg5} alt="" class="row_poster" />
          <img src={smallImg6} alt="" class="row_poster" />
          <img src={smallImg7} alt="" class="row_poster" />
          <img src={smallImg8} alt="" class="row_poster" />
          <img src={smallImg2} alt="" class="row_poster" />
          <img src={smallImg3} alt="" class="row_poster" />
          <img src={smallImg4} alt="" class="row_poster" />
          <img src={smallImg5} alt="" class="row_poster" />
          <img src={smallImg6} alt="" class="row_poster" />
          <img src={smallImg7} alt="" class="row_poster" />
          <img src={smallImg8} alt="" class="row_poster" />
        </div>
      </div>


      <div class="row">
        <h2>Action Movies</h2>
        <div class="row_posters">
          <img src={smallImg1} alt="" class="row_poster" />
          <img src={smallImg2} alt="" class="row_poster" />
          <img src={smallImg3} alt="" class="row_poster" />
          <img src={smallImg4} alt="" class="row_poster" />
          <img src={smallImg5} alt="" class="row_poster" />
          <img src={smallImg6} alt="" class="row_poster" />
          <img src={smallImg7} alt="" class="row_poster" />
          <img src={smallImg8} alt="" class="row_poster" />
          <img src={smallImg2} alt="" class="row_poster" />
          <img src={smallImg3} alt="" class="row_poster" />
          <img src={smallImg4} alt="" class="row_poster" />
          <img src={smallImg5} alt="" class="row_poster" />
          <img src={smallImg6} alt="" class="row_poster" />
          <img src={smallImg7} alt="" class="row_poster" />
          <img src={smallImg8} alt="" class="row_poster" />
        </div>
      </div>


      <div class="row">
        <h2>Comedy Movies</h2>
        <div class="row_posters">
          <img src={smallImg1} alt="" class="row_poster" />
          <img src={smallImg2} alt="" class="row_poster" />
          <img src={smallImg3} alt="" class="row_poster" />
          <img src={smallImg4} alt="" class="row_poster" />
          <img src={smallImg5} alt="" class="row_poster" />
          <img src={smallImg6} alt="" class="row_poster" />
          <img src={smallImg7} alt="" class="row_poster" />
          <img src={smallImg8} alt="" class="row_poster" />
          <img src={smallImg2} alt="" class="row_poster" />
          <img src={smallImg3} alt="" class="row_poster" />
          <img src={smallImg4} alt="" class="row_poster" />
          <img src={smallImg5} alt="" class="row_poster" />
          <img src={smallImg6} alt="" class="row_poster" />
          <img src={smallImg7} alt="" class="row_poster" />
          <img src={smallImg8} alt="" class="row_poster" />
        </div>
      </div>


      <div class="row">
        <h2>Horror Movies</h2>
        <div class="row_posters">
          <img src={smallImg1} alt="" class="row_poster" />
          <img src={smallImg2} alt="" class="row_poster" />
          <img src={smallImg3} alt="" class="row_poster" />
          <img src={smallImg4} alt="" class="row_poster" />
          <img src={smallImg5} alt="" class="row_poster" />
          <img src={smallImg6} alt="" class="row_poster" />
          <img src={smallImg7} alt="" class="row_poster" />
          <img src={smallImg8} alt="" class="row_poster" />
          <img src={smallImg2} alt="" class="row_poster" />
          <img src={smallImg3} alt="" class="row_poster" />
          <img src={smallImg4} alt="" class="row_poster" />
          <img src={smallImg5} alt="" class="row_poster" />
          <img src={smallImg6} alt="" class="row_poster" />
          <img src={smallImg7} alt="" class="row_poster" />
          <img src={smallImg8} alt="" class="row_poster" />
        </div>
      </div>


      <div class="row">
        <h2>Romance Movies</h2>
        <div class="row_posters">
          <img src={smallImg1} alt="movie1" class="row_poster" />
          <img src={smallImg2} alt="movie2" class="row_poster" />
          <img src={smallImg3} alt="" class="row_poster" />
          <img src={smallImg4} alt="" class="row_poster" />
          <img src={smallImg5} alt="" class="row_poster" />
          <img src={smallImg6} alt="" class="row_poster" />
          <img src={smallImg7} alt="" class="row_poster" />
          <img src={smallImg8} alt="" class="row_poster" />
          <img src={smallImg2} alt="" class="row_poster" />
          <img src={smallImg3} alt="" class="row_poster" />
          <img src={smallImg4} alt="" class="row_poster" />
          <img src={smallImg5} alt="" class="row_poster" />
          <img src={smallImg6} alt="" class="row_poster" />
          <img src={smallImg7} alt="" class="row_poster" />
          <img src={smallImg8} alt="" class="row_poster" />
        </div>
      </div>


      <div class="row">
        <h2>Documentaries</h2>
        <div class="row_posters">
          <img src={smallImg1} alt="" class="row_poster" />
          <img src={smallImg2} alt="" class="row_poster" />
          <img src={smallImg3} alt="" class="row_poster" />
          <img src={smallImg4} alt="" class="row_poster" />
          <img src={smallImg5} alt="" class="row_poster" />
          <img src={smallImg6} alt="" class="row_poster" />
          <img src={smallImg7} alt="" class="row_poster" />
          <img src={smallImg8} alt="" class="row_poster" />
          <img src={smallImg2} alt="" class="row_poster" />
          <img src={smallImg3} alt="" class="row_poster" />
          <img src={smallImg4} alt="" class="row_poster" />
          <img src={smallImg5} alt="" class="row_poster" />
          <img src={smallImg6} alt="" class="row_poster" />
          <img src={smallImg7} alt="" class="row_poster" />
          <img src={smallImg8} alt="" class="row_poster" />
        </div>
      </div>
    </div>
  );
}
