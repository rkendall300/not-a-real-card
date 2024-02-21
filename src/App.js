import './App.css';
import completeIcon from './images/icon-complete.svg';
import { useState } from 'react';

function App() {

  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [cvcError, setCvcError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("0000 0000 0000 0000");
  const [cardHolder, setCardHolder] = useState("JANE APPLESEED");
  const [expireMonth, setExpireMonth] = useState("00");
  const [expireYear, setExpireYear] = useState("00");
  const [cvcCode, setCvcCode] = useState("000");

  // ONCHANGE FUNCTIONS
  // onChange for cardholder name
  const changeName = (e) => {
    if (e.target.value === "") {
      setCardHolder("JANE APPLESEED");
    } else {
      setCardHolder(e.target.value.toUpperCase());
    }
  };

  // Used for adding spaces on the card display
  const formatCardNumber = (currentNumber) => {
    let tmp = currentNumber.match(/.{1,4}/g);
    setCardNumber(tmp.join(" "));
  };

  // onChange for card number
  const changeNumber = (e) => {
    // Check input for white space
    if (/\s/g.test(e.target.value)) {
      setNumberError(true);
    } 
    else {
      setNumberError(false);
    }

    // Check for default case
    if (e.target.value === "") {
      setCardNumber("0000 0000 0000 0000");
    } else {
      // Send all passing changes to the formatter
      formatCardNumber(e.target.value);
    }
  };

  // onChange for expiration date
  const changeDate = (e) => {
    if (e.target.id === "year") {
      if (e.target.value === "") {
        setExpireYear("00");
      } // Check for white space
      else if (/\s/g.test(e.target.value)) {
        setYearError(true);
      } else {
        setExpireYear(e.target.value);
      }
    } else {
      if (e.target.value === "") {
        setExpireMonth("00");
      } // Check for white space
      else if (/\s/g.test(e.target.value)) {
        setMonthError(true);
      }
      else {
        setExpireMonth(e.target.value);
      }
    }
  };

  // onChange for CVC code
  const changeCode = (e) => {
    if (e.target.value === "") {
      setCvcCode("000");
    } // Check for white space
    else if (/\s/g.test(e.target.value)) {
      setCvcError(true);
    }
    else {
      setCvcCode(e.target.value);
    }
  };

  // VALIDATION FUNCTIONS
  // Validate cardholder name
  const validateName = () => {
    if (cardHolder === "JANE APPLESEED") {
      setNameError(true);
    } // Check for digits
    else if (/\d/.test(cardHolder)) {
      setNameError(true);
    }
    else {
      setNameError(false);
      return true;
    }
  };

  // Validate card number
  const validateNumber = () => {
    // Check default case
    if (cardNumber === "0000 0000 0000 0000") {
      setNumberError(true);
    } // Check input length
    else if (cardNumber.length < 19) {
      setNumberError(true);
    } // Check input for letters
    else if (!(/^\d+$/.test(cardNumber.replace(/\s/g, "")))) {
      setNumberError(true);
    } else {
      setNumberError(false);
      return true;
    }
  };

  // Validate expiration month
  const validateMonth = () => {
    // Check default case
    if (expireMonth === "00") {
      setMonthError(true);
    } // Check for valid months
    else if (expireMonth > 12 || expireMonth <= 0) {
      setMonthError(true);
    } // Check for 2 numbers
    else if (expireMonth.length < 2) {
      setMonthError(true);
    } // Check input for letters
    else if (!(/^\d+$/.test(expireMonth.replace(/\s/g, "")))) {
      console.log("letters");
      setMonthError(true);
    } 
    else {
      setMonthError(false);
      return true;
    }
  };

  // Validate expiration year
  const validateYear = () => {
    // Check default case
    if (expireYear === "00") {
      setYearError(true);
    } // Check for 2 numbers
    else if (expireYear.length < 2) {
      setYearError(true);
    } // Check input for letters
    else if (!(/^\d+$/.test(expireYear.replace(/\s/g, "")))) {
      setYearError(true);
    }
    else {
      setYearError(false);
      return true;
    }
  };

  // Validate CVC code
  const validateCVC = () => {
    // Check default case
    if (cvcCode === "000") {
      setCvcError(true);
    } // Check for 3 numbers
    else if (cvcCode.length < 3) {
      setCvcError(true);
    } // Check input for letters
    else if (!(/^\d+$/.test(cvcCode.replace(/\s/g, "")))) {
      setCvcError(true);
    }
    else {
      setCvcError(false);
      return true;
    }
  }

  // Confirm button validation driver
  const handleOnClick = () => {
    validateName();
    validateNumber();
    validateMonth();
    validateYear();
    validateCVC();
    // Have to run them once and check the second time because of React states being asynchronous
    // Maybe there's a better way to do this?
    if ((validateName()) && validateNumber() && validateMonth() && validateYear() && validateCVC()) {
      setSuccess(true);
    }
  };

  // Clear the input fields when the main page is reloaded
  const clearInputFields = () => {
    document.getElementById('name-input').value = '';
    document.getElementById('number-input').value = '';
    document.getElementById('month').value = '';
    document.getElementById('year').value = '';
    document.getElementById('cvc-input').value = '';
  }

  // Second confirm button to reset everything and send back to mainpage
  const sendToHome = () => {
    setCardNumber("0000 0000 0000 0000");
    setCardHolder("JANE APPLESEED");
    setExpireMonth("00");
    setExpireYear("00");
    setCvcCode("000");
    setNumberError(false);
    setNameError(false);
    setMonthError(false);
    setYearError(false);
    setCvcError(false);
    setSuccess(false);
    clearInputFields();
  };

  return (
    <main>
      <div id="backdrop">
        <div id="background-gradient">
          <div id="card-area">
            <div id="card-back">
              <div id="cvc">{cvcCode}</div>
            </div>
            <div id="card-front">
              <div id="circles">
                <div id="white-circle"></div>
                <div id="small-circle"></div>
              </div>
              <div id="card-info">
                <p id="card-number">{cardNumber}</p>
                <div id="name-date">
                  <p id="card-name">{cardHolder}</p>
                  <p id="card-date">{expireMonth}/{expireYear}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={success ? "hide" : "default-info"} id="info">
          <p className="label-name">CARDHOLDER NAME</p>
          <input className={nameError ? "error-input" : "default-input"} id="name-input" placeholder="e.g. Jane Appleseed" onChange={changeName} maxLength="35"></input>
          <p className={nameError ? "error-msg" : "hide"}>Enter a cardholder name</p>
          <p className="label-name">CARD NUMBER</p>
          <input className={numberError ? "error-input" : "default-input"} id="number-input" placeholder="e.g. 1234 5678 9123 0000" onChange={changeNumber} maxLength="16"></input>
          <p className={numberError ? "error-msg" : "hide"}>Wrong format, numbers only</p>
          <div id="small-info">
            <div id="small-labels">
              <p className="label-name" id="date-label">EXP. DATE (MM/YY)</p>
              <p className="label-name" id="cvc-label">CVC</p>
            </div>
            <div id="small-inputs">
              <input className={monthError ? "error-input" : "default-input"} id="month" placeholder="MM" onChange={changeDate} maxLength="2"></input>
              <input className={yearError ? "error-input" : "default-input"} id="year" placeholder="YY" onChange={changeDate} maxLength="2"></input>
              <input className={cvcError ? "error-input" : "default-input"} id="cvc-input" placeholder="e.g. 123" onChange={changeCode} maxLength="3"></input>
            </div>
            <div id="small-errors">
              <p className={(monthError || yearError) ? "error-msg" : "hide"} id="date-error">Can't be blank</p>
              <p className={cvcError ? "error-msg" : "hide"} id="cvc-error">Can't be blank</p>
            </div>
          </div>
          <button className="confirm" onClick={handleOnClick}>Confirm</button>
        </div>
        <div className={success ? "confirmation" : "hide"} id="confirmation">
          <img src={completeIcon} alt="checkmark" id="complete"></img>
          <p id="thank-you">THANK YOU!</p>
          <p id="added">We've added your card details</p>
          <button id="continue" className="confirm" onClick={sendToHome}>Continue</button>
        </div>
      </div>
    </main>
  );
}

export default App;