export interface Project {
  id: string;
  title: string;
  description: string;
  fullDetails?: string;
  image?: string;
}

export interface Equipment {
  id: string;
  name: string;
  origin: string;
  description: string;
  image: string;
}

export interface Collaboration {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export const projectsData: Project[] = [
  {
    id: "smart-hydrogel",
    title: "Smart Hydrogel",
    description: "Biocompatible self-healing hydrogel as promising anti-microbial and wound healing applications",
    fullDetails: "Chronic and acute wound management remains a significant clinical challenge due to the high risk of microbial infection, delayed tissue regeneration, and limitations of conventional wound dressings. This project aims to develop an advanced biocompatible self-healing hydrogel system with integrated antimicrobial functionality to address these challenges and improve therapeutic outcomes.\n\nThe proposed hydrogel is designed using biocompatible polymeric networks capable of autonomous self-repair through dynamic crosslinking mechanisms. This self-healing property enables the material to recover its structural integrity after mechanical damage, ensuring prolonged functionality and adaptability to dynamic wound environments. Such characteristics are particularly advantageous for maintaining continuous coverage and protection over irregular wound surfaces.\n\nTo enhance its clinical relevance, the hydrogel is engineered with inherent or incorporated antimicrobial agents to effectively inhibit the growth of pathogenic microorganisms. This reduces the risk of infection, a major barrier to efficient wound healing. Additionally, the hydrogel matrix is optimized to maintain a moist microenvironment, which is known to facilitate cell proliferation, migration, and extracellular matrix deposition which is a key processes in tissue regeneration.\n\nThe project also explores the physicochemical and biological properties of the hydrogel, including swelling behavior, mechanical strength, biodegradability, cytocompatibility, and antimicrobial efficacy. In vitro and, where applicable, in vivo evaluations are conducted to assess its performance in promoting wound closure and tissue repair.\n\nOverall, this research aims to provide a multifunctional wound dressing platform that combines self-healing capability, antimicrobial protection, and enhanced biocompatibility. The outcomes of this study are expected to contribute to the development of next-generation smart biomaterials for effective wound management and broader biomedical applications.",
    image: "https://images.pexels.com/photos/3825368/pexels-photo-3825368.jpeg"
  },
  {
    id: "gene-polymorphism",
    title: "Gene Polymorphism",
    description: "Role of VEGF Polymorphisms and Serum VEGF Level as Potential Biomarkers in Breast Cancer",
    fullDetails: "Breast cancer remains one of the leading causes of cancer-related morbidity and mortality among women worldwide, including in Bangladesh, where late diagnosis and limited access to personalized treatment strategies pose significant challenges. Early detection and reliable prognostic markers are therefore critical for improving patient outcomes. This study investigates the role of vascular endothelial growth factor (VEGF) gene polymorphisms and circulating serum VEGF levels as potential biomarkers for breast cancer susceptibility and progression in the Bangladeshi population.\n\nVEGF is a key regulator of angiogenesis, a fundamental process in tumor growth, invasion, and metastasis. Genetic variations (polymorphisms) in the VEGF gene may influence its expression and activity, thereby affecting an individual’s predisposition to cancer and disease severity. In parallel, elevated serum VEGF levels have been associated with enhanced tumor vascularization and poor clinical prognosis.\n\nThis case–control study is designed to evaluate the association between specific VEGF gene polymorphisms and breast cancer risk by comparing genotypic distributions between diagnosed patients and healthy controls. Additionally, quantitative analysis of serum VEGF levels is performed to assess its diagnostic and prognostic significance. The study further explores correlations between genetic variants, circulating VEGF concentrations, and clinicopathological parameters such as tumor stage, grade, and metastasis.\n\nMolecular techniques, including polymerase chain reaction (PCR)-based genotyping and enzyme-linked immunosorbent assay (ELISA), are employed for accurate detection and quantification. Statistical analyses are conducted to determine the strength of associations, evaluate risk factors, and identify potential predictive markers.\n\nThis research aims to establish VEGF polymorphisms and serum VEGF levels as minimally invasive, reliable biomarkers for early detection, risk assessment, and prognosis of breast cancer in the Bangladeshi population. The findings are expected to contribute to the advancement of precision medicine approaches and support the development of targeted therapeutic strategies tailored to population-specific genetic profiles.",
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg"
  },
  {
    id: "antimicrobial-gene-analysis",
    title: "Antimicrobial Gene Analysis",
    description: "Colistin Resistance and mcr-1/mcr-3 Gene Analysis in Urinary E. coli from a Tertiary Level Hospital",
    fullDetails: "The rapid emergence of antimicrobial resistance has become a critical global health concern, with multidrug-resistant bacterial infections posing a serious threat to effective clinical management. Of particular concern is resistance to colistin, a last-resort antibiotic used to treat severe infections caused by extensively drug-resistant Gram-negative bacteria. This study investigates the prevalence of colistin resistance and the distribution of plasmid-mediated mcr-1 and mcr-3 resistance genes in urinary isolates of Escherichia coli collected from a tertiary-level hospital setting.\n\nEscherichia coli is one of the most common causative agents of urinary tract infections (UTIs), and the increasing occurrence of resistant strains significantly complicates treatment strategies. The detection of mcr genes, which are transferable via plasmids, raises serious concerns due to their potential for rapid horizontal gene dissemination among bacterial populations.\n\nThis study employs a combination of phenotypic and molecular approaches to comprehensively assess colistin resistance. Antimicrobial susceptibility testing is performed to identify resistant isolates, while polymerase chain reaction (PCR)-based assays are used for the detection of mcr-1 and mcr-3 genes. Further analysis is conducted to evaluate the correlation between genotypic findings and resistance phenotypes, as well as their association with patient demographics and clinical characteristics.\n\nAdditionally, the study aims to determine the prevalence of these resistance determinants within the hospital environment, providing valuable insights into local antimicrobial resistance patterns. Understanding the distribution of plasmid-mediated colistin resistance genes is essential for implementing effective infection control measures and guiding antibiotic stewardship programs.\n\nOverall, this research seeks to highlight the growing threat of colistin resistance in uropathogenic E. coli and to establish molecular surveillance strategies for early detection and containment. The findings are expected to contribute to improved clinical decision-making, reinforce public health policies, and support global efforts to combat antimicrobial resistance.",
    image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg"
  },
  {
    id: "drug-discovery",
    title: "Drug Discovery",
    description: "In vitro and In vivo Biological Activities and In Silico Analysis of Diospyros malabarica Leaf Extract",
    fullDetails: "Medicinal plants continue to serve as a rich source of bioactive compounds with diverse therapeutic potential. Diospyros malabarica, a traditionally used medicinal plant, has gained attention for its wide range of pharmacological properties. This project aims to comprehensively evaluate the biological activities of Diospyros malabarica leaf extract through integrated in vitro, in vivo, and in silico approaches.\n\nThe in vitro component of the study focuses on assessing key biological activities such as antioxidant, antimicrobial, anti-inflammatory, and cytotoxic effects using established biochemical and cell-based assays. These experiments provide initial evidence of the extract’s pharmacological potential and help identify its bioactive properties at the molecular level.\n\nTo further validate these findings, in vivo studies are conducted using appropriate animal models to evaluate therapeutic efficacy, safety, and physiological effects. Parameters such as anti-inflammatory response, analgesic activity, and potential toxicity are examined to determine the extract’s suitability for biomedical applications.\n\nIn parallel, in silico analysis is performed to identify and characterize the active phytochemical constituents present in the leaf extract. Computational techniques, including molecular docking and pharmacokinetic prediction, are used to investigate the interaction between selected compounds and relevant biological targets. This approach provides mechanistic insights into the observed biological activities and supports the identification of potential lead compounds for drug development.\n\nThe integration of experimental and computational methods in this study offers a comprehensive understanding of the therapeutic potential of Diospyros malabarica. The findings are expected to contribute to the discovery of novel plant-based bioactive agents and support the development of safe, effective, and affordable therapeutic alternatives.",
    image: "https://images.pexels.com/photos/5439141/pexels-photo-5439141.jpeg"
  }
];




export const equipmentData: Equipment[] = [
  {
    id: "microcentrifuge",
    name: "Mini Microcentrifuge",
    origin: "Corning, USA",
    description: "Compact lab essential with an 8 x 1.5/2.0 mL tube capacity and fixed 6,000 RPM speed.",
    image: "https://images.pexels.com/photos/8442024/pexels-photo-8442024.jpeg"
  },
  {
    id: "freezer",
    name: "Ultra-Low Temp Freezer",
    origin: "Esco Lifesciences",
    description: "Reliable solution for long-term sample storage with a range of -50°C to -86°C.",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "thermal-cycler",
    name: "Bio-Rad T100 Thermal Cycler",
    origin: "USA",
    description: "Features an intuitive touch-screen interface and thermal gradient capability for efficient PCR applications.",
    image: "https://images.pexels.com/photos/8442024/pexels-photo-8442024.jpeg"
  },
  {
    id: "chemidoc",
    name: "Bio-Rad ChemiDoc MP",
    origin: "USA",
    description: "All-in-one solution for imaging and analyzing gels and western blots with high sensitivity.",
    image: "https://images.pexels.com/photos/8533016/pexels-photo-8533016.jpeg"
  },
  {
    id: "vortex-daihan",
    name: "DAIHAN MaXshake VM-30",
    origin: "Korea",
    description: "Multifunction vortex mixer with variable speed control up to 3,300rpm for efficient sample mixing.",
    image: "https://images.pexels.com/photos/8442024/pexels-photo-8442024.jpeg"
  },
  {
    id: "vortex-dlab",
    name: "DLAB MX-S Vortex Mixer",
    origin: "USA",
    description: "Variable speed mixer from 0 to 3,000 rpm for versatile laboratory mixing applications.",
    image: "https://images.pexels.com/photos/7108344/pexels-photo-7108344.jpeg"
  },
  {
    id: "humalyzer",
    name: "HumaLyzer 3000",
    origin: "Germany",
    description: "Semi-automated clinical chemistry analyzer known for reliability and efficiency.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "microscope",
    name: "Leica DM750",
    origin: "Germany",
    description: "Binocular microscope designed for educational and laboratory use.",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800"
  }
];

export const collaborationData: Collaboration[] = [
  {
    id: "icddrb",
    name: "icddr,b",
    description: "Strengthens research in infectious diseases, public health, and clinical studies through access to advanced facilities."
  },
  {
    id: "labaid",
    name: "LabAid Cancer Hospital",
    description: "Focuses on cancer-related research, including drug response, biomarker analysis, and therapeutic evaluation."
  },
  {
    id: "omega",
    name: "Omega Hospital",
    description: "Facilitates clinical and diagnostic research, allowing validation of laboratory findings in clinical settings."
  }
];

export const newsData: NewsItem[] = [
  {
    id: "cell-culture-workshop",
    title: "Cell Culture Training Workshop Held",
    date: "March 9, 2026",
    description: "A seminar and hands-on training on cell culture techniques was conducted, providing practical experience in aseptic handling and applications in infectious disease and biomedical research.",
    image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg"
  },
  {
    id: "presentation-session",
    title: "Biomedical Research Lab Presentation Session",
    date: "February 16, 2025",
    description: "Led by Dr. Tahmina Foyez, this session showcased ongoing research projects, student contributions, and future directions of the laboratory.",
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg"
  },
  {
    id: "community-pharmacy-webinar",
    title: "Career Webinar on Community Pharmacy",
    date: "December 13, 2025",
    description: "The first session of the Career Webinar Series focused on building a career as a community pharmacist, highlighting skills, opportunities, and professional pathways.",
    image: "https://images.pexels.com/photos/5910953/pexels-photo-5910953.jpeg"
  },
  {
    id: "wound-healing-remedy",
    title: "Seminar on Local Wound Healing Remedy",
    date: "December 08, 2024",
    description: "A seminar explored the development of cost-effective, locally sourced treatments for minor wound healing and their evaluation.",
    image: "https://images.pexels.com/photos/3825368/pexels-photo-3825368.jpeg"
  },
  {
    id: "pharmacist-day-2024",
    title: "World Pharmacist Day 2024 Celebrated",
    date: "September 28, 2024",
    description: "The department celebrated World Pharmacist Day under the theme 'Pharmacists: Meeting Global Health Needs,' recognizing the role of pharmacists in healthcare.",
    image: "https://images.pexels.com/photos/5439141/pexels-photo-5439141.jpeg"
  }
];

