export interface Project {
  id: string
  title: string
  description: string
  fullDetails?: string
  image?: string
}

export interface Equipment {
  id: string
  name: string
  origin: string
  description: string
  image: string
}

export interface Collaboration {
  id: string
  name: string
  description: string
  logoUrl?: string
}

export interface NewsItem {
  id: string
  title: string
  date: string
  description: string
  image?: string
}

export interface AboutData {
  intro: string
  aim: string
  objectives: string[]
  vision: string
  mission: string[]
  location: {
    address: string
    mapUrl: string
    contact: string
    importantContact: string
  }
}

export const projectsData: Project[] = [
  {
    id: 'smart-hydrogel',
    title: 'Smart Hydrogel',
    description:
      'Biocompatible self-healing hydrogel as promising anti-microbial and wound healing applications',
    fullDetails:
      'Chronic and acute wound management remains a significant clinical challenge due to the high risk of microbial infection, delayed tissue regeneration, and limitations of conventional wound dressings. This project aims to develop an advanced biocompatible self-healing hydrogel system with integrated antimicrobial functionality to address these challenges and improve therapeutic outcomes.\n\nThe proposed hydrogel is designed using biocompatible polymeric networks capable of autonomous self-repair through dynamic crosslinking mechanisms. This self-healing property enables the material to recover its structural integrity after mechanical damage, ensuring prolonged functionality and adaptability to dynamic wound environments. Such characteristics are particularly advantageous for maintaining continuous coverage and protection over irregular wound surfaces.\n\nTo enhance its clinical relevance, the hydrogel is engineered with inherent or incorporated antimicrobial agents to effectively inhibit the growth of pathogenic microorganisms. This reduces the risk of infection, a major barrier to efficient wound healing. Additionally, the hydrogel matrix is optimized to maintain a moist microenvironment, which is known to facilitate cell proliferation, migration, and extracellular matrix deposition which is a key processes in tissue regeneration.\n\nThe project also explores the physicochemical and biological properties of the hydrogel, including swelling behavior, mechanical strength, biodegradability, cytocompatibility, and antimicrobial efficacy. In vitro and, where applicable, in vivo evaluations are conducted to assess its performance in promoting wound closure and tissue repair.\n\nOverall, this research aims to provide a multifunctional wound dressing platform that combines self-healing capability, antimicrobial protection, and enhanced biocompatibility. The outcomes of this study are expected to contribute to the development of next-generation smart biomaterials for effective wound management and broader biomedical applications.',
    image: '/current_project_images/Hydrogel.webp',
  },
  {
    id: 'gene-polymorphism',
    title: 'Gene Polymorphism',
    description:
      'Role of VEGF Polymorphisms and Serum VEGF Level as Potential Biomarkers in Breast Cancer',
    fullDetails:
      'Breast cancer remains one of the leading causes of cancer-related morbidity and mortality among women worldwide, including in Bangladesh, where late diagnosis and limited access to personalized treatment strategies pose significant challenges. Early detection and reliable prognostic markers are therefore critical for improving patient outcomes. This study investigates the role of vascular endothelial growth factor (VEGF) gene polymorphisms and circulating serum VEGF levels as potential biomarkers for breast cancer susceptibility and progression in the Bangladeshi population.\n\nVEGF is a key regulator of angiogenesis, a fundamental process in tumor growth, invasion, and metastasis. Genetic variations (polymorphisms) in the VEGF gene may influence its expression and activity, thereby affecting an individual’s predisposition to cancer and disease severity. In parallel, elevated serum VEGF levels have been associated with enhanced tumor vascularization and poor clinical prognosis.\n\nThis case–control study is designed to evaluate the association between specific VEGF gene polymorphisms and breast cancer risk by comparing genotypic distributions between diagnosed patients and healthy controls. Additionally, quantitative analysis of serum VEGF levels is performed to assess its diagnostic and prognostic significance. The study further explores correlations between genetic variants, circulating VEGF concentrations, and clinicopathological parameters such as tumor stage, grade, and metastasis.\n\nMolecular techniques, including polymerase chain reaction (PCR)-based genotyping and enzyme-linked immunosorbent assay (ELISA), are employed for accurate detection and quantification. Statistical analyses are conducted to determine the strength of associations, evaluate risk factors, and identify potential predictive markers.\n\nThis research aims to establish VEGF polymorphisms and serum VEGF levels as minimally invasive, reliable biomarkers for early detection, risk assessment, and prognosis of breast cancer in the Bangladeshi population. The findings are expected to contribute to the advancement of precision medicine approaches and support the development of targeted therapeutic strategies tailored to population-specific genetic profiles.',
    image: '/current_project_images/Gene Polymorphism.webp',
  },
  {
    id: 'antimicrobial-gene-analysis',
    title: 'Antimicrobial Gene Analysis',
    description:
      'Colistin Resistance and mcr-1/mcr-3 Gene Analysis in Urinary E. coli from a Tertiary Level Hospital',
    fullDetails:
      'The rapid emergence of antimicrobial resistance has become a critical global health concern, with multidrug-resistant bacterial infections posing a serious threat to effective clinical management. Of particular concern is resistance to colistin, a last-resort antibiotic used to treat severe infections caused by extensively drug-resistant Gram-negative bacteria. This study investigates the prevalence of colistin resistance and the distribution of plasmid-mediated mcr-1 and mcr-3 resistance genes in urinary isolates of Escherichia coli collected from a tertiary-level hospital setting.\n\nEscherichia coli is one of the most common causative agents of urinary tract infections (UTIs), and the increasing occurrence of resistant strains significantly complicates treatment strategies. The detection of mcr genes, which are transferable via plasmids, raises serious concerns due to their potential for rapid horizontal gene dissemination among bacterial populations.\n\nThis study employs a combination of phenotypic and molecular approaches to comprehensively assess colistin resistance. Antimicrobial susceptibility testing is performed to identify resistant isolates, while polymerase chain reaction (PCR)-based assays are used for the detection of mcr-1 and mcr-3 genes. Further analysis is conducted to evaluate the correlation between genotypic findings and resistance phenotypes, as well as their association with patient demographics and clinical characteristics.\n\nAdditionally, the study aims to determine the prevalence of these resistance determinants within the hospital environment, providing valuable insights into local antimicrobial resistance patterns. Understanding the distribution of plasmid-mediated colistin resistance genes is essential for implementing effective infection control measures and guiding antibiotic stewardship programs.\n\nOverall, this research seeks to highlight the growing threat of colistin resistance in uropathogenic E. coli and to establish molecular surveillance strategies for early detection and containment. The findings are expected to contribute to improved clinical decision-making, reinforce public health policies, and support global efforts to combat antimicrobial resistance.',
    image: '/current_project_images/Antimicrobial Resistance.webp',
  },
  {
    id: 'drug-discovery',
    title: 'Drug Discovery',
    description:
      'In vitro and In vivo Biological Activities and In Silico Analysis of Diospyros malabarica Leaf Extract',
    fullDetails:
      'Medicinal plants continue to serve as a rich source of bioactive compounds with diverse therapeutic potential. Diospyros malabarica, a traditionally used medicinal plant, has gained attention for its wide range of pharmacological properties. This project aims to comprehensively evaluate the biological activities of Diospyros malabarica leaf extract through integrated in vitro, in vivo, and in silico approaches.\n\nThe in vitro component of the study focuses on assessing key biological activities such as antioxidant, antimicrobial, anti-inflammatory, and cytotoxic effects using established biochemical and cell-based assays. These experiments provide initial evidence of the extract’s pharmacological potential and help identify its bioactive properties at the molecular level.\n\nTo further validate these findings, in vivo studies are conducted using appropriate animal models to evaluate therapeutic efficacy, safety, and physiological effects. Parameters such as anti-inflammatory response, analgesic activity, and potential toxicity are examined to determine the extract’s suitability for biomedical applications.\n\nIn parallel, in silico analysis is performed to identify and characterize the active phytochemical constituents present in the leaf extract. Computational techniques, including molecular docking and pharmacokinetic prediction, are used to investigate the interaction between selected compounds and relevant biological targets. This approach provides mechanistic insights into the observed biological activities and supports the identification of potential lead compounds for drug development.\n\nThe integration of experimental and computational methods in this study offers a comprehensive understanding of the therapeutic potential of Diospyros malabarica. The findings are expected to contribute to the discovery of novel plant-based bioactive agents and support the development of safe, effective, and affordable therapeutic alternatives.',
    image: '/current_project_images/Drug discovery.webp',
  },
]

