<!-- Referenced from https://github.com/othneildrew/Best-README-Template -->
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/bettersg/MindBetter-Frontend">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Mendisphere</h3>

  <p align="center">
    Mendisphere is a platform that helps nonprofit mental health organisations who are struggling financially, specifically with securing grants.
    <br />
    <a href="https://github.com/bettersg/MindBetter-Frontend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/bettersg/MindBetter-Frontend">View Demo</a>
    ·
    <a href="https://github.com/bettersg/MindBetter-Frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/bettersg/MindBetter-Frontend/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Mendisphere is a platform that helps nonprofit mental health organisations who are struggling financially, specifically with securing grants.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][react.js]][react-url]
  <!-- Google Firebase -->
  <!-- Chakra UI -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Instructions on setting up your project locally.

### Prerequisites

1. Node and npm are installed on your machine
2. Firebase CLI installed globally: `npm install -g firebase-tools`
3. Firebase app secrets stored in the root level of the project in file named: `env.development.local`

### Firebase Emulator Setup

This project uses Firebase Emulator Suite for local development. The emulator provides local instances of Firestore, Authentication, Storage, and other Firebase services.

**Configuration**
- Emulator settings are configured in `firebase.json` in the root directory
- The app connects to emulators by default in `src/services/Firebase/firebaseConfig.ts`
- If you need to bypass the emulator setup, update the configuration in `firebaseConfig.ts`

**Emulator UI**
- Access the Firebase Emulator UI at `http://localhost:4000` when running
- View and manage Firestore data, Authentication users, and Storage files

For more details, see the [Firebase Emulator Suite documentation](https://firebase.google.com/docs/emulator-suite).

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/bettersg/MindBetter-Frontend.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```

3. Authenticate with Firebase (required for emulators)
   ```sh
   firebase login
   ```

4. Run the project locally with Firebase Emulators

   **First time setup (after fresh clone):**
   
   Terminal 1 - Start the emulator:
   ```sh
   npm run emulators:fresh
   ```
   
   Terminal 2 - Seed the data:
   ```sh
   npm run seed
   ```
   
   Terminal 3 - Start the app:
   ```sh
   npm start
   ```
   
   This generates mock data on first run. The data will be exported to `src/mocks/data/` and persisted locally for future runs.

   **Subsequent runs:**
   
   Terminal 1 - Start the emulator:
   ```sh
   npm run emulators
   ```
   
   Terminal 2 - Start the app:
   ```sh
   npm start
   ```
   
   This imports your locally saved mock data from previous sessions.

   **Regenerate mock data:**
   
   With the emulator running, in a new terminal:
   ```sh
   npm run seed:force
   ```
   
   This clears all existing data and generates fresh mock data. Use this when you've updated test data definitions.

5. Access the application at `http://localhost:3000`

### Working with Mock Data

- **Local data location**: `src/mocks/data/` (gitignored - not committed)
- **Mock data definitions**: `src/mocks/definitions/`
- **Seed script**: `src/mocks/SeedMockData.ts`

To update mock data:
1. Modify the test data in `src/mocks/definitions/`
2. With the emulator running, run `npm run seed:force` to clear and regenerate the data
3. The updated data will be saved locally in `src/mocks/data/` for your use

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
<!-- 
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- ROADMAP -->

<!-- ## Roadmap

WIP -->

<!-- CONTRIBUTING -->

## Contributing
<!-- 
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Assign yourself to an issue in the todo backlog (https://github.com/orgs/bettersg/projects/5)
3. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

<!-- ## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/bettersg/MindBetter-Frontend](https://github.com/bettersg/MindBetter-Frontend) -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

<!-- ## Acknowledgments

- []()
- []()
- []()

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[svelte-url]: https://svelte.dev/
[laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[laravel-url]: https://laravel.com
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com
