This project is almost done.

TO DOs
Deployment....
error handling, for empty post data. 
-> create a util function to validate posts before sending it.<--- no need of it as the app runs smoothly even if you perform something like sending invalid (empty) post it works like it never happened so you have to put the correct value there in order to continue.

marking todos in most of the code where change is necessary.
query and params.
how does privateRoute works?? from frontend perspective.
deletion of old images once user replaces banner images.


I think are resolved:
1) deletion of all the refreshTokens once user logs out. maybe this isn't the issue cuz new login means new refreshtoken anytime. and only payload is changing as it involves the current time and then the sign also changes so yea good so far.
2) logout feature works well even if there is invalid token.
3) There is still an error. The login part has edge cases which needs attention. such has I cant be looking for accessToken when loggin in or maybe when user purposely deletes the session storage... 
->I need not clear it while signing it. done.
->And I have to handle the case of empty session storage and invalid tokens.
->I think I require to use try catch in everystuff where I use axios and (done)
->I have to refreshThePage when refreshToken is invalid. This is causing multiple refreshes. as while loggin in you dont have refreshtokens so invalid refreshToken error is occuring? (done used window.location.pathname to check and only then redirect.)
  Try-catch will avoid the error. and refreshing will cause to navigate to login.
4) logout needs to precede a refresh otherwise
5) Good error handling around many api calls. (there are still uncaught errors.)
6) -> also have to ensure that app dont crash when we send the empty response in backend. <-- solvable by using .validate of the model instace