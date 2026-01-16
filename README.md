# Online Store (Diploma Project)

## Description
Full-stack web application — online store developed as a bachelor diploma project.
The project includes frontend, backend, database integration, and third-party API usage.

## Features
- Product catalog
- Product detail pages
- Shopping cart
- Order form with validation
- Delivery address selection
- Integration with Nova Poshta API (cities, warehouses)
- Dynamic delivery location selection
- REST API integration

## Tech Stack
**Frontend:**
- React
- Next.js

**Backend:**
- Node.js
- Express.js

**Database:**
- MySQL
- Prisma ORM

**Other:**
- REST API
- Git / GitHub
- Deployment: Vercel

## Nova Poshta API
The project integrates the Nova Poshta API to:
- Fetch list of cities
- Fetch available warehouses by selected city
- Provide dynamic delivery location selection during checkout

# Screenshots

Нижче наведені скріншоти інтерфейсу та функціоналу проекту:

### Головна сторінка
![Main Page as Guest](screenshots/mainPageAsGuest.png)
![Main Page as User](screenshots/mainPageAsUser.png)

### Продукти
![Add Product](screenshots/addProduct.png)
![Edit Product for Admin](screenshots/editProductForAdmin.png)
![Product Page](screenshots/productPage.png)

### Кошик та замовлення
![Busket](screenshots/busket.png)
![Make Order](screenshots/makeOrder.png)

### Фільтри та пошук
![Filter](screenshots/filter.png)

### Реєстрація та логін
![Registration Form](screenshots/registrationForm.png)
![Code Sent to Email](screenshots/codeSentToEmail.png)

### Інтеграції
![Nova Poshta API](screenshots/novaPoshtaApi.png)

### База даних
![Database](screenshots/database.png)

### Діаграми та кейси
![Use Case](screenshots/useCAse.png)


## Getting Started

### 1. Clone repository
```bash
git clone https://github.com/your-username/online_store.git
cd online_store

