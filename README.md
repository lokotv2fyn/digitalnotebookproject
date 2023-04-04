# digitalnotebookproject

This entire project was made for me to expand my coding abilities. I have been taking multiple courses in JavaScript. But instead of making this from the bottom myself I have been using ChatGPT to see, how fast and how far it could take me with this idea.

This is therefore both an experiment for me in JavaScript but also as to see, how far I can get with ChatGPT. 

I'll put the milestones down here for me and others to see, how fast it went.

`Please note that I am a complete beginner, and I reckon some might say I should start somewhere else while learning JavaScript. I probably should. Therefore you might also see some really bad rookie mistakes. I probably shouldn't even use the markdown the way I am here.  Which is probably also why I should start somewhere else. I won't though. I also have a great interest in what and how I can use ChatGPT, so in this way I am able to combine two projects in one. Feel free to comment anything on my potentially horrible journey.`


### 3/4-2023: 
- Index.html, script.js and style.css

I started off with this incredibly bad prompt, but it actually got me something that worked well quite fast. (I am still one of those persons who tries to be polite. You never know...)

> Good morning. I am trying to become better at JavaScript. I have decided, that i will work on projects instead of doing courses. Could you start me off with some code. It should be in JavaScript, html and tailwind css. The project is to make a digital notebook, where i can organise any material and links i find. The frontpage should include a small input field, where i can add either a new entry or add a link to a lists of links i want to read. The entry consists of a title, the link and a resume. Then the rest of the page adds the entries alphabetically

I remembered, that I am a decent human being, so I asked for a dark version right away. Then followed maybe 15 prompts where I tried to get it to print the entire JavaScript file. 


- Tried to add archive button and list

ChatGPT send me different variations of the JavaScript file, kept stopping itself while trying to print the whole JavaScript file. The above was made with ChatGPT 3.5, but it kept confusing itself. 

I tried switching to 4.0 and with a fresh slate, where i submitted the index and JavaScript file asking it for an archive button and a button that showed archived items.

- Submitted the files that worked fine from 3.5 and got a good response. Now the archive button is there, but it submits an entry twice - an empty entry and the entry with input.

My ability to spot, what and where something was wrong in the JavaScript code that ChatGPT submitted increased already within the first hour.

**Total: About an hour**

### 4/4-2023:

- Been trying to troubleshoot why my code creates an empty `<li>` element.

And while doing so, I found that the way ChatGPT explains to me the different possible errors i actually learn how to look for errors.
After a couple misfires from ChatGPT, and after I send the updated code 'we' managed to find the error and fix it.

- Found a new bug though. When I push 'archive' on a second entry it unarchives something that has already been archived.

And while explaining the error to ChatGPT it hit me, that this must be some sort of backwards-rubberducking. Since I am not *that* good at JavaScript yet, I am unintentionally explaining everything very simple. 

- Added the categories to entries

I figured this part was easier than explaining the first one on my 'rough-roadmap'. And it only took one try, then ChatGPT had it done for me.

Appearantly something broke the add entry button. It works when i clear entries first.

- There was a duplicate function of `archiveEntry` that 'we' removed.

**Total: About an hour** 

### Heres a [look on how things are going](https://digitalnotebookproject.netlify.app/).

### Rough-roadmap:
- Two different entries; A want-to-read entry, and an already-read entry (also the archived-entries, which are links I don't want in the notebook, but I still wanna know, that I archived them and for what reason - I think.) Or just a checkbox, once checked it moves from - wants to read into a category. (When an entry is marked 'read' it should automatically put itself into the category in the menu?)
- Links to read title should change to archived entries when that index is active
- ~~Categories~~
- Search-function
- Menu with all entries sorted into categories
- Obviously a better design
- Obviously gonna store the entries some other place than local so I can take it with me (Maybe make a login to access and without login you can use it locally?)