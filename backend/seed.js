import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from './models/company.js';

dotenv.config();

const companies = [
  { companyName: "Microsoft", salaryPackage: "45 LPA", location: "Bangalore", role: "Backend Developer" },
  { companyName: "Amazon",    salaryPackage: "90 LPA", location: "Noida",     role: "Software Engineer" },
  { companyName: "Google",    salaryPackage: "1 Cr",   location: "USA",       role: "MERN Stack Developer" },
  { companyName: "Flipkart",  salaryPackage: "50 LPA", location: "Hyderabad", role: "DevOps Engineer" },
  { companyName: "Capgemini", salaryPackage: "5 LPA",  location: "Chennai",   role: "Data Science" },
  { companyName: "TCS",       salaryPackage: "15 LPA", location: "Delhi",     role: "Data Analyst" },
  { companyName: "TCS",       salaryPackage: "15 LPA", location: "Delhi",     role: "Data Science" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const inserted = await Company.insertMany(companies);
    console.log(`Successfully inserted ${inserted.length} companies:`);
    inserted.forEach(c => console.log(`  - ${c.companyName} | ${c.role} | ${c.salaryPackage}`));

    await mongoose.disconnect();
    console.log('Done.');
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
