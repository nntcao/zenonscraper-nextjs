# ZenonScraper-Web - the frontend for ZenonScraper.com (Next.js)

Zenon Scraper is a real-time blockchain explorer for the Zenon Network. Zenon Scraper strives to provide accurate, real-time information to end users in an easy navigatable way.

This repository is the frontend for Zenon Scraper, which was built using Next.js.

<br/>
<hr/>
<br/>

# Libraries/Frameworks
- Next.js
- React
- nextjs-progressbar
- react-loader-spinner
- chart.js
- CSS Modules
- SASS
- pg

# Getting Started

- ## Requirements
    - [NodeJs] (https://nodejs.org/en/) version 16+
    - NPM which can be found in the NodeJs installation

- ## Installation
    - cd into the znnscraper-web directory and run `npm install`
    - create your own .env.local file to manage API connections
    - start local server using `npm start`
    - run dev server using `npm run dev`

- ## Project Structure
    - the project is organized according to traditional Next.js file structure
    - /pages provides routing information and stores React webpages
    - /components stores reusable React components
    - /public stores static images and fonts
    - /services stores API connections 
    - /utils stores general-purpose utilities
    - /styles holds the global.css stylesheet applied to all pages

# Current Deployment

Currently ZenonScraper.com is being deployed using PM2.
