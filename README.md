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

### Dev Setup
1. Connection Protocol:
For development purposes, you can use the HTTP protocol. Configure the `.env` file with the following default values for SSL_KEY_FILE and SSL_CERT_FILE:
```
SSL_KEY_FILE=''
SSL_CERT_FILE=''
```

2. HOST Parameter:
For development, set the HOST parameter to `localhost`. This restricts server accessibility to the PC where it is started:
```
HOST=localhost
```


### Production Setup
1. Connection Protocol:
For production environments, use the HTTPS protocol. Generate and register certificate keys, then set the paths to the keys in the SSL_KEY_FILE and SSL_CERT_FILE variables:
```
SSL_KEY_FILE='certificates/privatekey.pem'
SSL_CERT_FILE='certificates/certificate.pem'
```

2. HOST Parameter:
For production, set the HOST parameter to a specific IP address that should have access to the server:
```
HOST=192.168.0.100
```

**NOTE:**
To allow server access from all network interfaces, set the HOST parameter to `0.0.0.0`. This option is suitable for both production and development processes:

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
