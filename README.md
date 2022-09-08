# Rick the bot
*Patrick the bot version 2.0*    
A simple IP logger

# Re-build:
I had to rebuild the entire `patrick-the-bot` project, as Heroku won't be free from November 2022.    
Then I thought that I would rebuild it in node and deploy it to Vercel.

# How does it work?
- Send the URL
- Once the URL is opened it redirects to rickroll & sends embed to discord

# Spam:
There's a function in the code that prevents services like: `curl` and `wget` from spamming the site.    
Even though it also blocks libraries that can make requests, if the user-agent is modified the difference 
between the requests made by scripts and people become indistinguishable.

![Preview](./public/assets/img/prev.png)
