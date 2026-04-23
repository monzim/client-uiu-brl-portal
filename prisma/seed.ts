import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const db = new PrismaClient({ adapter })

const newsItems = [
  {
    id: 'cell-culture-workshop',
    title: 'Cell Culture Training Workshop Held',
    date: new Date('2026-03-09'),
    description:
      'A seminar and hands-on training on cell culture techniques was conducted, providing practical experience in aseptic handling and applications in infectious disease and biomedical research.',
    content:
      '<p>A seminar and hands-on training on cell culture techniques was conducted, providing practical experience in aseptic handling and applications in infectious disease and biomedical research.</p>',
    image: 'https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg',
    published: true,
  },
  {
    id: 'presentation-session',
    title: 'Biomedical Research Lab Presentation Session',
    date: new Date('2025-02-16'),
    description:
      'Led by Dr. Tahmina Foyez, this session showcased ongoing research projects, student contributions, and future directions of the laboratory.',
    content:
      '<p>Led by Dr. Tahmina Foyez, this session showcased ongoing research projects, student contributions, and future directions of the laboratory.</p>',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
    published: true,
  },
  {
    id: 'community-pharmacy-webinar',
    title: 'Career Webinar on Community Pharmacy',
    date: new Date('2025-12-13'),
    description:
      'The first session of the Career Webinar Series focused on building a career as a community pharmacist, highlighting skills, opportunities, and professional pathways.',
    content:
      '<p>The first session of the Career Webinar Series focused on building a career as a community pharmacist, highlighting skills, opportunities, and professional pathways.</p>',
    image: 'https://images.pexels.com/photos/5910953/pexels-photo-5910953.jpeg',
    published: true,
  },
  {
    id: 'wound-healing-remedy',
    title: 'Seminar on Local Wound Healing Remedy',
    date: new Date('2024-12-08'),
    description:
      'A seminar explored the development of cost-effective, locally sourced treatments for minor wound healing and their evaluation.',
    content:
      '<p>A seminar explored the development of cost-effective, locally sourced treatments for minor wound healing and their evaluation.</p>',
    image: 'https://images.pexels.com/photos/3825368/pexels-photo-3825368.jpeg',
    published: true,
  },
  {
    id: 'pharmacist-day-2024',
    title: 'World Pharmacist Day 2024 Celebrated',
    date: new Date('2024-09-28'),
    description:
      "The department celebrated World Pharmacist Day under the theme 'Pharmacists: Meeting Global Health Needs,' recognizing the role of pharmacists in healthcare.",
    content:
      "<p>The department celebrated World Pharmacist Day under the theme 'Pharmacists: Meeting Global Health Needs,' recognizing the role of pharmacists in healthcare.</p>",
    image: 'https://images.pexels.com/photos/5439141/pexels-photo-5439141.jpeg',
    published: true,
  },
]

