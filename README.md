# Zenos | University Hackathon

Zenos is an immersive 2D open-world game that allows players to build, own, rent, transfer, and protect virtual land, with future plans for subscription-based features. The game leverages iExec's robust tools to ensure privacy, ownership, and monetization within a decentralized ecosystem, addressing the challenges of easy replication in the open-source space. 

**Video Demo:**  [https://youtu.be/mFP6qcWkEZc](https://youtu.be/mFP6qcWkEZc)

**Demo/Website:**  [https://zenos-bay.vercel.app](https://zenos-bay.vercel.app/)

## Key Features
- Design unique landscapes using a variety of in-game items to create and customize land. 
- Earn rewards by renting or sharing your creations with other players using **iExec's DataProtector Core & Sharing** to monetize or share land freely.
- Buy land from other players and add your personal touch to personalize it and make it unique.

## The Advantage of Using iExec for Our Game

In the decentralized space and even on gaming, many challenges arise due to the open-source nature of projects, where code and assets are publicly accessible, leading to potential issues like data copying and unauthorized use. **IExec's DataProtector Core & Sharing too**l addresses these concerns by ensuring that all game assets and confidential data are securely encrypted and stored on IExec’s decentralized network, safeguarding them from unauthorized access. Additionally, iExec offers a robust data-sharing model, including data renting, subscription, and selling, which perfectly aligns with the needs of our game and its assets. This enables us to protect sensitive game data while providing a secure and flexible way to monetize and share our digital assets.



From a technical perspective, we integrate iExec's tools, such as Data Protector Core and data sharing functions, to provide secure and efficient handling of user-generated content. Key functionalities like protectData, sharing, and consumeProtectedData ensure a seamless and protected gaming experience.

## Technology Utilized  - IExec's DataProtector Core & Sharing tool

We utilized **IExec's DataProtector Core & Sharing tool**, leveraging the following key features:  

- **ProtectData**: Ensures that all game assets and confidential data are securely encrypted and stored on IExec’s decentralized network, safeguarding them from unauthorized access using the `protectData` function.  

- **Collection Methods**: Each land's data is grouped into a collection using iExec's `createCollection` and `addToCollection` functions, enabling seamless management through a data-sharing smart contract.  

- **Data Sharing - Renting**: Empowers players to create and rent their lands through the in-game land gallery, enabling them to earn incentives while retaining ownership using the `setProtectedDataToRenting` and `rentProtectedData` functions.  

- **ConsumeProtectedData**: Facilitates secure access to the game's rented lands and assets, ensuring seamless gameplay with robust data protection using the `ConsumeProtectedData` and `getResultFromCompletedTask` functions.  

We built the game using Vite and React, where I created a Context Provider API to manage the game’s state and interactions. Within this API, I implemented functions to interact with iExec, allowing me to call iExec functions simply by passing arguments. The logic for these functions is housed in the context provider, ensuring modular integration with iExec's services while keeping the component code clean, improving maintainability and scalability. You can find the implementation of the Context Provider in the [here](https://github.com/0xClint/encode-university-hack/blob/3a181a74def8f668af2526e1f1f08fcceb0292e3/src/contexts/GameProvider.jsx)

## Running the Project

To get started with the project, follow these steps:

1. Install the dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