export const equipmentData: Equipment[] = [
  {
    id: 'inverted-microscope',
    name: 'Inverted Microscope',
    origin: 'Japan',
    description:
      'The Nikon Eclipse Ts2 inverted microscope, originating from Japan, provides brilliantly clear images for efficient cell culture observation using its LED illumination system.',
    image: '/equipment/fluorescence-microscope.webp',
  },{
    id: 'co2-incubator',
    name: 'CO2 Incubator',
    origin: 'Singapore',
    description:
      'The Esco CelCulture CO2 Incubator, originating from Singapore-based Esco Lifesciences, features an ISOCIDE antimicrobial coating and a high-performance infrared (IR) CO2 sensor for precise environmental control and contamination minimization.',
    image: '/equipment/incubator.webp',
  },{
    id: 'safety-cabinet',
    name: 'Biological Safety Cabinet',
    origin: 'Singapore',
    description:
      'The Labcu Class II Biological Safety Cabinet, originating from an international manufacturer, provides essential personnel, product, and environmental protection using a HEPA filter system for microbiological research.',
    image: '/equipment/biosafety-cabinet.webp',
  },{
    id: 'freezer',
    name: 'Ultra-Low Temperature Freezer',
    origin: 'Singapore',
    description:
      'The Esco Lexicon II Ultra-Low Temperature Freezer is a reliable solution for long-term sample storage, originating from Esco Lifesciences, and features a temperature range of -50°C to -86°C with superior insulation.',
    image: '/equipment/-80-freezer.webp',
  },{
    id: 'thermal-cycler',
    name: 'T100 Thermal Cycler',
    origin: 'USA',
    description:
      'The Bio-Rad T100 Thermal Cycler, manufactured by the US-based company Bio-Rad, is a compact and reliable instrument featuring an intuitive touch-screen interface and thermal gradient capability for efficient PCR applications.',
    image: '/equipment/pcr-machine.webp',
  },{
    id: 'chemidoc',
    name: 'ChemiDoc MP Imaging System',
    origin: 'USA',
    description:
      'The Bio-Rad ChemiDoc MP Imaging System, originating from the US, is an all-in-one solution for imaging and analyzing gels and western blots.',
    image: '/equipment/chemidoc.webp',
  },{
    id: 'protean-tetra',
    name: 'Mini-PROTEAN Tetra System',
    origin: 'USA',
    description:
      'The Bio-Rad Mini-PROTEAN Tetra system is a vertical gel electrophoresis unit from Bio-Rad that allows for the separation of proteins or DNA with the key feature of running up to four mini gels simultaneously.',
    image: '/equipment/western-blotting.webp',
  },{
    id: 'nanodrop',
    name: 'NanoDrop One',
    origin: 'USA',
    description:
      'The Thermo Scientific NanoDrop One microvolume UV-Vis spectrophotometer provides accurate quantification of DNA, RNA, and proteins using only 1-2 µL of sample without the need for dilution.',
    image: '/equipment/nano-drop.webp',
  },
  {
    id: 'mini-microcentrifuge',
    name: 'Mini Microcentrifuge',
    origin: 'USA',
    description:
      'The Corning LSE Mini Microcentrifuge (Model: 6770), originating from Corning, is a compact lab essential with an 8 x 1.5/2.0 mL tube capacity and a key feature of a fixed 6,000 RPM speed for rapid microfiltration and spin-downs.',
    image: '/equipment/spinner.webp',
  },
  
  {
    id: 'humalyzer',
    name: 'HumaLyzer 3000',
    origin: 'Germany',
    description:
      'The HumaLyzer 3000 is a German-made semi-automated clinical chemistry analyzer known for its reliability and ability to measure a wide range of clinical parameters efficiently.',
    image: '/equipment/humalizer.jpg',
  },
  {
    id: 'microscope',
    name: 'Microscope',
    origin: 'Germany',
    description:
      'The Leica DM750 is a German-engineered binocular microscope designed for educational and laboratory use, featuring an integrated handle and cord wrap for easy transport and storage.',
    image: '/equipment/microscope.webp',
  },
  {
    id: 'centrifuge-machine',
    name: 'Centrifuge Machine',
    origin: 'Japan',
    description:
      'The Kubota Model 3520 is a compact tabletop micro refrigerated centrifuge made in Japan, ideal for processing various microtubes.',
    image: '/equipment/centrifuge.webp',
  },
  
  
  
  
  {
    id: 'vortex-daihan',
    name: 'DAIHAN MaXshake VM-30',
    origin: 'Korea',
    description:
      'The DAIHAN Scientific MaXshake VM-30 from Korea is a multifunction vortex mixer with variable speed control up to 3,300rpm for efficient sample mixing.',
    image: '/equipment/shaker.webp',
  },
  {
    id: 'dlab-mx-s',
    name: 'DLAB MX-S',
    origin: 'USA',
    description:
      'The DLAB MX-S variable speed vortex mixer, originating from the USA, provides a key feature of variable speed from 0 to 3,000 rpm for versatile mixing applications.',
    image: '/equipment/vortex.webp',
  },
  {
    id: 'centrifuge-2',
    name: 'Centrifuge S300TR',
    origin: '',
    description: 'Centrifuge S300TR is a Japanese-made laboratory centrifuge from KUBOTA, designed for efficient separation of biological and laboratory samples through high-speed centrifugal force.',
    image: '/equipment/centrifuge-1.webp',
  },
  {
    id: 'drier',
    name: 'Taisite FCO-65D Blast Drying Oven',
    origin: '',
    description: 'Taisite FCO-65D Blast Drying Oven is a 65-L laboratory drying oven with forced-air convection, designed for efficient and uniform drying and heat treatment of laboratory samples, with a temperature range of RT + 10°C to 300°C.',
    image: '/equipment/drier.webp',
  },
  {
    id: 'dry-bath',
    name: 'ONiLAB HB120-S Dry Bath',
    origin: '',
    description: 'ONiLAB HB120-S Dry Bath is a laboratory heating block designed for precise and uniform heating of samples, with a temperature range of room temperature to 120°C, LED digital temperature/timer display, and interchangeable aluminum heating blocks for various tube and microplate formats. ',
    image: '/equipment/dry-bath.webp',
  },
  {
    id: 'microplate-reader',
    name: 'Agilent BioTek 800 TS',
    origin: 'USA',
    description: 'Agilent BioTek 800 TS is a USA-made absorbance microplate reader designed for ELISA, protein quantification, enzyme kinetics, and cell-based assays, supporting 6- to 384-well plates with reliable absorbance measurement and touchscreen operation.',
    image: '/equipment/microplate-reader.webp',
  },
  {
    id: 'precision-balance',
    name: 'Precision Balance',
    origin: 'Germany',
    description: 'Sartorius Entris® II BCE224-1S is a German-made analytical balance with a 220 g maximum capacity and 0.1 mg readability, designed for highly precise routine weighing in laboratory applications, featuring external calibration and a typical stabilization time of ≤1.5 seconds.',
    image: '/equipment/precision-balance.webp',
  },
]

