const mongoose = require('mongoose');
const Applicant = require('../models/applicant.model');
require('dotenv').config();

const mockApplicants = [
    {
        name: "John Doe",
        headline: "Senior React Developer",
        email: "john.doe@example.com",
        skills: ["React", "TypeScript", "Node.js", "Redux"],
        summary: "Passionate frontend developer with 5 years of experience building scalable web applications.",
        avatarUrl: "https://i.pravatar.cc/150?u=john"
    },
    {
        name: "Jane Smith",
        headline: "Full Stack Engineer",
        email: "jane.smith@example.com",
        skills: ["Java", "Spring Boot", "Angular", "AWS"],
        summary: "Experienced full stack engineer with a strong background in enterprise software development.",
        avatarUrl: "https://i.pravatar.cc/150?u=jane"
    },
    {
         name: "Michael Brown",
         headline: "DevOps Specialist",
         email: "michael.brown@example.com",
         skills: ["Docker", "Kubernetes", "Jenkins", "Python"],
         summary: "DevOps engineer focused on automation and CI/CD pipelines.",
         avatarUrl: "https://i.pravatar.cc/150?u=michael"
    },
    {
        name: "Emily Davis",
        headline: "UI/UX Designer",
        email: "emily.davis@example.com",
        skills: ["Figma", "Adobe XD", "Sketch", "HTML/CSS"],
        summary: "Creative designer with a keen eye for detail and user experience.",
        avatarUrl: "https://i.pravatar.cc/150?u=emily"
    },
    {
        name: "David Wilson",
        headline: "Backend Developer",
        email: "david.wilson@example.com",
        skills: ["Node.js", "Express", "MongoDB", "Redis"],
        summary: "Backend specialist loves building high-performance APIs.",
        avatarUrl: "https://i.pravatar.cc/150?u=david"
    }
];

const seedDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI must be defined');
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        await Applicant.deleteMany({});
        console.log('Cleared existing applicants');

        await Applicant.insertMany(mockApplicants);
        console.log('Seeded applicants');

        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
