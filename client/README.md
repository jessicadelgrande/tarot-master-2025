# Tarot App

A modern React application for tarot card readings.

## Features

- Google Sign-in integration
- Interactive tarot card readings
- User profile management
- Beautiful animations and transitions
- TypeScript support
- Modern React practices

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Google OAuth credentials

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the client directory with your environment variables:

   ```
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   VITE_API_URL=http://localhost:4000
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Building for Production

```bash
npm run build
# or
yarn build
```

## Testing

```bash
npm test
# or
yarn test
```

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router v6
- Styled Components
- React Spring
- Vitest

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── context/
│   │   └── ...
│   ├── assets/
│   ├── types/
│   └── ...
├── public/
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