export const collaborationData: Collaboration[] = [
  {
    id: 'icddrb',
    name: 'icddr,b',
    description:
      'Strengthens research in infectious diseases, public health, and clinical studies through access to advanced facilities.',
  },
  {
    id: 'labaid',
    name: 'LabAid Cancer Hospital',
    description:
      'Focuses on cancer-related research, including drug response, biomarker analysis, and therapeutic evaluation.',
  },
  {
    id: 'omega',
    name: 'Omega Hospital',
    description:
      'Facilitates clinical and diagnostic research, allowing validation of laboratory findings in clinical settings.',
  },
]

export const newsData: NewsItem[] = [
  {
    id: 'cell-culture-workshop',
    title: 'Cell Culture Training Workshop Held',
    date: 'March 9, 2026',
    description:
      'A seminar and hands-on training on cell culture techniques was conducted, providing practical experience in aseptic handling and applications in infectious disease and biomedical research.',
    image: '/work_picture/Cell Culture.webp',
  },
  {
    id: 'presentation-session',
    title: 'Biomedical Research Lab Presentation Session',
    date: 'February 16, 2025',
    description:
      'Led by Dr. Tahmina Foyez, this session showcased ongoing research projects, student contributions, and future directions of the laboratory.',
    image: '/work_picture/Team.webp',
  },
  {
    id: 'community-pharmacy-webinar',
    title: 'Career Webinar on Community Pharmacy',
    date: 'December 13, 2025',
    description:
      'The first session of the Career Webinar Series focused on building a career as a community pharmacist, highlighting skills, opportunities, and professional pathways.',
    image: '/images/hero1.webp',
  },
  {
    id: 'wound-healing-remedy',
    title: 'Seminar on Local Wound Healing Remedy',
    date: 'December 08, 2024',
    description:
      'A seminar explored the development of cost-effective, locally sourced treatments for minor wound healing and their evaluation.',
    image: '/work_picture/Smart hydrogel for wound healing.webp',
  },
  {
    id: 'pharmacist-day-2024',
    title: 'World Pharmacist Day 2024 Celebrated',
    date: 'September 28, 2024',
    description:
      "The department celebrated World Pharmacist Day under the theme 'Pharmacists: Meeting Global Health Needs,' recognizing the role of pharmacists in healthcare.",
    image: '/images/hero2.webp',
  },
]

