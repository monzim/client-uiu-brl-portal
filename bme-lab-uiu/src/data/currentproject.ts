export interface CurrentProject {
  id: string;
  category: string;
  title: string;
  summary: string;
  details: string;
  image: string;
}

export const currentProjects: CurrentProject[] = [
  {
    id: "smart-hydrogel",
    category: "Biomaterials",
    title: "Smart Hydrogel",
    summary: "Biocompatible self-healing hydrogel as promising anti-microbial and wound healing applications",
    details: `Chronic and acute wound management remains a significant clinical challenge due to the high risk of microbial infection, delayed tissue regeneration, and limitations of conventional wound dressings. This project aims to develop an advanced biocompatible self-healing hydrogel system with integrated antimicrobial functionality to address these challenges and improve therapeutic outcomes.

The proposed hydrogel is designed using biocompatible polymeric networks capable of autonomous self-repair through dynamic crosslinking mechanisms. This self-healing property enables the material to recover its structural integrity after mechanical damage, ensuring prolonged functionality and adaptability to dynamic wound environments. Such characteristics are particularly advantageous for maintaining continuous coverage and protection over irregular wound surfaces.

To enhance its clinical relevance, the hydrogel is engineered with inherent or incorporated antimicrobial agents to effectively inhibit the growth of pathogenic microorganisms. This reduces the risk of infection, a major barrier to efficient wound healing. Additionally, the hydrogel matrix is optimized to maintain a moist microenvironment, which is known to facilitate cell proliferation, migration, and extracellular matrix deposition which is a key processes in tissue regeneration.

The project also explores the physicochemical and biological properties of the hydrogel, including swelling behavior, mechanical strength, biodegradability, cytocompatibility, and antimicrobial efficacy. In vitro and, where applicable, in vivo evaluations are conducted to assess its performance in promoting wound closure and tissue repair.

Overall, this research aims to provide a multifunctional wound dressing platform that combines self-healing capability, antimicrobial protection, and enhanced biocompatibility. The outcomes of this study are expected to contribute to the development of next-generation smart biomaterials for effective wound management and broader biomedical applications.`,
    image: "https://images.pexels.com/photos/3825368/pexels-photo-3825368.jpeg"
  },
  {
    id: "gene-polymorphism",
    category: "Genetics",
    title: "Gene Polymorphism",
    summary: "Role of VEGF Polymorphisms and Serum VEGF Level as Potential Biomarkers in Breast Cancer",
    details: `Breast cancer remains one of the leading causes of cancer-related morbidity and mortality among women worldwide, including in Bangladesh, where late diagnosis and limited access to personalized treatment strategies pose significant challenges. Early detection and reliable prognostic markers are therefore critical for improving patient outcomes. This study investigates the role of vascular endothelial growth factor (VEGF) gene polymorphisms and circulating serum VEGF levels as potential biomarkers for breast cancer susceptibility and progression in the Bangladeshi population.

VEGF is a key regulator of angiogenesis, a fundamental process in tumor growth, invasion, and metastasis. Genetic variations (polymorphisms) in the VEGF gene may influence its expression and activity, thereby affecting an individual’s predisposition to cancer and disease severity. In parallel, elevated serum VEGF levels have been associated with enhanced tumor vascularization and poor clinical prognosis.

This case–control study is designed to evaluate the association between specific VEGF gene polymorphisms and breast cancer risk by comparing genotypic distributions between diagnosed patients and healthy controls. Additionally, quantitative analysis of serum VEGF levels is performed to assess its diagnostic and prognostic significance. The study further explores correlations between genetic variants, circulating VEGF concentrations, and clinicopathological parameters such as tumor stage, grade, and metastasis.

Molecular techniques, including polymerase chain reaction (PCR)-based genotyping and enzyme-linked immunosorbent assay (ELISA), are employed for accurate detection and quantification. Statistical analyses are conducted to determine the strength of associations, evaluate risk factors, and identify potential predictive markers.

This research aims to establish VEGF polymorphisms and serum VEGF levels as minimally invasive, reliable biomarkers for early detection, risk assessment, and prognosis of breast cancer in the Bangladeshi population. The findings are expected to contribute to the advancement of precision medicine approaches and support the development of targeted therapeutic strategies tailored to population-specific genetic profiles.`,
    image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg"
  },
  {
    id: "antimicrobial-gene-analysis",
    category: "Microbiology",
    title: "Antimicrobial Gene Analysis",
    summary: "Colistin Resistance and mcr-1/mcr-3 Gene Analysis in Urinary E. coli from a Tertiary Level Hospital",
    details: `The rapid emergence of antimicrobial resistance has become a critical global health concern, with multidrug-resistant bacterial infections posing a serious threat to effective clinical management. Of particular concern is resistance to colistin, a last-resort antibiotic used to treat severe infections caused by extensively drug-resistant Gram-negative bacteria. This study investigates the prevalence of colistin resistance and the distribution of plasmid-mediated mcr-1 and mcr-3 resistance genes in urinary isolates of Escherichia coli collected from a tertiary-level hospital setting.

Escherichia coli is one of the most common causative agents of urinary tract infections (UTIs), and the increasing occurrence of resistant strains significantly complicates treatment strategies. The detection of mcr genes, which are transferable via plasmids, raises serious concerns due to their potential for rapid horizontal gene dissemination among bacterial populations.

This study employs a combination of phenotypic and molecular approaches to comprehensively assess colistin resistance. Antimicrobial susceptibility testing is performed to identify resistant isolates, while polymerase chain reaction (PCR)-based assays are used for the detection of mcr-1 and mcr-3 genes. Further analysis is conducted to evaluate the correlation between genotypic findings and resistance phenotypes, as well as their association with patient demographics and clinical characteristics.

Additionally, the study aims to determine the prevalence of these resistance determinants within the hospital environment, providing valuable insights into local antimicrobial resistance patterns. Understanding the distribution of plasmid-mediated colistin resistance genes is essential for implementing effective infection control measures and guiding antibiotic stewardship programs.

Overall, this research seeks to highlight the growing threat of colistin resistance in uropathogenic E. coli and to establish molecular surveillance strategies for early detection and containment. The findings are expected to contribute to improved clinical decision-making, reinforce public health policies, and support global efforts to combat antimicrobial resistance.`,
    image: "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg"
  },
  {
    id: "drug-discovery",
    category: "Pharmacology",
    title: "Drug Discovery",
    summary: "In vitro and In vivo Biological Activities and In Silico Analysis of Diospyros malabarica Leaf Extract",
    details: `Medicinal plants continue to serve as a rich source of bioactive compounds with diverse therapeutic potential. Diospyros malabarica, a traditionally used medicinal plant, has gained attention for its wide range of pharmacological properties. This project aims to comprehensively evaluate the biological activities of Diospyros malabarica leaf extract through integrated in vitro, in vivo, and in silico approaches.

The in vitro component of the study focuses on assessing key biological activities such as antioxidant, antimicrobial, anti-inflammatory, and cytotoxic effects using established biochemical and cell-based assays. These experiments provide initial evidence of the extract’s pharmacological potential and help identify its bioactive properties at the molecular level.

To further validate these findings, in vivo studies are conducted using appropriate animal models to evaluate therapeutic efficacy, safety, and physiological effects. Parameters such as anti-inflammatory response, analgesic activity, and potential toxicity are examined to determine the extract’s suitability for biomedical applications.

In parallel, in silico analysis is performed to identify and characterize the active phytochemical constituents present in the leaf extract. Computational techniques, including molecular docking and pharmacokinetic prediction, are used to investigate the interaction between selected compounds and relevant biological targets. This approach provides mechanistic insights into the observed biological activities and supports the identification of potential lead compounds for drug development.

The integration of experimental and computational methods in this study offers a comprehensive understanding of the therapeutic potential of Diospyros malabarica. The findings are expected to contribute to the discovery of novel plant-based bioactive agents and support the development of safe, effective, and affordable therapeutic alternatives.`,
    image: "https://images.pexels.com/photos/5439141/pexels-photo-5439141.jpeg"
  }
];
