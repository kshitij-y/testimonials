# Testimonial Website

A simple and elegant testimonial website where users can share their feedback and experiences. This project is built using Next.js with Prisma for database management and Tailwind CSS for styling. It is deployed on Vercel.

## Features
- Submit testimonials with name, message, and profile picture
- Display testimonials in a responsive layout
- Edit and delete testimonials (Admin feature)
- Backend API for managing testimonials
- Dockerized setup for easy deployment
- Authentication with JWT
- Fully responsive UI

## Tech Stack
- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT, Google OAuth
- **Deployment:** Vercel, Docker, Nginx

## Installation

### Prerequisites
- Node.js and npm installed
- PostgreSQL database setup
- Docker (optional for containerization)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/kshitij-y/testimonials.git
   cd testimonials
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the environment variables:
   ```sh
   cp .env.example .env
   # Update the .env file with your database and secret keys
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## Docker Setup
To run the project using Docker, build and start the container:
```sh
docker build -t testimonial-website .
docker run -p 3000:3000 --env-file .env testimonial-website
```

## API Endpoints

### Authentication
| Method | Endpoint                        | Description            |
|--------|---------------------------------|------------------------|
| POST   | /api/user/auth/signup           | Register a new user    |
| POST   | /api/user/auth/signin           | User login             |
| POST   | /api/user/auth/signout          | User logout            |
| GET    | /api/user/auth/googleauth       | Google OAuth login     |

### Space Management
| Method | Endpoint                              | Description                |
|--------|---------------------------------------|----------------------------|
| POST   | /api/user/space/createspace           | Create a new space         |
| GET    | /api/user/space/getSpace/[spaceId]    | Get details of a space     |
| DELETE | /api/user/space/deleteSpace/[spaceId] | Delete a space             |
| GET    | /api/user/space/spaces                | List all spaces            |

### Testimonial Management
| Method | Endpoint                                         | Description                |
|--------|--------------------------------------------------|----------------------------|
| POST   | /api/user/testimonials/createTestimonials/[id]   | Create a testimonial       |
| GET    | /api/user/testimonials/getTestimonials/[id]      | Get testimonials           |
| DELETE | /api/user/testimonials/deleteTestimonial/[id]    | Delete a testimonial       |
| GET    | /api/user/testimonials/show/[id]                 | Get a single testimonial   |

## Usage
1. Visit the deployed site: [testimonials-delta-ten.vercel.app](https://testimonials-delta-ten.vercel.app)
2. Submit a testimonial by filling in your name, message, and uploading a profile picture.
3. View, edit, or delete testimonials if you have admin access.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

## Screenshots
![Homepage](https://via.placeholder.com/800x400.png?text=Homepage)
![Testimonial Form](https://via.placeholder.com/800x400.png?text=Testimonial+Form)
