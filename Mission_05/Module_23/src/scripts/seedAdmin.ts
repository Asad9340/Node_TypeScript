import { prisma } from '../../lib/prisma';
import { UserRole } from '../middlewares/auth';

async function seedAdmin() {
  try {
    const adminPayload = {
      name: 'Admin User',
      email: 'admin@example.com',
      role: UserRole.ADMIN,
      password: 'adminPassword',
      phone: '01710101984',
      emailVerified: true,
    };
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: adminPayload.email,
      },
    });
    if (existingAdmin) {
      console.log('Admin user already exists. Skipping seeding.');
      throw new Error('Admin user already exists');
    }
    const signUpAdmin = await fetch(
      'http://localhost:5000/api/auth/sign-up/email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminPayload),
      }
    );
    const adminData = await signUpAdmin.json();
    console.log('Admin user seeded successfully:', adminData);
    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: { email: adminPayload.email },
        data: { emailVerified: true },
      });
    }
  } catch (error) {
    console.error('Error seeding admin user:', (error as Error).message);
  }
}

seedAdmin();
