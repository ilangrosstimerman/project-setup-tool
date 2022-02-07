const tSignin = document.querySelector("#trello-signin");
const gSignin = document.querySelector("#github-signin");
const cdisplay = document.querySelector("#fetch-cards");
const bdisplay = document.querySelector("#fetch-boards");
class T{
     static o = {
          type: 'popup',
          name: 'Getting Started Application',
          scope: {
               read: 'true',
               write: 'true',
               account: true,
          },
          expiration: 'never',
          success: function() {
               console.log('Successful authentication');
          },
          error: function() {
               console.log('Failed authentication');
          }
     }
     static auth = async(o) => {
          let call = await Trello.authorize(this.o);
     }
     static async parseBoards() {
          this.call = await Trello.get('/members/me/boards/');
          this.response = await this.call;
          for (let i = 0; i < this.response.length; i++) {
               console.log(this.call[i].id);
               TrelloBoards.create(this.call[i].id, document.querySelector("#fetch-boards-container"));
          }
     }
     static async parseCards() {
          this.call = await Trello.get('/members/me/cards/');
          this.response = await this.call;
          for (let i = 0; i < this.response.length; i++) {
               console.log(this.call[i].id);
               TrelloCards.create(this.call[i].id, document.querySelector("#fetch-cards-container"));
          }
     }
}
class G{}

tSignin.addEventListener('click', async () =>{
     let a = await T.auth();
     tSignin.textContent = "Signed in";
});

cdisplay.addEventListener('click', async () => {
     await T.auth();
     await Tr.parseCards();
});

bdisplay.addEventListener('click', async () => {
     await T.auth();
     await Tr.parseBoards();
});
gSignin.addEventListener('click', async function (){
     await window.location.replace("https://github.com/login/oauth/authorize?client_id=Iv1.c28cca759ac962c2&state=aiio2u8922&login=")
})
