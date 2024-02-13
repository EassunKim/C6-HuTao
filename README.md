# C6 HuTao Bot

C6 Hutao bot is a general use Discord bot developed by Matthew Kim

## Inviting the bot
- Just click this [Invite Link](https://discord.com/api/oauth2/authorize?client_id=1204668118966861824&permissions=8&scope=bot+applications.commands)
- Select any server you own or are an admin for and ensure to look over the permissions the bot asks for
- Enjoy

## Commands
**$roll**
> Random roll from 1 to a set maximum defaulting to 100
> <!-- -->
> ex. `$roll 200` will roll a random number between 1 to 200

**gm**
> custom tailored good morning messages whenever a user types `'gm'`
> <!-- -->
> <ins>Adding a message:</ins>
> <!-- -->
> within `C6-Hutao/responses/gm_message/user_list.js` delete existing cases and add a new user as follows
```javascript
const users = [
     new gmUser(
         '<User name>',
         '<new user's discord ID>',
         ['image name'],
         "<good morning message>"
     ),
]
```
> place desired image into `C6-Hutao/responses/gm_message/Assets`

**$play**
> Command to @ a certain role and see who wants to play
> <!-- -->
> <ins>Usage:</ins> `$play <Role, or person to @> <# of people desired>`
>  <!-- -->
> The bot will then post a way for people to say they're coming to play and once more the `<# of people desired>` say they will attend names will be added to waitlist




Please make sure to update tests as appropriate.


