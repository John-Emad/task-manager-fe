# Task Manager

A modern, full-featured task management application built with React, TypeScript, and Vite. This application allows users to create, manage, and track their tasks with an intuitive dashboard interface.

## 📋 Features

- **User Authentication**: Secure sign-in and sign-up functionality
- **Task Management**: Create, update, delete, and toggle task completion status
- **Task Filtering**: Filter tasks by status (all, completed, pending, overdue, upcoming)
- **Search Functionality**: Search tasks by title or description
- **Task Statistics**: View task completion statistics
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Type Safety**: Full TypeScript support for better development experience

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router DOM 7.13.0
- **Form Management**: React Hook Form 7.71.1
- **HTTP Client**: Axios 1.13.5
- **Linting**: ESLint with TypeScript support

## 📦 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: Version 18.18.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)
- **Backend API**: This frontend requires a backend API running (default: `http://localhost:3000`)

## 🚀 Installation

1. **Clone the repository** (if not already done):

   ```bash
   git clone <repository-url>
   cd FrontEnd/Task-Manager
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables** (optional):

   Create a `.env` file in the `Task-Manager` directory to configure the API URL:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

   If not set, the application will default to `http://localhost:3000`.

## 🏃 Running the Application

### Development Mode

To run the application in development mode with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Production Build

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting

To run ESLint and check for code quality issues:

```bash
npm run lint
```

## 🔧 Configuration

### API Configuration

The API endpoints are configured in `src/config/api.config.ts`. The application expects the following backend endpoints:

**Authentication:**

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

**Tasks:**

- `GET /task` - Get all tasks for user
- `POST /task` - Create a new task
- `GET /task/statistics` - Get task statistics
- `GET /task/upcoming` - Get upcoming tasks
- `GET /task/overdue` - Get overdue tasks
- `GET /task/:id` - Get task by ID
- `PUT /task/:id` - Update task
- `PATCH /task/:id/toggle` - Toggle task completion
- `DELETE /task/:id` - Delete task

**User:**

- `GET /user/:id` - Get user by ID
- `PUT /user/:id` - Update user
- `DELETE /user/:id` - Delete user

### Tailwind CSS Configuration

The project uses Tailwind CSS v4 with PostCSS. Configuration files:

- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

## 📁 Project Structure

```
Task-Manager/
├── src/
│   ├── components/       # React components
│   │   ├── Dashboard.tsx
│   │   ├── Navbar.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskFormDialog.tsx
│   │   └── ProtectedRoute.tsx
│   ├── Context/          # React context providers
│   │   ├── UserContext.tsx
│   │   └── UserProvider.tsx
│   ├── services/         # API service layers
│   │   ├── api.service.ts
│   │   ├── auth.service.ts
│   │   └── task.service.ts
│   ├── types/            # TypeScript type definitions
│   │   ├── auth.type.ts
│   │   ├── task.type.ts
│   │   └── user.type.ts
│   ├── config/           # Configuration files
│   │   └── api.config.ts
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── dist/                 # Production build output
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.js      # ESLint configuration
└── package.json          # Project dependencies

```

## 🔑 Environment Variables

| Variable       | Description          | Default                 |
| -------------- | -------------------- | ----------------------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` |

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual port.

### API Connection Issues

Ensure your backend API is running and accessible at the configured `VITE_API_URL`. Check the browser console for network errors.

### Build Errors

If you encounter build errors:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear Vite cache: `rm -rf node_modules/.vite`

## 📝 Development Notes

- The project uses **SWC** for Fast Refresh instead of Babel for better performance
- TypeScript strict mode is enabled for better type safety
- ESLint is configured with React-specific rules
- The application uses React 19's latest features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of a coding challenge for Yomicipa.

## 🆘 Support

For issues or questions, please create an issue in the repository or contact the development team.