export const aboutData: AboutData = {
  intro:
    'The Biomedical Research Laboratory of the Department of Pharmacy at United International University (UIU) is dedicated to advancing scientific knowledge in the field of pharmaceutical and biomedical sciences. Our laboratory serves as a dynamic platform for innovative research, academic excellence, and collaborative learning.\n\nWe focus on addressing critical healthcare challenges through experimental research, modern analytical techniques, and interdisciplinary approaches. Our work bridges the gap between basic science and clinical applications, aiming to improve human health and therapeutic outcomes.',
  aim: 'The primary aim of our laboratory is to conduct high-quality research in biomedical and pharmaceutical sciences that contributes to the development of effective, safe, and innovative healthcare solutions.',
  objectives: [
    'To promote cutting-edge research in pharmaceutical and biomedical fields',
    'To develop novel drug delivery systems, including hydrogels and nanomaterials',
    'To investigate disease mechanisms at cellular and molecular levels',
    'To evaluate antioxidant, antimicrobial, and therapeutic activities of new compounds',
    'To train students in modern laboratory techniques such as HPLC, cell culture, and molecular biology',
    'To encourage collaboration with national and international research institutions',
    'To publish findings in high-impact scientific journals',
  ],
  vision:
    'To become a leading biomedical research center in Bangladesh and internationally recognized for innovation, quality research, and scientific contribution.',
  mission: [
    'To generate impactful research that addresses real-world health problems',
    'To develop skilled researchers and future scientists',
    'To contribute to the advancement of pharmaceutical sciences',
  ],
  location: {
    address:
      'Biomedical Research Laboratory (Room 907), Department of Pharmacy, United International University, United City, Madani Ave, Dhaka 1212, Bangladesh',
    mapUrl: 'https://maps.app.goo.gl/tBo1emmv9x7zH2Rf6',
    contact: 'tahmina@pharmacy.uiu.ac.bd, ferdowsy@admin.uiu.ac.bd',
    importantContact: '09604 848848 (Extension: 5500)',
  },
}

