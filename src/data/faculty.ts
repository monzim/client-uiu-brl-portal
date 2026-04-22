export interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  qualifications: {
    education: string[];
    positionHeld: string[];
    honors?: string[];
  };
  researchInterests: string[];
  profileDescription: string;
  image?: string;
  importantLinks: {
    label: string;
    url: string;
  }[];
  fullBio?: string;
  publications?: string[];
  research?: {
    general?: string;
    projects?: string[];
  };
  room?: string;
}

export const facultyData: Faculty[] = [
  {
    id: "tahmina-foyez",
    name: "Dr. Tahmina Foyez",
    designation: "Head & Professor",
    department: "Department of Pharmacy",
    email: "tahmina@pharmacy.uiu.ac.bd",
    room: "Room No 916, UIU",
    qualifications: {
      education: [
        "Doctor of Philosophy: Department of Molecular Biology, Graduate School of Medicine, Nagoya University, Nagoya, Japan",
        "Masters of Pharmacy: Department of Clinical Pharmacy & Pharmacology, University of Dhaka, Dhaka, Bangladesh",
        "Bachelor of Pharmacy: Department of Pharmacy, University of Dhaka, Dhaka, Bangladesh"
      ],
      positionHeld: [
        "Professor & Head, Department of Pharmacy, UIU"
      ],
      honors: []
    },
    researchInterests: [
      "Venous thromboembolism",
      "Glycoprotein",
      "Sugar chain",
      "Sulfotransferases enzymes",
      "Neurodegenerative diseases",
      "Nanomedicine"
    ],
    profileDescription: "Dr. Foyez leads cutting-edge initiatives in pharmaceutical education, integrating modern laboratory facilities and interdisciplinary research approaches. Under her leadership, the department emphasizes industry collaboration, hospital training, and innovation-driven research aimed at improving healthcare outcomes.",
    image: "https://images.pexels.com/photos/5214995/pexels-photo-5214995.jpeg",
    fullBio: "Dr. Foyez leads cutting-edge initiatives in pharmaceutical education, integrating modern laboratory facilities and interdisciplinary research approaches. Under her leadership, the department emphasizes industry collaboration, hospital training, and innovation-driven research aimed at improving healthcare outcomes. Dr. Tahmina worked with Professor Rafal Pawlinski as a Postdoctoral Research Associate in the Department of Hematology, Blood Research Center, School of Medicine at the University of North Carolina at Chapel Hill, USA in 2022. She actively worked on Women Leaders Program to Promote Well-being in Asia from Nagoya University, Nagoya, Japan during December 2013-September 2014. She has published extensively in many high-impact journals and publishers, including Nature Publishing Group, Wiley, Springer, RSC Advances, Taylor and Francis Group, ACS Omega, Proceedings of the National Academy of Sciences, The American Journal of Pathology, Journal of Histochemistry & Cytochemistry and others. Her current research interests are focused on Sickle cell Disease, Venous thromboembolism, Glycoprotein, Sugar chain, Sulfotransferases enzymes, Neurodegenerative diseases, Nanomedicine.",
    publications: [],
    research: {
      general: "Dr. Foyez leads cutting-edge initiatives in pharmaceutical education, integrating modern laboratory facilities and interdisciplinary research approaches.",
      projects: ["HEAT Project", "Smart Hydrogel"]
    },
    importantLinks: [
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=jIkyvfwAAAAJ&hl=en" },
      { label: "Research Gate", url: "https://www.researchgate.net/profile/Tahmina-Foyez" },
      { label: "UIU Profile", url: "https://pharmacy.uiu.ac.bd/faculty/foyez-tahmina/" }
    ]
  },
  {
    id: "sabiha-tasnim",
    name: "Sabiha Tasnim",
    designation: "Assistant Professor",
    department: "Department of Pharmacy",
    email: "sabiha@pharmacy.uiu.ac.bd",
    qualifications: {
      education: [
        "B.Pharm (Hons.), University of Dhaka",
        "M.Pharm, Pharmaceutical Chemistry, University of Dhaka"
      ],
      positionHeld: [
        "Assistant Professor, Department of Pharmacy, UIU"
      ]
    },
    researchInterests: [
      "Organic synthesis and analytical chemistry",
      "Computer-aided drug design (CADD)",
      "Natural product research",
      "Molecular biology"
    ],
    profileDescription: "Ms. Sabiha Tasnim is an emerging academic and researcher with a strong background in pharmaceutical chemistry and industry experience in leading pharmaceutical companies.",
    image: "https://images.pexels.com/photos/5439130/pexels-photo-5439130.jpeg",
    fullBio: "Ms. Tasnim combines academic expertise with practical industry experience from organizations such as ACME Laboratories and Incepta Pharmaceuticals. Her research focuses on integrating computational drug design with experimental chemistry, contributing to innovative therapeutic development. She started her career with The ACME Laboratories Ltd as a Brand Executive in the Strategic Brand Management Department of its Marketing division in February 2021 and in November 2021, she joined Incepta Pharmaceuticals Ltd. as an Executive in the International Marketing Department until December 2022. Then she started her academic career in the Department of Pharmacy, University of Asia Pacific as a Lecturer from January 2023-June 2023. Currently she is working as a Lecturer in the Department of Pharmacy, United International University and is associated with various research projects & publications. She has received scholarship from Ministry of Education for outstanding academic achievement in her honour’s and received the NST Fellowship for her thesis research in Master’s program.",
    importantLinks: [
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=6uKdPI8AAAAJ&hl=en" },
      { label: "Research Gate", url: "https://www.researchgate.net/profile/Sabiha-Tasnim-2" }
    ]
  },
  {
    id: "sharmin-ahmed-rakhi",
    name: "Sharmin Ahmed Rakhi",
    designation: "Assistant Professor",
    department: "Department of Pharmacy",
    email: "sharmin@pharmacy.uiu.ac.bd",
    qualifications: {
      education: [
        "M. Pharm. (2018-19), Department of Pharmaceutical Chemistry, University of Dhaka (3rd Position)",
        "B. Pharm. (2014-2018), Department of Pharmacy, University of Dhaka (5th position)"
      ],
      positionHeld: [
        "Assistant Professor, Department of Pharmacy, UIU"
      ]
    },
    researchInterests: [
      "Phytochemistry and natural product research",
      "Drug design and synthetic chemistry",
      "Molecular biology and docking",
      "Nanoparticle drug delivery"
    ],
    profileDescription: "Ms. Sharmin Ahmed Rakhi is a promising researcher in pharmaceutical chemistry with a strong academic record and growing publication portfolio.",
    image: "https://images.pexels.com/photos/5439141/pexels-photo-5439141.jpeg",
    fullBio: "Sharmin Ahmed Rakhi obtained her B. Pharm (Hons.) from the Department of Pharmacy, University of Dhaka in the year 2018 with 5th position and M. Pharm from the Department of Pharmaceutical Chemistry, University of Dhaka in the year 2019 with 3rd position. She started her career with Incepta Pharmaceuticals Ltd as a Brand Executive in the Marketing Strategic Department and then in July 2023 she joined the Department of Pharmacy, United International University as a Lecturer. She had carried out her master’s thesis on Phytochemical and biological investigation on Crinum asiaticum. Her research interests include organic synthesis, molecular biology, nanoparticle drug delivery etc. She has received the Govt. scholarship from Ministry of Education for outstanding academic achievement in her B. Pharm. and received the NST scholarship for her thesis research in master’s program.",
    importantLinks: [
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=n9n1mt0AAAAJ&hl=en" },
      { label: "Research Gate", url: "https://www.researchgate.net/profile/Sharmin-Ahmed-Rakhi" }
    ]
  },
  {
    id: "ferdous-ul-haque-joy",
    name: "Ferdous-Ul-Haque Joy",
    designation: "Lecturer",
    department: "Department of Pharmacy",
    email: "ferdous@pharmacy.uiu.ac.bd",
    qualifications: {
      education: [
        "Master in Pharmacy (M. Pharm.), Department of Clinical Pharmacy & Pharmacology, University of Dhaka",
        "Bachelor in Professional Pharmacy (B.Pharm.), Department of Pharmacy, University of Dhaka"
      ],
      positionHeld: [
        "Lecturer, Department of Pharmacy, UIU"
      ]
    },
    researchInterests: [
      "Pharmacology",
      "Biochemistry",
      "Cell Biology",
      "Molecular biology"
    ],
    profileDescription: "Mr. Ferdous-Ul-Haque Joy is a young academic engaged in teaching and early-stage research in pharmaceutical sciences.",
    image: "https://images.pexels.com/photos/3825368/pexels-photo-3825368.jpeg",
    fullBio: "Mr. Ferdous-Ul-Haque Joy is currently serving as Lecturer in the Department of Pharmacy at United International University. He obtained his Bachelor of Pharmacy (Professional, Hons.) degree from the Department of Pharmacy, University of Dhaka, in 2019 and completed his Master of Pharmacy from the Department of Clinical Pharmacy & Pharmacology, University of Dhaka, in 2020, securing 2nd position. He began his professional career in March 2020 as an Executive in the Product Management Department (Oncology Marketing Division) at Beacon Pharmaceuticals Ltd. Transitioning into academia, he joined Atish Dipankar University of Science & Technology as a Lecturer in the Department of Pharmacy, serving from February 2022 to July 2023. He then worked in the same role at the State University of Bangladesh from August 2023 to December 2023. In February 2025, he joined United International University as a Lecturer. For his master’s thesis, he conducted research on the correlation between antibiotic resistance patterns and the presence of yhiU, yhiV, mdfA, and marA efflux pump genes in Escherichia coli samples collected from a tertiary-level hospital in Bangladesh.",
    importantLinks: [
      { label: "Email", url: "mailto:ferdous@pharmacy.uiu.ac.bd" }
    ]
  },
  {
    id: "rajib-das",
    name: "Rajib Das",
    designation: "Lecturer",
    department: "Department of Pharmacy",
    email: "rajibdas@pharmacy.uiu.ac.bd",
    qualifications: {
      education: [
        "Master in Pharmacy (M. Pharm.), Department of Clinical Pharmacy & Pharmacology, University of Dhaka",
        "Bachelor in Professional Pharmacy (B.Pharm.), Department of Pharmacy, University of Dhaka"
      ],
      positionHeld: [
        "Lecturer, Department of Pharmacy, UIU"
      ]
    },
    researchInterests: [
      "Clinical Pharmacology",
      "Molecular pharmaco genetics",
      "Molecular Biology",
      "Drug Discovery"
    ],
    profileDescription: "Mr. Rajib Das is an academic professional contributing to both teaching and research in the Department of Pharmacy at UIU.",
    image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg",
    fullBio: "Rajib Das is currently serving as a Lecturer in the Department of Pharmacy at United International University (UIU). He obtained his Bachelor of Professional Pharmacy (B. Pharm) from Department of Pharmacy and Master of Pharmacy (M. Pharm) degrees from Department of Clinical Pharmacy and Pharmacology, University of Dhaka, securing 1st position in his B. Pharm program and 3rd position in M. Pharm. His research interests lie in pharmacology, drug discovery from medicinal plants, molecular pharmacogenetics, and clinical pharmacy. Rajib has contributed to several peer-reviewed publications in reputed journals, including Heliyon, Food Additives & Contaminants, Biomedical Research International, Journal of Ethnopharmacology, and Chemico-Biological Interactions. He has also co-authored a book chapter on ethnopharmacology. He has actively presented his research at both national and international scientific conferences. For his outstanding academic performance, he has been honored with several prestigious awards, including the Jagannath Hall Merit Award 2025, the Bangabandhu Scholar Award 2023, and the National Science and Technology Fellowship 2023. Beyond his academic and research achievements, Rajib has actively contributed to leadership and extracurricular activities, serving as Vice-President of the Dhaka University Debating Society, President of the Dhaka University Pharma Club, President of Rotaract Club of Dhaka University and President of the Jagannath Hall Debating Club",
    importantLinks: [
      { label: "Email", url: "mailto:rajibdas@pharmacy.uiu.ac.bd" }
    ]
  },
  {
    id: "mst-nowsad-zahan-sathi",
    name: "Mst. Nowsad Zahan Sathi",
    designation: "Lecturer",
    department: "Department of Pharmacy",
    email: "nowsad@pharmacy.uiu.ac.bd",
    qualifications: {
      education: [
        "Masters in Pharmacy (M. Pharm.), Department of Pharmaceutical Chemistry, University of Dhaka",
        "Bachelor in Professional Pharmacy (B.Pharm.), Department of Pharmacy, University of Dhaka"
      ],
      positionHeld: [
        "Lecturer, Department of Pharmacy, UIU"
      ]
    },
    researchInterests: [
      "Endophytic Fungi",
      "Organic synthesis & analytical chemistry",
      "Natural product research",
      "Ethnopharmacology",
      "Computer aided drug design (CADD)",
      "Molecular biology"
    ],
    profileDescription: "Ms. Mst. Nowsad Zahan Sathi is an early-career academic actively contributing to pharmaceutical education and research.",
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg",
    fullBio: "Mst. Nowsad Zahan Sathi obtained her Bachelor of Professional Pharmacy (B. Pharm) from Department of Pharmacy and Master of Pharmacy (M. Pharm) degrees from Department of Pharmaceutical Chemistry, University of Dhaka securing 3rd position. She started her career as a lecturer in the Department of Pharmacy of Stamford University Bangladesh, serving from January 2025 to December 2025. She joined as a lecturer in United International University in January 2026. She had carried out her master’s thesis on Isolation and biological evaluation of the secondary metabolites from an endophytic fungus associated with Trigonella foenum-graecum. Her research interests include endophytic fungi, organic synthesis, drug discovery from medicinal plants, pharmacogenomics, ethnopharmacology. Throughout her academic journey, she has been recognized with several prestigious scholarships, such as the Academic Scholarship, the NST Fellowship awarded by the Ministry of Education, and the Education Board Scholarship.",
    importantLinks: [
      { label: "Email", url: "mailto:nowsad@pharmacy.uiu.ac.bd" }
    ]
  }
];

export const assistantData = [
  { id: '1', name: 'Shadid Talukder', designation: 'Research Assistant', image: 'https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg' },
  { id: '2', name: 'Janita Islam Jarin', designation: 'Research Assistant', image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg' },
];
