<h1 align="center"> Stress Buddy - QDS </h1> 

## Project Description
Stress Buddies is a useful app for students dealing with challenging assignments and heavy workloads. By connecting students with different strengths and weaknesses, it not only eases mental stress but also provides the flexibility to spend more time on other activities or get a good night's sleep. This focus on mental well-being ultimately contributes to improved physical health, allowing students to strike a better balance between academics and relaxation.


## Contributers
| David Cho | Jeen Namkung | Junyoung Lee | Jeremy Testa | Radmir Garipov |

## Technologies and Resources Used
![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%231a202c.svg?style=for-the-badge&logo=tailwind-css&logoColor=61dafb)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Google OAuth](https://img.shields.io/badge/Google_OAuth-%234285f4.svg?style=for-the-badge&logo=google&logoColor=white)
![GetStream Chat](https://img.shields.io/badge/GetStream_Chat-%23316192.svg?style=for-the-badge&logo=getstream&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-%23007ACC.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)




## Complete Setup/Installation/Usage

Follow these steps for setting up, installing, and using the app:

1. **MongoDB API**: Ensure MongoDB API is set up and configured correctly.

2. **Stream Chat API**: Configure Stream Chat API for real-time chat features.

3. **Google OAuth API**: Set up Google OAuth API for authentication.

4. **Save API secret in .env**:

```
GOOGLE_ID=YOUR_GOOGLE_ID
GOOGLE_SECRET=YOUR_GOOGLE_SECRET

NEXTAUTH_URL=YOUR_NEXTAUTH_URL
NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET

MONGODB_URI=YOUR_MONGODB_URI

STREAM_API_KEY=YOUR_STREAM_API_KEY
STREAM_API_SECRET=YOUR_STREAM_API_SECRET
STREAM_APP_ID=YOUR_STREAM_APP_ID
```

4. **Clone Repository**: Clone the repository to your local machine: `git clone https://github.com/gdcho/QDSHacks'

5. **Install Dependencies**: Navigate to the project directory and install dependencies: 'npm install'

6. **Build Application**: Execute the following command to build the application: 'npm run build'

7. **Run Locally**: Start the application locally using: 'npm run dev'

Now, your application should be up and running locally, ready for use.




## Known Bugs and Limitations
* During development, due to limitations of the MongoDB database, it was necessary to create and switch between two databases, which resulted in additional complexity.

* While creating a matching collection, it was anticipated that implementing new collection for matched users would facilitate algorithm optimization. However, due to constraints in time and resources, we couldn't execute the plan as thoroughly as desired.


## Features for Future
* AI Matchmaking for Learning: Integrate AI matchmaking functionality to pair users with AI when there are no matches available. This allows users to study with the assistance of AI, enhancing their learning experience. Also, when the number of data increase, AI will allow our match making system to deal with large amount of data.

* Points System and Leaderboard: Implement a points system where users earn points by helping others or receiving assistance. These points can be used to climb the leaderboard, encouraging users to actively participate and engage in the community.


## File Structure
```
📦 QDSHacksTeam6
├── QDSHacks
├── README.md
├── next-env.d.ts
├── next.config.mjs
├── node_modules
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── image
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── components
│   │   ├── data
│   │   ├── layout
│   │   └── shared
│   ├── hooks
│   │   └── useClient.ts
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── api
│   │   ├── connect.tsx
│   │   ├── favicon.ico
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── match.tsx
│   │   ├── profile
│   │   ├── profile.tsx
│   │   └── stressStatsDisplay.tsx
│   ├── styles
│   │   └── globals.css
│   └── utils
│       ├── createChatRoom.ts
│       └── mongodb.ts
├── tailwind.config.ts
├── tsconfig.json
└── types
    └── next-auth.d.ts
```

## References
* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [MongoDB](https://www.mongodb.com/)
* [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
* [GetStream Chat](https://getstream.io/chat/)
* [Figma](https://www.figma.com/)
* [Visual Studio Code](https://code.visualstudio.com/)

## Credits
<img src="https://www.go2hr.ca/wp-content/uploads/2023/04/Box-Logo-Blue.png"/>
