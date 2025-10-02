# MISSION 5

### PROJECT OVERVIEW
Mission 5 is a full-stack web application designed to help users locate Z Energy stations across New Zealand. It features a responsive, map-integrated frontend and a scalable backend API, delivering real-time station data, intuitive filtering, and clean UI interactions. The project emphasizes modular architecture, team collaboration, and production-grade design.

#### Features
- Station Search & Filter – Filter by fuel type, services, and location
- Interactive Map – View station pins and clusters with zoom and click-to-navigate
- Get Directions – Navigate to a dedicated directions page with station-specific data
- Operating Hours Dropdown – Smooth transitions and clean alignment
- Fuel Prices & Services – Display last updated prices and available amenities
- Reusable Hooks & Components – Modular React architecture for scalability
- Backend API – RESTful endpoints with MongoDB integration and filtering logic
### CONTRIBUTORS
#### Christine Chen
- Developed the Directions Page with dynamic routing and station-specific data
- Designed and implemented the MongoDB Schema for Z Energy stations
- Built the Map Component with interactive markers and clustering logic

---

#### Dhanisha Harshad
- Architected the Frontend and Backend Folder Structure
- Created the Home Page with hero section and navigation flow
- Implemented Search and Filter Logic with dropdowns, checkboxes, and real-time results

---

#### Rachel Mareraki
- Built the Find Station Page with dynamic station cards and filtering
- Engineered the StationCard Component with modular subcomponents (e.g. GetDirections, OperatingHours)
- Configured the Database Connection and validated API integration

---

#### Design Team
- Krupa Dah
- Rita Hardstaff
- Shenene Carstens

---

### TECH STACK
- Frontend : React & Vite
- Backend : Node.js & Express, Google Maps API
- Database : MongoDB & Mongoose

---

### TOOLS
- GitHub : Version control and collaboration
- Jira : Agile task tracking and sprint planning
- Teams : Team communication
- Figma : UI Design and prototyping
- Whiteboard : Planning and user flow mapping

---

### INSTALLATION
#### 1. Clone the repo: 
    `git clone https://github.com/DhanishaHarshad/mission5-stationFinder`
#### 2. Open terminal and navigate into the client and server directories.

Complete the following steps for both the server and client directories:

#### 3. Run `npm install` to install dependencies
#### 4. Create `.env` in the root level 
- Add to backend .env:

`MONGO_URI=your_mongo_connection_string
PORT=4000
FRONT=http://localhost:5173
`
- Add to frontend .env: 

`VITE_GOOGLE_MAPS_API_KEY=your_api_key
VITE_STATION_API=http://localhost:4000/api/zstations`

#### 5. Start the app
- Start server: `npm start`
- Start client: `npm run dev`


### FOLDER STRUCTURE

```
Mission5-stationFinder/
│
├── Frontend/
│ ├── Public/
│ │ └── assets/
│ │ ├── filters/
│ │ ├── fonts/
│ │ ├── icons/
│ │ └── images/
│ │
│ └── src/
│ ├── api/
│ │ └── stationFiltering.jsx
│ │
│ ├── assets/
│ │ └── Empty
│ │
│ ├── Components/
│ │ └── stationFilteringList.jsx
│ │
│ ├── Hooks/
│ │ ├── useStationById.js
│ │ └── useStationResults.js
│ │
│ ├── Pages/
│ │ ├── Directions/
│ │ │ ├── Directions.jsx
│ │ │ └── Directions.module.css
│ │ │
│ │ ├── Findstation/
│ │ │ ├── Findstation.jsx
│ │ │ └── Findstation.module.css
│ │ │
│ │ └── Home/
│ │ ├── Home.jsx
│ │ └── Home.module.css
│ │
│ ├── Routes/
│ │ └── Router.jsx
│ │
│ ├── Shared/
│ │ └── filter/
│ │ ├── Filter.jsx
│ │ └── Filter.module.css
│ │
│ ├── footer/
│ │ ├── Footer.jsx
│ │ └── Footer.module.css
│ │
│ ├── header/
│ │ ├── Header.jsx
│ │ └── Header.module.css
│ │
│ ├── map/
│ │ ├── Map.jsx
│ │ └── Map.module.css
│ │
│ ├── search/
│ │ ├── Search.jsx
│ │ └── Search.module.css
│ │
│ ├── shareTank/
│ │ ├── shareTank.jsx
│ │ └── shareTank.module.css
│ │
│ ├── stationCard/
│ │ ├── StationCard.jsx
│ │ └── StationCard.module.css
│ │
│ ├── station details/
│ │ ├── Fuels.jsx
│ │ ├── GetDirections.jsx
│ │ ├── OperatingHours.jsx
│ │ ├── Services.jsx
│ │ └── StationTitle.jsx
│ │
│ ├── styles/
│ │ ├── Fuels.module.css
│ │ ├── GetDirections.module.css
│ │ ├── OperatingHours.module.css
│ │ ├── Services.module.css
│ │ └── StationTitle.module.css
│ │
│ ├── Utils/
│ │ ├── formatLastUpdated.js
│ │ ├── formatOpeningHours.js
│ │ ├── formatStation.js
│ │ └── serviceIcons.js
│ │
│ ├── App.css
│ ├── App.jsx
│ ├── Index.css
│ ├── Main.jsx
│ └── .env
Backend/
├── .env                     
├── Index.js               
└── src/
    ├── config/
    │   └── connectDb.js     
    │
    ├── controllers/
    │   ├── getStationController.js  
    │   └── stationController.js     
    │
    ├── models/
    │   └── zEnergySchema.js         
    │
    ├── routes/
    │   ├── getStations.js          
    │   └── stationRoutes.js       
    │
    ├── scripts/
    │   ├── Seed.js                 
    │   └── stationData.js           
    │
    └── services/
        └── stationFilter.js        
├── Readme.md
└── .gitignore
```

---