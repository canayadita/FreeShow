// Bible verses dataset — 4 languages (TB Indonesian, NIV English, Louis Segond 1910 French, Reina-Valera 1909 Spanish)
// Used for splash screen and permanent verse bar in FreeShowPlus
// Terjemahan Indonesia: TB (Terjemahan Baru) © LAI
// English translation: NIV © Biblica — quoted for non-commercial church use
// French translation: Louis Segond (1910) — public domain
// Spanish translation: Reina-Valera (1909) — public domain
// Note: some Psalms number the musical superscription as verse 1 (TB/French follow this,
// matching the Hebrew text) while this English/Spanish source does not — ref/refFr can be
// one or two verses ahead of refEn/refEs for those entries. This is expected, not a typo.

export interface BibleVerse {
    ref: string   // Indonesian reference
    refEn: string // English reference
    refFr: string // French reference
    refEs: string // Spanish reference
    id: string    // Bahasa Indonesia (TB)
    en: string    // English (NIV)
    fr: string    // French (Louis Segond 1910)
    es: string    // Spanish (Reina-Valera 1909)
}

export const BIBLE_VERSES: BibleVerse[] = [
    // ===== PENJANGKAUAN & PENGABARAN INJIL / EVANGELISM & OUTREACH =====
    {
        ref: "Lukas 19:10",
        refEn: "Luke 19:10",
        refFr: "Luc 19:10",
        refEs: "Lucas 19:10",
        id: "Sebab Anak Manusia datang untuk mencari dan menyelamatkan yang hilang.",
        en: "For the Son of Man came to seek and to save the lost.",
        fr: "Car le Fils de l’homme est venu chercher et sauver ce qui était perdu.",
        es: "Porque el Hijo del hombre vino á buscar y á salvar lo que se había perdido."
    },
    {
        ref: "Roma 10:14-15",
        refEn: "Romans 10:14-15",
        refFr: "Romains 10:14-15",
        refEs: "Romanos 10:14-15",
        id: "Tetapi bagaimana mereka dapat berseru kepada-Nya, jika mereka tidak percaya kepada Dia? Bagaimana mereka dapat percaya kepada Dia, jika mereka tidak mendengar tentang Dia? Bagaimana mereka mendengar tentang Dia, jika tidak ada yang memberitakan-Nya? Dan bagaimana mereka dapat memberitakan-Nya, jika mereka tidak diutus?",
        en: "How, then, can they call on the one they have not believed in? And how can they believe in the one of whom they have not heard? And how can they hear without someone preaching to them? And how can anyone preach unless they are sent?",
        fr: "Comment donc invoqueront-ils celui en qui ils n’ont pas cru ? Et comment croiront-ils en celui dont ils n’ont pas entendu parler ? Et comment en entendront-ils parler, s’il n’y a personne qui prêche ? Et comment y aura-t-il des prédicateurs, s’ils ne sont pas envoyés ? selon qu’il est écrit : Qu’ils sont beaux Les pieds de ceux qui annoncent la paix, De ceux qui annoncent de bonnes nouvelles !",
        es: "¿Cómo, pues invocarán á aquel en el cual no han creído? ¿y cómo creerán á aquel de quien no han oído? ¿y cómo oirán sin haber quien les predique? ¿Y cómo predicarán si no fueren enviados? Como está escrito: ¡Cuán hermosos son los pies de los que anuncian el evangelio de la paz, de los que anuncian el evangelio de los bienes!"
    },
    {
        ref: "Lukas 15:7",
        refEn: "Luke 15:7",
        refFr: "Luc 15:7",
        refEs: "Lucas 15:7",
        id: "Aku berkata kepadamu: Demikian juga akan ada sukacita di surga karena satu orang berdosa yang bertobat, lebih dari pada sukacita karena sembilan puluh sembilan orang benar yang tidak memerlukan pertobatan.",
        en: "I tell you that in the same way there will be more rejoicing in heaven over one sinner who repents than over ninety-nine righteous persons who do not need to repent.",
        fr: "De même, je vous le dis, il y aura plus de joie dans le ciel pour un seul pécheur qui se repent, que pour quatre-vingt-dix-neuf justes qui n’ont pas besoin de repentance.",
        es: "Os digo, que así habrá más gozo en el cielo de un pecador que se arrepiente, que de noventa y nueve justos, que no necesitan arrepentimiento."
    },
    {
        ref: "2 Korintus 5:20",
        refEn: "2 Corinthians 5:20",
        refFr: "2 Corinthiens 5:20",
        refEs: "2 Corintios 5:20",
        id: "Jadi kami ini adalah utusan-utusan Kristus, seakan-akan Allah menasihati kamu dengan perantaraan kami; dalam nama Kristus kami meminta kepadamu: berilah dirimu didamaikan dengan Allah.",
        en: "We are therefore Christ's ambassadors, as though God were making his appeal through us. We implore you on Christ's behalf: Be reconciled to God.",
        fr: "Nous faisons donc les fonctions d’ambassadeurs pour Christ, comme si Dieu exhortait par nous ; nous vous en supplions au nom de Christ : Soyez réconciliés avec Dieu !",
        es: "Así que, somos embajadores en nombre de Cristo, como si Dios rogase por medio nuestro; os rogamos en nombre de Cristo: Reconciliaos con Dios."
    },
    {
        ref: "1 Petrus 3:15",
        refEn: "1 Peter 3:15",
        refFr: "1 Pierre 3:15",
        refEs: "1 Pedro 3:15",
        id: "Tetapi kuduskanlah Kristus di dalam hatimu sebagai Tuhan! Dan siap sedialah pada segala waktu untuk memberi pertanggungan jawab kepada tiap-tiap orang yang meminta pertanggungan jawab dari kamu tentang pengharapan yang ada padamu.",
        en: "But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have.",
        fr: "Mais sanctifiez dans vos cœurs Christ le Seigneur, étant toujours prêts à vous défendre, avec douceur et respect, devant quiconque vous demande raison de l’espérance qui est en vous,",
        es: "Sino santificad al Señor Dios en vuestros corazones, y estad siempre aparejados para responder con mansedumbre y reverencia á cada uno que os demande razón de la esperanza que hay en vosotros:"
    },
    {
        ref: "Amsal 11:30",
        refEn: "Proverbs 11:30",
        refFr: "Proverbes 11:30",
        refEs: "Proverbios 11:30",
        id: "Buah orang benar adalah pohon kehidupan, dan siapa yang bijaksana memenangkan jiwa-jiwa.",
        en: "The fruit of the righteous is a tree of life, and the one who is wise saves lives.",
        fr: "Le fruit du juste est un arbre de vie, Et le sage s’empare des âmes.",
        es: "El fruto del justo es árbol de vida: y el que prende almas, es sabio."
    },
    {
        ref: "Matius 9:37-38",
        refEn: "Matthew 9:37-38",
        refFr: "Matthieu 9:37-38",
        refEs: "Mateo 9:37-38",
        id: "Maka kata-Nya kepada murid-murid-Nya: 'Tuaian memang banyak, tetapi pekerja sedikit. Karena itu mintalah kepada tuan yang empunya tuaian, supaya Ia mengirimkan pekerja-pekerja untuk tuaian itu.'",
        en: "Then he said to his disciples, 'The harvest is plentiful but the workers are few. Ask the Lord of the harvest, therefore, to send out workers into his harvest field.'",
        fr: "Alors il dit à ses disciples : La moisson est grande, mais il y a peu d’ouvriers. Priez donc le maître de la moisson d’envoyer des ouvriers dans sa moisson.",
        es: "Entonces dice á sus discípulos: A la verdad la mies es mucha, mas los obreros pocos. Rogad, pues, al Señor de la mies, que envíe obreros á su mies."
    },
    {
        ref: "Daniel 12:3",
        refEn: "Daniel 12:3",
        refFr: "Daniel 12:3",
        refEs: "Daniel 12:3",
        id: "Dan orang-orang bijaksana akan bercahaya seperti cahaya cakrawala, dan orang-orang yang telah menuntun banyak orang kepada kebenaran seperti bintang-bintang, selama-lamanya.",
        en: "Those who are wise will shine like the brightness of the heavens, and those who lead many to righteousness, like the stars for ever and ever.",
        fr: "Ceux qui auront été intelligents brilleront comme la splendeur du ciel, et ceux qui auront enseigné la justice, à la multitude brilleront comme les étoiles, à toujours et à perpétuité.",
        es: "Y los entendidos resplandecerán como el resplandor del firmamento; y los que enseñan á justicia la multitud, como las estrellas á perpetua eternidad."
    },
    {
        ref: "1 Korintus 9:22",
        refEn: "1 Corinthians 9:22",
        refFr: "1 Corinthiens 9:22",
        refEs: "1 Corintios 9:22",
        id: "Bagi orang-orang yang lemah aku menjadi seperti orang yang lemah, supaya aku dapat menyelamatkan mereka yang lemah. Bagi semua orang aku telah menjadi semua hal, supaya aku sedapat mungkin memenangkan beberapa orang dari antara mereka.",
        en: "To the weak I became weak, to win the weak. I have become all things to all people so that by all possible means I might save some.",
        fr: "J’ai été faible avec les faibles, afin de gagner les faibles. Je me suis fait tout à tous, afin d’en sauver de toute manière quelques-uns.",
        es: "Me he hecho á los flacos flaco, por ganar á los flacos: á todos me he hecho todo, para que de todo punto salve á algunos."
    },
    {
        ref: "Kisah Para Rasul 4:12",
        refEn: "Acts 4:12",
        refFr: "Actes des Apôtres 4:12",
        refEs: "Hechos 4:12",
        id: "Dan keselamatan tidak ada di dalam siapa pun juga selain di dalam Dia, sebab di bawah kolong langit ini tidak ada nama lain yang diberikan kepada manusia yang olehnya kita dapat diselamatkan.",
        en: "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved.",
        fr: "Il n’y a de salut en aucun autre ; car il n’y a sous le ciel aucun autre nom qui ait été donné parmi les hommes, par lequel nous devions être sauvés.",
        es: "Y en ningún otro hay salud; porque no hay otro nombre debajo del cielo, dado á los hombres, en que podamos ser salvos."
    },
    {
        ref: "Lukas 24:47",
        refEn: "Luke 24:47",
        refFr: "Luc 24:47",
        refEs: "Lucas 24:47",
        id: "Dan lagi: dalam nama-Nya berita tentang pertobatan dan pengampunan dosa harus disampaikan kepada segala bangsa, mulai dari Yerusalem.",
        en: "And repentance for the forgiveness of sins will be preached in his name to all nations, beginning at Jerusalem.",
        fr: "et que la repentance et le pardon des péchés seraient prêchés en son nom à toutes les nations, à commencer par Jérusalem.",
        es: "Y que se predicase en su nombre el arrepentimiento y la remisión de pecados en todas las naciones, comenzando de Jerusalem."
    },
    {
        ref: "Matius 4:19",
        refEn: "Matthew 4:19",
        refFr: "Matthieu 4:19",
        refEs: "Mateo 4:19",
        id: "Yesus berkata kepada mereka: 'Mari, ikutlah Aku, dan kamu akan Kujadikan penjala manusia.'",
        en: "Come, follow me, Jesus said, and I will send you out to fish for people.",
        fr: "Il leur dit : Suivez-moi , et je vous ferai pêcheurs d’hommes.",
        es: "Y díceles: Venid en pos de mí, y os haré pescadores de hombres."
    },
    {
        ref: "Yohanes 4:35",
        refEn: "John 4:35",
        refFr: "Jean 4:35",
        refEs: "Juan 4:35",
        id: "Bukankah kamu mengatakan: Empat bulan lagi tibalah musim menuai? Tetapi Aku berkata kepadamu: Lihatlah sekelilingmu dan pandanglah ladang-ladang yang sudah menguning dan matang untuk dituai.",
        en: "Don't you have a saying, 'It's still four months until harvest'? I tell you, open your eyes and look at the fields! They are ripe for harvest.",
        fr: "Ne dites-vous pas qu’il y a encore quatre mois jusqu’à la moisson ? Voici, je vous le dis, levez les yeux , et regardez les champs qui déjà blanchissent pour la moisson.",
        es: "¿No decís vosotros: Aun hay cuatro meses hasta que llegue la siega? He aquí os digo: Alzad vuestros ojos, y mirad las regiones, porque ya están blancas para la siega."
    },
    {
        ref: "Kisah Para Rasul 20:24",
        refEn: "Acts 20:24",
        refFr: "Actes des Apôtres 20:24",
        refEs: "Hechos 20:24",
        id: "Tetapi aku tidak menghiraukan nyawaku sedikit pun, asal saja aku dapat mencapai garis akhir dan menyelesaikan pelayanan yang ditugaskan oleh Tuhan Yesus kepadaku untuk memberi kesaksian tentang Injil kasih karunia Allah.",
        en: "However, I consider my life worth nothing to me; my only aim is to finish the race and complete the task the Lord Jesus has given me — the task of testifying to the good news of God's grace.",
        fr: "Mais je ne fais pour moi-même aucun cas de ma vie, comme si elle m’était précieuse, pourvu que j’accomplisse ma course avec joie, et le ministère que j’ai reçu du Seigneur Jésus, d’annoncer la bonne nouvelle de la grâce de Dieu.",
        es: "Mas de ninguna cosa hago caso, ni estimo mi vida preciosa para mí mismo; solamente que acabe mi carrera con gozo, y el ministerio que recibí del Señor Jesús, para dar testimonio del evangelio de la gracia de Dios."
    },
    {
        ref: "Roma 1:16",
        refEn: "Romans 1:16",
        refFr: "Romains 1:16",
        refEs: "Romanos 1:16",
        id: "Sebab aku mempunyai keyakinan yang kokoh dalam Injil, karena Injil adalah kekuatan Allah yang menyelamatkan setiap orang yang percaya, pertama-tama orang Yahudi, tetapi juga orang Yunani.",
        en: "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes: first to the Jew, then to the Gentile.",
        fr: "Car je n’ai point honte de l’Évangile : c’est une puissance de Dieu pour le salut de quiconque croit, du Juif premièrement, puis du Grec,",
        es: "Porque no me avergüenzo del evangelio: porque es potencia de Dios para salud á todo aquel que cree; al Judío primeramente y también al Griego."
    },
    {
        ref: "Lukas 15:4",
        refEn: "Luke 15:4",
        refFr: "Luc 15:4",
        refEs: "Lucas 15:4",
        id: "Siapakah di antara kamu yang mempunyai seratus ekor domba, dan jikalau ia kehilangan seekor di antaranya, tidak meninggalkan yang sembilan puluh sembilan ekor di padang gurun dan pergi mencari yang sesat itu sampai ia menemukannya?",
        en: "Suppose one of you has a hundred sheep and loses one of them. Doesn't he leave the ninety-nine in the open country and go after the lost sheep until he finds it?",
        fr: "Quel homme d’entre vous, s’il a cent brebis, et qu’il en perde une, ne laisse les quatre-vingt-dix-neuf autres dans le désert pour aller après celle qui est perdue, jusqu’à ce qu’il la retrouve ?",
        es: "¿Qué hombre de vosotros, teniendo cien ovejas, si perdiere una de ellas, no deja las noventa y nueve en el desierto, y va á la que se perdió, hasta que la halle?"
    },
    {
        ref: "Yohanes 17:18",
        refEn: "John 17:18",
        refFr: "Jean 17:18",
        refEs: "Juan 17:18",
        id: "Sama seperti Engkau telah mengutus Aku ke dalam dunia, demikian pula Aku telah mengutus mereka ke dalam dunia.",
        en: "As you sent me into the world, I have sent them into the world.",
        fr: "Comme tu m’as envoyé dans le monde, je les ai aussi envoyés dans le monde.",
        es: "Como tú me enviaste al mundo, también los he enviado al mundo."
    },
    {
        ref: "Kolose 4:5-6",
        refEn: "Colossians 4:5-6",
        refFr: "Colossiens 4:5-6",
        refEs: "Colosenses 4:5-6",
        id: "Hiduplah dengan penuh hikmat terhadap orang-orang luar, pergunakanlah waktu yang ada. Hendaklah kata-katamu senantiasa penuh kasih, jangan hambar, sehingga kamu tahu bagaimana kamu harus memberi jawab kepada setiap orang.",
        en: "Be wise in the way you act toward outsiders; make the most of every opportunity. Let your conversation be always full of grace, seasoned with salt, so that you may know how to answer everyone.",
        fr: "Conduisez-vous avec sagesse envers ceux du dehors, et rachetez le temps. Que votre parole soit toujours accompagnée de grâce, assaisonnée de sel, afin que vous sachiez comment il faut répondre à chacun.",
        es: "Andad en sabiduría para con los extraños, redimiendo el tiempo. Sea vuestra palabra siempre con gracia, sazonada con sal; para que sepáis cómo os conviene responder á cada uno."
    },
    {
        ref: "Mazmur 96:3",
        refEn: "Psalm 96:3",
        refFr: "Psaumes 96:3",
        refEs: "Salmos 96:3",
        id: "Ceritakanlah kemuliaan-Nya di antara bangsa-bangsa, perbuatan-perbuatan-Nya yang ajaib di antara segala suku bangsa.",
        en: "Declare his glory among the nations, his marvelous deeds among all peoples.",
        fr: "Racontez parmi les nations sa gloire, Parmi tous les peuples ses merveilles !",
        es: "Contad entre las gentes su gloria, en todos los pueblos sus maravillas."
    },
    {
        ref: "Kisah Para Rasul 2:47",
        refEn: "Acts 2:47",
        refFr: "Actes des Apôtres 2:47",
        refEs: "Hechos 2:47",
        id: "Sambil memuji Allah dan disukai semua orang. Dan tiap-tiap hari Tuhan menambah jumlah mereka dengan orang yang diselamatkan.",
        en: "Praising God and enjoying the favor of all the people. And the Lord added to their number daily those who were being saved.",
        fr: "louant Dieu, et trouvant grâce auprès de tout le peuple. Et le Seigneur ajoutait chaque jour à l’Église ceux qui étaient sauvés.",
        es: "Alabando á Dios, y teniendo gracia con todo el pueblo. Y el Señor añadía cada día á la iglesia los que habían de ser salvos."
    },

    // ===== PENGINJILAN / SALVATION =====
    {
        ref: "Yohanes 3:16",
        refEn: "John 3:16",
        refFr: "Jean 3:16",
        refEs: "Juan 3:16",
        id: "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.",
        en: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        fr: "Car Dieu a tant aimé le monde qu’il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu’il ait la vie éternelle.",
        es: "Porque de tal manera amó Dios al mundo, que ha dado á su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
    },
    {
        ref: "Roma 3:23",
        refEn: "Romans 3:23",
        refFr: "Romains 3:23",
        refEs: "Romanos 3:23",
        id: "Karena semua orang telah berbuat dosa dan telah kehilangan kemuliaan Allah.",
        en: "For all have sinned and fall short of the glory of God.",
        fr: "Car tous ont péché et sont privés de la gloire de Dieu ;",
        es: "Por cuanto todos pecaron, y están destituídos de la gloria de Dios;"
    },
    {
        ref: "Roma 6:23",
        refEn: "Romans 6:23",
        refFr: "Romains 6:23",
        refEs: "Romanos 6:23",
        id: "Sebab upah dosa ialah maut; tetapi karunia Allah ialah hidup yang kekal dalam Kristus Yesus, Tuhan kita.",
        en: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
        fr: "Car le salaire du péché, c’est la mort ; mais le don gratuit de Dieu, c’est la vie éternelle en Jésus-Christ notre Seigneur.",
        es: "Porque la paga del pecado es muerte: mas la dádiva de Dios es vida eterna en Cristo Jesús Señor nuestro."
    },
    {
        ref: "Roma 10:9",
        refEn: "Romans 10:9",
        refFr: "Romains 10:9",
        refEs: "Romanos 10:9",
        id: "Sebab jika kamu mengaku dengan mulutmu, bahwa Yesus adalah Tuhan, dan percaya dalam hatimu, bahwa Allah telah membangkitkan Dia dari antara orang mati, maka kamu akan diselamatkan.",
        en: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved.",
        fr: "Si tu confesses de ta bouche le Seigneur Jésus, et si tu crois dans ton cœur que Dieu l’a ressuscité des morts, tu seras sauvé.",
        es: "Que si confesares con tu boca al Señor Jesús, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo."
    },
    {
        ref: "Kisah Para Rasul 16:31",
        refEn: "Acts 16:31",
        refFr: "Actes des Apôtres 16:31",
        refEs: "Hechos 16:31",
        id: "Percayalah kepada Tuhan Yesus Kristus dan engkau akan selamat, engkau dan seisi rumahmu.",
        en: "Believe in the Lord Jesus, and you will be saved — you and your household.",
        fr: "Paul et Silas répondirent : Crois au Seigneur Jésus , et tu seras sauvé, toi et ta famille.",
        es: "Y ellos dijeron: Cree en el Señor Jesucristo, y serás salvo tú, y tu casa."
    },
    {
        ref: "Yohanes 14:6",
        refEn: "John 14:6",
        refFr: "Jean 14:6",
        refEs: "Juan 14:6",
        id: "Kata Yesus kepadanya: 'Akulah jalan dan kebenaran dan hidup. Tidak ada seorang pun yang datang kepada Bapa, kalau tidak melalui Aku.'",
        en: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
        fr: "Jésus lui dit : Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.",
        es: "Jesús le dice: Yo soy el camino, y la verdad, y la vida: nadie viene al Padre, sino por mí."
    },
    {
        ref: "Efesus 2:8-9",
        refEn: "Ephesians 2:8-9",
        refFr: "Éphésiens 2:8-9",
        refEs: "Efesios 2:8-9",
        id: "Sebab karena kasih karunia kamu diselamatkan oleh iman; itu bukan hasil usahamu, tetapi pemberian Allah, itu bukan hasil pekerjaanmu: jangan ada orang yang memegahkan diri.",
        en: "For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast.",
        fr: "Car c’est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c’est le don de Dieu. Ce n’est point par les œuvres, afin que personne ne se glorifie.",
        es: "Porque por gracia sois salvos por la fe; y esto no de vosotros, pues es don de Dios: No por obras, para que nadie se gloríe."
    },
    {
        ref: "2 Korintus 5:17",
        refEn: "2 Corinthians 5:17",
        refFr: "2 Corinthiens 5:17",
        refEs: "2 Corintios 5:17",
        id: "Jadi siapa yang ada di dalam Kristus, ia adalah ciptaan baru: yang lama sudah berlalu, sesungguhnya yang baru sudah datang.",
        en: "Therefore, if anyone is in Christ, the new creation has come: the old has gone, the new is here!",
        fr: "Si quelqu’un est en Christ, il est une nouvelle créature. Les choses anciennes sont passées ; voici, toutes choses sont devenues nouvelles.",
        es: "De modo que si alguno está en Cristo, nueva criatura es: las cosas viejas pasaron; he aquí todas son hechas nuevas."
    },
    {
        ref: "Yohanes 1:12",
        refEn: "John 1:12",
        refFr: "Jean 1:12",
        refEs: "Juan 1:12",
        id: "Tetapi semua orang yang menerima-Nya diberi-Nya kuasa supaya menjadi anak-anak Allah, yaitu mereka yang percaya dalam nama-Nya.",
        en: "Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God.",
        fr: "Mais à tous ceux qui l’ont reçue, à ceux qui croient en son nom, elle a donné le pouvoir de devenir enfants de Dieu, lesquels sont nés,",
        es: "Mas á todos los que le recibieron, dióles potestad de ser hechos hijos de Dios, á los que creen en su nombre:"
    },
    {
        ref: "1 Yohanes 5:11-12",
        refEn: "1 John 5:11-12",
        refFr: "1 Jean 5:11-12",
        refEs: "1 Juan 5:11-12",
        id: "Dan inilah kesaksian itu: Allah telah mengaruniakan hidup yang kekal kepada kita dan hidup itu ada di dalam Anak-Nya. Barangsiapa memiliki Anak, ia memiliki hidup; barangsiapa tidak memiliki Anak Allah, ia tidak memiliki hidup.",
        en: "And this is the testimony: God has given us eternal life, and this life is in his Son. Whoever has the Son has life; whoever does not have the Son of God does not have life.",
        fr: "Et voici ce témoignage, c’est que Dieu nous a donné la vie éternelle, et que cette vie est dans son Fils. Celui qui a le Fils a la vie ; celui qui n’a pas le Fils de Dieu n’a pas la vie.",
        es: "Y este es el testimonio: Que Dios nos ha dado vida eterna; y esta vida está en su Hijo. El que tiene al Hijo, tiene la vida: el que no tiene al Hijo de Dios, no tiene la vida."
    },

    // ===== KASIH / LOVE =====
    {
        ref: "1 Korintus 13:4-5",
        refEn: "1 Corinthians 13:4-5",
        refFr: "1 Corinthiens 13:4-5",
        refEs: "1 Corintios 13:4-5",
        id: "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong. Ia tidak melakukan yang tidak sopan dan tidak mencari keuntungan diri sendiri.",
        en: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking.",
        fr: "La charité est patiente, elle est pleine de bonté ; la charité n’est point envieuse ; la charité ne se vante point, elle ne s’enfle point d’orgueil, elle ne fait rien de malhonnête, elle ne cherche point son intérêt, elle ne s’irrite point, elle ne soupçonne point le mal,",
        es: "La caridad es sufrida, es benigna; la caridad no tiene envidia, la caridad no hace sinrazón, no se ensancha; No es injuriosa, no busca lo suyo, no se irrita, no piensa el mal;"
    },
    {
        ref: "1 Korintus 13:13",
        refEn: "1 Corinthians 13:13",
        refFr: "1 Corinthiens 13:13",
        refEs: "1 Corintios 13:13",
        id: "Demikianlah tinggal ketiga hal ini, yaitu iman, pengharapan dan kasih, dan yang paling besar di antaranya ialah kasih.",
        en: "And now these three remain: faith, hope and love. But the greatest of these is love.",
        fr: "Maintenant donc ces trois choses demeurent : la foi, l’espérance, la charité ; mais la plus grande de ces choses, c’est la charité.",
        es: "Y ahora permanecen la fe, la esperanza, y la caridad, estas tres: empero la mayor de ellas es la caridad."
    },
    {
        ref: "Yohanes 13:34-35",
        refEn: "John 13:34-35",
        refFr: "Jean 13:34-35",
        refEs: "Juan 13:34-35",
        id: "Aku memberikan perintah baru kepada kamu, yaitu supaya kamu saling mengasihi; sama seperti Aku telah mengasihi kamu demikian pula kamu harus saling mengasihi. Dengan demikian semua orang akan tahu, bahwa kamu adalah murid-murid-Ku, yaitu jikalau kamu saling mengasihi.",
        en: "A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another.",
        fr: "Je vous donne un commandement nouveau : Aimez-vous les uns les autres ; comme je vous ai aimés, vous aussi, aimez-vous les uns les autres. À ceci tous connaîtront que vous êtes mes disciples, si vous avez de l’amour les uns pour les autres.",
        es: "Un mandamiento nuevo os doy: Que os améis unos á otros: como os he amado, que también os améis los unos á los otros. En esto conocerán todos que sois mis discípulos, si tuviereis amor los unos con los otros."
    },
    {
        ref: "Yohanes 15:13",
        refEn: "John 15:13",
        refFr: "Jean 15:13",
        refEs: "Juan 15:13",
        id: "Tidak ada kasih yang lebih besar dari pada kasih seorang yang memberikan nyawanya untuk sahabat-sahabatnya.",
        en: "Greater love has no one than this: to lay down one's life for one's friends.",
        fr: "Il n’y a pas de plus grand amour que de donner sa vie pour ses amis.",
        es: "Nadie tiene mayor amor que este, que ponga alguno su vida por sus amigos."
    },
    {
        ref: "Roma 8:38-39",
        refEn: "Romans 8:38-39",
        refFr: "Romains 8:38-39",
        refEs: "Romanos 8:38-39",
        id: "Sebab aku yakin, bahwa baik maut, maupun hidup, baik malaikat-malaikat, maupun pemerintah-pemerintah, baik yang ada sekarang, maupun yang akan datang ... tidak akan dapat memisahkan kita dari kasih Allah, yang ada dalam Kristus Yesus, Tuhan kita.",
        en: "For I am convinced that neither death nor life, neither angels nor demons ... nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
        fr: "Car j’ai l’assurance que ni la mort ni la vie, ni les anges ni les dominations, ni les choses présentes ni les choses à venir, ni les puissances, ni la hauteur, ni la profondeur, ni aucune autre créature ne pourra nous séparer de l’amour de Dieu manifesté en Jésus-Christ notre Seigneur.",
        es: "Por lo cual estoy cierto que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades, ni lo presente, ni lo por venir, Ni lo alto, ni lo bajo, ni ninguna criatura nos podrá apartar del amor de Dios, que es en Cristo Jesús Señor nuestro."
    },
    {
        ref: "1 Yohanes 4:19",
        refEn: "1 John 4:19",
        refFr: "1 Jean 4:19",
        refEs: "1 Juan 4:19",
        id: "Kita mengasihi, karena Allah lebih dahulu mengasihi kita.",
        en: "We love because he first loved us.",
        fr: "Pour nous, nous l’aimons, parce qu’il nous a aimés le premier.",
        es: "Nosotros le amamos á él, porque él nos amó primero."
    },
    {
        ref: "1 Yohanes 4:8",
        refEn: "1 John 4:8",
        refFr: "1 Jean 4:8",
        refEs: "1 Juan 4:8",
        id: "Barangsiapa tidak mengasihi, ia tidak mengenal Allah, sebab Allah adalah kasih.",
        en: "Whoever does not love does not know God, because God is love.",
        fr: "Celui qui n’aime pas n’a pas connu Dieu, car Dieu est amour.",
        es: "El que no ama, no conoce á Dios; porque Dios es amor."
    },
    {
        ref: "Roma 5:8",
        refEn: "Romans 5:8",
        refFr: "Romains 5:8",
        refEs: "Romanos 5:8",
        id: "Akan tetapi Allah menunjukkan kasih-Nya kepada kita, oleh karena Kristus telah mati untuk kita, ketika kita masih berdosa.",
        en: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
        fr: "Mais Dieu prouve son amour envers nous, en ce que, lorsque nous étions encore des pécheurs, Christ est mort pour nous.",
        es: "Mas Dios encarece su caridad para con nosotros, porque siendo aún pecadores, Cristo murió por nosotros."
    },

    // ===== PENGHIBURAN / COMFORT =====
    {
        ref: "Mazmur 23:1-3",
        refEn: "Psalm 23:1-3",
        refFr: "Psaumes 23:1-3",
        refEs: "Salmos 23:1-3",
        id: "TUHAN adalah gembalaku, takkan kekurangan aku. Ia membaringkan aku di padang yang berumput hijau, Ia membimbing aku ke air yang tenang; Ia menyegarkan jiwaku.",
        en: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
        fr: "Cantique de David. L’Éternel est mon berger : je ne manquerai de rien. Il me fait reposer dans de verts pâturages, Il me dirige près des eaux paisibles. Il restaure mon âme, Il me conduit dans les sentiers de la justice, À cause de son nom.",
        es: "JEHOVÁ es mi pastor; nada me faltará. En lugares de delicados pastos me hará yacer: junto á aguas de reposo me pastoreará. Confortará mi alma; guiaráme por sendas de justicia por amor de su nombre."
    },
    {
        ref: "Yesaya 41:10",
        refEn: "Isaiah 41:10",
        refFr: "Ésaïe 41:10",
        refEs: "Isaías 41:10",
        id: "Janganlah takut, sebab Aku menyertai engkau, janganlah bimbang, sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong engkau; Aku akan memegang engkau dengan tangan kanan-Ku yang membawa kemenangan.",
        en: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
        fr: "Ne crains rien, car je suis avec toi ; Ne promène pas des regards inquiets, car je suis ton Dieu ; Je te fortifie, je viens à ton secours, Je te soutiens de ma droite triomphante.",
        es: "No temas, que yo soy contigo; no desmayes, que yo soy tu Dios que te esfuerzo: siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia."
    },
    {
        ref: "Matius 11:28-29",
        refEn: "Matthew 11:28-29",
        refFr: "Matthieu 11:28-29",
        refEs: "Mateo 11:28-29",
        id: "Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, Aku akan memberi kelegaan kepadamu. Pikullah kuk yang Kupasang dan belajarlah pada-Ku, karena Aku lemah lembut dan rendah hati dan jiwamu akan mendapat ketenangan.",
        en: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
        fr: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos. Prenez mon joug sur vous et recevez mes instructions, car je suis doux et humble de cœur ; et vous trouverez du repos pour vos âmes.",
        es: "Venid á mí todos los que estáis trabajados y cargados, que yo os haré descansar. Llevad mi yugo sobre vosotros, y aprended de mí, que soy manso y humilde de corazón; y hallaréis descanso para vuestras almas."
    },
    {
        ref: "Mazmur 46:2",
        refEn: "Psalm 46:1",
        refFr: "Psaumes 46:2",
        refEs: "Salmos 46:1",
        id: "Allah itu bagi kita tempat perlindungan dan kekuatan, sebagai penolong dalam kesesakan sangat terbukti.",
        en: "God is our refuge and strength, an ever-present help in trouble.",
        fr: "Dieu est pour nous un refuge et un appui, Un secours qui ne manque jamais dans la détresse.",
        es: "DIOS es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones."
    },
    {
        ref: "Yohanes 14:27",
        refEn: "John 14:27",
        refFr: "Jean 14:27",
        refEs: "Juan 14:27",
        id: "Damai sejahtera Kutinggalkan bagimu. Damai sejahtera-Ku Kuberikan kepadamu, dan apa yang Kuberikan tidak seperti yang diberikan oleh dunia kepadamu. Janganlah gelisah dan gentar hatimu.",
        en: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
        fr: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s’alarme point.",
        es: "La paz os dejo, mi paz os doy: no como el mundo la da, yo os la doy. No se turbe vuestro corazón, ni tenga miedo."
    },
    {
        ref: "Filipi 4:7",
        refEn: "Philippians 4:7",
        refFr: "Philippiens 4:7",
        refEs: "Filipenses 4:7",
        id: "Damai sejahtera Allah, yang melampaui segala akal, akan memelihara hati dan pikiranmu dalam Kristus Yesus.",
        en: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
        fr: "Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ.",
        es: "Y la paz de Dios, que sobrepuja todo entendimiento, guardará vuestros corazones y vuestros entendimientos en Cristo Jesús."
    },
    {
        ref: "Yeremia 29:11",
        refEn: "Jeremiah 29:11",
        refFr: "Jérémie 29:11",
        refEs: "Jeremías 29:11",
        id: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
        en: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
        fr: "Car je connais les projets que j’ai formés sur vous, dit l’Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l’espérance.",
        es: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis."
    },
    {
        ref: "2 Korintus 1:3-4",
        refEn: "2 Corinthians 1:3-4",
        refFr: "2 Corinthiens 1:3-4",
        refEs: "2 Corintios 1:3-4",
        id: "Terpujilah Allah, Bapa Tuhan kita Yesus Kristus, Bapa yang penuh belas kasihan dan Allah sumber segala penghiburan, yang menghibur kami dalam segala penderitaan kami, sehingga kami sanggup menghibur mereka, yang berada dalam bermacam-macam penderitaan.",
        en: "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble.",
        fr: "Béni soit Dieu, le Père de notre Seigneur Jésus-Christ, le Père des miséricordes et le Dieu de toute consolation, qui nous console dans toutes nos afflictions, afin que, par la consolation dont nous sommes l’objet de la part de Dieu, nous puissions consoler ceux qui se trouvent dans quelque affliction !",
        es: "Bendito sea el Dios y Padre del Señor Jesucristo, el Padre de misericordias, y el Dios de toda consolación, El cual nos consuela en todas nuestras tribulaciones, para que podamos también nosotros consolar á los que están en cualquiera angustia, con la consolación con que nosotros somos consolados de Dios."
    },
    {
        ref: "Roma 8:28",
        refEn: "Romans 8:28",
        refFr: "Romains 8:28",
        refEs: "Romanos 8:28",
        id: "Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia, yaitu bagi mereka yang terpanggil sesuai dengan rencana Allah.",
        en: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
        fr: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.",
        es: "Y sabemos que á los que á Dios aman, todas las cosas les ayudan á bien, es á saber, á los que conforme al propósito son llamados."
    },
    {
        ref: "Mazmur 34:19",
        refEn: "Psalm 34:18",
        refFr: "Psaumes 34:19",
        refEs: "Salmos 34:18",
        id: "TUHAN itu dekat kepada orang-orang yang patah hati, dan Ia menyelamatkan orang-orang yang remuk jiwanya.",
        en: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
        fr: "L’Éternel est près de ceux qui ont le cœur brisé, Et il sauve ceux qui ont l’esprit dans l’abattement.",
        es: "Cercano está Jehová á los quebrantados de corazón; y salvará á los contritos de espíritu."
    },
    {
        ref: "1 Petrus 5:7",
        refEn: "1 Peter 5:7",
        refFr: "1 Pierre 5:7",
        refEs: "1 Pedro 5:7",
        id: "Serahkanlah segala kekuatiranmu kepada-Nya, sebab Ia yang memelihara kamu.",
        en: "Cast all your anxiety on him because he cares for you.",
        fr: "et déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.",
        es: "Echando toda vuestra solicitud en él, porque él tiene cuidado de vosotros."
    },
    {
        ref: "Mazmur 121:1-2",
        refEn: "Psalm 121:1-2",
        refFr: "Psaumes 121:1-2",
        refEs: "Salmos 121:1-2",
        id: "Aku melayangkan mataku ke gunung-gunung; dari manakah akan datang pertolonganku? Pertolonganku ialah dari TUHAN, yang menjadikan langit dan bumi.",
        en: "I lift up my eyes to the mountains — where does my help come from? My help comes from the Lord, the Maker of heaven and earth.",
        fr: "Cantique des degrés. Je lève mes yeux vers les montagnes… D’où me viendra le secours ? Le secours me vient de l’Éternel, Qui a fait les cieux et la terre.",
        es: "ALZARÉ mis ojos á los montes, de donde vendrá mi socorro. Mi socorro viene de Jehová, que hizo los cielos y la tierra."
    },

    // ===== KEKUATAN / STRENGTH =====
    {
        ref: "Filipi 4:13",
        refEn: "Philippians 4:13",
        refFr: "Philippiens 4:13",
        refEs: "Filipenses 4:13",
        id: "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.",
        en: "I can do all this through him who gives me strength.",
        fr: "Je puis tout par celui qui me fortifie.",
        es: "Todo lo puedo en Cristo que me fortalece."
    },
    {
        ref: "Yesaya 40:31",
        refEn: "Isaiah 40:31",
        refFr: "Ésaïe 40:31",
        refEs: "Isaías 40:31",
        id: "Tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya; mereka berlari dan tidak menjadi lesu, mereka berjalan dan tidak menjadi lelah.",
        en: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
        fr: "Mais ceux qui se confient en l’Éternel renouvellent leur force. Ils prennent le vol comme les aigles ; Ils courent, et ne se lassent point, Ils marchent, et ne se fatiguent point.",
        es: "Mas los que esperan á Jehová tendrán nuevas fuerzas; levantarán las alas como águilas; correrán, y no se cansarán; caminarán, y no se fatigarán."
    },
    {
        ref: "Nehemia 8:10",
        refEn: "Nehemiah 8:10",
        refFr: "Néhémie 8:10",
        refEs: "Nehemías 8:10",
        id: "Janganlah kamu bersusah hati, sebab sukacita karena TUHAN itulah perlindunganmu!",
        en: "Do not grieve, for the joy of the Lord is your strength.",
        fr: "Ils leur dirent : Allez, mangez des viandes grasses et buvez des liqueurs douces, et envoyez des portions à ceux qui n’ont rien de préparé, car ce jour est consacré à notre Seigneur ; ne vous affligez pas, car la joie de l’Éternel sera votre force.",
        es: "Díjoles luego: Id, comed grosuras, y bebed vino dulce, y enviad porciones á los que no tienen prevenido; porque día santo es á nuestro Señor: y no os entristezcáis, porque el gozo de Jehová es vuestra fortaleza."
    },
    {
        ref: "2 Timotius 1:7",
        refEn: "2 Timothy 1:7",
        refFr: "2 Timothée 1:7",
        refEs: "2 Timoteo 1:7",
        id: "Sebab Allah memberikan kepada kita bukan roh ketakutan, melainkan roh yang membangkitkan kekuatan, kasih dan ketertiban.",
        en: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.",
        fr: "Car ce n’est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d’amour et de sagesse.",
        es: "Porque no nos ha dado Dios el espíritu de temor, sino el de fortaleza, y de amor, y de templanza."
    },
    {
        ref: "Mazmur 18:3",
        refEn: "Psalm 18:2",
        refFr: "Psaumes 18:3",
        refEs: "Salmos 18:2",
        id: "TUHAN adalah gunung batuku, kubu pertahananku dan penyelamatku, Allahku, gunung batuku, tempat aku berlindung, perisaiku, tanduk keselamatanku, kota bentengku!",
        en: "The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge, my shield and the horn of my salvation, my stronghold.",
        fr: "Éternel, mon rocher, ma forteresse, mon libérateur ! Mon Dieu, mon rocher, où je trouve un abri ! Mon bouclier, la force qui me sauve, ma haute retraite !",
        es: "Jehová, roca mía y castillo mío, y mi libertador; Dios mío, fuerte mío, en él confiaré; escudo mío, y el cuerno de mi salud, mi refugio."
    },
    {
        ref: "Efesus 6:10",
        refEn: "Ephesians 6:10",
        refFr: "Éphésiens 6:10",
        refEs: "Efesios 6:10",
        id: "Akhirnya, jadilah kuat di dalam Tuhan, di dalam kekuatan kuasa-Nya.",
        en: "Finally, be strong in the Lord and in his mighty power.",
        fr: "Au reste, fortifiez-vous dans le Seigneur, et par sa force toute-puissante.",
        es: "Por lo demás, hermanos míos, confortaos en el Señor, y en la potencia de su fortaleza."
    },
    {
        ref: "Yosua 1:9",
        refEn: "Joshua 1:9",
        refFr: "Josué 1:9",
        refEs: "Josué 1:9",
        id: "Bukankah telah Kuperintahkan kepadamu: kuatkan dan teguhkanlah hatimu? Janganlah kecut dan tawar hati, sebab TUHAN, Allahmu, menyertai engkau ke mana pun engkau pergi.",
        en: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
        fr: "Ne t’ai-je pas donné cet ordre : Fortifie-toi et prends courage ? Ne t’effraie point et ne t’épouvante point, car l’Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.",
        es: "Mira que te mando que te esfuerces y seas valiente: no temas ni desmayes, porque Jehová tu Dios será contigo en donde quiera que fueres."
    },
    {
        ref: "Mazmur 28:7",
        refEn: "Psalm 28:7",
        refFr: "Psaumes 28:7",
        refEs: "Salmos 28:7",
        id: "TUHAN adalah kekuatanku dan perisaiku; kepada-Nya hatiku percaya. Aku tertolong sebab itu beria-ria hatiku, dan dengan nyanyianku aku bersyukur kepada-Nya.",
        en: "The Lord is my strength and my shield; my heart trusts in him, and he helps me. My heart leaps for joy, and with my song I praise him.",
        fr: "L’Éternel est ma force et mon bouclier ; En lui mon cœur se confie, et je suis secouru ; J’ai de l’allégresse dans le cœur, Et je le loue par mes chants.",
        es: "Jehová es mi fortaleza y mi escudo: en él esperó mi corazón, y fuí ayudado; por lo que se gozó mi corazón, y con mi canción le alabaré."
    },

    // ===== IMAN / FAITH =====
    {
        ref: "Ibrani 11:1",
        refEn: "Hebrews 11:1",
        refFr: "Hébreux 11:1",
        refEs: "Hebreos 11:1",
        id: "Iman adalah dasar dari segala sesuatu yang kita harapkan dan bukti dari segala sesuatu yang tidak kita lihat.",
        en: "Now faith is confidence in what we hope for and assurance about what we do not see.",
        fr: "Or la foi est une ferme assurance des choses qu’on espère, une démonstration de celles qu’on ne voit pas.",
        es: "ES pues la fe la sustancia de las cosas que se esperan, la demostración de las cosas que no se ven."
    },
    {
        ref: "Matius 17:20",
        refEn: "Matthew 17:20",
        refFr: "Matthieu 17:20",
        refEs: "Mateo 17:20",
        id: "Yesus berkata kepada mereka: 'Karena kamu kurang percaya. Sebab Aku berkata kepadamu: Sesungguhnya sekiranya kamu mempunyai iman sebesar biji sesawi saja kamu dapat berkata kepada gunung ini: Pindah dari tempat ini ke sana, maka gunung ini akan pindah.'",
        en: "He replied, 'Because you have so little faith. Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, Move from here to there, and it will move.'",
        fr: "C’est à cause de votre incrédulité, leur dit Jésus. Je vous le dis en vérité, si vous aviez de la foi comme un grain de sénevé, vous diriez à cette montagne : Transporte-toi d’ici là, et elle se transporterait ; rien ne vous serait impossible.",
        es: "Y Jesús les dijo: Por vuestra incredulidad; porque de cierto os digo, que si tuviereis fe como un grano de mostaza, diréis á este monte: Pásate de aquí allá: y se pasará: y nada os será imposible."
    },
    {
        ref: "Roma 1:17",
        refEn: "Romans 1:17",
        refFr: "Romains 1:17",
        refEs: "Romanos 1:17",
        id: "Sebab di dalamnya nyata kebenaran Allah, yang bertolak dari iman dan memimpin kepada iman, seperti ada tertulis: 'Orang benar akan hidup oleh iman.'",
        en: "For in the gospel the righteousness of God is revealed — a righteousness that is by faith from first to last, just as it is written: 'The righteous will live by faith.'",
        fr: "parce qu’en lui est révélée la justice de Dieu par la foi et pour la foi, selon qu’il est écrit : Le juste vivra par la foi.",
        es: "Porque en él la justicia de Dios se descubre de fe en fe; como está escrito: Mas el justo vivirá por la fe."
    },
    {
        ref: "Markus 11:24",
        refEn: "Mark 11:24",
        refFr: "Marc 11:24",
        refEs: "Marcos 11:24",
        id: "Karena itu Aku berkata kepadamu: apa saja yang kamu minta dan doakan, percayalah bahwa kamu telah menerimanya, maka hal itu akan diberikan kepadamu.",
        en: "Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.",
        fr: "C’est pourquoi je vous dis : Tout ce que vous demanderez en priant, croyez que vous l’avez reçu, et vous le verrez s’accomplir.",
        es: "Por tanto, os digo que todo lo que orando pidiereis, creed que lo recibiréis, y os vendrá."
    },
    {
        ref: "2 Korintus 5:7",
        refEn: "2 Corinthians 5:7",
        refFr: "2 Corinthiens 5:7",
        refEs: "2 Corintios 5:7",
        id: "Sebab hidup kami ini adalah hidup karena percaya, bukan karena melihat.",
        en: "For we live by faith, not by sight.",
        fr: "car nous marchons par la foi et non par la vue,",
        es: "(Porque por fe andamos, no por vista;)"
    },
    {
        ref: "Ibrani 12:2",
        refEn: "Hebrews 12:2",
        refFr: "Hébreux 12:2",
        refEs: "Hebreos 12:2",
        id: "Marilah kita melakukannya dengan mata yang tertuju kepada Yesus, yang memimpin kita dalam iman, dan yang membawa iman kita itu kepada kesempurnaan.",
        en: "Fixing our eyes on Jesus, the pioneer and perfecter of faith.",
        fr: "ayant les regards sur Jésus, le chef et le consommateur de la foi, qui, en vue de la joie qui lui était réservée, a souffert la croix, méprisé l’ignominie, et s’est assis à la droite du trône de Dieu.",
        es: "Puestos los ojos en al autor y consumador de la fe, en Jesús; el cual, habiéndole sido propuesto gozo, sufrió la cruz, menospreciando la vergüenza, y sentóse á la diestra del trono de Dios."
    },

    // ===== PENGHARAPAN / HOPE =====
    {
        ref: "Roma 15:13",
        refEn: "Romans 15:13",
        refFr: "Romains 15:13",
        refEs: "Romanos 15:13",
        id: "Semoga Allah, sumber pengharapan, memenuhi kamu dengan segala sukacita dan damai sejahtera dalam iman kamu, supaya oleh kekuatan Roh Kudus kamu berlimpah-limpah dalam pengharapan.",
        en: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
        fr: "Que le Dieu de l’espérance vous remplisse de toute joie et de toute paix dans la foi, pour que vous abondiez en espérance, par la puissance du Saint-Esprit !",
        es: "Y el Dios de esperanza os llene de todo gozo y paz creyendo, para que abundéis en esperanza por la virtud del Espíritu Santo."
    },
    {
        ref: "Ratapan 3:22-23",
        refEn: "Lamentations 3:22-23",
        refFr: "Lamentations 3:22-23",
        refEs: "Lamentaciones 3:22-23",
        id: "Tak berkesudahan kasih setia TUHAN, tak habis-habisnya rahmat-Nya, selalu baru tiap pagi; besar kesetiaan-Mu!",
        en: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
        fr: "Les bontés de l’Éternel ne sont pas épuisées, Ses compassions ne sont pas à leur terme ; Elles se renouvellent chaque matin. Oh ! que ta fidélité est grande !",
        es: "Es por la misericordia de Jehová que no somos consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad."
    },
    {
        ref: "Mazmur 42:6",
        refEn: "Psalm 42:5",
        refFr: "Psaumes 42:6",
        refEs: "Salmos 42:5",
        id: "Mengapa engkau tertekan, hai jiwaku, dan mengapa engkau gelisah di dalam diriku? Berharaplah kepada Allah! Sebab aku bersyukur lagi kepada-Nya, penolongku dan Allahku!",
        en: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God.",
        fr: "Pourquoi t’abats-tu, mon âme, et gémis-tu au dedans de moi ? Espère en Dieu, car je le louerai encore ; Il est mon salut et mon Dieu.",
        es: "¿Por qué te abates, oh alma mía, y te conturbas en mí? Espera á Dios; porque aun le tengo de alabar por las saludes de su presencia."
    },
    {
        ref: "Wahyu 21:4",
        refEn: "Revelation 21:4",
        refFr: "Apocalypse 21:4",
        refEs: "Apocalipsis 21:4",
        id: "Dan Ia akan menghapus segala air mata dari mata mereka, dan maut tidak akan ada lagi; tidak akan ada lagi perkabungan, atau ratap tangis, atau dukacita, sebab segala sesuatu yang lama itu telah berlalu.",
        en: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
        fr: "Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n’y aura plus ni deuil, ni cri, ni douleur, car les premières choses ont disparu.",
        es: "Y limpiará Dios toda lágrima de los ojos de ellos; y la muerte no será más; y no habrá más llanto, ni clamor, ni dolor: porque las primeras cosas son pasadas."
    },
    {
        ref: "Yohanes 11:25",
        refEn: "John 11:25",
        refFr: "Jean 11:25",
        refEs: "Juan 11:25",
        id: "Kata Yesus kepadanya: 'Akulah kebangkitan dan hidup; barangsiapa percaya kepada-Ku, ia akan hidup walaupun ia sudah mati.'",
        en: "Jesus said to her, 'I am the resurrection and the life. The one who believes in me will live, even though they die.'",
        fr: "Jésus lui dit : Je suis la résurrection et la vie. Celui qui croit en moi vivra, quand même il serait mort ;",
        es: "Dícele Jesús: Yo soy la resurrección y la vida: el que cree en mí, aunque esté muerto, vivirá."
    },

    // ===== DOA / PRAYER =====
    {
        ref: "Filipi 4:6-7",
        refEn: "Philippians 4:6-7",
        refFr: "Philippiens 4:6-7",
        refEs: "Filipenses 4:6-7",
        id: "Janganlah hendaknya kamu kuatir tentang apa pun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur. Damai sejahtera Allah, yang melampaui segala akal, akan memelihara hati dan pikiranmu dalam Kristus Yesus.",
        en: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
        fr: "Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces. Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ.",
        es: "Por nada estéis afanosos; sino sean notorias vuestras peticiones delante de Dios en toda oración y ruego, con hacimiento de gracias. Y la paz de Dios, que sobrepuja todo entendimiento, guardará vuestros corazones y vuestros entendimientos en Cristo Jesús."
    },
    {
        ref: "Matius 7:7-8",
        refEn: "Matthew 7:7-8",
        refFr: "Matthieu 7:7-8",
        refEs: "Mateo 7:7-8",
        id: "Mintalah, maka akan diberikan kepadamu; carilah, maka kamu akan mendapat; ketuklah, maka pintu akan dibukakan bagimu. Karena setiap orang yang meminta, menerima dan setiap orang yang mencari, mendapat dan setiap orang yang mengetuk, baginya pintu dibukakan.",
        en: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you. For everyone who asks receives; the one who seeks finds; and to the one who knocks, the door will be opened.",
        fr: "Demandez, et l’on vous donnera ; cherchez, et vous trouverez ; frappez, et l’on vous ouvrira. Car quiconque demande reçoit, celui qui cherche trouve, et l’on ouvre à celui qui frappe.",
        es: "Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá. Porque cualquiera que pide, recibe; y el que busca, halla; y al que llama, se abrirá."
    },
    {
        ref: "1 Yohanes 5:14",
        refEn: "1 John 5:14",
        refFr: "1 Jean 5:14",
        refEs: "1 Juan 5:14",
        id: "Dan inilah keberanian percaya kita kepada-Nya, yaitu bahwa Ia mengabulkan doa kita, jikalau kita meminta sesuatu kepada-Nya menurut kehendak-Nya.",
        en: "This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us.",
        fr: "Nous avons auprès de lui cette assurance, que si nous demandons quelque chose selon sa volonté, il nous écoute.",
        es: "Y esta es la confianza que tenemos en él, que si demandáremos alguna cosa conforme á su voluntad, él nos oye."
    },
    {
        ref: "Yakobus 5:16",
        refEn: "James 5:16",
        refFr: "Jacques 5:16",
        refEs: "Santiago 5:16",
        id: "Karena itu hendaklah kamu saling mengaku dosamu dan saling mendoakan, supaya kamu sembuh. Doa orang yang benar, bila dengan yakin didoakan, sangat besar kuasanya.",
        en: "Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous person is powerful and effective.",
        fr: "Confessez donc vos péchés les uns aux autres, et priez les uns pour les autres, afin que vous soyez guéris. La prière fervente du juste a une grande efficace.",
        es: "Confesaos vuestras faltas unos á otros, y rogad los unos por los otros, para que seáis sanos; la oración del justo, obrando eficazmente, puede mucho."
    },
    {
        ref: "Roma 8:26",
        refEn: "Romans 8:26",
        refFr: "Romains 8:26",
        refEs: "Romanos 8:26",
        id: "Demikian juga Roh membantu kita dalam kelemahan kita; sebab kita tidak tahu, bagaimana sebenarnya harus berdoa; tetapi Roh sendiri berdoa untuk kita kepada Allah dengan keluhan-keluhan yang tidak terucapkan.",
        en: "In the same way, the Spirit helps us in our weakness. We do not know what we ought to pray for, but the Spirit himself intercedes for us through wordless groans.",
        fr: "De même aussi l’Esprit nous aide dans notre faiblesse, car nous ne savons pas ce qu’il nous convient de demander dans nos prières. Mais l’Esprit lui-même intercède par des soupirs inexprimables ;",
        es: "Y asimismo también el Espíritu ayuda nuestra flaqueza: porque qué hemos de pedir como conviene, no lo sabemos; sino que el mismo Espíritu pide por nosotros con gemidos indecibles."
    },

    // ===== FIRMAN ALLAH / GOD'S WORD =====
    {
        ref: "Mazmur 119:105",
        refEn: "Psalm 119:105",
        refFr: "Psaumes 119:105",
        refEs: "Salmos 119:105",
        id: "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku.",
        en: "Your word is a lamp for my feet, a light on my path.",
        fr: "Ta parole est une lampe à mes pieds, Et une lumière sur mon sentier.",
        es: "NUN. Lámpara es á mis pies tu palabra, y lumbrera á mi camino."
    },
    {
        ref: "2 Timotius 3:16-17",
        refEn: "2 Timothy 3:16-17",
        refFr: "2 Timothée 3:16-17",
        refEs: "2 Timoteo 3:16-17",
        id: "Segala tulisan yang diilhamkan Allah memang bermanfaat untuk mengajar, untuk menyatakan kesalahan, untuk memperbaiki kelakuan dan untuk mendidik orang dalam kebenaran. Dengan demikian tiap-tiap manusia kepunyaan Allah diperlengkapi untuk setiap perbuatan baik.",
        en: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.",
        fr: "Toute Écriture est inspirée de Dieu, et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la justice, afin que l’homme de Dieu soit accompli et propre à toute bonne œuvre.",
        es: "Toda Escritura es inspirada divinamente y útil para enseñar, para redargüir, para corregir, para instituir en justicia, Para que el hombre de Dios sea perfecto, enteramente instruído para toda buena obra."
    },
    {
        ref: "Ibrani 4:12",
        refEn: "Hebrews 4:12",
        refFr: "Hébreux 4:12",
        refEs: "Hebreos 4:12",
        id: "Sebab firman Allah hidup dan kuat dan lebih tajam dari pada pedang bermata dua mana pun; ia menusuk amat dalam sampai memisahkan jiwa dan roh, sendi-sendi dan sumsum; ia sanggup membedakan pertimbangan dan pikiran hati kita.",
        en: "For the word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart.",
        fr: "Car la parole de Dieu est vivante et efficace, plus tranchante qu’une épée quelconque à deux tranchants, pénétrante jusqu’à partager âme et esprit, jointures et moelles ; elle juge les sentiments et les pensées du cœur.",
        es: "Porque la palabra de Dios es viva y eficaz, y más penetrante que toda espada de dos filos: y que alcanza hasta partir el alma, y aun el espíritu, y las coyunturas y tuétanos, y discierne los pensamientos y las intenciones del corazón."
    },
    {
        ref: "Yesaya 40:8",
        refEn: "Isaiah 40:8",
        refFr: "Ésaïe 40:8",
        refEs: "Isaías 40:8",
        id: "Rumput menjadi kering, bunga menjadi layu, tetapi firman Allah kita tetap untuk selama-lamanya.",
        en: "The grass withers and the flowers fall, but the word of our God endures forever.",
        fr: "L’herbe sèche, la fleur tombe ; Mais la parole de notre Dieu subsiste éternellement.",
        es: "Sécase la hierba, cáese la flor: mas la palabra del Dios nuestro permanece para siempre."
    },
    {
        ref: "Yohanes 8:32",
        refEn: "John 8:32",
        refFr: "Jean 8:32",
        refEs: "Juan 8:32",
        id: "Dan kamu akan mengetahui kebenaran, dan kebenaran itu akan memerdekakan kamu.",
        en: "Then you will know the truth, and the truth will set you free.",
        fr: "vous connaîtrez la vérité, et la vérité vous affranchira.",
        es: "Y conoceréis la verdad, y la verdad os libertará."
    },

    // ===== PUJIAN & SYUKUR / PRAISE & THANKSGIVING =====
    {
        ref: "Mazmur 100:1-3",
        refEn: "Psalm 100:1-3",
        refFr: "Psaumes 100:1-3",
        refEs: "Salmos 100:1-3",
        id: "Bersorak-soraklah bagi TUHAN, hai seluruh bumi! Beribadahlah kepada TUHAN dengan sukacita, datanglah ke hadapan-Nya dengan sorak-sorai! Ketahuilah, bahwa TUHANlah Allah; Dialah yang menjadikan kita.",
        en: "Shout for joy to the Lord, all the earth. Worship the Lord with gladness; come before him with joyful songs. Know that the Lord is God. It is he who made us.",
        fr: "Psaume de louange. Poussez vers l’Éternel des cris de joie, Vous tous, habitants de la terre ! Servez l’Éternel, avec joie, Venez avec allégresse en sa présence ! Sachez que l’Éternel est Dieu ! C’est lui qui nous a faits, et nous lui appartenons ; Nous sommes son peuple, et le troupeau de son pâturage.",
        es: "CANTAD alegres á Dios, habitantes de toda la tierra. Servid á Jehová con alegría: venid ante su acatamiento con regocijo. Reconoced que Jehová él es Dios: él nos hizo, y no nosotros á nosotros mismos; pueblo suyo somos, y ovejas de su prado."
    },
    {
        ref: "Mazmur 150:6",
        refEn: "Psalm 150:6",
        refFr: "Psaumes 150:6",
        refEs: "Salmos 150:6",
        id: "Biarlah segala yang bernafas memuji TUHAN! Haleluya!",
        en: "Let everything that has breath praise the Lord. Praise the Lord.",
        fr: "Que tout ce qui respire loue l’Éternel ! Louez l’Éternel !",
        es: "Todo lo que respira alabe á JAH. Aleluya."
    },
    {
        ref: "1 Tesalonika 5:16-18",
        refEn: "1 Thessalonians 5:16-18",
        refFr: "1 Thessaloniciens 5:16-18",
        refEs: "1 Tesalonicenses 5:16-18",
        id: "Bersukacitalah senantiasa. Tetaplah berdoa. Mengucap syukurlah dalam segala hal, sebab itulah yang dikehendaki Allah di dalam Kristus Yesus bagi kamu.",
        en: "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
        fr: "Soyez toujours joyeux. Priez sans cesse. Rendez grâces en toutes choses, car c’est à votre égard la volonté de Dieu en Jésus-Christ.",
        es: "Estad siempre gozosos. Orad sin cesar. Dad gracias en todo; porque esta es la voluntad de Dios para con vosotros en Cristo Jesús."
    },
    {
        ref: "Mazmur 9:2-3",
        refEn: "Psalm 9:1-2",
        refFr: "Psaumes 9:2-3",
        refEs: "Salmos 9:1-2",
        id: "Aku mau bersyukur kepada TUHAN dengan segenap hatiku, aku mau menceritakan segala perbuatan-Mu yang ajaib; aku mau bersukacita dan beria-ria karena Engkau, bermazmur bagi nama-Mu, ya Yang Mahatinggi.",
        en: "I will give thanks to you, Lord, with all my heart; I will tell of all your wonderful deeds. I will be glad and rejoice in you; I will sing the praises of your name, O Most High.",
        fr: "Je louerai l’Éternel de tout mon cœur, Je raconterai toutes tes merveilles. Je ferai de toi le sujet de ma joie et de mon allégresse, Je chanterai ton nom, Dieu Très-Haut !",
        es: "TE alabaré, oh Jehová, con todo mi corazón; contaré todas tus maravillas. Alegraréme y regocijaréme en ti: cantaré á tu nombre, oh Altísimo;"
    },
    {
        ref: "Efesus 5:19-20",
        refEn: "Ephesians 5:19-20",
        refFr: "Éphésiens 5:19-20",
        refEs: "Efesios 5:19-20",
        id: "Berkata-katalah seorang kepada yang lain dalam mazmur, kidung puji-pujian dan nyanyian rohani. Bernyanyi dan bersoraklah bagi Tuhan dengan segenap hati. Ucapkanlah syukur senantiasa atas segala sesuatu dalam nama Tuhan kita Yesus Kristus.",
        en: "Speak to one another with psalms, hymns, and songs from the Spirit. Sing and make music from your heart to the Lord, always giving thanks to God the Father for everything, in the name of our Lord Jesus Christ.",
        fr: "entretenez-vous par des psaumes, par des hymnes, et par des cantiques spirituels, chantant et célébrant de tout votre cœur les louanges du Seigneur ; rendez continuellement grâces pour toutes choses à Dieu le Père, au nom de notre Seigneur Jésus-Christ,",
        es: "Hablando entre vosotros con salmos, y con himnos, y canciones espirituales, cantando y alabando al Señor en vuestros corazones; Dando gracias siempre de todo al Dios y Padre en el nombre de nuestro Señor Jesucristo:"
    },
    {
        ref: "Mazmur 34:2",
        refEn: "Psalm 34:1",
        refFr: "Psaumes 34:2",
        refEs: "Salmos 34:1",
        id: "Aku hendak memuji TUHAN pada segala waktu; puji-pujian kepada-Nya tetap di dalam mulutku.",
        en: "I will extol the Lord at all times; his praise will always be on my lips.",
        fr: "Je bénirai l’Éternel en tout temps ; Sa louange sera toujours dans ma bouche.",
        es: "BENDECIRÉ á Jehová en todo tiempo; su alabanza será siempre en mi boca."
    },

    // ===== BERKAT / BLESSING =====
    {
        ref: "Bilangan 6:24-26",
        refEn: "Numbers 6:24-26",
        refFr: "Nombres 6:24-26",
        refEs: "Números 6:24-26",
        id: "TUHAN memberkati engkau dan melindungi engkau; TUHAN menyinari engkau dengan wajah-Nya dan memberi engkau kasih karunia; TUHAN menghadapkan wajah-Nya kepadamu dan memberi engkau damai sejahtera.",
        en: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.",
        fr: "Que l’Éternel te bénisse, et qu’il te garde ! Que l’Éternel fasse luire sa face sur toi, et qu’il t’accorde sa grâce ! Que l’Éternel tourne sa face vers toi, et qu’il te donne la paix !",
        es: "Jehová te bendiga, y te guarde: Haga resplandecer Jehová su rostro sobre ti, y haya de ti misericordia: Jehová alce á ti su rostro, y ponga en ti paz."
    },
    {
        ref: "Mazmur 1:1-2",
        refEn: "Psalm 1:1-2",
        refFr: "Psaumes 1:1-2",
        refEs: "Salmos 1:1-2",
        id: "Berbahagialah orang yang tidak berjalan menurut nasihat orang fasik, yang tidak berdiri di jalan orang berdosa, dan yang tidak duduk dalam kumpulan pencemooh, tetapi yang kesukaannya ialah Taurat TUHAN, dan yang merenungkan Taurat itu siang dan malam.",
        en: "Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers, but whose delight is in the law of the Lord, and who meditates on his law day and night.",
        fr: "Heureux l’homme qui ne marche pas selon le conseil des méchants, Qui ne s’arrête pas sur la voie des pécheurs, Et qui ne s’assied pas en compagnie des moqueurs, Mais qui trouve son plaisir dans la loi de l’Éternel, Et qui la médite jour et nuit !",
        es: "BIENAVENTURADO el varón que no anduvo en consejo de malos, ni estuvo en camino de pecadores, ni en silla de escarnecedores se ha sentado; Antes en la ley de Jehová está su delicia, y en su ley medita de día y de noche."
    },
    {
        ref: "Maleakhi 3:10",
        refEn: "Malachi 3:10",
        refFr: "Malachie 3:10",
        refEs: "Malaquías 3:10",
        id: "Bawalah seluruh persembahan persepuluhan itu ke dalam rumah perbendaharaan, supaya ada persediaan makanan di rumah-Ku dan ujilah Aku, firman TUHAN semesta alam, apakah Aku tidak membukakan bagimu tingkap-tingkap langit dan mencurahkan berkat kepadamu sampai berkelimpahan.",
        en: "Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this, says the Lord Almighty, and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it.",
        fr: "Apportez à la maison du trésor toutes les dîmes, Afin qu’il y ait de la nourriture dans ma maison ; Mettez-moi de la sorte à l’épreuve, Dit l’Éternel des armées. Et vous verrez si je n’ouvre pas pour vous les écluses des cieux, Si je ne répands pas sur vous la bénédiction en abondance.",
        es: "Traed todos los diezmos al alfolí, y haya alimento en mi casa; y probadme ahora en esto, dice Jehová de los ejércitos, si no os abriré las ventanas de los cielos, y vaciaré sobre vosotros bendición hasta que sobreabunde."
    },
    {
        ref: "Efesus 1:3",
        refEn: "Ephesians 1:3",
        refFr: "Éphésiens 1:3",
        refEs: "Efesios 1:3",
        id: "Terpujilah Allah dan Bapa Tuhan kita Yesus Kristus yang dalam Kristus telah mengaruniakan kepada kita segala berkat rohani di dalam surga.",
        en: "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ.",
        fr: "Béni soit Dieu, le Père de notre Seigneur Jésus-Christ, qui nous a bénis de toutes sortes de bénédictions spirituelles dans les lieux célestes en Christ !",
        es: "Bendito el Dios y Padre del Señor nuestro Jesucristo, el cual nos bendijo con toda bendición espiritual en lugares celestiales en Cristo:"
    },

    // ===== HIKMAT / WISDOM =====
    {
        ref: "Amsal 3:5-6",
        refEn: "Proverbs 3:5-6",
        refFr: "Proverbes 3:5-6",
        refEs: "Proverbios 3:5-6",
        id: "Percayalah kepada TUHAN dengan segenap hatimu dan janganlah bersandar kepada pengertianmu sendiri. Akuilah Dia dalam segala lakumu, maka Ia akan meluruskan jalanmu.",
        en: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        fr: "Confie-toi en l’Éternel de tout ton cœur, Et ne t’appuie pas sur ta sagesse ; Reconnais-le dans toutes tes voies, Et il aplanira tes sentiers.",
        es: "Fíate de Jehová de todo tu corazón, y no estribes en tu prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas."
    },
    {
        ref: "Yakobus 1:5",
        refEn: "James 1:5",
        refFr: "Jacques 1:5",
        refEs: "Santiago 1:5",
        id: "Tetapi apabila di antara kamu ada yang kekurangan hikmat, hendaklah ia memintakannya kepada Allah — yang memberikan kepada semua orang dengan murah hati dan dengan tidak membangkit-bangkit —, maka hal itu akan diberikan kepadanya.",
        en: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
        fr: "Si quelqu’un d’entre vous manque de sagesse, qu’il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée.",
        es: "Y si alguno de vosotros tiene falta de sabiduría, demándela á Dios, el cual da á todos abundantemente, y no zahiere; y le será dada."
    },
    {
        ref: "Amsal 16:9",
        refEn: "Proverbs 16:9",
        refFr: "Proverbes 16:9",
        refEs: "Proverbios 16:9",
        id: "Hati manusia memikir-mikirkan jalannya, tetapi TUHANlah yang menentukan arah langkahnya.",
        en: "In their hearts humans plan their course, but the Lord establishes their steps.",
        fr: "Le cœur de l’homme médite sa voie, Mais c’est l’Éternel qui dirige ses pas.",
        es: "El corazón del hombre piensa su camino: mas Jehová endereza sus pasos."
    },
    {
        ref: "Amsal 1:7",
        refEn: "Proverbs 1:7",
        refFr: "Proverbes 1:7",
        refEs: "Proverbios 1:7",
        id: "Takut akan TUHAN adalah permulaan pengetahuan, tetapi orang bodoh menghina hikmat dan didikan.",
        en: "The fear of the Lord is the beginning of wisdom, but fools despise wisdom and instruction.",
        fr: "La crainte de l’Éternel est le commencement de la science ; Les insensés méprisent la sagesse et l’instruction.",
        es: "El principio de la sabiduría es el temor de Jehová: los insensatos desprecian la sabiduría y la enseñanza."
    },
    {
        ref: "Kolose 3:17",
        refEn: "Colossians 3:17",
        refFr: "Colossiens 3:17",
        refEs: "Colosenses 3:17",
        id: "Dan segala sesuatu yang kamu lakukan dengan perkataan atau perbuatan, lakukanlah semuanya itu dalam nama Tuhan Yesus, sambil mengucap syukur oleh Dia kepada Allah, Bapa kita.",
        en: "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him.",
        fr: "Et quoi que vous fassiez, en parole ou en œuvre, faites tout au nom du Seigneur Jésus, en rendant par lui des actions de grâces à Dieu le Père.",
        es: "Y todo lo que hacéis, sea de palabra, ó de hecho, hacedlo todo en el nombre del Señor Jesús, dando gracias á Dios Padre por él."
    },

    // ===== PEMELIHARAAN ALLAH / GOD'S PROVISION =====
    {
        ref: "Matius 6:33",
        refEn: "Matthew 6:33",
        refFr: "Matthieu 6:33",
        refEs: "Mateo 6:33",
        id: "Tetapi carilah dahulu Kerajaan Allah dan kebenaran-Nya, maka semuanya itu akan ditambahkan kepadamu.",
        en: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
        fr: "Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.",
        es: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas."
    },
    {
        ref: "Filipi 4:19",
        refEn: "Philippians 4:19",
        refFr: "Philippiens 4:19",
        refEs: "Filipenses 4:19",
        id: "Allahku akan memenuhi segala keperluanmu menurut kekayaan dan kemuliaan-Nya dalam Kristus Yesus.",
        en: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
        fr: "Et mon Dieu pourvoira à tous vos besoins selon sa richesse, avec gloire, en Jésus-Christ.",
        es: "Mi Dios, pues, suplirá todo lo que os falta conforme á sus riquezas en gloria en Cristo Jesús."
    },
    {
        ref: "Matius 6:26",
        refEn: "Matthew 6:26",
        refFr: "Matthieu 6:26",
        refEs: "Mateo 6:26",
        id: "Pandanglah burung-burung di langit, yang tidak menabur dan tidak menuai dan tidak mengumpulkan bekal dalam lumbung, namun diberi makan oleh Bapamu yang di sorga. Bukankah kamu jauh melebihi burung-burung itu?",
        en: "Look at the birds of the air; they do not sow or reap or store away in barns, and yet your heavenly Father feeds them. Are you not much more valuable than they?",
        fr: "Regardez les oiseaux du ciel : ils ne sèment ni ne moissonnent, et ils n’amassent rien dans des greniers ; et votre Père céleste les nourrit. Ne valez-vous pas beaucoup plus qu’eux ?",
        es: "Mirad las aves del cielo, que no siembran, ni siegan, ni allegan en alfolíes; y vuestro Padre celestial las alimenta. ¿No sois vosotros mucho mejores que ellas?"
    },
    {
        ref: "Mazmur 37:4",
        refEn: "Psalm 37:4",
        refFr: "Psaumes 37:4",
        refEs: "Salmos 37:4",
        id: "Bergembiralah karena TUHAN; maka Ia akan memberikan kepadamu apa yang diinginkan hatimu.",
        en: "Take delight in the Lord, and he will give you the desires of your heart.",
        fr: "Fais de l’Éternel tes délices, Et il te donnera ce que ton cœur désire.",
        es: "Pon asimismo tu delicia en Jehová, y él te dará las peticiones de tu corazón."
    },

    // ===== KEHADIRAN ALLAH / GOD'S PRESENCE =====
    {
        ref: "Matius 28:20",
        refEn: "Matthew 28:20",
        refFr: "Matthieu 28:20",
        refEs: "Mateo 28:20",
        id: "Dan ketahuilah, Aku menyertai kamu senantiasa sampai kepada akhir zaman.",
        en: "And surely I am with you always, to the very end of the age.",
        fr: "et enseignez-leur à observer tout ce que je vous ai prescrit. Et voici, je suis avec vous tous les jours, jusqu’à la fin du monde .",
        es: "Enseñándoles que guarden todas las cosas que os he mandado: y he aquí, yo estoy con vosotros todos los días, hasta el fin del mundo. Amén."
    },
    {
        ref: "Mazmur 16:11",
        refEn: "Psalm 16:11",
        refFr: "Psaumes 16:11",
        refEs: "Salmos 16:11",
        id: "Engkau memberitahukan kepadaku jalan kehidupan; di hadapan-Mu ada sukacita berlimpah-limpah, di tangan kanan-Mu ada nikmat senantiasa.",
        en: "You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand.",
        fr: "Tu me feras connaître le sentier de la vie ; Il y a d’abondantes joies devant ta face, Des délices éternelles à ta droite.",
        es: "Me mostrarás la senda de la vida: hartura de alegrías hay con tu rostro; deleites en tu diestra para siempre."
    },
    {
        ref: "Yesaya 43:2",
        refEn: "Isaiah 43:2",
        refFr: "Ésaïe 43:2",
        refEs: "Isaías 43:2",
        id: "Apabila engkau menyeberang melalui air, Aku akan menyertai engkau, atau melalui sungai-sungai, engkau tidak akan dihanyutkan; apabila engkau berjalan melalui api, engkau tidak akan dihanguskan, dan nyala api tidak akan membakar engkau.",
        en: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you. When you walk through the fire, you will not be burned; the flames will not set you ablaze.",
        fr: "Si tu traverses les eaux, je serai avec toi ; Et les fleuves, ils ne te submergeront point ; Si tu marches dans le feu, tu ne te brûleras pas, Et la flamme ne t’embrasera pas.",
        es: "Cuando pasares por las aguas, yo seré contigo; y por los ríos, no te anegarán. Cuando pasares por el fuego, no te quemarás, ni la llama arderá en ti."
    },
    {
        ref: "Kejadian 28:15",
        refEn: "Genesis 28:15",
        refFr: "Genèse 28:15",
        refEs: "Génesis 28:15",
        id: "Sesungguhnya Aku menyertai engkau dan Aku akan melindungi engkau ke mana pun engkau pergi, dan Aku akan membawa engkau kembali ke negeri ini.",
        en: "I am with you and will watch over you wherever you go, and I will bring you back to this land.",
        fr: "Voici, je suis avec toi, je te garderai partout où tu iras, et je te ramènerai dans ce pays ; car je ne t’abandonnerai point, que je n’aie exécuté ce que je te dis.",
        es: "Y he aquí, yo soy contigo, y te guardaré por donde quiera que fueres, y te volveré á esta tierra; porque no te dejaré hasta tanto que haya hecho lo que te he dicho."
    },

    // ===== MISI & PELAYANAN / MISSION & SERVICE =====
    {
        ref: "Matius 28:18-20",
        refEn: "Matthew 28:18-20",
        refFr: "Matthieu 28:18-20",
        refEs: "Mateo 28:18-20",
        id: "Dan Yesus mendekati mereka dan berkata: 'Kepada-Ku telah diberikan segala kuasa di sorga dan di bumi. Karena itu pergilah, jadikanlah semua bangsa murid-Ku... Dan ketahuilah, Aku menyertai kamu senantiasa sampai kepada akhir zaman.'",
        en: "Then Jesus came to them and said, 'All authority in heaven and on earth has been given to me. Therefore go and make disciples of all nations... And surely I am with you always, to the very end of the age.'",
        fr: "Jésus, s’étant approché, leur parla ainsi : Tout pouvoir m’a été donné dans le ciel et sur la terre. Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit, et enseignez-leur à observer tout ce que je vous ai prescrit. Et voici, je suis avec vous tous les jours, jusqu’à la fin du monde .",
        es: "Y llegando Jesús, les habló, diciendo: Toda potestad me es dada en el cielo y en la tierra. Por tanto, id, y doctrinad á todos los Gentiles, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo: Enseñándoles que guarden todas las cosas que os he mandado: y he aquí, yo estoy con vosotros todos los días, hasta el fin del mundo. Amén."
    },
    {
        ref: "Markus 16:15",
        refEn: "Mark 16:15",
        refFr: "Marc 16:15",
        refEs: "Marcos 16:15",
        id: "Lalu Ia berkata kepada mereka: 'Pergilah ke seluruh dunia, beritakanlah Injil kepada segala makhluk.'",
        en: "He said to them, 'Go into all the world and preach the gospel to all creation.'",
        fr: "Puis il leur dit : Allez par tout le monde, et prêchez la bonne nouvelle à toute la création.",
        es: "Y les dijo: Id por todo el mundo; predicad el evangelio á toda criatura."
    },
    {
        ref: "Kisah Para Rasul 1:8",
        refEn: "Acts 1:8",
        refFr: "Actes des Apôtres 1:8",
        refEs: "Hechos 1:8",
        id: "Tetapi kamu akan menerima kuasa, kalau Roh Kudus turun ke atas kamu, dan kamu akan menjadi saksi-Ku di Yerusalem dan di seluruh Yudea dan Samaria dan sampai ke ujung bumi.",
        en: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.",
        fr: "Mais vous recevrez une puissance, le Saint-Esprit survenant sur vous, et vous serez mes témoins à Jérusalem, dans toute la Judée, dans la Samarie, et jusqu’aux extrémités de la terre.",
        es: "Mas recibiréis la virtud del Espíritu Santo que vendrá sobre vosotros; y me sereís testigos en Jerusalem, y en toda Judea, y Samaria, y hasta lo último de la tierra."
    },
    {
        ref: "Yesaya 6:8",
        refEn: "Isaiah 6:8",
        refFr: "Ésaïe 6:8",
        refEs: "Isaías 6:8",
        id: "Lalu aku mendengar suara Tuhan berkata: 'Siapakah yang akan Kuutus, dan siapakah yang mau pergi untuk Aku?' Maka sahutku: 'Ini aku, utuslah aku!'",
        en: "Then I heard the voice of the Lord saying, 'Whom shall I send? And who will go for us?' And I said, 'Here am I. Send me!'",
        fr: "J’entendis la voix du Seigneur, disant : Qui enverrai-je, et qui marchera pour nous ? Je répondis : Me voici, envoie-moi.",
        es: "Después oí la voz del Señor, que decía: ¿A quién enviaré, y quién nos irá? Entonces respondí yo: Heme aquí, envíame á mí."
    },
    {
        ref: "2 Timotius 4:2",
        refEn: "2 Timothy 4:2",
        refFr: "2 Timothée 4:2",
        refEs: "2 Timoteo 4:2",
        id: "Beritakanlah firman, siap sedialah baik atau tidak baik waktunya, nyatakanlah apa yang salah, tegurlah dan nasihatilah dengan segala kesabaran dan pengajaran.",
        en: "Preach the word; be prepared in season and out of season; correct, rebuke and encourage — with great patience and careful instruction.",
        fr: "prêche la parole, insiste en toute occasion, favorable ou non, reprends, censure, exhorte, avec toute douceur et en instruisant.",
        es: "Que prediques la palabra; que instes á tiempo y fuera de tiempo; redarguye, reprende, exhorta con toda paciencia y doctrina."
    },

    // ===== ROH KUDUS / HOLY SPIRIT =====
    {
        ref: "Yohanes 14:26",
        refEn: "John 14:26",
        refFr: "Jean 14:26",
        refEs: "Juan 14:26",
        id: "Tetapi Penghibur, yaitu Roh Kudus, yang akan diutus oleh Bapa dalam nama-Ku, Dialah yang akan mengajarkan segala sesuatu kepadamu dan akan mengingatkan kamu akan semua yang telah Kukatakan kepadamu.",
        en: "But the Advocate, the Holy Spirit, whom the Father will send in my name, will teach you all things and will remind you of everything I have said to you.",
        fr: "Mais le consolateur, l’Esprit-Saint, que le Père enverra en mon nom, vous enseignera toutes choses, et vous rappellera tout ce que je vous ai dit.",
        es: "Mas el Consolador, el Espíritu Santo, al cual el Padre enviará en mi nombre, él os enseñará todas las cosas, y os recordará todas las cosas que os he dicho."
    },
    {
        ref: "Galatia 5:22-23",
        refEn: "Galatians 5:22-23",
        refFr: "Galates 5:22-23",
        refEs: "Gálatas 5:22-23",
        id: "Tetapi buah Roh ialah: kasih, sukacita, damai sejahtera, kesabaran, kemurahan, kebaikan, kesetiaan, kelemahlembutan, penguasaan diri.",
        en: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.",
        fr: "Mais le fruit de l’Esprit, c’est l’amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité, la douceur, la tempérance ; la loi n’est pas contre ces choses.",
        es: "Mas el fruto del Espíritu es: caridad, gozo, paz, tolerancia, benignidad, bondad, fe, Mansedumbre, templanza: contra tales cosas no hay ley."
    },
    {
        ref: "1 Korintus 3:16",
        refEn: "1 Corinthians 3:16",
        refFr: "1 Corinthiens 3:16",
        refEs: "1 Corintios 3:16",
        id: "Tidak tahukah kamu, bahwa kamu adalah bait Allah dan bahwa Roh Allah diam di dalam kamu?",
        en: "Don't you know that you yourselves are God's temple and that God's Spirit dwells in your midst?",
        fr: "Ne savez-vous pas que vous êtes le temple de Dieu, et que l’Esprit de Dieu habite en vous ?",
        es: "¿No sabéis que sois templo de Dios, y que el Espíritu de Dios mora en vosotros?"
    },
    {
        ref: "Yohanes 16:13",
        refEn: "John 16:13",
        refFr: "Jean 16:13",
        refEs: "Juan 16:13",
        id: "Tetapi apabila Ia datang, yaitu Roh Kebenaran, Ia akan memimpin kamu ke dalam seluruh kebenaran.",
        en: "But when he, the Spirit of truth, comes, he will guide you into all the truth.",
        fr: "Quand le consolateur sera venu, l’Esprit de vérité, il vous conduira dans toute la vérité ; car il ne parlera pas de lui-même, mais il dira tout ce qu’il aura entendu, et il vous annoncera les choses à venir.",
        es: "Pero cuando viniere aquel Espíritu de verdad, él os guiará á toda verdad; porque no hablará de sí mismo, sino que hablará todo lo que oyere, y os hará saber las cosas que han de venir."
    },

    // ===== PENGAMPUNAN / FORGIVENESS =====
    {
        ref: "1 Yohanes 1:9",
        refEn: "1 John 1:9",
        refFr: "1 Jean 1:9",
        refEs: "1 Juan 1:9",
        id: "Jika kita mengaku dosa kita, maka Ia adalah setia dan adil, sehingga Ia akan mengampuni segala dosa kita dan menyucikan kita dari segala kejahatan.",
        en: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
        fr: "Si nous confessons nos péchés, il est fidèle et juste pour nous les pardonner, et pour nous purifier de toute iniquité.",
        es: "Si confesamos nuestros pecados, él es fiel y justo para que nos perdone nuestros pecados, y nos limpie de toda maldad."
    },
    {
        ref: "Mazmur 103:12",
        refEn: "Psalm 103:12",
        refFr: "Psaumes 103:12",
        refEs: "Salmos 103:12",
        id: "Sejauh timur dari barat, demikian dijauhkan-Nya dari pada kita pelanggaran kita.",
        en: "As far as the east is from the west, so far has he removed our transgressions from us.",
        fr: "Autant l’orient est éloigné de l’occident, Autant il éloigne de nous nos transgressions.",
        es: "Cuanto está lejos el oriente del occidente, hizo alejar de nosotros nuestras rebeliones."
    },
    {
        ref: "Yesaya 43:25",
        refEn: "Isaiah 43:25",
        refFr: "Ésaïe 43:25",
        refEs: "Isaías 43:25",
        id: "Aku, Akulah Dia yang menghapus dosa pemberontakanmu oleh karena Aku sendiri, dan Aku tidak mengingat-ingat dosamu.",
        en: "I, even I, am he who blots out your transgressions, for my own sake, and remembers your sins no more.",
        fr: "C’est moi, moi qui efface tes transgressions pour l’amour de moi, Et je ne me souviendrai plus de tes péchés.",
        es: "Yo, yo soy el que borro tus rebeliones por amor de mí; y no me acordaré de tus pecados."
    },
    {
        ref: "Matius 6:14",
        refEn: "Matthew 6:14",
        refFr: "Matthieu 6:14",
        refEs: "Mateo 6:14",
        id: "Karena jikalau kamu mengampuni kesalahan orang, Bapamu yang di sorga akan mengampuni kamu juga.",
        en: "For if you forgive other people when they sin against you, your heavenly Father will also forgive you.",
        fr: "Si vous pardonnez aux hommes leurs offenses, votre Père céleste vous pardonnera aussi ;",
        es: "Porque si perdonareis á los hombres sus ofensas, os perdonará también á vosotros vuestro Padre celestial."
    },
    {
        ref: "Efesus 4:32",
        refEn: "Ephesians 4:32",
        refFr: "Éphésiens 4:32",
        refEs: "Efesios 4:32",
        id: "Tetapi hendaklah kamu ramah seorang terhadap yang lain, penuh kasih mesra dan saling mengampuni, sebagaimana Allah di dalam Kristus telah mengampuni kamu.",
        en: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
        fr: "Soyez bons les uns envers les autres, compatissants, vous pardonnant réciproquement, comme Dieu vous a pardonné en Christ.",
        es: "Antes sed los unos con los otros benignos, misericordiosos, perdonándoos los unos á los otros, como también Dios os perdonó en Cristo."
    },

    // ===== PERSEKUTUAN & JEMAAT / CHURCH & FELLOWSHIP =====
    {
        ref: "Matius 18:20",
        refEn: "Matthew 18:20",
        refFr: "Matthieu 18:20",
        refEs: "Mateo 18:20",
        id: "Sebab di mana dua atau tiga orang berkumpul dalam nama-Ku, di situ Aku ada di tengah-tengah mereka.",
        en: "For where two or three gather in my name, there am I with them.",
        fr: "Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d’eux.",
        es: "Porque donde están dos ó tres congregados en mi nombre, allí estoy en medio de ellos."
    },
    {
        ref: "Ibrani 10:25",
        refEn: "Hebrews 10:25",
        refFr: "Hébreux 10:25",
        refEs: "Hebreos 10:25",
        id: "Janganlah kita menjauhkan diri dari pertemuan-pertemuan ibadah kita, seperti dibiasakan oleh beberapa orang, tetapi marilah kita saling menasihati, dan semakin giat melakukannya menjelang hari Tuhan yang mendekat.",
        en: "Not giving up meeting together, as some are in the habit of doing, but encouraging one another — and all the more as you see the Day approaching.",
        fr: "N’abandonnons pas notre assemblée, comme c’est la coutume de quelques-uns ; mais exhortons-nous réciproquement, et cela d’autant plus que vous voyez s’approcher le jour.",
        es: "No dejando nuestra congregación, como algunos tienen por costumbre, mas exhortándonos; y tanto más, cuanto veis que aquel día se acerca."
    },
    {
        ref: "1 Korintus 12:27",
        refEn: "1 Corinthians 12:27",
        refFr: "1 Corinthiens 12:27",
        refEs: "1 Corintios 12:27",
        id: "Kamu semua adalah tubuh Kristus dan kamu masing-masing adalah anggotanya.",
        en: "Now you are the body of Christ, and each one of you is a part of it.",
        fr: "Vous êtes le corps de Christ, et vous êtes ses membres, chacun pour sa part.",
        es: "Pues vosotros sois el cuerpo de Cristo, y miembros en parte."
    },
    {
        ref: "Mazmur 133:1",
        refEn: "Psalm 133:1",
        refFr: "Psaumes 133:1",
        refEs: "Salmos 133:1",
        id: "Sungguh, alangkah baiknya dan indahnya, apabila saudara-saudara diam bersama dengan rukun!",
        en: "How good and pleasant it is when God's people live together in unity!",
        fr: "Cantique des degrés. De David. Voici, oh ! qu’il est agréable, qu’il est doux Pour des frères de demeurer ensemble !",
        es: "¡MIRAD cuán bueno y cuán delicioso es habitar los hermanos igualmente en uno!"
    },
    {
        ref: "Roma 12:10",
        refEn: "Romans 12:10",
        refFr: "Romains 12:10",
        refEs: "Romanos 12:10",
        id: "Hendaklah kamu saling mengasihi sebagai saudara dan saling mendahului dalam memberi hormat.",
        en: "Be devoted to one another in love. Honor one another above yourselves.",
        fr: "Par amour fraternel, soyez pleins d’affection les uns pour les autres ; par honneur, usez de prévenances réciproques.",
        es: "Amándoos los unos á los otros con caridad fraternal; previniéndoos con honra los unos á los otros;"
    },

    // ===== KERENDAHAN HATI / HUMILITY =====
    {
        ref: "Mikha 6:8",
        refEn: "Micah 6:8",
        refFr: "Michée 6:8",
        refEs: "Miqueas 6:8",
        id: "Hai manusia, telah diberitahukan kepadamu apa yang baik. Dan apakah yang dituntut TUHAN dari padamu: selain berlaku adil, mencintai kesetiaan, dan hidup dengan rendah hati di hadapan Allahmu?",
        en: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.",
        fr: "On t’a fait connaître, ô homme, ce qui est bien ; Et ce que l’Éternel demande de toi, C’est que tu pratiques la justice, Que tu aimes la miséricorde, Et que tu marches humblement avec ton Dieu.",
        es: "Oh hombre, él te ha declarado qué sea lo bueno, y qué pida de ti Jehová: solamente hacer juicio, y amar misericordia, y humillarte para andar con tu Dios."
    },
    {
        ref: "Filipi 2:3-4",
        refEn: "Philippians 2:3-4",
        refFr: "Philippiens 2:3-4",
        refEs: "Filipenses 2:3-4",
        id: "Dengan tidak mencari kepentingan sendiri atau puji-pujian yang sia-sia. Sebaliknya hendaklah dengan rendah hati yang seorang menganggap yang lain lebih utama dari pada dirinya sendiri.",
        en: "Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves, not looking to your own interests but each of you to the interests of the others.",
        fr: "Ne faites rien par esprit de parti ou par vaine gloire, mais que l’humilité vous fasse regarder les autres comme étant au-dessus de vous-mêmes. Que chacun de vous, au lieu de considérer ses propres intérêts, considère aussi ceux des autres.",
        es: "Nada hagáis por contienda ó por vanagloria; antes bien en humildad, estimándoos inferiores los unos á los otros: No mirando cada uno á lo suyo propio, sino cada cual también á lo de los otros."
    },
    {
        ref: "Yakobus 4:10",
        refEn: "James 4:10",
        refFr: "Jacques 4:10",
        refEs: "Santiago 4:10",
        id: "Rendahkanlah dirimu di hadapan Tuhan, dan Ia akan meninggikan kamu.",
        en: "Humble yourselves before the Lord, and he will lift you up.",
        fr: "Humiliez-vous devant le Seigneur, et il vous élèvera.",
        es: "Humillaos delante del Señor, y él os ensalzará."
    },
    {
        ref: "1 Petrus 5:6",
        refEn: "1 Peter 5:6",
        refFr: "1 Pierre 5:6",
        refEs: "1 Pedro 5:6",
        id: "Karena itu rendahkanlah dirimu di bawah tangan Tuhan yang kuat, supaya kamu ditinggikan-Nya pada waktunya.",
        en: "Humble yourselves, therefore, under God's mighty hand, that he may lift you up in due time.",
        fr: "Humiliez-vous donc sous la puissante main de Dieu, afin qu’il vous élève au temps convenable ;",
        es: "Humillaos pues bajo la poderosa mano de Dios, para que él os ensalce cuando fuere tiempo;"
    },

    // ===== KEKUDUSAN / HOLINESS =====
    {
        ref: "Roma 12:1-2",
        refEn: "Romans 12:1-2",
        refFr: "Romains 12:1-2",
        refEs: "Romanos 12:1-2",
        id: "Persembahkanlah tubuhmu sebagai persembahan yang hidup, yang kudus dan yang berkenan kepada Allah: itu adalah ibadahmu yang sejati. Janganlah kamu menjadi serupa dengan dunia ini, tetapi berubahlah oleh pembaharuan budimu.",
        en: "Offer your bodies as a living sacrifice, holy and pleasing to God — this is your true and proper worship. Do not conform to the pattern of this world, but be transformed by the renewing of your mind.",
        fr: "Je vous exhorte donc, frères, par les compassions de Dieu, à offrir vos corps comme un sacrifice vivant, saint, agréable à Dieu, ce qui sera de votre part un culte raisonnable. Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l’intelligence, afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et parfait.",
        es: "ASÍ que, hermanos, os ruego por las misericordias de Dios, que presentéis vuestros cuerpos en sacrificio vivo, santo, agradable á Dios, que es vuestro racional culto. Y no os conforméis á este siglo; mas reformaos por la renovación de vuestro entendimiento, para que experimentéis cuál sea la buena voluntad de Dios, agradable y perfecta."
    },
    {
        ref: "1 Petrus 1:16",
        refEn: "1 Peter 1:16",
        refFr: "1 Pierre 1:16",
        refEs: "1 Pedro 1:16",
        id: "Sebab ada tertulis: Kuduslah kamu, sebab Aku kudus.",
        en: "For it is written: 'Be holy, because I am holy.'",
        fr: "Vous serez saints, car je suis saint.",
        es: "Porque escrito está: Sed santos, porque yo soy santo."
    },
    {
        ref: "Mazmur 51:12",
        refEn: "Psalm 51:10",
        refFr: "Psaumes 51:12",
        refEs: "Salmos 51:10",
        id: "Jadikanlah hatiku tahir, ya Allah, dan perbaharuilah batinku dengan roh yang teguh.",
        en: "Create in me a pure heart, O God, and renew a steadfast spirit within me.",
        fr: "Ô Dieu ! crée en moi un cœur pur, Renouvelle en moi un esprit bien disposé.",
        es: "Crea en mí, oh Dios, un corazón limpio; y renueva un espíritu recto dentro de mí."
    },

    // ===== KERAJAAN ALLAH / KINGDOM OF GOD =====
    {
        ref: "Matius 5:3",
        refEn: "Matthew 5:3",
        refFr: "Matthieu 5:3",
        refEs: "Mateo 5:3",
        id: "Berbahagialah orang yang miskin di hadapan Allah, karena merekalah yang empunya Kerajaan Sorga.",
        en: "Blessed are the poor in spirit, for theirs is the kingdom of heaven.",
        fr: "Heureux les pauvres en esprit, car le royaume des cieux est à eux !",
        es: "Bienaventurados los pobres en espíritu: porque de ellos es el reino de los cielos."
    },
    {
        ref: "Lukas 17:21",
        refEn: "Luke 17:21",
        refFr: "Luc 17:21",
        refEs: "Lucas 17:21",
        id: "Dan orang tidak dapat mengatakan: Lihat, ia ada di sini atau ia ada di sana! Sebab sesungguhnya Kerajaan Allah ada di antara kamu.",
        en: "Nor will people say, 'Here it is,' or 'There it is,' because the kingdom of God is in your midst.",
        fr: "On ne dira point : Il est ici, ou : Il est là. Car voici, le royaume de Dieu est au milieu de vous.",
        es: "Ni dirán: Helo aquí, ó helo allí: porque he aquí el reino de Dios entre vosotros está."
    },
    {
        ref: "Wahyu 11:15",
        refEn: "Revelation 11:15",
        refFr: "Apocalypse 11:15",
        refEs: "Apocalipsis 11:15",
        id: "Kerajaan dunia ini telah menjadi Kerajaan Tuhan kita dan Kerajaan Kristus-Nya, dan Ia akan memerintah sebagai raja sampai selama-lamanya.",
        en: "The kingdom of the world has become the kingdom of our Lord and of his Messiah, and he will reign for ever and ever.",
        fr: "Le septième ange sonna de la trompette. Et il y eut dans le ciel de fortes voix qui disaient : Le royaume du monde est remis à notre Seigneur et à son Christ ; et il régnera aux siècles des siècles.",
        es: "Y el séptimo ángel tocó la trompeta, y fueron hechas grandes voces en el cielo, que decían: Los reinos del mundo han venido á ser los reinos de nuestro Señor, y de su Cristo: y reinará para siempre jamás."
    },

    // ===== KEPERCAYAAN & KETAATAN / TRUST & OBEDIENCE =====
    {
        ref: "Amsal 3:25-26",
        refEn: "Proverbs 3:25-26",
        refFr: "Proverbes 3:25-26",
        refEs: "Proverbios 3:25-26",
        id: "Janganlah takut terhadap kekejutan yang tiba-tiba, atau terhadap kebinasaan orang fasik apabila ia datang. Karena TUHANlah yang akan menjadi kepercayaanmu, dan Ia akan menjaga kakimu dari jerat.",
        en: "Have no fear of sudden disaster or of the ruin that overtakes the wicked, for the Lord will be at your side and will keep your foot from being snared.",
        fr: "Ne redoute ni une terreur soudaine, Ni une attaque de la part des méchants ; Car l’Éternel sera ton assurance, Et il préservera ton pied de toute embûche.",
        es: "No tendrás temor de pavor repentino, ni de la ruina de los impíos cuando viniere: Porque Jehová será tu confianza, y él preservará tu pie de ser preso."
    },
    {
        ref: "Mazmur 56:4",
        refEn: "Psalm 56:3",
        refFr: "Psaumes 56:4",
        refEs: "Salmos 56:3",
        id: "Waktu aku takut, aku ini percaya kepada-Mu.",
        en: "When I am afraid, I put my trust in you.",
        fr: "Quand je suis dans la crainte, En toi je me confie.",
        es: "En el día que temo, yo en ti confío."
    },
    {
        ref: "Yohanes 14:1",
        refEn: "John 14:1",
        refFr: "Jean 14:1",
        refEs: "Juan 14:1",
        id: "Janganlah gelisah hatimu; percayalah kepada Allah, percayalah juga kepada-Ku.",
        en: "Do not let your hearts be troubled. You believe in God; believe also in me.",
        fr: "Que votre cœur ne se trouble point. Croyez en Dieu, et croyez en moi.",
        es: "NO se turbe vuestro corazón: creéis en Dios, creed también en mí."
    },
    {
        ref: "Ulangan 31:6",
        refEn: "Deuteronomy 31:6",
        refFr: "Deutéronome 31:6",
        refEs: "Deuteronomio 31:6",
        id: "Kuatkan dan teguhkanlah hatimu, janganlah takut dan jangan gemetar karena mereka, sebab TUHAN, Allahmu, Dialah yang berjalan menyertai engkau; Ia tidak akan membiarkan engkau dan tidak akan meninggalkan engkau.",
        en: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.",
        fr: "Fortifiez-vous et ayez du courage ! Ne craignez point et ne soyez point effrayés devant eux ; car l’Éternel, ton Dieu, marchera lui-même avec toi, il ne te délaissera point, il ne t’abandonnera point.",
        es: "Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo de ellos: que Jehová tu Dios es el que va contigo: no te dejará ni te desamparará."
    },

    // ===== HATI & PIKIRAN / HEART & MIND =====
    {
        ref: "Amsal 4:23",
        refEn: "Proverbs 4:23",
        refFr: "Proverbes 4:23",
        refEs: "Proverbios 4:23",
        id: "Jagalah hatimu dengan segala kewaspadaan, karena dari situlah terpancar kehidupan.",
        en: "Above all else, guard your heart, for everything you do flows from it.",
        fr: "Garde ton cœur plus que toute autre chose, Car de lui viennent les sources de la vie.",
        es: "Sobre toda cosa guardada guarda tu corazón; porque de él mana la vida."
    },
    {
        ref: "Kolose 3:2",
        refEn: "Colossians 3:2",
        refFr: "Colossiens 3:2",
        refEs: "Colosenses 3:2",
        id: "Pikirkanlah perkara-perkara yang di atas, bukan yang di bumi.",
        en: "Set your minds on things above, not on earthly things.",
        fr: "Affectionnez-vous aux choses d’en haut, et non à celles qui sont sur la terre.",
        es: "Poned la mira en las cosas de arriba, no en las de la tierra."
    },
    {
        ref: "Filipi 4:8",
        refEn: "Philippians 4:8",
        refFr: "Philippiens 4:8",
        refEs: "Filipenses 4:8",
        id: "Semua yang benar, semua yang mulia, semua yang adil, semua yang suci, semua yang manis, semua yang sedap didengar, semua yang disebut kebajikan dan patut dipuji, pikirkanlah semuanya itu.",
        en: "Whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable — if anything is excellent or praiseworthy — think about such things.",
        fr: "Au reste, frères, que tout ce qui est vrai, tout ce qui est honorable, tout ce qui est juste, tout ce qui est pur, tout ce qui est aimable, tout ce qui mérite l’approbation, ce qui est vertueux et digne de louange, soit l’objet de vos pensées.",
        es: "Por lo demás, hermanos, todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre; si hay virtud alguna, si alguna alabanza, en esto pensad."
    },
    {
        ref: "Mazmur 26:2",
        refEn: "Psalm 26:2",
        refFr: "Psaumes 26:2",
        refEs: "Salmos 26:2",
        id: "Ujilah aku, TUHAN, dan cobalah aku; selidikilah batinku dan hatiku.",
        en: "Test me, Lord, and try me, examine my heart and my mind.",
        fr: "Sonde-moi, Éternel ! éprouve-moi, Fais passer au creuset mes reins et mon cœur ;",
        es: "Pruébame, oh Jehová, y sondéame: examina mis riñones y mi corazón."
    },

    // ===== PERNIKAHAN & KELUARGA / MARRIAGE & FAMILY =====
    {
        ref: "Kejadian 2:24",
        refEn: "Genesis 2:24",
        refFr: "Genèse 2:24",
        refEs: "Génesis 2:24",
        id: "Sebab itu seorang laki-laki akan meninggalkan ayahnya dan ibunya dan bersatu dengan isterinya, sehingga keduanya menjadi satu daging.",
        en: "That is why a man leaves his father and mother and is united to his wife, and they become one flesh.",
        fr: "C’est pourquoi l’homme quittera son père et sa mère, et s’attachera à sa femme, et ils deviendront une seule chair.",
        es: "Por tanto, dejará el hombre á su padre y á su madre, y allegarse ha á su mujer, y serán una sola carne."
    },
    {
        ref: "Amsal 31:25",
        refEn: "Proverbs 31:25",
        refFr: "Proverbes 31:25",
        refEs: "Proverbios 31:25",
        id: "Pakaiannya adalah kekuatan dan kemuliaan, ia tertawa tentang hari depan.",
        en: "She is clothed with strength and dignity; she can laugh at the days to come.",
        fr: "Elle est revêtue de force et de gloire, Et elle se rit de l’avenir.",
        es: "Fortaleza y honor son su vestidura; y en el día postrero reirá."
    },
    {
        ref: "Efesus 6:1-2",
        refEn: "Ephesians 6:1-2",
        refFr: "Éphésiens 6:1-2",
        refEs: "Efesios 6:1-2",
        id: "Hai anak-anak, taatilah orang tuamu di dalam Tuhan, karena haruslah demikian. Hormatilah ayahmu dan ibumu — ini adalah suatu perintah yang penting.",
        en: "Children, obey your parents in the Lord, for this is right. Honor your father and mother — which is the first commandment with a promise.",
        fr: "Enfants, obéissez à vos parents, selon le Seigneur, car cela est juste. Honore ton père et ta mère (c’est le premier commandement avec une promesse),",
        es: "HIJOS, obedeced en el Señor á vuestros padres; porque esto es justo. Honra á tu padre y á tu madre, que es el primer mandamiento con promesa,"
    },

    // ===== PEMURIDAN / DISCIPLESHIP =====
    {
        ref: "Lukas 9:23",
        refEn: "Luke 9:23",
        refFr: "Luc 9:23",
        refEs: "Lucas 9:23",
        id: "Kata-Nya kepada mereka semua: 'Setiap orang yang mau mengikut Aku, ia harus menyangkal dirinya, memikul salibnya setiap hari dan mengikut Aku.'",
        en: "Then he said to them all: 'Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me.'",
        fr: "Puis il dit à tous : Si quelqu’un veut venir après moi, qu’il renonce à lui-même, qu’il se charge chaque jour de sa croix, et qu’il me suive.",
        es: "Y decía á todos: Si alguno quiere venir en pos de mí, niéguese á sí mismo, y tome su cruz cada día, y sígame."
    },
    {
        ref: "Yohanes 15:5",
        refEn: "John 15:5",
        refFr: "Jean 15:5",
        refEs: "Juan 15:5",
        id: "Akulah pokok anggur dan kamulah ranting-rantingnya. Barangsiapa tinggal di dalam Aku dan Aku di dalam dia, ia berbuah banyak, sebab di luar Aku kamu tidak dapat berbuat apa-apa.",
        en: "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.",
        fr: "Je suis le cep, vous êtes les sarments. Celui qui demeure en moi et en qui je demeure porte beaucoup de fruit, car sans moi vous ne pouvez rien faire.",
        es: "Yo soy la vid, vosotros los pámpanos: el que está en mí, y yo en él, éste lleva mucho fruto; porque sin mí nada podéis hacer."
    },
    {
        ref: "Yohanes 8:31",
        refEn: "John 8:31",
        refFr: "Jean 8:31",
        refEs: "Juan 8:31",
        id: "Maka kata-Nya kepada orang-orang Yahudi yang telah percaya kepada-Nya: 'Jikalau kamu tetap dalam firman-Ku, kamu benar-benar adalah murid-Ku.'",
        en: "To the Jews who had believed him, Jesus said, 'If you hold to my teaching, you are really my disciples.'",
        fr: "Et il dit aux Juifs qui avaient cru en lui : Si vous demeurez dans ma parole, vous êtes vraiment mes disciples ;",
        es: "Y decía Jesús á los Judíos que le habían creído: Si vosotros permaneciereis en mi palabra, seréis verdaderamente mis discípulos;"
    },

    // ===== DAMAI & REKONSILIASI / PEACE & RECONCILIATION =====
    {
        ref: "Matius 5:9",
        refEn: "Matthew 5:9",
        refFr: "Matthieu 5:9",
        refEs: "Mateo 5:9",
        id: "Berbahagialah orang yang membawa damai, karena mereka akan disebut anak-anak Allah.",
        en: "Blessed are the peacemakers, for they will be called children of God.",
        fr: "Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu !",
        es: "Bienaventurados los pacificadores: porque ellos serán llamados hijos de Dios."
    },
    {
        ref: "Roma 5:1",
        refEn: "Romans 5:1",
        refFr: "Romains 5:1",
        refEs: "Romanos 5:1",
        id: "Sebab itu, kita yang dibenarkan karena iman, kita hidup dalam damai sejahtera dengan Allah oleh karena Tuhan kita, Yesus Kristus.",
        en: "Therefore, since we have been justified through faith, we have peace with God through our Lord Jesus Christ.",
        fr: "Étant donc justifiés par la foi, nous avons la paix avec Dieu par notre Seigneur Jésus-Christ,",
        es: "JUSTIFICADOS pues por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo:"
    },
    {
        ref: "Kolose 3:15",
        refEn: "Colossians 3:15",
        refFr: "Colossiens 3:15",
        refEs: "Colosenses 3:15",
        id: "Hendaklah damai sejahtera Kristus memerintah dalam hatimu, karena untuk itulah kamu telah dipanggil menjadi satu tubuh. Dan bersyukurlah.",
        en: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.",
        fr: "Et que la paix de Christ, à laquelle vous avez été appelés pour former un seul corps, règne dans vos cœurs. Et soyez reconnaissants.",
        es: "Y la paz de Dios gobierne en vuestros corazones, á la cual asimismo sois llamados en un cuerpo; y sed agradecidos."
    },

    // ===== KETABAHAN / PERSEVERANCE =====
    {
        ref: "Yakobus 1:2-4",
        refEn: "James 1:2-4",
        refFr: "Jacques 1:2-4",
        refEs: "Santiago 1:2-4",
        id: "Saudara-saudaraku, anggaplah sebagai suatu kebahagiaan, apabila kamu jatuh ke dalam berbagai-bagai pencobaan, sebab kamu tahu, bahwa ujian terhadap imanmu itu menghasilkan ketekunan. Dan biarkanlah ketekunan itu memperoleh buah yang matang, supaya kamu menjadi sempurna dan utuh.",
        en: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete.",
        fr: "Mes frères, regardez comme un sujet de joie complète les diverses épreuves auxquelles vous pouvez être exposés, sachant que l’épreuve de votre foi produit la patience. Mais il faut que la patience accomplisse parfaitement son œuvre, afin que vous soyez parfaits et accomplis, sans faillir en rien.",
        es: "Hermanos míos, tened por sumo gozo cuando cayereis en diversas tentaciones; Sabiendo que la prueba de vuestra fe obra paciencia. Mas tenga la paciencia perfecta su obra, para que seáis perfectos y cabales, sin faltar en alguna cosa."
    },
    {
        ref: "1 Korintus 10:13",
        refEn: "1 Corinthians 10:13",
        refFr: "1 Corinthiens 10:13",
        refEs: "1 Corintios 10:13",
        id: "Pencobaan-pencobaan yang kamu alami ialah pencobaan-pencobaan biasa, yang tidak melebihi kekuatan manusia. Sebab Allah setia dan karena itu Ia tidak akan membiarkan kamu dicobai melampaui kekuatanmu.",
        en: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.",
        fr: "Aucune tentation ne vous est survenue qui n’ait été humaine, et Dieu, qui est fidèle, ne permettra pas que vous soyez tentés au delà de vos forces ; mais avec la tentation il préparera aussi le moyen d’en sortir, afin que vous puissiez la supporter.",
        es: "No os ha tomado tentación, sino humana: mas fiel es Dios, que no os dejará ser tentados más de lo que podéis llevar; antes dará también juntamente con la tentación la salida, para que podáis aguantar."
    },
    {
        ref: "Wahyu 2:10",
        refEn: "Revelation 2:10",
        refFr: "Apocalypse 2:10",
        refEs: "Apocalipsis 2:10",
        id: "Hendaklah engkau setia sampai mati, dan Aku akan mengaruniakan kepadamu mahkota kehidupan.",
        en: "Be faithful, even to the point of death, and I will give you life as your victor's crown.",
        fr: "Ne crains pas ce que tu vas souffrir. Voici, le diable jettera quelques-uns de vous en prison, afin que vous soyez éprouvés, et vous aurez une tribulation de dix jours. Sois fidèle jusqu’à la mort, et je te donnerai la couronne de vie.",
        es: "No tengas ningún temor de las cosas que has de padecer. He aquí, el diablo ha de enviar algunos de vosotros á la cárcel, para que seáis probados, y tendréis tribulación de diez días. Sé fiel hasta la muerte, y yo te daré la corona de la vida."
    },
    {
        ref: "Galatia 6:9",
        refEn: "Galatians 6:9",
        refFr: "Galates 6:9",
        refEs: "Gálatas 6:9",
        id: "Janganlah kita jemu-jemu berbuat baik, karena apabila sudah datang waktunya, kita akan menuai, jika kita tidak menjadi lemah.",
        en: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
        fr: "Ne nous lassons pas de faire le bien ; car nous moissonnerons au temps convenable, si nous ne nous relâchons pas.",
        es: "No nos cansemos, pues, de hacer bien; que á su tiempo segaremos, si no hubiéremos desmayado."
    },
    {
        ref: "Ibrani 12:1",
        refEn: "Hebrews 12:1",
        refFr: "Hébreux 12:1",
        refEs: "Hebreos 12:1",
        id: "Karena itu, kita yang dikelilingi oleh begitu besar awan saksi, marilah kita menanggalkan semua beban dan dosa yang begitu merintangi kita, dan berlomba dengan tekun dalam perlombaan yang diwajibkan bagi kita.",
        en: "Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us.",
        fr: "Nous donc aussi, puisque nous sommes environnés d’une si grande nuée de témoins, rejetons tout fardeau, et le péché qui nous enveloppe si facilement, et courons avec persévérance dans la carrière qui nous est ouverte,",
        es: "POR tanto nosotros también, teniendo en derredor nuestro una tan grande nube de testigos, dejando todo el peso del pecado que nos rodea, corramos con paciencia la carrera que nos es propuesta,"
    },

    // ===== TUJUAN HIDUP / PURPOSE OF LIFE =====
    {
        ref: "Mazmur 16:8",
        refEn: "Psalm 16:8",
        refFr: "Psaumes 16:8",
        refEs: "Salmos 16:8",
        id: "Aku senantiasa memandang kepada TUHAN; karena Ia berdiri di sebelah kananku, aku tidak goyah.",
        en: "I keep my eyes always on the Lord. With him at my right hand, I will not be shaken.",
        fr: "J’ai constamment l’Éternel sous mes yeux ; Quand il est à ma droite, je ne chancelle pas.",
        es: "A Jehová he puesto siempre delante de mí: porque está á mi diestra no seré conmovido."
    },
    {
        ref: "1 Korintus 10:31",
        refEn: "1 Corinthians 10:31",
        refFr: "1 Corinthiens 10:31",
        refEs: "1 Corintios 10:31",
        id: "Aku menjawab: Jika engkau makan atau jika engkau minum, atau jika engkau melakukan sesuatu yang lain, lakukanlah semuanya itu untuk kemuliaan Allah.",
        en: "So whether you eat or drink or whatever you do, do it all for the glory of God.",
        fr: "Soit donc que vous mangiez, soit que vous buviez, soit que vous fassiez quelque autre chose, faites tout pour la gloire de Dieu.",
        es: "Si pues coméis, ó bebéis, ó hacéis otra cosa, hacedlo todo á gloria de Dios."
    },
    {
        ref: "Pengkhotbah 12:13",
        refEn: "Ecclesiastes 12:13",
        refFr: "Ecclésiaste 12:13",
        refEs: "Eclesiastés 12:13",
        id: "Akhir kata dari segala yang didengar ialah: takutlah akan Allah dan berpeganglah pada perintah-perintah-Nya, karena ini adalah kewajiban setiap orang.",
        en: "Now all has been heard; here is the conclusion of the matter: Fear God and keep his commandments, for this is the duty of all mankind.",
        fr: "Les paroles des sages sont comme des aiguillons ; et, rassemblées en un recueil, elles sont comme des clous plantés, données par un seul maître.",
        es: "El fin de todo el discurso oído es este: Teme á Dios, y guarda sus mandamientos; porque esto es el todo del hombre."
    },

    // ===== CIPTAAN / CREATION =====
    {
        ref: "Kejadian 1:1",
        refEn: "Genesis 1:1",
        refFr: "Genèse 1:1",
        refEs: "Génesis 1:1",
        id: "Pada mulanya Allah menciptakan langit dan bumi.",
        en: "In the beginning God created the heavens and the earth.",
        fr: "Au commencement, Dieu créa les cieux et la terre.",
        es: "EN el principio crió Dios los cielos y la tierra."
    },
    {
        ref: "Mazmur 19:2",
        refEn: "Psalm 19:1",
        refFr: "Psaumes 19:2",
        refEs: "Salmos 19:1",
        id: "Langit menceritakan kemuliaan Allah, dan cakrawala memberitakan pekerjaan tangan-Nya.",
        en: "The heavens declare the glory of God; the skies proclaim the work of his hands.",
        fr: "Les cieux racontent la gloire de Dieu, Et l’étendue manifeste l’œuvre de ses mains.",
        es: "LOS cielos cuentan la gloria de Dios, y la expansión denuncia la obra de sus manos."
    },

    // ===== KESAKSIAN / TESTIMONY =====
    {
        ref: "Mazmur 107:2",
        refEn: "Psalm 107:2",
        refFr: "Psaumes 107:2",
        refEs: "Salmos 107:2",
        id: "Biarlah orang-orang yang ditebus TUHAN mengatakannya, orang-orang yang telah ditebus-Nya dari kuasa yang menyesakkan.",
        en: "Let the redeemed of the Lord tell their story — those he redeemed from the hand of the foe.",
        fr: "Qu’ainsi disent les rachetés de l’Éternel, Ceux qu’il a délivrés de la main de l’ennemi,",
        es: "Díganlo los redimidos de Jehová, los que ha redimido del poder del enemigo,"
    },
    {
        ref: "Wahyu 12:11",
        refEn: "Revelation 12:11",
        refFr: "Apocalypse 12:11",
        refEs: "Apocalipsis 12:11",
        id: "Dan mereka mengalahkan dia oleh darah Anak Domba, dan oleh perkataan kesaksian mereka. Karena mereka tidak mengasihi nyawa mereka sampai ke dalam maut.",
        en: "They triumphed over him by the blood of the Lamb and by the word of their testimony; they did not love their lives so much as to shrink from death.",
        fr: "Ils l’ont vaincu à cause du sang de l’agneau et à cause de la parole de leur témoignage, et ils n’ont pas aimé leur vie jusqu’à craindre la mort.",
        es: "Y ellos le han vencido por la sangre del Cordero, y por la palabra de su testimonio; y no han amado sus vidas hasta la muerte."
    },

    // ===== KRISTUS / CHRIST =====
    {
        ref: "Yohanes 10:10",
        refEn: "John 10:10",
        refFr: "Jean 10:10",
        refEs: "Juan 10:10",
        id: "Aku datang, supaya mereka mempunyai hidup, dan mempunyainya dalam segala kelimpahan.",
        en: "I have come that they may have life, and have it to the full.",
        fr: "Le voleur ne vient que pour dérober, égorger et détruire ; moi, je suis venu afin que les brebis aient la vie, et qu’elles soient dans l’abondance.",
        es: "El ladrón no viene sino para hurtar, y matar, y destruir: yo he venido para que tengan vida, y para que la tengan en abundancia."
    },
    {
        ref: "Kolose 1:17",
        refEn: "Colossians 1:17",
        refFr: "Colossiens 1:17",
        refEs: "Colosenses 1:17",
        id: "Ia ada terlebih dahulu dari segala sesuatu dan segala sesuatu ada di dalam Dia.",
        en: "He is before all things, and in him all things hold together.",
        fr: "Il est avant toutes choses, et toutes choses subsistent en lui.",
        es: "Y él es antes de todas las cosas, y por él todas las cosas subsisten:"
    },
    {
        ref: "Yohanes 20:31",
        refEn: "John 20:31",
        refFr: "Jean 20:31",
        refEs: "Juan 20:31",
        id: "Tetapi semua yang tercantum di sini telah dicatat, supaya kamu percaya, bahwa Yesuslah Mesias, Anak Allah, dan supaya kamu oleh imanmu memperoleh hidup dalam nama-Nya.",
        en: "But these are written that you may believe that Jesus is the Messiah, the Son of God, and that by believing you may have life in his name.",
        fr: "Mais ces choses ont été écrites afin que vous croyiez que Jésus est le Christ, le Fils de Dieu, et qu’en croyant vous ayez la vie en son nom.",
        es: "Estas empero son escritas, para que creáis que Jesús es el Cristo, el Hijo de Dios; y para que creyendo, tengáis vida en su nombre."
    },
    {
        ref: "Filipi 2:10-11",
        refEn: "Philippians 2:10-11",
        refFr: "Philippiens 2:10-11",
        refEs: "Filipenses 2:10-11",
        id: "Supaya dalam nama Yesus bertekuk lutut segala yang ada di langit dan yang ada di atas bumi dan yang ada di bawah bumi, dan segala lidah mengaku: Yesus Kristus adalah Tuhan, bagi kemuliaan Allah, Bapa!",
        en: "That at the name of Jesus every knee should bow, in heaven and on earth and under the earth, and every tongue acknowledge that Jesus Christ is Lord, to the glory of God the Father.",
        fr: "afin qu’au nom de Jésus tout genou fléchisse dans les cieux, sur la terre et sous la terre, et que toute langue confesse que Jésus-Christ est Seigneur, à la gloire de Dieu le Père.",
        es: "Para que en el nombre de Jesús se doble toda rodilla de los que están en los cielos, y de los que en la tierra, y de los que debajo de la tierra; Y toda lengua confiese que Jesucristo es el Señor, á la gloria de Dios Padre."
    },
    {
        ref: "Mazmur 95:1-2",
        refEn: "Psalm 95:1-2",
        refFr: "Psaumes 95:1-2",
        refEs: "Salmos 95:1-2",
        id: "Marilah kita bersorak-sorai untuk TUHAN, dan bersorak bagi gunung batu keselamatan kita. Biarlah kita menghadap wajah-Nya dengan nyanyian syukur, bersorak bagi-Nya dengan nyanyian mazmur.",
        en: "Come, let us sing for joy to the Lord; let us shout aloud to the Rock of our salvation. Let us come before him with thanksgiving and extol him with music and song.",
        fr: "Venez, chantons avec allégresse à l’Éternel ! Poussons des cris de joie vers le rocher de notre salut. Allons au-devant de lui avec des louanges, Faisons retentir des cantiques en son honneur !",
        es: "VENID, celebremos alegremente á Jehová: cantemos con júbilo á la roca de nuestra salud. Lleguemos ante su acatamiento con alabanza; aclamémosle con cánticos."
    },
    {
        ref: "Yohanes 3:36",
        refEn: "John 3:36",
        refFr: "Jean 3:36",
        refEs: "Juan 3:36",
        id: "Barangsiapa percaya kepada Anak, ia beroleh hidup yang kekal, tetapi barangsiapa tidak taat kepada Anak, ia tidak akan melihat hidup, melainkan murka Allah tetap ada di atasnya.",
        en: "Whoever believes in the Son has eternal life, but whoever rejects the Son will not see life, for God's wrath remains on them.",
        fr: "Celui qui croit au Fils a la vie éternelle ; celui qui ne croit pas au Fils ne verra point la vie, mais la colère de Dieu demeure sur lui.",
        es: "El que cree en el Hijo, tiene vida eterna; mas el que es incrédulo al Hijo, no verá la vida, sino que la ira de Dios está sobre él."
    },
    {
        ref: "Kolose 2:9-10",
        refEn: "Colossians 2:9-10",
        refFr: "Colossiens 2:9-10",
        refEs: "Colosenses 2:9-10",
        id: "Sebab dalam Dialah berdiam secara jasmaniah seluruh kepenuhan ke-Allahan, dan kamu telah dipenuhi di dalam Dia. Dialah kepala semua pemerintah dan penguasa.",
        en: "For in Christ all the fullness of the Deity lives in bodily form, and in Christ you have been brought to fullness. He is the head over every power and authority.",
        fr: "Car en lui habite corporellement toute la plénitude de la divinité. Vous avez tout pleinement en lui, qui est le chef de toute domination et de toute autorité.",
        es: "Porque en él habita toda la plenitud de la divinidad corporalmente: Y en él estáis cumplidos, el cual es la cabeza de todo principado y potestad:"
    },

    // ===== KEBESARAN YESUS / THE GREATNESS OF JESUS =====
    {
        ref: "Yohanes 1:1-3",
        refEn: "John 1:1-3",
        refFr: "Jean 1:1-3",
        refEs: "Juan 1:1-3",
        id: "Pada mulanya adalah Firman; Firman itu bersama-sama dengan Allah dan Firman itu adalah Allah. Ia pada mulanya bersama-sama dengan Allah. Segala sesuatu dijadikan oleh Dia dan tanpa Dia tidak ada suatu pun yang telah jadi dari segala yang telah dijadikan.",
        en: "In the beginning was the Word, and the Word was with God, and the Word was God. He was with God in the beginning. Through him all things were made; without him nothing was made that has been made.",
        fr: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu. Elle était au commencement avec Dieu. Toutes choses ont été faites par elle, et rien de ce qui a été fait n’a été fait sans elle.",
        es: "EN el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios. Este era en el principio con Dios. Todas las cosas por él fueron hechas; y sin él nada de lo que es hecho, fué hecho."
    },
    {
        ref: "Yohanes 1:14",
        refEn: "John 1:14",
        refFr: "Jean 1:14",
        refEs: "Juan 1:14",
        id: "Firman itu telah menjadi manusia, dan diam di antara kita, dan kita telah melihat kemuliaan-Nya, yaitu kemuliaan yang diberikan kepada-Nya sebagai Anak Tunggal Bapa, penuh kasih karunia dan kebenaran.",
        en: "The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
        fr: "Et la parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité ; et nous avons contemplé sa gloire, une gloire comme la gloire du Fils unique venu du Père.",
        es: "Y aquel Verbo fué hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad."
    },
    {
        ref: "Ibrani 1:3",
        refEn: "Hebrews 1:3",
        refFr: "Hébreux 1:3",
        refEs: "Hebreos 1:3",
        id: "Ia adalah cahaya kemuliaan Allah dan gambar wujud Allah dan menopang segala yang ada dengan firman-Nya yang penuh kekuasaan. Dan setelah Ia selesai mengadakan penyucian dosa, Ia duduk di sebelah kanan Yang Mahabesar, di tempat yang tinggi.",
        en: "The Son is the radiance of God's glory and the exact representation of his being, sustaining all things by his powerful word. After he had provided purification for sins, he sat down at the right hand of the Majesty in heaven.",
        fr: "et qui, étant le reflet de sa gloire et l’empreinte de sa personne, et soutenant toutes choses par sa parole puissante, a fait la purification des péchés et s’est assis à la droite de la majesté divine dans les lieux très hauts,",
        es: "El cual siendo el resplandor de su gloria, y la misma imagen de su sustancia, y sustentando todas las cosas con la palabra de su potencia, habiendo hecho la purgación de nuestros pecados por sí mismo, se sentó á la diestra de la Majestad en las alturas,"
    },
    {
        ref: "Kolose 1:15-16",
        refEn: "Colossians 1:15-16",
        refFr: "Colossiens 1:15-16",
        refEs: "Colosenses 1:15-16",
        id: "Ia adalah gambar Allah yang tidak kelihatan, yang sulung, lebih utama dari segala yang diciptakan. Karena di dalam Dialah telah diciptakan segala sesuatu, yang ada di sorga dan yang ada di bumi, yang kelihatan dan yang tidak kelihatan.",
        en: "The Son is the image of the invisible God, the firstborn over all creation. For in him all things were created: things in heaven and on earth, visible and invisible.",
        fr: "Il est l’image du Dieu invisible, le premier-né de toute la création. Car en lui ont été créées toutes les choses qui sont dans les cieux et sur la terre, les visibles et les invisibles, trônes, dignités, dominations, autorités. Tout a été créé par lui et pour lui.",
        es: "El cual es la imagen del Dios invisible, el primogénito de toda criatura. Porque por él fueron criadas todas las cosas que están en los cielos, y que están en la tierra, visibles é invisibles; sean tronos, sean dominios, sean principados, sean potestades; todo fué criado por él y para él."
    },
    {
        ref: "Yohanes 8:58",
        refEn: "John 8:58",
        refFr: "Jean 8:58",
        refEs: "Juan 8:58",
        id: "Kata Yesus kepada mereka: 'Aku berkata kepadamu, sesungguhnya sebelum Abraham jadi, Aku telah ada.'",
        en: "Very truly I tell you, Jesus answered, before Abraham was born, I am!",
        fr: "Jésus leur dit : En vérité, en vérité, je vous le dis, avant qu’Abraham fût, je suis.",
        es: "Díjoles Jesús: De cierto, de cierto os digo: Antes que Abraham fuese, yo soy."
    },
    {
        ref: "Efesus 1:20-22",
        refEn: "Ephesians 1:20-22",
        refFr: "Éphésiens 1:20-22",
        refEs: "Efesios 1:20-22",
        id: "Allah membangkitkan Kristus dari antara orang mati dan mendudukkan Dia di sebelah kanan-Nya di sorga, jauh lebih tinggi dari semua pemerintah dan penguasa dan kekuasaan dan kerajaan... Segala sesuatu telah Ia taklukkan di bawah kaki Kristus.",
        en: "He exerted when he raised Christ from the dead and seated him at his right hand in the heavenly realms, far above all rule and authority, power and dominion... God placed all things under his feet.",
        fr: "Il l’a déployée en Christ, en le ressuscitant des morts, et en le faisant asseoir à sa droite dans les lieux célestes, au-dessus de toute domination, de toute autorité, de toute puissance, de toute dignité, et de tout nom qui se peut nommer, non seulement dans le siècle présent, mais encore dans le siècle à venir. Il a tout mis sous ses pieds, et il l’a donné pour chef suprême à l’Église,",
        es: "La cual obró en Cristo, resucitándole de los muertos, y colocándole á su diestra en los cielos, Sobre todo principado, y potestad, y potencia, y señorío, y todo nombre que se nombra, no sólo en este siglo, mas aun en el venidero: Y sometió todas las cosas debajo de sus pies, y diólo por cabeza sobre todas las cosas á la iglesia,"
    },
    {
        ref: "Wahyu 1:8",
        refEn: "Revelation 1:8",
        refFr: "Apocalypse 1:8",
        refEs: "Apocalipsis 1:8",
        id: "'Aku adalah Alfa dan Omega,' firman Tuhan Allah, yang ada dan yang sudah ada dan yang akan datang, Yang Mahakuasa.",
        en: "'I am the Alpha and the Omega,' says the Lord God, 'who is, and who was, and who is to come, the Almighty.'",
        fr: "Je suis l’alpha et l’oméga, dit le Seigneur Dieu, celui qui est, qui était, et qui vient, le Tout-Puissant.",
        es: "Yo soy el Alpha y la Omega, principio y fin, dice el Señor, que es y que era y que ha de venir, el Todopoderoso."
    },
    {
        ref: "Yohanes 10:30",
        refEn: "John 10:30",
        refFr: "Jean 10:30",
        refEs: "Juan 10:30",
        id: "Aku dan Bapa adalah satu.",
        en: "I and the Father are one.",
        fr: "Moi et le Père nous sommes un.",
        es: "Yo y el Padre una cosa somos."
    },
    {
        ref: "Matius 16:16",
        refEn: "Matthew 16:16",
        refFr: "Matthieu 16:16",
        refEs: "Mateo 16:16",
        id: "Maka jawab Simon Petrus: 'Engkau adalah Mesias, Anak Allah yang hidup!'",
        en: "Simon Peter answered, 'You are the Messiah, the Son of the living God.'",
        fr: "Simon Pierre répondit : Tu es le Christ, le Fils du Dieu vivant.",
        es: "Y respondiendo Simón Pedro, dijo: Tú eres el Cristo, el Hijo del Dios viviente."
    },
    {
        ref: "Yohanes 20:28",
        refEn: "John 20:28",
        refFr: "Jean 20:28",
        refEs: "Juan 20:28",
        id: "Tomas menjawab Dia: 'Ya Tuhanku dan Allahku!'",
        en: "Thomas said to him, 'My Lord and my God!'",
        fr: "Thomas lui répondit : Mon Seigneur et mon Dieu ! Jésus lui dit :",
        es: "Entonces Tomás respondió, y díjole: ¡Señor mío, y Dios mío!"
    },
    {
        ref: "Wahyu 5:12",
        refEn: "Revelation 5:12",
        refFr: "Apocalypse 5:12",
        refEs: "Apocalipsis 5:12",
        id: "Mereka berseru dengan suara nyaring: 'Anak Domba yang disembelih itu layak untuk menerima kuasa, dan kekayaan, dan hikmat, dan kekuatan, dan hormat, dan kemuliaan, dan puji-pujian!'",
        en: "In a loud voice they were saying: 'Worthy is the Lamb, who was slain, to receive power and wealth and wisdom and strength and honor and glory and praise!'",
        fr: "Ils disaient d’une voix forte : L’agneau qui a été immolé est digne de recevoir la puissance, la richesse, la sagesse, la force, l’honneur, la gloire, et la louange.",
        es: "Que decían en alta voz: El Cordero que fué inmolado es digno de tomar el poder y riquezas y sabiduría, y fortaleza y honra y gloria y alabanza."
    },
    {
        ref: "Ibrani 13:8",
        refEn: "Hebrews 13:8",
        refFr: "Hébreux 13:8",
        refEs: "Hebreos 13:8",
        id: "Yesus Kristus tetap sama, baik kemarin maupun hari ini dan sampai selama-lamanya.",
        en: "Jesus Christ is the same yesterday and today and forever.",
        fr: "Jésus-Christ est le même hier, aujourd’hui, et éternellement.",
        es: "Jesucristo es el mismo ayer, y hoy, y por los siglos."
    },
    {
        ref: "Yesaya 9:6",
        refEn: "Isaiah 9:6",
        refFr: "Ésaïe 9:6",
        refEs: "Isaías 9:6",
        id: "Karena seorang anak telah lahir untuk kita, seorang putera telah diberikan untuk kita; lambang pemerintahan ada di atas bahunya, dan namanya disebutkan orang: Penasihat Ajaib, Allah yang Perkasa, Bapa yang Kekal, Raja Damai.",
        en: "For to us a child is born, to us a son is given, and the government will be on his shoulders. And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.",
        fr: "Donner à l’empire de l’accroissement, Et une paix sans fin au trône de David et à son royaume, L’affermir et le soutenir par le droit et par la justice, Dès maintenant et à toujours : Voilà ce que fera le zèle de l’Éternel des armées.",
        es: "Porque un niño nos es nacido, hijo nos es dado; y el principado sobre su hombro: y llamaráse su nombre Admirable, Consejero, Dios fuerte, Padre eterno, Príncipe de paz."
    },
    {
        ref: "Mazmur 2:7-8",
        refEn: "Psalm 2:7-8",
        refFr: "Psaumes 2:7-8",
        refEs: "Salmos 2:7-8",
        id: "Aku mau menceritakan tentang ketetapan TUHAN; Ia berkata kepadaku: 'Anak-Ku engkau! Engkau telah Kuperanakkan pada hari ini. Mintalah kepada-Ku, maka bangsa-bangsa akan Kuberikan kepadamu menjadi milik pusakamu, dan ujung bumi menjadi kepunyaanmu.'",
        en: "I will proclaim the Lord's decree: He said to me, 'You are my son; today I have become your father. Ask me, and I will make the nations your inheritance, the ends of the earth your possession.'",
        fr: "Je publierai le décret ; L’Éternel m’a dit : Tu es mon fils ! Je t’ai engendré aujourd’hui. Demande-moi et je te donnerai les nations pour héritage, Les extrémités de la terre pour possession ;",
        es: "Yo publicaré el decreto: Jehová me ha dicho: Mi hijo eres tú; yo te engendré hoy. Pídeme, y te daré por heredad las gentes, y por posesión tuya los términos de la tierra."
    },
    {
        ref: "Yohanes 5:26",
        refEn: "John 5:26",
        refFr: "Jean 5:26",
        refEs: "Juan 5:26",
        id: "Sebab sama seperti Bapa mempunyai hidup dalam diri-Nya sendiri, demikian juga diberikan-Nya Anak mempunyai hidup dalam diri-Nya sendiri.",
        en: "For as the Father has life in himself, so he has granted the Son also to have life in himself.",
        fr: "Car, comme le Père a la vie en lui-même, ainsi il a donné au Fils d’avoir la vie en lui-même.",
        es: "Porque como el Padre tiene vida en sí mismo, así dió también al Hijo que tuviese vida en sí mismo:"
    },
    {
        ref: "Kolose 2:3",
        refEn: "Colossians 2:3",
        refFr: "Colossiens 2:3",
        refEs: "Colosenses 2:3",
        id: "Sebab di dalam Dialah tersembunyi segala harta hikmat dan pengetahuan.",
        en: "In whom are hidden all the treasures of wisdom and knowledge.",
        fr: "mystère dans lequel sont cachés tous les trésors de la sagesse et de la science.",
        es: "En el cual están escondidos todos los tesoros de sabiduría y conocimiento."
    },
    {
        ref: "Wahyu 19:16",
        refEn: "Revelation 19:16",
        refFr: "Apocalypse 19:16",
        refEs: "Apocalipsis 19:16",
        id: "Dan pada jubah-Nya dan paha-Nya tertulis suatu nama, yaitu: Raja segala raja dan Tuan di atas segala tuan.",
        en: "On his robe and on his thigh he has this name written: King of kings and Lord of lords.",
        fr: "Il avait sur son vêtement et sur sa cuisse un nom écrit : Roi des rois et Seigneur des seigneurs.",
        es: "Y en su vestidura y en su muslo tiene escrito este nombre: REY DE REYES Y SEÑOR DE SEÑORES."
    },
    {
        ref: "Matius 28:18",
        refEn: "Matthew 28:18",
        refFr: "Matthieu 28:18",
        refEs: "Mateo 28:18",
        id: "Yesus mendekati mereka dan berkata: 'Kepada-Ku telah diberikan segala kuasa di sorga dan di bumi.'",
        en: "Then Jesus came to them and said, 'All authority in heaven and on earth has been given to me.'",
        fr: "Jésus, s’étant approché, leur parla ainsi : Tout pouvoir m’a été donné dans le ciel et sur la terre.",
        es: "Y llegando Jesús, les habló, diciendo: Toda potestad me es dada en el cielo y en la tierra."
    },
    {
        ref: "1 Timotius 2:5",
        refEn: "1 Timothy 2:5",
        refFr: "1 Timothée 2:5",
        refEs: "1 Timoteo 2:5",
        id: "Karena Allah itu esa dan esa pula Dia yang menjadi pengantara antara Allah dan manusia, yaitu manusia Kristus Yesus.",
        en: "For there is one God and one mediator between God and mankind, the man Christ Jesus.",
        fr: "Car il y a un seul Dieu, et aussi un seul médiateur entre Dieu et les hommes, Jésus-Christ homme,",
        es: "Porque hay un Dios, asimismo un mediador entre Dios y los hombres, Jesucristo hombre;"
    },
    {
        ref: "Yohanes 11:43-44",
        refEn: "John 11:43-44",
        refFr: "Jean 11:43-44",
        refEs: "Juan 11:43-44",
        id: "Dan sesudah berkata demikian, berserulah Ia dengan suara keras: 'Lazarus, marilah ke luar!' Orang yang telah mati itu datang ke luar.",
        en: "When he had said this, Jesus called in a loud voice, 'Lazarus, come out!' The dead man came out.",
        fr: "Ayant dit cela, il cria d’une voix forte : Lazare, sors ! Et le mort sortit, les pieds et les mains liés de bandes, et le visage enveloppé d’un linge. Jésus leur dit : Déliez-le, et laissez-le aller.",
        es: "Y habiendo dicho estas cosas, clamó á gran voz: Lázaro, ven fuera. Y el que había estado muerto, salió, atadas las manos y los pies con vendas; y su rostro estaba envuelto en un sudario. Díceles Jesús: Desatadle, y dejadle ir."
    },

    // ===== KARYA SALIB / THE CROSS =====
    {
        ref: "Yesaya 53:5",
        refEn: "Isaiah 53:5",
        refFr: "Ésaïe 53:5",
        refEs: "Isaías 53:5",
        id: "Tetapi dia tertikam oleh karena pemberontakan kita, dia diremukkan oleh karena kejahatan kita; ganjaran yang mendatangkan keselamatan bagi kita ditimpakan kepadanya, dan oleh bilur-bilurnya kita menjadi sembuh.",
        en: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.",
        fr: "Mais il était blessé pour nos péchés, Brisé pour nos iniquités ; Le châtiment qui nous donne la paix est tombé sur lui, Et c’est par ses meurtrissures que nous sommes guéris.",
        es: "Mas él herido fué por nuestras rebeliones, molido por nuestros pecados: el castigo de nuestra paz sobre él; y por su llaga fuimos nosotros curados."
    },
    {
        ref: "Yesaya 53:3",
        refEn: "Isaiah 53:3",
        refFr: "Ésaïe 53:3",
        refEs: "Isaías 53:3",
        id: "Ia dihina dan dihindari orang, seorang yang penuh kesengsaraan dan yang biasa menderita kesakitan; ia sangat dihina, sehingga orang menutup mukanya terhadap dia dan bagi kita pun dia tidak masuk hitungan.",
        en: "He was despised and rejected by mankind, a man of suffering, and familiar with pain. Like one from whom people hide their faces he was despised, and we held him in low esteem.",
        fr: "Méprisé et abandonné des hommes, Homme de douleur et habitué à la souffrance, Semblable à celui dont on détourne le visage, Nous l’avons dédaigné, nous n’avons fait de lui aucun cas.",
        es: "Despreciado y desechado entre los hombres, varón de dolores, experimentado en quebranto: y como que escondimos de él el rostro, fué menospreciado, y no lo estimamos."
    },
    {
        ref: "Yohanes 19:30",
        refEn: "John 19:30",
        refFr: "Jean 19:30",
        refEs: "Juan 19:30",
        id: "Sesudah Yesus meminum anggur asam itu, berkatalah Ia: 'Sudah selesai.' Lalu Ia menundukkan kepala-Nya dan menyerahkan nyawa-Nya.",
        en: "When he had received the drink, Jesus said, 'It is finished.' And he bowed his head and gave up his spirit.",
        fr: "Quand Jésus eut pris le vinaigre, il dit : Tout est accompli. Et, baissant la tête, il rendit l’esprit.",
        es: "Y como Jesús tomó el vinagre, dijo: Consumado es. Y habiendo inclinado la cabeza, dió el espíritu."
    },
    {
        ref: "1 Petrus 2:24",
        refEn: "1 Peter 2:24",
        refFr: "1 Pierre 2:24",
        refEs: "1 Pedro 2:24",
        id: "Ia sendiri telah memikul dosa kita di dalam tubuh-Nya di kayu salib, supaya kita, yang telah mati terhadap dosa, hidup untuk kebenaran. Oleh bilur-bilur-Nya kamu telah sembuh.",
        en: "He himself bore our sins in his body on the cross, so that we might die to sins and live for righteousness; by his wounds you have been healed.",
        fr: "lui qui a porté lui-même nos péchés en son corps sur le bois, afin que morts aux péchés nous vivions pour la justice ; lui par les meurtrissures duquel vous avez été guéris.",
        es: "El cual mismo llevó nuestros pecados en su cuerpo sobre el madero, para que nosotros siendo muertos á los pecados, vivamos á la justicia: por la herida del cual habéis sido sanados."
    },
    {
        ref: "Galatia 2:20",
        refEn: "Galatians 2:20",
        refFr: "Galates 2:20",
        refEs: "Gálatas 2:20",
        id: "Namun aku hidup, tetapi bukan lagi aku sendiri yang hidup, melainkan Kristus yang hidup di dalam aku. Dan hidupku yang kuhidupi sekarang di dalam daging, adalah hidup oleh iman dalam Anak Allah yang telah mengasihi aku dan menyerahkan diri-Nya untuk aku.",
        en: "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.",
        fr: "J’ai été crucifié avec Christ ; et si je vis, ce n’est plus moi qui vis, c’est Christ qui vit en moi ; si je vis maintenant dans la chair, je vis dans la foi au Fils de Dieu, qui m’a aimé et qui s’est livré lui-même pour moi.",
        es: "Con Cristo estoy juntamente crucificado, y vivo, no ya yo, mas vive Cristo en mí: y lo que ahora vivo en la carne, lo vivo en la fe del Hijo de Dios, el cual me amó, y se entregó á sí mismo por mí."
    },
    {
        ref: "Kolose 1:19-20",
        refEn: "Colossians 1:19-20",
        refFr: "Colossiens 1:19-20",
        refEs: "Colosenses 1:19-20",
        id: "Karena seluruh kepenuhan Allah berkenan diam di dalam Dia, dan oleh Dialah Ia memperdamaikan segala sesuatu dengan diri-Nya, baik yang ada di bumi, maupun yang ada di sorga, sesudah Ia mengadakan pendamaian oleh darah salib Kristus.",
        en: "For God was pleased to have all his fullness dwell in him, and through him to reconcile to himself all things, whether things on earth or things in heaven, by making peace through his blood, shed on the cross.",
        fr: "Car Dieu a voulu que toute plénitude habitât en lui ; il a voulu par lui réconcilier tout avec lui-même, tant ce qui est sur la terre que ce qui est dans les cieux, en faisant la paix par lui, par le sang de sa croix.",
        es: "Por cuanto agradó al Padre que en él habitase toda plenitud, Y por él reconciliar todas las cosas á sí, pacificando por la sangre de su cruz, así lo que está en la tierra como lo que está en los cielos."
    },
    {
        ref: "1 Korintus 1:18",
        refEn: "1 Corinthians 1:18",
        refFr: "1 Corinthiens 1:18",
        refEs: "1 Corintios 1:18",
        id: "Sebab pemberitaan tentang salib memang adalah kebodohan bagi mereka yang akan binasa, tetapi bagi kita yang diselamatkan pemberitaan itu adalah kekuatan Allah.",
        en: "For the message of the cross is foolishness to those who are perishing, but to us who are being saved it is the power of God.",
        fr: "Car la prédication de la croix est une folie pour ceux qui périssent ; mais pour nous qui sommes sauvés, elle est une puissance de Dieu.",
        es: "Porque la palabra de la cruz es locura á los que se pierden; mas á los que se salvan, es á saber, á nosotros, es potencia de Dios."
    },
    {
        ref: "Roma 5:6",
        refEn: "Romans 5:6",
        refFr: "Romains 5:6",
        refEs: "Romanos 5:6",
        id: "Karena waktu kita masih lemah, Kristus telah mati untuk kita orang-orang durhaka pada waktu yang ditentukan oleh Allah.",
        en: "You see, at just the right time, when we were still powerless, Christ died for the ungodly.",
        fr: "Car, lorsque nous étions encore sans force, Christ, au temps marqué, est mort pour des impies.",
        es: "Porque Cristo, cuando aun éramos flacos, á su tiempo murió por los impíos."
    },
    {
        ref: "Matius 27:54",
        refEn: "Matthew 27:54",
        refFr: "Matthieu 27:54",
        refEs: "Mateo 27:54",
        id: "Ketika kepala pasukan dan prajurit-prajurit yang bersamanya yang menjaga Yesus melihat gempa bumi dan apa yang terjadi itu, sangat ketakutanlah mereka dan berkata: 'Sungguh, Ia ini adalah Anak Allah.'",
        en: "When the centurion and those with him who were guarding Jesus saw the earthquake and all that had happened, they were terrified, and exclaimed, 'Surely he was the Son of God!'",
        fr: "Le centenier et ceux qui étaient avec lui pour garder Jésus, ayant vu le tremblement de terre et ce qui venait d’arriver, furent saisis d’une grande frayeur, et dirent : Assurément, cet homme était Fils de Dieu.",
        es: "Y el centurión, y los que estaban con él guardando á Jesús, visto el terremoto, y las cosas que habían sido hechas, temieron en gran manera, diciendo: Verdaderamente Hijo de Dios era éste."
    },

    // ===== KEBANGKITAN / RESURRECTION =====
    {
        ref: "1 Korintus 15:3-4",
        refEn: "1 Corinthians 15:3-4",
        refFr: "1 Corinthiens 15:3-4",
        refEs: "1 Corintios 15:3-4",
        id: "Sebab yang sangat penting telah kusampaikan kepadamu, yaitu apa yang telah kuterima sendiri, ialah bahwa Kristus telah mati karena dosa-dosa kita, sesuai dengan Kitab Suci, bahwa Ia telah dikuburkan, dan bahwa Ia telah dibangkitkan, pada hari yang ketiga, sesuai dengan Kitab Suci.",
        en: "For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures.",
        fr: "Je vous ai enseigné avant tout, comme je l’avais aussi reçu, que Christ est mort pour nos péchés, selon les Écritures ; qu’il a été enseveli, et qu’il est ressuscité le troisième jour, selon les Écritures ;",
        es: "Porque primeramente os he enseñado lo que asimismo recibí: Que Cristo fué muerto por nuestros pecados, conforme á las Escrituras; Y que fué sepultado, y que resucitó al tercer día, conforme á las Escrituras;"
    },
    {
        ref: "1 Korintus 15:20",
        refEn: "1 Corinthians 15:20",
        refFr: "1 Corinthiens 15:20",
        refEs: "1 Corintios 15:20",
        id: "Tetapi yang benar ialah, bahwa Kristus telah dibangkitkan dari antara orang mati, sebagai yang sulung dari orang-orang yang telah meninggal.",
        en: "But Christ has indeed been raised from the dead, the firstfruits of those who have fallen asleep.",
        fr: "Mais maintenant, Christ est ressuscité des morts, il est les prémices de ceux qui sont morts.",
        es: "Mas ahora Cristo ha resucitado de los muertos; primicias de los que durmieron es hecho."
    },
    {
        ref: "Wahyu 1:17-18",
        refEn: "Revelation 1:17-18",
        refFr: "Apocalypse 1:17-18",
        refEs: "Apocalipsis 1:17-18",
        id: "Lalu Ia meletakkan tangan kanan-Nya di atasku, sambil berkata: 'Jangan takut! Aku adalah Yang Awal dan Yang Akhir, dan Yang Hidup. Aku telah mati, namun lihatlah, Aku hidup, sampai selama-lamanya dan Aku memegang segala kunci maut dan kerajaan maut.'",
        en: "He placed his right hand on me and said: 'Do not be afraid. I am the First and the Last. I am the Living One; I was dead, and now look, I am alive for ever and ever! And I hold the keys of death and Hades.'",
        fr: "Quand je le vis, je tombai à ses pieds comme mort. Il posa sur moi sa main droite en disant : Ne crains point ! Je suis le premier et le dernier, et le vivant. J’étais mort ; et voici, je suis vivant aux siècles des siècles . Je tiens les clefs de la mort et du séjour des morts.",
        es: "Y cuando yo le vi, caí como muerto á sus pies. Y él puso su diestra sobre mí, diciéndome: No temas: yo soy el primero y el último; Y el que vivo, y he sido muerto; y he aquí que vivo por siglos de siglos, Amén. Y tengo las llaves del infierno y de la muerte:"
    },
    {
        ref: "Roma 6:9",
        refEn: "Romans 6:9",
        refFr: "Romains 6:9",
        refEs: "Romanos 6:9",
        id: "Karena kita tahu, bahwa Kristus, sesudah Ia bangkit dari antara orang mati, tidak mati lagi: maut tidak berkuasa lagi atas Dia.",
        en: "For we know that since Christ was raised from the dead, he cannot die again; death no longer has mastery over him.",
        fr: "sachant que Christ ressuscité des morts ne meurt plus ; la mort n’a plus de pouvoir sur lui.",
        es: "Sabiendo que Cristo, habiendo resucitado de entre los muertos, ya no muere: la muerte no se enseñoreará más de él."
    },
    {
        ref: "Lukas 24:34",
        refEn: "Luke 24:34",
        refFr: "Luc 24:34",
        refEs: "Lucas 24:34",
        id: "Tuhan sungguh-sungguh telah bangkit dan telah menampakkan diri kepada Simon.",
        en: "It is true! The Lord has risen and has appeared to Simon.",
        fr: "et disant : Le Seigneur est réellement ressuscité, et il est apparu à Simon.",
        es: "Que decían: Ha resucitado el Señor verdaderamente, y ha aparecido á Simón."
    },
    {
        ref: "1 Korintus 15:55-57",
        refEn: "1 Corinthians 15:55-57",
        refFr: "1 Corinthiens 15:55-57",
        refEs: "1 Corintios 15:55-57",
        id: "Hai maut di manakah kemenanganmu? Hai maut, di manakah sengatmu? ... Syukur kepada Allah, yang telah memberikan kepada kita kemenangan oleh Yesus Kristus, Tuhan kita.",
        en: "Where, O death, is your victory? Where, O death, is your sting? ... But thanks be to God! He gives us the victory through our Lord Jesus Christ.",
        fr: "Ô mort, où est ta victoire ? Ô mort, où est ton aiguillon ? L’aiguillon de la mort, c’est le péché ; et la puissance du péché, c’est la loi. Mais grâces soient rendues à Dieu, qui nous donne la victoire par notre Seigneur Jésus-Christ !",
        es: "¿Dónde está, oh muerte, tu aguijón? ¿dónde, oh sepulcro, tu victoria? Ya que el aguijón de la muerte es el pecado, y la potencia del pecado, la ley. Mas á Dios gracias, que nos da la victoria por el Señor nuestro Jesucristo."
    },

    // ===== NAMA YESUS / THE NAME OF JESUS =====
    {
        ref: "Kisah Para Rasul 3:6",
        refEn: "Acts 3:6",
        refFr: "Actes des Apôtres 3:6",
        refEs: "Hechos 3:6",
        id: "Tetapi Petrus berkata: 'Emas dan perak tidak ada padaku, tetapi apa yang kupunyai, kuberikan kepadamu: Demi nama Yesus Kristus, orang Nazaret itu, berjalanlah!'",
        en: "Then Peter said, 'Silver or gold I do not have, but what I do have I give you. In the name of Jesus Christ of Nazareth, walk!'",
        fr: "Alors Pierre lui dit : Je n’ai ni argent, ni or ; mais ce que j’ai, je te le donne : au nom de Jésus-Christ de Nazareth, lève-toi et marche.",
        es: "Y Pedro dijo: Ni tengo plata ni oro; mas lo que tengo te doy: en el nombre de Jesucristo de Nazaret, levántate y anda."
    },
    {
        ref: "Yohanes 14:13-14",
        refEn: "John 14:13-14",
        refFr: "Jean 14:13-14",
        refEs: "Juan 14:13-14",
        id: "Dan apa juga yang kamu minta dalam nama-Ku, Aku akan melakukannya, supaya Bapa dipermuliakan di dalam Anak. Jika kamu meminta sesuatu kepada-Ku dalam nama-Ku, Aku akan melakukannya.",
        en: "And I will do whatever you ask in my name, so that the Father may be glorified in the Son. You may ask me for anything in my name, and I will do it.",
        fr: "et tout ce que vous demanderez en mon nom, je le ferai, afin que le Père soit glorifié dans le Fils. Si vous demandez quelque chose en mon nom, je le ferai.",
        es: "Y todo lo que pidiereis al Padre en mi nombre, esto haré, para que el Padre sea glorificado en el Hijo. Si algo pidiereis en mi nombre, yo lo haré."
    },
    {
        ref: "Kisah Para Rasul 2:21",
        refEn: "Acts 2:21",
        refFr: "Actes des Apôtres 2:21",
        refEs: "Hechos 2:21",
        id: "Dan barangsiapa yang berseru kepada nama Tuhan akan diselamatkan.",
        en: "And everyone who calls on the name of the Lord will be saved.",
        fr: "Alors quiconque invoquera le nom du Seigneur sera sauvé.",
        es: "Y será que todo aquel que invocare el nombre del Señor, será salvo."
    },
    {
        ref: "Yohanes 2:23",
        refEn: "John 2:23",
        refFr: "Jean 2:23",
        refEs: "Juan 2:23",
        id: "Dan sementara Ia di Yerusalem selama hari raya Paskah, banyak orang percaya dalam nama-Nya, karena mereka telah melihat tanda-tanda yang diadakan-Nya.",
        en: "Now while he was in Jerusalem at the Passover Festival, many people saw the signs he was performing and believed in his name.",
        fr: "Pendant que Jésus était à Jérusalem, à la fête de Pâque, plusieurs crurent en son nom, voyant les miracles qu’il faisait.",
        es: "Y estando en Jerusalem en la Pascua, en el día de la fiesta, muchos creyeron en su nombre, viendo las señales que hacía."
    },
    {
        ref: "Kisah Para Rasul 10:43",
        refEn: "Acts 10:43",
        refFr: "Actes des Apôtres 10:43",
        refEs: "Hechos 10:43",
        id: "Tentang Dialah semua nabi bersaksi, bahwa barangsiapa percaya kepada-Nya, ia akan mendapat pengampunan dosa oleh karena nama-Nya.",
        en: "All the prophets testify about him that everyone who believes in him receives forgiveness of sins through his name.",
        fr: "Tous les prophètes rendent de lui le témoignage que quiconque croit en lui reçoit par son nom le pardon des péchés.",
        es: "A éste dan testimonio todos los profetas, de que todos los que en él creyeren, recibirán perdón de pecados por su nombre."
    },

    // ===== YESUS MEMANGGIL / JESUS CALLS =====
    {
        ref: "Wahyu 3:20",
        refEn: "Revelation 3:20",
        refFr: "Apocalypse 3:20",
        refEs: "Apocalipsis 3:20",
        id: "Lihat, Aku berdiri di muka pintu dan mengetok; jikalau ada orang yang mendengar suara-Ku dan membukakan pintu, Aku akan masuk mendapatkannya dan Aku makan bersama-sama dengan dia, dan ia bersama-sama dengan Aku.",
        en: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me.",
        fr: "Voici, je me tiens à la porte, et je frappe. Si quelqu’un entend ma voix et ouvre la porte, j’entrerai chez lui, je souperai avec lui, et lui avec moi.",
        es: "He aquí, yo estoy á la puerta y llamo: si alguno oyere mi voz y abriere la puerta, entraré á él, y cenaré con él, y él conmigo."
    },
    {
        ref: "Yohanes 6:37",
        refEn: "John 6:37",
        refFr: "Jean 6:37",
        refEs: "Juan 6:37",
        id: "Semua yang diberikan Bapa kepada-Ku akan datang kepada-Ku, dan barangsiapa datang kepada-Ku, ia tidak akan Kubuang.",
        en: "All those the Father gives me will come to me, and whoever comes to me I will never drive away.",
        fr: "Tous ceux que le Père me donne viendront à moi, et je ne mettrai pas dehors celui qui vient à moi ;",
        es: "Todo lo que el Padre me da, vendrá á mí; y al que á mí viene, no le hecho fuera."
    },
    {
        ref: "Yohanes 7:37",
        refEn: "John 7:37",
        refFr: "Jean 7:37",
        refEs: "Juan 7:37",
        id: "Pada hari terakhir, yaitu pada puncak perayaan itu, Yesus berdiri dan berseru: 'Barangsiapa haus, baiklah ia datang kepada-Ku dan minum!'",
        en: "On the last and greatest day of the festival, Jesus stood and said in a loud voice, 'Let anyone who is thirsty come to me and drink.'",
        fr: "Le dernier jour, le grand jour de la fête, Jésus, se tenant debout, s’écria : Si quelqu’un a soif, qu’il vienne à moi, et qu’il boive.",
        es: "Mas en el postrer día grande de la fiesta, Jesús se ponía en pie y clamaba, diciendo: Si alguno tiene sed, venga á mí y beba."
    },
    {
        ref: "Lukas 4:18",
        refEn: "Luke 4:18",
        refFr: "Luc 4:18",
        refEs: "Lucas 4:18",
        id: "Roh Tuhan ada pada-Ku, oleh sebab Ia telah mengurapi Aku, untuk menyampaikan kabar baik kepada orang-orang miskin; dan Ia telah mengutus Aku untuk memberitakan pembebasan kepada orang-orang tawanan, dan penglihatan bagi orang-orang buta.",
        en: "The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor. He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind.",
        fr: "L’Esprit du Seigneur est sur moi, Parce qu’il m’a oint pour annoncer une bonne nouvelle aux pauvres ; Il m’a envoyé pour guérir ceux qui ont le cœur brisé,",
        es: "El Espíritu del Señor es sobre mí, por cuanto me ha ungido para dar buenas nuevas á los pobres: me ha enviado para sanar á los quebrantados de corazón; para pregonar á los cautivos libertad, y á los ciegos vista; para poner en libertad á los quebrantados:"
    },
    {
        ref: "Matius 11:28",
        refEn: "Matthew 11:28",
        refFr: "Matthieu 11:28",
        refEs: "Mateo 11:28",
        id: "Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, Aku akan memberi kelegaan kepadamu.",
        en: "Come to me, all you who are weary and burdened, and I will give you rest.",
        fr: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
        es: "Venid á mí todos los que estáis trabajados y cargados, que yo os haré descansar."
    },
    {
        ref: "Yohanes 6:35",
        refEn: "John 6:35",
        refFr: "Jean 6:35",
        refEs: "Juan 6:35",
        id: "Kata Yesus kepada mereka: 'Akulah roti hidup; barangsiapa datang kepada-Ku, ia tidak akan lapar lagi, dan barangsiapa percaya kepada-Ku, ia tidak akan haus lagi.'",
        en: "Then Jesus declared, 'I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.'",
        fr: "Jésus leur dit : Je suis le pain de vie. Celui qui vient à moi n’aura jamais faim, et celui qui croit en moi n’aura jamais soif.",
        es: "Y Jesús les dijo: Yo soy el pan de vida: el que á mí viene, nunca tendrá hambre; y el que en mí cree, no tendrá sed jamás."
    },
    {
        ref: "Lukas 5:32",
        refEn: "Luke 5:32",
        refFr: "Luc 5:32",
        refEs: "Lucas 5:32",
        id: "Aku datang bukan untuk memanggil orang benar, tetapi orang berdosa, supaya mereka bertobat.",
        en: "I have not come to call the righteous, but sinners to repentance.",
        fr: "Je ne suis pas venu appeler à la repentance des justes, mais des pécheurs.",
        es: "No he venido á llamar justos, sino pecadores á arrepentimiento."
    },

    // ===== KUASA YESUS / THE POWER OF JESUS =====
    {
        ref: "Markus 4:39",
        refEn: "Mark 4:39",
        refFr: "Marc 4:39",
        refEs: "Marcos 4:39",
        id: "Ia pun bangun, menghardik angin itu dan berkata kepada danau itu: 'Diam! Tenanglah!' Lalu angin itu reda dan danau itu menjadi teduh sekali.",
        en: "He got up, rebuked the wind and said to the waves, 'Quiet! Be still!' Then the wind died down and it was completely calm.",
        fr: "S’étant réveillé, il menaça le vent, et dit à la mer : Silence ! tais-toi ! Et le vent cessa, et il y eut un grand calme.",
        es: "Y levantándose, increpó al viento, y dijo á la mar: Calla, enmudece. Y cesó el viento, y fué hecha grande bonanza."
    },
    {
        ref: "Lukas 10:19",
        refEn: "Luke 10:19",
        refFr: "Luc 10:19",
        refEs: "Lucas 10:19",
        id: "Sesungguhnya Aku telah memberikan kuasa kepada kamu untuk menginjak ular dan kalajengking dan kuasa untuk mengatasi kekuatan musuh, sehingga tidak ada yang akan membahayakan kamu.",
        en: "I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy; nothing will harm you.",
        fr: "Voici, je vous ai donné le pouvoir de marcher sur les serpents et les scorpions, et sur toute la puissance de l’ennemi ; et rien ne pourra vous nuire.",
        es: "He aquí os doy potestad de hollar sobre las serpientes y sobre los escorpiones, y sobre toda fuerza del enemigo, y nada os dañará."
    },
    {
        ref: "Yohanes 11:25-26",
        refEn: "John 11:25-26",
        refFr: "Jean 11:25-26",
        refEs: "Juan 11:25-26",
        id: "Kata Yesus kepadanya: 'Akulah kebangkitan dan hidup; barangsiapa percaya kepada-Ku, ia akan hidup walaupun ia sudah mati, dan setiap orang yang hidup dan yang percaya kepada-Ku, tidak akan mati selama-lamanya.'",
        en: "Jesus said to her, 'I am the resurrection and the life. The one who believes in me will live, even though they die; and whoever lives by believing in me will never die.'",
        fr: "Jésus lui dit : Je suis la résurrection et la vie. Celui qui croit en moi vivra, quand même il serait mort ; et quiconque vit et croit en moi ne mourra jamais. Crois-tu cela ?",
        es: "Dícele Jesús: Yo soy la resurrección y la vida: el que cree en mí, aunque esté muerto, vivirá. Y todo aquel que vive y cree en mí, no morirá eternamente. ¿Crees esto?"
    },
    {
        ref: "Markus 16:17-18",
        refEn: "Mark 16:17-18",
        refFr: "Marc 16:17-18",
        refEs: "Marcos 16:17-18",
        id: "Tanda-tanda ini akan menyertai orang-orang yang percaya: mereka akan mengusir setan-setan demi nama-Ku, mereka akan berbicara dalam bahasa-bahasa yang baru bagi mereka... dan mereka akan meletakkan tangannya atas orang sakit, dan orang itu akan sembuh.",
        en: "And these signs will accompany those who believe: In my name they will drive out demons... they will place their hands on sick people, and they will get well.",
        fr: "Voici les miracles qui accompagneront ceux qui auront cru : en mon nom, ils chasseront les démons ; ils parleront de nouvelles langues ; ils saisiront des serpents ; s’ils boivent quelque breuvage mortel, il ne leur fera point de mal ; ils imposeront les mains aux malades, et les malades, seront guéris.",
        es: "Y estas señales seguirán á los que creyeren: En mi nombre echarán fuera demonios; hablarán nuevas lenguas; Quitarán serpientes, y si bebieren cosa mortífera, no les dañará; sobre los enfermos pondrán sus manos, y sanarán."
    },
    {
        ref: "Kisah Para Rasul 10:38",
        refEn: "Acts 10:38",
        refFr: "Actes des Apôtres 10:38",
        refEs: "Hechos 10:38",
        id: "Yaitu tentang Yesus dari Nazaret: bagaimana Allah mengurapi Dia dengan Roh Kudus dan kuat kuasa, Dia, yang berjalan berkeliling sambil berbuat baik dan menyembuhkan semua orang yang dikuasai Iblis, sebab Allah menyertai Dia.",
        en: "How God anointed Jesus of Nazareth with the Holy Spirit and power, and how he went around doing good and healing all who were under the power of the devil, because God was with him.",
        fr: "vous savez comment Dieu a oint du Saint-Esprit et de force Jésus de Nazareth, qui allait de lieu en lieu faisant du bien et guérissant tous ceux qui étaient sous l’empire du diable, car Dieu était avec lui.",
        es: "Cuanto á Jesús de Nazaret; cómo le ungió Dios de Espíritu Santo y de potencia; el cual anduvo haciendo bienes, y sanando á todos los oprimidos del diablo; porque Dios era con él."
    },

    // ===== YESUS SATU-SATUNYA JALAN / JESUS THE ONLY WAY =====
    {
        ref: "Yohanes 10:9",
        refEn: "John 10:9",
        refFr: "Jean 10:9",
        refEs: "Juan 10:9",
        id: "Akulah pintu; barangsiapa masuk melalui Aku, ia akan selamat dan ia akan masuk dan keluar dan menemukan padang rumput.",
        en: "I am the gate; whoever enters through me will be saved. They will come in and go out, and find pasture.",
        fr: "Je suis la porte. Si quelqu’un entre par moi, il sera sauvé ; il entrera et il sortira, et il trouvera des pâturages.",
        es: "Yo soy la puerta: el que por mí entrare, será salvo; y entrará, y saldrá, y hallará pastos."
    },
    {
        ref: "Yohanes 10:11",
        refEn: "John 10:11",
        refFr: "Jean 10:11",
        refEs: "Juan 10:11",
        id: "Akulah gembala yang baik. Gembala yang baik memberikan nyawanya bagi domba-dombanya.",
        en: "I am the good shepherd. The good shepherd lays down his life for the sheep.",
        fr: "Je suis le bon berger. Le bon berger donne sa vie pour ses brebis.",
        es: "Yo soy el buen pastor: el buen pastor su vida da por las ovejas."
    },
    {
        ref: "Yohanes 8:12",
        refEn: "John 8:12",
        refFr: "Jean 8:12",
        refEs: "Juan 8:12",
        id: "Maka Yesus berkata pula kepada orang banyak, kata-Nya: 'Akulah terang dunia; barangsiapa mengikut Aku, ia tidak akan berjalan dalam kegelapan, melainkan ia akan mempunyai terang hidup.'",
        en: "When Jesus spoke again to the people, he said, 'I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.'",
        fr: "Jésus leur parla de nouveau, et dit : Je suis la lumière du monde ; celui qui me suit ne marchera pas dans les ténèbres, mais il aura la lumière de la vie.",
        es: "Y hablóles Jesús otra vez, diciendo: Yo soy la luz del mundo: el que me sigue, no andará en tinieblas, mas tendrá la lumbre de la vida."
    },
    {
        ref: "Yohanes 4:42",
        refEn: "John 4:42",
        refFr: "Jean 4:42",
        refEs: "Juan 4:42",
        id: "Lalu mereka berkata kepada perempuan itu: 'Kami percaya, tetapi bukan lagi karena apa yang kaukatakan, sebab kami sendiri telah mendengar Dia dan kami tahu, bahwa Dialah benar-benar Juruselamat dunia.'",
        en: "They said to the woman, 'We no longer believe just because of what you said; now we have heard for ourselves, and we know that this man really is the Savior of the world.'",
        fr: "et ils disaient à la femme : Ce n’est plus à cause de ce que tu as dit que nous croyons ; car nous l’avons entendu nous-mêmes, et nous savons qu’il est vraiment le Sauveur du monde.",
        es: "Y decían á la mujer: Ya no creemos por tu dicho; porque nosotros mismos hemos oído, y sabemos que verdaderamente éste es el Salvador del mundo, el Cristo."
    },
    {
        ref: "Lukas 2:11",
        refEn: "Luke 2:11",
        refFr: "Luc 2:11",
        refEs: "Lucas 2:11",
        id: "Hari ini telah lahir bagimu Juruselamat, yaitu Kristus, Tuhan, di kota Daud.",
        en: "Today in the town of David a Savior has been born to you; he is the Messiah, the Lord.",
        fr: "c’est qu’aujourd’hui, dans la ville de David, il vous est né un Sauveur, qui est le Christ, le Seigneur.",
        es: "Que os ha nacido hoy, en la ciudad de David, un Salvador, que es CRISTO el Señor."
    },
    {
        ref: "Kisah Para Rasul 17:30-31",
        refEn: "Acts 17:30-31",
        refFr: "Actes des Apôtres 17:30-31",
        refEs: "Hechos 17:30-31",
        id: "Dengan tidak memandang lagi zaman kebodohan, sekarang Allah memberitakan kepada manusia, bahwa di mana-mana semua mereka harus bertobat. Karena Ia telah menetapkan suatu hari, pada waktu mana Ia dengan adil akan menghakimi dunia oleh seorang yang telah ditentukan-Nya.",
        en: "In the past God overlooked such ignorance, but now he commands all people everywhere to repent. For he has set a day when he will judge the world with justice by the man he has appointed.",
        fr: "Dieu , sans tenir compte des temps d’ignorance, annonce maintenant à tous les hommes, en tous lieux, qu’ils aient à se repentir, parce qu’il a fixé un jour où il jugera le monde selon la justice, par l’homme qu’il a désigné, ce dont il a donné à tous une preuve certaine en le ressuscitant des morts…",
        es: "Empero Dios, habiendo disimulado los tiempos de esta ignorancia, ahora denuncia á todos los hombres en todos los lugares que se arrepientan: Por cuanto ha establecido un día, en el cual ha de juzgar al mundo con justicia, por aquel varón al cual determinó; dando fe á todos con haberle levantado de los muertos."
    },
    {
        ref: "Yohanes 12:32",
        refEn: "John 12:32",
        refFr: "Jean 12:32",
        refEs: "Juan 12:32",
        id: "Dan Aku, apabila Aku ditinggikan dari bumi, Aku akan menarik semua orang datang kepada-Ku.",
        en: "And I, when I am lifted up from the earth, will draw all people to myself.",
        fr: "Et moi, quand j’aurai été élevé de la terre, j’attirerai tous les hommes à moi.",
        es: "Y yo, si fuere levantado de la tierra, á todos traeré á mí mismo."
    },
    {
        ref: "Yohanes 12:46",
        refEn: "John 12:46",
        refFr: "Jean 12:46",
        refEs: "Juan 12:46",
        id: "Aku telah datang ke dalam dunia sebagai terang, supaya setiap orang yang percaya kepada-Ku, jangan tinggal di dalam kegelapan.",
        en: "I have come into the world as a light, so that no one who believes in me should stay in darkness.",
        fr: "Je suis venu comme une lumière dans le monde, afin que quiconque croit en moi ne demeure pas dans les ténèbres.",
        es: "Yo la luz he venido al mundo, para que todo aquel que cree en mí no permanezca en tinieblas."
    },
    {
        ref: "Lukas 15:24",
        refEn: "Luke 15:24",
        refFr: "Luc 15:24",
        refEs: "Lucas 15:24",
        id: "Sebab anakku ini telah mati dan menjadi hidup kembali, ia telah hilang dan didapat kembali. Maka mulailah mereka bersukaria.",
        en: "For this son of mine was dead and is alive again; he was lost and is found. So they began to celebrate.",
        fr: "car mon fils que voici était mort, et il est revenu à la vie ; il était perdu, et il est retrouvé. Et ils commencèrent à se réjouir.",
        es: "Porque este mi hijo muerto era, y ha revivido; habíase perdido, y es hallado. Y comenzaron á regocijarse."
    },
    {
        ref: "Yohanes 3:17",
        refEn: "John 3:17",
        refFr: "Jean 3:17",
        refEs: "Juan 3:17",
        id: "Sebab Allah mengutus Anak-Nya ke dalam dunia bukan untuk menghakimi dunia, melainkan untuk menyelamatkannya oleh Dia.",
        en: "For God did not send his Son into the world to condemn the world, but to save the world through him.",
        fr: "Dieu, en effet, n’a pas envoyé son Fils dans le monde pour qu’il juge le monde, mais pour que le monde soit sauvé par lui.",
        es: "Porque no envió Dios á su Hijo al mundo para que condene al mundo, mas para que el mundo sea salvo por él."
    },

    // ===== AYAT TAMBAHAN / ADDITIONAL VERSES =====
    // Fokus: penjangkauan jiwa yang belum kenal TUHAN, penguatan, penghiburan, dan
    // pengenalan akan Yesus lebih dalam.
    {
        ref: "Roma 8:1",
        refEn: "Romans 8:1",
        refFr: "Romains 8:1",
        refEs: "Romanos 8:1",
        id: "Demikianlah sekarang tidak ada penghukuman bagi mereka yang ada di dalam Kristus Yesus.",
        en: "There is therefore now no condemnation to those who are in Christ Jesus, who don’t walk according to the flesh, but according to the Spirit.",
        fr: "Il n’y a donc maintenant aucune condamnation pour ceux qui sont en Jésus-Christ.",
        es: "AHORA pues, ninguna condenación hay para los que están en Cristo Jesús, los que no andan conforme á la carne, mas conforme al espíritu."
    },
    {
        ref: "Roma 8:31",
        refEn: "Romans 8:31",
        refFr: "Romains 8:31",
        refEs: "Romanos 8:31",
        id: "Sebab itu apakah yang akan kita katakan tentang semuanya itu? Jika Allah di pihak kita, siapakah yang akan melawan kita?",
        en: "What then shall we say about these things? If God is for us, who can be against us?",
        fr: "Que dirons-nous donc à l’égard de ces choses ? Si Dieu est pour nous, qui sera contre nous ?",
        es: "¿Pues qué diremos á esto? Si Dios por nosotros, ¿quién contra nosotros?"
    },
    {
        ref: "Roma 8:32",
        refEn: "Romans 8:32",
        refFr: "Romains 8:32",
        refEs: "Romanos 8:32",
        id: "Ia, yang tidak menyayangkan Anak- Nya sendiri, tetapi yang menyerahkan- Nya bagi kita semua, bagaimanakah mungkin Ia tidak mengaruniakan segala sesuatu kepada kita bersama-sama dengan Dia?",
        en: "He who didn’t spare his own Son, but delivered him up for us all, how would he not also with him freely give us all things?",
        fr: "Lui, qui n’a point épargné son propre Fils, mais qui l’a livré pour nous tous, comment ne nous donnera-t-il pas aussi toutes choses avec lui ?",
        es: "El que aun á su propio Hijo no perdonó, antes le entregó por todos nosotros, ¿cómo no nos dará también con él todas las cosas?"
    },
    {
        ref: "Roma 8:34",
        refEn: "Romans 8:34",
        refFr: "Romains 8:34",
        refEs: "Romanos 8:34",
        id: "Kristus Yesus, yang telah mati? Bahkan lebih lagi: yang telah bangkit, yang juga duduk di sebelah kanan Allah, yang malah menjadi Pembela bagi kita?",
        en: "Who is he who condemns? It is Christ who died, yes rather, who was raised from the dead, who is at the right hand of God, who also makes intercession for us.",
        fr: "Qui les condamnera ? Christ est mort ; bien plus, il est ressuscité, il est à la droite de Dieu, et il intercède pour nous !",
        es: "¿Quién es el que condenará? Cristo es el que murió; más aún, el que también resucitó, quien además está á la diestra de Dios, el que también intercede por nosotros."
    },
    {
        ref: "1 Timotius 1:15",
        refEn: "1 Timothy 1:15",
        refFr: "1 Timothée 1:15",
        refEs: "1 Timoteo 1:15",
        id: "Perkataan ini benar dan patut diterima sepenuhnya: \"Kristus Yesus datang ke dunia untuk menyelamatkan orang berdosa,\" dan di antara mereka akulah yang paling berdosa.",
        en: "The saying is faithful and worthy of all acceptance, that Christ Jesus came into the world to save sinners; of whom I am chief.",
        fr: "C’est une parole certaine et entièrement digne d’être reçue, que Jésus-Christ est venu dans le monde pour sauver les pécheurs, dont je suis le premier.",
        es: "Palabra fiel y digna de ser recibida de todos: que Cristo Jesús vino al mundo para salvar á los pecadores, de los cuales yo soy el primero."
    },
    {
        ref: "1 Timotius 2:3-4",
        refEn: "1 Timothy 2:3-4",
        refFr: "1 Timothée 2:3-4",
        refEs: "1 Timoteo 2:3-4",
        id: "Itulah yang baik dan yang berkenan kepada Allah, Juruselamat kita, yang menghendaki supaya semua orang diselamatkan dan memperoleh pengetahuan akan kebenaran.",
        en: "For this is good and acceptable in the sight of God our Savior; who desires all people to be saved and come to full knowledge of the truth.",
        fr: "Cela est bon et agréable devant Dieu notre Sauveur, qui veut que tous les hommes soient sauvés et parviennent à la connaissance de la vérité.",
        es: "Porque esto es bueno y agradable delante de Dios nuestro Salvador; El cual quiere que todos los hombres sean salvos, y que vengan al conocimiento de la verdad."
    },
    {
        ref: "2 Petrus 3:9",
        refEn: "2 Peter 3:9",
        refFr: "2 Pierre 3:9",
        refEs: "2 Pedro 3:9",
        id: "Tuhan tidak lalai menepati janji- Nya, sekalipun ada orang yang menganggapnya sebagai kelalaian, tetapi Ia sabar terhadap kamu, karena Ia menghendaki supaya jangan ada yang binasa, melainkan supaya semua orang berbalik dan bertobat.",
        en: "The Lord is not slow concerning his promise, as some count slowness; but is patient with us, not wishing that any should perish, but that all should come to repentance.",
        fr: "Le Seigneur ne tarde pas dans l’accomplissement de la promesse, comme quelques-uns le croient ; mais il use de patience envers vous, ne voulant pas qu’aucun périsse, mais voulant que tous arrivent à la repentance.",
        es: "El Señor no tarda su promesa, como algunos la tienen por tardanza; sino que es paciente para con nosotros, no queriendo que ninguno perezca, sino que todos procedan al arrepentimiento."
    },
    {
        ref: "Yehezkiel 33:11",
        refEn: "Ezekiel 33:11",
        refFr: "Ézéchiel 33:11",
        refEs: "Ezequiel 33:11",
        id: "Katakanlah kepada mereka: Demi Aku yang hidup, demikianlah firman Tuhan ALLAH, Aku tidak berkenan kepada kematian orang fasik, melainkan Aku berkenan kepada pertobatan orang fasik itu dari kelakuannya supaya ia hidup. Bertobatlah, bertobatlah dari hidupmu yang jahat itu! Mengapakah kamu akan mati, hai kaum Israel?",
        en: "Tell them, As I live, says the Lord Yahweh, I have no pleasure in the death of the wicked; but that the wicked turn from his way and live: turn, turn from your evil ways; for why will you die, house of Israel?",
        fr: "Dis-leur : je suis vivant ! dit le Seigneur, l’Éternel, ce que je désire, ce n’est pas que le méchant meure, c’est qu’il change de conduite et qu’il vive. Revenez, revenez de votre mauvaise voie ; et pourquoi mourriez-vous, maison d’Israël ?",
        es: "Diles: Vivo yo, dice el Señor Jehová, que no quiero la muerte del impío, sino que se torne el impío de su camino, y que viva. Volveos, volveos de vuestros malos caminos: ¿y por qué moriréis, oh casa de Israel?"
    },
    {
        ref: "Yesaya 55:6-7",
        refEn: "Isaiah 55:6-7",
        refFr: "Ésaïe 55:6-7",
        refEs: "Isaías 55:6-7",
        id: "Carilah TUHAN selama Ia berkenan ditemui; berserulah kepada-Nya selama Ia dekat! Baiklah orang fasik meninggalkan jalannya, dan orang jahat meninggalkan rancangannya; baiklah ia kembali kepada TUHAN, maka Dia akan mengasihaninya, dan kepada Allah kita, sebab Ia memberi pengampunan dengan limpahnya.",
        en: "Seek Yahweh while he may be found; call you on him while he is near: let the wicked forsake his way, and the unrighteous man his thoughts; and let him return to Yahweh, and he will have mercy on him; and to our God, for he will abundantly pardon.",
        fr: "Cherchez l’Éternel pendant qu’il se trouve ; Invoquez-le, tandis qu’il est près. Que le méchant abandonne sa voie, Et l’homme d’iniquité ses pensées ; Qu’il retourne à l’Éternel, qui aura pitié de lui, À notre Dieu, qui ne se lasse pas de pardonner.",
        es: "Buscad á Jehová mientras puede ser hallado, llamadle en tanto que está cercano. Deje el impío su camino, y el hombre inicuo sus pensamientos; y vuélvase á Jehová, el cual tendrá de él misericordia, y al Dios nuestro, el cual será amplio en perdonar."
    },
    {
        ref: "Yesaya 1:18",
        refEn: "Isaiah 1:18",
        refFr: "Ésaïe 1:18",
        refEs: "Isaías 1:18",
        id: "Marilah, baiklah kita berperkara! --firman TUHAN--Sekalipun dosamu merah seperti kirmizi, akan menjadi putih seperti salju; sekalipun berwarna merah seperti kain kesumba, akan menjadi putih seperti bulu domba.",
        en: "“Come now, and let us reason together,” says Yahweh: “Though your sins be as scarlet, they shall be as white as snow. Though they be red like crimson, they shall be as wool.",
        fr: "Venez et plaidons ! dit l’Éternel. Si vos péchés sont comme le cramoisi, ils deviendront blancs comme la neige ; S’ils sont rouges comme la pourpre, ils deviendront comme la laine.",
        es: "Venid luego, dirá Jehová, y estemos á cuenta: si vuestros pecados fueren como la grana, como la nieve serán emblanquecidos: si fueren rojos como el carmesí, vendrán á ser como blanca lana."
    },
    {
        ref: "Yohanes 10:27-28",
        refEn: "John 10:27-28",
        refFr: "Jean 10:27-28",
        refEs: "Juan 10:27-28",
        id: "Domba-domba-Ku mendengarkan suara-Ku dan Aku mengenal mereka dan mereka mengikut Aku, dan Aku memberikan hidup yang kekal kepada mereka dan mereka pasti tidak akan binasa sampai selama- lamanya dan seorangpun tidak akan merebut mereka dari tangan-Ku.",
        en: "My sheep hear my voice, and I know them, and they follow me. I give eternal life to them. They will never perish, and no one will snatch them out of my hand.",
        fr: "Mes brebis entendent ma voix ; je les connais, et elles me suivent. Je leur donne la vie éternelle ; et elles ne périront jamais, et personne ne les ravira de ma main.",
        es: "Mis ovejas oyen mi voz, y yo las conozco, y me siguen; Y yo les doy vida eterna: y no perecerán para siempre, ni nadie las arrebatará de mi mano."
    },
    {
        ref: "Kisah Para Rasul 2:38",
        refEn: "Acts 2:38",
        refFr: "Actes des Apôtres 2:38",
        refEs: "Hechos 2:38",
        id: "Jawab Petrus kepada mereka: \"Bertobatlah dan hendaklah kamu masing-masing memberi dirimu dibaptis dalam nama Yesus Kristus untuk pengampunan dosamu, maka kamu akan menerima karunia Roh Kudus.",
        en: "Peter said to them, “Repent, and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of sins, and you will receive the gift of the Holy Spirit.",
        fr: "Pierre leur dit : Repentez-vous, et que chacun de vous soit baptisé au nom de Jésus-Christ, pour le pardon de vos péchés ; et vous recevrez le don du Saint-Esprit.",
        es: "Y Pedro les dice: Arrepentíos, y bautícese cada uno de vosotros en el nombre de Jesucristo para perdón de los pecados; y recibiréis el don del Espíritu Santo."
    },
    {
        ref: "Kisah Para Rasul 3:19",
        refEn: "Acts 3:19",
        refFr: "Actes des Apôtres 3:19",
        refEs: "Hechos 3:19",
        id: "Karena itu sadarlah dan bertobatlah, supaya dosamu dihapuskan,",
        en: "“Repent therefore, and turn again, that your sins may be blotted out, so that there may come times of refreshing from the presence of the Lord,",
        fr: "Repentez-vous donc et convertissez-vous, pour que vos péchés soient effacés,",
        es: "Así que, arrepentíos y convertíos, para que sean borrados vuestros pecados; pues que vendrán los tiempos del refrigerio de la presencia del Señor,"
    },
    {
        ref: "Kisah Para Rasul 17:30",
        refEn: "Acts 17:30",
        refFr: "Actes des Apôtres 17:30",
        refEs: "Hechos 17:30",
        id: "Dengan tidak memandang lagi zaman kebodohan, maka sekarang Allah memberitakan kepada manusia, bahwa di mana-mana semua mereka harus bertobat.",
        en: "The times of ignorance therefore God overlooked. But now he commands that all people everywhere should repent,",
        fr: "Dieu , sans tenir compte des temps d’ignorance, annonce maintenant à tous les hommes, en tous lieux, qu’ils aient à se repentir,",
        es: "Empero Dios, habiendo disimulado los tiempos de esta ignorancia, ahora denuncia á todos los hombres en todos los lugares que se arrepientan:"
    },
    {
        ref: "Roma 2:4",
        refEn: "Romans 2:4",
        refFr: "Romains 2:4",
        refEs: "Romanos 2:4",
        id: "Maukah engkau menganggap sepi kekayaan kemurahan-Nya, kesabaran- Nya dan kelapangan hati-Nya? Tidakkah engkau tahu, bahwa maksud kemurahan Allah ialah menuntun engkau kepada pertobatan?",
        en: "Or do you despise the riches of his goodness, forbearance, and patience, not knowing that the goodness of God leads you to repentance?",
        fr: "Ou méprises-tu les richesses de sa bonté, de sa patience et de sa longanimité, ne reconnaissant pas que la bonté de Dieu te pousse à la repentance ?",
        es: "¿O menosprecias las riquezas de su benignidad, y paciencia, y longanimidad, ignorando que su benignidad te guía á arrepentimiento?"
    },
    {
        ref: "Titus 3:5",
        refEn: "Titus 3:5",
        refFr: "Tite 3:5",
        refEs: "Tito 3:5",
        id: "pada waktu itu Dia telah menyelamatkan kita, bukan karena perbuatan baik yang telah kita lakukan, tetapi karena rahmat-Nya oleh permandian kelahiran kembali dan oleh pembaharuan yang dikerjakan oleh Roh Kudus,",
        en: "not by works of righteousness, which we did ourselves, but according to his mercy, he saved us, through the washing of regeneration and renewing by the Holy Spirit,",
        fr: "il nous a sauvés, non à cause des œuvres de justice que nous aurions faites, mais selon sa miséricorde, par le baptême de la régénération et le renouvellement du Saint-Esprit,",
        es: "No por obras de justicia que nosotros habíamos hecho, mas por su misericordia nos salvó, por el lavacro de la regeneración, y de la renovación del Espíritu Santo;"
    },
    {
        ref: "Wahyu 22:17",
        refEn: "Revelation 22:17",
        refFr: "Apocalypse 22:17",
        refEs: "Apocalipsis 22:17",
        id: "Roh dan pengantin perempuan itu berkata: \"Marilah!\" Dan barangsiapa yang mendengarnya, hendaklah ia berkata: \"Marilah!\" Dan barangsiapa yang haus, hendaklah ia datang, dan barangsiapa yang mau, hendaklah ia mengambil air kehidupan dengan cuma-cuma!",
        en: "The Spirit and the bride say, “Come!” He who hears, let him say, “Come!” He who is thirsty, let him come. He who desires, let him take the water of life freely.",
        fr: "Et l’Esprit et l’épouse disent : Viens. Et que celui qui entend dise : Viens. Et que celui qui a soif vienne ; que celui qui veut, prenne de l’eau de la vie, gratuitement.",
        es: "Y el Espíritu y la Esposa dicen: Ven. Y el que oye, diga: Ven. Y el que tiene sed, venga: y el que quiere, tome del agua de la vida de balde."
    },
    {
        ref: "Lukas 5:31-32",
        refEn: "Luke 5:31-32",
        refFr: "Luc 5:31-32",
        refEs: "Lucas 5:31-32",
        id: "Lalu jawab Yesus kepada mereka, kata-Nya: /\"Bukan orang sehat yang memerlukan tabib, tetapi orang sakit; Aku datang bukan untuk memanggil orang benar, tetapi orang berdosa, supaya mereka bertobat.\"",
        en: "Jesus answered them, “Those who are healthy have no need for a physician, but those who are sick do. I have not come to call the righteous, but sinners to repentance.”",
        fr: "Jésus, prenant la parole, leur dit : Ce ne sont pas ceux qui se portent bien qui ont besoin de médecin, mais les malades. Je ne suis pas venu appeler à la repentance des justes, mais des pécheurs.",
        es: "Y respondiendo Jesús, les dijo: Los que están sanos no necesitan médico, sino los que están enfermos. No he venido á llamar justos, sino pecadores á arrepentimiento."
    },
    {
        ref: "Lukas 19:9-10",
        refEn: "Luke 19:9-10",
        refFr: "Luc 19:9-10",
        refEs: "Lucas 19:9-10",
        id: "Kata Yesus kepadanya: /\"Hari ini telah terjadi keselamatan kepada rumah ini, karena orang inipun anak Abraham. Sebab Anak Manusia datang untuk mencari dan menyelamatkan yang hilang.\"",
        en: "Jesus said to him, “Today, salvation has come to this house, because he also is a son of Abraham. For the Son of Man came to seek and to save that which was lost.”",
        fr: "Jésus lui dit : Le salut est entré aujourd’hui dans cette maison, parce que celui-ci est aussi un fils d’Abraham. Car le Fils de l’homme est venu chercher et sauver ce qui était perdu.",
        es: "Y Jesús le dijo: Hoy ha venido la salvación á esta casa; por cuanto él también es hijo de Abraham. Porque el Hijo del hombre vino á buscar y á salvar lo que se había perdido."
    },
    {
        ref: "Matius 18:11",
        refEn: "Matthew 18:11",
        refFr: "Matthieu 18:11",
        refEs: "Mateo 18:11",
        id: "(Karena Anak Manusia datang untuk menyelamatkan yang hilang.)\"",
        en: "For the Son of Man came to save that which was lost.",
        fr: "Car le Fils de l’homme est venu sauver ce qui était perdu.",
        es: "Porque el Hijo del hombre ha venido para salvar lo que se había perdido."
    },
    {
        ref: "1 Yohanes 2:2",
        refEn: "1 John 2:2",
        refFr: "1 Jean 2:2",
        refEs: "1 Juan 2:2",
        id: "Dan Ia adalah pendamaian untuk segala dosa kita, dan bukan untuk dosa kita saja, tetapi juga untuk dosa seluruh dunia.",
        en: "And he is the atoning sacrifice for our sins, and not for ours only, but also for the whole world.",
        fr: "Il est lui-même une victime expiatoire pour nos péchés, non seulement pour les nôtres, mais aussi pour ceux du monde entier.",
        es: "Y él es la propiciación por nuestros pecados: y no solamente por los nuestros, sino también por los de todo el mundo."
    },
    {
        ref: "1 Yohanes 4:9-10",
        refEn: "1 John 4:9-10",
        refFr: "1 Jean 4:9-10",
        refEs: "1 Juan 4:9-10",
        id: "Dalam hal inilah kasih Allah dinyatakan di tengah-tengah kita, yaitu bahwa Allah telah mengutus Anak-Nya yang tunggal ke dalam dunia, supaya kita hidup oleh-Nya. Inilah kasih itu: Bukan kita yang telah mengasihi Allah, tetapi Allah yang telah mengasihi kita dan yang telah mengutus Anak-Nya sebagai pendamaian bagi dosa-dosa kita.",
        en: "By this God’s love was revealed in us, that God has sent his one and only Son into the world that we might live through him. In this is love, not that we loved God, but that he loved us, and sent his Son as the atoning sacrifice for our sins.",
        fr: "L’amour de Dieu a été manifesté envers nous en ce que Dieu a envoyé son Fils unique dans le monde, afin que nous vivions par lui. Et cet amour consiste, non point en ce que nous avons aimé Dieu, mais en ce qu’il nous a aimés et a envoyé son Fils comme victime expiatoire pour nos péchés.",
        es: "En esto se mostró el amor de Dios para con nosotros, en que Dios envió á su Hijo unigénito al mundo, para que vivamos por él. En esto consiste el amor: no que nosotros hayamos amado á Dios, sino que él nos amó á nosotros, y ha enviado á su Hijo en propiciación por nuestros pecados."
    },
    {
        ref: "1 Yohanes 4:14",
        refEn: "1 John 4:14",
        refFr: "1 Jean 4:14",
        refEs: "1 Juan 4:14",
        id: "Dan kami telah melihat dan bersaksi, bahwa Bapa telah mengutus Anak-Nya menjadi Juruselamat dunia.",
        en: "We have seen and testify that the Father has sent the Son as the Savior of the world.",
        fr: "Et nous, nous avons vu et nous attestons que le Père a envoyé le Fils comme Sauveur du monde.",
        es: "Y nosotros hemos visto y testificamos que el Padre ha enviado al Hijo para ser Salvador del mundo."
    },
    {
        ref: "Yohanes 5:24",
        refEn: "John 5:24",
        refFr: "Jean 5:24",
        refEs: "Juan 5:24",
        id: "Aku berkata kepadamu: Sesungguhnya barangsiapa mendengar perkataan-Ku dan percaya kepada Dia yang mengutus Aku, ia mempunyai hidup yang kekal dan tidak turut dihukum, sebab ia sudah pindah dari dalam maut ke dalam hidup.",
        en: "“Most certainly I tell you, he who hears my word, and believes him who sent me, has eternal life, and doesn’t come into judgment, but has passed out of death into life.",
        fr: "En vérité, en vérité, je vous le dis, celui qui écoute ma parole, et qui croit à celui qui m’a envoyé, a la vie éternelle et ne vient point en jugement, mais il est passé de la mort à la vie.",
        es: "De cierto, de cierto os digo: El que oye mi palabra, y cree al que me ha enviado, tiene vida eterna; y no vendrá á condenación, mas pasó de muerte á vida."
    },
    {
        ref: "Roma 10:13",
        refEn: "Romans 10:13",
        refFr: "Romains 10:13",
        refEs: "Romanos 10:13",
        id: "Sebab, barangsiapa yang berseru kepada nama Tuhan, akan diselamatkan.",
        en: "For, “Whoever will call on the name of the Lord will be saved.”",
        fr: "Car quiconque invoquera le nom du Seigneur sera sauvé.",
        es: "Porque todo aquel que invocare el nombre del Señor, será salvo."
    },
    {
        ref: "Roma 10:17",
        refEn: "Romans 10:17",
        refFr: "Romains 10:17",
        refEs: "Romanos 10:17",
        id: "Jadi, iman timbul dari pendengaran, dan pendengaran oleh firman Kristus.",
        en: "So faith comes by hearing, and hearing by the word of God.",
        fr: "Ainsi la foi vient de ce qu’on entend, et ce qu’on entend vient de la parole de Christ.",
        es: "Luego la fe es por el oir; y el oir por la palabra de Dios."
    },
    {
        ref: "Galatia 3:26",
        refEn: "Galatians 3:26",
        refFr: "Galates 3:26",
        refEs: "Gálatas 3:26",
        id: "Sebab kamu semua adalah anak- anak Allah karena iman di dalam Yesus Kristus.",
        en: "For you are all children of God, through faith in Christ Jesus.",
        fr: "Car vous êtes tous fils de Dieu par la foi en Jésus-Christ ;",
        es: "Porque todos sois hijos de Dios por la fe en Cristo Jesús."
    },
    {
        ref: "Efesus 2:4-5",
        refEn: "Ephesians 2:4-5",
        refFr: "Éphésiens 2:4-5",
        refEs: "Efesios 2:4-5",
        id: "Tetapi Allah yang kaya dengan rahmat, oleh karena kasih-Nya yang besar, yang dilimpahkan-Nya kepada kita, telah menghidupkan kita bersama- sama dengan Kristus, sekalipun kita telah mati oleh kesalahan-kesalahan kita--oleh kasih karunia kamu diselamatkan--",
        en: "But God, being rich in mercy, for his great love with which he loved us, even when we were dead through our trespasses, made us alive together with Christ (by grace you have been saved),",
        fr: "Mais Dieu, qui est riche en miséricorde, à cause du grand amour dont il nous a aimés, nous qui étions morts par nos offenses, nous a rendus à la vie avec Christ (c’est par grâce que vous êtes sauvés) ;",
        es: "Empero Dios, que es rico en misericordia, por su mucho amor con que nos amó, Aun estando nosotros muertos en pecados, nos dió vida juntamente con Cristo; por gracia sois salvos;"
    },
    {
        ref: "Titus 2:11",
        refEn: "Titus 2:11",
        refFr: "Tite 2:11",
        refEs: "Tito 2:11",
        id: "Karena kasih karunia Allah yang menyelamatkan semua manusia sudah nyata.",
        en: "For the grace of God has appeared, bringing salvation to all men,",
        fr: "Car la grâce de Dieu, source de salut pour tous les hommes, a été manifestée.",
        es: "Porque la gracia de Dios que trae salvación á todos los hombres, se manifestó,"
    },
    {
        ref: "Yohanes 1:1",
        refEn: "John 1:1",
        refFr: "Jean 1:1",
        refEs: "Juan 1:1",
        id: "Pada mulanya adalah Firman; Firman itu bersama-sama dengan Allah dan Firman itu adalah Allah.",
        en: "In the beginning was the Word, and the Word was with God, and the Word was God.",
        fr: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.",
        es: "EN el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios."
    },
    {
        ref: "Yohanes 13:13",
        refEn: "John 13:13",
        refFr: "Jean 13:13",
        refEs: "Juan 13:13",
        id: "Kamu menyebut Aku Guru dan Tuhan, dan katamu itu tepat, sebab memang Akulah Guru dan Tuhan.",
        en: "You call me, ‘Teacher’ and ‘Lord.’ You say so correctly, for so I am.",
        fr: "Vous m’appelez Maître et Seigneur ; et vous dites bien, car je le suis.",
        es: "Vosotros me llamáis, Maestro, y, Señor: y decís bien; porque lo soy."
    },
    {
        ref: "Yohanes 14:9",
        refEn: "John 14:9",
        refFr: "Jean 14:9",
        refEs: "Juan 14:9",
        id: "Kata Yesus kepadanya: /\"Telah sekian lama Aku bersama-sama kamu, Filipus, Yohanes namun engkau tidak mengenal Aku? Barangsiapa telah melihat Aku, ia telah melihat Bapa; bagaimana engkau berkata: Tunjukkanlah Bapa itu kepada kami.",
        en: "Jesus said to him, “Have I been with you such a long time, and do you not know me, Philip? He who has seen me has seen the Father. How do you say, ‘Show us the Father?’",
        fr: "Jésus lui dit : Il y a si longtemps que je suis avec vous, et tu ne m’as pas connu, Philippe ! Celui qui m’a vu a vu le Père ; comment dis-tu : Montre-nous le Père ?",
        es: "Jesús le dice: ¿Tanto tiempo ha que estoy con vosotros, y no me has conocido, Felipe? El que me ha visto, ha visto al Padre; ¿cómo, pues, dices tú: Muéstranos el Padre?"
    },
    {
        ref: "Yohanes 17:3",
        refEn: "John 17:3",
        refFr: "Jean 17:3",
        refEs: "Juan 17:3",
        id: "Inilah hidup yang kekal itu, yaitu bahwa mereka mengenal Engkau, satu-satunya Allah yang benar, dan mengenal Yesus Kristus yang telah Engkau utus.",
        en: "This is eternal life, that they should know you, the only true God, and him whom you sent, Jesus Christ.",
        fr: "Or, la vie éternelle, c’est qu’ils te connaissent, toi, le seul vrai Dieu, et celui que tu as envoyé, Jésus-Christ.",
        es: "Esta empero es la vida eterna: que te conozcan el solo Dios verdadero, y á Jesucristo, al cual has enviado."
    },
    {
        ref: "Kolose 1:15",
        refEn: "Colossians 1:15",
        refFr: "Colossiens 1:15",
        refEs: "Colosenses 1:15",
        id: "Ia adalah gambar Allah yang tidak kelihatan, yang sulung, lebih utama dari segala yang diciptakan,",
        en: "who is the image of the invisible God, the firstborn of all creation.",
        fr: "Il est l’image du Dieu invisible, le premier-né de toute la création.",
        es: "El cual es la imagen del Dios invisible, el primogénito de toda criatura."
    },
    {
        ref: "Kolose 1:16-17",
        refEn: "Colossians 1:16-17",
        refFr: "Colossiens 1:16-17",
        refEs: "Colosenses 1:16-17",
        id: "karena di dalam Dialah telah diciptakan segala sesuatu, yang ada di sorga dan yang ada di bumi, yang kelihatan dan yang tidak kelihatan, baik singgasana, maupun kerajaan, baik pemerintah, maupun penguasa; segala sesuatu diciptakan oleh Dia dan untuk Dia. Ia ada terlebih dahulu dari segala sesuatu dan segala sesuatu ada di dalam Dia.",
        en: "For by him all things were created, in the heavens and on the earth, things visible and things invisible, whether thrones or dominions or principalities or powers; all things have been created through him, and for him. He is before all things, and in him all things are held together.",
        fr: "Car en lui ont été créées toutes les choses qui sont dans les cieux et sur la terre, les visibles et les invisibles, trônes, dignités, dominations, autorités. Tout a été créé par lui et pour lui. Il est avant toutes choses, et toutes choses subsistent en lui.",
        es: "Porque por él fueron criadas todas las cosas que están en los cielos, y que están en la tierra, visibles é invisibles; sean tronos, sean dominios, sean principados, sean potestades; todo fué criado por él y para él. Y él es antes de todas las cosas, y por él todas las cosas subsisten:"
    },
    {
        ref: "Kolose 2:9",
        refEn: "Colossians 2:9",
        refFr: "Colossiens 2:9",
        refEs: "Colosenses 2:9",
        id: "Sebab dalam Dialah berdiam secara jasmaniah seluruh kepenuhan ke-Allahan,",
        en: "For in him all the fullness of the Godhead dwells bodily,",
        fr: "Car en lui habite corporellement toute la plénitude de la divinité.",
        es: "Porque en él habita toda la plenitud de la divinidad corporalmente:"
    },
    {
        ref: "Filipi 3:8",
        refEn: "Philippians 3:8",
        refFr: "Philippiens 3:8",
        refEs: "Filipenses 3:8",
        id: "Malahan segala sesuatu kuanggap rugi, karena pengenalan akan Kristus Yesus, Tuhanku, lebih mulia dari pada semuanya. Oleh karena Dialah aku telah melepaskan semuanya itu dan menganggapnya sampah, supaya aku memperoleh Kristus,",
        en: "Yes most certainly, and I count all things to be loss for the excellency of the knowledge of Christ Jesus, my Lord, for whom I suffered the loss of all things, and count them nothing but refuse, that I may gain Christ",
        fr: "Et même je regarde toutes choses comme une perte, à cause de l’excellence de la connaissance de Jésus-Christ mon Seigneur, pour lequel j’ai renoncé à tout, et je les regarde comme de la boue, afin de gagner Christ,",
        es: "Y ciertamente, aun reputo todas las cosas pérdida por el eminente conocimiento de Cristo Jesús, mi Señor, por amor del cual lo he perdido todo, y téngolo por estiércol, para ganar á Cristo,"
    },
    {
        ref: "Filipi 3:10",
        refEn: "Philippians 3:10",
        refFr: "Philippiens 3:10",
        refEs: "Filipenses 3:10",
        id: "Yang kukehendaki ialah mengenal Dia dan kuasa kebangkitan-Nya dan persekutuan dalam penderitaan-Nya, di mana aku menjadi serupa dengan Dia dalam kematian-Nya,",
        en: "that I may know him, and the power of his resurrection, and the fellowship of his sufferings, becoming conformed to his death;",
        fr: "Afin de connaître Christ, et la puissance de sa résurrection, et la communion de ses souffrances, en devenant conforme à lui dans sa mort, pour parvenir,",
        es: "A fin de conocerle, y la virtud de su resurrección, y la participación de sus padecimientos, en conformidad á su muerte,"
    },
    {
        ref: "Markus 10:45",
        refEn: "Mark 10:45",
        refFr: "Marc 10:45",
        refEs: "Marcos 10:45",
        id: "Karena Anak Manusia juga datang bukan untuk dilayani, melainkan untuk melayani dan untuk memberikan nyawa-Nya menjadi tebusan bagi banyak orang.\"",
        en: "For the Son of Man also came not to be served, but to serve, and to give his life as a ransom for many.”",
        fr: "Car le Fils de l’homme est venu, non pour être servi, mais pour servir et donner sa vie comme la rançon de plusieurs.",
        es: "Porque el Hijo del hombre tampoco vino para ser servido, mas para servir, y dar su vida en rescate por muchos."
    },
    {
        ref: "1 Timotius 3:16",
        refEn: "1 Timothy 3:16",
        refFr: "1 Timothée 3:16",
        refEs: "1 Timoteo 3:16",
        id: "Dan sesungguhnya agunglah rahasia ibadah kita: \"Dia, yang telah menyatakan diri-Nya dalam rupa manusia, dibenarkan dalam Roh; yang menampakkan diri-Nya kepada malaikat-malaikat, diberitakan di antara bangsa-bangsa yang tidak mengenal Allah; yang dipercayai di dalam dunia, diangkat dalam kemuliaan.\"",
        en: "Without controversy, the mystery of godliness is great: God was revealed in the flesh, justified in the spirit, seen by angels, preached among the nations, believed on in the world, and received up in glory.",
        fr: "Et, sans contredit, le mystère de la piété est grand : celui qui a été manifesté en chair, justifié par l’Esprit, vu des anges, prêché aux Gentils, cru dans le monde, élevé dans la gloire.",
        es: "Y sin contradicción, grande es el misterio de la piedad: Dios ha sido manifestado en carne; ha sido justificado con el Espíritu; ha sido visto de los ángeles; ha sido predicado á los Gentiles; ha sido creído en el mundo; ha sido recibido en gloria."
    },
    {
        ref: "1 Korintus 1:30",
        refEn: "1 Corinthians 1:30",
        refFr: "1 Corinthiens 1:30",
        refEs: "1 Corintios 1:30",
        id: "Tetapi oleh Dia kamu berada dalam Kristus Yesus, yang oleh Allah telah menjadi hikmat bagi kita. Ia membenarkan dan menguduskan dan menebus kita.",
        en: "But of him, you are in Christ Jesus, who was made to us wisdom from God, and righteousness and sanctification, and redemption:",
        fr: "Or, c’est par lui que vous êtes en Jésus-Christ, lequel, de par Dieu, a été fait pour nous sagesse, justice et sanctification et rédemption,",
        es: "Mas de él sois vosotros en Cristo Jesús, el cual nos ha sido hecho por Dios sabiduría, y justificación, y santificación, y redención:"
    },
    {
        ref: "2 Korintus 4:6",
        refEn: "2 Corinthians 4:6",
        refFr: "2 Corinthiens 4:6",
        refEs: "2 Corintios 4:6",
        id: "Sebab Allah yang telah berfirman: \"Dari dalam gelap akan terbit terang!\", Ia juga yang membuat terang-Nya bercahaya di dalam hati kita, supaya kita beroleh terang dari pengetahuan tentang kemuliaan Allah yang nampak pada wajah Kristus.",
        en: "seeing it is God who said, “Light will shine out of darkness,” who has shone in our hearts, to give the light of the knowledge of the glory of God in the face of Jesus Christ.",
        fr: "Car Dieu, qui a dit : La lumière brillera du sein des ténèbres ! a fait briller la lumière dans nos cœurs pour faire resplendir la connaissance de la gloire de Dieu sur la face de Christ.",
        es: "Porque Dios, que mandó que de las tinieblas resplandeciese la luz, es el que resplandeció en nuestros corazones, para iluminación del conocimiento de la gloria de Dios en la faz de Jesucristo."
    },
    {
        ref: "Mikha 5:2",
        refEn: "Micah 5:2",
        refFr: "Michée 5:2",
        refEs: "Miqueas 5:2",
        id: "Tetapi engkau, hai Betlehem Efrata, hai yang terkecil di antara kaum-kaum Yehuda, dari padamu akan bangkit bagi-Ku seorang yang akan memerintah Israel, yang permulaannya sudah sejak purbakala, sejak dahulu kala.",
        en: "But you, Bethlehem Ephrathah, being small among the clans of Judah, out of you one will come out to me that is to be ruler in Israel; whose goings out are from of old, from ancient times.",
        fr: "C’est pourquoi il les livrera Jusqu’au temps où enfantera celle qui doit enfanter, Et le reste de ses frères Reviendra auprès des enfants d’Israël.",
        es: "Mas tú, Beth-lehem Ephrata, pequeña para ser en los millares de Judá, de ti me saldrá el que será Señor en Israel; y sus salidas son desde el principio, desde los días del siglo."
    },
    {
        ref: "Yohanes 15:15",
        refEn: "John 15:15",
        refFr: "Jean 15:15",
        refEs: "Juan 15:15",
        id: "Aku tidak menyebut kamu lagi hamba, sebab hamba tidak tahu, apa yang diperbuat oleh tuannya, tetapi Aku menyebut kamu sahabat, karena Aku telah memberitahukan kepada kamu segala sesuatu yang telah Kudengar dari Bapa-Ku.",
        en: "No longer do I call you servants, for the servant doesn’t know what his lord does. But I have called you friends, for everything that I heard from my Father, I have made known to you.",
        fr: "Je ne vous appelle plus serviteurs, parce que le serviteur ne sait pas ce que fait son maître ; mais je vous ai appelés amis, parce que je vous ai fait connaître tout ce que j’ai appris de mon Père.",
        es: "Ya no os llamaré siervos, porque el siervo no sabe lo que hace su señor: mas os he llamado amigos, porque todas las cosas que oí de mi Padre, os he hecho notorias."
    },
    {
        ref: "Matius 1:23",
        refEn: "Matthew 1:23",
        refFr: "Matthieu 1:23",
        refEs: "Mateo 1:23",
        id: "\"Sesungguhnya, anak dara itu akan mengandung dan melahirkan seorang anak laki-laki, dan mereka akan menamakan Dia Imanuel\" --yang berarti: Allah menyertai kita.",
        en: "“Behold, the virgin shall be with child, and shall give birth to a son. They shall call his name Immanuel”; which is, being interpreted, “God with us.”",
        fr: "Voici, la vierge sera enceinte, elle enfantera un fils, et on lui donnera le nom d’Emmanuel, ce qui signifie Dieu avec nous.",
        es: "He aquí la virgen concebirá y parirá un hijo, y llamarás su nombre Emmanuel, que declarado, es: Con nosotros Dios."
    },
    {
        ref: "Yesaya 41:13",
        refEn: "Isaiah 41:13",
        refFr: "Ésaïe 41:13",
        refEs: "Isaías 41:13",
        id: "Sebab Aku ini, TUHAN, Allahmu, memegang tangan kananmu dan berkata kepadamu: \"Janganlah takut, Akulah yang menolong engkau.\"",
        en: "For I, Yahweh your God, will hold your right hand, saying to you, ‘Don’t be afraid. I will help you.’",
        fr: "Car je suis l’Éternel, ton Dieu, Qui fortifie ta droite, Qui te dis : Ne crains rien, Je viens à ton secours.",
        es: "Porque yo Jehová soy tu Dios, que te ase de tu mano derecha, y te dice: No temas, yo te ayudé."
    },
    {
        ref: "Ulangan 31:8",
        refEn: "Deuteronomy 31:8",
        refFr: "Deutéronome 31:8",
        refEs: "Deuteronomio 31:8",
        id: "Sebab TUHAN, Dia sendiri akan berjalan di depanmu, Dia sendiri akan menyertai engkau, Dia tidak akan membiarkan engkau dan tidak akan meninggalkan engkau; janganlah takut dan janganlah patah hati.\"",
        en: "Yahweh himself is who goes before you. He will be with you. He will not fail you nor forsake you. Don’t be afraid. Don’t be discouraged.”",
        fr: "L’Éternel marchera lui-même devant toi, il sera lui-même avec toi, il ne te délaissera point, il ne t’abandonnera point ; ne crains point, et ne t’effraie point.",
        es: "Y Jehová es el que va delante de ti; él será contigo, no te dejará, ni te desamparará; no temas, ni te intimides."
    },
    {
        ref: "Mazmur 27:1",
        refEn: "Psalm 27:1",
        refFr: "Psaumes 27:1",
        refEs: "Salmos 27:1",
        id: "Dari Daud. TUHAN adalah terangku dan keselamatanku, kepada siapakah aku harus takut? TUHAN adalah benteng hidupku, terhadap siapakah aku harus gemetar?",
        en: "Yahweh is my light and my salvation. Whom shall I fear? Yahweh is the strength of my life. Of whom shall I be afraid?",
        fr: "De David. L’Éternel est ma lumière et mon salut : De qui aurais-je crainte ? L’Éternel est le soutien de ma vie : De qui aurais-je peur ?",
        es: "JEHOVÁ es mi luz y mi salvación: ¿de quién temeré? Jehová es la fortaleza de mi vida: ¿de quién he de atemorizarme?"
    },
    {
        ref: "Mazmur 27:14",
        refEn: "Psalm 27:14",
        refFr: "Psaumes 27:14",
        refEs: "Salmos 27:14",
        id: "Nantikanlah TUHAN! Kuatkanlah dan teguhkanlah hatimu! Ya, nantikanlah TUHAN!",
        en: "Wait for Yahweh. Be strong, and let your heart take courage. Yes, wait for Yahweh.",
        fr: "Espère en l’Éternel ! Fortifie-toi et que ton cœur s’affermisse ! Espère en l’Éternel !",
        es: "Aguarda á Jehová; esfuérzate, y aliéntese tu corazón: sí, espera á Jehová."
    },
    {
        ref: "Mazmur 29:11",
        refEn: "Psalm 29:11",
        refFr: "Psaumes 29:11",
        refEs: "Salmos 29:11",
        id: "TUHAN kiranya memberikan kekuatan kepada umat-Nya, TUHAN kiranya memberkati umat-Nya dengan sejahtera!",
        en: "Yahweh will give strength to his people. Yahweh will bless his people with peace.",
        fr: "L’Éternel donne la force à son peuple ; L’Éternel bénit son peuple et le rend heureux.",
        es: "Jehová dará fortaleza á su pueblo: Jehová bendecirá á su pueblo en paz."
    },
    {
        ref: "Mazmur 31:25",
        refEn: "Psalm 31:24",
        refFr: "Psaumes 31:25",
        refEs: "Salmos 31:24",
        id: "Kuatkanlah dan teguhkanlah hatimu, hai semua orang yang berharap kepada TUHAN!",
        en: "Be strong, and let your heart take courage, all you who hope in Yahweh.",
        fr: "Fortifiez-vous et que votre cœur s’affermisse, Vous tous qui espérez en l’Éternel !",
        es: "Esforzaos todos vosotros los que esperáis en Jehová, y tome vuestro corazón aliento."
    },
    {
        ref: "Mazmur 73:26",
        refEn: "Psalm 73:26",
        refFr: "Psaumes 73:26",
        refEs: "Salmos 73:26",
        id: "Sekalipun dagingku dan hatiku habis lenyap, gunung batuku dan bagianku tetaplah Allah selama-lamanya.",
        en: "My flesh and my heart fails, but God is the strength of my heart and my portion forever.",
        fr: "Ma chair et mon cœur peuvent se consumer : Dieu sera toujours le rocher de mon cœur et mon partage.",
        es: "Mi carne y mi corazón desfallecen: mas la roca de mi corazón y mi porción es Dios para siempre."
    },
    {
        ref: "Mazmur 84:6",
        refEn: "Psalm 84:5",
        refFr: "Psaumes 84:6",
        refEs: "Salmos 84:5",
        id: "Berbahagialah manusia yang kekuatannya di dalam Engkau, yang berhasrat mengadakan ziarah!",
        en: "Blessed are those whose strength is in you; who have set their hearts on a pilgrimage.",
        fr: "Heureux ceux qui placent en toi leur appui ! Ils trouvent dans leur cœur des chemins tout tracés.",
        es: "Bienaventurado el hombre que tiene su fortaleza en ti; en cuyo corazón están tus caminos."
    },
    {
        ref: "Mazmur 138:3",
        refEn: "Psalm 138:3",
        refFr: "Psaumes 138:3",
        refEs: "Salmos 138:3",
        id: "Pada hari aku berseru, Engkaupun menjawab aku, Engkau menambahkan kekuatan dalam jiwaku.",
        en: "In the day that I called, you answered me. You encouraged me with strength in my soul.",
        fr: "Le jour où je t’ai invoqué, tu m’as exaucé, Tu m’as rassuré, tu as fortifié mon âme.",
        es: "En el día que clamé, me respondiste; esforzásteme con fortaleza en mi alma."
    },
    {
        ref: "Habakuk 3:19",
        refEn: "Habakkuk 3:19",
        refFr: "Habacuc 3:19",
        refEs: "Habacuc 3:19",
        id: "ALLAH Tuhanku itu kekuatanku: Ia membuat kakiku seperti kaki rusa, Ia membiarkan aku berjejak di bukit- bukitku. (Untuk pemimpin biduan. Dengan permainan kecapi).",
        en: "Yahweh, the Lord, is my strength. He makes my feet like deer’s feet, and enables me to go in high places. For the music director, on my stringed instruments.",
        fr: "L’Éternel, le Seigneur, est ma force ; Il rend mes pieds semblables à ceux des biches, Et il me fait marcher sur mes lieux élevés. Au chef des chantres. Avec instruments à cordes.",
        es: "Jehová el Señor es mi fortaleza, el cual pondrá mis pies como de ciervas, y me hará andar sobre mis alturas. Al jefe de los cantores sobre mis instrumentos de cuerdas."
    },
    {
        ref: "2 Korintus 4:16",
        refEn: "2 Corinthians 4:16",
        refFr: "2 Corinthiens 4:16",
        refEs: "2 Corintios 4:16",
        id: "Sebab itu kami tidak tawar hati, tetapi meskipun manusia lahiriah kami semakin merosot, namun manusia batiniah kami dibaharui dari sehari ke sehari.",
        en: "Therefore we don’t faint, but though our outward man is decaying, yet our inward man is renewed day by day.",
        fr: "C’est pourquoi nous ne perdons pas courage. Et lors même que notre homme extérieur se détruit, notre homme intérieur se renouvelle de jour en jour.",
        es: "Por tanto, no desmayamos: antes aunque este nuestro hombre exterior se va desgastando, el interior empero se renueva de día en día."
    },
    {
        ref: "2 Korintus 12:9",
        refEn: "2 Corinthians 12:9",
        refFr: "2 Corinthiens 12:9",
        refEs: "2 Corintios 12:9",
        id: "Tetapi jawab Tuhan kepadaku: /\"Cukuplah kasih karunia-Ku bagimu, sebab justru dalam kelemahanlah kuasa-Ku menjadi sempurna.\"* Sebab itu terlebih suka aku bermegah atas kelemahanku, supaya kuasa Kristus turun menaungi aku.",
        en: "He has said to me, “My grace is sufficient for you, for my power is made perfect in weakness.” Most gladly therefore I will rather glory in my weaknesses, that the power of Christ may rest on me.",
        fr: "et il m’a dit : Ma grâce te suffit, car ma puissance s’accomplit dans la faiblesse. Je me glorifierai donc bien plus volontiers de mes faiblesses, afin que la puissance de Christ repose sur moi.",
        es: "Y me ha dicho: Bástate mi gracia; porque mi potencia en la flaqueza se perfecciona. Por tanto, de buena gana me gloriaré más bien en mis flaquezas, porque habite en mí la potencia de Cristo."
    },
    {
        ref: "2 Korintus 12:10",
        refEn: "2 Corinthians 12:10",
        refFr: "2 Corinthiens 12:10",
        refEs: "2 Corintios 12:10",
        id: "Karena itu aku senang dan rela di dalam kelemahan, di dalam siksaan, di dalam kesukaran, di dalam penganiayaan dan kesesakan oleh karena Kristus. Sebab jika aku lemah, maka aku kuat.",
        en: "Therefore I take pleasure in weaknesses, in injuries, in necessities, in persecutions, in distresses, for Christ’s sake. For when I am weak, then am I strong.",
        fr: "C’est pourquoi je me plais dans les faiblesses, dans les outrages, dans les calamités, dans les persécutions, dans les détresses, pour Christ ; car, quand je suis faible, c’est alors que je suis fort.",
        es: "Por lo cual me gozo en las flaquezas, en afrentas, en necesidades, en persecuciones, en angustias por Cristo; porque cuando soy flaco, entonces soy poderoso."
    },
    {
        ref: "Efesus 3:16",
        refEn: "Ephesians 3:16",
        refFr: "Éphésiens 3:16",
        refEs: "Efesios 3:16",
        id: "Aku berdoa supaya Ia, menurut kekayaan kemuliaan-Nya, menguatkan dan meneguhkan kamu oleh Roh-Nya di dalam batinmu,",
        en: "that he would grant you, according to the riches of his glory, that you may be strengthened with power through his Spirit in the inward man;",
        fr: "afin qu’il vous donne, selon la richesse de sa gloire, d’être puissamment fortifiés par son Esprit dans l’homme intérieur,",
        es: "Que os dé, conforme á las riquezas de su gloria, el ser corroborados con potencia en el hombre interior por su Espíritu."
    },
    {
        ref: "Efesus 3:20",
        refEn: "Ephesians 3:20",
        refFr: "Éphésiens 3:20",
        refEs: "Efesios 3:20",
        id: "Bagi Dialah, yang dapat melakukan jauh lebih banyak dari pada yang kita doakan atau pikirkan, seperti yang ternyata dari kuasa yang bekerja di dalam kita,",
        en: "Now to him who is able to do exceedingly abundantly above all that we ask or think, according to the power that works in us,",
        fr: "Or, à celui qui peut faire, par la puissance qui agit en nous, infiniment au delà de tout ce que nous demandons ou pensons,",
        es: "Y á Aquel que es poderoso para hacer todas las cosas mucho más abundantemente de lo que pedimos ó entendemos, por la potencia que obra en nosotros,"
    },
    {
        ref: "Efesus 6:11",
        refEn: "Ephesians 6:11",
        refFr: "Éphésiens 6:11",
        refEs: "Efesios 6:11",
        id: "Kenakanlah seluruh perlengkapan senjata Allah, supaya kamu dapat bertahan melawan tipu muslihat Iblis;",
        en: "Put on the whole armor of God, that you may be able to stand against the wiles of the devil.",
        fr: "Revêtez-vous de toutes les armes de Dieu, afin de pouvoir tenir ferme contre les ruses du diable.",
        es: "Vestíos de toda la armadura de Dios, para que podáis estar firmes contra las asechanzas del diablo."
    },
    {
        ref: "Kolose 1:11",
        refEn: "Colossians 1:11",
        refFr: "Colossiens 1:11",
        refEs: "Colosenses 1:11",
        id: "dan dikuatkan dengan segala kekuatan oleh kuasa kemuliaan-Nya untuk menanggung segala sesuatu dengan tekun dan sabar,",
        en: "strengthened with all power, according to the might of his glory, for all endurance and perseverance with joy;",
        fr: "fortifiés à tous égards par sa puissance glorieuse, en sorte que vous soyez toujours et avec joie persévérants et patients.",
        es: "Corroborados de toda fortaleza, conforme á la potencia de su gloria, para toda tolerancia y largura de ánimo con gozo;"
    },
    {
        ref: "1 Korintus 16:13",
        refEn: "1 Corinthians 16:13",
        refFr: "1 Corinthiens 16:13",
        refEs: "1 Corintios 16:13",
        id: "Berjaga-jagalah! Berdirilah dengan teguh dalam iman! Bersikaplah sebagai laki-laki! Dan tetap kuat!",
        en: "Watch! Stand firm in the faith! Be courageous! Be strong!",
        fr: "Veillez, demeurez fermes dans la foi, soyez des hommes, fortifiez-vous.",
        es: "Velad, estad firmes en la fe; portaos varonilmente, y esforzaos."
    },
    {
        ref: "1 Petrus 4:12-13",
        refEn: "1 Peter 4:12-13",
        refFr: "1 Pierre 4:12-13",
        refEs: "1 Pedro 4:12-13",
        id: "Saudara-saudara yang kekasih, janganlah kamu heran akan nyala api siksaan yang datang kepadamu sebagai ujian, seolah-olah ada sesuatu yang luar biasa terjadi atas kamu. Sebaliknya, bersukacitalah, sesuai dengan bagian yang kamu dapat dalam penderitaan Kristus, supaya kamu juga boleh bergembira dan bersukacita pada waktu Ia menyatakan kemuliaan-Nya.",
        en: "Beloved, don’t be astonished at the fiery trial which has come upon you, to test you, as though a strange thing happened to you. But because you are partakers of Christ’s sufferings, rejoice; that at the revelation of his glory you also may rejoice with exceeding joy.",
        fr: "Bien-aimés, ne soyez pas surpris, comme d’une chose étrange qui vous arrive, de la fournaise qui est au milieu de vous pour vous éprouver. Réjouissez-vous, au contraire, de la part que vous avez aux souffrances de Christ, afin que vous soyez aussi dans la joie et dans l’allégresse lorsque sa gloire apparaîtra.",
        es: "Carísimos, no os maravilléis cuando sois examinados por fuego, lo cual se hace para vuestra prueba, como si alguna cosa peregrina os aconteciese; Antes bien gozaos en que sois participantes de las aflicciones de Cristo; para que también en la revelación de su gloria os gocéis en triunfo."
    },
    {
        ref: "Yakobus 1:2-3",
        refEn: "James 1:2-3",
        refFr: "Jacques 1:2-3",
        refEs: "Santiago 1:2-3",
        id: "Saudara-saudaraku, anggaplah sebagai suatu kebahagiaan, apabila kamu jatuh ke dalam berbagai-bagai pencobaan, sebab kamu tahu, bahwa ujian terhadap imanmu itu menghasilkan ketekunan.",
        en: "Count it all joy, my brothers, when you fall into various temptations, knowing that the testing of your faith produces endurance.",
        fr: "Mes frères, regardez comme un sujet de joie complète les diverses épreuves auxquelles vous pouvez être exposés, sachant que l’épreuve de votre foi produit la patience.",
        es: "Hermanos míos, tened por sumo gozo cuando cayereis en diversas tentaciones; Sabiendo que la prueba de vuestra fe obra paciencia."
    },
    {
        ref: "Yakobus 1:12",
        refEn: "James 1:12",
        refFr: "Jacques 1:12",
        refEs: "Santiago 1:12",
        id: "Berbahagialah orang yang bertahan dalam pencobaan, sebab apabila ia sudah tahan uji, ia akan menerima mahkota kehidupan yang dijanjikan Allah kepada barangsiapa yang mengasihi Dia.",
        en: "Blessed is the man who endures temptation, for when he has been approved, he will receive the crown of life, which the Lord promised to those who love him.",
        fr: "Heureux l’homme qui supporte patiemment la tentation ; car, après avoir été éprouvé, il recevra la couronne de vie, que le Seigneur a promise à ceux qui l’aiment.",
        es: "Bienaventurado el varón que sufre la tentación; porque cuando fuere probado, recibirá la corona de vida, que Dios ha prometido á los que le aman."
    },
    {
        ref: "Roma 5:3-4",
        refEn: "Romans 5:3-4",
        refFr: "Romains 5:3-4",
        refEs: "Romanos 5:3-4",
        id: "Dan bukan hanya itu saja. Kita malah bermegah juga dalam kesengsaraan kita, karena kita tahu, bahwa kesengsaraan itu menimbulkan ketekunan, dan ketekunan menimbulkan tahan uji dan tahan uji menimbulkan pengharapan.",
        en: "Not only this, but we also rejoice in our sufferings, knowing that suffering works perseverance; and perseverance, proven character; and proven character, hope:",
        fr: "Bien plus, nous nous glorifions même des afflictions, sachant que l’affliction produit la persévérance, la persévérance la victoire dans l’épreuve, et cette victoire l’espérance.",
        es: "Y no sólo esto, mas aun nos gloriamos en las tribulaciones, sabiendo que la tribulación produce paciencia; Y la paciencia, prueba; y la prueba, esperanza;"
    },
    {
        ref: "Mazmur 30:6",
        refEn: "Psalm 30:5",
        refFr: "Psaumes 30:6",
        refEs: "Salmos 30:5",
        id: "Sebab sesaat saja Ia murka, tetapi seumur hidup Ia murah hati; sepanjang malam ada tangisan, menjelang pagi terdengar sorak-sorai.",
        en: "For his anger is but for a moment. His favor is for a lifetime. Weeping may stay for the night, but joy comes in the morning.",
        fr: "Car sa colère dure un instant, Mais sa grâce toute la vie ; Le soir arrivent les pleurs, Et le matin l’allégresse.",
        es: "Porque un momento será su furor; mas en su voluntad está la vida: por la tarde durará el lloro, y á la mañana vendrá la alegría."
    },
    {
        ref: "Mazmur 34:5",
        refEn: "Psalm 34:4",
        refFr: "Psaumes 34:5",
        refEs: "Salmos 34:4",
        id: "Aku telah mencari TUHAN, lalu Ia menjawab aku, dan melepaskan aku dari segala kegentaranku.",
        en: "I sought Yahweh, and he answered me, and delivered me from all my fears.",
        fr: "J’ai cherché l’Éternel, et il m’a répondu ; Il m’a délivré de toutes mes frayeurs.",
        es: "Busqué á Jehová, y él me oyó, y libróme de todos mis temores."
    },
    {
        ref: "Mazmur 55:23",
        refEn: "Psalm 55:22",
        refFr: "Psaumes 55:23",
        refEs: "Salmos 55:22",
        id: "Serahkanlah kuatirmu kepada TUHAN, maka Ia akan memelihara engkau! Tidak untuk selama-lamanya dibiarkan-Nya orang benar itu goyah.",
        en: "Cast your burden on Yahweh, and he will sustain you. He will never allow the righteous to be moved.",
        fr: "Remets ton sort à l’Éternel, et il te soutiendra, Il ne laissera jamais chanceler le juste.",
        es: "Echa sobre Jehová tu carga, y él te sustentará; no dejará para siempre caído al justo."
    },
    {
        ref: "Mazmur 62:2-3",
        refEn: "Psalm 62:1-2",
        refFr: "Psaumes 62:2-3",
        refEs: "Salmos 62:1-2",
        id: "Hanya dekat Allah saja aku tenang, dari pada-Nyalah keselamatanku. Hanya Dialah gunung batuku dan keselamatanku, kota bentengku, aku tidak akan goyah.",
        en: "My soul rests in God alone. My salvation is from him. He alone is my rock and my salvation, my fortress— I will never be greatly shaken.",
        fr: "Oui, c’est en Dieu que mon âme se confie ; De lui vient mon salut. Oui, c’est lui qui est mon rocher et mon salut ; Ma haute retraite : je ne chancellerai guère.",
        es: "EN Dios solamente está acallada mi alma: de él viene mi salud. El solamente es mi fuerte, y mi salud; es mi refugio, no resbalaré mucho."
    },
    {
        ref: "Mazmur 91:1-2",
        refEn: "Psalm 91:1-2",
        refFr: "Psaumes 91:1-2",
        refEs: "Salmos 91:1-2",
        id: "Orang yang duduk dalam lindungan Yang Mahatinggi dan bermalam dalam naungan Yang Mahakuasa akan berkata kepada TUHAN: \"Tempat perlindunganku dan kubu pertahananku, Allahku, yang kupercayai.\"",
        en: "He who dwells in the secret place of the Most High will rest in the shadow of the Almighty. I will say of Yahweh, “He is my refuge and my fortress; my God, in whom I trust.”",
        fr: "Celui qui demeure sous l’abri du Très-Haut Repose à l’ombre du Tout Puissant. Je dis à l’Éternel : Mon refuge et ma forteresse, Mon Dieu en qui je me confie !",
        es: "EL que habita al abrigo del Altísimo, morará bajo la sombra del Omnipotente. Diré yo á Jehová: Esperanza mía, y castillo mío; mi Dios, en él confiaré."
    },
    {
        ref: "Mazmur 94:19",
        refEn: "Psalm 94:19",
        refFr: "Psaumes 94:19",
        refEs: "Salmos 94:19",
        id: "Apabila bertambah banyak pikiran dalam batinku, penghiburan-Mu menyenangkan jiwaku.",
        en: "In the multitude of my thoughts within me, your comforts delight my soul.",
        fr: "Quand les pensées s’agitent en foule au dedans de moi, Tes consolations réjouissent mon âme.",
        es: "En la multitud de mis pensamientos dentro de mí, tus consolaciones alegraban mi alma."
    },
    {
        ref: "Mazmur 116:15",
        refEn: "Psalm 116:15",
        refFr: "Psaumes 116:15",
        refEs: "Salmos 116:15",
        id: "Berharga di mata TUHAN kematian semua orang yang dikasihi-Nya.",
        en: "Precious in the sight of Yahweh is the death of his saints.",
        fr: "Elle a du prix aux yeux de l’Éternel, La mort de ceux qui l’aiment.",
        es: "Estimada es en los ojos de Jehová la muerte de sus santos."
    },
    {
        ref: "Mazmur 147:3",
        refEn: "Psalm 147:3",
        refFr: "Psaumes 147:3",
        refEs: "Salmos 147:3",
        id: "Ia menyembuhkan orang-orang yang patah hati dan membalut luka-luka mereka;",
        en: "He heals the broken in heart, and binds up their wounds.",
        fr: "Il guérit ceux qui ont le cœur brisé, Et il panse leurs blessures.",
        es: "El sana á los quebrantados de corazón, y liga sus heridas."
    },
    {
        ref: "Yesaya 25:8",
        refEn: "Isaiah 25:8",
        refFr: "Ésaïe 25:8",
        refEs: "Isaías 25:8",
        id: "Ia akan meniadakan maut untuk seterusnya; dan Tuhan ALLAH akan menghapuskan air mata dari pada segala muka; dan aib umat-Nya akan dijauhkan-Nya dari seluruh bumi, sebab TUHAN telah mengatakannya.",
        en: "He has swallowed up death forever! The Lord Yahweh will wipe away tears from off all faces. He will take the reproach of his people away from off all the earth, for Yahweh has spoken it.",
        fr: "Il anéantit la mort pour toujours ; Le Seigneur, l’Éternel, essuie les larmes de tous les visages, Il fait disparaître de toute la terre l’opprobre de son peuple ; Car l’Éternel a parlé.",
        es: "Destruirá á la muerte para siempre; y enjugará el Señor toda lágrima de todos los rostros: y quitará la afrenta de su pueblo de toda la tierra: porque Jehová lo ha dicho."
    },
    {
        ref: "Yesaya 40:1",
        refEn: "Isaiah 40:1",
        refFr: "Ésaïe 40:1",
        refEs: "Isaías 40:1",
        id: "Hiburkanlah, hiburkanlah umat-Ku, demikian firman Allahmu,",
        en: "“Comfort, comfort my people,” says your God.",
        fr: "Consolez, consolez mon peuple, Dit votre Dieu.",
        es: "CONSOLAOS, consolaos, pueblo mío, dice vuestro Dios."
    },
    {
        ref: "Yesaya 49:15-16",
        refEn: "Isaiah 49:15-16",
        refFr: "Ésaïe 49:15-16",
        refEs: "Isaías 49:15-16",
        id: "Dapatkah seorang perempuan melupakan bayinya, sehingga ia tidak menyayangi anak dari kandungannya? Sekalipun dia melupakannya, Aku tidak akan melupakan engkau. Lihat, Aku telah melukiskan engkau di telapak tangan-Ku; tembok-tembokmu tetap di ruang mata-Ku.",
        en: "“Can a woman forget her nursing child, that she should not have compassion on the son of her womb? Yes, these may forget, yet I will not forget you! Behold, I have engraved you on the palms of my hands; your walls are continually before me.",
        fr: "Une femme oublie-t-elle l’enfant qu’elle allaite ? N’a-t-elle pas pitié du fruit de ses entrailles ? Quand elle l’oublierait, Moi je ne t’oublierai point. Voici, je t’ai gravée sur mes mains ; Tes murs sont toujours devant mes yeux.",
        es: "¿Olvidaráse la mujer de lo que parió, para dejar de compadecerse del hijo de su vientre? Aunque se olviden ellas, yo no me olvidaré de ti. He aquí que en las palmas te tengo esculpida: delante de mí están siempre tus muros."
    },
    {
        ref: "Yesaya 51:12",
        refEn: "Isaiah 51:12",
        refFr: "Ésaïe 51:12",
        refEs: "Isaías 51:12",
        id: "Akulah, Akulah yang menghibur kamu. Siapakah engkau maka engkau takut terhadap manusia yang memang akan mati, terhadap anak manusia yang dibuang seperti rumput,",
        en: "“I, even I, am he who comforts you: who are you, that you are afraid of man who shall die, and of the son of man who shall be made as grass;",
        fr: "C’est moi, c’est moi qui vous console. Qui es-tu, pour avoir peur de l’homme mortel, Et du fils de l’homme, pareil à l’herbe ?",
        es: "Yo, yo soy vuestro consolador. ¿Quién eres tú para que tengas temor del hombre, que es mortal, del hijo del hombre, que por heno será contado?"
    },
    {
        ref: "Yesaya 54:10",
        refEn: "Isaiah 54:10",
        refFr: "Ésaïe 54:10",
        refEs: "Isaías 54:10",
        id: "Sebab biarpun gunung-gunung beranjak dan bukit-bukit bergoyang, tetapi kasih setia-Ku tidak akan beranjak dari padamu dan perjanjian damai-Ku tidak akan bergoyang, firman TUHAN, yang mengasihani engkau.",
        en: "For the mountains may depart, and the hills be removed; but my loving kindness shall not depart from you, neither shall my covenant of peace be removed,” says Yahweh who has mercy on you.",
        fr: "Quand les montagnes s’éloigneraient, Quand les collines chancelleraient, Mon amour ne s’éloignera point de toi, Et mon alliance de paix ne chancellera point, Dit l’Éternel, qui a compassion de toi.",
        es: "Porque los montes se moverán, y los collados temblarán; mas no se apartará de ti mi misericordia, ni el pacto de mi paz vacilará, dijo Jehová, el que tiene misericordia de ti."
    },
    {
        ref: "Yesaya 57:15",
        refEn: "Isaiah 57:15",
        refFr: "Ésaïe 57:15",
        refEs: "Isaías 57:15",
        id: "Sebab beginilah firman Yang Mahatinggi dan Yang Mahamulia, yang bersemayam untuk selamanya dan Yang Mahakudus nama-Nya: \"Aku bersemayam di tempat tinggi dan di tempat kudus tetapi juga bersama- sama orang yang remuk dan rendah hati, untuk menghidupkan semangat orang-orang yang rendah hati dan untuk menghidupkan hati orang-orang yang remuk.",
        en: "For thus says the high and lofty One who inhabits eternity, whose name is Holy: “I dwell in the high and holy place, with him also who is of a contrite and humble spirit, to revive the spirit of the humble, and to revive the heart of the contrite.",
        fr: "Car ainsi parle le Très-Haut, Dont la demeure est éternelle et dont le nom est saint : J’habite dans les lieux élevés et dans la sainteté ; Mais je suis avec l’homme contrit et humilié, Afin de ranimer les esprits humiliés, Afin de ranimer les cœurs contrits.",
        es: "Porque así dijo el Alto y Sublime, el que habita la eternidad, y cuyo nombre es el Santo: Yo habito en la altura y la santidad, y con el quebrantado y humilde de espíritu, para hacer vivir el espíritu de los humildes, y para vivificar el corazón de los quebrantados."
    },
    {
        ref: "Yesaya 66:13",
        refEn: "Isaiah 66:13",
        refFr: "Ésaïe 66:13",
        refEs: "Isaías 66:13",
        id: "Seperti seseorang yang dihibur ibunya, demikianlah Aku ini akan menghibur kamu; kamu akan dihibur di Yerusalem.",
        en: "As one whom his mother comforts, so will I comfort you; and you will be comforted in Jerusalem.”",
        fr: "Comme un homme que sa mère console, Ainsi je vous consolerai ; Vous serez consolés dans Jérusalem.",
        es: "Como aquel á quien consuela su madre, así os consolaré yo á vosotros, y en Jerusalem tomaréis consuelo."
    },
    {
        ref: "Ratapan 3:24-25",
        refEn: "Lamentations 3:24-25",
        refFr: "Lamentations 3:24-25",
        refEs: "Lamentaciones 3:24-25",
        id: "\"TUHAN adalah bagianku,\" kata jiwaku, oleh sebab itu aku berharap kepada-Nya. TUHAN adalah baik bagi orang yang berharap kepada-Nya, bagi jiwa yang mencari Dia.",
        en: "Yahweh is my portion, says my soul; therefore will I hope in him. Yahweh is good to those who wait for him, to the soul that seeks him.",
        fr: "L’Éternel est mon partage, dit mon âme ; C’est pourquoi je veux espérer en lui. L’Éternel a de la bonté pour qui espère en lui, Pour l’âme qui le cherche.",
        es: "Mi parte es Jehová, dijo mi alma; por tanto en él esperaré. Bueno es Jehová á los que en él esperan, al alma que le buscare."
    },
    {
        ref: "Nahum 1:7",
        refEn: "Nahum 1:7",
        refFr: "Nahum 1:7",
        refEs: "Nahúm 1:7",
        id: "TUHAN itu baik; Ia adalah tempat pengungsian pada waktu kesusahan; Ia mengenal orang-orang yang berlindung kepada-Nya",
        en: "Yahweh is good, a stronghold in the day of trouble; and he knows those who take refuge in him.",
        fr: "L’Éternel est bon, Il est un refuge au jour de la détresse ; Il connaît ceux qui se confient en lui.",
        es: "Bueno es Jehová para fortaleza en el día de la angustia; y conoce á los que en él confían."
    },
    {
        ref: "Matius 5:4",
        refEn: "Matthew 5:4",
        refFr: "Matthieu 5:4",
        refEs: "Mateo 5:4",
        id: "Berbahagialah orang yang berdukacita, karena mereka akan dihibur.",
        en: "Blessed are those who mourn, for they shall be comforted.",
        fr: "Heureux les affligés, car ils seront consolés !",
        es: "Bienaventurados los que lloran: porque ellos recibirán consolación."
    },
    {
        ref: "Yohanes 16:33",
        refEn: "John 16:33",
        refFr: "Jean 16:33",
        refEs: "Juan 16:33",
        id: "Semuanya itu Kukatakan kepadamu, supaya kamu beroleh damai sejahtera dalam Aku. Dalam dunia kamu menderita penganiayaan, tetapi kuatkanlah hatimu, Aku telah mengalahkan dunia.\"",
        en: "I have told you these things, that in me you may have peace. In the world you have oppression; but cheer up! I have overcome the world.”",
        fr: "Je vous ai dit ces choses, afin que vous ayez la paix en moi. Vous aurez des tribulations dans le monde ; mais prenez courage, j’ai vaincu le monde.",
        es: "Estas cosas os he hablado, para que en mí tengáis paz. En el mundo tendréis aflicción: mas confiad, yo he vencido al mundo."
    },
    {
        ref: "2 Korintus 4:17",
        refEn: "2 Corinthians 4:17",
        refFr: "2 Corinthiens 4:17",
        refEs: "2 Corintios 4:17",
        id: "Sebab penderitaan ringan yang sekarang ini, mengerjakan bagi kami kemuliaan kekal yang melebihi segala- galanya, jauh lebih besar dari pada penderitaan kami.",
        en: "For our light affliction, which is for the moment, works for us more and more exceedingly an eternal weight of glory;",
        fr: "Car nos légères afflictions du moment présent produisent pour nous, au delà de toute mesure,",
        es: "Porque lo que al presente es momentáneo y leve de nuestra tribulación, nos obra un sobremanera alto y eterno peso de gloria;"
    },
    {
        ref: "2 Tesalonika 2:16-17",
        refEn: "2 Thessalonians 2:16-17",
        refFr: "2 Thessaloniciens 2:16-17",
        refEs: "2 Tesalonicenses 2:16-17",
        id: "Dan Ia, Tuhan kita Yesus Kristus, dan Allah, Bapa kita, yang dalam kasih karunia-Nya telah mengasihi kita dan yang telah menganugerahkan penghiburan abadi dan pengharapan baik kepada kita, kiranya menghibur dan menguatkan hatimu dalam pekerjaan dan perkataan yang baik.",
        en: "Now our Lord Jesus Christ himself, and God our Father, who loved us and gave us eternal comfort and good hope through grace, comfort your hearts and establish you in every good work and word.",
        fr: "Que notre Seigneur Jésus-Christ lui-même, et Dieu notre Père, qui nous a aimés, et qui nous a donné par sa grâce une consolation éternelle et une bonne espérance, consolent vos cœurs, et vous affermissent en toute bonne œuvre et en toute bonne parole !",
        es: "Y el mismo Señor nuestro Jesucristo, y Dios y Padre nuestro, el cual nos amó, y nos dió consolación eterna, y buena esperanza por gracia, Consuele vuestros corazones, y os confirme en toda buena palabra y obra."
    },
    {
        ref: "1 Petrus 5:10",
        refEn: "1 Peter 5:10",
        refFr: "1 Pierre 5:10",
        refEs: "1 Pedro 5:10",
        id: "Dan Allah, sumber segala kasih karunia, yang telah memanggil kamu dalam Kristus kepada kemuliaan- Nya yang kekal, akan melengkapi, meneguhkan, menguatkan dan mengokohkan kamu, sesudah kamu menderita seketika lamanya.",
        en: "But may the God of all grace, who called you to his eternal glory by Christ Jesus, after you have suffered a little while, perfect, establish, strengthen, and settle you.",
        fr: "Le Dieu de toute grâce, qui vous a appelés en Jésus-Christ à sa gloire éternelle, après que vous aurez souffert un peu de temps, vous perfectionnera lui-même, vous affermira, vous fortifiera, vous rendra inébranlables.",
        es: "Mas el Dios de toda gracia, que nos ha llamado á su gloria eterna por Jesucristo, después que hubiereis un poco de tiempo padecido, él mismo os perfeccione, confirme, corrobore y establezca."
    },
    {
        ref: "Wahyu 21:3-4",
        refEn: "Revelation 21:3-4",
        refFr: "Apocalypse 21:3-4",
        refEs: "Apocalipsis 21:3-4",
        id: "Lalu aku mendengar suara yang nyaring dari takhta itu berkata: \"Lihatlah, kemah Allah ada di tengah- tengah manusia dan Ia akan diam bersama-sama dengan mereka. Mereka akan menjadi umat-Nya dan Ia akan menjadi Allah mereka. Dan Ia akan menghapus segala air mata dari mata mereka, dan maut tidak akan ada lagi; tidak akan ada lagi perkabungan, atau ratap tangis, atau dukacita, sebab segala sesuatu yang lama itu telah berlalu.\"",
        en: "I heard a loud voice out of heaven saying, “Behold, God’s dwelling is with people, and he will dwell with them, and they will be his people, and God himself will be with them as their God. He will wipe away from them every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain, any more. The first things have passed away.”",
        fr: "Et j’entendis du trône une forte voix qui disait : Voici le tabernacle de Dieu avec les hommes ! Il habitera avec eux, et ils seront son peuple, et Dieu lui-même sera avec eux. Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n’y aura plus ni deuil, ni cri, ni douleur, car les premières choses ont disparu.",
        es: "Y oí una gran voz del cielo que decía: He aquí el tabernáculo de Dios con los hombres, y morará con ellos; y ellos serán su pueblo, y el mismo Dios será su Dios con ellos. Y limpiará Dios toda lágrima de los ojos de ellos; y la muerte no será más; y no habrá más llanto, ni clamor, ni dolor: porque las primeras cosas son pasadas."
    },
    {
        ref: "Markus 9:23-24",
        refEn: "Mark 9:23-24",
        refFr: "Marc 9:23-24",
        refEs: "Marcos 9:23-24",
        id: "Jawab Yesus: /\"Katamu: jika Engkau dapat? Tidak ada yang mustahil bagi orang yang percaya!\" Segera ayah anak itu berteriak: \"Aku percaya. Tolonglah aku yang tidak percaya ini!\"",
        en: "Jesus said to him, “If you can believe, all things are possible to him who believes.” Immediately the father of the child cried out with tears, “I believe. Help my unbelief!”",
        fr: "Jésus lui dit : Si tu peux !… Tout est possible à celui qui croit. Aussitôt le père de l’enfant s’écria : Je crois ! viens au secours de mon incrédulité !",
        es: "Y Jesús le dijo: Si puedes creer, al que cree todo es posible. Y luego el padre del muchacho dijo clamando: Creo, ayuda mi incredulidad."
    },
    {
        ref: "Markus 10:27",
        refEn: "Mark 10:27",
        refFr: "Marc 10:27",
        refEs: "Marcos 10:27",
        id: "Yesus memandang mereka dan berkata: /\"Bagi manusia hal itu tidak mungkin, tetapi bukan demikian bagi Allah. Sebab segala sesuatu adalah mungkin bagi Allah.\"",
        en: "Jesus, looking at them, said, “With men it is impossible, but not with God, for all things are possible with God.”",
        fr: "Jésus les regarda, et dit : Cela est impossible aux hommes, mais non à Dieu : car tout est possible à Dieu.",
        es: "Entonces Jesús mirándolos, dice: Para los hombres es imposible; mas para Dios, no; porque todas las cosas son posibles para Dios."
    },
    {
        ref: "Lukas 1:37",
        refEn: "Luke 1:37",
        refFr: "Luc 1:37",
        refEs: "Lucas 1:37",
        id: "Sebab bagi Allah tidak ada yang mustahil.\"",
        en: "For everything spoken by God is possible.”",
        fr: "Car rien n’est impossible à Dieu.",
        es: "Porque ninguna cosa es imposible para Dios."
    },
    {
        ref: "Roma 4:20-21",
        refEn: "Romans 4:20-21",
        refFr: "Romains 4:20-21",
        refEs: "Romanos 4:20-21",
        id: "Tetapi terhadap janji Allah ia tidak bimbang karena ketidakpercayaan, malah ia diperkuat dalam imannya dan ia memuliakan Allah, dengan penuh keyakinan, bahwa Allah berkuasa untuk melaksanakan apa yang telah Ia janjikan.",
        en: "Yet, looking to the promise of God, he didn’t waver through unbelief, but grew strong through faith, giving glory to God, and being fully assured that what he had promised, he was also able to perform.",
        fr: "Il ne douta point, par incrédulité, au sujet de la promesse de Dieu ; mais il fut fortifié par la foi, donnant gloire à Dieu, et ayant la pleine conviction que ce qu’il promet il peut aussi l’accomplir.",
        es: "Tampoco en la promesa de Dios dudó con desconfianza: antes fué esforzado en fe, dando gloria á Dios, Plenamente convencido de que todo lo que había prometido, era también poderoso para hacerlo."
    },
    {
        ref: "Roma 14:23",
        refEn: "Romans 14:23",
        refFr: "Romains 14:23",
        refEs: "Romanos 14:23",
        id: "Tetapi barangsiapa yang bimbang, kalau ia makan, ia telah dihukum, karena ia tidak melakukannya berdasarkan iman. Dan segala sesuatu yang tidak berdasarkan iman, adalah dosa.",
        en: "But he who doubts is condemned if he eats, because it isn’t of faith; and whatever is not of faith is sin. Now to him who is able to establish you according to my Good News and the preaching of Jesus Christ, according to the revelation of the mystery which has been kept secret through long ages, but now is revealed, and by the Scriptures of the prophets, according to the commandment of the eternal God, is made known for obedience of faith to all the nations; to the only wise God, through Jesus Christ, to whom be the glory forever! Amen.",
        fr: "Mais celui qui a des doutes au sujet de ce qu’il mange est condamné, parce qu’il n’agit pas par conviction. Tout ce qui n’est pas le produit d’une conviction est péché.",
        es: "Mas el que hace diferencia, si comiere, es condenado, porque no comió por fe: y todo lo que no es de fe, es pecado."
    },
    {
        ref: "2 Korintus 4:18",
        refEn: "2 Corinthians 4:18",
        refFr: "2 Corinthiens 4:18",
        refEs: "2 Corintios 4:18",
        id: "Sebab kami tidak memperhatikan yang kelihatan, melainkan yang tak kelihatan, karena yang kelihatan adalah sementara, sedangkan yang tak kelihatan adalah kekal.",
        en: "while we don’t look at the things which are seen, but at the things which are not seen. For the things which are seen are temporal, but the things which are not seen are eternal.",
        fr: "un poids éternel de gloire, parce que nous regardons, non point aux choses visibles, mais à celles qui sont invisibles ; car les choses visibles sont passagères, et les invisibles sont éternelles.",
        es: "No mirando nosotros á las cosas que se ven, sino á las que no se ven: porque las cosas que se ven son temporales, mas las que no se ven son eternas."
    },
    {
        ref: "Efesus 2:10",
        refEn: "Ephesians 2:10",
        refFr: "Éphésiens 2:10",
        refEs: "Efesios 2:10",
        id: "Karena kita ini buatan Allah, diciptakan dalam Kristus Yesus untuk melakukan pekerjaan baik, yang dipersiapkan Allah sebelumnya. Ia mau, supaya kita hidup di dalamnya.",
        en: "For we are his workmanship, created in Christ Jesus for good works, which God prepared before that we would walk in them.",
        fr: "Car nous sommes son ouvrage, ayant été créés en Jésus-Christ pour de bonnes œuvres, que Dieu a préparées d’avance, afin que nous les pratiquions.",
        es: "Porque somos hechura suya, criados en Cristo Jesús para buenas obras, las cuales Dios preparó para que anduviésemos en ellas."
    },
    {
        ref: "Ibrani 10:23",
        refEn: "Hebrews 10:23",
        refFr: "Hébreux 10:23",
        refEs: "Hebreos 10:23",
        id: "Marilah kita teguh berpegang pada pengakuan tentang pengharapan kita, sebab Ia, yang menjanjikannya, setia.",
        en: "let us hold fast the confession of our hope without wavering; for he who promised is faithful.",
        fr: "Retenons fermement la profession de notre espérance, car celui qui a fait la promesse est fidèle.",
        es: "Mantengamos firme la profesión de nuestra fe sin fluctuar; que fiel es el que prometió:"
    },
    {
        ref: "Ibrani 11:6",
        refEn: "Hebrews 11:6",
        refFr: "Hébreux 11:6",
        refEs: "Hebreos 11:6",
        id: "Tetapi tanpa iman tidak mungkin orang berkenan kepada Allah. Sebab barangsiapa berpaling kepada Allah, ia harus percaya bahwa Allah ada, dan bahwa Allah memberi upah kepada orang yang sungguh-sungguh mencari Dia.",
        en: "Without faith it is impossible to be well pleasing to him, for he who comes to God must believe that he exists, and that he is a rewarder of those who seek him.",
        fr: "Or sans la foi il est impossible de lui être agréable ; car il faut que celui qui s’approche de Dieu croie que Dieu existe, et qu’il est le rémunérateur de ceux qui le cherchent.",
        es: "Empero sin fe es imposible agradar á Dios; porque es menester que el que á Dios se allega, crea que le hay, y que es galardonador de los que le buscan."
    },
    {
        ref: "1 Petrus 1:8-9",
        refEn: "1 Peter 1:8-9",
        refFr: "1 Pierre 1:8-9",
        refEs: "1 Pedro 1:8-9",
        id: "Sekalipun kamu belum pernah melihat Dia, namun kamu mengasihi-Nya. Kamu percaya kepada Dia, sekalipun kamu sekarang tidak melihat-Nya. Kamu bergembira karena sukacita yang mulia dan yang tidak terkatakan, karena kamu telah mencapai tujuan imanmu, yaitu keselamatan jiwamu.",
        en: "whom not having known you love; in whom, though now you don’t see him, yet believing, you rejoice greatly with joy unspeakable and full of glory— receiving the result of your faith, the salvation of your souls.",
        fr: "lui que vous aimez sans l’avoir vu, en qui vous croyez sans le voir encore, vous réjouissant d’une joie ineffable et glorieuse, parce que vous obtiendrez le salut de vos âmes pour prix de votre foi.",
        es: "Al cual, no habiendo visto, le amáis; en el cual creyendo, aunque al presente no lo veáis, os alegráis con gozo inefable y glorificado; Obteniendo el fin de vuestra fe, que es la salud de vuestras almas."
    },
    {
        ref: "1 Yohanes 5:4",
        refEn: "1 John 5:4",
        refFr: "1 Jean 5:4",
        refEs: "1 Juan 5:4",
        id: "sebab semua yang lahir dari Allah, mengalahkan dunia. Dan inilah kemenangan yang mengalahkan dunia: iman kita.",
        en: "For whatever is born of God overcomes the world. This is the victory that has overcome the world: your faith.",
        fr: "parce que tout ce qui est né de Dieu triomphe du monde ; et la victoire qui triomphe du monde, c’est notre foi.",
        es: "Porque todo aquello que es nacido de Dios vence al mundo: y esta es la victoria que vence al mundo, nuestra fe."
    },
    {
        ref: "Ayub 19:25",
        refEn: "Job 19:25",
        refFr: "Job 19:25",
        refEs: "Job 19:25",
        id: "Tetapi aku tahu: Penebusku hidup, dan akhirnya Ia akan bangkit di atas debu.",
        en: "But as for me, I know that my Redeemer lives. In the end, he will stand upon the earth.",
        fr: "Mais je sais que mon rédempteur est vivant, Et qu’il se lèvera le dernier sur la terre.",
        es: "Yo sé que mi Redentor vive, y al fin se levantará sobre el polvo:"
    },
    {
        ref: "Mazmur 39:8",
        refEn: "Psalm 39:7",
        refFr: "Psaumes 39:8",
        refEs: "Salmos 39:7",
        id: "Dan sekarang, apakah yang kunanti-nantikan, ya Tuhan? Kepada-Mulah aku berharap.",
        en: "Now, Lord, what do I wait for? My hope is in you.",
        fr: "Maintenant, Seigneur, que puis-je espérer ? En toi est mon espérance.",
        es: "Y ahora, Señor, ¿qué esperaré? Mi esperanza en ti está."
    },
    {
        ref: "Mazmur 130:5",
        refEn: "Psalm 130:5",
        refFr: "Psaumes 130:5",
        refEs: "Salmos 130:5",
        id: "Aku menanti-nantikan TUHAN, jiwaku menanti-nanti, dan aku mengharapkan firman-Nya.",
        en: "I wait for Yahweh. My soul waits. I hope in his word.",
        fr: "J’espère en l’Éternel, mon âme espère, Et j’attends sa promesse.",
        es: "Esperé yo á Jehová, esperó mi alma; en su palabra he esperado."
    },
    {
        ref: "Amsal 23:18",
        refEn: "Proverbs 23:18",
        refFr: "Proverbes 23:18",
        refEs: "Proverbios 23:18",
        id: "Karena masa depan sungguh ada, dan harapanmu tidak akan hilang.",
        en: "Indeed surely there is a future hope, and your hope will not be cut off.",
        fr: "Car il est un avenir, Et ton espérance ne sera pas anéantie.",
        es: "Porque ciertamente hay fin, y tu esperanza no será cortada."
    },
    {
        ref: "Yesaya 40:29-31",
        refEn: "Isaiah 40:29-31",
        refFr: "Ésaïe 40:29-31",
        refEs: "Isaías 40:29-31",
        id: "Dia memberi kekuatan kepada yang lelah dan menambah semangat kepada yang tiada berdaya. Orang-orang muda menjadi lelah dan lesu dan teruna-teruna jatuh tersandung, tetapi orang-orang yang menanti- nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya; mereka berlari dan tidak menjadi lesu, mereka berjalan dan tidak menjadi lelah.",
        en: "He gives power to the weak. He increases the strength of him who has no might. Even the youths faint and get weary, and the young men utterly fall; But those who wait for Yahweh will renew their strength. They will mount up with wings like eagles. They will run, and not be weary. They will walk, and not faint.",
        fr: "Il donne de la force à celui qui est fatigué, Et il augmente la vigueur de celui qui tombe en défaillance. Les adolescents se fatiguent et se lassent, Et les jeunes hommes chancellent ; Mais ceux qui se confient en l’Éternel renouvellent leur force. Ils prennent le vol comme les aigles ; Ils courent, et ne se lassent point, Ils marchent, et ne se fatiguent point.",
        es: "El da esfuerzo al cansado, y multiplica las fuerzas al que no tiene ningunas. Los mancebos se fatigan y se cansan, los mozos flaquean y caen: Mas los que esperan á Jehová tendrán nuevas fuerzas; levantarán las alas como águilas; correrán, y no se cansarán; caminarán, y no se fatigarán."
    },
    {
        ref: "Yeremia 17:7",
        refEn: "Jeremiah 17:7",
        refFr: "Jérémie 17:7",
        refEs: "Jeremías 17:7",
        id: "Diberkatilah orang yang mengandalkan TUHAN, yang menaruh harapannya pada TUHAN!",
        en: "Blessed is the man who trusts in Yahweh, and whose trust Yahweh is.",
        fr: "Béni soit l’homme qui se confie dans l’Éternel, Et dont l’Éternel est l’espérance !",
        es: "Bendito el varón que se fía en Jehová, y cuya confianza es Jehová."
    },
    {
        ref: "Roma 5:5",
        refEn: "Romans 5:5",
        refFr: "Romains 5:5",
        refEs: "Romanos 5:5",
        id: "Dan pengharapan tidak mengecewakan, karena kasih Allah telah dicurahkan di dalam hati kita oleh Roh Kudus yang telah dikaruniakan kepada kita.",
        en: "and hope doesn’t disappoint us, because God’s love has been poured out into our hearts through the Holy Spirit who was given to us.",
        fr: "Or, l’espérance ne trompe point, parce que l’amour de Dieu est répandu dans nos cœurs par le Saint-Esprit qui nous a été donné.",
        es: "Y la esperanza no avergüenza; porque el amor de Dios está derramado en nuestros corazones por el Espíritu Santo que nos es dado."
    },
    {
        ref: "Roma 8:24-25",
        refEn: "Romans 8:24-25",
        refFr: "Romains 8:24-25",
        refEs: "Romanos 8:24-25",
        id: "Sebab kita diselamatkan dalam pengharapan. Tetapi pengharapan yang dilihat, bukan pengharapan lagi; sebab bagaimana orang masih mengharapkan apa yang dilihatnya? Tetapi jika kita mengharapkan apa yang tidak kita lihat, kita menantikannya dengan tekun.",
        en: "For we were saved in hope, but hope that is seen is not hope. For who hopes for that which he sees? But if we hope for that which we don’t see, we wait for it with patience.",
        fr: "Car c’est en espérance que nous sommes sauvés. Or, l’espérance qu’on voit n’est plus espérance : ce qu’on voit, peut-on l’espérer encore ? Mais si nous espérons ce que nous ne voyons pas, nous l’attendons avec persévérance.",
        es: "Porque en esperanza somos salvos; mas la esperanza que se ve, no es esperanza; porque lo que alguno ve, ¿á qué esperarlo? Empero si lo que no vemos esperamos, por paciencia esperamos."
    },
    {
        ref: "Roma 12:12",
        refEn: "Romans 12:12",
        refFr: "Romains 12:12",
        refEs: "Romanos 12:12",
        id: "Bersukacitalah dalam pengharapan, sabarlah dalam kesesakan, dan bertekunlah dalam doa!",
        en: "rejoicing in hope; enduring in troubles; continuing steadfastly in prayer;",
        fr: "Réjouissez-vous en espérance. Soyez patients dans l’affliction. Persévérez dans la prière.",
        es: "Gozosos en la esperanza; sufridos en la tribulación; constantes en la oración;"
    },
    {
        ref: "1 Korintus 13:7",
        refEn: "1 Corinthians 13:7",
        refFr: "1 Corinthiens 13:7",
        refEs: "1 Corintios 13:7",
        id: "Ia menutupi segala sesuatu, percaya segala sesuatu, mengharapkan segala sesuatu, sabar menanggung segala sesuatu.",
        en: "bears all things, believes all things, hopes all things, endures all things.",
        fr: "elle excuse tout, elle croit tout, elle espère tout, elle supporte tout.",
        es: "Todo lo sufre, todo lo cree, todo lo espera, todo lo soporta."
    },
    {
        ref: "1 Petrus 1:3",
        refEn: "1 Peter 1:3",
        refFr: "1 Pierre 1:3",
        refEs: "1 Pedro 1:3",
        id: "Terpujilah Allah dan Bapa Tuhan kita Yesus Kristus, yang karena rahmat-Nya yang besar telah melahirkan kita kembali oleh kebangkitan Yesus Kristus dari antara orang mati, kepada suatu hidup yang penuh pengharapan,",
        en: "Blessed be the God and Father of our Lord Jesus Christ, who according to his great mercy became our father again to a living hope through the resurrection of Jesus Christ from the dead,",
        fr: "Béni soit Dieu, le Père de notre Seigneur Jésus-Christ, qui, selon sa grande miséricorde, nous a régénérés, pour une espérance vivante, par la résurrection de Jésus-Christ d’entre les morts,",
        es: "Bendito el Dios y Padre de nuestro Señor Jesucristo, que según su grande misericordia nos ha regenerado en esperanza viva, por la resurrección de Jesucristo de los muertos,"
    },
    {
        ref: "1 Yohanes 3:2-3",
        refEn: "1 John 3:2-3",
        refFr: "1 Jean 3:2-3",
        refEs: "1 Juan 3:2-3",
        id: "Saudara-saudaraku yang kekasih, sekarang kita adalah anak-anak Allah, tetapi belum nyata apa keadaan kita kelak; akan tetapi kita tahu, bahwa apabila Kristus menyatakan diri-Nya, kita akan menjadi sama seperti Dia, sebab kita akan melihat Dia dalam keadaan-Nya yang sebenarnya. Setiap orang yang menaruh pengharapan itu kepada-Nya, menyucikan diri sama seperti Dia yang adalah suci.",
        en: "Beloved, now we are children of God, and it is not yet revealed what we will be. But we know that, when he is revealed, we will be like him; for we will see him just as he is. Everyone who has this hope set on him purifies himself, even as he is pure.",
        fr: "Bien-aimés, nous sommes maintenant enfants de Dieu, et ce que nous serons n’a pas encore été manifesté ; mais nous savons que, lorsque cela sera manifesté, nous serons semblables à lui, parce que nous le verrons tel qu’il est. Quiconque a cette espérance en lui se purifie, comme lui-même est pur.",
        es: "Muy amados, ahora somos hijos de Dios, y aun no se ha manifestado lo que hemos de ser; pero sabemos que cuando él apareciere, seremos semejantes á él, porque le veremos como él es. Y cualquiera que tiene esta esperanza en él, se purifica, como él también es limpio."
    },
    {
        ref: "Mazmur 4:2",
        refEn: "Psalm 4:1",
        refFr: "Psaumes 4:2",
        refEs: "Salmos 4:1",
        id: "Apabila aku berseru, jawablah aku, ya Allah, yang membenarkan aku. Di dalam kesesakan Engkau memberi kelegaan kepadaku. Kasihanilah aku dan dengarkanlah doaku!",
        en: "Answer me when I call, God of my righteousness. Give me relief from my distress. Have mercy on me, and hear my prayer.",
        fr: "Quand je crie, réponds-moi, Dieu de ma justice ! Quand je suis dans la détresse, sauve-moi ! Aie pitié de moi, écoute ma prière !",
        es: "RESPÓNDEME cuando clamo, oh Dios de mi justicia: estando en angustia, tú me hiciste ensanchar: ten misericordia de mí, y oye mi oración."
    },
    {
        ref: "Mazmur 5:3",
        refEn: "Psalm 5:3",
        refFr: "Psaumes 5:3",
        refEs: "Salmos 5:3",
        id: "TUHAN, pada waktu pagi Engkau mendengar seruanku, pada waktu pagi aku mengatur persembahan bagi-Mu, dan aku menunggu-nunggu.",
        en: "Yahweh, in the morning you shall hear my voice. In the morning I will lay my requests before you, and will watch expectantly.",
        fr: "Sois attentif à mes cris , mon roi et mon Dieu ! C’est à toi que j’adresse ma prière.",
        es: "Oh Jehová, de mañana oirás mi voz; de mañana me presentaré á ti, y esperaré."
    },
    {
        ref: "Mazmur 34:18",
        refEn: "Psalm 34:17",
        refFr: "Psaumes 34:18",
        refEs: "Salmos 34:17",
        id: "Apabila orang-orang benar itu berseru-seru, maka TUHAN mendengar, dan melepaskan mereka dari segala kesesakannya.",
        en: "The righteous cry, and Yahweh hears, and delivers them out of all their troubles.",
        fr: "Quand les justes crient, l’Éternel entend, Et il les délivre de toutes leurs détresses ;",
        es: "Clamaron los justos, y Jehová oyó, y librólos de todas sus angustias."
    },
    {
        ref: "Mazmur 65:3",
        refEn: "Psalm 65:2",
        refFr: "Psaumes 65:3",
        refEs: "Salmos 65:2",
        id: "Engkau yang mendengarkan doa. Kepada-Mulah datang semua yang hidup",
        en: "You who hear prayer, to you all men will come.",
        fr: "Ô toi, qui écoutes la prière ! Tous les hommes viendront à toi.",
        es: "Tú oyes la oración: á ti vendrá toda carne."
    },
    {
        ref: "Mazmur 145:18",
        refEn: "Psalm 145:18",
        refFr: "Psaumes 145:18",
        refEs: "Salmos 145:18",
        id: "TUHAN dekat pada setiap orang yang berseru kepada-Nya, pada setiap orang yang berseru kepada-Nya dalam kesetiaan.",
        en: "Yahweh is near to all those who call on him, to all who call on him in truth.",
        fr: "L’Éternel est près de tous ceux qui l’invoquent, De tous ceux qui l’invoquent avec sincérité ;",
        es: "Cercano está Jehová á todos los que le invocan, á todos los que le invocan de veras."
    },
    {
        ref: "Yeremia 33:3",
        refEn: "Jeremiah 33:3",
        refFr: "Jérémie 33:3",
        refEs: "Jeremías 33:3",
        id: "Berserulah kepada-Ku, maka Aku akan menjawab engkau dan akan memberitahukan kepadamu hal-hal yang besar dan yang tidak terpahami, yakni hal-hal yang tidak kauketahui.",
        en: "Call to me, and I will answer you, and will show you great things, and difficult, which you don’t know.",
        fr: "Invoque-moi, et je te répondrai ; Je t’annoncerai de grandes choses, des choses cachées, Que tu ne connais pas.",
        es: "Clama á mí, y te responderé, y te enseñaré cosas grandes y dificultosas que tú no sabes."
    },
    {
        ref: "Matius 6:6",
        refEn: "Matthew 6:6",
        refFr: "Matthieu 6:6",
        refEs: "Mateo 6:6",
        id: "Tetapi jika engkau berdoa, masuklah ke dalam kamarmu, tutuplah pintu dan berdoalah kepada Bapamu yang ada di tempat tersembunyi. Maka Bapamu yang melihat yang tersembunyi akan membalasnya kepadamu.",
        en: "But you, when you pray, enter into your inner room, and having shut your door, pray to your Father who is in secret, and your Father who sees in secret will reward you openly.",
        fr: "Mais quand tu pries, entre dans ta chambre, ferme ta porte, et prie ton Père qui est là dans le lieu secret ; et ton Père, qui voit dans le secret, te le rendra .",
        es: "Mas tú, cuando oras, éntrate en tu cámara, y cerrada tu puerta, ora á tu Padre que está en secreto; y tu Padre que ve en secreto, te recompensará en público."
    },
    {
        ref: "Matius 18:19-20",
        refEn: "Matthew 18:19-20",
        refFr: "Matthieu 18:19-20",
        refEs: "Mateo 18:19-20",
        id: "Dan lagi Aku berkata kepadamu: Jika dua orang dari padamu di dunia ini sepakat meminta apapun juga, permintaan mereka itu akan dikabulkan oleh Bapa-Ku yang di sorga. Sebab di mana dua atau tiga orang berkumpul dalam Nama-Ku, di situ Aku ada di tengah-tengah mereka.\"",
        en: "Again, assuredly I tell you, that if two of you will agree on earth concerning anything that they will ask, it will be done for them by my Father who is in heaven. For where two or three are gathered together in my name, there I am in their midst.”",
        fr: "Je vous dis encore que, si deux d’entre vous s’accordent sur la terre pour demander une chose quelconque, elle leur sera accordée par mon Père qui est dans les cieux. Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d’eux.",
        es: "Otra vez os digo, que si dos de vosotros se convinieren en la tierra, de toda cosa que pidieren, les será hecho por mi Padre que está en los cielos. Porque donde están dos ó tres congregados en mi nombre, allí estoy en medio de ellos."
    },
    {
        ref: "Matius 21:22",
        refEn: "Matthew 21:22",
        refFr: "Matthieu 21:22",
        refEs: "Mateo 21:22",
        id: "Dan apa saja yang kamu minta dalam doa dengan penuh kepercayaan, kamu akan menerimanya.\"",
        en: "All things, whatever you ask in prayer, believing, you will receive.”",
        fr: "Tout ce que vous demanderez avec foi par la prière, vous le recevrez.",
        es: "Y todo lo que pidiereis en oración, creyendo, lo recibiréis."
    },
    {
        ref: "Markus 11:25",
        refEn: "Mark 11:25",
        refFr: "Marc 11:25",
        refEs: "Marcos 11:25",
        id: "Dan jika kamu berdiri untuk berdoa, ampunilah dahulu sekiranya ada barang sesuatu dalam hatimu terhadap seseorang, supaya juga Bapamu yang di sorga mengampuni kesalahan-kesalahanmu.\"*",
        en: "Whenever you stand praying, forgive, if you have anything against anyone; so that your Father, who is in heaven, may also forgive you your transgressions.",
        fr: "Et, lorsque vous êtes debout faisant votre prière, si vous avez quelque chose contre quelqu’un, pardonnez, afin que votre Père qui est dans les cieux vous pardonne aussi vos offenses.",
        es: "Y cuando estuviereis orando, perdonad, si tenéis algo contra alguno, para que vuestro Padre que está en los cielos os perdone también á vosotros vuestras ofensas."
    },
    {
        ref: "Lukas 11:9-10",
        refEn: "Luke 11:9-10",
        refFr: "Luc 11:9-10",
        refEs: "Lucas 11:9-10",
        id: "Oleh karena itu Aku berkata kepadamu: Mintalah, maka akan diberikan kepadamu; carilah, maka kamu akan mendapat; ketoklah, maka pintu akan dibukakan bagimu. Karena setiap orang yang meminta, menerima dan setiap orang yang mencari, mendapat dan setiap orang yang mengetok, baginya pintu dibukakan.",
        en: "“I tell you, keep asking, and it will be given you. Keep seeking, and you will find. Keep knocking, and it will be opened to you. For everyone who asks receives. He who seeks finds. To him who knocks it will be opened.",
        fr: "Et moi, je vous dis : Demandez, et l’on vous donnera ; cherchez, et vous trouverez ; frappez, et l’on vous ouvrira. Car quiconque demande reçoit, celui qui cherche trouve, et l’on ouvre à celui qui frappe.",
        es: "Y yo os digo: Pedid, y se os dará; buscad, y hallaréis; llamad, y os será abierto. Porque todo aquel que pide, recibe; y el que busca, halla; y al que llama, se abre."
    },
    {
        ref: "Lukas 18:1",
        refEn: "Luke 18:1",
        refFr: "Luc 18:1",
        refEs: "Lucas 18:1",
        id: "Yesus mengatakan suatu perumpamaan kepada mereka untuk menegaskan, bahwa mereka harus selalu berdoa dengan tidak jemu-jemu.",
        en: "He also spoke a parable to them that they must always pray, and not give up,",
        fr: "Jésus leur adressa une parabole, pour montrer qu’il faut toujours prier, et ne point se relâcher.",
        es: "Y PROPÚSOLES también una parábola sobre que es necesario orar siempre, y no desmayar,"
    },
    {
        ref: "Efesus 6:18",
        refEn: "Ephesians 6:18",
        refFr: "Éphésiens 6:18",
        refEs: "Efesios 6:18",
        id: "dalam segala doa dan permohonan. Berdoalah setiap waktu di dalam Roh dan berjaga-jagalah di dalam doamu itu dengan permohonan yang tak putus-putusnya untuk segala orang Kudus,",
        en: "with all prayer and requests, praying at all times in the Spirit, and being watchful to this end in all perseverance and requests for all the saints:",
        fr: "Faites en tout temps par l’Esprit toutes sortes de prières et de supplications. Veillez à cela avec une entière persévérance, et priez pour tous les saints.",
        es: "Orando en todo tiempo con toda deprecación y súplica en el Espíritu, y velando en ello con toda instancia y suplicación por todos los santos,"
    },
    {
        ref: "Kolose 4:2",
        refEn: "Colossians 4:2",
        refFr: "Colossiens 4:2",
        refEs: "Colosenses 4:2",
        id: "Bertekunlah dalam doa dan dalam pada itu berjaga-jagalah sambil mengucap syukur.",
        en: "Continue steadfastly in prayer, watching therein with thanksgiving;",
        fr: "Persévérez dans la prière, veillez-y avec actions de grâces.",
        es: "Perseverad en oración, velando en ella con hacimiento de gracias:"
    },
    {
        ref: "1 Tesalonika 5:17",
        refEn: "1 Thessalonians 5:17",
        refFr: "1 Thessaloniciens 5:17",
        refEs: "1 Tesalonicenses 5:17",
        id: "Tetaplah berdoa.",
        en: "Pray without ceasing.",
        fr: "Priez sans cesse.",
        es: "Orad sin cesar."
    },
    {
        ref: "1 Timotius 2:1",
        refEn: "1 Timothy 2:1",
        refFr: "1 Timothée 2:1",
        refEs: "1 Timoteo 2:1",
        id: "Pertama-tama aku menasihatkan: Naikkanlah permohonan, doa syafaat dan ucapan syukur untuk semua orang,",
        en: "I exhort therefore, first of all, that petitions, prayers, intercessions, and givings of thanks, be made for all men:",
        fr: "J’exhorte donc, avant toutes choses, à faire des prières, des supplications, des requêtes, des actions de grâces, pour tous les hommes,",
        es: "AMONESTO pues, ante todas cosas, que se hagan rogativas, oraciones, peticiones, hacimientos de gracias, por todos los hombres;"
    },
    {
        ref: "Ibrani 4:16",
        refEn: "Hebrews 4:16",
        refFr: "Hébreux 4:16",
        refEs: "Hebreos 4:16",
        id: "Sebab itu marilah kita dengan penuh keberanian menghampiri takhta kasih karunia, supaya kita menerima rahmat dan menemukan kasih karunia untuk mendapat pertolongan kita pada waktunya.",
        en: "Let us therefore draw near with boldness to the throne of grace, that we may receive mercy, and may find grace for help in time of need.",
        fr: "Approchons-nous donc avec assurance du trône de la grâce, afin d’obtenir miséricorde et de trouver grâce, pour être secourus dans nos besoins.",
        es: "Lleguémonos pues confiadamente al trono de la gracia, para alcanzar misericordia, y hallar gracia para el oportuno socorro."
    },
    {
        ref: "Ulangan 8:3",
        refEn: "Deuteronomy 8:3",
        refFr: "Deutéronome 8:3",
        refEs: "Deuteronomio 8:3",
        id: "Jadi Ia merendahkan hatimu, membiarkan engkau lapar dan memberi engkau makan manna, yang tidak kaukenal dan yang juga tidak dikenal oleh nenek moyangmu, untuk membuat engkau mengerti, bahwa manusia hidup bukan dari roti saja, tetapi manusia hidup dari segala yang diucapkan TUHAN.",
        en: "He humbled you, and allowed you to be hungry, and fed you with manna, which you didn’t know, neither did your fathers know; that he might teach you that man does not live by bread only, but man lives by every word that proceeds out of Yahweh’s mouth.",
        fr: "Il t’a humilié, il t’a fait souffrir de la faim, et il t’a nourri de la manne, que tu ne connaissais pas et que n’avaient pas connue tes pères, afin de t’apprendre que l’homme ne vit pas de pain seulement, mais que l’homme vit de tout ce qui sort de la bouche de l’Éternel.",
        es: "Y te afligió, é hízote tener hambre, y te sustentó con maná, comida que no conocías tú, ni tus padres la habían conocido; para hacerte saber que el hombre no vivirá de solo pan, mas de todo lo que sale de la boca de Jehová vivirá el hombre."
    },
    {
        ref: "Yosua 1:8",
        refEn: "Joshua 1:8",
        refFr: "Josué 1:8",
        refEs: "Josué 1:8",
        id: "Janganlah engkau lupa memperkatakan kitab Taurat ini, tetapi renungkanlah itu siang dan malam, supaya engkau bertindak hati-hati sesuai dengan segala yang tertulis di dalamnya, sebab dengan demikian perjalananmu akan berhasil dan engkau akan beruntung.",
        en: "This book of the law shall not depart out of your mouth, but you shall meditate on it day and night, that you may observe to do according to all that is written therein: for then you shall make your way prosperous, and then you shall have good success.",
        fr: "Que ce livre de la loi ne s’éloigne point de ta bouche ; médite-le jour et nuit, pour agir fidèlement selon tout ce qui y est écrit ; car c’est alors que tu auras du succès dans tes entreprises, c’est alors que tu réussiras.",
        es: "El libro de aquesta ley nunca se apartará de tu boca: antes de día y de noche meditarás en él, para que guardes y hagas conforme á todo lo que en él está escrito: porque entonces harás prosperar tu camino, y todo te saldrá bien."
    },
    {
        ref: "Mazmur 1:2-3",
        refEn: "Psalm 1:2-3",
        refFr: "Psaumes 1:2-3",
        refEs: "Salmos 1:2-3",
        id: "tetapi yang kesukaannya ialah Taurat TUHAN, dan yang merenungkan Taurat itu siang dan malam. Ia seperti pohon, yang ditanam di tepi aliran air, yang menghasilkan buahnya pada musimnya, dan yang tidak layu daunnya; apa saja yang diperbuatnya berhasil.",
        en: "but his delight is in Yahweh’s law. On his law he meditates day and night. He will be like a tree planted by the streams of water, that produces its fruit in its season, whose leaf also does not wither. Whatever he does shall prosper.",
        fr: "Mais qui trouve son plaisir dans la loi de l’Éternel, Et qui la médite jour et nuit ! Il est comme un arbre planté près d’un courant d’eau, Qui donne son fruit en sa saison, Et dont le feuillage ne se flétrit point : Tout ce qu’il fait lui réussit.",
        es: "Antes en la ley de Jehová está su delicia, y en su ley medita de día y de noche. Y será como el árbol plantado junto á arroyos de aguas, que da su fruto en su tiempo, y su hoja no cae; y todo lo que hace, prosperará."
    },
    {
        ref: "Mazmur 19:8-9",
        refEn: "Psalm 19:7-8",
        refFr: "Psaumes 19:8-9",
        refEs: "Salmos 19:7-8",
        id: "Taurat TUHAN itu sempurna, menyegarkan jiwa; peraturan TUHAN itu teguh, memberikan hikmat kepada orang yang tak berpengalaman. Titah TUHAN itu tepat, menyukakan hati; perintah TUHAN itu murni, membuat mata bercahaya.",
        en: "Yahweh’s law is perfect, restoring the soul. Yahweh’s testimony is sure, making wise the simple. Yahweh’s precepts are right, rejoicing the heart. Yahweh’s commandment is pure, enlightening the eyes.",
        fr: "La loi de l’Éternel est parfaite, elle restaure l’âme ; Le témoignage de l’Éternel est véritable, il rend sage l’ignorant. Les ordonnances de l’Éternel sont droites, elles réjouissent le cœur ; Les commandements de l’Éternel sont purs, ils éclairent les yeux.",
        es: "La ley de Jehová es perfecta, que vuelve el alma: el testimonio de Jehová, fiel, que hace sabio al pequeño. Los mandamientos de Jehová son rectos, que alegran el corazón: el precepto de Jehová, puro, que alumbra los ojos."
    },
    {
        ref: "Mazmur 119:11",
        refEn: "Psalm 119:11",
        refFr: "Psaumes 119:11",
        refEs: "Salmos 119:11",
        id: "Dalam hatiku aku menyimpan janji-Mu, supaya aku jangan berdosa terhadap Engkau.",
        en: "I have hidden your word in my heart, that I might not sin against you.",
        fr: "Je serre ta parole dans mon cœur, Afin de ne pas pécher contre toi.",
        es: "En mi corazón he guardado tus dichos, para no pecar contra ti."
    },
    {
        ref: "Mazmur 119:130",
        refEn: "Psalm 119:130",
        refFr: "Psaumes 119:130",
        refEs: "Salmos 119:130",
        id: "Bila tersingkap, firman-firman-Mu memberi terang, memberi pengertian kepada orang-orang bodoh.",
        en: "The entrance of your words gives light. It gives understanding to the simple.",
        fr: "La révélation de tes paroles éclaire, Elle donne de l’intelligence aux simples.",
        es: "El principio de tus palabras alumbra; hace entender á los simples."
    },
    {
        ref: "Amsal 30:5",
        refEn: "Proverbs 30:5",
        refFr: "Proverbes 30:5",
        refEs: "Proverbios 30:5",
        id: "Semua firman Allah adalah murni. Ia adalah perisai bagi orang-orang yang berlindung pada-Nya.",
        en: "“Every word of God is flawless. He is a shield to those who take refuge in him.",
        fr: "Toute parole de Dieu est éprouvée. Il est un bouclier pour ceux qui cherchent en lui un refuge.",
        es: "Toda palabra de Dios es limpia; es escudo á los que en él esperan."
    },
    {
        ref: "Matius 4:4",
        refEn: "Matthew 4:4",
        refFr: "Matthieu 4:4",
        refEs: "Mateo 4:4",
        id: "Tetapi Yesus menjawab: /\"Ada tertulis: Manusia hidup bukan dari roti saja, tetapi dari setiap firman yang keluar dari mulut Allah.\"",
        en: "But he answered, “It is written, ‘Man shall not live by bread alone, but by every word that proceeds out of the mouth of God.’”",
        fr: "Jésus répondit : Il est écrit : L’homme ne vivra pas de pain seulement, mais de toute parole qui sort de la bouche de Dieu.",
        es: "Mas él respondiendo, dijo: Escrito está: No con solo el pan vivirá el hombre, mas con toda palabra que sale de la boca de Dios."
    },
    {
        ref: "Matius 24:35",
        refEn: "Matthew 24:35",
        refFr: "Matthieu 24:35",
        refEs: "Mateo 24:35",
        id: "Langit dan bumi akan berlalu, tetapi perkataan-Ku tidak akan berlalu.",
        en: "Heaven and earth will pass away, but my words will not pass away.",
        fr: "Le ciel et la terre passeront, mais mes paroles ne passeront point.",
        es: "El cielo y la tierra pasarán, mas mis palabras no pasarán."
    },
    {
        ref: "Lukas 11:28",
        refEn: "Luke 11:28",
        refFr: "Luc 11:28",
        refEs: "Lucas 11:28",
        id: "Tetapi Ia berkata: /\"Yang berbahagia ialah mereka yang mendengarkan firman Allah dan yang memeliharanya.\"",
        en: "But he said, “On the contrary, blessed are those who hear the word of God, and keep it.”",
        fr: "Et il répondit : Heureux plutôt ceux qui écoutent la parole de Dieu, et qui la gardent !",
        es: "Y él dijo: Antes bienaventurados los que oyen la palabra de Dios, y la guardan."
    },
    {
        ref: "Roma 15:4",
        refEn: "Romans 15:4",
        refFr: "Romains 15:4",
        refEs: "Romanos 15:4",
        id: "Sebab segala sesuatu yang ditulis dahulu, telah ditulis untuk menjadi pelajaran bagi kita, supaya kita teguh berpegang pada pengharapan oleh ketekunan dan penghiburan dari Kitab Suci.",
        en: "For whatever things were written before were written for our learning, that through patience and through encouragement of the Scriptures we might have hope.",
        fr: "Or, tout ce qui a été écrit d’avance l’a été pour notre instruction, afin que, par la patience, et par la consolation que donnent les Écritures, nous possédions l’espérance.",
        es: "Porque las cosas que antes fueron escritas, para nuestra enseñanza fueron escritas; para que por la paciencia, y por la consolación de las Escrituras, tengamos esperanza."
    },
    {
        ref: "1 Petrus 1:23",
        refEn: "1 Peter 1:23",
        refFr: "1 Pierre 1:23",
        refEs: "1 Pedro 1:23",
        id: "Karena kamu telah dilahirkan kembali bukan dari benih yang fana, tetapi dari benih yang tidak fana, oleh firman Allah, yang hidup dan yang kekal.",
        en: "having been born again, not of corruptible seed, but of incorruptible, through the word of God, which lives and remains forever.",
        fr: "puisque vous avez été régénérés, non par une semence corruptible, mais par une semence incorruptible, par la parole vivante et permanente de Dieu.",
        es: "Siendo renacidos, no de simiente corruptible, sino de incorruptible, por la palabra de Dios, que vive y permanece para siempre."
    },
    {
        ref: "1 Petrus 1:25",
        refEn: "1 Peter 1:25",
        refFr: "1 Pierre 1:25",
        refEs: "1 Pedro 1:25",
        id: "tetapi firman Tuhan tetap untuk selama-lamanya.\" Inilah firman yang disampaikan Injil kepada kamu.",
        en: "but the Lord’s word endures forever.” This is the word of Good News which was preached to you.",
        fr: "Mais la parole du Seigneur demeure éternellement. Et cette parole est celle qui vous a été annoncée par l’Évangile.",
        es: "Mas la palabra del Señor permanece perpetuamente. Y esta es la palabra que por el evangelio os ha sido anunciada."
    },
    {
        ref: "Wahyu 1:3",
        refEn: "Revelation 1:3",
        refFr: "Apocalypse 1:3",
        refEs: "Apocalipsis 1:3",
        id: "Berbahagialah ia yang membacakan dan mereka yang mendengarkan kata-kata nubuat ini, dan yang menuruti apa yang ada tertulis di dalamnya, sebab waktunya sudah dekat.",
        en: "Blessed is he who reads and those who hear the words of the prophecy, and keep the things that are written in it, for the time is at hand.",
        fr: "Heureux celui qui lit et ceux qui entendent les paroles de la prophétie, et qui gardent les choses qui y sont écrites ! Car le temps est proche.",
        es: "Bienaventurado el que lee, y los que oyen las palabras de esta profecía, y guardan las cosas en ella escritas: porque el tiempo está cerca."
    },
    {
        ref: "1 Tawarikh 16:34",
        refEn: "1 Chronicles 16:34",
        refFr: "1 Chroniques 16:34",
        refEs: "1 Crónicas 16:34",
        id: "Bersyukurlah kepada TUHAN, sebab Ia baik! Bahwasanya untuk selama-lamanya kasih setia-Nya.",
        en: "Oh give thanks to Yahweh, for he is good, for his loving kindness endures forever.",
        fr: "Louez l’Éternel, car il est bon, Car sa miséricorde dure à toujours !",
        es: "Celebrad á Jehová, porque es bueno; porque su misericordia es eterna."
    },
    {
        ref: "Mazmur 8:1",
        refEn: "Psalm 8:1",
        refFr: "Psaumes 8:1",
        refEs: "Salmos 8:1",
        id: "Untuk pemimpin biduan. Menurut lagu: Gitit. Mazmur Daud. (8-",
        en: "Yahweh, our Lord, how majestic is your name in all the earth, who has set your glory above the heavens!",
        fr: "Au chef des chantres. Sur la guitthith. Psaume de David.",
        es: "OH Jehová, Señor nuestro, ¡cuán grande es tu nombre en toda la tierra, que has puesto tu gloria sobre los cielos!"
    },
    {
        ref: "Mazmur 30:12-13",
        refEn: "Psalm 30:11-12",
        refFr: "Psaumes 30:12-13",
        refEs: "Salmos 30:11-12",
        id: "Aku yang meratap telah Kauubah menjadi orang yang menari- nari, kain kabungku telah Kaubuka, pinggangku Kauikat dengan sukacita, supaya jiwaku menyanyikan mazmur bagi-Mu dan jangan berdiam diri. TUHAN, Allahku, untuk selama- lamanya aku mau menyanyikan syukur bagi-Mu.",
        en: "You have turned my mourning into dancing for me. You have removed my sackcloth, and clothed me with gladness, To the end that my heart may sing praise to you, and not be silent. Yahweh my God, I will give thanks to you forever!",
        fr: "Et tu as changé mes lamentations en allégresse, Tu as délié mon sac, et tu m’as ceint de joie, Afin que mon cœur te chante et ne soit pas muet. Éternel, mon Dieu ! je te louerai toujours.",
        es: "Has tornado mi endecha en baile; desataste mi saco, y ceñísteme de alegría. Por tanto á ti cantaré, gloria mía, y no estaré callado. Jehová Dios mío, te alabaré para siempre."
    },
    {
        ref: "Mazmur 66:1-2",
        refEn: "Psalm 66:1-2",
        refFr: "Psaumes 66:1-2",
        refEs: "Salmos 66:1-2",
        id: "Untuk pemimpin biduan. Nyanyian Mazmur. Bersorak- sorailah bagi Allah, hai seluruh bumi, mazmurkanlah kemuliaan nama-Nya, muliakanlah Dia dengan puji-pujian!",
        en: "Make a joyful shout to God, all the earth! Sing to the glory of his name! Offer glory and praise!",
        fr: "Au chef des chantres. Cantique. Psaume. Poussez vers Dieu des cris de joie, Vous tous, habitants de la terre ! Chantez la gloire de son nom, Célébrez sa gloire par vos louanges !",
        es: "ACLAMAD á Dios con alegría, toda la tierra: Cantad la gloria de su nombre: poned gloria en su alabanza."
    },
    {
        ref: "Mazmur 92:2-3",
        refEn: "Psalm 92:1-2",
        refFr: "Psaumes 92:2-3",
        refEs: "Salmos 92:1-2",
        id: "Adalah baik untuk menyanyikan syukur kepada TUHAN, dan untuk menyanyikan mazmur bagi nama-Mu, ya Yang Mahatinggi, untuk memberitakan kasih setia-Mu di waktu pagi dan kesetiaan-Mu di waktu malam,",
        en: "It is a good thing to give thanks to Yahweh, to sing praises to your name, Most High; to proclaim your loving kindness in the morning, and your faithfulness every night,",
        fr: "Il est beau de louer l’Éternel, Et de célébrer ton nom, ô Très-Haut ! D’annoncer le matin ta bonté, Et ta fidélité pendant les nuits,",
        es: "BUENO es alabar á Jehová, y cantar salmos á tu nombre, oh Altísimo; Anunciar por la mañana tu misericordia, y tu verdad en las noches,"
    },
    {
        ref: "Mazmur 103:1-2",
        refEn: "Psalm 103:1-2",
        refFr: "Psaumes 103:1-2",
        refEs: "Salmos 103:1-2",
        id: "Dari Daud. Pujilah TUHAN, hai jiwaku! Pujilah nama-Nya yang kudus, hai segenap batinku! Pujilah TUHAN, hai jiwaku, dan janganlah lupakan segala kebaikan-Nya!",
        en: "Praise Yahweh, my soul! All that is within me, praise his holy name! Praise Yahweh, my soul, and don’t forget all his benefits;",
        fr: "De David. Mon âme, bénis l’Éternel ! Que tout ce qui est en moi bénisse son saint nom ! Mon âme, bénis l’Éternel, Et n’oublie aucun de ses bienfaits !",
        es: "BENDICE, alma mía, á Jehová; y bendigan todas mis entrañas su santo nombre. Bendice, alma mía á Jehová, y no olvides ninguno de sus beneficios."
    },
    {
        ref: "Mazmur 107:1",
        refEn: "Psalm 107:1",
        refFr: "Psaumes 107:1",
        refEs: "Salmos 107:1",
        id: "Bersyukurlah kepada TUHAN, sebab Ia baik! Bahwasanya untuk selama-lamanya kasih setia-Nya.",
        en: "Give thanks to Yahweh, for he is good, for his loving kindness endures forever.",
        fr: "Louez l’Éternel, car il est bon, Car sa miséricorde dure à toujours !",
        es: "ALABAD á Jehová, porque es bueno; porque para siempre es su misericordia."
    },
    {
        ref: "Mazmur 118:24",
        refEn: "Psalm 118:24",
        refFr: "Psaumes 118:24",
        refEs: "Salmos 118:24",
        id: "Inilah hari yang dijadikan TUHAN, marilah kita bersorak-sorak dan bersukacita karenanya!",
        en: "This is the day that Yahweh has made. We will rejoice and be glad in it!",
        fr: "C’est ici la journée que l’Éternel a faite : Qu’elle soit pour nous un sujet d’allégresse et de joie !",
        es: "Este es el día que hizo Jehová: nos gozaremos y alegraremos en él."
    },
    {
        ref: "Mazmur 145:3",
        refEn: "Psalm 145:3",
        refFr: "Psaumes 145:3",
        refEs: "Salmos 145:3",
        id: "Besarlah TUHAN dan sangat terpuji, dan kebesaran-Nya tidak terduga.",
        en: "Great is Yahweh, and greatly to be praised! His greatness is unsearchable.",
        fr: "L’Éternel est grand et très digne de louange, Et sa grandeur est insondable.",
        es: "Grande es Jehová y digno de suprema alabanza: y su grandeza es inescrutable."
    },
    {
        ref: "Habakuk 3:17-18",
        refEn: "Habakkuk 3:17-18",
        refFr: "Habacuc 3:17-18",
        refEs: "Habacuc 3:17-18",
        id: "Sekalipun pohon ara tidak berbunga, pohon anggur tidak berbuah, hasil pohon zaitun mengecewakan, sekalipun ladang-ladang tidak menghasilkan bahan makanan, kambing domba terhalau dari kurungan, dan tidak ada lembu sapi dalam kandang, namun aku akan bersorak-sorak di dalam TUHAN, beria-ria di dalam Allah yang menyelamatkan aku.",
        en: "For though the fig tree doesn’t flourish, nor fruit be in the vines; the labor of the olive fails, the fields yield no food; the flocks are cut off from the fold, and there is no herd in the stalls: yet I will rejoice in Yahweh. I will be joyful in the God of my salvation!",
        fr: "Car le figuier ne fleurira pas, La vigne ne produira rien, Le fruit de l’olivier manquera, Les champs ne donneront pas de nourriture ; Les brebis disparaîtront du pâturage, Et il n’y aura plus de bœufs dans les étables. Toutefois, je veux me réjouir en l’Éternel, Je veux me réjouir dans le Dieu de mon salut.",
        es: "Aunque la higuera no florecerá, ni en las vides habrá frutos; mentirá la obra de la oliva, y los labrados no darán mantenimiento, y las ovejas serán quitadas de la majada, y no habrá vacas en los corrales; Con todo, yo me alegraré en Jehová, y me gozaré en el Dios de mi salud."
    },
    {
        ref: "Kolose 3:16",
        refEn: "Colossians 3:16",
        refFr: "Colossiens 3:16",
        refEs: "Colosenses 3:16",
        id: "Hendaklah perkataan Kristus diam dengan segala kekayaannya di antara kamu, sehingga kamu dengan segala hikmat mengajar dan menegur seorang akan yang lain dan sambil menyanyikan mazmur, dan puji-pujian dan nyanyian rohani, kamu mengucap syukur kepada Allah di dalam hatimu.",
        en: "Let the word of Christ dwell in you richly; in all wisdom teaching and admonishing one another with psalms, hymns, and spiritual songs, singing with grace in your heart to the Lord.",
        fr: "Que la parole de Christ habite parmi vous abondamment ; instruisez-vous et exhortez-vous les uns les autres en toute sagesse, par des psaumes, par des hymnes, par des cantiques spirituels, chantant à Dieu dans vos cœurs sous l’inspiration de la grâce.",
        es: "La palabra de Cristo habite en vosotros en abundancia en toda sabiduría, enseñándoos y exhortándoos los unos á los otros con salmos é himnos y canciones espirituales, con gracia cantando en vuestros corazones al Señor."
    },
    {
        ref: "1 Tesalonika 5:18",
        refEn: "1 Thessalonians 5:18",
        refFr: "1 Thessaloniciens 5:18",
        refEs: "1 Tesalonicenses 5:18",
        id: "Mengucap syukurlah dalam segala hal, sebab itulah yang dikehendaki Allah di dalam Kristus Yesus bagi kamu.",
        en: "In everything give thanks, for this is the will of God in Christ Jesus toward you.",
        fr: "Rendez grâces en toutes choses, car c’est à votre égard la volonté de Dieu en Jésus-Christ.",
        es: "Dad gracias en todo; porque esta es la voluntad de Dios para con vosotros en Cristo Jesús."
    },
    {
        ref: "Ibrani 13:15",
        refEn: "Hebrews 13:15",
        refFr: "Hébreux 13:15",
        refEs: "Hebreos 13:15",
        id: "Sebab itu marilah kita, oleh Dia, senantiasa mempersembahkan korban syukur kepada Allah, yaitu ucapan bibir yang memuliakan nama-Nya.",
        en: "Through him, then, let us offer up a sacrifice of praise to God continually, that is, the fruit of lips which proclaim allegiance to his name.",
        fr: "Par lui, offrons sans cesse à Dieu un sacrifice de louange, c’est-à-dire le fruit de lèvres qui confessent son nom.",
        es: "Así que, ofrezcamos por medio de él á Dios siempre sacrificio de alabanza, es á saber, fruto de labios que confiesen á su nombre."
    },
    {
        ref: "Ulangan 28:2",
        refEn: "Deuteronomy 28:2",
        refFr: "Deutéronome 28:2",
        refEs: "Deuteronomio 28:2",
        id: "Segala berkat ini akan datang kepadamu dan menjadi bagianmu, jika engkau mendengarkan suara TUHAN, Allahmu:",
        en: "All these blessings will come upon you, and overtake you, if you listen to Yahweh your God’s voice.",
        fr: "Voici toutes les bénédictions qui se répandront sur toi et qui seront ton partage, lorsque tu obéiras à la voix de l’Éternel, ton Dieu :",
        es: "Y vendrán sobre ti todas estas bendiciones, y te alcanzarán, cuando oyeres la voz de Jehová tu Dios."
    },
    {
        ref: "Mazmur 1:1",
        refEn: "Psalm 1:1",
        refFr: "Psaumes 1:1",
        refEs: "Salmos 1:1",
        id: "Berbahagialah orang yang tidak berjalan menurut nasihat orang fasik, yang tidak berdiri di jalan orang berdosa, dan yang tidak duduk dalam kumpulan pencemooh,",
        en: "Blessed is the man who doesn’t walk in the counsel of the wicked, nor stand on the path of sinners, nor sit in the seat of scoffers;",
        fr: "Heureux l’homme qui ne marche pas selon le conseil des méchants, Qui ne s’arrête pas sur la voie des pécheurs, Et qui ne s’assied pas en compagnie des moqueurs,",
        es: "BIENAVENTURADO el varón que no anduvo en consejo de malos, ni estuvo en camino de pecadores, ni en silla de escarnecedores se ha sentado;"
    },
    {
        ref: "Mazmur 24:4-5",
        refEn: "Psalm 24:4-5",
        refFr: "Psaumes 24:4-5",
        refEs: "Salmos 24:4-5",
        id: "\"Orang yang bersih tangannya dan murni hatinya, yang tidak menyerahkan dirinya kepada penipuan, dan yang tidak bersumpah palsu. Dialah yang akan menerima berkat dari TUHAN dan keadilan dari Allah yang menyelamatkan dia.",
        en: "He who has clean hands and a pure heart; who has not lifted up his soul to falsehood, and has not sworn deceitfully. He shall receive a blessing from Yahweh, righteousness from the God of his salvation.",
        fr: "Celui qui a les mains innocentes et le cœur pur ; Celui qui ne livre pas son âme au mensonge, Et qui ne jure pas pour tromper. Il obtiendra la bénédiction de l’Éternel, La miséricorde du Dieu de son salut.",
        es: "El limpio de manos, y puro de corazón: el que no ha elevado su alma á la vanidad, ni jurado con engaño. El recibirá bendición de Jehová, y justicia del Dios de salud."
    },
    {
        ref: "Mazmur 67:2",
        refEn: "Psalm 67:1",
        refFr: "Psaumes 67:2",
        refEs: "Salmos 67:1",
        id: "Kiranya Allah mengasihani kita dan memberkati kita, kiranya Ia menyinari kita dengan wajah-Nya, Sela",
        en: "May God be merciful to us, bless us, and cause his face to shine on us. Selah.",
        fr: "Que Dieu ait pitié de nous et qu’il nous bénisse, Qu’il fasse luire sur nous sa face, -Pause.",
        es: "DIOS tenga misericordia de nosotros, y nos bendiga; haga resplandecer su rostro sobre nosotros (Selah);"
    },
    {
        ref: "Mazmur 112:1",
        refEn: "Psalm 112:1",
        refFr: "Psaumes 112:1",
        refEs: "Salmos 112:1",
        id: "Haleluya! Berbahagialah orang yang takut akan TUHAN, yang sangat suka kepada segala perintah-Nya.",
        en: "Praise Yah! Blessed is the man who fears Yahweh, who delights greatly in his commandments.",
        fr: "Louez l’Éternel ! Heureux l’homme qui craint l’Éternel, Qui trouve un grand plaisir à ses commandements.",
        es: "BIENAVENTURADO el hombre que teme á Jehová, y en sus mandamientos se deleita en gran manera."
    },
    {
        ref: "Mazmur 128:1",
        refEn: "Psalm 128:1",
        refFr: "Psaumes 128:1",
        refEs: "Salmos 128:1",
        id: "Nyanyian ziarah. Berbahagialah setiap orang yang takut akan TUHAN, yang hidup menurut jalan yang ditunjukkan-Nya!",
        en: "Blessed is everyone who fears Yahweh, who walks in his ways.",
        fr: "Cantique des degrés. Heureux tout homme qui craint l’Éternel, Qui marche dans ses voies !",
        es: "BIENAVENTURADO todo aquel que teme á Jehová, que anda en sus caminos."
    },
    {
        ref: "Amsal 10:22",
        refEn: "Proverbs 10:22",
        refFr: "Proverbes 10:22",
        refEs: "Proverbios 10:22",
        id: "Berkat Tuhanlah yang menjadikan kaya, susah payah tidak akan menambahinya.",
        en: "Yahweh’s blessing brings wealth, and he adds no trouble to it.",
        fr: "C’est la bénédiction de l’Éternel qui enrichit, Et il ne la fait suivre d’aucun chagrin.",
        es: "La bendición de Jehová es la que enriquece, y no añade tristeza con ella."
    },
    {
        ref: "Lukas 6:38",
        refEn: "Luke 6:38",
        refFr: "Luc 6:38",
        refEs: "Lucas 6:38",
        id: "Berilah dan kamu akan diberi: suatu takaran yang baik, yang dipadatkan, yang digoncang dan yang tumpah ke luar akan dicurahkan ke dalam ribaanmu. Sebab ukuran yang kamu pakai untuk mengukur, akan diukurkan kepadamu.\"",
        en: "“Give, and it will be given to you: good measure, pressed down, shaken together, and running over, will be given to you. For with the same measure you measure it will be measured back to you.”",
        fr: "Donnez, et il vous sera donné : on versera dans votre sein une bonne mesure, serrée, secouée et qui déborde ; car on vous mesurera avec la mesure dont vous vous serez servis.",
        es: "Dad, y se os dará; medida buena, apretada, remecida, y rebosando darán en vuestro seno: porque con la misma medida que midiereis, os será vuelto á medir."
    },
    {
        ref: "2 Korintus 9:8",
        refEn: "2 Corinthians 9:8",
        refFr: "2 Corinthiens 9:8",
        refEs: "2 Corintios 9:8",
        id: "Dan Allah sanggup melimpahkan segala kasih karunia kepada kamu, supaya kamu senantiasa berkecukupan di dalam segala sesuatu dan malah berkelebihan di dalam pelbagai kebajikan.",
        en: "And God is able to make all grace abound to you, that you, always having all sufficiency in everything, may abound to every good work.",
        fr: "Et Dieu peut vous combler de toutes sortes de grâces, afin que, possédant toujours en toutes choses de quoi satisfaire à tous vos besoins, vous ayez encore en abondance pour toute bonne œuvre,",
        es: "Y poderoso es Dios para hacer que abunde en vosotros toda gracia; á fin de que, teniendo siempre en todas las cosas todo lo que basta, abundéis para toda buena obra:"
    },
    {
        ref: "Yakobus 1:17",
        refEn: "James 1:17",
        refFr: "Jacques 1:17",
        refEs: "Santiago 1:17",
        id: "Setiap pemberian yang baik dan setiap anugerah yang sempurna, datangnya dari atas, diturunkan dari Bapa segala terang; pada-Nya tidak ada perubahan atau bayangan karena pertukaran.",
        en: "Every good gift and every perfect gift is from above, coming down from the Father of lights, with whom can be no variation, nor turning shadow.",
        fr: "toute grâce excellente et tout don parfait descendent d’en haut, du Père des lumières, chez lequel il n’y a ni changement ni ombre de variation.",
        es: "Toda buena dádiva y todo don perfecto es de lo alto, que desciende del Padre de las luces, en el cual no hay mudanza, ni sombra de variación."
    },
    {
        ref: "Yakobus 1:25",
        refEn: "James 1:25",
        refFr: "Jacques 1:25",
        refEs: "Santiago 1:25",
        id: "Tetapi barangsiapa meneliti hukum yang sempurna, yaitu hukum yang memerdekakan orang, dan ia bertekun di dalamnya, jadi bukan hanya mendengar untuk melupakannya, tetapi sungguh-sungguh melakukannya, ia akan berbahagia oleh perbuatannya.",
        en: "But he who looks into the perfect law of freedom, and continues, not being a hearer who forgets, but a doer of the work, this man will be blessed in what he does.",
        fr: "Mais celui qui aura plongé les regards dans la loi parfaite, la loi de la liberté, et qui aura persévéré, n’étant pas un auditeur oublieux, mais se mettant à l’œuvre, celui-là sera heureux dans son activité.",
        es: "Mas el que hubiere mirado atentamente en la perfecta ley, que es la de la libertad, y perseverado en ella, no siendo oidor olvidadizo, sino hacedor de la obra, este tal será bienaventurado en su hecho."
    },
    {
        ref: "Ayub 28:28",
        refEn: "Job 28:28",
        refFr: "Job 28:28",
        refEs: "Job 28:28",
        id: "tetapi kepada manusia Ia berfirman: Sesungguhnya, takut akan Tuhan, itulah hikmat, dan menjauhi kejahatan itulah akal budi.\"",
        en: "To man he said, ‘Behold, the fear of the Lord, that is wisdom. To depart from evil is understanding.’”",
        fr: "Puis il dit à l’homme : Voici, la crainte du Seigneur, c’est la sagesse ; S’éloigner du mal, c’est l’intelligence.",
        es: "Y dijo al hombre: He aquí que el temor del Señor es la sabiduría, y el apartarse del mal la inteligencia."
    },
    {
        ref: "Mazmur 90:12",
        refEn: "Psalm 90:12",
        refFr: "Psaumes 90:12",
        refEs: "Salmos 90:12",
        id: "Ajarlah kami menghitung hari-hari kami sedemikian, hingga kami beroleh hati yang bijaksana.",
        en: "So teach us to number our days, that we may gain a heart of wisdom.",
        fr: "Enseigne-nous à bien compter nos jours, Afin que nous appliquions notre cœur à la sagesse.",
        es: "Enséñanos de tal modo á contar nuestros días, que traigamos al corazón sabiduría."
    },
    {
        ref: "Mazmur 111:10",
        refEn: "Psalm 111:10",
        refFr: "Psaumes 111:10",
        refEs: "Salmos 111:10",
        id: "Permulaan hikmat adalah takut akan TUHAN, semua orang yang melakukannya berakal budi yang baik. Puji-pujian kepada-Nya tetap untuk selamanya.",
        en: "The fear of Yahweh is the beginning of wisdom. All those who do his work have a good understanding. His praise endures forever!",
        fr: "La crainte de l’Éternel est le commencement de la sagesse ; Tous ceux qui l’observent ont une raison saine. Sa gloire subsiste à jamais.",
        es: "El principio de la sabiduría es el temor de Jehová: buen entendimiento tienen cuantos ponen aquéllos por obra: su loor permanece para siempre."
    },
    {
        ref: "Mazmur 143:8",
        refEn: "Psalm 143:8",
        refFr: "Psaumes 143:8",
        refEs: "Salmos 143:8",
        id: "Perdengarkanlah kasih setia- Mu kepadaku pada waktu pagi, sebab kepada-Mulah aku percaya! Beritahukanlah aku jalan yang harus kutempuh, sebab kepada-Mulah kuangkat jiwaku.",
        en: "Cause me to hear your loving kindness in the morning, for I trust in you. Cause me to know the way in which I should walk, for I lift up my soul to you.",
        fr: "Fais-moi dès le matin entendre ta bonté ! Car je me confie en toi. Fais-moi connaître le chemin où je dois marcher ! Car j’élève à toi mon âme.",
        es: "Hazme oir por la mañana tu misericordia, porque en ti he confiado: hazme saber el camino por donde ande, porque á ti he alzado mi alma."
    },
    {
        ref: "Amsal 2:6",
        refEn: "Proverbs 2:6",
        refFr: "Proverbes 2:6",
        refEs: "Proverbios 2:6",
        id: "Karena Tuhanlah yang memberikan hikmat, dari mulut-Nya datang pengetahuan dan kepandaian.",
        en: "For Yahweh gives wisdom. Out of his mouth comes knowledge and understanding.",
        fr: "Car l’Éternel donne la sagesse ; De sa bouche sortent la connaissance et l’intelligence ;",
        es: "Porque Jehová da la sabiduría, y de su boca viene el conocimiento y la inteligencia."
    },
    {
        ref: "Amsal 3:13",
        refEn: "Proverbs 3:13",
        refFr: "Proverbes 3:13",
        refEs: "Proverbios 3:13",
        id: "Berbahagialah orang yang mendapat hikmat, orang yang memperoleh kepandaian,",
        en: "Happy is the man who finds wisdom, the man who gets understanding.",
        fr: "Heureux l’homme qui a trouvé la sagesse, Et l’homme qui possède l’intelligence !",
        es: "Bienaventurado el hombre que halla la sabiduría, y que obtiene la inteligencia:"
    },
    {
        ref: "Amsal 4:7",
        refEn: "Proverbs 4:7",
        refFr: "Proverbes 4:7",
        refEs: "Proverbios 4:7",
        id: "Permulaan hikmat ialah: perolehlah hikmat dan dengan segala yang kauperoleh perolehlah pengertian.",
        en: "Wisdom is supreme. Get wisdom. Yes, though it costs all your possessions, get understanding.",
        fr: "Voici le commencement de la sagesse : Acquiers la sagesse, Et avec tout ce que tu possèdes acquiers l’intelligence.",
        es: "Sabiduría ante todo: adquiere sabiduría: y ante toda tu posesión adquiere inteligencia."
    },
    {
        ref: "Amsal 9:10",
        refEn: "Proverbs 9:10",
        refFr: "Proverbes 9:10",
        refEs: "Proverbios 9:10",
        id: "Permulaan hikmat adalah takut akan TUHAN, dan mengenal Yang Mahakudus adalah pengertian.",
        en: "The fear of Yahweh is the beginning of wisdom. The knowledge of the Holy One is understanding.",
        fr: "Le commencement de la sagesse, c’est la crainte de l’Éternel ; Et la science des saints, c’est l’intelligence.",
        es: "El temor de Jehová es el principio de la sabiduría; y la ciencia de los santos es inteligencia."
    },
    {
        ref: "Amsal 19:20",
        refEn: "Proverbs 19:20",
        refFr: "Proverbes 19:20",
        refEs: "Proverbios 19:20",
        id: "Dengarkanlah nasihat dan terimalah didikan, supaya engkau menjadi bijak di masa depan.",
        en: "Listen to counsel and receive instruction, that you may be wise in your latter end.",
        fr: "Écoute les conseils, et reçois l’instruction, Afin que tu sois sage dans la suite de ta vie.",
        es: "Escucha el consejo, y recibe la corrección, para que seas sabio en tu vejez."
    },
    {
        ref: "Amsal 27:17",
        refEn: "Proverbs 27:17",
        refFr: "Proverbes 27:17",
        refEs: "Proverbios 27:17",
        id: "Besi menajamkan besi, orang menajamkan sesamanya.",
        en: "Iron sharpens iron; so a man sharpens his friend’s countenance.",
        fr: "Comme le fer aiguise le fer, Ainsi un homme excite la colère d’un homme.",
        es: "Hierro con hierro se aguza; y el hombre aguza el rostro de su amigo."
    },
    {
        ref: "Kolose 3:23",
        refEn: "Colossians 3:23",
        refFr: "Colossiens 3:23",
        refEs: "Colosenses 3:23",
        id: "Apapun juga yang kamu perbuat, perbuatlah dengan segenap hatimu seperti untuk Tuhan dan bukan untuk manusia.",
        en: "And whatever you do, work heartily, as for the Lord, and not for men,",
        fr: "Tout ce que vous faites, faites-le de bon cœur, comme pour le Seigneur et non pour des hommes,",
        es: "Y todo lo que hagáis, hacedlo de ánimo, como al Señor, y no á los hombres;"
    },
    {
        ref: "Yakobus 3:17",
        refEn: "James 3:17",
        refFr: "Jacques 3:17",
        refEs: "Santiago 3:17",
        id: "Tetapi hikmat yang dari atas adalah pertama-tama murni, selanjutnya pendamai, peramah, penurut, penuh belas kasihan dan buah-buah yang baik, tidak memihak dan tidak munafik.",
        en: "But the wisdom that is from above is first pure, then peaceful, gentle, reasonable, full of mercy and good fruits, without partiality, and without hypocrisy.",
        fr: "La sagesse d’en haut est premièrement pure, ensuite pacifique, modérée, conciliante, pleine de miséricorde et de bons fruits, exempte de duplicité, d’hypocrisie.",
        es: "Mas la sabiduría que es de lo alto, primeramente es pura, después pacífica, modesta, benigna, llena de misericordia y de buenos frutos, no juzgadora, no fingida."
    },
    {
        ref: "Kejadian 22:14",
        refEn: "Genesis 22:14",
        refFr: "Genèse 22:14",
        refEs: "Génesis 22:14",
        id: "Dan Abraham menamai tempat itu: \"TUHAN menyediakan\"; sebab itu sampai sekarang dikatakan orang: \"Di atas gunung TUHAN, akan disediakan.\"",
        en: "Abraham called the name of that place Yahweh Will Provide. As it is said to this day, “On Yahweh’s mountain, it will be provided.”",
        fr: "Abraham donna à ce lieu le nom de Jehova-Jiré. C’est pourquoi l’on dit aujourd’hui : À la montagne de l’Éternel il sera pourvu.",
        es: "Y llamó Abraham el nombre de aquel lugar, Jehová proveerá. Por tanto se dice hoy: En el monte de Jehová será provisto."
    },
    {
        ref: "Mazmur 23:1",
        refEn: "Psalm 23:1",
        refFr: "Psaumes 23:1",
        refEs: "Salmos 23:1",
        id: "Mazmur Daud. TUHAN adalah gembalaku, takkan kekurangan aku.",
        en: "Yahweh is my shepherd: I shall lack nothing.",
        fr: "Cantique de David. L’Éternel est mon berger : je ne manquerai de rien.",
        es: "JEHOVÁ es mi pastor; nada me faltará."
    },
    {
        ref: "Mazmur 34:11",
        refEn: "Psalm 34:10",
        refFr: "Psaumes 34:11",
        refEs: "Salmos 34:10",
        id: "Singa-singa muda merana kelaparan, tetapi orang-orang yang mencari TUHAN, tidak kekurangan sesuatupun yang baik.",
        en: "The young lions do lack, and suffer hunger, but those who seek Yahweh shall not lack any good thing.",
        fr: "Les lionceaux éprouvent la disette et la faim, Mais ceux qui cherchent l’Éternel ne sont privés d’aucun bien.",
        es: "Los leoncillos necesitaron, y tuvieron hambre; pero los que buscan á Jehová, no tendrán falta de ningún bien."
    },
    {
        ref: "Mazmur 37:25",
        refEn: "Psalm 37:25",
        refFr: "Psaumes 37:25",
        refEs: "Salmos 37:25",
        id: "Dahulu aku muda, sekarang telah menjadi tua, tetapi tidak pernah kulihat orang benar ditinggalkan, atau anak cucunya meminta-minta roti;",
        en: "I have been young, and now am old, yet I have not seen the righteous forsaken, nor his children begging for bread.",
        fr: "J’ai été jeune, j’ai vieilli ; Et je n’ai point vu le juste abandonné, Ni sa postérité mendiant son pain.",
        es: "Mozo fuí, y he envejecido, y no he visto justo desamparado, ni su simiente que mendigue pan."
    },
    {
        ref: "Mazmur 84:12",
        refEn: "Psalm 84:11",
        refFr: "Psaumes 84:12",
        refEs: "Salmos 84:11",
        id: "Sebab TUHAN Allah adalah matahari dan perisai; kasih dan kemuliaan Ia berikan; Ia tidak menahan kebaikan dari orang yang hidup tidak bercela.",
        en: "For Yahweh God is a sun and a shield. Yahweh will give grace and glory. He withholds no good thing from those who walk blamelessly.",
        fr: "Car l’Éternel Dieu est un soleil et un bouclier, L’Éternel donne la grâce et la gloire, Il ne refuse aucun bien à ceux qui marchent dans l’intégrité.",
        es: "Porque sol y escudo es Jehová Dios: gracia y gloria dará Jehová: no quitará el bien á los que en integridad andan."
    },
    {
        ref: "Amsal 3:9-10",
        refEn: "Proverbs 3:9-10",
        refFr: "Proverbes 3:9-10",
        refEs: "Proverbios 3:9-10",
        id: "Muliakanlah TUHAN dengan hartamu dan dengan hasil pertama dari segala penghasilanmu, maka lumbung-lumbungmu akan diisi penuh sampai melimpah-limpah, dan bejana pemerahanmu akan meluap dengan air buah anggurnya.",
        en: "Honor Yahweh with your substance, with the first fruits of all your increase: so your barns will be filled with plenty, and your vats will overflow with new wine.",
        fr: "Honore l’Éternel avec tes biens, Et avec les prémices de tout ton revenu : Alors tes greniers seront remplis d’abondance, Et tes cuves regorgeront de moût.",
        es: "Honra á Jehová de tu sustancia, y de las primicias de todos tus frutos; Y serán llenas tus trojes con abundancia, y tus lagares rebosarán de mosto."
    },
    {
        ref: "Maleakhi 3:6",
        refEn: "Malachi 3:6",
        refFr: "Malachie 3:6",
        refEs: "Malaquías 3:6",
        id: "Bahwasanya Aku, TUHAN, tidak berubah, dan kamu, bani Yakub, tidak akan lenyap.",
        en: "“For I, Yahweh, don’t change; therefore you, sons of Jacob, are not consumed.",
        fr: "Car je suis l’Éternel, je ne change pas ; Et vous, enfants de Jacob, vous n’avez pas été consumés.",
        es: "Porque yo Jehová, no me mudo; y así vosotros, hijos de Jacob, no habéis sido consumidos."
    },
    {
        ref: "Matius 6:31-32",
        refEn: "Matthew 6:31-32",
        refFr: "Matthieu 6:31-32",
        refEs: "Mateo 6:31-32",
        id: "Sebab itu janganlah kamu kuatir dan berkata: Apakah yang akan kami makan? Apakah yang akan kami minum? Apakah yang akan kami pakai? Semua itu dicari bangsa-bangsa yang tidak mengenal Allah. Akan tetapi Bapamu yang di sorga tahu, bahwa kamu memerlukan semuanya itu.",
        en: "“Therefore don’t be anxious, saying, ‘What will we eat?’, ‘What will we drink?’ or, ‘With what will we be clothed?’ For the Gentiles seek after all these things; for your heavenly Father knows that you need all these things.",
        fr: "Ne vous inquiétez donc point, et ne dites pas : Que mangerons-nous ? que boirons-nous ? de quoi serons-nous vêtus ? Car toutes ces choses, ce sont les païens qui les recherchent. Votre Père céleste sait que vous en avez besoin .",
        es: "No os congojéis pues, diciendo: ¿Qué comeremos, ó qué beberemos, ó con qué nos cubriremos? Porque los Gentiles buscan todas estas cosas: que vuestro Padre celestial sabe que de todas estas cosas habéis menester."
    },
    {
        ref: "Lukas 12:24",
        refEn: "Luke 12:24",
        refFr: "Luc 12:24",
        refEs: "Lucas 12:24",
        id: "Perhatikanlah burung-burung gagak yang tidak menabur dan tidak menuai dan tidak mempunyai gudang atau lumbung, namun demikian diberi makan oleh Allah. Betapa jauhnya kamu melebihi burung-burung itu!",
        en: "Consider the ravens: they don’t sow, they don’t reap, they have no warehouse or barn, and God feeds them. How much more valuable are you than birds!",
        fr: "Considérez les corbeaux : ils ne sèment ni ne moissonnent, ils n’ont ni cellier ni grenier ; et Dieu les nourrit. Combien ne valez-vous pas plus que les oiseaux !",
        es: "Considerad los cuervos, que ni siembran, ni siegan; que ni tienen cillero, ni alfolí; y Dios los alimenta. ¿Cuánto de más estima sois vosotros que las aves?"
    },
    {
        ref: "2 Korintus 9:10",
        refEn: "2 Corinthians 9:10",
        refFr: "2 Corinthiens 9:10",
        refEs: "2 Corintios 9:10",
        id: "Ia yang menyediakan benih bagi penabur, dan roti untuk dimakan, Ia juga yang akan menyediakan benih bagi kamu dan melipatgandakannya dan menumbuhkan buah-buah kebenaranmu;",
        en: "Now may he who supplies seed to the sower and bread for food, supply and multiply your seed for sowing, and increase the fruits of your righteousness;",
        fr: "Celui qui Fournit de la semence au semeur, Et du pain pour sa nourriture, vous fournira et vous multipliera la semence, et il augmentera les fruits de votre justice.",
        es: "Y el que da simiente al que siembra, también dará pan para comer, y multiplicará vuestra sementera, y aumentará los crecimientos de los frutos de vuestra justicia;"
    },
    {
        ref: "Keluaran 33:14",
        refEn: "Exodus 33:14",
        refFr: "Exode 33:14",
        refEs: "Éxodo 33:14",
        id: "Lalu Ia berfirman: \"Aku sendiri hendak membimbing engkau dan memberikan ketenteraman kepadamu.\"",
        en: "He said, “My presence will go with you, and I will give you rest.”",
        fr: "L’Éternel répondit : Je marcherai moi-même avec toi, et je te donnerai du repos.",
        es: "Y él dijo: Mi rostro irá contigo, y te haré descansar."
    },
    {
        ref: "Ulangan 4:31",
        refEn: "Deuteronomy 4:31",
        refFr: "Deutéronome 4:31",
        refEs: "Deuteronomio 4:31",
        id: "Sebab TUHAN, Allahmu, adalah Allah Penyayang, Ia tidak akan meninggalkan atau memusnahkan engkau dan Ia tidak akan melupakan perjanjian yang diikrarkan-Nya dengan sumpah kepada nenek moyangmu.",
        en: "For Yahweh your God is a merciful God. He will not fail you, neither destroy you, nor forget the covenant of your fathers which he swore to them.",
        fr: "car l’Éternel, ton Dieu, est un Dieu de miséricorde, qui ne t’abandonnera point et ne te détruira point : il n’oubliera pas l’alliance de tes pères, qu’il leur a jurée.",
        es: "Porque Dios misericordioso es Jehová tu Dios; no te dejará, ni te destruirá, ni se olvidará del pacto de tus padres que les juró."
    },
    {
        ref: "Yosua 1:5",
        refEn: "Joshua 1:5",
        refFr: "Josué 1:5",
        refEs: "Josué 1:5",
        id: "Seorangpun tidak akan dapat bertahan menghadapi engkau seumur hidupmu; seperti Aku menyertai Musa, demikianlah Aku akan menyertai engkau; Aku tidak akan membiarkan engkau dan tidak akan meninggalkan engkau.",
        en: "No man will be able to stand before you all the days of your life. As I was with Moses, so I will be with you. I will not fail you nor forsake you.",
        fr: "Nul ne tiendra devant toi, tant que tu vivras. Je serai avec toi, comme j’ai été avec Moïse ; je ne te délaisserai point, je ne t’abandonnerai point.",
        es: "Nadie te podrá hacer frente en todos los días de tu vida: como yo fuí con Moisés, seré contigo; no te dejaré, ni te desampararé."
    },
    {
        ref: "Mazmur 73:23",
        refEn: "Psalm 73:23",
        refFr: "Psaumes 73:23",
        refEs: "Salmos 73:23",
        id: "Tetapi aku tetap di dekat-Mu; Engkau memegang tangan kananku.",
        en: "Nevertheless, I am continually with you. You have held my right hand.",
        fr: "Cependant je suis toujours avec toi, Tu m’as saisi la main droite ;",
        es: "Con todo, yo siempre estuve contigo: trabaste de mi mano derecha."
    },
    {
        ref: "Mazmur 139:7-8",
        refEn: "Psalm 139:7-8",
        refFr: "Psaumes 139:7-8",
        refEs: "Salmos 139:7-8",
        id: "Ke mana aku dapat pergi menjauhi roh-Mu, ke mana aku dapat lari dari hadapan-Mu? Jika aku mendaki ke langit, Engkau di sana; jika aku menaruh tempat tidurku di dunia orang mati, di situpun Engkau.",
        en: "Where could I go from your Spirit? Or where could I flee from your presence? If I ascend up into heaven, you are there. If I make my bed in Sheol, behold, you are there!",
        fr: "Où irais-je loin de ton esprit, Et où fuirais-je loin de ta face ? Si je monte aux cieux, tu y es ; Si je me couche au séjour des morts, t’y voilà.",
        es: "¿Adónde me iré de tu espíritu? ¿y adónde huiré de tu presencia? Si subiere á los cielos, allí estás tú: y si en abismo hiciere mi estrado, he aquí allí tú estás."
    },
    {
        ref: "Zefanya 3:17",
        refEn: "Zephaniah 3:17",
        refFr: "Sophonie 3:17",
        refEs: "Sofonías 3:17",
        id: "TUHAN Allahmu ada di antaramu sebagai pahlawan yang memberi kemenangan. Ia bergirang karena engkau dengan sukacita, Ia membaharui engkau dalam kasih-Nya, Ia bersorak- sorak karena engkau dengan sorak-sorai,",
        en: "Yahweh, your God, is in your midst, a mighty one who will save. He will rejoice over you with joy. He will calm you in his love. He will rejoice over you with singing.",
        fr: "L’Éternel, ton Dieu, est au milieu de toi, comme un héros qui sauve ; Il fera de toi sa plus grande joie ; Il gardera le silence dans son amour ; Il aura pour toi des transports d’allégresse.",
        es: "Jehová en medio de ti, poderoso, él salvará; gozaráse sobre ti con alegría, callará de amor, se regocijará sobre ti con cantar."
    },
    {
        ref: "Hagai 2:4-5",
        refEn: "Haggai 2:4-5",
        refFr: "Aggée 2:4-5",
        refEs: "Hageo 2:4-5",
        id: "Tetapi sekarang, kuatkanlah hatimu, hai Zerubabel, demikianlah firman TUHAN; kuatkanlah hatimu, hai Yosua bin Yozadak, imam besar; kuatkanlah hatimu, hai segala rakyat negeri, demikianlah firman TUHAN; bekerjalah, sebab Aku ini menyertai kamu, demikianlah firman TUHAN semesta alam, sesuai dengan janji yang telah Kuikat dengan kamu pada waktu kamu keluar dari Mesir. Dan Roh-Ku tetap tinggal di tengah-tengahmu. Janganlah takut!",
        en: "Yet now be strong, Zerubbabel,’ says Yahweh. ‘Be strong, Joshua, son of Jehozadak, the high priest. Be strong, all you people of the land,’ says Yahweh, ‘and work, for I am with you,’ says Yahweh of Armies. This is the word that I covenanted with you when you came out of Egypt, and my Spirit lived among you. ‘Don’t be afraid.’",
        fr: "Maintenant fortifie-toi, Zorobabel ! dit l’Éternel. Fortifie-toi, Josué, fils de Jotsadak, souverain sacrificateur ! Fortifie-toi, peuple entier du pays ! dit l’Éternel. Et travaillez ! Car je suis avec vous, Dit l’Éternel des armées. Je reste fidèle à l’alliance que j’ai faite avec vous Quand vous sortîtes de l’Égypte, Et mon esprit est au milieu de vous ; Ne craignez pas !",
        es: "Pues ahora, Zorobabel, esfuérzate, dice Jehová; esfuérzate también Josué, hijo de Josadac, gran sacerdote; y cobra ánimo, pueblo todo de la tierra, dice Jehová, y obrad: porque yo soy con vosotros, dice Jehová de los ejércitos. Según el pacto que concerté con vosotros á vuestra salida de Egipto, así mi espíritu estará en medio de vosotros: no temáis."
    },
    {
        ref: "Yakobus 4:8",
        refEn: "James 4:8",
        refFr: "Jacques 4:8",
        refEs: "Santiago 4:8",
        id: "Mendekatlah kepada Allah, dan Ia akan mendekat kepadamu. Tahirkanlah tanganmu, hai kamu orang-orang berdosa! dan sucikanlah hatimu, hai kamu yang mendua hati!",
        en: "Draw near to God, and he will draw near to you. Cleanse your hands, you sinners; and purify your hearts, you double-minded.",
        fr: "Approchez-vous de Dieu, et il s’approchera de vous. Nettoyez vos mains, pécheurs ; purifiez vos cœurs, hommes irrésolus.",
        es: "Allegaos á Dios, y él se allegará á vosotros. Pecadores, limpiad las manos; y vosotros de doblado ánimo, purificad los corazones."
    },
    {
        ref: "Yesaya 52:7",
        refEn: "Isaiah 52:7",
        refFr: "Ésaïe 52:7",
        refEs: "Isaías 52:7",
        id: "Betapa indahnya kelihatan dari puncak bukit-bukit kedatangan pembawa berita, yang mengabarkan berita damai dan memberitakan kabar baik, yang mengabarkan berita selamat dan berkata kepada Sion: \"Allahmu itu Raja!\"",
        en: "How beautiful on the mountains are the feet of him who brings good news, who publishes peace, who brings good news of good, who publishes salvation, who says to Zion, “Your God reigns!”",
        fr: "Qu’ils sont beaux sur les montagnes, Les pieds de celui qui apporte de bonnes nouvelles, Qui publie la paix ! De celui qui apporte de bonnes nouvelles, Qui publie le salut ! De celui qui dit à Sion : ton Dieu règne !",
        es: "¡Cuán hermosos son sobre los montes los pies del que trae alegres nuevas, del que publica la paz, del que trae nuevas del bien, del que publica salud, del que dice á Sión: Tu Dios reina!"
    },
    {
        ref: "Matius 5:14",
        refEn: "Matthew 5:14",
        refFr: "Matthieu 5:14",
        refEs: "Mateo 5:14",
        id: "Kamu adalah terang dunia. Kota yang terletak di atas gunung tidak mungkin tersembunyi.",
        en: "You are the light of the world. A city located on a hill can’t be hidden.",
        fr: "Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée ;",
        es: "Vosotros sois la luz del mundo: una ciudad asentada sobre un monte no se puede esconder."
    },
    {
        ref: "Matius 5:16",
        refEn: "Matthew 5:16",
        refFr: "Matthieu 5:16",
        refEs: "Mateo 5:16",
        id: "Demikianlah hendaknya terangmu bercahaya di depan orang, supaya mereka melihat perbuatanmu yang baik dan memuliakan Bapamu yang di sorga.\"",
        en: "Even so, let your light shine before men; that they may see your good works, and glorify your Father who is in heaven.",
        fr: "Que votre lumière luise ainsi devant les hommes, afin qu’ils voient vos bonnes œuvres, et qu’ils glorifient votre Père qui est dans les cieux.",
        es: "Así alumbre vuestra luz delante de los hombres, para que vean vuestras obras buenas, y glorifiquen á vuestro Padre que está en los cielos."
    },
    {
        ref: "Matius 9:12-13",
        refEn: "Matthew 9:12-13",
        refFr: "Matthieu 9:12-13",
        refEs: "Mateo 9:12-13",
        id: "Yesus mendengarnya dan berkata: /\"Bukan orang sehat yang memerlukan tabib, tetapi orang sakit. Jadi pergilah dan pelajarilah arti firman ini: Yang Kukehendaki ialah belas kasihan dan bukan persembahan, karena Aku datang bukan untuk memanggil orang benar, melainkan orang berdosa.\"",
        en: "When Jesus heard it, he said to them, “Those who are healthy have no need for a physician, but those who are sick do. But you go and learn what this means: ‘I desire mercy, and not sacrifice,’for I came not to call the righteous, but sinners to repentance.”",
        fr: "Ce que Jésus ayant entendu, il dit : Ce ne sont pas ceux qui se portent bien qui ont besoin de médecin, mais les malades. Allez, et apprenez ce que signifie : Je prends plaisir à la miséricorde, et non aux sacrifices. Car je ne suis pas venu appeler des justes, mais des pécheurs .",
        es: "Y oyéndolo Jesús, les dijo: Los que están sanos no tienen necesidad de médico, sino los enfermos. Andad pues, y aprended qué cosa es: Misericordia quiero, y no sacrificio: porque no he venido á llamar justos, sino pecadores á arrepentimiento."
    },
    {
        ref: "Matius 25:40",
        refEn: "Matthew 25:40",
        refFr: "Matthieu 25:40",
        refEs: "Mateo 25:40",
        id: "Dan Raja itu akan menjawab mereka: Aku berkata kepadamu, sesungguhnya segala sesuatu yang kamu lakukan untuk salah seorang dari saudara-Ku yang paling hina ini, kamu telah melakukannya untuk Aku.",
        en: "“The King will answer them, ‘Most certainly I tell you, because you did it to one of the least of these my brothers, you did it to me.’",
        fr: "Et le roi leur répondra : Je vous le dis en vérité, toutes les fois que vous avez fait ces choses à l’un de ces plus petits de mes frères, c’est à moi que vous les avez faites.",
        es: "Y respondiendo el Rey, les dirá: De cierto os digo que en cuanto lo hicisteis á uno de estos mis hermanos pequeñitos, á mí lo hicisteis."
    },
    {
        ref: "Lukas 4:18-19",
        refEn: "Luke 4:18-19",
        refFr: "Luc 4:18-19",
        refEs: "Lucas 4:18-19",
        id: "\"Roh Tuhan ada pada-Ku, oleh sebab Ia telah mengurapi Aku, untuk menyampaikan kabar baik kepada orang-orang miskin; dan Ia telah mengutus Aku untuk memberitakan pembebasan kepada orang-orang tawanan, dan penglihatan bagi orang-orang buta, untuk membebaskan orang-orang yang tertindas, untuk memberitakan tahun rahmat Tuhan telah datang.\"*",
        en: "“The Spirit of the Lord is on me, because he has anointed me to preach good news to the poor. He has sent me to heal the broken hearted, to proclaim release to the captives, recovering of sight to the blind, to deliver those who are crushed, and to proclaim the acceptable year of the Lord.”",
        fr: "L’Esprit du Seigneur est sur moi, Parce qu’il m’a oint pour annoncer une bonne nouvelle aux pauvres ; Il m’a envoyé pour guérir ceux qui ont le cœur brisé, Pour proclamer aux captifs la délivrance, Et aux aveugles le recouvrement de la vue, Pour renvoyer libres les opprimés, Pour publier une année de grâce du Seigneur.",
        es: "El Espíritu del Señor es sobre mí, por cuanto me ha ungido para dar buenas nuevas á los pobres: me ha enviado para sanar á los quebrantados de corazón; para pregonar á los cautivos libertad, y á los ciegos vista; para poner en libertad á los quebrantados: Para predicar el año agradable del Señor."
    },
    {
        ref: "Yohanes 15:16",
        refEn: "John 15:16",
        refFr: "Jean 15:16",
        refEs: "Juan 15:16",
        id: "Bukan kamu yang memilih Aku, tetapi Akulah yang memilih kamu. Dan Aku telah menetapkan kamu, supaya kamu pergi dan menghasilkan buah dan buahmu itu tetap, supaya apa yang kamu minta kepada Bapa dalam nama-Ku, diberikan-Nya kepadamu.",
        en: "You didn’t choose me, but I chose you, and appointed you, that you should go and bear fruit, and that your fruit should remain; that whatever you will ask of the Father in my name, he may give it to you.",
        fr: "Ce n’est pas vous qui m’avez choisi ; mais moi, je vous ai choisis, et je vous ai établis, afin que vous alliez, et que vous portiez du fruit, et que votre fruit demeure, afin que ce que vous demanderez au Père en mon nom, il vous le donne.",
        es: "No me elegisteis vosotros á mí, mas yo os elegí á vosotros; y os he puesto para que vayáis y llevéis fruto, y vuestro fruto permanezca: para que todo lo que pidiereis del Padre en mi nombre, él os lo dé."
    },
    {
        ref: "Kisah Para Rasul 26:16",
        refEn: "Acts 26:16",
        refFr: "Actes des Apôtres 26:16",
        refEs: "Hechos 26:16",
        id: "Tetapi sekarang, bangunlah dan berdirilah. Aku menampakkan diri kepadamu untuk menetapkan engkau menjadi pelayan dan saksi tentang segala sesuatu yang telah kaulihat dari pada-Ku dan tentang apa yang akan Kuperlihatkan kepadamu nanti.",
        en: "But arise, and stand on your feet, for I have appeared to you for this purpose: to appoint you a servant and a witness both of the things which you have seen, and of the things which I will reveal to you;",
        fr: "Mais lève-toi, et tiens-toi sur tes pieds ; car je te suis apparu pour t’établir ministre et témoin des choses que tu as vues et de celles pour lesquelles je t’apparaîtrai.",
        es: "Mas levántate, y ponte sobre tus pies; porque para esto te he aparecido, para ponerte por ministro y testigo de las cosas que has visto, y de aquellas en que apareceré á ti:"
    },
    {
        ref: "1 Korintus 3:6-7",
        refEn: "1 Corinthians 3:6-7",
        refFr: "1 Corinthiens 3:6-7",
        refEs: "1 Corintios 3:6-7",
        id: "Aku menanam, Apolos menyiram, tetapi Allah yang memberi pertumbuhan. Karena itu yang penting bukanlah yang menanam atau yang menyiram, melainkan Allah yang memberi pertumbuhan.",
        en: "I planted. Apollos watered. But God gave the increase. So then neither he who plants is anything, nor he who waters, but God who gives the increase.",
        fr: "J’ai planté, Apollos a arrosé, mais Dieu a fait croître, en sorte que ce n’est pas celui qui plante qui est quelque chose, ni celui qui arrose, mais Dieu qui fait croître.",
        es: "Yo planté, Apolos regó: mas Dios ha dado el crecimiento. Así que, ni el que planta es algo, ni el que riega; sino Dios, que da el crecimiento."
    },
    {
        ref: "1 Korintus 9:16",
        refEn: "1 Corinthians 9:16",
        refFr: "1 Corinthiens 9:16",
        refEs: "1 Corintios 9:16",
        id: "Karena jika aku memberitakan Injil, aku tidak mempunyai alasan untuk memegahkan diri. Sebab itu adalah keharusan bagiku. Celakalah aku, jika aku tidak memberitakan Injil.",
        en: "For if I preach the Good News, I have nothing to boast about; for necessity is laid on me; but woe is to me, if I don’t preach the Good News.",
        fr: "Si j’annonce l’Évangile, ce n’est pas pour moi un sujet de gloire, car la nécessité m’en est imposée, et malheur à moi si je n’annonce pas l’Évangile !",
        es: "Pues bien que anuncio el evangelio, no tengo por qué gloriarme; porque me es impuesta necesidad; y ¡ay de mí si no anunciare el evangelio!"
    },
    {
        ref: "1 Petrus 2:9",
        refEn: "1 Peter 2:9",
        refFr: "1 Pierre 2:9",
        refEs: "1 Pedro 2:9",
        id: "Tetapi kamulah bangsa yang terpilih, imamat yang rajani, bangsa yang kudus, umat kepunyaan Allah sendiri, supaya kamu memberitakan perbuatan- perbuatan yang besar dari Dia, yang telah memanggil kamu keluar dari kegelapan kepada terang-Nya yang ajaib:",
        en: "But you are a chosen race, a royal priesthood, a holy nation, a people for God’s own possession, that you may proclaim the excellence of him who called you out of darkness into his marvelous light:",
        fr: "Vous, au contraire, vous êtes une race élue, un sacerdoce royal, une nation sainte, un peuple acquis, afin que vous annonciez les vertus de celui qui vous a appelés des ténèbres à son admirable lumière,",
        es: "Mas vosotros sois linaje escogido, real sacerdocio, gente santa, pueblo adquirido, para que anunciéis las virtudes de aquel que os ha llamado de las tinieblas á su luz admirable:"
    },
    {
        ref: "Lukas 11:13",
        refEn: "Luke 11:13",
        refFr: "Luc 11:13",
        refEs: "Lucas 11:13",
        id: "Jadi jika kamu yang jahat tahu memberi pemberian yang baik kepada anak-anakmu, apalagi Bapamu yang di sorga! Ia akan memberikan Roh Kudus kepada mereka yang meminta kepada-Nya.\"",
        en: "If you then, being evil, know how to give good gifts to your children, how much more will your heavenly Father give the Holy Spirit to those who ask him?”",
        fr: "Si donc, méchants comme vous l’êtes, vous savez donner de bonnes choses à vos enfants, à combien plus forte raison le Père céleste donnera-t-il le Saint-Esprit à ceux qui le lui demandent.",
        es: "Pues si vosotros, siendo malos, sabéis dar buenas dádivas á vuestros hijos, ¿cuánto más vuestro Padre celestial dará el Espíritu Santo á los que lo pidieren de él?"
    },
    {
        ref: "Yohanes 7:38-39",
        refEn: "John 7:38-39",
        refFr: "Jean 7:38-39",
        refEs: "Juan 7:38-39",
        id: "Barangsiapa percaya kepada-Ku, seperti yang dikatakan oleh Kitab Suci: Dari dalam hatinya akan mengalir aliran-aliran air hidup.\" Yang dimaksudkan-Nya ialah Roh yang akan diterima oleh mereka yang percaya kepada-Nya; sebab Roh itu belum datang, karena Yesus belum dimuliakan.",
        en: "He who believes in me, as the Scripture has said, from within him will flow rivers of living water.” But he said this about the Spirit, which those believing in him were to receive. For the Holy Spirit was not yet given, because Jesus wasn’t yet glorified.",
        fr: "Celui qui croit en moi, des fleuves d’eau vive couleront de son sein, comme dit l’Écriture. Il dit cela de l’Esprit que devaient recevoir ceux qui croiraient en lui ; car l’Esprit n’était pas encore, parce que Jésus n’avait pas encore été glorifié.",
        es: "El que cree en mí, como dice la Escritura, ríos de agua viva correrán de su vientre. (Y esto dijo del Espíritu que habían de recibir los que creyesen en él: pues aun no había venido el Espíritu Santo; porque Jesús no estaba aún glorificado.)"
    },
    {
        ref: "Yohanes 14:16-17",
        refEn: "John 14:16-17",
        refFr: "Jean 14:16-17",
        refEs: "Juan 14:16-17",
        id: "Aku akan minta kepada Bapa, dan Ia akan memberikan kepadamu seorang Penolong yang lain, supaya Ia menyertai kamu selama-lamanya, yaitu Roh Kebenaran. Dunia tidak dapat menerima Dia, sebab dunia tidak melihat Dia dan tidak mengenal Dia. Tetapi kamu mengenal Dia, sebab Ia menyertai kamu dan akan diam di dalam kamu.",
        en: "I will pray to the Father, and he will give you another Counselor, that he may be with you forever,— the Spirit of truth, whom the world can’t receive; for it doesn’t see him, neither knows him. You know him, for he lives with you, and will be in you.",
        fr: "Et moi, je prierai le Père, et il vous donnera un autre consolateur, afin qu’il demeure éternellement avec vous, l’Esprit de vérité, que le monde ne peut recevoir, parce qu’il ne le voit point et ne le connaît point ; mais vous, vous le connaissez, car il demeure avec vous, et il sera en vous.",
        es: "Y yo rogaré al Padre, y os dará otro Consolador, para que esté con vosotros para siempre: Al Espíritu de verdad, al cual el mundo no puede recibir, porque no le ve, ni le conoce: mas vosotros le conocéis; porque está con vosotros, y será en vosotros."
    },
    {
        ref: "Yohanes 16:7",
        refEn: "John 16:7",
        refFr: "Jean 16:7",
        refEs: "Juan 16:7",
        id: "Namun benar yang Kukatakan ini kepadamu: Adalah lebih berguna bagi kamu, jika Aku pergi. Sebab jikalau Aku tidak pergi, Penghibur itu tidak akan datang kepadamu, tetapi jikalau Aku pergi, Aku akan mengutus Dia kepadamu.",
        en: "Nevertheless I tell you the truth: It is to your advantage that I go away, for if I don’t go away, the Counselor won’t come to you. But if I go, I will send him to you.",
        fr: "Cependant je vous dis la vérité : il vous est avantageux que je m’en aille, car si je ne m’en vais pas, le consolateur ne viendra pas vers vous ; mais, si je m’en vais, je vous l’enverrai.",
        es: "Empero yo os digo la verdad: Os es necesario que yo vaya: porque si yo no fuese, el Consolador no vendría á vosotros; mas si yo fuere, os le enviaré."
    },
    {
        ref: "Roma 8:9",
        refEn: "Romans 8:9",
        refFr: "Romains 8:9",
        refEs: "Romanos 8:9",
        id: "Tetapi kamu tidak hidup dalam daging, melainkan dalam Roh, jika memang Roh Allah diam di dalam kamu. Tetapi jika orang tidak memiliki Roh Kristus, ia bukan milik Kristus.",
        en: "But you are not in the flesh but in the Spirit, if it is so that the Spirit of God dwells in you. But if any man doesn’t have the Spirit of Christ, he is not his.",
        fr: "Pour vous, vous ne vivez pas selon la chair, mais selon l’esprit, si du moins l’Esprit de Dieu habite en vous. Si quelqu’un n’a pas l’Esprit de Christ, il ne lui appartient pas.",
        es: "Mas vosotros no estáis en la carne, sino en el espíritu, si es que el Espíritu de Dios mora en vosotros. Y si alguno no tiene el Espíritu de Cristo, el tal no es de él."
    },
    {
        ref: "Roma 8:11",
        refEn: "Romans 8:11",
        refFr: "Romains 8:11",
        refEs: "Romanos 8:11",
        id: "Dan jika Roh Dia, yang telah membangkitkan Yesus dari antara orang mati, diam di dalam kamu, maka Ia, yang telah membangkitkan Kristus Yesus dari antara orang mati, akan menghidupkan juga tubuhmu yang fana itu oleh Roh-Nya, yang diam di dalam kamu.",
        en: "But if the Spirit of him who raised up Jesus from the dead dwells in you, he who raised up Christ Jesus from the dead will also give life to your mortal bodies through his Spirit who dwells in you.",
        fr: "Et si l’Esprit de celui qui a ressuscité Jésus d’entre les morts habite en vous, celui qui a ressuscité Christ d’entre les morts rendra aussi la vie à vos corps mortels par son Esprit qui habite en vous.",
        es: "Y si el Espíritu de aquel que levantó de los muertos á Jesús mora en vosotros, el que levantó á Cristo Jesús de los muertos, vivificará también vuestros cuerpos mortales por su Espíritu que mora en vosotros."
    },
    {
        ref: "Roma 8:26-27",
        refEn: "Romans 8:26-27",
        refFr: "Romains 8:26-27",
        refEs: "Romanos 8:26-27",
        id: "Demikian juga Roh membantu kita dalam kelemahan kita; sebab kita tidak tahu, bagaimana sebenarnya harus berdoa; tetapi Roh sendiri berdoa untuk kita kepada Allah dengan keluhan-keluhan yang tidak terucapkan. Dan Allah yang menyelidiki hati nurani, mengetahui maksud Roh itu, yaitu bahwa Ia, sesuai dengan kehendak Allah, berdoa untuk orang-orang kudus.",
        en: "In the same way, the Spirit also helps our weaknesses, for we don’t know how to pray as we ought. But the Spirit himself makes intercession for us with groanings which can’t be uttered. He who searches the hearts knows what is on the Spirit’s mind, because he makes intercession for the saints according to God.",
        fr: "De même aussi l’Esprit nous aide dans notre faiblesse, car nous ne savons pas ce qu’il nous convient de demander dans nos prières. Mais l’Esprit lui-même intercède par des soupirs inexprimables ; et celui qui sonde les cœurs connaît quelle est la pensée de l’Esprit, parce que c’est selon Dieu qu’il intercède en faveur des saints.",
        es: "Y asimismo también el Espíritu ayuda nuestra flaqueza: porque qué hemos de pedir como conviene, no lo sabemos; sino que el mismo Espíritu pide por nosotros con gemidos indecibles. Mas el que escudriña los corazones, sabe cuál es el intento del Espíritu, porque conforme á la voluntad de Dios, demanda por los santos."
    },
    {
        ref: "1 Korintus 2:10",
        refEn: "1 Corinthians 2:10",
        refFr: "1 Corinthiens 2:10",
        refEs: "1 Corintios 2:10",
        id: "Karena kepada kita Allah telah menyatakannya oleh Roh, sebab Roh menyelidiki segala sesuatu, bahkan hal-hal yang tersembunyi dalam diri Allah.",
        en: "But to us, God revealed them through the Spirit. For the Spirit searches all things, yes, the deep things of God.",
        fr: "Dieu nous les a révélées par l’Esprit . Car l’Esprit sonde tout, même les profondeurs de Dieu.",
        es: "Empero Dios nos lo reveló á nosotros por el Espíritu: porque el Espíritu todo lo escudriña, aun lo profundo de Dios."
    },
    {
        ref: "1 Korintus 6:19",
        refEn: "1 Corinthians 6:19",
        refFr: "1 Corinthiens 6:19",
        refEs: "1 Corintios 6:19",
        id: "Atau tidak tahukah kamu, bahwa tubuhmu adalah bait Roh Kudus yang diam di dalam kamu, Roh Kudus yang kamu peroleh dari Allah, --dan bahwa kamu bukan milik kamu sendiri?",
        en: "Or don’t you know that your body is a temple of the Holy Spirit which is in you, which you have from God? You are not your own,",
        fr: "Ne savez-vous pas que votre corps est le temple du Saint-Esprit qui est en vous, que vous avez reçu de Dieu, et que vous ne vous appartenez point à vous-mêmes ?",
        es: "¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros, el cual tenéis de Dios, y que no sois vuestros?"
    },
    {
        ref: "2 Korintus 3:17",
        refEn: "2 Corinthians 3:17",
        refFr: "2 Corinthiens 3:17",
        refEs: "2 Corintios 3:17",
        id: "Sebab Tuhan adalah Roh; dan di mana ada Roh Allah, di situ ada kemerdekaan.",
        en: "Now the Lord is the Spirit and where the Spirit of the Lord is, there is liberty.",
        fr: "Or, le Seigneur c’est l’Esprit ; et là où est l’Esprit du Seigneur, là est la liberté.",
        es: "Porque el Señor es el Espíritu; y donde hay el Espíritu del Señor, allí hay libertad."
    },
    {
        ref: "Galatia 5:16",
        refEn: "Galatians 5:16",
        refFr: "Galates 5:16",
        refEs: "Gálatas 5:16",
        id: "Maksudku ialah: hiduplah oleh Roh, maka kamu tidak akan menuruti keinginan daging.",
        en: "But I say, walk by the Spirit, and you won’t fulfill the lust of the flesh.",
        fr: "Je dis donc : Marchez selon l’Esprit, et vous n’accomplirez pas les désirs de la chair.",
        es: "Digo pues: Andad en el Espíritu, y no satisfagáis la concupiscencia de la carne."
    },
    {
        ref: "Galatia 5:25",
        refEn: "Galatians 5:25",
        refFr: "Galates 5:25",
        refEs: "Gálatas 5:25",
        id: "Jikalau kita hidup oleh Roh, baiklah hidup kita juga dipimpin oleh Roh,",
        en: "If we live by the Spirit, let’s also walk by the Spirit.",
        fr: "Si nous vivons par l’Esprit, marchons aussi selon l’Esprit.",
        es: "Si vivimos en el Espíritu, andemos también en el Espíritu."
    },
    {
        ref: "Efesus 1:13-14",
        refEn: "Ephesians 1:13-14",
        refFr: "Éphésiens 1:13-14",
        refEs: "Efesios 1:13-14",
        id: "Di dalam Dia kamu juga--karena kamu telah mendengar firman kebenaran, yaitu Injil keselamatanmu- -di dalam Dia kamu juga, ketika kamu percaya, dimeteraikan dengan Roh Kudus, yang dijanjikan-Nya itu. Dan Roh Kudus itu adalah jaminan bagian kita sampai kita memperoleh seluruhnya, yaitu penebusan yang menjadikan kita milik Allah, untuk memuji kemuliaan-Nya.",
        en: "in whom you also, having heard the word of the truth, the Good News of your salvation—in whom, having also believed, you were sealed with the Holy Spirit of promise, who is a pledge of our inheritance, to the redemption of God’s own possession, to the praise of his glory.",
        fr: "En lui vous aussi, après avoir entendu la parole de la vérité, l’Évangile de votre salut, en lui vous avez cru et vous avez été scellés du Saint-Esprit qui avait été promis, lequel est un gage de notre héritage, pour la rédemption de ceux que Dieu s’est acquis, à la louange de sa gloire.",
        es: "En el cual esperasteis también vosotros en oyendo la palabra de verdad, el evangelio de vuestra salud: en el cual también desde que creísteis, fuisteis sellados con el Espíritu Santo de la promesa, Que es las arras de nuestra herencia, para la redención de la posesión adquirida para alabanza de su gloria."
    },
    {
        ref: "Efesus 5:18",
        refEn: "Ephesians 5:18",
        refFr: "Éphésiens 5:18",
        refEs: "Efesios 5:18",
        id: "Dan janganlah kamu mabuk oleh anggur, karena anggur menimbulkan hawa nafsu, tetapi hendaklah kamu penuh dengan Roh,",
        en: "Don’t be drunken with wine, in which is dissipation, but be filled with the Spirit,",
        fr: "Ne vous enivrez pas de vin : c’est de la débauche. Soyez, au contraire, remplis de l’Esprit ;",
        es: "Y no os embriaguéis de vino, en lo cual hay disolución; mas sed llenos de Espíritu;"
    },
    {
        ref: "Mazmur 32:1",
        refEn: "Psalm 32:1",
        refFr: "Psaumes 32:1",
        refEs: "Salmos 32:1",
        id: "Dari Daud. Nyanyian pengajaran. Berbahagialah orang yang diampuni pelanggarannya, yang dosanya ditutupi!",
        en: "Blessed is he whose disobedience is forgiven, whose sin is covered.",
        fr: "De David. Cantique. Heureux celui à qui la transgression est remise, À qui le péché est pardonné !",
        es: "BIENAVENTURADO aquel cuyas iniquidades son perdonadas, y borrados sus pecados."
    },
    {
        ref: "Mazmur 51:3-4",
        refEn: "Psalm 51:1-2",
        refFr: "Psaumes 51:3-4",
        refEs: "Salmos 51:1-2",
        id: "Kasihanilah aku, ya Allah, menurut kasih setia-Mu, hapuskanlah pelanggaranku menurut rahmat-Mu yang besar! Bersihkanlah aku seluruhnya dari kesalahanku, dan tahirkanlah aku dari dosaku!",
        en: "Have mercy on me, God, according to your loving kindness. According to the multitude of your tender mercies, blot out my transgressions. Wash me thoroughly from my iniquity. Cleanse me from my sin.",
        fr: "Ô Dieu ! aie pitié de moi dans ta bonté ; Selon ta grande miséricorde, efface mes transgressions ; Lave-moi complètement de mon iniquité, Et purifie-moi de mon péché.",
        es: "TEN piedad de mí, oh Dios, conforme á tu misericordia: conforme á la multitud de tus piedades borra mis rebeliones. Lávame más y más de mi maldad, y límpiame de mi pecado."
    },
    {
        ref: "Mazmur 86:5",
        refEn: "Psalm 86:5",
        refFr: "Psaumes 86:5",
        refEs: "Salmos 86:5",
        id: "Sebab Engkau, ya Tuhan, baik dan suka mengampuni dan berlimpah kasih setia bagi semua orang yang berseru kepada-Mu.",
        en: "For you, Lord, are good, and ready to forgive; abundant in loving kindness to all those who call on you.",
        fr: "Car tu es bon, Seigneur, tu pardonnes, Tu es plein d’amour pour tous ceux qui t’invoquent.",
        es: "Porque tú, Señor, eres bueno y perdonador, y grande en misericordia para con todos los que te invocan."
    },
    {
        ref: "Mikha 7:18-19",
        refEn: "Micah 7:18-19",
        refFr: "Michée 7:18-19",
        refEs: "Miqueas 7:18-19",
        id: "Siapakah Allah seperti Engkau yang mengampuni dosa, dan yang memaafkan pelanggaran dari sisa-sisa milik-Nya sendiri; yang tidak bertahan dalam murka-Nya untuk seterusnya, melainkan berkenan kepada kasih setia? Biarlah Ia kembali menyayangi kita, menghapuskan kesalahan-kesalahan kita dan melemparkan segala dosa kita ke dalam tubir-tubir laut.",
        en: "Who is a God like you, who pardons iniquity, and passes over the disobedience of the remnant of his heritage? He doesn’t retain his anger forever, because he delights in loving kindness. He will again have compassion on us. He will tread our iniquities under foot; and you will cast all their sins into the depths of the sea.",
        fr: "Quel Dieu est semblable à toi, Qui pardonnes l’iniquité, qui oublies les péchés Du reste de ton héritage ? Il ne garde pas sa colère à toujours, Car il prend plaisir à la miséricorde. Il aura encore compassion de nous, Il mettra sous ses pieds nos iniquités ; Tu jetteras au fond de la mer tous leurs péchés.",
        es: "¿Qué Dios como tú, que perdonas la maldad, y olvidas el pecado del resto de su heredad? No retuvo para siempre su enojo, porque es amador de misericordia. El tornará, él tendrá misericordia de nosotros; él sujetará nuestras iniquidades, y echará en los profundos de la mar todos nuestros pecados."
    },
    {
        ref: "Matius 6:12",
        refEn: "Matthew 6:12",
        refFr: "Matthieu 6:12",
        refEs: "Mateo 6:12",
        id: "dan ampunilah kami akan kesalahan kami, seperti kami juga mengampuni orang yang bersalah kepada kami;",
        en: "Forgive us our debts, as we also forgive our debtors.",
        fr: "pardonne-nous nos offenses, comme nous aussi nous pardonnons à ceux qui nous ont offensés ;",
        es: "Y perdónanos nuestras deudas, como también nosotros perdonamos á nuestros deudores."
    },
    {
        ref: "Matius 18:21-22",
        refEn: "Matthew 18:21-22",
        refFr: "Matthieu 18:21-22",
        refEs: "Mateo 18:21-22",
        id: "Kemudian datanglah Petrus dan berkata kepada Yesus: \"Tuhan, sampai berapa kali aku harus mengampuni saudaraku jika ia berbuat dosa terhadap aku? Sampai tujuh kali?\" Yesus berkata kepadanya: /\"Bukan! Aku berkata kepadamu: Bukan sampai tujuh kali, melainkan sampai tujuh puluh kali tujuh kali.",
        en: "Then Peter came and said to him, “Lord, how often shall my brother sin against me, and I forgive him? Until seven times?” Jesus said to him, “I don’t tell you until seven times, but, until seventy times seven.",
        fr: "Alors Pierre s’approcha de lui, et dit : Seigneur, combien de fois pardonnerai-je à mon frère, lorsqu’il péchera contre moi ? Sera-ce jusqu’à sept fois ? Jésus lui dit : Je ne te dis pas jusqu’à sept fois, mais jusqu’à septante fois sept fois.",
        es: "Entonces Pedro, llegándose á él, dijo: Señor, ¿cuántas veces perdonaré á mi hermano que pecare contra mí? ¿hasta siete? Jesús le dice: No te digo hasta siete, mas aun hasta setenta veces siete."
    },
    {
        ref: "Lukas 6:37",
        refEn: "Luke 6:37",
        refFr: "Luc 6:37",
        refEs: "Lucas 6:37",
        id: "\"Janganlah kamu menghakimi, maka kamupun tidak akan dihakimi. Dan janganlah kamu menghukum, maka kamupun tidak akan dihukum; ampunilah dan kamu akan diampuni.",
        en: "Don’t judge, and you won’t be judged. Don’t condemn, and you won’t be condemned. Set free, and you will be set free.",
        fr: "Ne jugez point, et vous ne serez point jugés ; ne condamnez point, et vous ne serez point condamnés ; absolvez, et vous serez absous.",
        es: "No juzguéis, y no seréis juzgados: no condenéis, y no seréis condenados: perdonad, y seréis perdonados."
    },
    {
        ref: "Lukas 23:34",
        refEn: "Luke 23:34",
        refFr: "Luc 23:34",
        refEs: "Lucas 23:34",
        id: "Yesus berkata: /\"Ya Bapa, ampunilah mereka, sebab mereka tidak tahu apa yang mereka perbuat.\"* Dan mereka membuang undi untuk membagi pakaian-Nya.",
        en: "Jesus said, “Father, forgive them, for they don’t know what they are doing.” Dividing his garments among them, they cast lots.",
        fr: "Jésus dit : Père, pardonne-leur, car ils ne savent ce qu’ils font. Ils se partagèrent ses vêtements, en tirant au sort.",
        es: "Y Jesús decía: Padre, perdónalos, porque no saben lo que hacen. Y partiendo sus vestidos, echaron suertes."
    },
    {
        ref: "Kolose 2:13-14",
        refEn: "Colossians 2:13-14",
        refFr: "Colossiens 2:13-14",
        refEs: "Colosenses 2:13-14",
        id: "Kamu juga, meskipun dahulu mati oleh pelanggaranmu dan oleh karena tidak disunat secara lahiriah, telah dihidupkan Allah bersama-sama dengan Dia, sesudah Ia mengampuni segala pelanggaran kita, dengan menghapuskan surat hutang, yang oleh ketentuan-ketentuan hukum mendakwa dan mengancam kita. Dan itu ditiadakan-Nya dengan memakukannya pada kayu salib:",
        en: "You were dead through your trespasses and the uncircumcision of your flesh. He made you alive together with him, having forgiven us all our trespasses, wiping out the handwriting in ordinances which was against us; and he has taken it out of the way, nailing it to the cross;",
        fr: "Vous qui étiez morts par vos offenses et par l’incirconcision de votre chair, il vous a rendus à la vie avec lui, en nous faisant grâce pour toutes nos offenses ; il a effacé l’acte dont les ordonnances nous condamnaient et qui subsistait contre nous, et il l’a détruit en le clouant à la croix ;",
        es: "Y á vosotros, estando muertos en pecados y en la incircuncisión de vuestra carne, os vivificó juntamente con él, perdonándoos todos los pecados, Rayendo la cédula de los ritos que nos era contraria, que era contra nosotros, quitándola de en medio y enclavándola en la cruz;"
    },
    {
        ref: "Kolose 3:13",
        refEn: "Colossians 3:13",
        refFr: "Colossiens 3:13",
        refEs: "Colosenses 3:13",
        id: "Sabarlah kamu seorang terhadap yang lain, dan ampunilah seorang akan yang lain apabila yang seorang menaruh dendam terhadap yang lain, sama seperti Tuhan telah mengampuni kamu, kamu perbuat jugalah demikian.",
        en: "bearing with one another, and forgiving each other, if any man has a complaint against any; even as Christ forgave you, so you also do.",
        fr: "Supportez-vous les uns les autres, et, si l’un a sujet de se plaindre de l’autre, pardonnez-vous réciproquement. De même que Christ vous a pardonné, pardonnez-vous aussi.",
        es: "Sufriéndoos los unos á los otros, y perdonándoos los unos á los otros si alguno tuviere queja del otro: de la manera que Cristo os perdonó, así también hacedlo vosotros."
    },
    {
        ref: "Kisah Para Rasul 2:42",
        refEn: "Acts 2:42",
        refFr: "Actes des Apôtres 2:42",
        refEs: "Hechos 2:42",
        id: "Mereka bertekun dalam pengajaran rasul-rasul dan dalam persekutuan. Dan mereka selalu berkumpul untuk memecahkan roti dan berdoa.",
        en: "They continued steadfastly in the apostles’ teaching and fellowship, in the breaking of bread, and prayer.",
        fr: "Ils persévéraient dans l’enseignement des apôtres, dans la communion fraternelle, dans la fraction du pain, et dans les prières.",
        es: "Y perseveraban en la doctrina de los apóstoles, y en la comunión, y en el partimiento del pan, y en las oraciones."
    },
    {
        ref: "Kisah Para Rasul 2:46-47",
        refEn: "Acts 2:46-47",
        refFr: "Actes des Apôtres 2:46-47",
        refEs: "Hechos 2:46-47",
        id: "Dengan bertekun dan dengan sehati mereka berkumpul tiap-tiap hari dalam Bait Allah. Mereka memecahkan roti di rumah masing-masing secara bergilir dan makan bersama-sama dengan gembira dan dengan tulus hati, sambil memuji Allah. Dan mereka disukai semua orang. Dan tiap-tiap hari Tuhan menambah jumlah mereka dengan orang yang diselamatkan.",
        en: "Day by day, continuing steadfastly with one accord in the temple, and breaking bread at home, they took their food with gladness and singleness of heart, praising God, and having favor with all the people. The Lord added to the assembly day by day those who were being saved.",
        fr: "Ils étaient chaque jour tous ensemble assidus au temple, ils rompaient le pain dans les maisons, et prenaient leur nourriture avec joie et simplicité de cœur, louant Dieu, et trouvant grâce auprès de tout le peuple. Et le Seigneur ajoutait chaque jour à l’Église ceux qui étaient sauvés.",
        es: "Y perseverando unánimes cada día en el templo, y partiendo el pan en las casas, comían juntos con alegría y con sencillez de corazón, Alabando á Dios, y teniendo gracia con todo el pueblo. Y el Señor añadía cada día á la iglesia los que habían de ser salvos."
    },
    {
        ref: "Roma 12:4-5",
        refEn: "Romans 12:4-5",
        refFr: "Romains 12:4-5",
        refEs: "Romanos 12:4-5",
        id: "Sebab sama seperti pada satu tubuh kita mempunyai banyak anggota, tetapi tidak semua anggota itu mempunyai tugas yang sama, demikian juga kita, walaupun banyak, adalah satu tubuh di dalam Kristus; tetapi kita masing-masing adalah anggota yang seorang terhadap yang lain.",
        en: "For even as we have many members in one body, and all the members don’t have the same function, so we, who are many, are one body in Christ, and individually members one of another.",
        fr: "Car, comme nous avons plusieurs membres dans un seul corps, et que tous les membres n’ont pas la même fonction, ainsi, nous qui sommes plusieurs, nous formons un seul corps en Christ, et nous sommes tous membres les uns des autres.",
        es: "Porque de la manera que en un cuerpo tenemos muchos miembros, empero todos los miembros no tienen la misma operación; Así muchos somos un cuerpo en Cristo, mas todos miembros los unos de los otros."
    },
    {
        ref: "1 Korintus 12:12-13",
        refEn: "1 Corinthians 12:12-13",
        refFr: "1 Corinthiens 12:12-13",
        refEs: "1 Corintios 12:12-13",
        id: "Karena sama seperti tubuh itu satu dan anggota-anggotanya banyak, dan segala anggota itu, sekalipun banyak, merupakan satu tubuh, demikian pula Kristus. Sebab dalam satu Roh kita semua, baik orang Yahudi, maupun orang Yunani, baik budak, maupun orang merdeka, telah dibaptis menjadi satu tubuh dan kita semua diberi minum dari satu Roh.",
        en: "For as the body is one, and has many members, and all the members of the body, being many, are one body; so also is Christ. For in one Spirit we were all baptized into one body, whether Jews or Greeks, whether bond or free; and were all given to drink into one Spirit.",
        fr: "Car, comme le corps est un et a plusieurs membres, et comme tous les membres du corps, malgré leur nombre, ne forment qu’un seul corps, ainsi en est-il de Christ. Nous avons tous, en effet, été baptisés dans un seul Esprit, pour former un seul corps, soit Juifs, soit Grecs, soit esclaves, soit libres, et nous avons tous été abreuvés d’un seul Esprit.",
        es: "Porque de la manera que el cuerpo es uno, y tiene muchos miembros, empero todos los miembros del cuerpo, siendo muchos, son un cuerpo, así también Cristo. Porque por un Espíritu somos todos bautizados en un cuerpo, ora Judíos ó Griegos, ora siervos ó libres; y todos hemos bebido de un mismo Espíritu."
    },
    {
        ref: "1 Korintus 12:26",
        refEn: "1 Corinthians 12:26",
        refFr: "1 Corinthiens 12:26",
        refEs: "1 Corintios 12:26",
        id: "Karena itu jika satu anggota menderita, semua anggota turut menderita; jika satu anggota dihormati, semua anggota turut bersukacita.",
        en: "When one member suffers, all the members suffer with it. Or when one member is honored, all the members rejoice with it.",
        fr: "Et si un membre souffre, tous les membres souffrent avec lui ; si un membre est honoré, tous les membres se réjouissent avec lui.",
        es: "Por manera que si un miembro padece, todos los miembros á una se duelen; y si un miembro es honrado, todos los miembros á una se gozan."
    },
    {
        ref: "Efesus 4:2-3",
        refEn: "Ephesians 4:2-3",
        refFr: "Éphésiens 4:2-3",
        refEs: "Efesios 4:2-3",
        id: "Hendaklah kamu selalu rendah hati, lemah lembut, dan sabar. Tunjukkanlah kasihmu dalam hal saling membantu. Dan berusahalah memelihara kesatuan Roh oleh ikatan damai sejahtera:",
        en: "with all lowliness and humility, with patience, bearing with one another in love; being eager to keep the unity of the Spirit in the bond of peace.",
        fr: "en toute humilité et douceur, avec patience, vous supportant les uns les autres avec charité, vous efforçant de conserver l’unité de l’esprit par le lien de la paix.",
        es: "Con toda humildad y mansedumbre, con paciencia soportando los unos á los otros en amor; Solícitos á guardar la unidad del Espíritu en el vínculo de la paz."
    },
    {
        ref: "Efesus 4:16",
        refEn: "Ephesians 4:16",
        refFr: "Éphésiens 4:16",
        refEs: "Efesios 4:16",
        id: "Dari pada-Nyalah seluruh tubuh, --yang rapih tersusun dan diikat menjadi satu oleh pelayanan semua bagiannya, sesuai dengan kadar pekerjaan tiap-tiap anggota--menerima pertumbuhannya dan membangun dirinya dalam kasih.",
        en: "from whom all the body, being fitted and knit together through that which every joint supplies, according to the working in measure of each individual part, makes the body increase to the building up of itself in love.",
        fr: "C’est de lui, et grâce à tous les liens de son assistance, que tout le corps, bien coordonné et formant un solide assemblage, tire son accroissement selon la force qui convient à chacune de ses parties, et s’édifie lui-même dans la charité.",
        es: "Del cual, todo el cuerpo compuesto y bien ligado entre sí por todas las junturas de su alimento, que recibe según la operación, cada miembro conforme á su medida toma aumento de cuerpo edificándose en amor."
    },
    {
        ref: "1 Petrus 4:9-10",
        refEn: "1 Peter 4:9-10",
        refFr: "1 Pierre 4:9-10",
        refEs: "1 Pedro 4:9-10",
        id: "Berilah tumpangan seorang akan yang lain dengan tidak bersungut-sungut. Layanilah seorang akan yang lain, sesuai dengan karunia yang telah diperoleh tiap-tiap orang sebagai pengurus yang baik dari kasih karunia Allah.",
        en: "Be hospitable to one another without grumbling. As each has received a gift, employ it in serving one another, as good managers of the grace of God in its various forms.",
        fr: "Exercez l’hospitalité les uns envers les autres, sans murmures. Comme de bons dispensateurs des diverses grâces de Dieu, que chacun de vous mette au service des autres le don qu’il a reçu,",
        es: "Hospedaos los unos á los otros sin murmuraciones. Cada uno según el don que ha recibido, adminístrelo á los otros, como buenos dispensadores de las diferentes gracias de Dios."
    },
    {
        ref: "1 Yohanes 1:7",
        refEn: "1 John 1:7",
        refFr: "1 Jean 1:7",
        refEs: "1 Juan 1:7",
        id: "Tetapi jika kita hidup di dalam terang sama seperti Dia ada di dalam terang, maka kita beroleh persekutuan seorang dengan yang lain, dan darah Yesus, Anak-Nya itu, menyucikan kita dari pada segala dosa.",
        en: "But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus Christ, his Son, cleanses us from all sin.",
        fr: "Mais si nous marchons dans la lumière, comme il est lui-même dans la lumière, nous sommes mutuellement en communion, et le sang de Jésus son Fils nous purifie de tout péché.",
        es: "Mas si andamos en luz, como él está en luz, tenemos comunión entre nosotros, y la sangre de Jesucristo su Hijo nos limpia de todo pecado."
    },
    {
        ref: "Amsal 11:2",
        refEn: "Proverbs 11:2",
        refFr: "Proverbes 11:2",
        refEs: "Proverbios 11:2",
        id: "Jikalau keangkuhan tiba, tiba juga cemooh, tetapi hikmat ada pada orang yang rendah hati.",
        en: "When pride comes, then comes shame, but with humility comes wisdom.",
        fr: "Quand vient l’orgueil, vient aussi l’ignominie ; Mais la sagesse est avec les humbles.",
        es: "Cuando viene la soberbia, viene también la deshonra: mas con los humildes es la sabiduría."
    },
    {
        ref: "Amsal 15:33",
        refEn: "Proverbs 15:33",
        refFr: "Proverbes 15:33",
        refEs: "Proverbios 15:33",
        id: "Takut akan TUHAN adalah didikan yang mendatangkan hikmat, dan kerendahan hati mendahului kehormatan.",
        en: "The fear of Yahweh teaches wisdom. Before honor is humility.",
        fr: "La crainte de l’Éternel enseigne la sagesse, Et l’humilité précède la gloire.",
        es: "El temor de Jehová es enseñanza de sabiduría: y delante de la honra está la humildad."
    },
    {
        ref: "Amsal 16:18-19",
        refEn: "Proverbs 16:18-19",
        refFr: "Proverbes 16:18-19",
        refEs: "Proverbios 16:18-19",
        id: "Kecongkakan mendahului kehancuran, dan tinggi hati mendahului kejatuhan. Lebih baik merendahkan diri dengan orang yang rendah hati dari pada membagi rampasan dengan orang congkak.",
        en: "Pride goes before destruction, and a haughty spirit before a fall. It is better to be of a lowly spirit with the poor, than to divide the plunder with the proud.",
        fr: "L’arrogance précède la ruine, Et l’orgueil précède la chute. Mieux vaut être humble avec les humbles Que de partager le butin avec les orgueilleux.",
        es: "Antes del quebrantamiento es la soberbia; y antes de la caída la altivez de espíritu. Mejor es humillar el espíritu con los humildes, que partir despojos con los soberbios."
    },
    {
        ref: "Amsal 22:4",
        refEn: "Proverbs 22:4",
        refFr: "Proverbes 22:4",
        refEs: "Proverbios 22:4",
        id: "Ganjaran kerendahan hati dan takut akan TUHAN adalah kekayaan, kehormatan dan kehidupan.",
        en: "The result of humility and the fear of Yahweh is wealth, honor, and life.",
        fr: "Le fruit de l’humilité, de la crainte de l’Éternel, C’est la richesse, la gloire et la vie.",
        es: "Riquezas, y honra, y vida, son la remuneración de la humildad y del temor de Jehová."
    },
    {
        ref: "Matius 5:5",
        refEn: "Matthew 5:5",
        refFr: "Matthieu 5:5",
        refEs: "Mateo 5:5",
        id: "Berbahagialah orang yang lemah lembut, karena mereka akan memiliki bumi.*",
        en: "Blessed are the gentle, for they shall inherit the earth.",
        fr: "Heureux les débonnaires, car ils hériteront la terre !",
        es: "Bienaventurados los mansos: porque ellos recibirán la tierra por heredad."
    },
    {
        ref: "Matius 23:12",
        refEn: "Matthew 23:12",
        refFr: "Matthieu 23:12",
        refEs: "Mateo 23:12",
        id: "Dan barangsiapa meninggikan diri, ia akan direndahkan dan barangsiapa merendahkan diri, ia akan ditinggikan.",
        en: "Whoever exalts himself will be humbled, and whoever humbles himself will be exalted.",
        fr: "Quiconque s’élèvera sera abaissé, et quiconque s’abaissera sera élevé.",
        es: "Porque el que se ensalzare, será humillado; y el que se humillare, será ensalzado."
    },
    {
        ref: "Roma 12:3",
        refEn: "Romans 12:3",
        refFr: "Romains 12:3",
        refEs: "Romanos 12:3",
        id: "Berdasarkan kasih karunia yang dianugerahkan kepadaku, aku berkata kepada setiap orang di antara kamu: Janganlah kamu memikirkan hal-hal yang lebih tinggi dari pada yang patut kamu pikirkan, tetapi hendaklah kamu berpikir begitu rupa, sehingga kamu menguasai diri menurut ukuran iman, yang dikaruniakan Allah kepada kamu masing-masing.",
        en: "For I say, through the grace that was given me, to every man who is among you, not to think of himself more highly than he ought to think; but to think reasonably, as God has apportioned to each person a measure of faith.",
        fr: "Par la grâce qui m’a été donnée, je dis à chacun de vous de n’avoir pas de lui-même une trop haute opinion, mais de revêtir des sentiments modestes, selon la mesure de foi que Dieu a départie à chacun.",
        es: "Digo pues por la gracia que me es dada, á cada cual que está entre vosotros, que no tenga más alto concepto de sí que el que debe tener, sino que piense de sí con templanza, conforme á la medida de fe que Dios repartió á cada uno."
    },
    {
        ref: "Filipi 2:5-8",
        refEn: "Philippians 2:5-8",
        refFr: "Philippiens 2:5-8",
        refEs: "Filipenses 2:5-8",
        id: "Hendaklah kamu dalam hidupmu bersama, menaruh pikiran dan perasaan yang terdapat juga dalam Kristus Yesus, yang walaupun dalam rupa Allah, tidak menganggap kesetaraan dengan Allah itu sebagai milik yang harus dipertahankan, melainkan telah mengosongkan diri-Nya sendiri, dan mengambil rupa seorang hamba, dan menjadi sama dengan manusia. Dan dalam keadaan sebagai manusia, Ia telah merendahkan diri-Nya dan taat sampai mati, bahkan sampai mati di kayu salib.",
        en: "Have this in your mind, which was also in Christ Jesus, who, existing in the form of God, didn’t consider equality with God a thing to be grasped, but emptied himself, taking the form of a servant, being made in the likeness of men. And being found in human form, he humbled himself, becoming obedient to death, yes, the death of the cross.",
        fr: "Ayez en vous les sentiments qui étaient en Jésus-Christ, lequel, existant en forme de Dieu, n’a point regardé comme une proie à arracher d’être égal avec Dieu, mais s’est dépouillé lui-même, en prenant une forme de serviteur, en devenant semblable aux hommes ; et ayant paru comme un simple homme, il s’est humilié lui-même, se rendant obéissant jusqu’à la mort, même jusqu’à la mort de la croix.",
        es: "Haya, pues, en vosotros este sentir que hubo también en Cristo Jesús: El cual, siendo en forma de Dios, no tuvo por usurpación ser igual á Dios: Sin embargo, se anonadó á sí mismo, tomando forma de siervo, hecho semejante á los hombres; Y hallado en la condición como hombre, se humilló á sí mismo, hecho obediente hasta la muerte, y muerte de cruz."
    },
    {
        ref: "Kolose 3:12",
        refEn: "Colossians 3:12",
        refFr: "Colossiens 3:12",
        refEs: "Colosenses 3:12",
        id: "Karena itu, sebagai orang-orang pilihan Allah yang dikuduskan dan dikasihi-Nya, kenakanlah belas kasihan, kemurahan, kerendahan hati, kelemahlembutan dan kesabaran.",
        en: "Put on therefore, as God’s chosen ones, holy and beloved, a heart of compassion, kindness, lowliness, humility, and perseverance;",
        fr: "Ainsi donc, comme des élus de Dieu, saints et bien-aimés, revêtez-vous d’entrailles de miséricorde, de bonté, d’humilité, de douceur, de patience.",
        es: "Vestíos pues, como escogidos de Dios, santos y amados, de entrañas de misericordia, de benignidad, de humildad, de mansedumbre, de tolerancia;"
    },
    {
        ref: "Ulangan 6:5",
        refEn: "Deuteronomy 6:5",
        refFr: "Deutéronome 6:5",
        refEs: "Deuteronomio 6:5",
        id: "Kasihilah TUHAN, Allahmu, dengan segenap hatimu dan dengan segenap jiwamu dan dengan segenap kekuatanmu.",
        en: "You shall love Yahweh your God with all your heart, with all your soul, and with all your might.",
        fr: "Tu aimeras l’Éternel, ton Dieu, de tout ton cœur, de toute ton âme et de toute ta force.",
        es: "Y amarás á Jehová tu Dios de todo tu corazón, y de toda tu alma, y con todo tu poder."
    },
    {
        ref: "Kidung Agung 8:7",
        refEn: "Song of Solomon 8:7",
        refFr: "Cantique des Cantiques 8:7",
        refEs: "Cantares 8:7",
        id: "Air yang banyak tak dapat memadamkan cinta, sungai-sungai tak dapat menghanyutkannya. Sekalipun orang memberi segala harta benda rumahnya untuk cinta, namun ia pasti akan dihina.",
        en: "Many waters can’t quench love, neither can floods drown it. If a man would give all the wealth of his house for love, he would be utterly scorned. Friends",
        fr: "Les grandes eaux ne peuvent éteindre l’amour, Et les fleuves ne le submergeraient pas ; Quand un homme offrirait tous les biens de sa maison contre l’amour, Il ne s’attirerait que le mépris.",
        es: "Las muchas aguas no podrán apagar el amor, ni lo ahogarán los ríos. Si diese el hombre toda la hacienda de su casa por este amor, de cierto lo menospreciaran."
    },
    {
        ref: "Matius 5:44",
        refEn: "Matthew 5:44",
        refFr: "Matthieu 5:44",
        refEs: "Mateo 5:44",
        id: "Tetapi Aku berkata kepadamu: Kasihilah musuhmu dan berdoalah bagi mereka yang menganiaya kamu.",
        en: "But I tell you, love your enemies, bless those who curse you, do good to those who hate you, and pray for those who mistreat you and persecute you,",
        fr: "Mais moi, je vous dis : Aimez vos ennemis, bénissez ceux qui vous maudissent, faites du bien à ceux qui vous haïssent, et priez pour ceux qui vous maltraitent et qui vous persécutent,",
        es: "Mas yo os digo: Amad á vuestros enemigos, bendecid á los que os maldicen, haced bien á los que os aborrecen, y orad por los que os ultrajan y os persiguen;"
    },
    {
        ref: "Matius 22:37-39",
        refEn: "Matthew 22:37-39",
        refFr: "Matthieu 22:37-39",
        refEs: "Mateo 22:37-39",
        id: "Jawab Yesus kepadanya: /\"Kasihilah Tuhan, Allahmu, dengan segenap hatimu dan dengan segenap jiwamu dan dengan segenap akal budimu. Itulah hukum yang terutama dan yang pertama. Dan hukum yang kedua, yang sama dengan itu, ialah: Kasihilah sesamamu manusia seperti dirimu sendiri.",
        en: "Jesus said to him, “‘You shall love the Lord your God with all your heart, with all your soul, and with all your mind.’ This is the first and great commandment. A second likewise is this, ‘You shall love your neighbor as yourself.’",
        fr: "Jésus lui répondit : Tu aimeras le Seigneur, ton Dieu, de tout ton cœur, de toute ton âme, et de toute ta pensée. C’est le premier et le plus grand commandement. Et voici le second, qui lui est semblable : Tu aimeras ton prochain comme toi-même.",
        es: "Y Jesús le dijo: Amarás al Señor tu Dios de todo tu corazón, y de toda tu alma, y de toda tu mente. Este es el primero y el grande mandamiento. Y el segundo es semejante á éste: Amarás á tu prójimo como á ti mismo."
    },
    {
        ref: "Yohanes 15:9",
        refEn: "John 15:9",
        refFr: "Jean 15:9",
        refEs: "Juan 15:9",
        id: "\"Seperti Bapa telah mengasihi Aku, demikianlah juga Aku telah mengasihi kamu; tinggallah di dalam kasih-Ku itu.",
        en: "Even as the Father has loved me, I also have loved you. Remain in my love.",
        fr: "Comme le Père m’a aimé, je vous ai aussi aimés. Demeurez dans mon amour.",
        es: "Como el Padre me amó, también yo os he amado: estad en mi amor."
    },
    {
        ref: "Yohanes 15:12",
        refEn: "John 15:12",
        refFr: "Jean 15:12",
        refEs: "Juan 15:12",
        id: "Inilah perintah-Ku, yaitu supaya kamu saling mengasihi, seperti Aku telah mengasihi kamu.",
        en: "“This is my commandment, that you love one another, even as I have loved you.",
        fr: "C’est ici mon commandement : Aimez-vous les uns les autres, comme je vous ai aimés.",
        es: "Este es mi mandamiento: Que os améis los unos á los otros, como yo os he amado."
    },
    {
        ref: "Roma 8:35",
        refEn: "Romans 8:35",
        refFr: "Romains 8:35",
        refEs: "Romanos 8:35",
        id: "Siapakah yang akan memisahkan kita dari kasih Kristus? Penindasan atau kesesakan atau penganiayaan, atau kelaparan atau ketelanjangan, atau bahaya, atau pedang?",
        en: "Who shall separate us from the love of Christ? Could oppression, or anguish, or persecution, or famine, or nakedness, or peril, or sword?",
        fr: "Qui nous séparera de l’amour de Christ ? Sera-ce la tribulation, ou l’angoisse, ou la persécution, ou la faim, ou la nudité, ou le péril, ou l’épée ?",
        es: "¿Quién nos apartará del amor de Cristo? tribulación? ó angustia? ó persecución? ó hambre? ó desnudez? ó peligro? ó cuchillo?"
    },
    {
        ref: "Roma 13:8",
        refEn: "Romans 13:8",
        refFr: "Romains 13:8",
        refEs: "Romanos 13:8",
        id: "Janganlah kamu berhutang apa-apa kepada siapapun juga, tetapi hendaklah kamu saling mengasihi. Sebab barangsiapa mengasihi sesamanya manusia, ia sudah memenuhi hukum Taurat.",
        en: "Owe no one anything, except to love one another; for he who loves his neighbor has fulfilled the law.",
        fr: "Ne devez rien à personne, si ce n’est de vous aimer les uns les autres ; car celui qui aime les autres a accompli la loi.",
        es: "No debáis á nadie nada, sino amaros unos á otros; porque el que ama al prójimo, cumplió la ley."
    },
    {
        ref: "Roma 13:10",
        refEn: "Romans 13:10",
        refFr: "Romains 13:10",
        refEs: "Romanos 13:10",
        id: "Kasih tidak berbuat jahat terhadap sesama manusia, karena itu kasih adalah kegenapan hukum Taurat.",
        en: "Love doesn’t harm a neighbor. Love therefore is the fulfillment of the law.",
        fr: "L’amour ne fait point de mal au prochain : l’amour est donc l’accomplissement de la loi.",
        es: "La caridad no hace mal al prójimo: así que, el cumplimento de la ley es la caridad."
    },
    {
        ref: "1 Korintus 16:14",
        refEn: "1 Corinthians 16:14",
        refFr: "1 Corinthiens 16:14",
        refEs: "1 Corintios 16:14",
        id: "Lakukanlah segala pekerjaanmu dalam kasih!",
        en: "Let all that you do be done in love.",
        fr: "Que tout ce que vous faites se fasse avec charité !",
        es: "Todas vuestras cosas sean hechas con caridad."
    },
    {
        ref: "Galatia 5:6",
        refEn: "Galatians 5:6",
        refFr: "Galates 5:6",
        refEs: "Gálatas 5:6",
        id: "Sebab bagi orang-orang yang ada di dalam Kristus Yesus hal bersunat atau tidak bersunat tidak mempunyai sesuatu arti, hanya iman yang bekerja oleh kasih.",
        en: "For in Christ Jesus neither circumcision amounts to anything, nor uncircumcision, but faith working through love.",
        fr: "Car, en Jésus-Christ, ni la circoncision ni l’incirconcision n’a de valeur, mais la foi qui est agissante par la charité.",
        es: "Porque en Cristo Jesús ni la circuncisión vale algo, ni la incircuncisión; sino la fe que obra por la caridad."
    },
    {
        ref: "Galatia 5:13",
        refEn: "Galatians 5:13",
        refFr: "Galates 5:13",
        refEs: "Gálatas 5:13",
        id: "Saudara-saudara, memang kamu telah dipanggil untuk merdeka. Tetapi janganlah kamu mempergunakan kemerdekaan itu sebagai kesempatan untuk kehidupan dalam dosa, melainkan layanilah seorang akan yang lain oleh kasih.",
        en: "For you, brothers, were called for freedom. Only don’t use your freedom for gain to the flesh, but through love be servants to one another.",
        fr: "Frères, vous avez été appelés à la liberté, seulement ne faites pas de cette liberté un prétexte de vivre selon la chair ; mais rendez-vous, par la charité, serviteurs les uns des autres.",
        es: "Porque vosotros, hermanos, á libertad habéis sido llamados; solamente que no uséis la libertad como ocasión á la carne, sino servíos por amor los unos á los otros."
    },
    {
        ref: "Efesus 3:17-19",
        refEn: "Ephesians 3:17-19",
        refFr: "Éphésiens 3:17-19",
        refEs: "Efesios 3:17-19",
        id: "sehingga oleh imanmu Kristus diam di dalam hatimu dan kamu berakar serta berdasar di dalam kasih. Aku berdoa, supaya kamu bersama- sama dengan segala orang kudus dapat memahami, betapa lebarnya dan panjangnya dan tingginya dan dalamnya kasih Kristus, dan dapat mengenal kasih itu, sekalipun ia melampaui segala pengetahuan. Aku berdoa, supaya kamu dipenuhi di dalam seluruh kepenuhan Allah.",
        en: "that Christ may dwell in your hearts through faith; to the end that you, being rooted and grounded in love, may be strengthened to comprehend with all the saints what is the breadth and length and height and depth, and to know Christ’s love which surpasses knowledge, that you may be filled with all the fullness of God.",
        fr: "en sorte que Christ habite dans vos cœurs par la foi ; afin qu’étant enracinés et fondés dans l’amour, vous puissiez comprendre avec tous les saints quelle est la largeur, la longueur, la profondeur et la hauteur, et connaître l’amour de Christ, qui surpasse toute connaissance, en sorte que vous soyez remplis jusqu’à toute la plénitude de Dieu.",
        es: "Que habite Cristo por la fe en vuestros corazones; para que, arraigados y fundados en amor, Podáis bien comprender con todos los santos cuál sea la anchura y la longura y la profundidad y la altura, Y conocer el amor de Cristo, que excede á todo conocimiento, para que seáis llenos de toda la plenitud de Dios."
    },
    {
        ref: "Efesus 5:25",
        refEn: "Ephesians 5:25",
        refFr: "Éphésiens 5:25",
        refEs: "Efesios 5:25",
        id: "Hai suami, kasihilah isterimu sebagaimana Kristus telah mengasihi jemaat dan telah menyerahkan diri-Nya baginya",
        en: "Husbands, love your wives, even as Christ also loved the assembly, and gave himself up for it;",
        fr: "Maris, aimez vos femmes, comme Christ a aimé l’Église, et s’est livré lui-même pour elle,",
        es: "Maridos, amad á vuestras mujeres, así como Cristo amó á la iglesia, y se entregó á sí mismo por ella,"
    },
    {
        ref: "1 Petrus 4:8",
        refEn: "1 Peter 4:8",
        refFr: "1 Pierre 4:8",
        refEs: "1 Pedro 4:8",
        id: "Tetapi yang terutama: kasihilah sungguh-sungguh seorang akan yang lain, sebab kasih menutupi banyak sekali dosa.",
        en: "And above all things be earnest in your love among yourselves, for love covers a multitude of sins.",
        fr: "Avant tout, ayez les uns pour les autres une ardente charité, car La charité couvre une multitude de péchés.",
        es: "Y sobre todo, tened entre vosotros ferviente caridad; porque la caridad cubrirá multitud de pecados."
    },
    {
        ref: "1 Yohanes 3:1",
        refEn: "1 John 3:1",
        refFr: "1 Jean 3:1",
        refEs: "1 Juan 3:1",
        id: "Lihatlah, betapa besarnya kasih yang dikaruniakan Bapa kepada kita, sehingga kita disebut anak-anak Allah, dan memang kita adalah anak-anak Allah. Karena itu dunia tidak mengenal kita, sebab dunia tidak mengenal Dia.",
        en: "See how great a love the Father has bestowed on us, that we should be called children of God! For this cause the world doesn’t know us, because it didn’t know him.",
        fr: "Voyez quel amour le Père nous a témoigné, pour que nous soyons appelés enfants de Dieu ! Et nous le sommes. Si le monde ne nous connaît pas, c’est qu’il ne l’a pas connu.",
        es: "MIRAD cuál amor nos ha dado el Padre, que seamos llamados hijos de Dios: por esto el mundo no nos conoce, porque no le conoce á él."
    },
    {
        ref: "1 Yohanes 3:16",
        refEn: "1 John 3:16",
        refFr: "1 Jean 3:16",
        refEs: "1 Juan 3:16",
        id: "Demikianlah kita ketahui kasih Kristus, yaitu bahwa Ia telah menyerahkan nyawa-Nya untuk kita; jadi kitapun wajib menyerahkan nyawa kita untuk saudara-saudara kita.",
        en: "By this we know love, because he laid down his life for us. And we ought to lay down our lives for the brothers.",
        fr: "Nous avons connu l’amour, en ce qu’il a donné sa vie pour nous ; nous aussi, nous devons donner notre vie pour les frères.",
        es: "En esto hemos conocido el amor, porque él puso su vida por nosotros: también nosotros debemos poner nuestras vidas por los hermanos."
    },
    {
        ref: "1 Yohanes 4:7",
        refEn: "1 John 4:7",
        refFr: "1 Jean 4:7",
        refEs: "1 Juan 4:7",
        id: "Saudara-saudaraku yang kekasih, marilah kita saling mengasihi, sebab kasih itu berasal dari Allah; dan setiap orang yang mengasihi, lahir dari Allah dan mengenal Allah.",
        en: "Beloved, let us love one another, for love is of God; and everyone who loves has been born of God, and knows God.",
        fr: "Bien-aimés, aimons nous les uns les autres ; car l’amour est de Dieu, et quiconque aime est né de Dieu et connaît Dieu.",
        es: "Carísimos, amémonos unos á otros; porque el amor es de Dios. Cualquiera que ama, es nacido de Dios, y conoce á Dios."
    },
    {
        ref: "1 Yohanes 4:11",
        refEn: "1 John 4:11",
        refFr: "1 Jean 4:11",
        refEs: "1 Juan 4:11",
        id: "Saudara-saudaraku yang kekasih, jikalau Allah sedemikian mengasihi kita, maka haruslah kita juga saling mengasihi.",
        en: "Beloved, if God loved us in this way, we also ought to love one another.",
        fr: "Bien-aimés, si Dieu nous a ainsi aimés, nous devons aussi nous aimer les uns les autres.",
        es: "Amados, si Dios así nos ha amado, debemos también nosotros amarnos unos á otros."
    },
    {
        ref: "1 Yohanes 4:16",
        refEn: "1 John 4:16",
        refFr: "1 Jean 4:16",
        refEs: "1 Juan 4:16",
        id: "Kita telah mengenal dan telah percaya akan kasih Allah kepada kita. Allah adalah kasih, dan barangsiapa tetap berada di dalam kasih, ia tetap berada di dalam Allah dan Allah di dalam dia.",
        en: "We know and have believed the love which God has for us. God is love, and he who remains in love remains in God, and God remains in him.",
        fr: "Et nous, nous avons connu l’amour que Dieu a pour nous, et nous y avons cru. Dieu est amour ; et celui qui demeure dans l’amour demeure en Dieu, et Dieu demeure en lui.",
        es: "Y nosotros hemos conocido y creído el amor que Dios tiene para con nosotros. Dios es amor; y el que vive en amor, vive en Dios, y Dios en él."
    },
    {
        ref: "1 Yohanes 4:18",
        refEn: "1 John 4:18",
        refFr: "1 Jean 4:18",
        refEs: "1 Juan 4:18",
        id: "Di dalam kasih tidak ada ketakutan: kasih yang sempurna melenyapkan ketakutan; sebab ketakutan mengandung hukuman dan barangsiapa takut, ia tidak sempurna di dalam kasih.",
        en: "There is no fear in love; but perfect love casts out fear, because fear has punishment. He who fears is not made perfect in love.",
        fr: "La crainte n’est pas dans l’amour, mais l’amour parfait bannit la crainte ; car la crainte suppose un châtiment, et celui qui craint n’est pas parfait dans l’amour.",
        es: "En amor no hay temor; mas el perfecto amor echa fuera el temor: porque el temor tiene pena. De donde el que teme, no está perfecto en el amor."
    }
]

/** Returns a verse at the given index (wraps around). */
export function getVerseAt(index: number): BibleVerse {
    return BIBLE_VERSES[((index % BIBLE_VERSES.length) + BIBLE_VERSES.length) % BIBLE_VERSES.length]
}

/** Returns a random verse. */
export function getRandomVerse(): BibleVerse {
    return BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)]
}

/** Returns a pseudo-random verse for today (same all day, different each day). */
export function getTodayVerse(): BibleVerse {
    const now = new Date()
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
    return BIBLE_VERSES[dayOfYear % BIBLE_VERSES.length]
}