export interface ResearchArea {
  title: string
  description: string
}

export const researchAreasData: ResearchArea[] = [
  {
    title: 'Cell Culture',
    description:
      'Cell culture research involves the growth and maintenance of cells under controlled laboratory conditions. This area is essential for studying cellular behavior, drug responses, toxicity, and disease mechanisms. Our laboratory utilizes cell culture techniques to evaluate the effectiveness and safety of pharmaceutical formulations, including hydrogels and nanoparticles.',
  },
  {
    title: 'Wound Healing',
    description:
      'Wound healing research focuses on developing and evaluating materials and therapies that enhance tissue repair and regeneration. Our work includes studying hydrogel-based systems, antimicrobial dressings, and bioactive compounds that accelerate healing, reduce infection, and improve tissue recovery.',
  },
  {
    title: 'Gene Polymorphism',
    description:
      'Gene polymorphism research examines variations in DNA sequences and their impact on disease susceptibility, drug response, and therapeutic outcomes. This area helps in understanding personalized medicine and identifying genetic factors involved in various diseases.',
  },
  {
    title: 'Antimicrobial Resistance Gene',
    description:
      'Antimicrobial resistance (AMR) is a growing global health concern. Our research focuses on identifying resistant microbial strains and evaluating new antimicrobial agents, natural extracts, and advanced formulations to combat resistant infections effectively.',
  },
]

export interface Partnership {
  name: string
  description: string
  logoUrl?: string
}

export const partnershipsIntro =
  'The Biomedical Research Laboratory at the Department of Pharmacy, United International University (UIU), actively collaborates with leading healthcare and research institutions to enhance the quality, impact, and translational value of our research. These partnerships enable knowledge exchange, access to advanced facilities, and the opportunity to work on real-world clinical challenges.'

