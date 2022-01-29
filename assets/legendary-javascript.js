let authorizeOptions = {
  type: 'popup',
  name: 'Getting Started Application',
  scope: {
    read: 'true',
    write: 'true' },
  expiration: 'never',
  success: function() {
    console.log('Successful authentication');
  },
  error: function() {
    console.log('Failed authentication');
  }
}, authString, user = {}, submitButton = document.querySelector("#button-1643251037187"), trelloAuthButton = document.querySelector('#trello-auth-btn');
let nameField = document.querySelector('#text-1643251049905'),
     phoneField = document.querySelector('#text-1643251062289'),
     emailField = document.querySelector('#text-1643251064078'),
     messageField = document.querySelector('#text-1643251065818'),
     dateField = document.querySelector("#date-1643251044760"),
     form = document.querySelector("#form-container");

//authorization and authentication
class AuthorizeApp{
  // verifies that the key and token are correct, as well as stored for simpler REST API calls.
  constructor({options}){
    Trello.authorize(authorizeOptions);
    //console.log(Trello.authorized());
    user = {
      key: Trello.key(),
      token: Trello.token(),
      authorized: Trello.authorized()
    }
    user.key=Trello.key(); user.token = Trello.token();
    //authorization options are passed through.
    // Then an object "user" containing: authorization 1)token, 2)key, and 3) ifauthorized=true/false is returned.
    return user;
  }
}
// RequestUrlHandler passes key and token for verification, and then puts them into a string variable to make API calls
//simpler and more readable.
class RequestUrlHandler{
  constructor(key, token){
    //check to see if the key value for user is the same as Trello.key();
    switch(key){
      case !Trello.key() || undefined || null:
        console.log("invalid key");
        return {string:"invalid key"}
      case Trello.key():
        //if the key matches Trello.key(), check to see if there is a valid token value.
        switch(token){
          case !Trello.token() || undefined || null:
            console.log("invalid token");
            return {string:"invalid token"}
          case Trello.token():
            //on verification, store and return the string to use with fetch() urls.
            this.urlString = {string:"&key="+key+"&token="+token};
        }
    }
    return this.urlString;
  }
}
//when the login button is clicked, wait for trello key/token verification
//and return the variable containing the string needed to successfully fetch API requests.
function saveFormValues() {
  let formFields = {
    name: nameField,
    phone: phoneField,
    email: emailField,
    user_message: messageField,
    date: dateField
  };
  return localStorage.setItem("form_values", JSON.stringify(formFields));
}
submitButton.addEventListener('click', saveFormValues);
  //POST template

var myList = '61f1d40a93852c1b9f88152a';

var creationSuccess = function (data) {
  console.log('Card created successfully.');
  console.log(JSON.stringify(data, null, 2));
};

var newCard = {
  name: 'New Test Card',
  desc: 'This is the description of our new card.',
  // Place this card at the top of our list
  idList: myList,
  pos: 'top'
};

window.Trello.post('/cards/', newCard, creationSuccess);
