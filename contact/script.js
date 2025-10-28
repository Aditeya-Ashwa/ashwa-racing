const form = document.getElementById('form')
const sendButton = document.querySelector('.button button');

function isPhoneNum(phoneNumber) {
  const str = phoneNumber.trim();
  return /^\d{10}$/.test(str);
}

sendButton.addEventListener('click', () => {
  const fullname = document.getElementById('fullname').value
  const email = document.getElementById('email').value
  const phone = document.getElementById('phone').value
  const subject = document.getElementById('subject').value
  const message = document.getElementById('message').value
  if (fullname && email && phone && subject && message) {
    if (!email.includes('@')) {
      alert("Enter a valid email!!")
    } else {
      if (!isPhoneNum(phone)) {
        alert('Enter a valid phone number!! ')
      } else {

        alert("Form Submitted")
        let formValue = { 'Full Name': fullname, 'Email': email, 'Phone Number': phone, 'Subject': subject, 'Message': message }
        console.log(formValue);
        form.reset()
      }

    }
    // console.log("click");
  }
  else {
    alert("Enter all fields")

  }
})