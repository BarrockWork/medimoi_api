const diseaseTypes = [
    {
        name: "cardiologie",
        nameSlug: "cardiologie",
        description: "Les maladies cardiovasculaires regroupent les pathologies qui touchent le cœur et l'ensemble des vaisseaux sanguins, comme l'athérosclérose, les troubles du rythme cardiaque, l'hypertension artérielle, l'infarctus du myocarde, l'insuffisance cardiaque ou encore les accidents vasculaires cérébraux."
    },
    {
        name: "neurologie",
        nameSlug: "neurologie",
        description: "Une maladie neurologique est une pathologie touchant le système nerveux, central ou périphérique. Elle peut donc affecter des cellules nerveuses se trouvant dans le cerveau, la moelle épinière, les nerfs périphériques, les jonctions neuromusculaires, le système nerveux autonome"
    },
    {
        name: "Respiratoire",
        nameSlug: "Respiratoire",
        description: "Les maladies respiratoires englobent les infections respiratoires aiguës ainsi que les maladies respiratoires chroniques telles que l'asthme, la bronchopneumopathie chronique obstructive et le cancer du poumon. La charge des affections respiratoires est aggravée par de multiples déterminants."
    },
    {
        name: "ORL",
        nameSlug: "ORL",
        description: "Les maladies ORL concernent les oreilles, le nez et la gorge, Il peut s'agir de troubles bénins, comme la laryngite ou le rhume, qui se manifestent par des gênes respiratoires. En cas de complications, il faut consulter un médecin ORL."
    },
    {
        name: "Système digestif",
        nameSlug: "Système-digestif",
        description: "Qu'est-ce qu'une maladie digestive ? Une maladie digestive est une pathologie affectant une partie du système digestif, qu'il s'agisse du tube digestif (l'œsophage, l'intestin grêle, le côlon, le rectum, l'anus) ou des glandes digestives (le foie, les voies biliaires, le pancréas)."
    },
    {
        name: "cancer",
        nameSlug: "cancer",
        description: "Un cancer est une maladie provoquée par une cellule initialement normale mais dont le programme se dérègle et la transforme. Celle-ci se multiplie et en produit d'autres, dites « anormales », qui prolifèrent de façon anarchique et excessive."
    },
    {
        name: "Endocrinienne",
        nameSlug: "endocrinienne",
        description: "Les maladies endocriniennes (ou maladies hormonales) sont causées par un dysfonctionnement des glandes libérant les hormones. Les symptômes peuvent être variés (fatigue, constipation, troubles sexuels, anxiété...)."
    },
    {
        name: "Rhumatologiques",
        nameSlug: "rhumatologiques",
        description: "Les maladies en rhumatologie. La rhumatologie est une spécialité médicale consacrée au traitement des maladies de l'appareil locomoteur : notamment les maladies des os, des articulations et des muscles. La rééducation est un aspect crucial du traitement de ces maladies."
    },
    {
        name: "Neurologiques",
        nameSlug: "neurologiques",
        description: "Les maladies neurodégénératives se caractérisent par la destruction progressive de certains neurones. Elles regroupent plusieurs pathologies : maladie d'Alzheimer et maladie de Parkinson, sclérose en plaques, sclérose latérale amyotrophique (SLA) ou maladie de Charcot, maladie de Huntington…"
    },
    {
        name: "musculaire",
        nameSlug: "musculaire",
        description: "Les dystrophies musculaires correspondent à une famille de maladies musculaires caractérisées par une faiblesse et une dégénérescence musculaire progressive : des fibres des muscles du corps dégénèrent. Les muscles s'atrophient progressivement, c'est-à-dire qu'ils perdent leur volume et donc, leur force."
    },
    {
        name: "Psychiatrique",
        nameSlug: "psychiatrique",
        description: "Les maladies psychiatriques, ou maladies mentales, sont des troubles qui affectent le comportement des individus. Les symptômes sont variés, on constate des troubles du comportement, des émotions, des difficultés à s'insérer en société ou des troubles de la personnalité."
    },
    {
        name: "Rénale",
        nameSlug: "renale",
        description: "La maladie rénale chronique est une diminution du fonctionnement des reins qui ne filtrent plus correctement le sang de l'organisme. Cette insuffisance rénale chronique a deux causes principales : le diabète et l'hypertension artérielle."
    },
    {
        name: "Peau",
        nameSlug: "peau",
        description: "Les symptômes les plus courants sont les démangeaisons, les rougeurs, la présence de vésicules ou cloques ainsi que la peau sèche. La peau enflammée peut devenir rouge sur une peau claire, et brun foncé, violet ou gris sur une peau foncée."
    },
    {
        name: "Yeux",
        nameSlug: "yeux",
        description: "les défauts visuels - myopie, hypermétropie et astigmatisme - sont considérés comme des imperfections géométriques de l'œil, ou des défauts de puissance de l'œil, la presbytie, qui concerne toutes les personnes à partir de 45 ans, est consécutive au vieillissement naturel des yeux"
    },
    {
        name: "Systémique",
        nameSlug: "systémique",
        description: "La dénomination « maladies inflammatoires systémiques et auto-immunes » couvre un ensemble d'affections différentes, qui ont comme point commun une activation anormale et persistante du système immunitaire, qui mène à une altération de la fonction de plusieurs organes, tissus, et/ou systèmes."
    },
    {
        name: "Infectieuse chronique",
        nameSlug: "infectieuse chronique",
        description: "Selon le Haut Conseil de la Santé Publique, une maladie chronique est un état pathologique de nature physique, psychologique et/ou cognitive. Il s'agit d'une maladie qui : est définie par une ancienneté de plusieurs mois et donc qui est de longue durée"
    },
    {
        name: "Hématologue",
        nameSlug: "hematologue",
        description: "L'hématologie générale comprend: les maladies causées par une augmentation d'un composant du sang. On distingue principalement la thrombocytose (excès de plaquettes sanguines), la polyglobulie (excès de globules rouges). les cytopénies, dont les thrombocytopénies, les anémies et les leucopénies"
    },
]

module.exports = diseaseTypes;