const facultyItems = [
  {
    id: 'tahmina-foyez',
    name: 'Dr. Tahmina Foyez',
    designation: 'Head & Professor',
    department: 'Department of Pharmacy',
    email: 'tahmina@pharmacy.uiu.ac.bd',
    room: 'Room No 916, UIU',
    profileDescription:
      'Dr. Tahmina Foyez is the Head and Professor of the Department of Pharmacy at UIU. She completed her Ph.D. from Nagoya University, Japan, specializing in molecular biology.',
    education: [
      'Doctor of Philosophy: Department of Molecular Biology, Graduate School of Medicine, Nagoya University, Nagoya, Japan',
      'Masters of Pharmacy: Department of Clinical Pharmacy & Pharmacology, University of Dhaka, Dhaka, Bangladesh',
      'Bachelor of Pharmacy: Department of Pharmacy, University of Dhaka, Dhaka, Bangladesh',
    ],
    positionHeld: ['Professor & Head, Department of Pharmacy, UIU'],
    honors: [] as string[],
    researchInterests: [
      'Venous thromboembolism',
      'Glycoprotein',
      'Sugar chain',
      'Sulfotransferases enzymes',
      'Neurodegenerative diseases',
      'Nanomedicine',
    ],
    researchProjects: [] as string[],
    publications: [] as string[],
    importantLinks: [
      {
        label: 'Google Scholar',
        url: 'https://scholar.google.com',
      },
    ],
    published: true,
    sortOrder: 0,
  },
  {
    id: 'sabiha-tasnim',
    name: 'Sabiha Tasnim',
    designation: 'Assistant Professor',
    department: 'Department of Pharmacy',
    email: 'sabiha@pharmacy.uiu.ac.bd',
    profileDescription:
      'Sabiha Tasnim is an Assistant Professor in the Department of Pharmacy at UIU with research interests in pharmaceutical sciences.',
    education: [] as string[],
    positionHeld: ['Assistant Professor, Department of Pharmacy, UIU'],
    honors: [] as string[],
    researchInterests: ['Pharmaceutical Sciences', 'Drug Delivery'],
    researchProjects: [] as string[],
    publications: [] as string[],
    importantLinks: [] as { label: string; url: string }[],
    published: true,
    sortOrder: 1,
  },
  {
    id: 'sharmin-ahmed-rakhi',
    name: 'Sharmin Ahmed Rakhi',
    designation: 'Assistant Professor',
    department: 'Department of Pharmacy',
    email: 'sharmin@pharmacy.uiu.ac.bd',
    profileDescription:
      'Sharmin Ahmed Rakhi is an Assistant Professor in the Department of Pharmacy at UIU.',
    education: [] as string[],
    positionHeld: ['Assistant Professor, Department of Pharmacy, UIU'],
    honors: [] as string[],
    researchInterests: ['Biomedical Research', 'Pharmacology'],
    researchProjects: [] as string[],
    publications: [] as string[],
    importantLinks: [] as { label: string; url: string }[],
    published: true,
    sortOrder: 2,
  },
  {
    id: 'ferdous-ul-haque-joy',
    name: 'Ferdous-Ul-Haque Joy',
    designation: 'Lecturer',
    department: 'Department of Pharmacy',
    email: 'joy@pharmacy.uiu.ac.bd',
    profileDescription:
      'Ferdous-Ul-Haque Joy is a Lecturer in the Department of Pharmacy at UIU.',
    education: [] as string[],
    positionHeld: ['Lecturer, Department of Pharmacy, UIU'],
    honors: [] as string[],
    researchInterests: ['Pharmaceutical Sciences'],
    researchProjects: [] as string[],
    publications: [] as string[],
    importantLinks: [] as { label: string; url: string }[],
    published: true,
    sortOrder: 3,
  },
  {
    id: 'rajib-das',
    name: 'Rajib Das',
    designation: 'Lecturer',
    department: 'Department of Pharmacy',
    email: 'rajib@pharmacy.uiu.ac.bd',
    profileDescription:
      'Rajib Das is a Lecturer in the Department of Pharmacy at UIU.',
    education: [] as string[],
    positionHeld: ['Lecturer, Department of Pharmacy, UIU'],
    honors: [] as string[],
    researchInterests: ['Biomedical Sciences'],
    researchProjects: [] as string[],
    publications: [] as string[],
    importantLinks: [] as { label: string; url: string }[],
    published: true,
    sortOrder: 4,
  },
  {
    id: 'nowsad-zahan-sathi',
    name: 'Mst. Nowsad Zahan Sathi',
    designation: 'Lecturer',
    department: 'Department of Pharmacy',
    email: 'sathi@pharmacy.uiu.ac.bd',
    profileDescription:
      'Mst. Nowsad Zahan Sathi is a Lecturer in the Department of Pharmacy at UIU.',
    education: [] as string[],
    positionHeld: ['Lecturer, Department of Pharmacy, UIU'],
    honors: [] as string[],
    researchInterests: ['Pharmaceutical Research'],
    researchProjects: [] as string[],
    publications: [] as string[],
    importantLinks: [] as { label: string; url: string }[],
    published: true,
    sortOrder: 5,
  },
]

async function main() {
  const hash = await bcrypt.hash('Admin@BRL2026!', 12)
  await db.admin.upsert({
    where: { email: 'admin@brl.uiu.ac.bd' },
    update: {},
    create: { email: 'admin@brl.uiu.ac.bd', passwordHash: hash },
  })
  console.log('Admin seeded: admin@brl.uiu.ac.bd')

  for (const item of newsItems) {
    await db.news.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    })
  }
  console.log(`Seeded ${newsItems.length} news items`)

  for (const f of facultyItems) {
    await db.faculty.upsert({
      where: { email: f.email },
      update: {},
      create: f,
    })
  }
  console.log(`Seeded ${facultyItems.length} faculty members`)
}

main()
  .then(() => console.log('Seed complete'))
  .catch(console.error)
  .finally(() => db.$disconnect())