export const partnershipsData: Partnership[] = [
  {
    name: 'International Centre for Diarrhoeal Disease Research (icddr,b), Bangladesh',
    logoUrl: '/images/icddrb-logo.png',
    description:
      'Our partnership with the International Centre for Diarrhoeal Disease Research, Bangladesh (icddr,b) significantly enhances our research capabilities, particularly in the areas of infectious diseases, public health, and clinical investigation. Through this collaboration, we benefit from access to state-of-the-art cell culture facilities, advanced research infrastructure, and the expertise of leading scientists. This strategic alliance enables us to conduct high-quality biomedical research supported by robust datasets and innovative methodologies. Furthermore, our joint research initiatives are aligned with addressing critical health challenges in Bangladesh and contribute to generating impactful, globally relevant scientific outcomes.',
  },
  {
    name: 'LabAid Cancer Hospital, Dhanmondi',
    logoUrl: '/images/labaid-logo.png',
    description:
      'In collaboration with LabAid Cancer Hospital, our laboratory advances research in oncology with a focus on drug response analysis, biomarker discovery, and therapeutic evaluation. This partnership bridges laboratory research with clinical practice, enabling a strong translational research framework. A key strength of this collaboration is access to clinically relevant cancer patient samples, which facilitates robust experimental validation and enhances the reliability of our findings. The integration of clinical insights with laboratory investigations supports the development of improved diagnostic tools and more effective treatment strategies. Through this collaboration, we aim to contribute to evidence-based cancer research and improve patient outcomes both in Bangladesh and beyond.',
  },
  {
    name: 'Omega Hospital',
    description:
      'In collaboration with Omega Hospital, our laboratory expands its scope in clinical and diagnostic research, fostering a strong connection between experimental findings and real-world medical practice. This partnership enables the validation of laboratory results within clinical settings, ensuring greater translational relevance. Through this collaboration, we conduct studies focused on disease mechanisms, therapeutic outcomes, and patient-centered care. Access to clinical expertise and diagnostic resources further strengthens our ability to generate reliable and impactful research findings. Together, we aim to advance evidence-based healthcare solutions and contribute to improved patient management and treatment strategies in Bangladesh and beyond.',
  },
]

export interface Award {
  name: string
  recipient: string
  amount: string
  projectTitle?: string
  description?: string
}

export const awardsData: Award[] = [
  {
    name: 'OWSD Early Career Fellowship',
    recipient: 'Professor Dr Tahmina Foyez',
    amount: '50,000 USD',
    projectTitle:
      'Biocompatible Self-Healing Hydrogel as a Promising Antimicrobial and Wound Healing Application',
    description:
      'Professor Dr Tahmina Foyez was awarded the prestigious OWSD Early Career Fellowship by the Organization for Women in Science for the Developing World in recognition of her outstanding research contributions. This highly competitive award provides research funding enabling the advancement of innovative biomedical research within our laboratory. This achievement highlights our lab’s commitment to cutting-edge research and its contribution to addressing critical healthcare challenges in Bangladesh and beyond.',
  },
  {
    name: 'IAR Research Grant for Antimicrobial Resistance Gene Study',
    recipient: 'Mr. Ferdous-Ul-Haque Joy',
    amount: '5 Lac BDT',
    projectTitle:
      'Antibiotic resistance patterns and molecular correlation of mcr-1 and mcr-3 genes in colistin-resistant urinary Escherichia coli isolates from tertiary-level hospital in Dhaka, Bangladesh',
  },
  {
    name: 'IAR Research Grant for Gene Polymorphism Study',
    recipient: 'Mr. Rajib Das',
    amount: '5 Lac BDT',
    projectTitle:
      'Role of VEGF Polymorphisms and Serum VEGF level as Potential Biomarkers in Breast Cancer: A Case-Control Study in Bangladeshi Population.',
  },
  {
    name: 'IAR Research Grant for Phytochemistry Study',
    recipient: 'Ms. Sharmin Ahmed Rakhi',
    amount: '5 Lac BDT',
    projectTitle:'Developing Food-Based Strategies to Reduce Blood Lead Burden in Bangladesh: Experimental Insights from Okra and Chickpea'
  },
  {
    name: 'IAR Research Grant for MCC Study',
    recipient: 'Sabiha Tasnim',
    amount: '5 Lac BDT',
    projectTitle:'Sustainable Production of Pharmaceutical Grade Microcrystalline Cellulose (MCC) from Waste Cotton Lint Using Green Solvent Technology'
  },
  {
    name: 'IAR Research Grant for Gene Polymorphism Study',
    recipient: 'Mst. Nowsad Zahan Sathi',
    amount: '5 Lac BDT',
    projectTitle:
      'Association Between IGFBP-3 Gene Polymorphisms and Serum IGFBP-3 Levels and Breast Cancer Risk Among Bangladeshi Women: A Case-Control Study',
  },
]

//  in com
