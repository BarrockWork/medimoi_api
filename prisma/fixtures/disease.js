const diseases = [
    {
        name: "Cancer de l’endomètre",
        nameSlug: "cancer-de-l-endomètre",
        description: "Lorsqu'un cancer se développe dans l'endomètre, il touche la paroi intérieure du corps de l'utérus, là où se passe la grossesse.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cancer de l’estomac",
        nameSlug: "cancer-de-l-estomac",
        description: "Le cancer de l'estomac (parfois appelé cancer gastrique) prend naissance dans les cellules de l'estomac",
        incubationPeriod: "inconnu",
        transmitting: "alcool, tabac, alimentation salée"
    },
    {
        name: "Cancer du rein",
        nameSlug: "cancer-du-rein",
        description: "Le cancer du rein prend naissance dans les cellules du rein.",
        incubationPeriod: "inconnu",
        transmitting: "Certains sont suspectés : hypertension artérielle, exposition au cadmium, à l'amiante."
    },
    {
        name: "Cancer du rectum",
        nameSlug: "cancer-du-rectum",
        description: "Le rectum est tapissé par une muqueuse qui peut se transformer en tissu cancéreux",
        incubationPeriod: "inconnu",
        transmitting: " La contamination se fait de peau à peau, même sans pénétrations avec une personne atteinte."
    },
    {
        name: "Diabète",
        nameSlug: "Diabète",
        description: "Le diabète est une maladie chronique qui survient lorsque le pancréas ne produit pas suffisamment d'insuline ou lorsque l'organisme n'est pas capable d'utiliser efficacement l'insuline qu'il produit",
        incubationPeriod: "inconnu",
        transmitting: "Elle est due soit à un problème de pancréas, soit à la résistance de l'organisme à l'insuline."
    },
    {
        name: "Insuffisance cardiaque\n",
        nameSlug: "insuffisance-cardiaque\n",
        description: "L'insuffisance cardiaque est l'incapacité du muscle cardiaque à assurer normalement son rôle de propulsion du sang dans l'organisme",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Maladie de Kawasaki",
        nameSlug: "maladie-de-kawasaki",
        description: "La maladie de Kawasaki est caractérisée par une inflammation de la paroi des vaisseaux sanguins (vascularite) dans tout le corps",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Asthme",
        nameSlug: "asthme",
        description: "Certains éléments extérieurs (poussière de maison, poils d'animaux, pollens, etc.) peuvent provoquer une réaction allergique chez des personnes prédisposées.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire/allergique"
    },
    {
        name: "Maladie de Crohn",
        nameSlug: "maladie-de-crohn",
        description: "La maladie de Crohn (MC) est une inflammation chronique qui peut toucher les parois de tout le tube digestif, de la bouche à l'anus.",
        incubationPeriod: "inconnu",
        transmitting: "polygénétique"
    },
    {
        name: "Scoliose",
        nameSlug: "scoliose",
        description: "La scoliose est une déviation permanente de la colonne vertébrale, liée à une rotation des vertèbres.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Maladie d’Alzheimer",
        nameSlug: "maladie-d'alzheimer",
        description: "La maladie d'Alzheimer est une maladie neuro dégénérative (Atteinte cérébrale progressive conduisant à la mort neuronale) caractérisée par une perte progressive de la mémoire et de certaines fonctions intellectuelles (cognitives) conduisant à des répercussions dans les activités de la vie quotidienne",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Autisme",
        nameSlug: "autisme",
        description: "C'est un trouble du neurodéveloppement : c'est-à-dire des altérations du cerveau qui se mettent en place avant la naissance et sont impliqués dans le langage, la motricité, la perception, les émotions, les interactions sociales",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Endométriose",
        nameSlug: "endométriose",
        description: "L'endométriose est une maladie gynécologique fréquente qui touche près de 10 % des femmes. Elle se caractérise par la présence, hors de la cavité utérine, de tissu semblable à celui de la muqueuse de l'utérus (appelée endomètre).",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Psoriasis",
        nameSlug: "psoriasis",
        description: "Le psoriasis est une maladie inflammatoire chronique de la peau qui se manifeste par des plaques rouges présentant des squames.",
        incubationPeriod: "inconnu",
        transmitting: "ENVIRONNEMENTAUX/GÉNÉTIQUES"
    },
    {
        name: "Glaucome chronique",
        nameSlug: "glaucome-chronique",
        description: "Le glaucome chronique à angle ouvert est une neuropathie optique progressive, chronique et asymptomatique avec altération caractéristique du champ visuel et atrophie du nerf optique d'aspect particulier.",
        incubationPeriod: "inconnu",
        transmitting: "inconnu"
    },
    {
        name: "Lupus",
        nameSlug: "lupus",
        description: "Le lupus auto-immune, qui survient lorsque le système immunitaire s'attaque aux cellules de l'organisme et les détruit.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire/environnementaux"
    },
    {
        name: "Antécédent d’infarctus du myocarde",
        nameSlug: "antecedent-d'infarctus-du-myocarde",
        description: "L'infarctus du myocarde est une maladie cardiaque qui se manifeste par une rupture de la carte cardiaque, qui entraîne une perte de la vitesse cardiaque.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Antécédent de phlébite ou d’embolie pulmonaire",
        nameSlug: "antecedent-de-phlébite-ou-d'embolie-pulmonaire",
        description: "L'embolie pulmonaire est une maladie respiratoire chronique qui se manifeste par une perte de la respiration et des signes respiratoires.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Arythmie cardiaque par fibrillation auriculaire",
        nameSlug: "arythmie-cardiaque-par-fibrillation-auriculaire",
        description: "L'arythmie cardiaque par fibrillation auriculaire est une maladie cardiaque qui se manifeste par une perte de la vitesse cardiaque.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cardiopathie congénitale",
        nameSlug: "cardiopathie-congénitale",
        description: "La cardiopathie congénitale est une maladie cardiaque qui se manifeste par une perte de la vitesse cardiaque.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Hypercholestérolémie",
        nameSlug: "hypercholestérolémie",
        description: "L'hypercholestérolémie est un trouble du métabolisme lipidique, qui correspond à une augmentation du taux de cholestérol dans le sang.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Hypertension artérielle",
        nameSlug: "hypertension-artérielle",
        description: "L'hypertension artérielle (HTA) correspond à une augmentation anormale de la pression du sang sur la paroi des artères.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Insuffisance veineuse chronique",
        nameSlug: "insuffisance-veineuse-chronique",
        description: "L'insuffisance veineuse chronique consiste en une altération du retour veineux, entraînant parfois une gêne du membre inférieur, un œdème et des anomalies cutanées.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Syndrome de  Marfan",
        nameSlug: "syndrome-de-marfan",
        description: "Le syndrome de Marfan est une maladie héréditaire rare du tissu conjonctif qui provoque des anomalies oculaires, osseuses, cardiaques, vasculaires, pulmonaires et au niveau du système nerveux central.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Troubles du rythme cardiaque",
        nameSlug: "troubles-du-rythme-cardiaque",
        description: "Les troubles du rythme du cœur, ou « arythmies cardiaques », se caractérisent par l'existence de battements irréguliers, trop lents ou trop rapides, sans que ces modifications du rythme soient liées à une cause dite « physiologique » (par exemple, un effort physique).",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cancer de l’œsophage",
        nameSlug: "cancer-de-l'œsophage",
        description: "Le cancer de l'œsophage désigne une tumeur maligne qui touche les cellules situées dans l'œsophage, au sein de l'appareil digestif.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cancer de l’ovaire",
        nameSlug: "cancer-de-l'ovaire",
        description: "Le cancer de l'ovaire prend naissance dans les cellules de l'ovaire. La tumeur cancéreuse (maligne) est un groupe de cellules cancéreuses qui peuvent envahir les tissus voisins et les détruire.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cancer de la prostate",
        nameSlug: "cancer-de-la-prostate",
        description: "Le cancer de la prostate est une tumeur maligne développée à partir de cellules de la prostate, glande de l'appareil génital masculin.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cancer de la thyroïde",
        nameSlug: "cancer-de-la-thyroïde",
        description: "Le cancer de la thyroïde est une multiplication anormale de cellules de la glande thyroïde.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cancer de la vessie",
        nameSlug: "cancer-de-la-vessie",
        description: "Le cancer de la vessie est une multiplication excessive de cellules anormales dans la paroi interne ou muqueuse de la vessie.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cancer des os",
        nameSlug: "cancer-des-os",
        description: "Le cancer des os prend naissance dans les cellules des os ou du cartilage. On l'appelle aussi cancer primitif des os.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cancer du cerveau",
        nameSlug: "cancer-du-cerveau",
        description: "Le cancer du cerveau est une lésion tumorale qui se développe dans le crâne à différents niveaux : parenchyme, hémisphères cérébrales, cervelet, tronc cérébral, méninges (méningiomes), structures vasculaires (angiomes) ou glandulaires (adénomes).",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cancer du foie",
        nameSlug: "cancer-du-foie",
        description: "Le cancer du foie est une maladie qui se développe dans les cellules du foie. Il est très rare et peut être détecté par une analyse de la biopsie.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cancer du pancréas",
        nameSlug: "cancer-du-pancréas",
        description: "Le cancer du pancréas est une maladie qui se développe dans les cellules du pancréas. Il est très rare et peut être détecté par une analyse de la biopsie.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cancer des testicules",
        nameSlug: "cancer-des-testicules",
        description: "La plupart des cancers du testicule se développent à partir des cellules germinales qui fabriquent les spermatozoïdes.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cancer du col de l’utérus",
        nameSlug: "cancer-du-col-de-l'utérus",
        description: "Le cancer du col de l'utérus correspond à la présence de cellules anormales au sein de la muqueuse qui recouvre le col de l'utérus, c'est-à-dire la partie basse de l'utérus qui fait la jonction avec le vagin",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Cancer du poumon",
        nameSlug: "cancer-du-poumon",
        description: "Un cancer du poumon appelé aussi cancer bronchopulmonaire ou cancer bronchique est une maladie des cellules des bronches ou plus rarement, des cellules qui tapissent les alvéoles pulmonaires.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Acromégalie",
        nameSlug: "acromégalie",
        description: "L’acromégalie, également appelée maladie de Pierre Marie du nom du médecin qui l’a décrite, est une maladie due à une hypersécrétion d’hormone de croissance. L’hormone de croissance est aussi appelée GH pour Growth Hormone, ou hormone somatotrope (STH).",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Adénome hypophysaire",
        nameSlug: "adenome-hypophysaire",
        description: "Les adénomes hypophysaires sont des tumeurs provenant de l'hypophyse. Il s'agit généralement de tumeurs bénignes, souvent sécrétantes, c'est-à-dire assurant une sécrétion d'hormones, ou alors non sécrétantes.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Hyperprolactinémie",
        nameSlug: "hyperprolactinémie",
        description: "L'hyperprolactinémie est l'augmentation excessive de la prolactine dans le sang (plus de 25 ng/ml chez la femme et plus de 15 ng/ml chez l'homme).",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Hypothyroïdie",
        nameSlug: "hypothyroïdie",
        description: "L'hypothyroïdie est l'incapacité de la glande thyroïde à produire suffisamment d'hormones thyroïdiennes. Son dysfonctionnement retentit sur les grandes fonctions de l'organisme.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Maladie d’Addison",
        nameSlug: "maladie-d-addison",
        description: "La maladie d'Addison est une maladie rare due à une atteinte des glandes corticosurrénales conduisant à un déficit total en aldostérone et en cortisol.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Maladie de Basedow",
        nameSlug: "maladie-de-basedow",
        description: "La maladie de Basedow est une maladie autoimmune de la thyroïde qui se manifeste par une hyperthyroïdie, un goitre homogène et parfois une ophtalmopathie.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Mucoviscidose",
        nameSlug: "mucoviscidose",
        description: "La mucoviscidose : une maladie génétique qui n'atteint pas que les poumons. La mucoviscidose est une maladie génétique héréditaire caractérisée par l'épaississement des sécrétions de plusieurs organes, essentiellement les poumons et le pancréas , ce qui altère leur fonctionnement",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Phéochromocytome",
        nameSlug: "phéochromocytome",
        description: "Pour l'OMS, un phéochromocytome (PHEO) est une tumeur de la surrénale sécrétant des catécholamines (Adrénaline et Noradrénaline). Les autres tumeurs sécrétant des catécholamines sont des paragangliomes (PGL) fonctionnels ; ils peuvent être thoraciques, abdominaux ou pelviens.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Syndrome de Cushing",
        nameSlug: "syndrome-de-cushing",
        description: "Le syndrome de Cushing est constitué par les anomalies cliniques secondaires à l'élévation chronique du cortisol ou autres corticostéroïdes. La maladie de Cushing est un syndrome de Cushing secondaire à une hyperproduction hypophysaire de l'hormone adrénocorticotrope, habituellement par un adénome hypophysaire.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Thyroïdite d’Hashimoto",
        nameSlug: "thyroïdite-d-hashimoto",
        description: "La thyroïdite d'Hashimoto est une inflammation chronique auto-immune de la thyroïde avec infiltration lymphocytaire. L'examen retrouve une hypertrophie non douloureuse de la thyroïde et des symptômes d'hypothyroïdie. Le diagnostic repose sur la mise en évidence de titres élevés d'anticorps antithyroperoxydase.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Apnée du sommeil",
        nameSlug: "apnée-du-sommeil",
        description: "L'apnée du sommeil ou syndrome d'apnées–hypopnées obstructives du sommeil (SAHOS) est un trouble de la ventilation nocturne dû à la survenue anormalement fréquente de pauses respiratoires.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Otospongiose",
        nameSlug: "otospongiose",
        description: "L'otospongiose (également appelée otosclérose) est une cause assez fréquente de surdité acquise. L'otospongiose est une maladie de l'os de l'oreille (ostéodystrophie de la capsule otique), ne se rencontrant que dans l'espèce humaine.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Polypose naso-sinusiennes",
        nameSlug: "polypose-naso-sinusiennes",
        description: "La polypose nasale est une maladie chronique inflammatoire de la muqueuse qui se caractérise par des polypes bilatéraux, qui, dans les formes sévères, obstruent les sinus et cavités nasales.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Rhinite chronique",
        nameSlug: "rhinite-chronique",
        description: "La rhinite chronique est une pathologie de la sphère ORL qui se définit par l'existence de symptômes nasaux évoluant depuis plus de 3 mois. C'est est une inflammation des voies nasales, plus précisément de la muqueuse.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Sinusite chronique",
        nameSlug: "sinusite-chronique",
        description: "La sinusite chronique est une inflammation des sinus de la face. Elle se caractérise par des symptômes sinusiens persistant pendant trois mois ou plus. La sinusite chronique peut être d'origine infectieuse (bactérienne, virale ou fongique) ou non infectieuse. La présente ligne directrice exclut la sinusite aiguë.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Diverticules",
        nameSlug: "diverticules",
        description: "Les diverticules coliques sont des hernies, sortes de poches qui se développent progressivement avec l'âge, localisées le plus souvent au niveau du côlon sigmoïde et du côlon gauche.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Maladie de Gilbert",
        nameSlug: "maladie-de-gilbert",
        description: "La maladie de Gilbert, est une maladie bénigne du foie. Elle se caractérise, au niveau du sang, par une concentration légèrement élevée de bilirubine (qui est un pigment jaune produit par la destruction de l'hémoglobine).",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Polypes coliques",
        nameSlug: "polypes-coliques",
        description: "Un polype colorectal désigne toute lésion en relief de la muqueuse du côlon ou du rectum. Il est facilement visible lors d’un examen, à l’intérieur du tube digestif.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Arthrose",
        nameSlug: "arthrose",
        description: "L’arthrose est une maladie articulaire conduisant à la destruction du cartilage. Les traitements ont longtemps été uniquement symptomatiques, mais la recherche a permis de découvrir de nouvelles cibles thérapeutiques : elles conduisent au développement de traitements ciblés visant à enrayer la progression de la maladie. Un certain nombre d’entre eux sont actuellement en cours d’évaluation.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Fibromyalgie",
        nameSlug: "fibromyalgie",
        description: "La fibromyalgie, ou syndrome fibromyalgique, est une affection chronique caractérisée par des douleurs diffuses persistantes. Le plus souvent, ces douleurs sont associées à d'autres signes évocateurs comme une fatigue intense, des troubles du sommeil",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Maladie de Paget",
        nameSlug: "maladie-de-paget",
        description: "La maladie osseuse de Paget, aussi connue sous le nom de maladie de Paget, se caractérise par une réparation osseuse anormalement rapide, ce qui peut occasionner l'affaiblissement et une croissance excessive des os.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Maladie de Raynaud",
        nameSlug: "maladie-de-raynaud",
        description: "Le phénomène de Raynaud est un trouble réversible de la circulation sanguine au niveau des extrémités, principalement doigts, plus rarement orteils et parfois nez et oreilles.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Myasthénie",
        nameSlug: "myasthénie",
        description: "La myasthénie grave est une maladie auto-immune qui perturbe la communication entre les nerfs et les muscles, et qui a pour conséquence une faiblesse musculaire. La myasthénie grave provient d'un dysfonctionnement du système immunitaire.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Ostéoporose",
        nameSlug: "ostéoporose",
        description: "L'ostéoporose est une maladie osseuse qui associe à la fois une diminution de la densité de l'os et des modifications de sa micro-architecture. L'os est plus fragile, moins résistant et, par conséquent, le risque de fracture augmente (fractures du col du fémur, du poignet, des vertèbres...)",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Chorée de Huntington",
        nameSlug: "chorée-de-huntington",
        description: "La chorée de Huntington est une maladie héréditaire qui débute par des saccades ou des spasmes involontaires occasionnels ; elle évolue vers la survenue de mouvements involontaires (chorée et athétose) de plus en plus marqués associés à une détérioration mentale et le décès.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Epilepsie",
        nameSlug: "epilepsie",
        description: "L'épilepsie est une maladie chronique caractérisée par la survenue de crises épileptiques. Ces crises traduisent un dérèglement soudain et transitoire de l'activité électrique du cerveau. Elles apparaissent sans cause identifiée, ou sont liées à une autre affection.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Maladie de Parkinson",
        nameSlug: "maladie-de-parkinson",
        description: "La maladie de Parkinson est une affection chronique neurodégénérative : c’est-à-dire qu’elle se caractérise par la disparition progressive de certains neurones dans le cerveau.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Narcolepsie",
        nameSlug: "narcolepsie",
        description: "Ce trouble du sommeil est caractérisé par un sommeil nocturne de durée normale mais de qualité médiocre, une somnolence diurne excessive et des endormissements irrépressibles qui peuvent survenir à tout moment de la journée, même en pleine activité.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Sclérose en plaque",
        nameSlug: "sclérose-en-plaque",
        description: "La sclérose en plaques est une maladie auto-immune qui affecte le système nerveux central.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Syndrome de Rett",
        nameSlug: "syndrome-de-rett",
        description: "Le syndrome de Rett est une maladie rare qui altère le développement du système nerveux central (SNC). Il se manifeste par une régression rapide des acquis après 6 à 24 mois de développement normal.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Syndrome de Guillain Barré",
        nameSlug: "syndrome-de-guillain-barré",
        description: "Le syndrome de Guillain-Barré est une affection rare dans laquelle le système immunitaire du patient attaque les nerfs périphériques.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Dépression",
        nameSlug: "dépression",
        description: "La dépression constitue un trouble mental courant, caractérisé par la tristesse, la perte d'intérêt ou de plaisir, des sentiments de culpabilité ou de faible estime de soi, des troubles du sommeil ou de l'appétit, d'une sensation de fatigue et d'un manque de concentration.",
        incubationPeriod: "inconnu",
        transmitting: "Facteurs psychologiques"
    },
    {
        name: "Addictions",
        nameSlug: "addictions",
        description: "Les addictions sont des troubles psychologiques qui sont causés par des dépendances ou des comportements délétèrement déviant. Elles peuvent être de nature dépressives ou non.",
        incubationPeriod: "inconnu",
        transmitting: "Facteurs psychologiques"
    },
    {
        name: "Troubles obsessionnels compulsifs : TOC",
        nameSlug: "troubles-obsessionnels-compulsifs-toc",
        description: "Les troubles obsessionnels compulsifs (TOC) déclenchent des pensées dérangeantes, répétitives et incontrôlables, causant une forte anxiété",
        incubationPeriod: "inconnu",
        transmitting: "Facteurs psychologiques"
    },
    {
        name: "Fibrome utérine",
        nameSlug: "fibrome-utérine",
        description: "Les fibromes utérins sont des tumeurs bénignes développées à partir du muscle de l'utérus. Cette affection fréquente chez la femme jeune est liée à des facteurs favorisants comme l'hérédité ou l'importance des sécrétions hormonales (œstrogènes).",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Polykystose rénale",
        nameSlug: "polykystose-rénale",
        description: "Polykystose rénale est une maladie héréditaire où de nombreuses poches de liquide (kystes) se forment au niveau des deux reins. Les reins augmentent de volume, mais la quantité de tissu fonctionnel se réduit. La maladie rénale polykystique est provoquée par une anomalie génétique héréditaire.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Acné",
        nameSlug: "acné",
        description: "L' acné est une maladie inflammatoire chronique.",
        incubationPeriod: "3 ou 4 ans",
        transmitting: "hériditaire/hormonales/hygiéniques"
    },
    {
        name: "Eczéma",
        nameSlug: "eczéma",
        description: "L'eczéma atopique ou dermatite atopique est une maladie cutanée prurigineuse (provoquant des démangeaisons) chronique, évoluant par poussées. Il touche principalement les nourrissons et les enfants mais peut persister à l'adolescence et à l'âge adulte.",
        transmitting: "Allergènes/Stress/Transpiration",
        incubationPeriod: "plusieurs années"
    },
    {
        name: "Herpes",
        nameSlug: "herpes",
        description: "L'herpès est une maladie virale, contagieuse et récurrente, L'herpès est caractérisé par l'apparition de cloques (vésicules) groupées en bouquets.",
        incubationPeriod: "inconnu",
        transmitting: "stress/"
    },
    {
        name: "Vitiligo",
        nameSlug: "vitiligo",
        description: "Le vitiligo est une maladie de la peau qui se caractérise par une dépigmentation se traduisant par l'apparition de taches blanches sur la peau.",
        incubationPeriod: "inconnu",
        transmitting: "hériditaire"
    },
    {
        name: "Urticaire",
        nameSlug: "urticaire",
        description: "L'urticaire est une éruption cutanée caractérisée par la présence de plaques (ou papules) rouges ou rosées, superficielles, arrondies, bien limitées et en relief.",
        incubationPeriod: "inconnu",
        transmitting: "allergique"
    },
    {
        name: "Cataracte",
        nameSlug: "cataracte",
        description: "La cataracte est une opacification du cristallin de l'œil, principalement liée au vieillissement.",
        incubationPeriod: "inconnu",
        transmitting: "age"
    },
    {
        name: "Dégénérescence maculaire lié à l'age",
        nameSlug: "degenerescence-maculaire-lié-à-l-age",
        description: "La dégénérescence maculaire liée à l'âge (ou DMLA) est une maladie chronique de la zone centrale de la rétine, appelée macula",
        incubationPeriod: "indeterminée",
        transmitting: "age"
    },
    {
        name: "Rétinopathie",
        nameSlug: "retinopathie",
        description: "La rétinopathie diabétique (atteinte des yeux : œil et rétine) est une grave complication du diabète qui touche 50% des patients diabétiques de type 2.",
        incubationPeriod: "inconnu",
        transmitting: "diabète"
    },
    {
        name: "Uvéite",
        nameSlug: "uvéite",
        description: "L'uvéite consiste en une inflammation à l'intérieur de l'œil qui affecte une ou plusieurs des trois parties de l'uvée: l'iris (qui donne la couleur des yeux), le corps ciliaire (à l'arrière de l'iris, où est produite l'humeur aqueuse) et la choroïde (à l'arrière de la rétine).",
        incubationPeriod: "inconnu",
        transmitting: "inféctieux"
    },
    {
        name: "Trouble de la vision",
        nameSlug: "trouble-de-la-vision",
        description: "Un trouble visuel désigne une diminution de l'acuité visuelle, c'est-à-dire du pouvoir de l'œil à distinguer les détails, avec et sans lunettes.",
        incubationPeriod: "indeterminée",
        transmitting: "myopie/hypermétropie/astigmatisme"
    },
    {
        name: "Amylose",
        nameSlug: "amylose",
        description: "L'amyloïdose est une maladie causée par la transformation d'une protéine qui se dépose et s'infiltre au niveau des organes. Lorsqu'elle touche le cœur, elle cause une rigidité du muscle cardiaque et affecte sa capacité de relaxation et de contraction menant à l'insuffisance cardiaque.",
        incubationPeriod: "indeterminée",
        transmitting: "inconnu"
    },
    {
        name: "Hystiocytose",
        nameSlug: "hystiocytose",
        description: "L'histiocytose Langerhansienne (HL) est une maladie systémique liée à une accumulation dans les tissus de cellules, qui ont les caractéristiques phénotypiques des cellules de Langerhans (CL), le plus souvent organisées en granulomes.",
        incubationPeriod: "inconnu",
        transmitting: "tabac"
    },
    {
        name: "Maladie de Behçet",
        nameSlug: "maladie-de-behçet",
        description: "La maladie de Behçet est une vasculite multisystémique caractérisée par des aphtes buccaux récidivants, des ulcères génitaux, une atteinte inflammatoire oculaire, des lésions cutanées et une atteinte fréquente des articulations.",
        incubationPeriod: "inconnu",
        transmitting: "inconnu",
    },
    {
        name: "Maladie de Takayasu",
        nameSlug: "maladie-de-takayasu",
        description: "C’est une aorto-artérite inflammatoire non spécifique intéressant principalement l’aorte et la partie proximale de ses branches ou parfois l'artère pulmonaire. Elle atteint principalement la femme jeune (2ème et 3ème décades).",
        incubationPeriod: "inconnu",
        transmitting: "inconnu",
    },
    {
        name: "Sarcoïdose",
        nameSlug: "sarcoïdose",
        description: "La sarcoïdose est caractérisée par la présence de petites surfaces (microscopiques) ou de masses de cellules enflammées appelées granulomes. Les granulomes peuvent grossir et former des groupes plus importants dans un organe dont ils affecteront les fonctions.",
        incubationPeriod: "inconnu",
        transmitting: "inconnu",
    },
    {
        name: "Sclérodermie",
        nameSlug: "sclérodermie",
        description: "la sclérodermie est une maladie auto-immune de cause encore inconnue qui présente quatre principales anomalies: dérèglement du système immunitaire associé à la présence d'auto-anticorps très spécifiques, inflammation, atteinte microvasculaire et fibrose.",
        incubationPeriod: "incurable",
        transmitting: "inconnu",
    },
    {
        name: "Covid-19",
        nameSlug: "covid-19",
        description: "La maladie à coronavirus (COVID19) est une maladie infectieuse due au virus SARS-CoV-2.",
        incubationPeriod: "inconnu",
        transmitting: "inconnu",
    },
    {
        name: "Hépatite",
        nameSlug: "hepatite",
        description: "Une hépatite est une inflammation du foie causée par des substances toxiques, ou par des virus (majorité des cas).",
        incubationPeriod: "inconnu",
        transmitting: "Virus spécifiques de l'hépatite /Alcool",
    },
    {
        name: "Tuberculose",
        nameSlug: "tuberculose",
        description: "La tuberculose (TB) est une maladie infectieuse provoquée par une mycobactérie qui se transmet par voie aérienne aussi bien aux enfants qu'aux adultes. Elle touche le plus souvent les poumons mais atteint aussi parfois d'autres organes et peut évoluer vers le décès si elle n'est pas traitée.",
        incubationPeriod: "3 à 6 mois",
        transmitting: "contamination",
    },
    {
        name: "Leucémie",
        nameSlug: "leucémie",
        description: "La leucémie est un cancer qui prend naissance dans les cellules souches du sang. Les cellules souches sont des cellules de base qui se transforment en différents types de cellules qui ont des fonctions distinctes. Les cellules souches du sang deviennent des cellules souches lymphoïdes ou des cellules souches myéloïdes.",
        incubationPeriod: "indeterminée",
        transmitting: "génétiques",
    },
]

module.exports = diseases;