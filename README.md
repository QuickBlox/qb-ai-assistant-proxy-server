# QBAIPROXY Server

QBAIPROXY is a server designed for secure storage of API keys using dotenv. It also redirects requests to an AI API.

## Prerequisites

- Node.js (v16 and above)
- npm (v8 and above)

## Installation

Install dependencies:

```bash
npm install
```

## Configurations

Set up environment variables:

1. Rename the `.env.example` file to `.env`.
2. Edit the `.env` file and replace the placeholder values with your actual configuration.

## Usage

To start the server, run the following command:

```bash
npm start
```

The server will be started on the specified port (or default port 3000 if not provided).

## QuickBlox

QBAIPROXY required integration with QuickBlox to establish a secure access mechanism for the AI API. By incorporating QuickBlox, a double authentication process is implemented to guarantee that only authorized users can gain access to the API. This involves verifying the registration and authorization of the user attempting to access the AI API, effectively thwarting any unauthorized third-party interference and safeguarding the API against potential attackers.

To integrate QuickBlox into the QBAIPROXY server, follow these steps:

1. Register and set up your QuickBlox account by following the instructions provided in the QuickBlox [documentation](https://docs.quickblox.com/docs/introduction).

2. Obtain your QuickBlox API URL and ensure that these it is correctly configured in the `.env` file.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
