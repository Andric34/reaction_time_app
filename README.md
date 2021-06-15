# Welcome reaction time app!

Hello this was an assigment made for a job interview at Nsoft. For any questions you can contact me on : ivanand34@gmail.com

# Technology stack

This assigment was made using the required:

- VueJS
- Vuex
- VueRouter
- Socket.IO
- Vue Socket.IO Extended
- Vuetify - not required

# Assigment

1.  Napraviti formu za **registraciju** korisnika.

    - Ako je registracija uspješna, prikazati poruku da je registracija uspješna
    - Ako registracija nije uspješna, prikazati korisniku šta treba ispraviti

2.  Napraviti formu za **login** korisnika.

    - Ako je login uspješan, spremiti korisničke podatke i redirectati korisnika na page za igru
    - Ako login nije uspješan, prikazati korisniku grešku.

3.  Napraviti **Play page**.  
    Kada se korisnik logira i spoji na Socket.IO, dobit ce listu lobby-a kroz event. Potrebno je prikazati listu lobby-a igraču.  
    Klikom na jedan od lobby-a, potrebno je poslati event na socket backend da se igrač pridruži tom lobby-u.

    Sve promjene za igru dolaze kroz `game_update` event na Socket-u. Kada dodje do promjene, treba se odredjena akcija izvrsiti.

    - Kada se state prebaci iz `WAITING` u `STARTING`, prikazati korisniku countdown do početka igre. `startingTime` polje koje se dobije kroz socket poruku označava datum i vrijeme početka igre.
    - Kada se state prebaci iz `STARTING` u `IN_PROGRESS`, korisniku treba prikazati sučelje igre.
    - Sučelje mora sadržavati tablicu rezultata trenutne igre i jedno dugme u sredini koje je poenta čitave igre.
    - Tablica se popunjava podacima iz `rankings` niza trenutne runde. Ovi se podaci također ažuriraju kroz `game_update` event, tako da obratiti pozornost na to.
    - Polje `triggerDate` sadrži datum i vrijeme kada button treba postati dostupan za klikanje.
    - Kada korisnik klikne na button, računa se njegovo vrijeme, tj. reaction time.  
      Vrijeme je potrebno poslati putem socket-a kako je definisano u dokumentaciji.
    - Nakon što svi igrači kliknu, backend će poslati `game_update` event sa novom rundom. Igra se nastavlja dok ne ostane jedan igrač.
    - Nakon što zadnja runda završi, backend će poslati `game_finished` event. U tom slučaju, potrebno je igrače vratiti na **Lobby** page.

4.  Napraviti **Leaderboard page**. Unutar page-a prikazati tablicu igrača sa najbržim reaction time-om. Podatke dohvatiti preko HTTP backenda kako je definisano u dokumentaciji.

## Tasks

Task 1 -registration --completed
Task 2 - login -- completed
Task 3 - play page --not completed
Task 4 - leaderboard --completed

## More on tasks

**Task 1** : User can register on the server but only if the input is in correct form if not the app will alert the user of what she/he needs to change. Data validation is implemented. After the successfull registration user is redirected to login page.
**Task 2** : After registration user can login to server. If the login is successfull the user is redirected to the play page.
**Task 3**: Had a lot of problems with socket connection to the server. After the user connects with socket to the server the list of lobbies is displayed. User can see other players in lobbies and she/he can join any lobby. After joining in and before the game starts she/he can leave joined lobby.
When the game starts user is redirected to the match page where the current round list is displayed.
when the circle button changes to green user can click it to measure his reaction time.
That reaction time with the game UUID and round UUID is sent to the server.
**NOTE** updateRoundResult event sent to the server doesn't trigger anything and that is why the lobbies are in the IN PROGRESS state.
**Task 4**: After the leaderboard component is made app sends fetch request to the server and gets the leaderboard data.
NOTE as I was unable to complete the third task the leaderboard is empty but the methods for making the list are implemented.
