import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import Fade from 'react-reveal/Fade';
import '../../assets/css/style.css'
import './style.css'
import headerImage from '../../assets/img/headerImage.svg'
import GoogleMeet from '../../assets/img/google-meet-logo-1.png'
import FeatureZoom from '../../assets/img/featureZoom.png'
import FeatureImage2 from '../../assets/img/featureImage2.svg'
import DescriptionIcon from '@material-ui/icons/Description';
import Step1 from '../../assets/img/step1.png'
import Step2 from '../../assets/img/step2.svg'
import Step3 from '../../assets/img/step3.svg'
import Step4 from '../../assets/img/step4.png'
import {NavLink} from 'react-router-dom'
function Homepage() {
    return (
        <div>
            <section id="hero" className="clearfix mt-5">
            <div className="container headerContainer d-flex h-70 mt-5">
                <div className="row justify-content-center align-self-center" >
                    <div className="col-md-6 intro-info order-md-first order-last">
                      <Fade left>
                        <h2 className="heading" ><span className="navBarColor" >SIMPLIFY</span> your <span className="navBarColor" >notes</span> taking process during <span className="navBarColor" >meetings</span></h2>
                        </Fade>  
                        <p>Never miss out on important points in your meetings. We got your back. With Minutes of Meeting, you can now save time and hassle during board meetings, team management, and customer support interactions.</p>
                        <p>Simply concentrate on the conversation at hand and let us take care of the rest. Say hello to productivity with <strong>Minutes of Meeting!</strong></p>
                    </div>

                    <div className="col-md-6 intro-img order-md-last order-first mt-5" >
                        <img src= { headerImage } className="img-fluid" alt='homepage'/>
                    </div>
                </div>

            </div>
            </section>
            <section className="pageWidth">
              <div className="container">
                <div className="row feature">
                  <div className="col-sm-6 col-12">
                      <img className="img-fluid zoomLogo" src={GoogleMeet} alt='homepage'></img>
                      <h2 className="featureHeading f1"><span className="Empasized">Google Meet</span> video conferencing with Automated Meeting Notes</h2>
                  </div>
                  <div className="col-sm-6 col-12">
                    <img className="img-fluid featureImage" src={FeatureZoom} alt='homepage'></img>
                  </div>
                </div>
                <div className="row feature">
                <div className="col-sm-6 col-12">
                    <img className="img-fluid featureImage" src={FeatureImage2}></img>
                  </div>
                  <div className="col-sm-6 col-12">
                      <h2 className="featureHeading"><span className="Empasized">Unlock your potential</span></h2>
                      <h2 className="featureHeading">Leave the hassle to ML</h2>

                      <p>At Minutes of Meeting, we understand the value of your time, mind, and experience. That's why we've developed a smart solution for Automated Meeting Minutes, allowing you to focus on what matters most.</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <div className="container">
                <div className="row workFlowRow">
                  <div className="col-12">
                    <h2 className="workFlowHead">How Minutes of Meeting Works?</h2>
                    <h4 className="workFlowSubHead">Ultimate smart meeting assistant at your service</h4>
                  </div>
                </div>
                <div className="row workFlowRow">
                  <div className="col-sm-6 col-12">
                    <h2 className="featureHeading"><span className="Empasized">Add Chrome Extension</span></h2>
                    <p>Add our chrome extension to your google meet and enjoy the power of ML and NLP.</p>
                  </div>
                  <div className="col-sm-6 col-12">
                    <img src={Step1} className="img-fluid" alt='homepage'></img>
                  </div>
                </div>
                <div className="row workFlowRow">
                  <div className="col-sm-6 col-12">
                    <img src={Step2} className="img-fluid" alt='homepage'></img>
                  </div>
                  <div className="col-sm-6 col-12">
                    <h2 className="featureHeading"><span className="Empasized">Record Captions</span></h2>
                    <p>Just turn on the captions and you are ready to go. Our extension will start recording the transcript in the background. Just push the Generate Summary button and see your meeting notes generated in the app.</p>
                  </div>
                </div>
                <div className="row workFlowRow">
                  <div className="col-sm-6 col-12">
                    <h2 className="featureHeading"><span className="Empasized">Transcription and Summarization</span></h2>
                    <p><strong>Minutes of Meeting</strong> transcribes and summarizes your conversations on the fly.  Minutes of Meeting will generate a transcript and summary <strong>enriched</strong> with speaker identification allowing you to <strong>understand</strong> exactly who said what.</p>                  </div>
                  <div className="col-sm-6 col-12">
                    <img src={Step3} className="img-fluid" alt='homepage'></img>
                  </div>
                </div>
                <div className="row workFlowRow">
                  <div className="col-sm-6 col-12">
                    <img src={Step4} className="img-fluid" alt='homepage'></img>
                  </div>
                  <div className="col-sm-6 col-12">
                    <h2 className="featureHeading"><span className="Empasized">Translation</span></h2>
                    <p>We Provide Transcript and Summary of the meeting in multiple languages to connect individuals from various background.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
            <div className="container-fluid my-1">
            </div>
              <div className="roundButton bg-primary">
                  <NavLink to="/textsummariser"><h3 style={{color:'white',textAlign:'center',paddingTop:'20px',fontWeight:'bold',fontSize:'30px'}}><DescriptionIcon style={{fontSize:'40px'}}></DescriptionIcon></h3></NavLink>
              </div>
              <a className="bottomButton"></a>
            
          </section>

        <main id="main">
    
            </main>
        </div>
    )
}

export default Homepage
