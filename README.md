# Blog platform via GIT.
[Ihor Tkachuk](https://github.com/ihortkachuk)  & [Vladimir Varavva]( https://github.com/Acid-base)

### The short list of platform's capabilities:
---
* authorization (via [GitHub](https://github.com/))
* create / delete blogs
* work with branches (public / private)
* сollective blogging
* create / edit / delete posts
* enable / disable comments
* add (after owner confirmation) / edit / delete comments
* language selection (english, russian, ukrainian)

#### Collective blog use
* in own repo enter settings
* choose ` Collaborators`
* in the field enter name of user, whom you granted access
* press the button`Add collaborator`


### Possible problems
---
#### Problems with  blog updating
Propably you are working with blog out of platform.
To work blog correctly all changes should be done through the platform interface.
If you have reasons not to use the platform interface, then you need:
* set up webhook:
  * in your repo enter settings
  * choose menu` add Webhooks`
  * in field `Payload url` insert http://gitblog.pythonanywhere.com/git_username/git_repo_name/api/web_hook, where git_username  is the name of your account GitHub, and git_repo_name is repo name
  * in `content type` choose `application/json`
  * `Just the push event` and `Active` should be marked
  * final stage -` Add Webhook`
* or update blog by button `Update`

#### Problems with adding comments
In forked repo there is no opportunity to add comments.
You should use your own repo

###  To run the project locally:

 ---
*  clone or download project
*  `npm install`
*  `npm start`



> TODO
* advanced serch by author and date
