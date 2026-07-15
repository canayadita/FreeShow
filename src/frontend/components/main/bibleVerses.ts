// Bible verses dataset — bilingual (TB Indonesian + NIV English)
// Used for splash screen and permanent verse bar in FreeShowPlus
// Terjemahan Indonesia: TB (Terjemahan Baru) © LAI
// English translation: NIV © Biblica — quoted for non-commercial church use

export interface BibleVerse {
    ref: string   // Indonesian reference
    refEn: string // English reference
    id: string    // Bahasa Indonesia (TB)
    en: string    // English (NIV)
}

export const BIBLE_VERSES: BibleVerse[] = [
    // ===== PENJANGKAUAN & PENGABARAN INJIL / EVANGELISM & OUTREACH =====
    {
        ref: "Lukas 19:10",
        refEn: "Luke 19:10",
        id: "Sebab Anak Manusia datang untuk mencari dan menyelamatkan yang hilang.",
        en: "For the Son of Man came to seek and to save the lost."
    },
    {
        ref: "Roma 10:14-15",
        refEn: "Romans 10:14-15",
        id: "Tetapi bagaimana mereka dapat berseru kepada-Nya, jika mereka tidak percaya kepada Dia? Bagaimana mereka dapat percaya kepada Dia, jika mereka tidak mendengar tentang Dia? Bagaimana mereka mendengar tentang Dia, jika tidak ada yang memberitakan-Nya? Dan bagaimana mereka dapat memberitakan-Nya, jika mereka tidak diutus?",
        en: "How, then, can they call on the one they have not believed in? And how can they believe in the one of whom they have not heard? And how can they hear without someone preaching to them? And how can anyone preach unless they are sent?"
    },
    {
        ref: "Lukas 15:7",
        refEn: "Luke 15:7",
        id: "Aku berkata kepadamu: Demikian juga akan ada sukacita di surga karena satu orang berdosa yang bertobat, lebih dari pada sukacita karena sembilan puluh sembilan orang benar yang tidak memerlukan pertobatan.",
        en: "I tell you that in the same way there will be more rejoicing in heaven over one sinner who repents than over ninety-nine righteous persons who do not need to repent."
    },
    {
        ref: "2 Korintus 5:20",
        refEn: "2 Corinthians 5:20",
        id: "Jadi kami ini adalah utusan-utusan Kristus, seakan-akan Allah menasihati kamu dengan perantaraan kami; dalam nama Kristus kami meminta kepadamu: berilah dirimu didamaikan dengan Allah.",
        en: "We are therefore Christ's ambassadors, as though God were making his appeal through us. We implore you on Christ's behalf: Be reconciled to God."
    },
    {
        ref: "1 Petrus 3:15",
        refEn: "1 Peter 3:15",
        id: "Tetapi kuduskanlah Kristus di dalam hatimu sebagai Tuhan! Dan siap sedialah pada segala waktu untuk memberi pertanggungan jawab kepada tiap-tiap orang yang meminta pertanggungan jawab dari kamu tentang pengharapan yang ada padamu.",
        en: "But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have."
    },
    {
        ref: "Amsal 11:30",
        refEn: "Proverbs 11:30",
        id: "Buah orang benar adalah pohon kehidupan, dan siapa yang bijaksana memenangkan jiwa-jiwa.",
        en: "The fruit of the righteous is a tree of life, and the one who is wise saves lives."
    },
    {
        ref: "Matius 9:37-38",
        refEn: "Matthew 9:37-38",
        id: "Maka kata-Nya kepada murid-murid-Nya: 'Tuaian memang banyak, tetapi pekerja sedikit. Karena itu mintalah kepada tuan yang empunya tuaian, supaya Ia mengirimkan pekerja-pekerja untuk tuaian itu.'",
        en: "Then he said to his disciples, 'The harvest is plentiful but the workers are few. Ask the Lord of the harvest, therefore, to send out workers into his harvest field.'"
    },
    {
        ref: "Daniel 12:3",
        refEn: "Daniel 12:3",
        id: "Dan orang-orang bijaksana akan bercahaya seperti cahaya cakrawala, dan orang-orang yang telah menuntun banyak orang kepada kebenaran seperti bintang-bintang, selama-lamanya.",
        en: "Those who are wise will shine like the brightness of the heavens, and those who lead many to righteousness, like the stars for ever and ever."
    },
    {
        ref: "1 Korintus 9:22",
        refEn: "1 Corinthians 9:22",
        id: "Bagi orang-orang yang lemah aku menjadi seperti orang yang lemah, supaya aku dapat menyelamatkan mereka yang lemah. Bagi semua orang aku telah menjadi semua hal, supaya aku sedapat mungkin memenangkan beberapa orang dari antara mereka.",
        en: "To the weak I became weak, to win the weak. I have become all things to all people so that by all possible means I might save some."
    },
    {
        ref: "Kisah Para Rasul 4:12",
        refEn: "Acts 4:12",
        id: "Dan keselamatan tidak ada di dalam siapa pun juga selain di dalam Dia, sebab di bawah kolong langit ini tidak ada nama lain yang diberikan kepada manusia yang olehnya kita dapat diselamatkan.",
        en: "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved."
    },
    {
        ref: "Lukas 24:47",
        refEn: "Luke 24:47",
        id: "Dan lagi: dalam nama-Nya berita tentang pertobatan dan pengampunan dosa harus disampaikan kepada segala bangsa, mulai dari Yerusalem.",
        en: "And repentance for the forgiveness of sins will be preached in his name to all nations, beginning at Jerusalem."
    },
    {
        ref: "Matius 4:19",
        refEn: "Matthew 4:19",
        id: "Yesus berkata kepada mereka: 'Mari, ikutlah Aku, dan kamu akan Kujadikan penjala manusia.'",
        en: "Come, follow me, Jesus said, and I will send you out to fish for people."
    },
    {
        ref: "Yohanes 4:35",
        refEn: "John 4:35",
        id: "Bukankah kamu mengatakan: Empat bulan lagi tibalah musim menuai? Tetapi Aku berkata kepadamu: Lihatlah sekelilingmu dan pandanglah ladang-ladang yang sudah menguning dan matang untuk dituai.",
        en: "Don't you have a saying, 'It's still four months until harvest'? I tell you, open your eyes and look at the fields! They are ripe for harvest."
    },
    {
        ref: "Kisah Para Rasul 20:24",
        refEn: "Acts 20:24",
        id: "Tetapi aku tidak menghiraukan nyawaku sedikit pun, asal saja aku dapat mencapai garis akhir dan menyelesaikan pelayanan yang ditugaskan oleh Tuhan Yesus kepadaku untuk memberi kesaksian tentang Injil kasih karunia Allah.",
        en: "However, I consider my life worth nothing to me; my only aim is to finish the race and complete the task the Lord Jesus has given me — the task of testifying to the good news of God's grace."
    },
    {
        ref: "Roma 1:16",
        refEn: "Romans 1:16",
        id: "Sebab aku mempunyai keyakinan yang kokoh dalam Injil, karena Injil adalah kekuatan Allah yang menyelamatkan setiap orang yang percaya, pertama-tama orang Yahudi, tetapi juga orang Yunani.",
        en: "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes: first to the Jew, then to the Gentile."
    },
    {
        ref: "Lukas 15:4",
        refEn: "Luke 15:4",
        id: "Siapakah di antara kamu yang mempunyai seratus ekor domba, dan jikalau ia kehilangan seekor di antaranya, tidak meninggalkan yang sembilan puluh sembilan ekor di padang gurun dan pergi mencari yang sesat itu sampai ia menemukannya?",
        en: "Suppose one of you has a hundred sheep and loses one of them. Doesn't he leave the ninety-nine in the open country and go after the lost sheep until he finds it?"
    },
    {
        ref: "Yohanes 17:18",
        refEn: "John 17:18",
        id: "Sama seperti Engkau telah mengutus Aku ke dalam dunia, demikian pula Aku telah mengutus mereka ke dalam dunia.",
        en: "As you sent me into the world, I have sent them into the world."
    },
    {
        ref: "Kolose 4:5-6",
        refEn: "Colossians 4:5-6",
        id: "Hiduplah dengan penuh hikmat terhadap orang-orang luar, pergunakanlah waktu yang ada. Hendaklah kata-katamu senantiasa penuh kasih, jangan hambar, sehingga kamu tahu bagaimana kamu harus memberi jawab kepada setiap orang.",
        en: "Be wise in the way you act toward outsiders; make the most of every opportunity. Let your conversation be always full of grace, seasoned with salt, so that you may know how to answer everyone."
    },
    {
        ref: "Mazmur 96:3",
        refEn: "Psalm 96:3",
        id: "Ceritakanlah kemuliaan-Nya di antara bangsa-bangsa, perbuatan-perbuatan-Nya yang ajaib di antara segala suku bangsa.",
        en: "Declare his glory among the nations, his marvelous deeds among all peoples."
    },
    {
        ref: "Kisah Para Rasul 2:47",
        refEn: "Acts 2:47",
        id: "Sambil memuji Allah dan disukai semua orang. Dan tiap-tiap hari Tuhan menambah jumlah mereka dengan orang yang diselamatkan.",
        en: "Praising God and enjoying the favor of all the people. And the Lord added to their number daily those who were being saved."
    },

    // ===== PENGINJILAN / SALVATION =====
    {
        ref: "Yohanes 3:16",
        refEn: "John 3:16",
        id: "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.",
        en: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
    },
    {
        ref: "Roma 3:23",
        refEn: "Romans 3:23",
        id: "Karena semua orang telah berbuat dosa dan telah kehilangan kemuliaan Allah.",
        en: "For all have sinned and fall short of the glory of God."
    },
    {
        ref: "Roma 6:23",
        refEn: "Romans 6:23",
        id: "Sebab upah dosa ialah maut; tetapi karunia Allah ialah hidup yang kekal dalam Kristus Yesus, Tuhan kita.",
        en: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord."
    },
    {
        ref: "Roma 10:9",
        refEn: "Romans 10:9",
        id: "Sebab jika kamu mengaku dengan mulutmu, bahwa Yesus adalah Tuhan, dan percaya dalam hatimu, bahwa Allah telah membangkitkan Dia dari antara orang mati, maka kamu akan diselamatkan.",
        en: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved."
    },
    {
        ref: "Kisah Para Rasul 16:31",
        refEn: "Acts 16:31",
        id: "Percayalah kepada Tuhan Yesus Kristus dan engkau akan selamat, engkau dan seisi rumahmu.",
        en: "Believe in the Lord Jesus, and you will be saved — you and your household."
    },
    {
        ref: "Yohanes 14:6",
        refEn: "John 14:6",
        id: "Kata Yesus kepadanya: 'Akulah jalan dan kebenaran dan hidup. Tidak ada seorang pun yang datang kepada Bapa, kalau tidak melalui Aku.'",
        en: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'"
    },
    {
        ref: "Efesus 2:8-9",
        refEn: "Ephesians 2:8-9",
        id: "Sebab karena kasih karunia kamu diselamatkan oleh iman; itu bukan hasil usahamu, tetapi pemberian Allah, itu bukan hasil pekerjaanmu: jangan ada orang yang memegahkan diri.",
        en: "For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast."
    },
    {
        ref: "2 Korintus 5:17",
        refEn: "2 Corinthians 5:17",
        id: "Jadi siapa yang ada di dalam Kristus, ia adalah ciptaan baru: yang lama sudah berlalu, sesungguhnya yang baru sudah datang.",
        en: "Therefore, if anyone is in Christ, the new creation has come: the old has gone, the new is here!"
    },
    {
        ref: "Yohanes 1:12",
        refEn: "John 1:12",
        id: "Tetapi semua orang yang menerima-Nya diberi-Nya kuasa supaya menjadi anak-anak Allah, yaitu mereka yang percaya dalam nama-Nya.",
        en: "Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God."
    },
    {
        ref: "1 Yohanes 5:11-12",
        refEn: "1 John 5:11-12",
        id: "Dan inilah kesaksian itu: Allah telah mengaruniakan hidup yang kekal kepada kita dan hidup itu ada di dalam Anak-Nya. Barangsiapa memiliki Anak, ia memiliki hidup; barangsiapa tidak memiliki Anak Allah, ia tidak memiliki hidup.",
        en: "And this is the testimony: God has given us eternal life, and this life is in his Son. Whoever has the Son has life; whoever does not have the Son of God does not have life."
    },

    // ===== KASIH / LOVE =====
    {
        ref: "1 Korintus 13:4-5",
        refEn: "1 Corinthians 13:4-5",
        id: "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong. Ia tidak melakukan yang tidak sopan dan tidak mencari keuntungan diri sendiri.",
        en: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking."
    },
    {
        ref: "1 Korintus 13:13",
        refEn: "1 Corinthians 13:13",
        id: "Demikianlah tinggal ketiga hal ini, yaitu iman, pengharapan dan kasih, dan yang paling besar di antaranya ialah kasih.",
        en: "And now these three remain: faith, hope and love. But the greatest of these is love."
    },
    {
        ref: "Yohanes 13:34-35",
        refEn: "John 13:34-35",
        id: "Aku memberikan perintah baru kepada kamu, yaitu supaya kamu saling mengasihi; sama seperti Aku telah mengasihi kamu demikian pula kamu harus saling mengasihi. Dengan demikian semua orang akan tahu, bahwa kamu adalah murid-murid-Ku, yaitu jikalau kamu saling mengasihi.",
        en: "A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another."
    },
    {
        ref: "Yohanes 15:13",
        refEn: "John 15:13",
        id: "Tidak ada kasih yang lebih besar dari pada kasih seorang yang memberikan nyawanya untuk sahabat-sahabatnya.",
        en: "Greater love has no one than this: to lay down one's life for one's friends."
    },
    {
        ref: "Roma 8:38-39",
        refEn: "Romans 8:38-39",
        id: "Sebab aku yakin, bahwa baik maut, maupun hidup, baik malaikat-malaikat, maupun pemerintah-pemerintah, baik yang ada sekarang, maupun yang akan datang ... tidak akan dapat memisahkan kita dari kasih Allah, yang ada dalam Kristus Yesus, Tuhan kita.",
        en: "For I am convinced that neither death nor life, neither angels nor demons ... nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord."
    },
    {
        ref: "1 Yohanes 4:19",
        refEn: "1 John 4:19",
        id: "Kita mengasihi, karena Allah lebih dahulu mengasihi kita.",
        en: "We love because he first loved us."
    },
    {
        ref: "1 Yohanes 4:8",
        refEn: "1 John 4:8",
        id: "Barangsiapa tidak mengasihi, ia tidak mengenal Allah, sebab Allah adalah kasih.",
        en: "Whoever does not love does not know God, because God is love."
    },
    {
        ref: "Roma 5:8",
        refEn: "Romans 5:8",
        id: "Akan tetapi Allah menunjukkan kasih-Nya kepada kita, oleh karena Kristus telah mati untuk kita, ketika kita masih berdosa.",
        en: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us."
    },

    // ===== PENGHIBURAN / COMFORT =====
    {
        ref: "Mazmur 23:1-3",
        refEn: "Psalm 23:1-3",
        id: "TUHAN adalah gembalaku, takkan kekurangan aku. Ia membaringkan aku di padang yang berumput hijau, Ia membimbing aku ke air yang tenang; Ia menyegarkan jiwaku.",
        en: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul."
    },
    {
        ref: "Yesaya 41:10",
        refEn: "Isaiah 41:10",
        id: "Janganlah takut, sebab Aku menyertai engkau, janganlah bimbang, sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong engkau; Aku akan memegang engkau dengan tangan kanan-Ku yang membawa kemenangan.",
        en: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand."
    },
    {
        ref: "Matius 11:28-29",
        refEn: "Matthew 11:28-29",
        id: "Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, Aku akan memberi kelegaan kepadamu. Pikullah kuk yang Kupasang dan belajarlah pada-Ku, karena Aku lemah lembut dan rendah hati dan jiwamu akan mendapat ketenangan.",
        en: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls."
    },
    {
        ref: "Mazmur 46:2",
        refEn: "Psalm 46:1",
        id: "Allah itu bagi kita tempat perlindungan dan kekuatan, sebagai penolong dalam kesesakan sangat terbukti.",
        en: "God is our refuge and strength, an ever-present help in trouble."
    },
    {
        ref: "Yohanes 14:27",
        refEn: "John 14:27",
        id: "Damai sejahtera Kutinggalkan bagimu. Damai sejahtera-Ku Kuberikan kepadamu, dan apa yang Kuberikan tidak seperti yang diberikan oleh dunia kepadamu. Janganlah gelisah dan gentar hatimu.",
        en: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid."
    },
    {
        ref: "Filipi 4:7",
        refEn: "Philippians 4:7",
        id: "Damai sejahtera Allah, yang melampaui segala akal, akan memelihara hati dan pikiranmu dalam Kristus Yesus.",
        en: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
    },
    {
        ref: "Yeremia 29:11",
        refEn: "Jeremiah 29:11",
        id: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
        en: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
    },
    {
        ref: "2 Korintus 1:3-4",
        refEn: "2 Corinthians 1:3-4",
        id: "Terpujilah Allah, Bapa Tuhan kita Yesus Kristus, Bapa yang penuh belas kasihan dan Allah sumber segala penghiburan, yang menghibur kami dalam segala penderitaan kami, sehingga kami sanggup menghibur mereka, yang berada dalam bermacam-macam penderitaan.",
        en: "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble."
    },
    {
        ref: "Roma 8:28",
        refEn: "Romans 8:28",
        id: "Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia, yaitu bagi mereka yang terpanggil sesuai dengan rencana Allah.",
        en: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose."
    },
    {
        ref: "Mazmur 34:19",
        refEn: "Psalm 34:18",
        id: "TUHAN itu dekat kepada orang-orang yang patah hati, dan Ia menyelamatkan orang-orang yang remuk jiwanya.",
        en: "The Lord is close to the brokenhearted and saves those who are crushed in spirit."
    },
    {
        ref: "1 Petrus 5:7",
        refEn: "1 Peter 5:7",
        id: "Serahkanlah segala kekuatiranmu kepada-Nya, sebab Ia yang memelihara kamu.",
        en: "Cast all your anxiety on him because he cares for you."
    },
    {
        ref: "Mazmur 121:1-2",
        refEn: "Psalm 121:1-2",
        id: "Aku melayangkan mataku ke gunung-gunung; dari manakah akan datang pertolonganku? Pertolonganku ialah dari TUHAN, yang menjadikan langit dan bumi.",
        en: "I lift up my eyes to the mountains — where does my help come from? My help comes from the Lord, the Maker of heaven and earth."
    },

    // ===== KEKUATAN / STRENGTH =====
    {
        ref: "Filipi 4:13",
        refEn: "Philippians 4:13",
        id: "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.",
        en: "I can do all this through him who gives me strength."
    },
    {
        ref: "Yesaya 40:31",
        refEn: "Isaiah 40:31",
        id: "Tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya; mereka berlari dan tidak menjadi lesu, mereka berjalan dan tidak menjadi lelah.",
        en: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."
    },
    {
        ref: "Nehemia 8:10",
        refEn: "Nehemiah 8:10",
        id: "Janganlah kamu bersusah hati, sebab sukacita karena TUHAN itulah perlindunganmu!",
        en: "Do not grieve, for the joy of the Lord is your strength."
    },
    {
        ref: "2 Timotius 1:7",
        refEn: "2 Timothy 1:7",
        id: "Sebab Allah memberikan kepada kita bukan roh ketakutan, melainkan roh yang membangkitkan kekuatan, kasih dan ketertiban.",
        en: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline."
    },
    {
        ref: "Mazmur 18:3",
        refEn: "Psalm 18:2",
        id: "TUHAN adalah gunung batuku, kubu pertahananku dan penyelamatku, Allahku, gunung batuku, tempat aku berlindung, perisaiku, tanduk keselamatanku, kota bentengku!",
        en: "The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge, my shield and the horn of my salvation, my stronghold."
    },
    {
        ref: "Efesus 6:10",
        refEn: "Ephesians 6:10",
        id: "Akhirnya, jadilah kuat di dalam Tuhan, di dalam kekuatan kuasa-Nya.",
        en: "Finally, be strong in the Lord and in his mighty power."
    },
    {
        ref: "Yosua 1:9",
        refEn: "Joshua 1:9",
        id: "Bukankah telah Kuperintahkan kepadamu: kuatkan dan teguhkanlah hatimu? Janganlah kecut dan tawar hati, sebab TUHAN, Allahmu, menyertai engkau ke mana pun engkau pergi.",
        en: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."
    },
    {
        ref: "Mazmur 28:7",
        refEn: "Psalm 28:7",
        id: "TUHAN adalah kekuatanku dan perisaiku; kepada-Nya hatiku percaya. Aku tertolong sebab itu beria-ria hatiku, dan dengan nyanyianku aku bersyukur kepada-Nya.",
        en: "The Lord is my strength and my shield; my heart trusts in him, and he helps me. My heart leaps for joy, and with my song I praise him."
    },

    // ===== IMAN / FAITH =====
    {
        ref: "Ibrani 11:1",
        refEn: "Hebrews 11:1",
        id: "Iman adalah dasar dari segala sesuatu yang kita harapkan dan bukti dari segala sesuatu yang tidak kita lihat.",
        en: "Now faith is confidence in what we hope for and assurance about what we do not see."
    },
    {
        ref: "Matius 17:20",
        refEn: "Matthew 17:20",
        id: "Yesus berkata kepada mereka: 'Karena kamu kurang percaya. Sebab Aku berkata kepadamu: Sesungguhnya sekiranya kamu mempunyai iman sebesar biji sesawi saja kamu dapat berkata kepada gunung ini: Pindah dari tempat ini ke sana, maka gunung ini akan pindah.'",
        en: "He replied, 'Because you have so little faith. Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, Move from here to there, and it will move.'"
    },
    {
        ref: "Roma 1:17",
        refEn: "Romans 1:17",
        id: "Sebab di dalamnya nyata kebenaran Allah, yang bertolak dari iman dan memimpin kepada iman, seperti ada tertulis: 'Orang benar akan hidup oleh iman.'",
        en: "For in the gospel the righteousness of God is revealed — a righteousness that is by faith from first to last, just as it is written: 'The righteous will live by faith.'"
    },
    {
        ref: "Markus 11:24",
        refEn: "Mark 11:24",
        id: "Karena itu Aku berkata kepadamu: apa saja yang kamu minta dan doakan, percayalah bahwa kamu telah menerimanya, maka hal itu akan diberikan kepadamu.",
        en: "Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours."
    },
    {
        ref: "2 Korintus 5:7",
        refEn: "2 Corinthians 5:7",
        id: "Sebab hidup kami ini adalah hidup karena percaya, bukan karena melihat.",
        en: "For we live by faith, not by sight."
    },
    {
        ref: "Ibrani 12:2",
        refEn: "Hebrews 12:2",
        id: "Marilah kita melakukannya dengan mata yang tertuju kepada Yesus, yang memimpin kita dalam iman, dan yang membawa iman kita itu kepada kesempurnaan.",
        en: "Fixing our eyes on Jesus, the pioneer and perfecter of faith."
    },

    // ===== PENGHARAPAN / HOPE =====
    {
        ref: "Roma 15:13",
        refEn: "Romans 15:13",
        id: "Semoga Allah, sumber pengharapan, memenuhi kamu dengan segala sukacita dan damai sejahtera dalam iman kamu, supaya oleh kekuatan Roh Kudus kamu berlimpah-limpah dalam pengharapan.",
        en: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit."
    },
    {
        ref: "Ratapan 3:22-23",
        refEn: "Lamentations 3:22-23",
        id: "Tak berkesudahan kasih setia TUHAN, tak habis-habisnya rahmat-Nya, selalu baru tiap pagi; besar kesetiaan-Mu!",
        en: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness."
    },
    {
        ref: "Mazmur 42:6",
        refEn: "Psalm 42:5",
        id: "Mengapa engkau tertekan, hai jiwaku, dan mengapa engkau gelisah di dalam diriku? Berharaplah kepada Allah! Sebab aku bersyukur lagi kepada-Nya, penolongku dan Allahku!",
        en: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God."
    },
    {
        ref: "Wahyu 21:4",
        refEn: "Revelation 21:4",
        id: "Dan Ia akan menghapus segala air mata dari mata mereka, dan maut tidak akan ada lagi; tidak akan ada lagi perkabungan, atau ratap tangis, atau dukacita, sebab segala sesuatu yang lama itu telah berlalu.",
        en: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away."
    },
    {
        ref: "Yohanes 11:25",
        refEn: "John 11:25",
        id: "Kata Yesus kepadanya: 'Akulah kebangkitan dan hidup; barangsiapa percaya kepada-Ku, ia akan hidup walaupun ia sudah mati.'",
        en: "Jesus said to her, 'I am the resurrection and the life. The one who believes in me will live, even though they die.'"
    },

    // ===== DOA / PRAYER =====
    {
        ref: "Filipi 4:6-7",
        refEn: "Philippians 4:6-7",
        id: "Janganlah hendaknya kamu kuatir tentang apa pun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur. Damai sejahtera Allah, yang melampaui segala akal, akan memelihara hati dan pikiranmu dalam Kristus Yesus.",
        en: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
    },
    {
        ref: "Matius 7:7-8",
        refEn: "Matthew 7:7-8",
        id: "Mintalah, maka akan diberikan kepadamu; carilah, maka kamu akan mendapat; ketuklah, maka pintu akan dibukakan bagimu. Karena setiap orang yang meminta, menerima dan setiap orang yang mencari, mendapat dan setiap orang yang mengetuk, baginya pintu dibukakan.",
        en: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you. For everyone who asks receives; the one who seeks finds; and to the one who knocks, the door will be opened."
    },
    {
        ref: "1 Yohanes 5:14",
        refEn: "1 John 5:14",
        id: "Dan inilah keberanian percaya kita kepada-Nya, yaitu bahwa Ia mengabulkan doa kita, jikalau kita meminta sesuatu kepada-Nya menurut kehendak-Nya.",
        en: "This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us."
    },
    {
        ref: "Yakobus 5:16",
        refEn: "James 5:16",
        id: "Karena itu hendaklah kamu saling mengaku dosamu dan saling mendoakan, supaya kamu sembuh. Doa orang yang benar, bila dengan yakin didoakan, sangat besar kuasanya.",
        en: "Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous person is powerful and effective."
    },
    {
        ref: "Roma 8:26",
        refEn: "Romans 8:26",
        id: "Demikian juga Roh membantu kita dalam kelemahan kita; sebab kita tidak tahu, bagaimana sebenarnya harus berdoa; tetapi Roh sendiri berdoa untuk kita kepada Allah dengan keluhan-keluhan yang tidak terucapkan.",
        en: "In the same way, the Spirit helps us in our weakness. We do not know what we ought to pray for, but the Spirit himself intercedes for us through wordless groans."
    },

    // ===== FIRMAN ALLAH / GOD'S WORD =====
    {
        ref: "Mazmur 119:105",
        refEn: "Psalm 119:105",
        id: "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku.",
        en: "Your word is a lamp for my feet, a light on my path."
    },
    {
        ref: "2 Timotius 3:16-17",
        refEn: "2 Timothy 3:16-17",
        id: "Segala tulisan yang diilhamkan Allah memang bermanfaat untuk mengajar, untuk menyatakan kesalahan, untuk memperbaiki kelakuan dan untuk mendidik orang dalam kebenaran. Dengan demikian tiap-tiap manusia kepunyaan Allah diperlengkapi untuk setiap perbuatan baik.",
        en: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work."
    },
    {
        ref: "Ibrani 4:12",
        refEn: "Hebrews 4:12",
        id: "Sebab firman Allah hidup dan kuat dan lebih tajam dari pada pedang bermata dua mana pun; ia menusuk amat dalam sampai memisahkan jiwa dan roh, sendi-sendi dan sumsum; ia sanggup membedakan pertimbangan dan pikiran hati kita.",
        en: "For the word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart."
    },
    {
        ref: "Yesaya 40:8",
        refEn: "Isaiah 40:8",
        id: "Rumput menjadi kering, bunga menjadi layu, tetapi firman Allah kita tetap untuk selama-lamanya.",
        en: "The grass withers and the flowers fall, but the word of our God endures forever."
    },
    {
        ref: "Yohanes 8:32",
        refEn: "John 8:32",
        id: "Dan kamu akan mengetahui kebenaran, dan kebenaran itu akan memerdekakan kamu.",
        en: "Then you will know the truth, and the truth will set you free."
    },

    // ===== PUJIAN & SYUKUR / PRAISE & THANKSGIVING =====
    {
        ref: "Mazmur 100:1-3",
        refEn: "Psalm 100:1-3",
        id: "Bersorak-soraklah bagi TUHAN, hai seluruh bumi! Beribadahlah kepada TUHAN dengan sukacita, datanglah ke hadapan-Nya dengan sorak-sorai! Ketahuilah, bahwa TUHANlah Allah; Dialah yang menjadikan kita.",
        en: "Shout for joy to the Lord, all the earth. Worship the Lord with gladness; come before him with joyful songs. Know that the Lord is God. It is he who made us."
    },
    {
        ref: "Mazmur 150:6",
        refEn: "Psalm 150:6",
        id: "Biarlah segala yang bernafas memuji TUHAN! Haleluya!",
        en: "Let everything that has breath praise the Lord. Praise the Lord."
    },
    {
        ref: "1 Tesalonika 5:16-18",
        refEn: "1 Thessalonians 5:16-18",
        id: "Bersukacitalah senantiasa. Tetaplah berdoa. Mengucap syukurlah dalam segala hal, sebab itulah yang dikehendaki Allah di dalam Kristus Yesus bagi kamu.",
        en: "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus."
    },
    {
        ref: "Mazmur 9:2-3",
        refEn: "Psalm 9:1-2",
        id: "Aku mau bersyukur kepada TUHAN dengan segenap hatiku, aku mau menceritakan segala perbuatan-Mu yang ajaib; aku mau bersukacita dan beria-ria karena Engkau, bermazmur bagi nama-Mu, ya Yang Mahatinggi.",
        en: "I will give thanks to you, Lord, with all my heart; I will tell of all your wonderful deeds. I will be glad and rejoice in you; I will sing the praises of your name, O Most High."
    },
    {
        ref: "Efesus 5:19-20",
        refEn: "Ephesians 5:19-20",
        id: "Berkata-katalah seorang kepada yang lain dalam mazmur, kidung puji-pujian dan nyanyian rohani. Bernyanyi dan bersoraklah bagi Tuhan dengan segenap hati. Ucapkanlah syukur senantiasa atas segala sesuatu dalam nama Tuhan kita Yesus Kristus.",
        en: "Speak to one another with psalms, hymns, and songs from the Spirit. Sing and make music from your heart to the Lord, always giving thanks to God the Father for everything, in the name of our Lord Jesus Christ."
    },
    {
        ref: "Mazmur 34:2",
        refEn: "Psalm 34:1",
        id: "Aku hendak memuji TUHAN pada segala waktu; puji-pujian kepada-Nya tetap di dalam mulutku.",
        en: "I will extol the Lord at all times; his praise will always be on my lips."
    },

    // ===== BERKAT / BLESSING =====
    {
        ref: "Bilangan 6:24-26",
        refEn: "Numbers 6:24-26",
        id: "TUHAN memberkati engkau dan melindungi engkau; TUHAN menyinari engkau dengan wajah-Nya dan memberi engkau kasih karunia; TUHAN menghadapkan wajah-Nya kepadamu dan memberi engkau damai sejahtera.",
        en: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace."
    },
    {
        ref: "Mazmur 1:1-2",
        refEn: "Psalm 1:1-2",
        id: "Berbahagialah orang yang tidak berjalan menurut nasihat orang fasik, yang tidak berdiri di jalan orang berdosa, dan yang tidak duduk dalam kumpulan pencemooh, tetapi yang kesukaannya ialah Taurat TUHAN, dan yang merenungkan Taurat itu siang dan malam.",
        en: "Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers, but whose delight is in the law of the Lord, and who meditates on his law day and night."
    },
    {
        ref: "Maleakhi 3:10",
        refEn: "Malachi 3:10",
        id: "Bawalah seluruh persembahan persepuluhan itu ke dalam rumah perbendaharaan, supaya ada persediaan makanan di rumah-Ku dan ujilah Aku, firman TUHAN semesta alam, apakah Aku tidak membukakan bagimu tingkap-tingkap langit dan mencurahkan berkat kepadamu sampai berkelimpahan.",
        en: "Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this, says the Lord Almighty, and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it."
    },
    {
        ref: "Efesus 1:3",
        refEn: "Ephesians 1:3",
        id: "Terpujilah Allah dan Bapa Tuhan kita Yesus Kristus yang dalam Kristus telah mengaruniakan kepada kita segala berkat rohani di dalam surga.",
        en: "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ."
    },

    // ===== HIKMAT / WISDOM =====
    {
        ref: "Amsal 3:5-6",
        refEn: "Proverbs 3:5-6",
        id: "Percayalah kepada TUHAN dengan segenap hatimu dan janganlah bersandar kepada pengertianmu sendiri. Akuilah Dia dalam segala lakumu, maka Ia akan meluruskan jalanmu.",
        en: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
    },
    {
        ref: "Yakobus 1:5",
        refEn: "James 1:5",
        id: "Tetapi apabila di antara kamu ada yang kekurangan hikmat, hendaklah ia memintakannya kepada Allah — yang memberikan kepada semua orang dengan murah hati dan dengan tidak membangkit-bangkit —, maka hal itu akan diberikan kepadanya.",
        en: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you."
    },
    {
        ref: "Amsal 16:9",
        refEn: "Proverbs 16:9",
        id: "Hati manusia memikir-mikirkan jalannya, tetapi TUHANlah yang menentukan arah langkahnya.",
        en: "In their hearts humans plan their course, but the Lord establishes their steps."
    },
    {
        ref: "Amsal 1:7",
        refEn: "Proverbs 1:7",
        id: "Takut akan TUHAN adalah permulaan pengetahuan, tetapi orang bodoh menghina hikmat dan didikan.",
        en: "The fear of the Lord is the beginning of wisdom, but fools despise wisdom and instruction."
    },
    {
        ref: "Kolose 3:17",
        refEn: "Colossians 3:17",
        id: "Dan segala sesuatu yang kamu lakukan dengan perkataan atau perbuatan, lakukanlah semuanya itu dalam nama Tuhan Yesus, sambil mengucap syukur oleh Dia kepada Allah, Bapa kita.",
        en: "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him."
    },

    // ===== PEMELIHARAAN ALLAH / GOD'S PROVISION =====
    {
        ref: "Matius 6:33",
        refEn: "Matthew 6:33",
        id: "Tetapi carilah dahulu Kerajaan Allah dan kebenaran-Nya, maka semuanya itu akan ditambahkan kepadamu.",
        en: "But seek first his kingdom and his righteousness, and all these things will be given to you as well."
    },
    {
        ref: "Filipi 4:19",
        refEn: "Philippians 4:19",
        id: "Allahku akan memenuhi segala keperluanmu menurut kekayaan dan kemuliaan-Nya dalam Kristus Yesus.",
        en: "And my God will meet all your needs according to the riches of his glory in Christ Jesus."
    },
    {
        ref: "Matius 6:26",
        refEn: "Matthew 6:26",
        id: "Pandanglah burung-burung di langit, yang tidak menabur dan tidak menuai dan tidak mengumpulkan bekal dalam lumbung, namun diberi makan oleh Bapamu yang di sorga. Bukankah kamu jauh melebihi burung-burung itu?",
        en: "Look at the birds of the air; they do not sow or reap or store away in barns, and yet your heavenly Father feeds them. Are you not much more valuable than they?"
    },
    {
        ref: "Mazmur 37:4",
        refEn: "Psalm 37:4",
        id: "Bergembiralah karena TUHAN; maka Ia akan memberikan kepadamu apa yang diinginkan hatimu.",
        en: "Take delight in the Lord, and he will give you the desires of your heart."
    },

    // ===== KEHADIRAN ALLAH / GOD'S PRESENCE =====
    {
        ref: "Matius 28:20",
        refEn: "Matthew 28:20",
        id: "Dan ketahuilah, Aku menyertai kamu senantiasa sampai kepada akhir zaman.",
        en: "And surely I am with you always, to the very end of the age."
    },
    {
        ref: "Mazmur 16:11",
        refEn: "Psalm 16:11",
        id: "Engkau memberitahukan kepadaku jalan kehidupan; di hadapan-Mu ada sukacita berlimpah-limpah, di tangan kanan-Mu ada nikmat senantiasa.",
        en: "You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand."
    },
    {
        ref: "Yesaya 43:2",
        refEn: "Isaiah 43:2",
        id: "Apabila engkau menyeberang melalui air, Aku akan menyertai engkau, atau melalui sungai-sungai, engkau tidak akan dihanyutkan; apabila engkau berjalan melalui api, engkau tidak akan dihanguskan, dan nyala api tidak akan membakar engkau.",
        en: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you. When you walk through the fire, you will not be burned; the flames will not set you ablaze."
    },
    {
        ref: "Kejadian 28:15",
        refEn: "Genesis 28:15",
        id: "Sesungguhnya Aku menyertai engkau dan Aku akan melindungi engkau ke mana pun engkau pergi, dan Aku akan membawa engkau kembali ke negeri ini.",
        en: "I am with you and will watch over you wherever you go, and I will bring you back to this land."
    },

    // ===== MISI & PELAYANAN / MISSION & SERVICE =====
    {
        ref: "Matius 28:18-20",
        refEn: "Matthew 28:18-20",
        id: "Dan Yesus mendekati mereka dan berkata: 'Kepada-Ku telah diberikan segala kuasa di sorga dan di bumi. Karena itu pergilah, jadikanlah semua bangsa murid-Ku... Dan ketahuilah, Aku menyertai kamu senantiasa sampai kepada akhir zaman.'",
        en: "Then Jesus came to them and said, 'All authority in heaven and on earth has been given to me. Therefore go and make disciples of all nations... And surely I am with you always, to the very end of the age.'"
    },
    {
        ref: "Markus 16:15",
        refEn: "Mark 16:15",
        id: "Lalu Ia berkata kepada mereka: 'Pergilah ke seluruh dunia, beritakanlah Injil kepada segala makhluk.'",
        en: "He said to them, 'Go into all the world and preach the gospel to all creation.'"
    },
    {
        ref: "Kisah Para Rasul 1:8",
        refEn: "Acts 1:8",
        id: "Tetapi kamu akan menerima kuasa, kalau Roh Kudus turun ke atas kamu, dan kamu akan menjadi saksi-Ku di Yerusalem dan di seluruh Yudea dan Samaria dan sampai ke ujung bumi.",
        en: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth."
    },
    {
        ref: "Yesaya 6:8",
        refEn: "Isaiah 6:8",
        id: "Lalu aku mendengar suara Tuhan berkata: 'Siapakah yang akan Kuutus, dan siapakah yang mau pergi untuk Aku?' Maka sahutku: 'Ini aku, utuslah aku!'",
        en: "Then I heard the voice of the Lord saying, 'Whom shall I send? And who will go for us?' And I said, 'Here am I. Send me!'"
    },
    {
        ref: "2 Timotius 4:2",
        refEn: "2 Timothy 4:2",
        id: "Beritakanlah firman, siap sedialah baik atau tidak baik waktunya, nyatakanlah apa yang salah, tegurlah dan nasihatilah dengan segala kesabaran dan pengajaran.",
        en: "Preach the word; be prepared in season and out of season; correct, rebuke and encourage — with great patience and careful instruction."
    },

    // ===== ROH KUDUS / HOLY SPIRIT =====
    {
        ref: "Yohanes 14:26",
        refEn: "John 14:26",
        id: "Tetapi Penghibur, yaitu Roh Kudus, yang akan diutus oleh Bapa dalam nama-Ku, Dialah yang akan mengajarkan segala sesuatu kepadamu dan akan mengingatkan kamu akan semua yang telah Kukatakan kepadamu.",
        en: "But the Advocate, the Holy Spirit, whom the Father will send in my name, will teach you all things and will remind you of everything I have said to you."
    },
    {
        ref: "Galatia 5:22-23",
        refEn: "Galatians 5:22-23",
        id: "Tetapi buah Roh ialah: kasih, sukacita, damai sejahtera, kesabaran, kemurahan, kebaikan, kesetiaan, kelemahlembutan, penguasaan diri.",
        en: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control."
    },
    {
        ref: "1 Korintus 3:16",
        refEn: "1 Corinthians 3:16",
        id: "Tidak tahukah kamu, bahwa kamu adalah bait Allah dan bahwa Roh Allah diam di dalam kamu?",
        en: "Don't you know that you yourselves are God's temple and that God's Spirit dwells in your midst?"
    },
    {
        ref: "Yohanes 16:13",
        refEn: "John 16:13",
        id: "Tetapi apabila Ia datang, yaitu Roh Kebenaran, Ia akan memimpin kamu ke dalam seluruh kebenaran.",
        en: "But when he, the Spirit of truth, comes, he will guide you into all the truth."
    },

    // ===== PENGAMPUNAN / FORGIVENESS =====
    {
        ref: "1 Yohanes 1:9",
        refEn: "1 John 1:9",
        id: "Jika kita mengaku dosa kita, maka Ia adalah setia dan adil, sehingga Ia akan mengampuni segala dosa kita dan menyucikan kita dari segala kejahatan.",
        en: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness."
    },
    {
        ref: "Mazmur 103:12",
        refEn: "Psalm 103:12",
        id: "Sejauh timur dari barat, demikian dijauhkan-Nya dari pada kita pelanggaran kita.",
        en: "As far as the east is from the west, so far has he removed our transgressions from us."
    },
    {
        ref: "Yesaya 43:25",
        refEn: "Isaiah 43:25",
        id: "Aku, Akulah Dia yang menghapus dosa pemberontakanmu oleh karena Aku sendiri, dan Aku tidak mengingat-ingat dosamu.",
        en: "I, even I, am he who blots out your transgressions, for my own sake, and remembers your sins no more."
    },
    {
        ref: "Matius 6:14",
        refEn: "Matthew 6:14",
        id: "Karena jikalau kamu mengampuni kesalahan orang, Bapamu yang di sorga akan mengampuni kamu juga.",
        en: "For if you forgive other people when they sin against you, your heavenly Father will also forgive you."
    },
    {
        ref: "Efesus 4:32",
        refEn: "Ephesians 4:32",
        id: "Tetapi hendaklah kamu ramah seorang terhadap yang lain, penuh kasih mesra dan saling mengampuni, sebagaimana Allah di dalam Kristus telah mengampuni kamu.",
        en: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you."
    },

    // ===== PERSEKUTUAN & JEMAAT / CHURCH & FELLOWSHIP =====
    {
        ref: "Matius 18:20",
        refEn: "Matthew 18:20",
        id: "Sebab di mana dua atau tiga orang berkumpul dalam nama-Ku, di situ Aku ada di tengah-tengah mereka.",
        en: "For where two or three gather in my name, there am I with them."
    },
    {
        ref: "Ibrani 10:25",
        refEn: "Hebrews 10:25",
        id: "Janganlah kita menjauhkan diri dari pertemuan-pertemuan ibadah kita, seperti dibiasakan oleh beberapa orang, tetapi marilah kita saling menasihati, dan semakin giat melakukannya menjelang hari Tuhan yang mendekat.",
        en: "Not giving up meeting together, as some are in the habit of doing, but encouraging one another — and all the more as you see the Day approaching."
    },
    {
        ref: "1 Korintus 12:27",
        refEn: "1 Corinthians 12:27",
        id: "Kamu semua adalah tubuh Kristus dan kamu masing-masing adalah anggotanya.",
        en: "Now you are the body of Christ, and each one of you is a part of it."
    },
    {
        ref: "Mazmur 133:1",
        refEn: "Psalm 133:1",
        id: "Sungguh, alangkah baiknya dan indahnya, apabila saudara-saudara diam bersama dengan rukun!",
        en: "How good and pleasant it is when God's people live together in unity!"
    },
    {
        ref: "Roma 12:10",
        refEn: "Romans 12:10",
        id: "Hendaklah kamu saling mengasihi sebagai saudara dan saling mendahului dalam memberi hormat.",
        en: "Be devoted to one another in love. Honor one another above yourselves."
    },

    // ===== KERENDAHAN HATI / HUMILITY =====
    {
        ref: "Mikha 6:8",
        refEn: "Micah 6:8",
        id: "Hai manusia, telah diberitahukan kepadamu apa yang baik. Dan apakah yang dituntut TUHAN dari padamu: selain berlaku adil, mencintai kesetiaan, dan hidup dengan rendah hati di hadapan Allahmu?",
        en: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God."
    },
    {
        ref: "Filipi 2:3-4",
        refEn: "Philippians 2:3-4",
        id: "Dengan tidak mencari kepentingan sendiri atau puji-pujian yang sia-sia. Sebaliknya hendaklah dengan rendah hati yang seorang menganggap yang lain lebih utama dari pada dirinya sendiri.",
        en: "Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves, not looking to your own interests but each of you to the interests of the others."
    },
    {
        ref: "Yakobus 4:10",
        refEn: "James 4:10",
        id: "Rendahkanlah dirimu di hadapan Tuhan, dan Ia akan meninggikan kamu.",
        en: "Humble yourselves before the Lord, and he will lift you up."
    },
    {
        ref: "1 Petrus 5:6",
        refEn: "1 Peter 5:6",
        id: "Karena itu rendahkanlah dirimu di bawah tangan Tuhan yang kuat, supaya kamu ditinggikan-Nya pada waktunya.",
        en: "Humble yourselves, therefore, under God's mighty hand, that he may lift you up in due time."
    },

    // ===== KEKUDUSAN / HOLINESS =====
    {
        ref: "Roma 12:1-2",
        refEn: "Romans 12:1-2",
        id: "Persembahkanlah tubuhmu sebagai persembahan yang hidup, yang kudus dan yang berkenan kepada Allah: itu adalah ibadahmu yang sejati. Janganlah kamu menjadi serupa dengan dunia ini, tetapi berubahlah oleh pembaharuan budimu.",
        en: "Offer your bodies as a living sacrifice, holy and pleasing to God — this is your true and proper worship. Do not conform to the pattern of this world, but be transformed by the renewing of your mind."
    },
    {
        ref: "1 Petrus 1:16",
        refEn: "1 Peter 1:16",
        id: "Sebab ada tertulis: Kuduslah kamu, sebab Aku kudus.",
        en: "For it is written: 'Be holy, because I am holy.'"
    },
    {
        ref: "Mazmur 51:12",
        refEn: "Psalm 51:10",
        id: "Jadikanlah hatiku tahir, ya Allah, dan perbaharuilah batinku dengan roh yang teguh.",
        en: "Create in me a pure heart, O God, and renew a steadfast spirit within me."
    },

    // ===== KERAJAAN ALLAH / KINGDOM OF GOD =====
    {
        ref: "Matius 5:3",
        refEn: "Matthew 5:3",
        id: "Berbahagialah orang yang miskin di hadapan Allah, karena merekalah yang empunya Kerajaan Sorga.",
        en: "Blessed are the poor in spirit, for theirs is the kingdom of heaven."
    },
    {
        ref: "Lukas 17:21",
        refEn: "Luke 17:21",
        id: "Dan orang tidak dapat mengatakan: Lihat, ia ada di sini atau ia ada di sana! Sebab sesungguhnya Kerajaan Allah ada di antara kamu.",
        en: "Nor will people say, 'Here it is,' or 'There it is,' because the kingdom of God is in your midst."
    },
    {
        ref: "Wahyu 11:15",
        refEn: "Revelation 11:15",
        id: "Kerajaan dunia ini telah menjadi Kerajaan Tuhan kita dan Kerajaan Kristus-Nya, dan Ia akan memerintah sebagai raja sampai selama-lamanya.",
        en: "The kingdom of the world has become the kingdom of our Lord and of his Messiah, and he will reign for ever and ever."
    },

    // ===== KEPERCAYAAN & KETAATAN / TRUST & OBEDIENCE =====
    {
        ref: "Amsal 3:25-26",
        refEn: "Proverbs 3:25-26",
        id: "Janganlah takut terhadap kekejutan yang tiba-tiba, atau terhadap kebinasaan orang fasik apabila ia datang. Karena TUHANlah yang akan menjadi kepercayaanmu, dan Ia akan menjaga kakimu dari jerat.",
        en: "Have no fear of sudden disaster or of the ruin that overtakes the wicked, for the Lord will be at your side and will keep your foot from being snared."
    },
    {
        ref: "Mazmur 56:4",
        refEn: "Psalm 56:3",
        id: "Waktu aku takut, aku ini percaya kepada-Mu.",
        en: "When I am afraid, I put my trust in you."
    },
    {
        ref: "Yohanes 14:1",
        refEn: "John 14:1",
        id: "Janganlah gelisah hatimu; percayalah kepada Allah, percayalah juga kepada-Ku.",
        en: "Do not let your hearts be troubled. You believe in God; believe also in me."
    },
    {
        ref: "Ulangan 31:6",
        refEn: "Deuteronomy 31:6",
        id: "Kuatkan dan teguhkanlah hatimu, janganlah takut dan jangan gemetar karena mereka, sebab TUHAN, Allahmu, Dialah yang berjalan menyertai engkau; Ia tidak akan membiarkan engkau dan tidak akan meninggalkan engkau.",
        en: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you."
    },

    // ===== HATI & PIKIRAN / HEART & MIND =====
    {
        ref: "Amsal 4:23",
        refEn: "Proverbs 4:23",
        id: "Jagalah hatimu dengan segala kewaspadaan, karena dari situlah terpancar kehidupan.",
        en: "Above all else, guard your heart, for everything you do flows from it."
    },
    {
        ref: "Kolose 3:2",
        refEn: "Colossians 3:2",
        id: "Pikirkanlah perkara-perkara yang di atas, bukan yang di bumi.",
        en: "Set your minds on things above, not on earthly things."
    },
    {
        ref: "Filipi 4:8",
        refEn: "Philippians 4:8",
        id: "Semua yang benar, semua yang mulia, semua yang adil, semua yang suci, semua yang manis, semua yang sedap didengar, semua yang disebut kebajikan dan patut dipuji, pikirkanlah semuanya itu.",
        en: "Whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable — if anything is excellent or praiseworthy — think about such things."
    },
    {
        ref: "Mazmur 26:2",
        refEn: "Psalm 26:2",
        id: "Ujilah aku, TUHAN, dan cobalah aku; selidikilah batinku dan hatiku.",
        en: "Test me, Lord, and try me, examine my heart and my mind."
    },

    // ===== PERNIKAHAN & KELUARGA / MARRIAGE & FAMILY =====
    {
        ref: "Kejadian 2:24",
        refEn: "Genesis 2:24",
        id: "Sebab itu seorang laki-laki akan meninggalkan ayahnya dan ibunya dan bersatu dengan isterinya, sehingga keduanya menjadi satu daging.",
        en: "That is why a man leaves his father and mother and is united to his wife, and they become one flesh."
    },
    {
        ref: "Amsal 31:25",
        refEn: "Proverbs 31:25",
        id: "Pakaiannya adalah kekuatan dan kemuliaan, ia tertawa tentang hari depan.",
        en: "She is clothed with strength and dignity; she can laugh at the days to come."
    },
    {
        ref: "Efesus 6:1-2",
        refEn: "Ephesians 6:1-2",
        id: "Hai anak-anak, taatilah orang tuamu di dalam Tuhan, karena haruslah demikian. Hormatilah ayahmu dan ibumu — ini adalah suatu perintah yang penting.",
        en: "Children, obey your parents in the Lord, for this is right. Honor your father and mother — which is the first commandment with a promise."
    },

    // ===== PEMURIDAN / DISCIPLESHIP =====
    {
        ref: "Lukas 9:23",
        refEn: "Luke 9:23",
        id: "Kata-Nya kepada mereka semua: 'Setiap orang yang mau mengikut Aku, ia harus menyangkal dirinya, memikul salibnya setiap hari dan mengikut Aku.'",
        en: "Then he said to them all: 'Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me.'"
    },
    {
        ref: "Yohanes 15:5",
        refEn: "John 15:5",
        id: "Akulah pokok anggur dan kamulah ranting-rantingnya. Barangsiapa tinggal di dalam Aku dan Aku di dalam dia, ia berbuah banyak, sebab di luar Aku kamu tidak dapat berbuat apa-apa.",
        en: "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing."
    },
    {
        ref: "Yohanes 8:31",
        refEn: "John 8:31",
        id: "Maka kata-Nya kepada orang-orang Yahudi yang telah percaya kepada-Nya: 'Jikalau kamu tetap dalam firman-Ku, kamu benar-benar adalah murid-Ku.'",
        en: "To the Jews who had believed him, Jesus said, 'If you hold to my teaching, you are really my disciples.'"
    },

    // ===== DAMAI & REKONSILIASI / PEACE & RECONCILIATION =====
    {
        ref: "Matius 5:9",
        refEn: "Matthew 5:9",
        id: "Berbahagialah orang yang membawa damai, karena mereka akan disebut anak-anak Allah.",
        en: "Blessed are the peacemakers, for they will be called children of God."
    },
    {
        ref: "Roma 5:1",
        refEn: "Romans 5:1",
        id: "Sebab itu, kita yang dibenarkan karena iman, kita hidup dalam damai sejahtera dengan Allah oleh karena Tuhan kita, Yesus Kristus.",
        en: "Therefore, since we have been justified through faith, we have peace with God through our Lord Jesus Christ."
    },
    {
        ref: "Kolose 3:15",
        refEn: "Colossians 3:15",
        id: "Hendaklah damai sejahtera Kristus memerintah dalam hatimu, karena untuk itulah kamu telah dipanggil menjadi satu tubuh. Dan bersyukurlah.",
        en: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful."
    },

    // ===== KETABAHAN / PERSEVERANCE =====
    {
        ref: "Yakobus 1:2-4",
        refEn: "James 1:2-4",
        id: "Saudara-saudaraku, anggaplah sebagai suatu kebahagiaan, apabila kamu jatuh ke dalam berbagai-bagai pencobaan, sebab kamu tahu, bahwa ujian terhadap imanmu itu menghasilkan ketekunan. Dan biarkanlah ketekunan itu memperoleh buah yang matang, supaya kamu menjadi sempurna dan utuh.",
        en: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete."
    },
    {
        ref: "1 Korintus 10:13",
        refEn: "1 Corinthians 10:13",
        id: "Pencobaan-pencobaan yang kamu alami ialah pencobaan-pencobaan biasa, yang tidak melebihi kekuatan manusia. Sebab Allah setia dan karena itu Ia tidak akan membiarkan kamu dicobai melampaui kekuatanmu.",
        en: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear."
    },
    {
        ref: "Wahyu 2:10",
        refEn: "Revelation 2:10",
        id: "Hendaklah engkau setia sampai mati, dan Aku akan mengaruniakan kepadamu mahkota kehidupan.",
        en: "Be faithful, even to the point of death, and I will give you life as your victor's crown."
    },
    {
        ref: "Galatia 6:9",
        refEn: "Galatians 6:9",
        id: "Janganlah kita jemu-jemu berbuat baik, karena apabila sudah datang waktunya, kita akan menuai, jika kita tidak menjadi lemah.",
        en: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up."
    },
    {
        ref: "Ibrani 12:1",
        refEn: "Hebrews 12:1",
        id: "Karena itu, kita yang dikelilingi oleh begitu besar awan saksi, marilah kita menanggalkan semua beban dan dosa yang begitu merintangi kita, dan berlomba dengan tekun dalam perlombaan yang diwajibkan bagi kita.",
        en: "Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. And let us run with perseverance the race marked out for us."
    },

    // ===== TUJUAN HIDUP / PURPOSE OF LIFE =====
    {
        ref: "Mazmur 16:8",
        refEn: "Psalm 16:8",
        id: "Aku senantiasa memandang kepada TUHAN; karena Ia berdiri di sebelah kananku, aku tidak goyah.",
        en: "I keep my eyes always on the Lord. With him at my right hand, I will not be shaken."
    },
    {
        ref: "1 Korintus 10:31",
        refEn: "1 Corinthians 10:31",
        id: "Aku menjawab: Jika engkau makan atau jika engkau minum, atau jika engkau melakukan sesuatu yang lain, lakukanlah semuanya itu untuk kemuliaan Allah.",
        en: "So whether you eat or drink or whatever you do, do it all for the glory of God."
    },
    {
        ref: "Pengkhotbah 12:13",
        refEn: "Ecclesiastes 12:13",
        id: "Akhir kata dari segala yang didengar ialah: takutlah akan Allah dan berpeganglah pada perintah-perintah-Nya, karena ini adalah kewajiban setiap orang.",
        en: "Now all has been heard; here is the conclusion of the matter: Fear God and keep his commandments, for this is the duty of all mankind."
    },

    // ===== CIPTAAN / CREATION =====
    {
        ref: "Kejadian 1:1",
        refEn: "Genesis 1:1",
        id: "Pada mulanya Allah menciptakan langit dan bumi.",
        en: "In the beginning God created the heavens and the earth."
    },
    {
        ref: "Mazmur 19:2",
        refEn: "Psalm 19:1",
        id: "Langit menceritakan kemuliaan Allah, dan cakrawala memberitakan pekerjaan tangan-Nya.",
        en: "The heavens declare the glory of God; the skies proclaim the work of his hands."
    },

    // ===== KESAKSIAN / TESTIMONY =====
    {
        ref: "Mazmur 107:2",
        refEn: "Psalm 107:2",
        id: "Biarlah orang-orang yang ditebus TUHAN mengatakannya, orang-orang yang telah ditebus-Nya dari kuasa yang menyesakkan.",
        en: "Let the redeemed of the Lord tell their story — those he redeemed from the hand of the foe."
    },
    {
        ref: "Wahyu 12:11",
        refEn: "Revelation 12:11",
        id: "Dan mereka mengalahkan dia oleh darah Anak Domba, dan oleh perkataan kesaksian mereka. Karena mereka tidak mengasihi nyawa mereka sampai ke dalam maut.",
        en: "They triumphed over him by the blood of the Lamb and by the word of their testimony; they did not love their lives so much as to shrink from death."
    },

    // ===== KRISTUS / CHRIST =====
    {
        ref: "Yohanes 10:10",
        refEn: "John 10:10",
        id: "Aku datang, supaya mereka mempunyai hidup, dan mempunyainya dalam segala kelimpahan.",
        en: "I have come that they may have life, and have it to the full."
    },
    {
        ref: "Kolose 1:17",
        refEn: "Colossians 1:17",
        id: "Ia ada terlebih dahulu dari segala sesuatu dan segala sesuatu ada di dalam Dia.",
        en: "He is before all things, and in him all things hold together."
    },
    {
        ref: "Yohanes 20:31",
        refEn: "John 20:31",
        id: "Tetapi semua yang tercantum di sini telah dicatat, supaya kamu percaya, bahwa Yesuslah Mesias, Anak Allah, dan supaya kamu oleh imanmu memperoleh hidup dalam nama-Nya.",
        en: "But these are written that you may believe that Jesus is the Messiah, the Son of God, and that by believing you may have life in his name."
    },
    {
        ref: "Filipi 2:10-11",
        refEn: "Philippians 2:10-11",
        id: "Supaya dalam nama Yesus bertekuk lutut segala yang ada di langit dan yang ada di atas bumi dan yang ada di bawah bumi, dan segala lidah mengaku: Yesus Kristus adalah Tuhan, bagi kemuliaan Allah, Bapa!",
        en: "That at the name of Jesus every knee should bow, in heaven and on earth and under the earth, and every tongue acknowledge that Jesus Christ is Lord, to the glory of God the Father."
    },
    {
        ref: "Mazmur 95:1-2",
        refEn: "Psalm 95:1-2",
        id: "Marilah kita bersorak-sorai untuk TUHAN, dan bersorak bagi gunung batu keselamatan kita. Biarlah kita menghadap wajah-Nya dengan nyanyian syukur, bersorak bagi-Nya dengan nyanyian mazmur.",
        en: "Come, let us sing for joy to the Lord; let us shout aloud to the Rock of our salvation. Let us come before him with thanksgiving and extol him with music and song."
    },
    {
        ref: "Yohanes 3:36",
        refEn: "John 3:36",
        id: "Barangsiapa percaya kepada Anak, ia beroleh hidup yang kekal, tetapi barangsiapa tidak taat kepada Anak, ia tidak akan melihat hidup, melainkan murka Allah tetap ada di atasnya.",
        en: "Whoever believes in the Son has eternal life, but whoever rejects the Son will not see life, for God's wrath remains on them."
    },
    {
        ref: "Kolose 2:9-10",
        refEn: "Colossians 2:9-10",
        id: "Sebab dalam Dialah berdiam secara jasmaniah seluruh kepenuhan ke-Allahan, dan kamu telah dipenuhi di dalam Dia. Dialah kepala semua pemerintah dan penguasa.",
        en: "For in Christ all the fullness of the Deity lives in bodily form, and in Christ you have been brought to fullness. He is the head over every power and authority."
    },

    // ===== KEBESARAN YESUS / THE GREATNESS OF JESUS =====
    {
        ref: "Yohanes 1:1-3",
        refEn: "John 1:1-3",
        id: "Pada mulanya adalah Firman; Firman itu bersama-sama dengan Allah dan Firman itu adalah Allah. Ia pada mulanya bersama-sama dengan Allah. Segala sesuatu dijadikan oleh Dia dan tanpa Dia tidak ada suatu pun yang telah jadi dari segala yang telah dijadikan.",
        en: "In the beginning was the Word, and the Word was with God, and the Word was God. He was with God in the beginning. Through him all things were made; without him nothing was made that has been made."
    },
    {
        ref: "Yohanes 1:14",
        refEn: "John 1:14",
        id: "Firman itu telah menjadi manusia, dan diam di antara kita, dan kita telah melihat kemuliaan-Nya, yaitu kemuliaan yang diberikan kepada-Nya sebagai Anak Tunggal Bapa, penuh kasih karunia dan kebenaran.",
        en: "The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth."
    },
    {
        ref: "Ibrani 1:3",
        refEn: "Hebrews 1:3",
        id: "Ia adalah cahaya kemuliaan Allah dan gambar wujud Allah dan menopang segala yang ada dengan firman-Nya yang penuh kekuasaan. Dan setelah Ia selesai mengadakan penyucian dosa, Ia duduk di sebelah kanan Yang Mahabesar, di tempat yang tinggi.",
        en: "The Son is the radiance of God's glory and the exact representation of his being, sustaining all things by his powerful word. After he had provided purification for sins, he sat down at the right hand of the Majesty in heaven."
    },
    {
        ref: "Kolose 1:15-16",
        refEn: "Colossians 1:15-16",
        id: "Ia adalah gambar Allah yang tidak kelihatan, yang sulung, lebih utama dari segala yang diciptakan. Karena di dalam Dialah telah diciptakan segala sesuatu, yang ada di sorga dan yang ada di bumi, yang kelihatan dan yang tidak kelihatan.",
        en: "The Son is the image of the invisible God, the firstborn over all creation. For in him all things were created: things in heaven and on earth, visible and invisible."
    },
    {
        ref: "Yohanes 8:58",
        refEn: "John 8:58",
        id: "Kata Yesus kepada mereka: 'Aku berkata kepadamu, sesungguhnya sebelum Abraham jadi, Aku telah ada.'",
        en: "Very truly I tell you, Jesus answered, before Abraham was born, I am!"
    },
    {
        ref: "Efesus 1:20-22",
        refEn: "Ephesians 1:20-22",
        id: "Allah membangkitkan Kristus dari antara orang mati dan mendudukkan Dia di sebelah kanan-Nya di sorga, jauh lebih tinggi dari semua pemerintah dan penguasa dan kekuasaan dan kerajaan... Segala sesuatu telah Ia taklukkan di bawah kaki Kristus.",
        en: "He exerted when he raised Christ from the dead and seated him at his right hand in the heavenly realms, far above all rule and authority, power and dominion... God placed all things under his feet."
    },
    {
        ref: "Wahyu 1:8",
        refEn: "Revelation 1:8",
        id: "'Aku adalah Alfa dan Omega,' firman Tuhan Allah, yang ada dan yang sudah ada dan yang akan datang, Yang Mahakuasa.",
        en: "'I am the Alpha and the Omega,' says the Lord God, 'who is, and who was, and who is to come, the Almighty.'"
    },
    {
        ref: "Yohanes 10:30",
        refEn: "John 10:30",
        id: "Aku dan Bapa adalah satu.",
        en: "I and the Father are one."
    },
    {
        ref: "Matius 16:16",
        refEn: "Matthew 16:16",
        id: "Maka jawab Simon Petrus: 'Engkau adalah Mesias, Anak Allah yang hidup!'",
        en: "Simon Peter answered, 'You are the Messiah, the Son of the living God.'"
    },
    {
        ref: "Yohanes 20:28",
        refEn: "John 20:28",
        id: "Tomas menjawab Dia: 'Ya Tuhanku dan Allahku!'",
        en: "Thomas said to him, 'My Lord and my God!'"
    },
    {
        ref: "Wahyu 5:12",
        refEn: "Revelation 5:12",
        id: "Mereka berseru dengan suara nyaring: 'Anak Domba yang disembelih itu layak untuk menerima kuasa, dan kekayaan, dan hikmat, dan kekuatan, dan hormat, dan kemuliaan, dan puji-pujian!'",
        en: "In a loud voice they were saying: 'Worthy is the Lamb, who was slain, to receive power and wealth and wisdom and strength and honor and glory and praise!'"
    },
    {
        ref: "Ibrani 13:8",
        refEn: "Hebrews 13:8",
        id: "Yesus Kristus tetap sama, baik kemarin maupun hari ini dan sampai selama-lamanya.",
        en: "Jesus Christ is the same yesterday and today and forever."
    },
    {
        ref: "Yesaya 9:6",
        refEn: "Isaiah 9:6",
        id: "Karena seorang anak telah lahir untuk kita, seorang putera telah diberikan untuk kita; lambang pemerintahan ada di atas bahunya, dan namanya disebutkan orang: Penasihat Ajaib, Allah yang Perkasa, Bapa yang Kekal, Raja Damai.",
        en: "For to us a child is born, to us a son is given, and the government will be on his shoulders. And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace."
    },
    {
        ref: "Mazmur 2:7-8",
        refEn: "Psalm 2:7-8",
        id: "Aku mau menceritakan tentang ketetapan TUHAN; Ia berkata kepadaku: 'Anak-Ku engkau! Engkau telah Kuperanakkan pada hari ini. Mintalah kepada-Ku, maka bangsa-bangsa akan Kuberikan kepadamu menjadi milik pusakamu, dan ujung bumi menjadi kepunyaanmu.'",
        en: "I will proclaim the Lord's decree: He said to me, 'You are my son; today I have become your father. Ask me, and I will make the nations your inheritance, the ends of the earth your possession.'"
    },
    {
        ref: "Yohanes 5:26",
        refEn: "John 5:26",
        id: "Sebab sama seperti Bapa mempunyai hidup dalam diri-Nya sendiri, demikian juga diberikan-Nya Anak mempunyai hidup dalam diri-Nya sendiri.",
        en: "For as the Father has life in himself, so he has granted the Son also to have life in himself."
    },
    {
        ref: "Kolose 2:3",
        refEn: "Colossians 2:3",
        id: "Sebab di dalam Dialah tersembunyi segala harta hikmat dan pengetahuan.",
        en: "In whom are hidden all the treasures of wisdom and knowledge."
    },
    {
        ref: "Wahyu 19:16",
        refEn: "Revelation 19:16",
        id: "Dan pada jubah-Nya dan paha-Nya tertulis suatu nama, yaitu: Raja segala raja dan Tuan di atas segala tuan.",
        en: "On his robe and on his thigh he has this name written: King of kings and Lord of lords."
    },
    {
        ref: "Matius 28:18",
        refEn: "Matthew 28:18",
        id: "Yesus mendekati mereka dan berkata: 'Kepada-Ku telah diberikan segala kuasa di sorga dan di bumi.'",
        en: "Then Jesus came to them and said, 'All authority in heaven and on earth has been given to me.'"
    },
    {
        ref: "1 Timotius 2:5",
        refEn: "1 Timothy 2:5",
        id: "Karena Allah itu esa dan esa pula Dia yang menjadi pengantara antara Allah dan manusia, yaitu manusia Kristus Yesus.",
        en: "For there is one God and one mediator between God and mankind, the man Christ Jesus."
    },
    {
        ref: "Yohanes 11:43-44",
        refEn: "John 11:43-44",
        id: "Dan sesudah berkata demikian, berserulah Ia dengan suara keras: 'Lazarus, marilah ke luar!' Orang yang telah mati itu datang ke luar.",
        en: "When he had said this, Jesus called in a loud voice, 'Lazarus, come out!' The dead man came out."
    },

    // ===== KARYA SALIB / THE CROSS =====
    {
        ref: "Yesaya 53:5",
        refEn: "Isaiah 53:5",
        id: "Tetapi dia tertikam oleh karena pemberontakan kita, dia diremukkan oleh karena kejahatan kita; ganjaran yang mendatangkan keselamatan bagi kita ditimpakan kepadanya, dan oleh bilur-bilurnya kita menjadi sembuh.",
        en: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed."
    },
    {
        ref: "Yesaya 53:3",
        refEn: "Isaiah 53:3",
        id: "Ia dihina dan dihindari orang, seorang yang penuh kesengsaraan dan yang biasa menderita kesakitan; ia sangat dihina, sehingga orang menutup mukanya terhadap dia dan bagi kita pun dia tidak masuk hitungan.",
        en: "He was despised and rejected by mankind, a man of suffering, and familiar with pain. Like one from whom people hide their faces he was despised, and we held him in low esteem."
    },
    {
        ref: "Yohanes 19:30",
        refEn: "John 19:30",
        id: "Sesudah Yesus meminum anggur asam itu, berkatalah Ia: 'Sudah selesai.' Lalu Ia menundukkan kepala-Nya dan menyerahkan nyawa-Nya.",
        en: "When he had received the drink, Jesus said, 'It is finished.' And he bowed his head and gave up his spirit."
    },
    {
        ref: "1 Petrus 2:24",
        refEn: "1 Peter 2:24",
        id: "Ia sendiri telah memikul dosa kita di dalam tubuh-Nya di kayu salib, supaya kita, yang telah mati terhadap dosa, hidup untuk kebenaran. Oleh bilur-bilur-Nya kamu telah sembuh.",
        en: "He himself bore our sins in his body on the cross, so that we might die to sins and live for righteousness; by his wounds you have been healed."
    },
    {
        ref: "Galatia 2:20",
        refEn: "Galatians 2:20",
        id: "Namun aku hidup, tetapi bukan lagi aku sendiri yang hidup, melainkan Kristus yang hidup di dalam aku. Dan hidupku yang kuhidupi sekarang di dalam daging, adalah hidup oleh iman dalam Anak Allah yang telah mengasihi aku dan menyerahkan diri-Nya untuk aku.",
        en: "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me."
    },
    {
        ref: "Kolose 1:19-20",
        refEn: "Colossians 1:19-20",
        id: "Karena seluruh kepenuhan Allah berkenan diam di dalam Dia, dan oleh Dialah Ia memperdamaikan segala sesuatu dengan diri-Nya, baik yang ada di bumi, maupun yang ada di sorga, sesudah Ia mengadakan pendamaian oleh darah salib Kristus.",
        en: "For God was pleased to have all his fullness dwell in him, and through him to reconcile to himself all things, whether things on earth or things in heaven, by making peace through his blood, shed on the cross."
    },
    {
        ref: "1 Korintus 1:18",
        refEn: "1 Corinthians 1:18",
        id: "Sebab pemberitaan tentang salib memang adalah kebodohan bagi mereka yang akan binasa, tetapi bagi kita yang diselamatkan pemberitaan itu adalah kekuatan Allah.",
        en: "For the message of the cross is foolishness to those who are perishing, but to us who are being saved it is the power of God."
    },
    {
        ref: "Roma 5:6",
        refEn: "Romans 5:6",
        id: "Karena waktu kita masih lemah, Kristus telah mati untuk kita orang-orang durhaka pada waktu yang ditentukan oleh Allah.",
        en: "You see, at just the right time, when we were still powerless, Christ died for the ungodly."
    },
    {
        ref: "Matius 27:54",
        refEn: "Matthew 27:54",
        id: "Ketika kepala pasukan dan prajurit-prajurit yang bersamanya yang menjaga Yesus melihat gempa bumi dan apa yang terjadi itu, sangat ketakutanlah mereka dan berkata: 'Sungguh, Ia ini adalah Anak Allah.'",
        en: "When the centurion and those with him who were guarding Jesus saw the earthquake and all that had happened, they were terrified, and exclaimed, 'Surely he was the Son of God!'"
    },

    // ===== KEBANGKITAN / RESURRECTION =====
    {
        ref: "1 Korintus 15:3-4",
        refEn: "1 Corinthians 15:3-4",
        id: "Sebab yang sangat penting telah kusampaikan kepadamu, yaitu apa yang telah kuterima sendiri, ialah bahwa Kristus telah mati karena dosa-dosa kita, sesuai dengan Kitab Suci, bahwa Ia telah dikuburkan, dan bahwa Ia telah dibangkitkan, pada hari yang ketiga, sesuai dengan Kitab Suci.",
        en: "For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures."
    },
    {
        ref: "1 Korintus 15:20",
        refEn: "1 Corinthians 15:20",
        id: "Tetapi yang benar ialah, bahwa Kristus telah dibangkitkan dari antara orang mati, sebagai yang sulung dari orang-orang yang telah meninggal.",
        en: "But Christ has indeed been raised from the dead, the firstfruits of those who have fallen asleep."
    },
    {
        ref: "Wahyu 1:17-18",
        refEn: "Revelation 1:17-18",
        id: "Lalu Ia meletakkan tangan kanan-Nya di atasku, sambil berkata: 'Jangan takut! Aku adalah Yang Awal dan Yang Akhir, dan Yang Hidup. Aku telah mati, namun lihatlah, Aku hidup, sampai selama-lamanya dan Aku memegang segala kunci maut dan kerajaan maut.'",
        en: "He placed his right hand on me and said: 'Do not be afraid. I am the First and the Last. I am the Living One; I was dead, and now look, I am alive for ever and ever! And I hold the keys of death and Hades.'"
    },
    {
        ref: "Roma 6:9",
        refEn: "Romans 6:9",
        id: "Karena kita tahu, bahwa Kristus, sesudah Ia bangkit dari antara orang mati, tidak mati lagi: maut tidak berkuasa lagi atas Dia.",
        en: "For we know that since Christ was raised from the dead, he cannot die again; death no longer has mastery over him."
    },
    {
        ref: "Lukas 24:34",
        refEn: "Luke 24:34",
        id: "Tuhan sungguh-sungguh telah bangkit dan telah menampakkan diri kepada Simon.",
        en: "It is true! The Lord has risen and has appeared to Simon."
    },
    {
        ref: "1 Korintus 15:55-57",
        refEn: "1 Corinthians 15:55-57",
        id: "Hai maut di manakah kemenanganmu? Hai maut, di manakah sengatmu? ... Syukur kepada Allah, yang telah memberikan kepada kita kemenangan oleh Yesus Kristus, Tuhan kita.",
        en: "Where, O death, is your victory? Where, O death, is your sting? ... But thanks be to God! He gives us the victory through our Lord Jesus Christ."
    },

    // ===== NAMA YESUS / THE NAME OF JESUS =====
    {
        ref: "Kisah Para Rasul 3:6",
        refEn: "Acts 3:6",
        id: "Tetapi Petrus berkata: 'Emas dan perak tidak ada padaku, tetapi apa yang kupunyai, kuberikan kepadamu: Demi nama Yesus Kristus, orang Nazaret itu, berjalanlah!'",
        en: "Then Peter said, 'Silver or gold I do not have, but what I do have I give you. In the name of Jesus Christ of Nazareth, walk!'"
    },
    {
        ref: "Yohanes 14:13-14",
        refEn: "John 14:13-14",
        id: "Dan apa juga yang kamu minta dalam nama-Ku, Aku akan melakukannya, supaya Bapa dipermuliakan di dalam Anak. Jika kamu meminta sesuatu kepada-Ku dalam nama-Ku, Aku akan melakukannya.",
        en: "And I will do whatever you ask in my name, so that the Father may be glorified in the Son. You may ask me for anything in my name, and I will do it."
    },
    {
        ref: "Kisah Para Rasul 2:21",
        refEn: "Acts 2:21",
        id: "Dan barangsiapa yang berseru kepada nama Tuhan akan diselamatkan.",
        en: "And everyone who calls on the name of the Lord will be saved."
    },
    {
        ref: "Yohanes 2:23",
        refEn: "John 2:23",
        id: "Dan sementara Ia di Yerusalem selama hari raya Paskah, banyak orang percaya dalam nama-Nya, karena mereka telah melihat tanda-tanda yang diadakan-Nya.",
        en: "Now while he was in Jerusalem at the Passover Festival, many people saw the signs he was performing and believed in his name."
    },
    {
        ref: "Kisah Para Rasul 10:43",
        refEn: "Acts 10:43",
        id: "Tentang Dialah semua nabi bersaksi, bahwa barangsiapa percaya kepada-Nya, ia akan mendapat pengampunan dosa oleh karena nama-Nya.",
        en: "All the prophets testify about him that everyone who believes in him receives forgiveness of sins through his name."
    },

    // ===== YESUS MEMANGGIL / JESUS CALLS =====
    {
        ref: "Wahyu 3:20",
        refEn: "Revelation 3:20",
        id: "Lihat, Aku berdiri di muka pintu dan mengetok; jikalau ada orang yang mendengar suara-Ku dan membukakan pintu, Aku akan masuk mendapatkannya dan Aku makan bersama-sama dengan dia, dan ia bersama-sama dengan Aku.",
        en: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me."
    },
    {
        ref: "Yohanes 6:37",
        refEn: "John 6:37",
        id: "Semua yang diberikan Bapa kepada-Ku akan datang kepada-Ku, dan barangsiapa datang kepada-Ku, ia tidak akan Kubuang.",
        en: "All those the Father gives me will come to me, and whoever comes to me I will never drive away."
    },
    {
        ref: "Yohanes 7:37",
        refEn: "John 7:37",
        id: "Pada hari terakhir, yaitu pada puncak perayaan itu, Yesus berdiri dan berseru: 'Barangsiapa haus, baiklah ia datang kepada-Ku dan minum!'",
        en: "On the last and greatest day of the festival, Jesus stood and said in a loud voice, 'Let anyone who is thirsty come to me and drink.'"
    },
    {
        ref: "Lukas 4:18",
        refEn: "Luke 4:18",
        id: "Roh Tuhan ada pada-Ku, oleh sebab Ia telah mengurapi Aku, untuk menyampaikan kabar baik kepada orang-orang miskin; dan Ia telah mengutus Aku untuk memberitakan pembebasan kepada orang-orang tawanan, dan penglihatan bagi orang-orang buta.",
        en: "The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor. He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind."
    },
    {
        ref: "Matius 11:28",
        refEn: "Matthew 11:28",
        id: "Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, Aku akan memberi kelegaan kepadamu.",
        en: "Come to me, all you who are weary and burdened, and I will give you rest."
    },
    {
        ref: "Yohanes 6:35",
        refEn: "John 6:35",
        id: "Kata Yesus kepada mereka: 'Akulah roti hidup; barangsiapa datang kepada-Ku, ia tidak akan lapar lagi, dan barangsiapa percaya kepada-Ku, ia tidak akan haus lagi.'",
        en: "Then Jesus declared, 'I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.'"
    },
    {
        ref: "Lukas 5:32",
        refEn: "Luke 5:32",
        id: "Aku datang bukan untuk memanggil orang benar, tetapi orang berdosa, supaya mereka bertobat.",
        en: "I have not come to call the righteous, but sinners to repentance."
    },

    // ===== KUASA YESUS / THE POWER OF JESUS =====
    {
        ref: "Markus 4:39",
        refEn: "Mark 4:39",
        id: "Ia pun bangun, menghardik angin itu dan berkata kepada danau itu: 'Diam! Tenanglah!' Lalu angin itu reda dan danau itu menjadi teduh sekali.",
        en: "He got up, rebuked the wind and said to the waves, 'Quiet! Be still!' Then the wind died down and it was completely calm."
    },
    {
        ref: "Lukas 10:19",
        refEn: "Luke 10:19",
        id: "Sesungguhnya Aku telah memberikan kuasa kepada kamu untuk menginjak ular dan kalajengking dan kuasa untuk mengatasi kekuatan musuh, sehingga tidak ada yang akan membahayakan kamu.",
        en: "I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy; nothing will harm you."
    },
    {
        ref: "Yohanes 11:25-26",
        refEn: "John 11:25-26",
        id: "Kata Yesus kepadanya: 'Akulah kebangkitan dan hidup; barangsiapa percaya kepada-Ku, ia akan hidup walaupun ia sudah mati, dan setiap orang yang hidup dan yang percaya kepada-Ku, tidak akan mati selama-lamanya.'",
        en: "Jesus said to her, 'I am the resurrection and the life. The one who believes in me will live, even though they die; and whoever lives by believing in me will never die.'"
    },
    {
        ref: "Markus 16:17-18",
        refEn: "Mark 16:17-18",
        id: "Tanda-tanda ini akan menyertai orang-orang yang percaya: mereka akan mengusir setan-setan demi nama-Ku, mereka akan berbicara dalam bahasa-bahasa yang baru bagi mereka... dan mereka akan meletakkan tangannya atas orang sakit, dan orang itu akan sembuh.",
        en: "And these signs will accompany those who believe: In my name they will drive out demons... they will place their hands on sick people, and they will get well."
    },
    {
        ref: "Kisah Para Rasul 10:38",
        refEn: "Acts 10:38",
        id: "Yaitu tentang Yesus dari Nazaret: bagaimana Allah mengurapi Dia dengan Roh Kudus dan kuat kuasa, Dia, yang berjalan berkeliling sambil berbuat baik dan menyembuhkan semua orang yang dikuasai Iblis, sebab Allah menyertai Dia.",
        en: "How God anointed Jesus of Nazareth with the Holy Spirit and power, and how he went around doing good and healing all who were under the power of the devil, because God was with him."
    },

    // ===== YESUS SATU-SATUNYA JALAN / JESUS THE ONLY WAY =====
    {
        ref: "Yohanes 10:9",
        refEn: "John 10:9",
        id: "Akulah pintu; barangsiapa masuk melalui Aku, ia akan selamat dan ia akan masuk dan keluar dan menemukan padang rumput.",
        en: "I am the gate; whoever enters through me will be saved. They will come in and go out, and find pasture."
    },
    {
        ref: "Yohanes 10:11",
        refEn: "John 10:11",
        id: "Akulah gembala yang baik. Gembala yang baik memberikan nyawanya bagi domba-dombanya.",
        en: "I am the good shepherd. The good shepherd lays down his life for the sheep."
    },
    {
        ref: "Yohanes 8:12",
        refEn: "John 8:12",
        id: "Maka Yesus berkata pula kepada orang banyak, kata-Nya: 'Akulah terang dunia; barangsiapa mengikut Aku, ia tidak akan berjalan dalam kegelapan, melainkan ia akan mempunyai terang hidup.'",
        en: "When Jesus spoke again to the people, he said, 'I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.'"
    },
    {
        ref: "Yohanes 4:42",
        refEn: "John 4:42",
        id: "Lalu mereka berkata kepada perempuan itu: 'Kami percaya, tetapi bukan lagi karena apa yang kaukatakan, sebab kami sendiri telah mendengar Dia dan kami tahu, bahwa Dialah benar-benar Juruselamat dunia.'",
        en: "They said to the woman, 'We no longer believe just because of what you said; now we have heard for ourselves, and we know that this man really is the Savior of the world.'"
    },
    {
        ref: "Lukas 2:11",
        refEn: "Luke 2:11",
        id: "Hari ini telah lahir bagimu Juruselamat, yaitu Kristus, Tuhan, di kota Daud.",
        en: "Today in the town of David a Savior has been born to you; he is the Messiah, the Lord."
    },
    {
        ref: "Kisah Para Rasul 17:30-31",
        refEn: "Acts 17:30-31",
        id: "Dengan tidak memandang lagi zaman kebodohan, sekarang Allah memberitakan kepada manusia, bahwa di mana-mana semua mereka harus bertobat. Karena Ia telah menetapkan suatu hari, pada waktu mana Ia dengan adil akan menghakimi dunia oleh seorang yang telah ditentukan-Nya.",
        en: "In the past God overlooked such ignorance, but now he commands all people everywhere to repent. For he has set a day when he will judge the world with justice by the man he has appointed."
    },
    {
        ref: "Yohanes 12:32",
        refEn: "John 12:32",
        id: "Dan Aku, apabila Aku ditinggikan dari bumi, Aku akan menarik semua orang datang kepada-Ku.",
        en: "And I, when I am lifted up from the earth, will draw all people to myself."
    },
    {
        ref: "Yohanes 12:46",
        refEn: "John 12:46",
        id: "Aku telah datang ke dalam dunia sebagai terang, supaya setiap orang yang percaya kepada-Ku, jangan tinggal di dalam kegelapan.",
        en: "I have come into the world as a light, so that no one who believes in me should stay in darkness."
    },
    {
        ref: "Lukas 15:24",
        refEn: "Luke 15:24",
        id: "Sebab anakku ini telah mati dan menjadi hidup kembali, ia telah hilang dan didapat kembali. Maka mulailah mereka bersukaria.",
        en: "For this son of mine was dead and is alive again; he was lost and is found. So they began to celebrate."
    },
    {
        ref: "Yohanes 3:17",
        refEn: "John 3:17",
        id: "Sebab Allah mengutus Anak-Nya ke dalam dunia bukan untuk menghakimi dunia, melainkan untuk menyelamatkannya oleh Dia.",
        en: "For God did not send his Son into the world to condemn the world, but to save the world through him."
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
