import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import '../ContactUs/style.css'
const Contactus = () => {
    return (
        <div>
           <section className="contactus">
           <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="aboutUsHead">Contact US</h1>
                            <p className="aboutUsPara">Our Team will always be there to help you with any of your queries.</p>
                        </div>
                    </div>
            </div>
            </section>
            <div className="container mt-5">
			<div className="row">
				<div className="col-12 col-sm-6">
					<form>
					  <div className="form-group">
						  <input type="name" className="form-control" id="exampleInputName" placeholder="Your Full Name..."/>
					  </div>
                    <div className="form-group">
						  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Email Address..."/>
					  </div>
                    <div className="form-group">
                        <textarea className="form-control" placeholder="Enter your Message" style={{height:'190px'}} aria-label="With textarea"></textarea>
                    </div>
					<button type="submit" className="btn btn-warning btn-lg btn-block mb-5">Submit</button>
			        </form>
			  </div>
			  <div  className="col-12 col-sm-6">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7122.3888195543905!2d81.0175463752818!3d26.801937732701603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1681984992266!5m2!1sen!2sin" width="550" height="350" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
	  		</div>
        
			</div>
		</div>  
        </div>
    )
}

export default Contactus
