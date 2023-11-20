import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import SearchMedicine from './SearchMedicine';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../auth/checkAuth';
import { useSelector } from 'react-redux';

function Home() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);
  const token = user ? user.token : null; 
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    if (!token) {
      console.log("response.data",token)
      navigate('/login');
    }
  }, [navigate, token]); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = `${currentDateTime.getFullYear()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getDate()}`;

  const email = user ? user.email : '';

  return (
    <div>
      <Navbar />
      <SearchMedicine />
      <div className="container-fluid">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner mt-3">
            <div className="carousel-item active">
              <img src="https://mercury.akamaized.net/i/704d05fedda22bc2e2054f2f157ff188_207080_0.jpg" alt="img1" width="1500px" height="350px" />
            </div>
            <div className="carousel-item">
              <img src="	https://www.netmeds.com/images/cms/aw_rbslider/slides/1697008207_Bronson-Professional-70_Desktop.jpg" width="1500px"   height="350px" alt="img2" />
            </div>
            <div className="carousel-item">
              <img src="	https://www.netmeds.com/images/cms/aw_rbslider/slides/1689009790_Web_Home_Banner.jpg" width="1500px"  height="350px"  alt="img3" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <div>
          <p>Date: {formattedDate}</p>
          <p>Time: {currentDateTime.toLocaleTimeString()}</p>
          <p>User: {email}</p>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(Home);
