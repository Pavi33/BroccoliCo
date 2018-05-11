import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class App extends Component {
   constructor() {
    super();
 
    this.state = {
      modalIsOpen: false,
       fields: {},
           errors: {}
    };
 
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
 
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  
  closeModal() {
    this.setState({modalIsOpen: false});
  }
     
handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["fullName"]){
           formIsValid = false;
           errors["fullName"] = "Please fill out this field";
        }
    
 var fullNameLen = fields["fullName"].length;
   if(fullNameLen < 3)
       {
          formIsValid = false;
           errors["confirmEmail"] = "Please enter atleast 3 letters"; 
       }

        if(typeof fields["fullName"] !== "undefined"){
             if(!fields["fullName"].match(/^[a-zA-Z]+$/)){
                 formIsValid = false;
                 errors["fullName"] = "Please enter the vaild name";
             }          
        }

        //Email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Please fill out this field";
        }

        if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
       }

//Confirm Email
        if(!fields["confirmEmail"]){
           formIsValid = false;
           errors["confirmEmail"] = "Please fill out this field";
        }

        if(typeof fields["confirmEmail"] !== "undefined"){
            let lastAtPos = fields["confirmEmail"].lastIndexOf('@');
            let lastDotPos = fields["confirmEmail"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["confirmEmail"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["confirmEmail"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["confirmEmail"] = "Email is not valid";
            }
       }
    
    if(this.state.fields["confirmEmail"] != this.state.fields["email"]){
        
        formIsValid = false;
              errors["confirmEmail"] = "Email mismatch with confirm email address";
    }
       this.setState({errors: errors});
       return formIsValid;
   }
    
// Form submit
contactSubmit(e){
    e.preventDefault();

    if(this.handleValidation()){
 
      var data = {"fullName":this.state.fields["fullName"], "email":this.state.fields["email"], "confirmEmail":this.state.fields["confirmEmail"]};

      var request = new Request('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    });

    var requestBody = JSON.stringify(data);

    fetch(request, {body: requestBody})
      .then(
        function (response) {
          if (response.status == 200 || response.status == 201) {
            return response.json();
          } else {
             var element= document.getElementById("displayMsg");
              element.classList.add("alert");
              element.classList.add("alert-danger");
            document.getElementById("displayMsg").innerHTML="Something went wrong. Please try later";
          }
        }).then(function (json) {
      var responseBody = json;
      console.log(typeof responseBody, responseBody);
    });

}
}
          
handleChange(field, e){         
    let fields = this.state.fields; 
    fields[field] = e.target.value;     
    this.setState({fields});
    }
  render() {
      
    return (
      <div className="App">
   
<div className="App-Header"><p className="headline"> Broccoli & Co</p></div>
        <div className="container">
        <div className="mainHead">
        <p> A better way
        <span className="subHead">to enjoy everyday.</span>
        </p>
        </div>
        <small>Be the first to know when we launch.</small>
        <div>
        <button className="button" onClick={this.openModal}>Request an Invite</button>
        </div></div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Invitation Modal" >
 
          <h2 className="modelHeading">Request on Invite</h2>
        <span className="linebelow"></span>
       
          <form name="contactform" onSubmit= {this.contactSubmit.bind(this)}>
                   
        <input className="textField" refs="fullName" type="text" size="30" placeholder="Full Name" onChange={this.handleChange.bind(this, "fullName")} value={this.state.fields["fullName"]}/>
        <span className="errorMsg">{this.state.errors["fullName"]}</span>
                         
         <input className="textField" refs="email" type="text" size="30" placeholder="Email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
         <span className="errorMsg">{this.state.errors["email"]}</span>
                         
         <input className="textField" refs="confirmEmail" type="text" size="30" placeholder="Confirm email" onChange={this.handleChange.bind(this, "confirmEmail")} value={this.state.fields["confirmEmail"]}/>
        <span className="errorMsg">{this.state.errors["confirmEmail"]}</span>
            <button className="modelButton">Send</button>
          </form>
 <div id="displayMsg"></div>
        </Modal>
        <div className="footer"><p className="copyRight">@ 2018 Broccoli & Co. All rights reserved.</p></div>
      </div>
    );
  }
}

export default App;
