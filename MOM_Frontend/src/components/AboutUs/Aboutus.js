import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import '../AboutUs/style.css'
import AboutImage1 from '../../assets/img/loginImage.jpg'
import AboutImage2 from '../../assets/img/aboutImage2.jpg'
import AboutImage3 from '../../assets/img/aboutImage3.png'

const Aboutus = (props) => {    
    return (
        <div>
           <section className="aboutus">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="aboutUsHead">About Minutes of Meeting</h1>
                            <p className="aboutUsPara">We are here with a mission to increase productivity, make collaboration easy and convert your conversation into actions with an effective and efficient use of ML.</p>
                        </div>
                    </div>
                </div>
            </section> 
            <section>
                <div className="container">
                    <div className="row aboutRow">
                        <div className="col-12 col-sm-6">
                            <h2 className="aboutHead1"><b>What does MoM do?</b></h2>
                            <p>Our goal is to ease the process of creating meeting minutes through cutting-edge NLP technology. </p>
                            <h2 className="aboutHead1"><b>Why Minutes of Meeting?</b></h2>
                            <p>We understand that traditional meeting minutes are tedious, take up valuable time, and can lead to inefficiencies and increased expenses. By automating the process, we aim to save time, reduce costs, and improve productivity for our clients.</p>
                        </div>
                        <div className="col-sm-6 col-12">
                            <img src={AboutImage1} alt="about" className="img-fluid" ></img>
                        </div>
                    </div>
                    <div className="row aboutRow">
                        <div className="col-sm-6 col-12">
                            <img src={AboutImage2} alt="about" className="img-fluid" ></img>
                        </div>
                        <div className="col-12 col-sm-6">
                            <h2 className="aboutHead1"><b>What is our approach?</b></h2>
                            <p>To achieve this goal, we have developed Minutes of Meeting, a cutting-edge SaaS solution that utilizes advanced machine learning technology for both in-person and remote meetings. Our platform generates meeting minutes automatically in real-time from the spoken voice, and provides valuable insights and action items for all participants. We believe that our technology represents the future of successful meetings and can greatly enhance productivity and efficiency for our clients.</p>
                        </div>
                    </div>
                    <div className="row aboutRow">
                        <div className="col-12 col-sm-6">
                            <h2 className="aboutHead1"><b>What is our ultimate Goal?</b></h2>
                            <p>We want you to focus on your meetings while leaving the hassle of documentation to ML</p>
                            <ul className="list-style">
  									<li><p>Manage your meetings the way you always dreamed to</p></li>
  									<li><p>Never miss a thing</p></li>
  									<li><p>Be fully integrated with your software</p></li>
  							</ul>
                        </div>
                        <div className="col-sm-6 col-12">
                            <img src={AboutImage3} alt="about" className="img-fluid" ></img>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Aboutus
