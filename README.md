# [<img src="https://raw.githubusercontent.com/Arnabdaz/djpeepo/main/factlylogobg.png" width="32px" /> Factly : share and learn new facts daily](https://factly.netlify.app)

<p style="font-size: 16px">This project is a small full stack web application ... in this web app you can share facts with other people and learn new facts which are being posted by other people</p>

<p>&nbsp;</p>

## Technologies used :

<img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" width="32px"> <img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" width="32px"> <img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" width="32px"> <svg width="32" height="32" viewBox="0 0 109 113" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint0_linear)"/>
<path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint1_linear)" fill-opacity="0.2"/>
<path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E"/>
<defs>
<linearGradient id="paint0_linear" x1="53.9738" y1="54.974" x2="94.1635" y2="71.8295" gradientUnits="userSpaceOnUse">
<stop stop-color="#249361"/>
<stop offset="1" stop-color="#3ECF8E"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="36.1558" y1="30.578" x2="54.4844" y2="65.0806" gradientUnits="userSpaceOnUse">
<stop/>
<stop offset="1" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>

<p>&nbsp;</p>

# Key Features

Having created the website from scratch, I learned how to create and implement features that I'm likely to use in my future websites over and over again. Here are some of the key features and topics that I worked on:

- Facts can be shared with source and categories
- Fact list can be shortlisted according to the categories
- Users can react on facts
- Three reaction categories are there :
  - like 👍
  - mindblowing 🤯
  - wrong ⛔
- If there is high amount of wrong reactions on a fact the fact gets listed as <p style="color: red">[⛔DISPUTED]</p>
- If there is a error in the new fact input field it gets marked by light red shade
- Fully responsive thanks to media queries
- Utilized flex-box and absolute positioning
- Loading... animation that matching with the color scheme of site
- error and no data for a certain category showing when there is an error loading data from the database and the database contains no data for certain category respectively

## GITHUB REPO:

- ## [FACTLY REPO <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="32px" />](https://github.com/Arnabdaz/factly)

## LIVE LINKS:

- ## [Netlify <img src="https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg" height="32px"/>](https://factly.netlify.app)
- ## [Vercel <img src="https://assets.vercel.com/image/upload/front/assets/design/components/triangle.gif" height="32px"/> ](https://factly.vercel.app)
- ## [factly.tk <img src="https://raw.githubusercontent.com/Arnabdaz/djpeepo/main/factlylogobg.png" width="32px" />](https://factly.tk)

<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

# Deploy Yourself:

To deploy the project yourself you just need to do as follows:

we would be using `vercel` to deploy the project

<ol>
<li>Fork the project to your github</li>
<li>now you can clone it to your pc using git clone command(optional)</li>
<li>open the src directory and open supabase.js file</li>
<li>here put the supabase url and api key accordingly in the mentioned places<br> to create a table in supabase follow as below</li>
    <ol>
    <li>create a new project</li>
    <li>now in the project open table editor and create a new table</li>
    <li>name the new table facts</li>
    <li>there would be two columns id and created_at by default <br>add columns with the names and Types as follows :

---

| name             | type | Default Value |
| ---------------- | ---- | ------------- |
| text             | text | -             |
| source           | text | -             |
| category         | text | -             |
| votesInteresting | int8 | 0             |
| votesMindblowing | int8 | 0             |
| votesFalse       | int8 | 0             |

---

<li>now you can save the table</li>
<li>once you create the table go to <strong>authentication section > policies</strong> </li>
<li>for the facts table add new policy and enable read , write , update for everyone</li>
<li>now go to <strong>settings section > api</strong></li>
<li>there you will find project url copy and paste that in supabase.js</li>
<li>now in the api section you will find Project API keys
from there copy the public anon api key and paste in the supabase.js in appropriate place</li>
<li>now save everything and commit to your github repo ... you are done with setting up supabase</li>
</ol>
<p>&nbsp;</p>
<li>once done with the above steps successfully ... open vercel.com and create a account (you can use github for fast signup)</li>
<li>now in the projects create a new project and connect your factly github repo in your account</li>
<li>now set a name for your project</li>
<li>click on build and deploy</li>
<li>wait for the webapp to be deployed once its deployed you will see the link in your vercel project</li>
<li>Congratulation your personal factly is now deployed</li>
