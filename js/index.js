const finalText = "CUET CSE-24 signed in...";
const textElement = document.getElementById("text");
let revealIndex = 0;

const hexChars = "0123456789ABCDEF";

const scrambleInterval = setInterval(() => {
    textElement.textContent = finalText
    .split("")
    .map((ch, i) => {
        if (i < revealIndex) return ch; 
        return hexChars[Math.floor(Math.random() * hexChars.length)];
    })
    .join("");
}, 50);

function revealNextChar() {
    if (revealIndex < finalText.length) {
    revealIndex++;
    setTimeout(revealNextChar, 200); 
    } else {
    clearInterval(scrambleInterval);
    textElement.textContent = finalText;
    // The family text is already visible below the main text
    }
}

setTimeout(revealNextChar, 50);


//MEMBER CARD

const membersArray = [
  {
    "name": "Anika Tabassum",
    "id": "2404001",
    "home": "Cumilla",
    "college": "Feni Girls' Cadet College",
    "school": "Feni Girls' Cadet College",
    "bio": null,
    "nickname": "Anika",
    "fb_profile_link": "https://www.facebook.com/share/19fXmd7n5o/"
  },
  {
    "name": "Hafsa Khanom",
    "id": "2404002",
    "home": "Chittagong",
    "college": "Chittagong Govt. Women's College",
    "school": "Dr. Khastagir Govt. Girls' High School",
    "bio": "A believer striving in the way of Allah.",
    "nickname": "Hafsa",
    "fb_profile_link": "https://www.facebook.com/profile.php?id=61578623584686"
  },
  {
    "name": "Md. Abrar Fairuj Raiyan",
    "id": "2404003",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Tahmid Moontaka",
    "id": "2404004",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Sayantan Sen Sarma",
    "id": "2404005",
    "home": "Chattogram",
    "college": "Chattogram College",
    "school": "Chattogram Collegiate School",
    "bio": null,
    "nickname": "Sayantan",
    "fb_profile_link": "https://www.facebook.com/share/1FzMujfaKo/"
  },
  {
    "name": "Md.Montasir Shakil",
    "id": "2404006",
    "home": "Chattogram",
    "college": "Bakalia Government College",
    "school": "Nasirabad Government Boys High school",
    "bio": "I am an undergraduate CSE Student at CUET. Aspiring Software Engineer | AI/ML Enthusiast. Also passionate about Robotics",
    "nickname": "Montasir",
    "fb_profile_link": "https://www.facebook.com/share/17BLooa6CW/"
  },
  {
    "name": "Sk. Tasmia Akter",
    "id": "2404007",
    "home": "Ctg",
    "college": "Govt. Hazi Muhammad Mohsin College",
    "school": "St. Scholastica's Girls School and College",
    "bio": null,
    "nickname": "Tanha",
    "fb_profile_link": "https://www.facebook.com/share/1FHLfvxWRx/"
  },
  {
    "name": "Tahia Rabab",
    "id": "2404008",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Md Sazzat Nur",
    "id": "2404009",
    "home": "Cumilla",
    "college": "Notre Dame College",
    "school": "Pir Kashimpur r.n. high school",
    "bio": "Student",
    "nickname": "Sazzat",
    "fb_profile_link": "https://www.facebook.com/share/1JYeR8MAL4/"
  },
  {
    "name": "Tanjila Kamal",
    "id": "2404010",
    "home": "Chittagong",
    "college": "Chittagong College",
    "school": "Dr. Khastagir Govt. Girls' High School",
    "bio": null,
    "nickname": "Tanjila",
    "fb_profile_link": null
  },
  {
    "name": "Mohtasim Bhuiyan Mikat",
    "id": "2404011",
    "home": "Brahmonbaria",
    "college": "Notre Dame College",
    "school": "NKM High School and Homes",
    "bio": "I am just a ordinary boy from a middle class family who is just trying to enjoy his life as far he can .just one piece of advice that just avoid yourself from shitty people and go ahead , life is so beutiful.",
    "nickname": "Mikat",
    "fb_profile_link": "https://www.facebook.com/share/16xGeF8cA1/"
  },
  {
    "name": "Alikul Islam Alif",
    "id": "2404012",
    "home": "Cox's bazar",
    "college": "Chattogram Cantonment Public College",
    "school": "Chakaria Korak Biddyapith",
    "bio": "CSE24",
    "nickname": "Alif",
    "fb_profile_link": "https://www.facebook.com/share/1Aj6rJYr3H/"
  },
  {
    "name": "Joyee Dev",
    "id": "2404013",
    "home": "Chittagong",
    "college": "Chittagong College",
    "school": "BMS girls' high school & College",
    "bio": null,
    "nickname": "Joyee",
    "fb_profile_link": "https://www.facebook.com/share/1FJCccUUrT/"
  },
  {
    "name": "Tamanna Khanam Joti",
    "id": "2404014",
    "home": "Rajbari",
    "college": "Chittagong College",
    "school": "Dr. Khastagir Govt. Girls' High School",
    "bio": null,
    "nickname": "Joti",
    "fb_profile_link": "https://www.facebook.com/share/16yuAo7CKV/"
  },
  {
    "name": "Samiya Ahmed Chowdhury",
    "id": "2404015",
    "home": "chittagong",
    "college": "chattogram college",
    "school": "Dr. khastagir govt. girls high school",
    "bio": "I am samiya.I enjoy learning new skills, exploring creative ideas, and spending my free time watching anime.",
    "nickname": "samiya",
    "fb_profile_link": "https://www.facebook.com/samiya.ahmed.247470"
  },
  {
    "name": "Md. Jomman",
    "id": "2404016",
    "home": "Brahmanbaria",
    "college": "St. Joseph Higher Secondary School",
    "school": "Bitghar Radha Nath High School",
    "bio": "Love to code",
    "nickname": "Jomman",
    "fb_profile_link": null
  },
  {
    "name": "Soumik Dutta",
    "id": "2404017",
    "home": "Chattogram",
    "college": "Notre Dame College",
    "school": "Chattogram Collegiate School",
    "bio": null,
    "nickname": "Soumik",
    "fb_profile_link": "https://www.facebook.com/share/19KQUeHd5r/"
  },
  {
    "name": "Muqset Hossain Mahin",
    "id": "2404018",
    "home": "Narsingdi",
    "college": "NDC",
    "school": "Islampur ML High School",
    "bio": "\"Time doesn't heal anything, it just teaches us how to live with pain.\" - Itachi Uchiha",
    "nickname": "Mahin",
    "fb_profile_link": "https://www.facebook.com/share/1ZEZG1iS3U/"
  },
  {
    "name": "Sharid Shahria Miraj",
    "id": "2404019",
    "home": "Gazipur",
    "college": "Gazipur Cantonment College, BOF",
    "school": "Rani Bilasmoni Government Boys High School, Gazipur",
    "bio": null,
    "nickname": "Miraj",
    "fb_profile_link": "https://www.facebook.com/bm.shahriar.56"
  },
  {
    "name": "Rahul Banik",
    "id": "2404020",
    "home": "Sunamganj",
    "college": "MC college, sylhet",
    "school": "Govt. Jubilee high school, Sunamganj",
    "bio": null,
    "nickname": "Rahul",
    "fb_profile_link": "https://www.facebook.com/share/1CXz4Kh8qe/"
  },
  {
    "name": "Md Abdullah Al Aziz",
    "id": "2404021",
    "home": "Chattogram",
    "college": "Chattogram Cantonment Public College",
    "school": "Ispahani High School",
    "bio": null,
    "nickname": "Adiz",
    "fb_profile_link": "https://www.facebook.com/share/1AxvPyAoQA/"
  },
  {
    "name": "Aditya Mitra",
    "id": "2404022",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Mohammad Adnan Foisal",
    "id": "2404023",
    "home": "Chattogram",
    "college": "Hazera tazu degree College",
    "school": "Chittagong Goct High Schoo",
    "bio": "Always hungry for more knowledge",
    "nickname": "Adnan",
    "fb_profile_link": null
  },
  {
    "name": "Prapti Roy Chowdhury",
    "id": "2404024",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Fardin Khan Rifat",
    "id": "2404025",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Farhana Akter Srety",
    "id": "2404026",
    "home": "Lakshmipur",
    "college": "Firoza Bashar Ideal College",
    "school": "Birahimpur High School",
    "bio": "Life has turned into Bioscope while choosing bio.",
    "nickname": "Srety",
    "fb_profile_link": "https://www.facebook.com/share/15rkPVWAdC/"
  },
  {
    "name": "Mohammad Ekra",
    "id": "2404027",
    "home": "Feni",
    "college": "National Ideal College",
    "school": "Ideal School and College",
    "bio": "Nothing",
    "nickname": "Ekra",
    "fb_profile_link": "https://www.facebook.com/000mdekra000"
  },
  {
    "name": "Souvik Biswas",
    "id": "2404028",
    "home": "Faridpur",
    "college": "St. Joseph Higher Secondary School",
    "school": "Faridpur Zilla School",
    "bio": null,
    "nickname": "Souvik",
    "fb_profile_link": "https://www.facebook.com/roronoa.rongon"
  },
  {
    "name": "Arpita Baishnab",
    "id": "2404029",
    "home": "Noakhali",
    "college": "Holy Cross College, Dhaka",
    "school": "Basurhat A.H.C. Govt. High School,Companiganj, Noakhali",
    "bio": null,
    "nickname": "Badhan",
    "fb_profile_link": "https://www.facebook.com/share/1CCxpjNXWi/"
  },
  {
    "name": "Chomok Datta",
    "id": "2404030",
    "home": "Moulvibazar",
    "college": "Moulvibazar Govt College",
    "school": "Moulvibazar Govt High School",
    "bio": null,
    "nickname": "Arnob",
    "fb_profile_link": null
  },
  {
    "name": "Taslima Jahan Bithi",
    "id": "2404031",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Tonoy Chandra Pal",
    "id": "2404032",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Palash biswas",
    "id": "2404033",
    "home": "Magura",
    "college": "Sreepur govt College",
    "school": "Gangnalia high school",
    "bio": "Palash biswas,CSE -24, CUET,magura sadar,magura",
    "nickname": "Palash",
    "fb_profile_link": "https://www.facebook.com/share/16pPXE7dQE/"
  },
  {
    "name": "Anik Dey",
    "id": "2404034",
    "home": "ctg",
    "college": "CCPC",
    "school": "A L KHAN HIGH SCHOOL",
    "bio": null,
    "nickname": "Anik",
    "fb_profile_link": "https://www.facebook.com/anika.de.640225"
  },
  {
    "name": "Rupak Chakrabarty Ankon",
    "id": "2404035",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Israt Jahan",
    "id": "2404036",
    "home": "Feni",
    "college": "Govt. Mohammad Mohsin College",
    "school": "Silver Bells Girl's High School",
    "bio": null,
    "nickname": "Israt",
    "fb_profile_link": "https://www.facebook.com/share/19tG3tSiER/"
  },
  {
    "name": "Rafsan Ahmed",
    "id": "2404037",
    "home": "Madaripur",
    "college": "Rajuk Uttara Model College",
    "school": "Rajuk Uttara Model College",
    "bio": "I am just a random guy with no skills and no notable achievements trying to get out of this ratrace",
    "nickname": "Rafsan",
    "fb_profile_link": "https://www.facebook.com/share/1Vw92RVqm7/"
  },
  {
    "name": "Fahim Muntasir Tuhin",
    "id": "2404038",
    "home": "Sunamganj",
    "college": "Jalalabad Cantonment public school and college",
    "school": "Jur govt.high school",
    "bio": "Nihilist",
    "nickname": "Fahim",
    "fb_profile_link": "https://www.facebook.com/share/1EmadJdwso/"
  },
  {
    "name": "Arian Ahmed Robi",
    "id": "2404039",
    "home": "Khulna",
    "college": "Brajalal College, Khulna",
    "school": "Khulna power station high school",
    "bio": "I am a student of cuet.(Department of Computer Science & Engineering)",
    "nickname": "Arian",
    "fb_profile_link": "https://www.facebook.com/share/178rBdPxQY/"
  },
  {
    "name": "Payel Mallick",
    "id": "2404040",
    "home": "Chittagong",
    "college": "Chittagong college",
    "school": "Aparnacharan City Corporation Girls' High School and College",
    "bio": null,
    "nickname": "Payel",
    "fb_profile_link": null
  },
  {
    "name": "Suravy Rani Datta",
    "id": "2404041",
    "home": "Lakshmipur",
    "college": "Lakshmipur Government College",
    "school": "Lakshmipur Government Girls' High School",
    "bio": "Turning 0s and 1s into something magical.",
    "nickname": "Suravy",
    "fb_profile_link": "https://www.facebook.com/suravy.datta"
  },
  {
    "name": "Nusrat Jahan Maya",
    "id": "2404042",
    "home": "Rajshahi",
    "college": "Holy Cross College",
    "school": "Daffodils High School",
    "bio": "Innovative Software & AI Enthusiast",
    "nickname": "Maya",
    "fb_profile_link": "https://www.facebook.com/share/14FPxR9zBTd/"
  },
  {
    "name": "Arunav Dip Arko",
    "id": "2404043",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Md. Mahfuz Hasan",
    "id": "2404044",
    "home": "Gaibandha",
    "college": "Sylhet govt. College",
    "school": "Shahjalal NGFF School",
    "bio": "I want to be a programer.",
    "nickname": "Mahfuz",
    "fb_profile_link": "https://www.facebook.com/share/19oMWSFQoj/"
  },
  {
    "name": "MD. TANVIR RANA TUHIN",
    "id": "2404045",
    "home": "THAKURGAON",
    "college": "NOTRE DAME COLLEGE, DHAKA",
    "school": "MOTIJHEEL GOVT. HIGH SCHOOL & COLLEGE",
    "bio": null,
    "nickname": "TUHIN",
    "fb_profile_link": "https://www.facebook.com/tanvir.rana.779205/"
  },
  {
    "name": "Mahmudul Hasan Rafti",
    "id": "2404046",
    "home": "Mymensingh",
    "college": "Govt. Ananda Mohon College",
    "school": "Gafargaon Islamia Govt. High School",
    "bio": null,
    "nickname": "Rafti",
    "fb_profile_link": "https://www.facebook.com/mahmudulhasan.rafti?mibextid=ZbWKwL"
  },
  {
    "name": "Afif Al Hasnain",
    "id": "2404047",
    "home": "Chittagong",
    "college": "Govt. Hazi Mohammad Mohsin College",
    "school": "Nasirabad Govt. Boys Highschool",
    "bio": "Highly motivated to do nothing.",
    "nickname": "Afif",
    "fb_profile_link": "https://www.facebook.com/afifal.hasnain"
  },
  {
    "name": "Rihan Rahman Abir",
    "id": "2404048",
    "home": "Brahmonbaria",
    "college": "BN College, CTG",
    "school": "BN School & College, CTG",
    "bio": null,
    "nickname": "Rihan",
    "fb_profile_link": "https://www.facebook.com/share/1BzaFYWNoJ/"
  },
  {
    "name": "Khadiza Tul Kubra Todra",
    "id": "2404049",
    "home": "JAMALPUR",
    "college": "Rajuk Uttara Model College",
    "school": "Viqarunnisa Noon School and College",
    "bio": null,
    "nickname": "Khadiza",
    "fb_profile_link": "https://www.facebook.com/share/175SkmWv6r/"
  },
  {
    "name": "Suvha Tabassum",
    "id": "2404050",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Khandaker Badar Uddin Munim",
    "id": "2404051",
    "home": "Narsingdi",
    "college": "Govt.Science College,Tejgaon",
    "school": "Brahmondi K. K. M. Govt.High School",
    "bio": "Breathing",
    "nickname": "Munim",
    "fb_profile_link": "https://www.facebook.com/khandaker.munim.2025"
  },
  {
    "name": "Sadia Sultana",
    "id": "2404052",
    "home": "Chittagong",
    "college": "Chittagong College",
    "school": "Dr.Khastagir govt. girls' high school",
    "bio": "🙂😮‍💨🫠😶‍🌫️",
    "nickname": "Sadia",
    "fb_profile_link": "https://www.facebook.com/share/1Fd7a64jAR/"
  },
  {
    "name": "Prothoy Mallick",
    "id": "2404053",
    "home": "Chittagong",
    "college": "Chittagong college",
    "school": "St. Placid's school and college",
    "bio": "I am just a chill guy",
    "nickname": "Prothoy",
    "fb_profile_link": "https://www.facebook.com/share/19dzY6mdxH/"
  },
  {
    "name": "Mohd Taj Uddin Mahmud Chy Abir",
    "id": "2404054",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Md Hasibul Kabir",
    "id": "2404055",
    "home": "Bagerhat",
    "college": "Dhaka Residential Model College",
    "school": "Shaheed Police Smrity College",
    "bio": "I like to sleep.",
    "nickname": "Hasib",
    "fb_profile_link": "https://m.facebook.com/mdhasibulkabir.hasib/"
  },
  {
    "name": "Umme Salma Fariha",
    "id": "2404056",
    "home": "Cumilla",
    "college": "Cumilla Victoria Govt. College",
    "school": "Cumilla Modern High School",
    "bio": null,
    "nickname": "Fariha",
    "fb_profile_link": "https://www.facebook.com/share/19BM4T95ud/"
  },
  {
    "name": "Rahimul Hoque",
    "id": "2404057",
    "home": "Dhaka",
    "college": "Savar Cantonment Public School and College",
    "school": "Savar Cantonment Public School and College",
    "bio": "Aiming high💪",
    "nickname": "Rahimul",
    "fb_profile_link": "https://www.facebook.com/share/1ZbVYNiiGH/"
  },
  {
    "name": "Puspita Dash",
    "id": "2404058",
    "home": "Habiganj",
    "college": "Brindabon Govt. College, Habiganj",
    "school": "B.K.G.C. Govt. Girls' High School, Habiganj",
    "bio": null,
    "nickname": "Puspita",
    "fb_profile_link": "https://www.facebook.com/share/1As9f3gUUf/"
  },
  {
    "name": "Ifrat Jahan Chowdhury",
    "id": "2404059",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Umme Rubaiyat Trina",
    "id": "2404060",
    "home": "Mymensingh",
    "college": "Chattogram government model school and college",
    "school": "Chattogram government model school and college",
    "bio": "Umme Rubaiyat Trina is a student with a growing passion for tech and programming. She's been building her skills in C, C++, HTML, and CSS, and enjoys exploring how code can bring ideas to life. Always curious and eager to learn, Trina is excited to keep expanding her knowledge and take on new challenges in the world of technology.",
    "nickname": "Trina",
    "fb_profile_link": "https://www.facebook.com/share/16NHM6n2DC/"
  },
  {
    "name": "Md. Tanveer Islam Jishan",
    "id": "2404061",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Sumaya Sadath Rodia",
    "id": "2404062",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Md. Rakibul Islam Rakib",
    "id": "2404063",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "A.K.M. Musfiqul Islam",
    "id": "2404064",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "S.M. Mahdi Hasan",
    "id": "2404065",
    "home": "Habiganj",
    "college": "Brindaban Government College",
    "school": "Loknath Ramanbihari Govt High School",
    "bio": "As is an aspiring computer science student at CUET, passionate about physics, mathematics, technology, and history. Currently exploring programming with C++ and Python, they also run an e-commerce business selling custom-designed notebooks. With a calm, analytical personality and a drive for deeply educational content, As plans to launch a YouTube channel to make complex ideas accessible to teenagers and beginners. Their interests extend to AI, machine learning, and innovative ed-tech projects for the future.",
    "nickname": "Disan",
    "fb_profile_link": "https://www.facebook.com/sheikh.mahdi.92167"
  },
  {
    "name": "Shishir Basak",
    "id": "2404066",
    "home": "Mymensingh",
    "college": "Notre Dame College Mymensingh",
    "school": "Mukul Niketon High School, Mymensingh",
    "bio": null,
    "nickname": "Shishir",
    "fb_profile_link": "https://www.facebook.com/shishir.basak.14"
  },
  {
    "name": "Tasfia Tabassum",
    "id": "2404067",
    "home": null,
    "college": null,
    "school": null,
    "bio": null,
    "nickname": null,
    "fb_profile_link": null
  },
  {
    "name": "Tithi Mutsuddi",
    "id": "2404068",
    "home": "Chattogram",
    "college": "Govt. City College, Chattogram",
    "school": "Dr. Khastagir Govt. Girls' High School",
    "bio": "nothing glorious to say yet ;)",
    "nickname": "Tithi",
    "fb_profile_link": "https://www.facebook.com/share/1EW4gjAy8x/"
  },
  {
    "name": "Antar Karmakar Aorgha",
    "id": "2404073",
    "home": "Chandpur",
    "college": "Notre Dame College,Dhaka",
    "school": "Hasan Ali Govt.High School",
    "bio": "It's Nice to have some break from this hectic life.",
    "nickname": "Aorgha",
    "fb_profile_link": "https://www.facebook.com/aorgha.karmakar"
  },
  {
    "name": "Ahnab Ahmed",
    "id": "2404074",
    "home": "Dhaka",
    "college": "Milestone college",
    "school": "National ideal school",
    "bio": "I am ahnab , currently pursuing computer science and engineer at cuet",
    "nickname": "Sijan",
    "fb_profile_link": "https://www.facebook.com/share/1fDyyUv8Sa/?mibextid=wwXIfr"
  },
  {
    "name": "Towfiqul Islam Chowdhury",
    "id": "2404077",
    "home": "Noakhali",
    "college": "Uttara High School and College",
    "school": "Uttara High School and College",
    "bio": "There's nothing interesting about me and my life , but for me life so hard, rude and unfair.",
    "nickname": "TOWFIQ",
    "fb_profile_link": "https://www.facebook.com/Tawfiq.chowdhury.09?mibextid=ZbWKwL"
  },
  {
    "name": "Nur Hossain Sakil",
    "id": "2404078",
    "home": "Feni",
    "college": "Feni government",
    "school": "Feni Central High school",
    "bio": "ami ekta bolod",
    "nickname": "Sakil",
    "fb_profile_link": "https://www.facebook.com/share/1AtJJ5F7VF/"
  },
  {
    "name": "Irfan Kobir Seyam",
    "id": "2404079",
    "home": "DHAKA",
    "college": "Notredame College",
    "school": "Shaheed police smrity college",
    "bio": "Loser",
    "nickname": "Seyam",
    "fb_profile_link": "https://www.facebook.com/share/16zHMXLrkB/"
  },
  {
    "name": "Rajdeep Biswas",
    "id": "2404080",
    "home": "Madaripur",
    "college": "Madaripur Govt.College",
    "school": "United Islamia Govt.High School,Madaripur",
    "bio": "passionate about coding, exploring life, and embracing challenges.",
    "nickname": "Rajdeep",
    "fb_profile_link": "https://www.facebook.com/share/1CP1sboYiJ/"
  },
  {
    "name": "Marufa Yesmin",
    "id": "2404081",
    "home": "Sherpur",
    "college": "Sherpur govt. college",
    "school": "Nabarun Public School",
    "bio": null,
    "nickname": "Marufa",
    "fb_profile_link": null
  },
  {
    "name": "Dipannita Das",
    "id": "2404082",
    "home": "Noakhali",
    "college": "Holicross College",
    "school": "Dr.Khastagir Govt Girls High School",
    "bio": "Seeking new horizons-whimsical!!",
    "nickname": "Dipannita",
    "fb_profile_link": "https://www.facebook.com/share/16q5zcGNue/"
  },
  {
    "name": "Mahibay Tamim",
    "id": "2404085",
    "home": "Sherpur",
    "college": "Sherpur Govt. College",
    "school": "Nabarun Public School",
    "bio": "Fe",
    "nickname": "Tamim",
    "fb_profile_link": "https://www.facebook.com/share/1754h5WHuo/"
  },
  {
    "name": "Md Adnan Talukdar",
    "id": "2404086",
    "home": "Chittagong",
    "college": "Notre Dame College",
    "school": "Chittagong Collegiate School",
    "bio": "Turning caffeine into code and ideas into reality.",
    "nickname": "Adnan",
    "fb_profile_link": "https://www.facebook.com/share/19EZJVWwfA/?mibextid=wwXIfr"
  },
  {
    "name": "Prionto sarker",
    "id": "2404089",
    "home": "Netrakona",
    "college": "Notre Dame College, Dhaka",
    "school": "Anjuman Adarsha Govt High School",
    "bio": null,
    "nickname": "Prionto",
    "fb_profile_link": "https://www.facebook.com/share/179nbRhm1P/"
  },
  {
    "name": "Khondaker Hasan Mohammad Arik",
    "id": "2404090",
    "home": "Narsingdi",
    "college": "Chattogram Cantonment Public College",
    "school": "Chittagong Ideal High School",
    "bio": "Minuscule being with sky-high dreams!",
    "nickname": "Arik",
    "fb_profile_link": "fb.me/HasanMdArik1"
  },
  {
    "name": "Mahajob Joyriya Akando",
    "id": "2404091",
    "home": "Mymensingh",
    "college": "Muminunnisa Government Womens' College",
    "school": "Vidyamoyee Government Girls' High School",
    "bio": "Mahajob Joyriya",
    "nickname": "Joyriya",
    "fb_profile_link": null
  },
  {
    "name": "Siam Mondol",
    "id": "2404092",
    "home": "Pangsha, Rajbari,Dhaka",
    "college": "Government science college",
    "school": "Machpara High school",
    "bio": null,
    "nickname": "Siam",
    "fb_profile_link": "https://www.facebook.com/share/14H5iHJTVBr/"
  },
  {
    "name": "Syeda Tahsina Alam Anikah",
    "id": "2404093",
    "home": "Sylhet",
    "college": "Sylhet Government Womens College",
    "school": "Blue Bird High School and College",
    "bio": null,
    "nickname": "Anikah",
    "fb_profile_link": "https://www.facebook.com/share/1ANgMfXsBY/"
  },
  {
    "name": "Nur Mohammod Yousuf",
    "id": "2404094",
    "home": "Cumilla",
    "college": "Government Science College",
    "school": null,
    "bio": null,
    "nickname": "Yousuf",
    "fb_profile_link": "https://www.facebook.com/nur.mohammad.yousuf.2025"
  },
  {
    "name": "Anika sultana Arshi",
    "id": "2404096",
    "home": "Mymensingh",
    "college": "Agriculture university college",
    "school": "Agriculture university high school",
    "bio": "Hodophile",
    "nickname": "Arshi",
    "fb_profile_link": "https://www.facebook.com/share/1ET5A2z1wL/"
  },
  {
    "name": "Md Rihan",
    "id": "2404097",
    "home": "Sherpur",
    "college": "Agricultural University College, Mymensingh",
    "school": "Varera SP School and College",
    "bio": null,
    "nickname": "Rihan",
    "fb_profile_link": "https://www.facebook.com/share/1A8TqoBcM9/"
  },
  {
    "name": "S.M. Shahnewas Ahmed",
    "id": "2404098",
    "home": "Narail",
    "college": "BAF Shaheen College Dhaka",
    "school": "Tongi Pilot School and Girls College",
    "bio": null,
    "nickname": "Sakib",
    "fb_profile_link": null
  },
  {
    "name": "Rayhan Ferdous",
    "id": "2404099",
    "home": "Cumilla",
    "college": "Cumilla Shikkha Board Govt Model College",
    "school": "Cumilla Shikkha Board Govt Model College",
    "bio": null,
    "nickname": "Rayhan",
    "fb_profile_link": "https://www.facebook.com/share/1J5A1K4Koi/"
  },
  {
    "name": "AL MUKSITU",
    "id": "2404100",
    "home": "Netrakona",
    "college": "Notre Dame College, Dhaka",
    "school": "Mohangonj Pilot Govt. High School,Mohangonj, Netrakona",
    "bio": null,
    "nickname": "Prachurjo",
    "fb_profile_link": "https://www.facebook.com/share/159u1c9cdR/"
  },
  {
    "name": "MD HABIBUR RAHAMAN HABIB",
    "id": "2404101",
    "home": "DINAJPUR",
    "college": "IDC",
    "school": "CCRS",
    "bio": null,
    "nickname": "HABIB",
    "fb_profile_link": null
  },
  {
    "name": "Shoham Mallick",
    "id": "2404102",
    "home": "Chattogram",
    "college": "Chittagong College",
    "school": "Chittagong Collegiate School",
    "bio": "Passionate about creating innovative and scalable technology solutions. Skilled in over 7 programming languages, I work across AI/ML, web/app/game development, data analysis, UI/UX, and cybersecurity. I strive to combine technical expertise with creativity to solve real-world problems and contribute to impactful projects.",
    "nickname": "Shoham",
    "fb_profile_link": "https://www.facebook.com/share/19uJFo1sKz/"
  },
  {
    "name": "Md.Ahad Nur",
    "id": "2404103",
    "home": "Chattogram",
    "college": "Barabkund College",
    "school": "Sitakund Government Model High School",
    "bio": null,
    "nickname": "Ahad",
    "fb_profile_link": "https://www.facebook.com/share/1JHDs9MUHx/"
  },
  {
    "name": "Syeda lubaina morshed tuba",
    "id": "2404104",
    "home": "Chittagong",
    "college": "chittagong goverment city college",
    "school": "Bangladesh mahila samity girl's high school and college",
    "bio": "Student",
    "nickname": "Tuba",
    "fb_profile_link": "https://www.facebook.com/share/1ZmbaBvqdm/"
  },
  {
    "name": "Saiful Islam",
    "id": "2404105",
    "home": "Chittagong",
    "college": "Kazem Ali school and college",
    "school": "Baitush Sharaf Adarsha Kamil Madrasa",
    "bio": "Nothing interesting. Just love to explore, play and yeah sometimes code.",
    "nickname": "Saiful",
    "fb_profile_link": "https://www.facebook.com/share/1HzpHLE5Xa/"
  },
  {
    "name": "Md Shakhayet hossan Shihab",
    "id": "2404106",
    "home": "Cumilla",
    "college": "Dhaka imperial College",
    "school": "Ibn taimiya school and College",
    "bio": null,
    "nickname": "Shihab",
    "fb_profile_link": "https://www.facebook.com/share/16pqCYWDWh/"
  },
  {
    "name": "Md. Ikbal Hossain Siam",
    "id": "2404107",
    "home": "Cumilla",
    "college": "Cumilla Victoria Government College",
    "school": "Burichang Ananda Pilot Govt. High School",
    "bio": null,
    "nickname": "Ikbal",
    "fb_profile_link": "https://www.facebook.com/ikbal.siam.7"
  },
  {
    "name": "Pritom Halder",
    "id": "2404108",
    "home": "Satkhira,Khulna",
    "college": "Khulna Govt. College",
    "school": "Nakipur Govt. H.C Pilot Model High School",
    "bio": "Jab tak zinda hoon tab tak mara nahi.. Jab mar gaya, sala main hi nahi..Toh phir darr kis baat ka🗿",
    "nickname": "Babu",
    "fb_profile_link": "https://www.facebook.com/pritom.halder.238446"
  },
  {
    "name": "SHOAIB HASSAN CHOUDRY",
    "id": "2404109",
    "home": "MYMENSINGH",
    "college": "SHAHID SMRITY GOVT. COLLEGE",
    "school": "NABARUN BIDYANIKETON",
    "bio": null,
    "nickname": "SHOAIB",
    "fb_profile_link": "https://www.facebook.com/share/1LzapNNPSw/?mibextid=wwXIfr"
  },
  {
    "name": "MAZEDUR RAHMAN",
    "id": "2404110",
    "home": "Feni",
    "college": "Mohipal Government College",
    "school": "Feni Government Pilot High School",
    "bio": null,
    "nickname": "Mahin",
    "fb_profile_link": "https://www.facebook.com/PlASMA.41"
  },
  {
    "name": "M.D. Khairul Islam",
    "id": "2404111",
    "home": "Patuakhali",
    "college": "B.A.F Shaheen College,Kurmitola",
    "school": "Banani Bidyaniketan School and College",
    "bio": null,
    "nickname": "Khairul",
    "fb_profile_link": "https://www.facebook.com/share/1CkRuJNcBT/"
  },
  {
    "name": "Md Ridwan",
    "id": "2404112",
    "home": "Chittagong",
    "college": "Bakalia Govt college",
    "school": "Shah Waliullah Institute",
    "bio": "Trying to do better ...",
    "nickname": "Ridwan",
    "fb_profile_link": "https://www.facebook.com/share/1FQz7aF2ae/"
  },
  {
    "name": "Rajat Bhattacharjee",
    "id": "2404118",
    "home": "Chattogram",
    "college": "Bakalia Govt College",
    "school": "Chattogram Collegiate School",
    "bio": null,
    "nickname": "Rajat",
    "fb_profile_link": "https://www.facebook.com/share/15j2J1whxt/"
  },
  {
    "name": "Farhan Wahid",
    "id": "2404121",
    "home": "Dhaka",
    "college": "Dhaka College",
    "school": "Motijheel Government Boys High School",
    "bio": null,
    "nickname": "Farhan",
    "fb_profile_link": "https://www.facebook.com/share/1AygsdxC7F/"
  },
  {
    "name": "Ashraful alam fahim",
    "id": "2404122",
    "home": "Brahmanbaria",
    "college": "Shashidal Al-haz MD Abu taher college",
    "school": "Kasba poura high school",
    "bio": "Not interested",
    "nickname": "Fahim",
    "fb_profile_link": "https://www.facebook.com/ashraf.fahim.9803"
  },
  {
    "name": "Arafat",
    "id": "2404123",
    "home": "Sirajganj",
    "college": "Rajshahi College",
    "school": "BL Govt High School, Sirajganj",
    "bio": null,
    "nickname": "Arafat",
    "fb_profile_link": "facebook.com/arafat01rahman"
  },
  {
    "name": "ABDUL KADER",
    "id": "2404124",
    "home": "CUMILLA",
    "college": "CUMILLA GOVERNMENT COLLEGE",
    "school": "IBN TAIMIYA SCHOOL AND COLLEGE",
    "bio": null,
    "nickname": "KADER",
    "fb_profile_link": "https://www.facebook.com/share/1F4sZje34d/"
  },
  {
    "name": "Tapon Chandra Barmon",
    "id": "2404125",
    "home": "Gaibandha",
    "college": "Bhatgram High School and College",
    "school": "Khordo Komor Pur M.L High School",
    "bio": "Just a simple boy",
    "nickname": "Tapon",
    "fb_profile_link": "https://www.facebook.com/tapana.barmana.789593"
  },
  {
    "name": "Muhammad Mustafa Rahib",
    "id": "2404126",
    "home": "Chattogram",
    "college": "Govt. Hazi Muhammad Mohsin College, Chattogram",
    "school": "Hathazari Parbati Model Govt. High School",
    "bio": null,
    "nickname": "Rahib",
    "fb_profile_link": "https://www.facebook.com/share/1GdyDWtnNN/"
  },
  {
    "name": "Tausif Ibne Monju",
    "id": "2404130",
    "home": "Kushtia",
    "college": "Dhaka Residential Model College",
    "school": "Dhaka Residential Model College",
    "bio": "Just keeping it up with everything.",
    "nickname": "Tausif",
    "fb_profile_link": "https://www.facebook.com/share/1CsLRTaw5d/?mibextid=wwXIfr"
  },
  {
    "name": "Chiranjith Chakma",
    "id": "2404132",
    "home": "Bandarban, Chittagong",
    "college": "Mohammadpur Government College",
    "school": "Bandarban Collectorate School and College",
    "bio": "I'm on my way to do something different in life, not following the usual path.",
    "nickname": "Chiranjith",
    "fb_profile_link": "https://www.facebook.com/share/1CCJEVE6Hc/"
  }
]

const studentsList = [
  { student_id: "2404001", full_name: "ANIKA TABASSUM" },
  { student_id: "2404002", full_name: "HAFSA KHANOM" },
  { student_id: "2404003", full_name: "MD. ABRAR FAIRUJ RAIYAN" },
  { student_id: "2404004", full_name: "TAHMID MOONTAKA" },
  { student_id: "2404005", full_name: "SAYANTAN SEN SARMA" },
  { student_id: "2404006", full_name: "MD. MONTASIR SHAKIL" },
  { student_id: "2404007", full_name: "SK. TASMIA AKTER" },
  { student_id: "2404008", full_name: "TAHIA RABAB" },
  { student_id: "2404009", full_name: "MD. SAZZAT NUR" },
  { student_id: "2404010", full_name: "TANJILA KAMAL" },
  { student_id: "2404011", full_name: "MOHTASIM BHUIYAN MIKAT" },
  { student_id: "2404012", full_name: "ALIKUL ISLAM ALIF" },
  { student_id: "2404013", full_name: "JOYEE DEV" },
  { student_id: "2404014", full_name: "TAMANNA KHANAM JOTI" },
  { student_id: "2404015", full_name: "SAMIYA AHMED CHOWDHURY" },
  { student_id: "2404016", full_name: "MD. JOMMAN" },
  { student_id: "2404017", full_name: "SOUMIK DUTTA" },
  { student_id: "2404018", full_name: "MUQSET HOSSAIN MAHIN" },
  { student_id: "2404019", full_name: "SHARID SHAHRIA" },
  { student_id: "2404020", full_name: "RAHUL BANIK" },
  { student_id: "2404021", full_name: "MD ABDULLAH AZIZ" },
  { student_id: "2404022", full_name: "ADITYA MITRA" },
  { student_id: "2404023", full_name: "MOHAMMAD ADNAN FOISAL" },
  { student_id: "2404024", full_name: "PRAPTI ROY CHOWDHURY" },
  { student_id: "2404025", full_name: "FARDIN KHAN RIFAT" },
  { student_id: "2404026", full_name: "FARHANA AKTER SRETY" },
  { student_id: "2404027", full_name: "MOHAMMAD EKRA" },
  { student_id: "2404028", full_name: "SOUVIK BISWAS" },
  { student_id: "2404029", full_name: "ARPITA BAISHNAB" },
  { student_id: "2404030", full_name: "CHOMOK DATTA" },
  { student_id: "2404031", full_name: "TASLIMA JAHAN BITHI" },
  { student_id: "2404032", full_name: "TONOY CHANDRA PAL" },
  { student_id: "2404033", full_name: "PALASH BISWAS" },
  { student_id: "2404034", full_name: "ANIK DEY" },
  { student_id: "2404035", full_name: "RUPAK CHAKRABARTY ANKON" },
  { student_id: "2404036", full_name: "ISRAT JAHAN" },
  { student_id: "2404037", full_name: "RAFSAN AHMED" },
  { student_id: "2404038", full_name: "FAHIM MUNTASIR TUHIN" },
  { student_id: "2404039", full_name: "ARIAN AHMED ROBI" },
  { student_id: "2404040", full_name: "PAYEL MALLICK" },
  { student_id: "2404041", full_name: "SURAVY RANI DATTA" },
  { student_id: "2404042", full_name: "NUSRAT JAHAN MAYA" },
  { student_id: "2404043", full_name: "ARUNAV DIP ARKO" },
  { student_id: "2404044", full_name: "MD. MAHFUZ HASAN" },
  { student_id: "2404045", full_name: "MD. TANVIR RANA TUHIN" },
  { student_id: "2404046", full_name: "MD. MAHMUDUL HASAN" },
  { student_id: "2404047", full_name: "AFIF AL HASNAIN" },
  { student_id: "2404048", full_name: "RIHAN RAHMAN ABIR" },
  { student_id: "2404049", full_name: "KHADIZA TUL KUBRA TODRA" },
  { student_id: "2404050", full_name: "SUVHA TABASSUM" },
  { student_id: "2404051", full_name: "KHANDAKER BADAR UDDIN MUNIM" },
  { student_id: "2404052", full_name: "SADIA SULTANA" },
  { student_id: "2404053", full_name: "PROTHOY MALLICK" },
  { student_id: "2404054", full_name: "MOHD TAJ UDDIN MAHMUD CHY ABIR" },
  { student_id: "2404055", full_name: "MD HASIBUL KABIR" },
  { student_id: "2404056", full_name: "UMME SALMA" },
  { student_id: "2404057", full_name: "RAHIMUL HOQUE" },
  { student_id: "2404058", full_name: "PUSPITA DASH" },
  { student_id: "2404059", full_name: "IFRAT JAHAN CHOWDHURY" },
  { student_id: "2404060", full_name: "UMME RUBAIYAT TRINA" },
  { student_id: "2404061", full_name: "MD. TANVEER ISLAM JISHAN" },
  { student_id: "2404062", full_name: "SUMAYA SADATH RODIA" },
  { student_id: "2404063", full_name: "MD. RAKIBUL ISLAM RAKIB" },
  { student_id: "2404064", full_name: "A.K.M. MUSFIQUL ISLAM" },
  { student_id: "2404065", full_name: "S. M. MAHDI HASAN" },
  { student_id: "2404066", full_name: "SHISHIR BASAK" },
  { student_id: "2404067", full_name: "TASFIA TABASSUM" },
  { student_id: "2404068", full_name: "TITHI MUTSUDDI" },
  { student_id: "2404069", full_name: "MD. ARMAN KHAN" },
  { student_id: "2404070", full_name: "OMAR AZMAYEEN" },
  { student_id: "2404071", full_name: "PALLABI RANI PAUL" },
  { student_id: "2404072", full_name: "MD. NAZMUS SAKIB" },
  { student_id: "2404073", full_name: "ANTAR KARMAKAR AORGHA" },
  { student_id: "2404074", full_name: "AHNAB AHMED" },
  { student_id: "2404075", full_name: "SIDDHARTHA ROY UTSA" },
  { student_id: "2404076", full_name: "NUHA BINTE MOZAHER" },
  { student_id: "2404077", full_name: "TOWFIQUL ISLAM CHOWDHURY" },
  { student_id: "2404078", full_name: "NUR HOSSAIN SAKIL" },
  { student_id: "2404079", full_name: "IRFAN KOBIR SEYAM" },
  { student_id: "2404080", full_name: "RAJDEEP BISWAS" },
  { student_id: "2404081", full_name: "MARUFA YESMIN" },
  { student_id: "2404082", full_name: "DIPANNITA DAS" },
  { student_id: "2404083", full_name: "TANDRE DHAR" },
  { student_id: "2404084", full_name: "MD. TAHMID BHUIYAN" },
  { student_id: "2404085", full_name: "MAHIBAY TAMIM" },
  { student_id: "2404086", full_name: "MD ADNAN TALUKDAR" },
  { student_id: "2404087", full_name: "RIFAT SHAHRIAR ZIM" },
  { student_id: "2404088", full_name: "MEHEDI HASAN" },
  { student_id: "2404089", full_name: "PRIONTO SARKER" },
  { student_id: "2404090", full_name: "KHONDAKER HASAN MOHAMMAD ARIK" },
  { student_id: "2404091", full_name: "MAHAJOB JOYRIYA AKANDO" },
  { student_id: "2404092", full_name: "SIAM MONDOL" },
  { student_id: "2404093", full_name: "SYEDA TAHSINA ALAM ANIKAH" },
  { student_id: "2404094", full_name: "NUR MOHAMMOD YOUSUF" },
  { student_id: "2404095", full_name: "MD. BHUYAIN EHSAN KABIR" },
  { student_id: "2404096", full_name: "ANIKA SULTANA ARSHI" },
  { student_id: "2404097", full_name: "MD.RIHAN" },
  { student_id: "2404098", full_name: "S. M. SHAHNEWAS AHMED" },
  { student_id: "2404099", full_name: "MD RAYHAN FERDOUS" },
  { student_id: "2404100", full_name: "AL MUKSITU" },
  { student_id: "2404101", full_name: "MD. HABIBUR RAHAMAN HABIB" },
  { student_id: "2404102", full_name: "SHOHAM MALLICK" },
  { student_id: "2404103", full_name: "MD. AHAD NUR" },
  { student_id: "2404104", full_name: "SYEDA LUBAINA MORSHED" },
  { student_id: "2404105", full_name: "MD. SAIFUL ISLAM" },
  { student_id: "2404106", full_name: "MD SHAKHAYET HOSSAN SHIHAB" },
  { student_id: "2404107", full_name: "MD. IKBAL HOSSAIN SIAM" },
  { student_id: "2404108", full_name: "PRITOM HALDER" },
  { student_id: "2404109", full_name: "SHOAIB HASSAN CHOUDRY" },
  { student_id: "2404110", full_name: "MAZEDUR RAHMAN" },
  { student_id: "2404111", full_name: "MD. KHAIRUL ISLAM" },
  { student_id: "2404112", full_name: "MD. RIDWAN" },
  { student_id: "2404113", full_name: "NANGIBA FAYZA KAMAL OHI" },
  { student_id: "2404114", full_name: "TRISHA RAHA" },
  { student_id: "2404115", full_name: "MD. READWAN ULLAH" },
  { student_id: "2404116", full_name: "MD. SIAM HOSSAIN" },
  { student_id: "2404117", full_name: "SIDRATUL MUNTAHA" },
  { student_id: "2404118", full_name: "RAJAT BHATTACHARJEE" },
  { student_id: "2404119", full_name: "PRITOM DAS" },
  { student_id: "2404120", full_name: "MD. MASHIUR RAHMAN TONMOY" },
  { student_id: "2404121", full_name: "FARHAN WAHID" },
  { student_id: "2404122", full_name: "ASRAFUL ALAM FAHIM" },
  { student_id: "2404123", full_name: "ARAFAT" },
  { student_id: "2404124", full_name: "ABDUL KADER" },
  { student_id: "2404125", full_name: "TAPON CHANDRA BARMON" },
  { student_id: "2404126", full_name: "MUHAMMAD MUSTAFA RAHIB" },
  { student_id: "2404127", full_name: "AYESHA KARIM SOHA" },
  { student_id: "2404128", full_name: "FAIYAZ MUHTADI" },
  { student_id: "2404129", full_name: "MD. NAHIAN TANJIM LABIB" },
  { student_id: "2404130", full_name: "TAUSIF IBNE MONJU" },
  { student_id: "2404131", full_name: "ASTIM CHAKMA" },
  { student_id: "2404132", full_name: "CHIRANJITH CHAKMA" }
];

function ensureAllMembersFromStudents() {
  const idToMember = new Map(membersArray.map(m => [String(m.id), m]));
  studentsList.forEach(s => {
    const id = String(s.student_id);
    if (!idToMember.has(id)) {
      membersArray.push({
        name: s.full_name,
        id,
        nickname: null,
        home: null,
        school: null,
        college: null,
        bio: null,
        fb_profile_link: null
      });
    } else {
      const m = idToMember.get(id);
      if (!m.name && s.full_name) m.name = s.full_name;
    }
  });
  membersArray.sort((a, b) => Number(a.id) - Number(b.id));
}

const fbLinksById = {
  "2404001": "https://www.facebook.com/share/19fXmd7n5o/",
  "2404002": "https://www.facebook.com/profile.php?id=61578623584686",
  "2404006": "https://www.facebook.com/share/17BLooa6CW/",
  "2404009": "https://www.facebook.com/share/1JYeR8MAL4/",
  "2404011": "https://www.facebook.com/share/16xGeF8cA1/",
  "2404012": "https://www.facebook.com/share/1Aj6rJYr3H/",
  "2404014": "https://www.facebook.com/share/16yuAo7CKV/",
  "2404016": "https://www.facebook.com/rabiul.hassan.jomman/",
  "2404018": "https://www.facebook.com/share/1ZEZG1iS3U/",
  "2404019": "https://www.facebook.com/bm.shahriar.56",
  "2404020": "https://www.facebook.com/share/1CXz4Kh8qe/",
  "2404021": "https://www.facebook.com/share/1AxvPyAoQA/",
  // 2404023 is explicitly null in provided data
  "2404026": "https://www.facebook.com/share/15rkPVWAdC/",
  "2404027": "https://www.facebook.com/000mdekra000",
  "2404028": "https://www.facebook.com/roronoa.rongon",
  "2404029": "https://www.facebook.com/share/1CCxpjNXWi/",
  "2404033": "https://www.facebook.com/share/16o2eUnsR4/",
  "2404036": "https://www.facebook.com/share/19tG3tSiER/",
  "2404037": "https://www.facebook.com/share/1Vw92RVqm7/",
  "2404038": "https://www.facebook.com/share/1EmadJdwso/",
  "2404039": "https://www.facebook.com/share/178rBdPxQY/",
  // 2404040 is null
  "2404041": "https://www.facebook.com/suravy.datta",
  "2404044": "https://www.facebook.com/share/19oMWSFQoj/",
  "2404045": "https://www.facebook.com/tanvir.rana.779205/",
  "2404046": "https://www.facebook.com/mahmudulhasan.rafti?mibextid=ZbWKwL",
  "2404049": "https://www.facebook.com/share/175SkmWv6r/",
  "2404052": "https://www.facebook.com/share/1Fd7a64jAR/",
  "2404055": "https://m.facebook.com/mdhasibulkabir.hasib/",
  "2404056": "https://www.facebook.com/share/19BM4T95ud/",
  "2404058": "https://www.facebook.com/share/1As9f3gUUf/",
  "2404060": "https://www.facebook.com/share/16NHM6n2DC/",
  "2404065": "https://www.facebook.com/sheikh.mahdi.92167",
  "2404066": "https://www.facebook.com/shishir.basak.14",
  "2404068": "https://www.facebook.com/share/1EW4gjAy8x/",
  "2404074": "https://www.facebook.com/share/1fDyyUv8Sa/?mibextid=wwXIfr",
  "2404077": "https://www.facebook.com/Tawfiq.chowdhury.09?mibextid=ZbWKwL",
  "2404078": "https://www.facebook.com/share/1AtJJ5F7VF/",
  // 2404081 is null
  "2404085": "https://www.facebook.com/share/1754h5WHuo/",
  "2404090": "fb.me/HasanMdArik1",
  // 2404091 is null
  "2404092": "https://www.facebook.com/share/14H5iHJTVBr/",
  "2404093": "https://www.facebook.com/share/1ANgMfXsBY/",
  "2404096": "https://www.facebook.com/share/1ET5A2z1wL/",
  // 2404098 is null
  "2404099": "https://www.facebook.com/share/1J5A1K4Koi/",
  "2404100": "https://www.facebook.com/share/159u1c9cdR/",
  "2404103": "https://www.facebook.com/share/1JHDs9MUHx/",
  "2404105": "https://www.facebook.com/share/1HzpHLE5Xa/",
  "2404106": "https://www.facebook.com/share/16pqCYWDWh/",
  "2404108": "https://www.facebook.com/pritom.halder.238446",
  "2404109": "https://www.facebook.com/share/1LzapNNPSw/?mibextid=wwXIfr",
  "2404118": "https://www.facebook.com/share/15j2J1whxt/",
  "2404121": "https://www.facebook.com/share/1AygsdxC7F/",
  "2404123": "facebook.com/arafat01rahman",
  "2404124": "https://www.facebook.com/share/1F4sZje34d/",
  "2404125": "https://www.facebook.com/tapana.barmana.789593",
  "2404126": "https://www.facebook.com/share/1GdyDWtnNN/",
  "2404130": "https://www.facebook.com/share/1CsLRTaw5d/?mibextid=wwXIfr"
};

function applyFbLinks() {
  membersArray.forEach(member => {
    const link = fbLinksById[String(member.id)];
    if (link) {
      member.fb_profile_link = link;
    }
  });
}

// Ensure full roster and apply provided FB links
ensureAllMembersFromStudents();
applyFbLinks();

// Batch render member cards to reduce layout thrashing
const membersContainer = document.getElementById("members");
const membersFragment = document.createDocumentFragment();

membersArray.forEach((member) => {
    const memberName = member.name;
    const memberId = member.id;

    // Create a div with class 'member-card'
    const card = document.createElement("div");
    card.className = "member-card";
  card.setAttribute('data-id', String(memberId));

  // Create the h3 element for the nickname (or name if no nickname)
    const h3 = document.createElement("h3");
  h3.textContent = member.nickname || memberName;

    // Create the p element for the ID with the colored #
    const p = document.createElement("p");
    p.style.fontSize = "15px";
    // Create the colored # span
    const span = document.createElement("span");
    span.style.color = "rgb(250, 21, 136)";
    span.style.fontWeight = "bolder";
    span.textContent = "#";

    // Append span and text node for ID inside <p>
    p.appendChild(span);
    p.appendChild(document.createTextNode(memberId));

    // Append h3 and p to the card div
    card.appendChild(h3);
    card.appendChild(p);

    // Show blood group if available
    if (member.bloodGroup) {
      const bgEl = document.createElement("div");
      bgEl.className = "member-blood";
      bgEl.textContent = `🩸 ${member.bloodGroup}`;
      card.appendChild(bgEl);
    }

    // Append card to fragment instead of directly to the DOM
    membersFragment.appendChild(card);
});

// Append all cards at once
membersContainer.appendChild(membersFragment);

// Subscribe to public profile updates for real-time member card refresh
try {
    ensureFirebase().then(() => {
        if (typeof subscribeToPublicProfilesUpdates === 'function') {
            subscribeToPublicProfilesUpdates();
        }
    }).catch(() => {});
} catch (_) {}

let activeModal = null;

// Modal functionality
function normalizeFacebookUrl(rawUrl) {
    if (!rawUrl) return null;
    const trimmed = String(rawUrl).trim();
    if (trimmed.length === 0 || trimmed.toLowerCase() === 'null') return null;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
}

function showModal(member) {
    document.getElementById("modalName").innerHTML = `<strong style="color: hotpink">Full Name:</strong> ${member.name}`;
    document.getElementById("modalId").innerHTML = `<strong style="color: hotpink">ID:</strong> ${member.id}`;
    document.getElementById("modalHome").innerHTML = `<strong style="color: hotpink">Home:</strong> ${member.home || 'Not specified'}`;
    document.getElementById("modalCollege").innerHTML = `<strong style="color: hotpink">College:</strong> ${member.college || 'Not specified'}`;
    document.getElementById("modalSchool").innerHTML = `<strong style="color: hotpink">School:</strong> ${member.school || 'Not specified'}`;
    document.getElementById("modalBlood").innerHTML = `<strong style=\"color: hotpink\">Blood Group:</strong> ${member.bloodGroup || 'Not specified'}`;
    const normalizedFb = normalizeFacebookUrl(member.fb_profile_link);
    if (normalizedFb) {
        document.getElementById("modalFacebook").innerHTML = `<strong style=\"color: hotpink\">Facebook:</strong> <a href=\"${normalizedFb}\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: #00d4ff; text-decoration: none;\">${member.nickname || member.name}</a>`;
    } else {
        document.getElementById("modalFacebook").innerHTML = `<strong style=\"color: hotpink\">Facebook:</strong> Not available`;
    }
    document.getElementById("modalBio").innerHTML = `<strong style=\"color: hotpink\">Bio:</strong> ${member.bio || 'No bio available yet.'}`;

    const modal = document.getElementById("modalOverlay");
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("show"), 10);
    
    // Push a history state so Back closes the modal
    if (activeModal === null && window.history && window.history.pushState) {
        window.history.pushState({ modal: 'member' }, "");
        activeModal = 'member';
    } else {
        activeModal = 'member';
    }
    
    preventMainPageScroll();
}

function actuallyCloseMemberModal() {
    const modal = document.getElementById("modalOverlay");
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 300);
    restoreMainPageScroll();
    if (activeModal === 'member') activeModal = null;
}

function closeModal() {
    // If we pushed a state for the modal, go back in history to trigger popstate
    if (window.history && window.history.state && window.history.state.modal === 'member') {
        window.history.back();
        return;
    }
    // Fallback: just close
    actuallyCloseMemberModal();
}

// Close modal when clicking close button
document.getElementById("modalClose").addEventListener("click", closeModal);

// Close modal when clicking outside the card
document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        // Trigger history back so popstate handles proper close
        if (activeModal === 'member' && window.history && window.history.state?.modal === 'member') {
            window.history.back();
        }
        if (activeModal === 'events' && window.history && window.history.state?.modal === 'events') {
            window.history.back();
        }
    }
});

// Handle Back button to close open modals instead of navigating away
window.addEventListener('popstate', () => {
    if (activeModal === 'member') {
        actuallyCloseMemberModal();
        return;
    }
    if (activeModal === 'events') {
        actuallyCloseEventsModal();
        return;
    }
});

// Close events modal when clicking close button
document.getElementById("eventsModalClose").addEventListener("click", closeEventsModal);

// Close events modal when clicking outside the modal
document.getElementById("eventsModalOverlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        closeEventsModal();
    }
});

// Prevent main page scrolling when scrolling in events modal
document.getElementById("events-modal-list").addEventListener("scroll", (e) => {
    e.stopPropagation();
}, { passive: true });

// Prevent main page scrolling when modal is open
function preventMainPageScroll() {
    document.body.style.overflow = 'hidden';
}

function restoreMainPageScroll() {
    document.body.style.overflow = 'auto';
}

// Lazy-load Firebase SDK on demand to reduce initial load
let __firebaseInitPromise = null;
function loadExternalScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.defer = true;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}
async function ensureFirebase() {
    if (window.db && window.auth && window.firebase) return window.db;
    if (!__firebaseInitPromise) {
        __firebaseInitPromise = (async () => {
            try {
                // Load compat SDKs
                await loadExternalScript('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
                await loadExternalScript('https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js');
                await loadExternalScript('https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js');
                
                // Wait a bit to ensure scripts are fully loaded
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Additional check to ensure Firebase is available
                let attempts = 0;
                while (attempts < 10 && (!window.firebase || !window.firebase.apps)) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    attempts++;
                }
                
                const cfg = window.__firebaseConfig;
                if (!cfg) throw new Error('Firebase config not found');
                
                if (!window.firebase || !window.firebase.apps || window.firebase.apps.length === 0) {
                    window.firebase.initializeApp(cfg);
                }
                
                            // Ensure all Firebase services are available
            if (!window.firebase.auth || !window.firebase.firestore) {
                console.error('Firebase services check failed:', {
                    hasFirebase: !!window.firebase,
                    hasAuth: !!window.firebase?.auth,
                    hasFirestore: !!window.firebase?.firestore
                });
                throw new Error('Firebase services not properly loaded');
            }
                
                window.db = window.firebase.firestore();
                try { await window.db.enablePersistence({ synchronizeTabs: true }); } catch (e) {}
                window.auth = window.firebase.auth();
                if (window.auth.useDeviceLanguage) { window.auth.useDeviceLanguage(); }
                
                return window.db;
            } catch (error) {
                console.error('Firebase initialization failed:', error);
                __firebaseInitPromise = null; // Reset promise on failure
                throw error;
            }
        })();
    }
    return __firebaseInitPromise;
}

// ===== Local cache helpers (local-first rendering) =====
const __CACHE_TTLS__ = {
    events: 6 * 60 * 60 * 1000,
    courses: 6 * 60 * 60 * 1000,
    notices: 3 * 60 * 60 * 1000,
    extraClasses: 6 * 60 * 60 * 1000,
    resources: 6 * 60 * 60 * 1000
};

function __readCache(key, maxAgeMs) {
    try {
        const raw = window.localStorage.getItem(key);
        if (!raw) return null;
        const obj = JSON.parse(raw);
        if (!obj || typeof obj.ts !== 'number' || !Array.isArray(obj.data)) return null;
        if (maxAgeMs && (Date.now() - obj.ts) > maxAgeMs) return null;
        return obj.data;
    } catch (_) {
        return null;
    }
}

// Cache size guard: cap total bytes used by our cache keys and prune oldest resource caches first
const __MAX_CACHE_BYTES__ = 2 * 1024 * 1024; // ~2MB budget for app caches

function __isOurCacheKey(key) {
    return key === 'eventsCache' || key === 'coursesCache' || key === 'noticesCache' || key === 'extraClassesCache' || key.startsWith('resourcesCache:');
}

function __collectCacheEntries() {
    const entries = [];
    try {
        for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if (!__isOurCacheKey(key)) continue;
            const raw = window.localStorage.getItem(key) || '';
            let ts = 0;
            try { const obj = JSON.parse(raw); ts = Number(obj && obj.ts) || 0; } catch (_) { ts = 0; }
            entries.push({ key, size: raw.length, ts, isResource: key.startsWith('resourcesCache:') });
        }
    } catch (_) {}
    return entries;
}

function __pruneCaches(incomingSize) {
    try {
        const entries = __collectCacheEntries();
        let total = entries.reduce((sum, e) => sum + e.size, 0);
        if (total + incomingSize <= __MAX_CACHE_BYTES__) return;

        // Prefer removing resource caches first (lowest priority), oldest first
        const byPriority = [
            entries.filter(e => e.isResource).sort((a, b) => a.ts - b.ts),
            entries.filter(e => !e.isResource).sort((a, b) => a.ts - b.ts)
        ];

        for (const group of byPriority) {
            for (const entry of group) {
                window.localStorage.removeItem(entry.key);
                total -= entry.size;
                if (total + incomingSize <= __MAX_CACHE_BYTES__) return;
            }
        }
    } catch (_) {}
}

function __writeCache(key, data) {
    try {
        const serialized = JSON.stringify({ ts: Date.now(), data });
        __pruneCaches(serialized.length);
        window.localStorage.setItem(key, serialized);
    } catch (_) {}
}

function __resourceCacheKey(courseId, resourceType) {
    return `resourcesCache:${courseId}:${resourceType}`;
}

// Initialize events from Firebase when page loads
// document.addEventListener('DOMContentLoaded', () => {
//     loadEventsFromFirebase();
// });

document.addEventListener('DOMContentLoaded', () => {
    // Optional: prefetch Firebase in idle time
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => { ensureFirebase().catch(() => {}); });
    }
});

// Load events from Firebase
async function loadEventsFromFirebase() {
    try {
        await ensureFirebase();
        // Delete expired events first
        await deleteExpiredItems();
        
        const snapshot = await db.collection('events').orderBy('date', 'asc').get();
        eventsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        __writeCache('eventsCache', eventsArray);
    } catch (err) {
        console.error('Error loading events:', err);
        eventsArray = [];
    }
}

// Format date for display in main page
function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Populate Events Modal
function populateEventsModal() {
    const eventsModalList = document.getElementById("events-modal-list");
    eventsModalList.innerHTML = ''; // Clear existing content
    
    (eventsArray || []).forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.className = `event-card ${event.urgent ? 'event-urgent' : ''}`;
        
        eventCard.innerHTML = `
            <div class="event-title">${event.title}</div>
            <div class="event-date">📅 ${event.date} ${event.time ? `⏰ ${event.time}` : ''}</div>
            <div class="event-description">${event.description}</div>
            <div class="event-details">
                ${event.details.map(detail => `<span class="event-detail">${detail}</span>`).join('')}
            </div>
        `;
        
        eventsModalList.appendChild(eventCard);
    });
}

// Open Events Modal
async function openEventsModal() {
    const cached = __readCache('eventsCache', __CACHE_TTLS__.events);
    if (Array.isArray(cached) && cached.length > 0) {
        eventsArray = cached;
    } else {
        await loadEventsFromFirebase();
    }
    populateEventsModal();
    // Background refresh
    loadEventsFromFirebase().then(() => {
        populateEventsModal();
    }).catch(() => {});
    const modal = document.getElementById("eventsModalOverlay");
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("show"), 10);
    
    if (activeModal === null && window.history && window.history.pushState) {
        window.history.pushState({ modal: 'events' }, "");
        activeModal = 'events';
    } else {
        activeModal = 'events';
    }
    preventMainPageScroll();
}

function actuallyCloseEventsModal() {
    const modal = document.getElementById("eventsModalOverlay");
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 300);
    restoreMainPageScroll();
    if (activeModal === 'events') activeModal = null;
}

function closeEventsModal() {
    if (window.history && window.history.state && window.history.state.modal === 'events') {
        window.history.back();
        return;
    }
    actuallyCloseEventsModal();
}

// Search Functionality
let searchResults = [];
let currentSearchQuery = '';

// Initialize search functionality with debounced input handler
function debounce(fn, delayMs) {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(null, args), delayMs);
    };
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const filterSelect = document.getElementById('filterSelect');

    // Enter key in search input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Real-time search as user types (debounced)
    const debouncedSearch = debounce(() => {
        if (currentSearchQuery.length >= 2) {
            performSearch();
        }
    }, 200);

    searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value.trim();
        if (currentSearchQuery.length < 2) {
            const resultsContainer = document.getElementById('searchResults');
            const searchStats = document.getElementById('searchStats');
            const memberCards = document.querySelectorAll('.member-card');
            // Show all member cards again
            memberCards.forEach(card => {
                card.style.display = '';
                card.classList.remove('search-match');
            });
            resultsContainer.innerHTML = '';
            searchStats.innerHTML = '';
            searchResults = [];
            return;
        }
        debouncedSearch();
    });
}

// Perform search
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    
    const query = searchInput.value.trim().toLowerCase();
    const filter = 'all';
    ;
    if (query.length === 0) {
        clearSearch();
        return;
    }
    
    currentSearchQuery = query;
    searchResults = [];
    
    membersArray.forEach(member => {
        let matchFound = false;
        let matchedField = '';
        let matchedValue = '';
        
        if (filter === 'all' || filter === 'name') {
            const nameMatch = member.name && member.name.toLowerCase().includes(query);
            const nickMatch = member.nickname && member.nickname.toLowerCase().includes(query);
            if (nameMatch || nickMatch) {
                matchFound = true;
                matchedField = nickMatch ? 'Nickname' : 'Name';
                matchedValue = nickMatch ? member.nickname : member.name;
            }
        }
        
        if (!matchFound && (filter === 'all' || filter === 'id')) {
            if (String(member.id).toLowerCase().includes(query)) {
                matchFound = true;
                matchedField = 'ID';
                matchedValue = member.id;
            }
        }
        
        if (!matchFound && (filter === 'all' || filter === 'home')) {
            if (member.home && member.home.toLowerCase().includes(query)) {
                matchFound = true;
                matchedField = 'Home';
                matchedValue = member.home;
            }
        }
        
        if (!matchFound && (filter === 'all' || filter === 'college')) {
            if (member.college && member.college.toLowerCase().includes(query)) {
                matchFound = true;
                matchedField = 'College';
                matchedValue = member.college;
            }
        }
        
        // Add blood group search support
        if (!matchFound && (filter === 'all' || filter === 'blood')) {
            if (member.bloodGroup && String(member.bloodGroup).toLowerCase().includes(query)) {
                matchFound = true;
                matchedField = 'Blood Group';
                matchedValue = member.bloodGroup;
            }
        }
        
        if (!matchFound && (filter === 'all' || filter === 'bio')) {
            if (member.bio && member.bio.toLowerCase().includes(query)) {
                matchFound = true;
                matchedField = 'Bio';
                matchedValue = member.bio;
            }
        }
        
        if (matchFound) {
            searchResults.push({
                member: member,
                matchedField: matchedField,
                matchedValue: matchedValue
            });
        }
    });
    
    displaySearchResults();
}

// Display search results
function displaySearchResults() {
    const searchStats = document.getElementById('searchStats');
    const memberCards = document.querySelectorAll('.member-card');
    

    if (searchResults.length === 0) {
        // Hide all member cards and show no results message
        memberCards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('search-match');
        });
        
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = `
            <div class="no-results">
                <p>🔍 No members found matching "${currentSearchQuery}"</p>
                <p>Try different keywords or check your spelling</p>
            </div>
        `;
        searchStats.innerHTML = '';
    } else {
        // Show only matched member cards and hide others
        memberCards.forEach(card => {
            const cardId = card.getAttribute('data-id');
            const isMatch = searchResults.some(result => String(result.member.id) === String(cardId));
            card.style.display = isMatch ? 'flex' : 'none';
            
            // Add highlight class to matched cards
            if (isMatch) {
                card.classList.add('search-match');
            } else {
                card.classList.remove('search-match');
            }
        });
        
        // Clear the search results container since we're showing actual member cards
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = '';
        
        searchStats.innerHTML = `
            Found ${searchResults.length} member${searchResults.length === 1 ? '' : 's'} matching "${currentSearchQuery}"
        `;
    }
}

// Highlight search terms in results
function highlightSearchTerm(text, query) {
    if (!text) return '';
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="search-result-highlight">$1</span>');
}

// Clear search
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');
    const searchStats = document.getElementById('searchStats');
    const memberCards = document.querySelectorAll('.member-card');
    
    // Show all member cards again
    memberCards.forEach(card => {
        card.style.display = 'flex';
        card.classList.remove('search-match');
    });
    
    searchInput.value = '';
    resultsContainer.innerHTML = '';
    searchStats.innerHTML = '';
    searchResults = [];
    currentSearchQuery = '';
}

// Add Facebook profile links to members who don't have them
function addMissingFacebookLinks() {
    membersArray.forEach(member => {
        if (!member.hasOwnProperty('fb_profile_link')) {
            member.fb_profile_link = null;
        }
    });
}

// Initialize search when page loads
document.addEventListener('DOMContentLoaded', () => {
    addMissingFacebookLinks();
    initializeSearch();
});

// ===== Routines & Notes (Courses) =====
let coursesArray = [];
let currentSelectedCourse = null;
let currentActiveTab = 'books';

async function loadCoursesFromFirebase() {
  try {
    await ensureFirebase();
    const snapshot = await db.collection('courses').orderBy('code', 'asc').get();
    coursesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    __writeCache('coursesCache', coursesArray);
  } catch (err) {
    console.error('Error loading courses:', err);
    coursesArray = [];
  }
}

async function loadResourcesForCourse(courseId, resourceType) {
  try {
    await ensureFirebase();
    let query = db.collection('courses').doc(courseId).collection(resourceType);
    const snapshot = await query.orderBy('createdAt', 'desc').get();
    const resources = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    __writeCache(__resourceCacheKey(courseId, resourceType), resources);
    return resources;
  } catch (err) {
    if (err.code === 'failed-precondition') {
      try {
        await ensureFirebase();
        let query = db.collection('courses').doc(courseId).collection(resourceType);
        const snapshot = await query.get();
        const resources = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        __writeCache(__resourceCacheKey(courseId, resourceType), resources);
        return resources;
      } catch (e2) {
        console.error('Error loading resources without ordering:', e2);
        return [];
      }
    }
    console.error('Error loading resources:', err);
    return [];
  }
}

function renderCoursesList() {
  const list = document.getElementById('courses-list');
  if (!list) return;
  
  if (!coursesArray.length) {
    list.innerHTML = '<div class="no-courses">No courses available yet.</div>';
    clearAllResourcePanels();
    return;
  }
  
  list.innerHTML = '';
  coursesArray.forEach(course => {
    const btn = document.createElement('button');
    btn.className = 'course-button';
    btn.textContent = `${course.code || 'COURSE'} — ${course.title || ''}`.trim();
    btn.addEventListener('click', async () => {
      document.querySelectorAll('.course-button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSelectedCourse = course;
      await loadAndDisplayResources(course.id, currentActiveTab);
    });
    list.appendChild(btn);
  });
}

async function loadAndDisplayResources(courseId, resourceType) {
  const loader = document.getElementById('resources-loading');
  const cachedResources = __readCache(__resourceCacheKey(courseId, resourceType), __CACHE_TTLS__.resources);
  if (Array.isArray(cachedResources) && cachedResources.length > 0) {
    renderResourcePanel(courseId, resourceType, cachedResources);
    loadResourcesForCourse(courseId, resourceType)
      .then(fresh => { renderResourcePanel(courseId, resourceType, fresh); })
      .catch(() => {});
  } else {
    if (loader) loader.classList.add('show');
    try {
      const resources = await loadResourcesForCourse(courseId, resourceType);
      renderResourcePanel(courseId, resourceType, resources);
    } finally {
      if (loader) loader.classList.remove('show');
    }
  }
}

function renderResourcePanel(courseId, resourceType, resources) {
  const course = coursesArray.find(c => c.id === courseId);
  if (!course) return;
  const panelId = `course-${resourceType.replace('-', '-')}`;
  const panel = document.getElementById(panelId);
  if (!panel) return;

  const header = `
    <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid rgba(0, 212, 255, 0.3);">
      <div style="font-weight: 700; color: #00d4ff; font-size: 20px; margin-bottom: 5px;">
        ${course.code || ''} ${course.title || ''}
      </div>
      <div style="color: rgba(255,255,255,0.7); font-size: 14px; margin-bottom: 5px;">
        ${course.instructor || 'Instructor not specified'}
      </div>
    </div>
  `;

  if (!resources.length) {
    const resourceTypeName = resourceType === 'books' ? 'Books' : 
                            resourceType === 'slides' ? 'Lecture Slides' : 
                            resourceType === 'lab-reports' ? 'Lab Reports' : 'Student Notes';
    panel.innerHTML = header + `<div class="no-notes">No ${resourceTypeName.toLowerCase()} available yet.</div>`;
    return;
  }

  const resourcesHtml = resources.map(resource => {
    const safeTitle = resource.title || 'Untitled';
    const safeDesc = resource.description || '';
    const link = resource.fileUrl || resource.linkUrl || null;
    const date = resource.createdAt ? new Date(resource.createdAt.seconds ? resource.createdAt.seconds * 1000 : resource.createdAt).toLocaleString() : '';
    const linkHtml = link ? `<a href="${normalizeFacebookUrl(link)}" target="_blank" rel="noopener noreferrer" class="note-link">Open Resource</a>` : '';
    return `
      <div class="note-item">
        <div class="note-title">${safeTitle}</div>
        <div class="note-description">${safeDesc}</div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          ${date ? `<span style="color: rgba(255,255,255,0.6); font-size: 12px;">${date}</span>` : ''}
          ${linkHtml}
        </div>
      </div>
    `;
  }).join('');

  panel.innerHTML = header + resourcesHtml;
}

function clearAllResourcePanels() {
  const panels = ['course-books', 'course-slides', 'course-student-notes', 'course-lab-reports'];
  panels.forEach(panelId => {
    const panel = document.getElementById(panelId);
    if (panel) panel.innerHTML = '';
  });
}

function switchResourceTab(tabName) {
  document.querySelectorAll('.resource-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector(`[data-resource="${tabName}"]`).classList.add('active');
  document.querySelectorAll('.resource-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  document.getElementById(`course-${tabName.replace('-', '-')}`).classList.add('active');
  currentActiveTab = tabName;
  if (currentSelectedCourse) {
    loadAndDisplayResources(currentSelectedCourse.id, tabName);
  }
}

function openRoutinesModal() {
  const modal = document.getElementById('routinesModalOverlay');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
  if (activeModal === null && window.history && window.history.pushState) {
    window.history.pushState({ modal: 'routines' }, "");
    activeModal = 'routines';
  } else {
    activeModal = 'routines';
  }
  preventMainPageScroll();
  const loader = document.getElementById('resources-loading');
  if (loader) loader.classList.add('show');
  const cachedCourses = __readCache('coursesCache', __CACHE_TTLS__.courses);
  if (Array.isArray(cachedCourses) && cachedCourses.length > 0) {
    coursesArray = cachedCourses;
    renderCoursesList();
    if (loader) loader.classList.remove('show');
  }
  loadCoursesFromFirebase().then(() => {
    renderCoursesList();
    if (loader) loader.classList.remove('show');
  });
  document.querySelectorAll('.resource-tab').forEach(tab => {
    tab.removeEventListener('click', tab._resourceTabHandler);
    tab._resourceTabHandler = () => {
      switchResourceTab(tab.dataset.resource);
    };
    tab.addEventListener('click', tab._resourceTabHandler);
  });
}

function actuallyCloseRoutinesModal() {
  const modal = document.getElementById('routinesModalOverlay');
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
  restoreMainPageScroll();
  if (activeModal === 'routines') activeModal = null;
  const loader = document.getElementById('resources-loading');
  if (loader) loader.classList.remove('show');
  currentSelectedCourse = null;
  currentActiveTab = 'books';
}

function closeRoutinesModal() {
  if (window.history && window.history.state && window.history.state.modal === 'routines') {
    window.history.back();
    return;
  }
  actuallyCloseRoutinesModal();
}

// Routines modal event listeners
document.getElementById('routinesModalClose').addEventListener('click', closeRoutinesModal);

document.getElementById('routinesModalOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeRoutinesModal();
  }
});

// Update popstate handler to include routines
window.addEventListener('popstate', () => {
  if (activeModal === 'member') {
    actuallyCloseMemberModal();
    return;
  }
  if (activeModal === 'events') {
    actuallyCloseEventsModal();
    return;
  }
  if (activeModal === 'routines') {
    actuallyCloseRoutinesModal();
    return;
  }
});

// Update escape key handler to include routines
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (activeModal === 'member' && window.history && window.history.state?.modal === 'member') {
      window.history.back();
    }
    if (activeModal === 'events' && window.history && window.history.state?.modal === 'events') {
      window.history.back();
    }
    if (activeModal === 'routines' && window.history && window.history.state?.modal === 'routines') {
      window.history.back();
    }
  }
});

// ===== Notices =====
let noticesArray = [];
let currentNoticeFilter = 'all';

async function loadNoticesFromFirebase() {
  try {
    await ensureFirebase();
    const snapshot = await db.collection('notices').orderBy('createdAt', 'desc').get();
    noticesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    __writeCache('noticesCache', noticesArray);
  } catch (err) {
    console.error('Error loading notices:', err);
    noticesArray = [];
  }
}

function renderNoticesList(filter = 'all') {
  const list = document.getElementById('notice-list');
  if (!list) return;
  
  const filteredNotices = filter === 'all' ? noticesArray : noticesArray.filter(notice => notice.category === filter);
  
  if (!filteredNotices.length) {
    const filterName = filter === 'all' ? 'notices' : filter;
    list.innerHTML = `<div class="no-notices">No ${filterName} available yet.</div>`;
    return;
  }
  
  list.innerHTML = '';
  filteredNotices.forEach(notice => {
    const noticeItem = document.createElement('div');
    noticeItem.className = `notice-item ${notice.category === 'urgent' ? 'urgent' : ''}`;
    
    const attachmentsHtml = notice.attachments && notice.attachments.length > 0 ? `
      <div class="notice-attachments">
        <h4>📎 Attachments (${notice.attachments.length})</h4>
        <div class="attachment-list">
          ${notice.attachments.map(attachment => {
            const icon = getFileIcon(attachment.name);
            return `
              <div class="attachment-item">
                <span class="attachment-icon">${icon}</span>
                <span class="attachment-name">${attachment.name}</span>
                <a href="${normalizeFacebookUrl(attachment.url)}" target="_blank" rel="noopener noreferrer" class="attachment-download">Download</a>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : '';
    
    const categoryName = notice.category === 'urgent' ? '🚨 Urgent' : 
                        notice.category === 'academic' ? '📚 Academic' : '📋 General';
    
    const date = notice.createdAt ? new Date(notice.createdAt.seconds ? notice.createdAt.seconds * 1000 : notice.createdAt).toLocaleDateString() : '';
    
    noticeItem.innerHTML = `
      <div class="notice-header">
        <h3 class="notice-title">${notice.title}</h3>
        <div class="notice-meta">
          <span class="notice-category ${notice.category === 'urgent' ? 'urgent' : ''}">${categoryName}</span>
          ${date ? `<span class="notice-date">📅 ${date}</span>` : ''}
        </div>
      </div>
      <div class="notice-content-text">${notice.content}</div>
      ${attachmentsHtml}
    `;
    
    list.appendChild(noticeItem);
  });
}

function getFileIcon(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const icons = {
    'pdf': '📄',
    'doc': '📝',
    'docx': '📝',
    'xls': '📊',
    'xlsx': '📊',
    'ppt': '📽️',
    'pptx': '📽️',
    'jpg': '🖼️',
    'jpeg': '🖼️',
    'png': '🖼️',
    'gif': '🖼️',
    'zip': '📦',
    'rar': '📦',
    'txt': '📄',
    'mp4': '🎥',
    'mp3': '🎵'
  };
  return icons[ext] || '📎';
}

function switchNoticeFilter(filter) {
  // Update active filter
  document.querySelectorAll('.notice-filter').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
  
  currentNoticeFilter = filter;
  renderNoticesList(filter);
}

function openNoticeModal() {
  const modal = document.getElementById('noticeModalOverlay');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
  
  if (activeModal === null && window.history && window.history.pushState) {
    window.history.pushState({ modal: 'notice' }, "");
    activeModal = 'notice';
  } else {
    activeModal = 'notice';
  }
  preventMainPageScroll();
  
  const cachedNotices = __readCache('noticesCache', __CACHE_TTLS__.notices);
  if (Array.isArray(cachedNotices) && cachedNotices.length > 0) {
    noticesArray = cachedNotices;
    renderNoticesList(currentNoticeFilter);
  }
  loadNoticesFromFirebase().then(() => {
    renderNoticesList(currentNoticeFilter);
  });
  
  // Set up filter switching
  document.querySelectorAll('.notice-filter').forEach(filter => {
    filter.addEventListener('click', () => {
      switchNoticeFilter(filter.dataset.filter);
    });
  });
}

function actuallyCloseNoticeModal() {
  const modal = document.getElementById('noticeModalOverlay');
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
  restoreMainPageScroll();
  if (activeModal === 'notice') activeModal = null;
  currentNoticeFilter = 'all';
}

function closeNoticeModal() {
  if (window.history && window.history.state && window.history.state.modal === 'notice') {
    window.history.back();
    return;
  }
  actuallyCloseNoticeModal();
}

// Notice modal event listeners
document.getElementById('noticeModalClose').addEventListener('click', closeNoticeModal);

document.getElementById('noticeModalOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeNoticeModal();
  }
});

// Update popstate handler to include notice
window.addEventListener('popstate', () => {
  if (activeModal === 'member') {
    actuallyCloseMemberModal();
    return;
  }
  if (activeModal === 'events') {
    actuallyCloseEventsModal();
    return;
  }
  if (activeModal === 'routines') {
    actuallyCloseRoutinesModal();
    return;
  }
  if (activeModal === 'notice') {
    actuallyCloseNoticeModal();
    return;
  }
});

// Update escape key handler to include notice
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (activeModal === 'member' && window.history && window.history.state?.modal === 'member') {
      window.history.back();
    }
    if (activeModal === 'events' && window.history && window.history.state?.modal === 'events') {
      window.history.back();
    }
    if (activeModal === 'routines' && window.history && window.history.state?.modal === 'routines') {
      window.history.back();
    }
    if (activeModal === 'notice' && window.history && window.history.state?.modal === 'notice') {
      window.history.back();
    }
  }
});

// ===== Routine =====
let extraClassesArray = [];
let currentActiveSubsection = 'A1';
let currentActiveDay = 'all';

// Static routine data with different schedules for each day
const staticRoutine = {
  sunday: {
    A1: {
      '9:00-9:50': { course: 'Math-141', room: 'Level-1 Section-A Classroom' },
      '9:50-10:40': { course: 'CSE-141', room: 'Level-1 Section-A Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'CSE-142', room: 'Operating System Lab' },
      '11:50-12:40': { course: 'CSE-142', room: 'Operating System Lab' },
      '12:40-1:30': { course: 'CSE-142', room: 'Operating System Lab' }
    },
    A2: {
      '9:00-9:50': { course: 'Math-141', room: 'Level-1 Section-A Classroom' },
      '9:50-10:40': { course: 'CSE-141', room: 'Level-1 Section-A Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'Phy-142', room: 'PHYSICS LAB' },
      '11:50-12:40': { course: 'Phy-142', room: 'PHYSICS LAB' },
      '12:40-1:30': { course: 'Phy-142', room: 'PHYSICS LAB' },

    },
    B1: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-B Classroom' },
      '9:00-9:50': { course: 'CSE-141', room: 'Level-1 Section-B Classroom' },
      '9:50-10:40': { course: 'Math-141', room: 'Level-1 Section-B Classroom' },
      '10:40-11:00': { course: 'Break', room: '' }
    },
    B2: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-B Classroom' },
      '9:00-9:50': { course: 'CSE-141', room: 'Level-1 Section-B Classroom' },
      '9:50-10:40': { course: 'Math-141', room: 'Level-1 Section-B Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '2:30-5:00': { course: 'Phy-142', room: 'PHYSICS LAB' }
    }
  },
  monday: {
    A1: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-A Classroom' },
      '9:00-9:50': { course: 'EE-181', room: 'Level-1 Section-A Classroom' },
      '9:50-10:40': { course: 'Phy-141', room: 'Level-1 Section-A Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '1:30-2:30': { course: 'Lunch', room: '' },
      '2:30-5:00': { course: 'CSE-100(per two weeks)', room: 'Computer Lab' }
    },
    A2: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-A Classroom' },
      '9:00-9:50': { course: 'EE-181', room: 'Level-1 Section-A Classroom' },
      '9:50-10:40': { course: 'Phy-141', room: 'Level-1 Section-A Classroom' },
      '11:00-11:50': { course: 'EE-182', room: 'Network and Communication Lab' },
      '11:50-12:40': { course: 'EE-182', room: 'Network and Communication Lab' },
      '12:40-1:30': { course: 'EE-182', room: 'Network and Communication Lab' },
      '1:30-2:30': { course: 'Lunch', room: '' },
      '2:30-5:00': { course: 'CSE-100(per two weeks)', room: 'Computer Lab' }
    },
    B1: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-B Classroom' },
      '9:00-9:50': { course: 'Phy-141', room: 'Level-1 Section-B Classroom' },
      '9:50-10:40': { course: 'EE-181', room: 'Level-1 Section-B Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'CSE-100(per two weeks)', room: 'Computer Lab' },
      '11:50-12:40': { course: 'CSE-100(per two weeks)', room: 'Computer Lab' },
      '12:40-1:30': { course: 'CSE-100(per two weeks)', room: 'Computer Lab' },
      '1:30-2:30': { course: 'Lunch', room: '' },
      '2:30-5:00': { course: 'EE=182', room: 'Network and Communication Lab' }
    },
    B2: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-B Classroom' },
      '9:00-9:50': { course: 'Phy-141', room: 'Level-1 Section-B Classroom' },
      '9:50-10:40': { course: 'EE-181', room: 'Level-1 Section-B Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'CSE-100(per two weeks)', room: 'Computer Lab' },
      '11:50-12:40': { course: 'CSE-100(per two weeks)', room: 'Computer Lab' },
      '12:40-1:30': { course: 'CSE-100(per two weeks)', room: 'Computer Lab' },
      '1:30-2:30': { course: 'Lunch', room: '' },
      '2:30-5:00': { course: 'CSE-142', room: 'Operating System Lab' }
    }
  },
  tuesday: {
    A1: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-A Classroom' },
      '9:00-9:50': { course: 'Hum-141', room: 'Level-1 Section-A Classroom' },
      '9:50-10:40': { course: 'EE-181', room: 'Level-1 Section-A Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'CSE-141', room: 'Level-1 Section-A Classroom' },
      '11:50-12:40': { course: 'Phy-141', room: 'Level-1 Section-A Classroom' },
      '12:40-1:30': { course: 'Lunch', room: '' },
      '2:30-5:00': { course: 'Phy-142', room: 'PHYSICS LAB' }
    },
    A2: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-A Classroom' },
      '9:00-9:50': { course: 'Hum-141', room: 'Level-1 Section-A Classroom' },
      '9:50-10:40': { course: 'EE-181', room: 'Level-1 Section-A Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'CSE-141', room: 'Level-1 Section-A Classroom' },
      '11:50-12:40': { course: 'Phy-141', room: 'Level-1 Section-A Classroom' },
      '12:40-1:30': { course: 'Lunch', room: '' },
      '2:30-5:00': { course: 'CSE-142', room: 'Operating System Lab' }
    },
    B1: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-B Classroom' },
      '9:00-9:50': { course: 'EE-181', room: 'Level-1 Section-B Classroom' },
      '9:50-10:40': { course: 'Hum-141', room: 'Level-1 Section-B Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'Phy-141', room: 'Level-1 Section-B Classroom' },
      '11:50-12:40': { course: 'CSE-141', room: 'Level-1 Section-B Classroom' },
      '12:40-1:30': { course: 'Lunch', room: '' }
    },
    B2: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-B Classroom' },
      '9:00-9:50': { course: 'EE-181', room: 'Level-1 Section-B Classroom' },
      '9:50-10:40': { course: 'Hum-141', room: 'Level-1 Section-B Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'Phy-141', room: 'Level-1 Section-B Classroom' },
      '11:50-12:40': { course: 'CSE-141', room: 'Level-1 Section-B Classroom' },
      '12:40-1:30': { course: 'Lunch', room: '' }
    }
  },
  wednesday: {
    A1: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-A Classroom' },
      '9:00-9:50': { course: 'CSE-141', room: 'Level-1 Section-A Classroom' },
      '9:50-10:40': { course: 'Hum-141', room: 'Level-1 Section-A Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'Math-141', room: 'Level-1 Section-A Classroom' },
      '11:50-12:40': { course: 'Phy-141', room: 'Level-1 Section-A Classroom' },
      '12:40-1:30': { course: 'Lunch', room: '' }
    },
    A2: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-A Classroom' },
      '9:00-9:50': { course: 'CSE-141', room: 'Level-1 Section-A Classroom' },
      '9:50-10:40': { course: 'Hum-141', room: 'Level-1 Section-A Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'Math-141', room: 'Level-1 Section-A Classroom' },
      '11:50-12:40': { course: 'Phy-141', room: 'Level-1 Section-A Classroom' },
      '12:40-1:30': { course: 'Lunch', room: '' }
    },
    B1: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-B Classroom' },
      '9:00-9:50': { course: 'Hum-141', room: 'Level-1 Section-B Classroom' },
      '9:50-10:40': { course: 'CSE-141', room: 'Level-1 Section-B Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'Phy-141', room: 'Level-1 Section-B Classroom' },
      '11:50-12:40': { course: 'Math-141', room: 'Level-1 Section-B Classroom' },
      '12:40-1:30': { course: 'Lunch', room: '' }
    },
    B2: {
        '8:10-9:00': { course: 'CT', room: 'Level-1 Section-B Classroom' },
        '9:00-9:50': { course: 'Hum-141', room: 'Level-1 Section-B Classroom' },
        '9:50-10:40': { course: 'CSE-141', room: 'Level-1 Section-B Classroom' },
        '10:40-11:00': { course: 'Break', room: '' },
        '11:00-11:50': { course: 'Phy-141', room: 'Level-1 Section-B Classroom' },
        '11:50-12:40': { course: 'CSE-141', room: 'Level-1 Section-B Classroom' },
        '12:40-1:30': { course: 'Lunch', room: '' }
    }
  },
  thursday: {
    A1: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-A Classroom' },
      '9:00-9:50': { course: 'EE-181', room: 'Level-1 Section-A Classroom' },
      '9:50-10:40': { course: 'Math-141', room: 'Level-1 Section-A Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'EE-182', room: 'Network and Communication Lab' },
      '11:50-12:40': { course: 'EE-182', room: 'Network and Communication Lab' },
      '12:40-1:30': { course: 'EE-182', room: 'Network and Communication Lab' },
      '1:30-2:30': { course: 'Lunch', room: '' }
    },
    A2: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-A Classroom' },
      '9:00-9:50': { course: 'EE-181', room: 'Level-1 Section-A Classroom' },
      '9:50-10:40': { course: 'Math-141', room: 'Level-1 Section-A Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '1:30-2:30': { course: 'Lunch', room: '' }
    },
    B1: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-B Classroom' },
      '9:00-9:50': { course: 'Math-141', room: 'Level-1 Section-B Classroom' },
      '9:50-10:40': { course: 'EE-181', room: 'Level-1 Section-B Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '11:00-11:50': { course: 'Phy-142', room: 'PHYSICS LAB' },
      '11:50-12:40': { course: 'Phy-142', room: 'PHYSICS LAB' },
      '12:40-1:30': { course: 'Phy-142', room: 'PHYSICS LAB' },
      '1:30-2:30': { course: 'Lunch', room: '' },
      '2:30-5:00': { course: 'CSE-142', room: 'Operating System Lab' }

    },
    B2: {
      '8:10-9:00': { course: 'CT', room: 'Level-1 Section-B Classroom' },
      '9:00-9:50': { course: 'Math-141', room: 'Level-1 Section-B Classroom' },
      '9:50-10:40': { course: 'EE-181', room: 'Level-1 Section-B Classroom' },
      '10:40-11:00': { course: 'Break', room: '' },
      '1:30-2:30': { course: 'Lunch', room: '' },
      '2:30-5:00': { course: 'EE-182', room: 'Network and Communication Lab' }
    }
  }
};

async function loadExtraClassesFromFirebase() {
  try {
    await ensureFirebase();
    // Delete expired extra classes first
    await deleteExpiredItems();
    
    const snapshot = await db.collection('extraClasses').orderBy('createdAt', 'desc').get();
    extraClassesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    __writeCache('extraClassesCache', extraClassesArray);
  } catch (err) {
    console.error('Error loading extra classes:', err);
    extraClassesArray = [];
  }
}

function renderRoutineTable(subsection = 'A1', day = 'all') {
  const tableContainer = document.getElementById('routine-table');
  if (!tableContainer) return;
  
  // Define time slots from 9:00 AM to 5:00 PM in chronological order
  const timeSlots = [
    '9:00-9:50', '9:50-10:40', '10:40-11:00', '11:00-11:50', '11:50-12:40',
    '12:40-1:30', '1:30-2:30', '2:30-5:00'
  ];
  
  const subsections = ['A1', 'A2', 'B1', 'B2'];
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
  
  let tableHTML = '<table><thead><tr><th>Time</th>';
  
  if (day === 'all') {
    // Show all days for specific subsection
    days.forEach(dayName => {
      tableHTML += `<th>${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${subsection}</th>`;
    });
  } else {
    // Show specific subsection for specific day
    tableHTML += `<th>${day.charAt(0).toUpperCase() + day.slice(1)} ${subsection}</th>`;
  }
  
  tableHTML += '</tr></thead><tbody>';
  
  timeSlots.forEach(timeSlot => {
    tableHTML += '<tr>';
    tableHTML += `<td class="time-slot">${timeSlot}</td>`;
    
    if (day === 'all') {
      // Show all days for specific subsection
      days.forEach(dayName => {
        const classData = staticRoutine[dayName]?.[subsection]?.[timeSlot];
        const cellContent = !classData ? 
          '<span style="color: rgba(255,255,255,0.3);">-</span>' : 
          classData.course === 'Break' || classData.course === 'Lunch' ? 
          `<span style="color: rgba(255,255,255,0.5);">${classData.course}</span>` : 
          `<div class="course-cell">
            <div style="font-weight: 600; color: #00d4ff;">${classData.course}</div>
            <div style="font-size: 11px; color: rgba(255,255,255,0.8);">${classData.room}</div>
          </div>`;
        
        tableHTML += `<td>${cellContent}</td>`;
      });
    } else {
      // Show specific subsection for specific day
      const classData = staticRoutine[day]?.[subsection]?.[timeSlot];
      const cellContent = !classData ? 
        '<span style="color: rgba(255,255,255,0.3);">-</span>' : 
        classData.course === 'Break' || classData.course === 'Lunch' ? 
        `<span style="color: rgba(255,255,255,0.5);">${classData.course}</span>` : 
        `<div class="course-cell">
          <div style="font-weight: 600; color: #00d4ff;">${classData.course}</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.8);">${classData.room}</div>
        </div>`;
      
      tableHTML += `<td>${cellContent}</td>`;
    }
    
    tableHTML += '</tr>';
  });
  
  tableHTML += '</tbody></table>';
  tableContainer.innerHTML = tableHTML;
}

function renderExtraClasses() {
  const extraContainer = document.getElementById('extra-classes');
  if (!extraContainer) return;
  
  if (!extraClassesArray.length) {
    extraContainer.innerHTML = '<h3>📚 Extra Classes</h3><div class="no-extra-classes">No extra classes scheduled yet.</div>';
    return;
  }
  
  const extraClassesHTML = extraClassesArray.map(extraClass => {
    const date = extraClass.date ? new Date(extraClass.date.seconds ? extraClass.date.seconds * 1000 : extraClass.date).toLocaleDateString() : '';
    const time = extraClass.time || '';
    const dayName = extraClass.day ? extraClass.day.charAt(0).toUpperCase() + extraClass.day.slice(1) : '';
    const subsection = extraClass.subsection ? ` | Sub: ${extraClass.subsection}` : '';
    
    return `
      <div class="extra-class-item">
        <div class="extra-class-info">
          <h4>${extraClass.title}</h4>
          <p>📅 ${date} | 📆 ${dayName} | ⏰ ${time} | 📍 ${extraClass.room || 'TBA'} | 👨‍🏫 ${extraClass.instructor || 'TBA'}</p>
        </div>
      </div>
    `;
  }).join('');
  
  extraContainer.innerHTML = `
    <h3>📚 Extra Classes</h3>
    <div class="extra-class-list">
      ${extraClassesHTML}
    </div>
  `;
}

function switchRoutineFilter(subsection) {
  // Update active filter
  document.querySelectorAll('.routine-filter').forEach(filter => {
    filter.classList.remove('active');
  });
  document.querySelector(`[data-subsection="${subsection}"]`).classList.add('active');
  
  currentActiveSubsection = subsection;
  renderRoutineTable(subsection, currentActiveDay);
}

function switchDayFilter(day) {
  // Update active day filter
  document.querySelectorAll('.day-filter').forEach(filter => {
    filter.classList.remove('active');
  });
  document.querySelector(`[data-day="${day}"]`).classList.add('active');
  
  currentActiveDay = day;
  renderRoutineTable(currentActiveSubsection, day);
}

function openRoutineModal() {
  const modal = document.getElementById('routineModalOverlay');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
  
  if (activeModal === null && window.history && window.history.pushState) {
    window.history.pushState({ modal: 'routine' }, "");
    activeModal = 'routine';
  } else {
    activeModal = 'routine';
  }
  preventMainPageScroll();
  
  // Set A1 as default active subsection
  currentActiveSubsection = 'A1';
  document.querySelectorAll('.routine-filter').forEach(filter => {
    filter.classList.remove('active');
  });
  document.querySelector('[data-subsection="A1"]').classList.add('active');
  
  // Load extra classes data
  const cachedExtra = __readCache('extraClassesCache', __CACHE_TTLS__.extraClasses);
  if (Array.isArray(cachedExtra) && cachedExtra.length > 0) {
    extraClassesArray = cachedExtra;
    renderRoutineTable(currentActiveSubsection, currentActiveDay);
    renderExtraClasses();
  }
  loadExtraClassesFromFirebase().then(() => {
    renderRoutineTable(currentActiveSubsection, currentActiveDay);
    renderExtraClasses();
  });
  
  // Set up subsection filter switching
  document.querySelectorAll('.routine-filter').forEach(filter => {
    filter.addEventListener('click', () => {
      switchRoutineFilter(filter.dataset.subsection);
    });
  });
  
  // Set up day filter switching
  document.querySelectorAll('.day-filter').forEach(filter => {
    filter.addEventListener('click', () => {
      switchDayFilter(filter.dataset.day);
    });
  });
}

function actuallyCloseRoutineModal() {
  const modal = document.getElementById('routineModalOverlay');
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
  restoreMainPageScroll();
  if (activeModal === 'routine') activeModal = null;
  currentActiveSubsection = 'A1';
}

function closeRoutineModal() {
  if (window.history && window.history.state && window.history.state.modal === 'routine') {
    window.history.back();
    return;
  }
  actuallyCloseRoutineModal();
}

// Routine modal event listeners
document.getElementById('routineModalClose').addEventListener('click', closeRoutineModal);

document.getElementById('routineModalOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeRoutineModal();
  }
});

// Update popstate handler to include routine
window.addEventListener('popstate', () => {
  if (activeModal === 'member') {
    actuallyCloseMemberModal();
    return;
  }
  if (activeModal === 'events') {
    actuallyCloseEventsModal();
    return;
  }
  if (activeModal === 'routines') {
    actuallyCloseRoutinesModal();
    return;
  }
  if (activeModal === 'notice') {
    actuallyCloseNoticeModal();
    return;
  }
  if (activeModal === 'routine') {
    actuallyCloseRoutineModal();
    return;
  }
  // student-auth handled inside its setup closure
});

// Update escape key handler to include routine
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (activeModal === 'member' && window.history && window.history.state?.modal === 'member') {
      window.history.back();
    }
    if (activeModal === 'events' && window.history && window.history.state?.modal === 'events') {
      window.history.back();
    }
    if (activeModal === 'routines' && window.history && window.history.state?.modal === 'routines') {
      window.history.back();
    }
    if (activeModal === 'notice' && window.history && window.history.state?.modal === 'notice') {
      window.history.back();
    }
    if (activeModal === 'routine' && window.history && window.history.state?.modal === 'routine') {
      window.history.back();
    }
    // student-auth handled inside its setup closure
  }
});

// ===== Auto-delete expired items =====
async function deleteExpiredItems() {
  try {
    await ensureFirebase();
    // Delete expired events
    const eventsSnapshot = await db.collection('events').get();
    const expiredEvents = eventsSnapshot.docs.filter(doc => {
      const eventData = doc.data();
      if (!eventData.date) return false;
      const eventDate = new Date(eventData.date);
      return eventDate < new Date();
    });
    const batch = db.batch();
    expiredEvents.forEach(doc => batch.delete(doc.ref));
    if (expiredEvents.length > 0) await batch.commit();

    // Delete expired extra classes
    const extraClassesSnapshot = await db.collection('extraClasses').get();
    const expiredExtraClasses = extraClassesSnapshot.docs.filter(doc => {
      const extraClassData = doc.data();
      if (!extraClassData.date) return false;
      const date = extraClassData.date.seconds ? extraClassData.date.seconds * 1000 : extraClassData.date;
      const classDate = new Date(date);
      return classDate < new Date();
    });
    const batch2 = db.batch();
    expiredExtraClasses.forEach(doc => batch2.delete(doc.ref));
    if (expiredExtraClasses.length > 0) await batch2.commit();
  } catch (error) {
    console.error('Error deleting expired items:', error);
  }
}

// Add click handling via event delegation instead of per-card listeners
membersContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.member-card');
    if (!card || !membersContainer.contains(card)) return;
    const memberId = card.getAttribute('data-id');
    if (!memberId) return;
    const member = membersArray.find(m => String(m.id) === String(memberId));
    if (member) {
        showModal(member);
    }
});

// ===== Student Auth UI & Logic =====
(function setupStudentAuth() {
    const studentBtn = document.getElementById('student-button');
    const overlay = document.getElementById('studentAuthModalOverlay');
    const closeBtn = document.getElementById('studentAuthModalClose');
    const googleBtn = document.getElementById('studentAuthGoogleBtn');

    const googleView = document.getElementById('student-auth-google-view');
    const loggedInView = document.getElementById('student-auth-loggedin');
    const welcomeText = document.getElementById('studentAuthWelcome');
    const logoutBtn = document.getElementById('studentAuthLogoutBtn');

    // Profile modal elements
    const profileOverlay = document.getElementById('profileModalOverlay');
    const profileCloseBtn = document.getElementById('profileModalClose');
    const profileForm = document.getElementById('profileForm');
    const profileName = document.getElementById('profileName');
    const profileStudentId = document.getElementById('profileStudentId');
    const profileHome = document.getElementById('profileHome');
    const profileSchool = document.getElementById('profileSchool');
    const profileCollege = document.getElementById('profileCollege');
    const profileNickname = document.getElementById('profileNickname');
    const profileBloodGroup = document.getElementById('profileBloodGroup');
    const profileFacebook = document.getElementById('profileFacebook');
    const profileBio = document.getElementById('profileBio');
    const profileCancelBtn = document.getElementById('profileCancelBtn');
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    const bioCounter = document.getElementById('bioCounter');

    const views = {
        google: googleView,
        loggedin: loggedInView
    };

    function showView(name) {
        Object.values(views).forEach(v => { if (v) v.style.display = 'none'; });
        if (views[name]) views[name].style.display = '';
    }

    function openStudentAuthModal(initialView = 'google') {
        document.getElementById('student-auth-title').textContent = '👨‍🎓 Student Login';
        showView(initialView);
        overlay.style.display = 'flex';
        setTimeout(() => overlay.classList.add('show'), 10);
        if (activeModal === null && window.history && window.history.pushState) {
            window.history.pushState({ modal: 'student-auth' }, "");
            activeModal = 'student-auth';
        } else {
            activeModal = 'student-auth';
        }
        preventMainPageScroll();
    }

    function actuallyCloseStudentAuthModal() {
        overlay.classList.remove('show');
        setTimeout(() => overlay.style.display = 'none', 300);
        restoreMainPageScroll();
        if (activeModal === 'student-auth') activeModal = null;
    }

    function closeStudentAuthModal() {
        if (window.history && window.history.state && window.history.state.modal === 'student-auth') {
            window.history.back();
            return;
        }
        actuallyCloseStudentAuthModal();
    }

    if (closeBtn) closeBtn.addEventListener('click', closeStudentAuthModal);
    if (overlay) overlay.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeStudentAuthModal(); });

    window.addEventListener('popstate', () => {
        if (activeModal === 'student-auth') {
            actuallyCloseStudentAuthModal();
            return;
        }
        if (activeModal === 'profile') {
            actuallyCloseProfileModal();
            return;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeModal === 'student-auth' && window.history && window.history.state?.modal === 'student-auth') {
            window.history.back();
        }
        if (e.key === 'Escape' && activeModal === 'profile' && window.history && window.history.state?.modal === 'profile') {
            window.history.back();
        }
    });

    function isValidEduMail(email) {
        const pattern = /^u\d{7}@student\.cuet\.ac\.bd$/i;
        return pattern.test(String(email).trim());
    }

    function studentIdFromEmail(email) {
        const m = String(email).trim().match(/^u(\d{7})@student\.cuet\.ac\.bd$/i);
        return m ? m[1] : null;
    }

    function sanitizeText(value) {
        if (value == null) return '';
        return String(value).trim();
    }

    function validateProfileData(data, sidFromEmail) {
        const errors = [];
        if (!data.name || !sanitizeText(data.name)) errors.push('Name is required.');
        if (!/^\d{7}$/.test(String(data.studentId || ''))) errors.push('Student ID must be a 7-digit number.');
        if (sidFromEmail && data.studentId !== sidFromEmail) errors.push('Student ID must match your CUET email.');
        if (data.bio && String(data.bio).length > 300) errors.push('Bio must be 300 characters or less.');
        if (data.bloodGroup && !/^(A|B|AB|O)[+-]$/.test(String(data.bloodGroup))) errors.push('Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-.');
        return errors;
    }

    function fillProfileForm(from) {
        profileName.value = sanitizeText(from.name) || '';
        profileStudentId.value = sanitizeText(from.studentId) || '';
        if (profileStudentId) profileStudentId.readOnly = true;
        profileHome.value = sanitizeText(from.home) || '';
        profileSchool.value = sanitizeText(from.school) || '';
        profileCollege.value = sanitizeText(from.college) || '';
        if (profileNickname) profileNickname.value = sanitizeText(from.nickname) || '';
        if (profileBloodGroup) profileBloodGroup.value = sanitizeText(from.bloodGroup) || '';
        profileBio.value = sanitizeText(from.bio) || '';
        if (profileFacebook) profileFacebook.value = sanitizeText(from.fb_profile_link || from.facebook) || '';
        if (bioCounter) bioCounter.textContent = `${profileBio.value.length} / 300`;
    }

    function openProfileModal() {
        if (!profileOverlay) return;
        profileOverlay.style.display = 'flex';
        setTimeout(() => profileOverlay.classList.add('show'), 10);
        if (activeModal === null && window.history && window.history.pushState) {
            window.history.pushState({ modal: 'profile' }, "");
            activeModal = 'profile';
        } else {
            activeModal = 'profile';
        }
        preventMainPageScroll();
        loadProfileIntoForm();
    }

    function actuallyCloseProfileModal() {
        if (!profileOverlay) return;
        profileOverlay.classList.remove('show');
        setTimeout(() => profileOverlay.style.display = 'none', 300);
        restoreMainPageScroll();
        if (activeModal === 'profile') activeModal = null;
    }

    function closeProfileModal() {
        if (window.history && window.history.state && window.history.state.modal === 'profile') {
            window.history.back();
            return;
        }
        actuallyCloseProfileModal();
    }

    if (profileCloseBtn) profileCloseBtn.addEventListener('click', closeProfileModal);
    if (profileOverlay) profileOverlay.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeProfileModal(); });
    if (profileCancelBtn) profileCancelBtn.addEventListener('click', closeProfileModal);

    if (profileBio && bioCounter) {
        profileBio.addEventListener('input', () => {
            bioCounter.textContent = `${profileBio.value.length} / 300`;
        });
    }

    async function loadProfileIntoForm() {
        try {
            await ensureFirebase();
            const user = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
            const sessionRaw = window.localStorage.getItem('cuetStudentSession');
            let sid = null;
            try { sid = sessionRaw ? JSON.parse(sessionRaw).studentId : null; } catch (_) {}
            const base = { name: '', studentId: sid || '', home: '', school: '', college: '', bloodGroup: '', nickname: '', bio: '' };
            if (!user) {
                fillProfileForm(base);
                return;
            }
            const docRef = db.collection('profiles').doc(user.uid);
            const snap = await docRef.get();
            if (snap.exists) {
                const data = snap.data() || {};
                fillProfileForm({
                    name: data.name || '',
                    studentId: data.studentId || (sid || ''),
                    home: data.home || '',
                    school: data.school || '',
                    college: data.college || '',
                    bloodGroup: data.bloodGroup || '',
                    nickname: data.nickname || '',
                    bio: data.bio || '',
                    fb_profile_link: null
                });
                try {
                    const sidToUse = String((data.studentId || sid || '')).trim();
                    if (/^\d{7}$/.test(sidToUse)) {
                        const fbDoc = await db.collection('fbLinksById').doc(sidToUse).get();
                        if (fbDoc.exists) {
                            const link = (fbDoc.data() || {}).link || '';
                            if (profileFacebook) profileFacebook.value = sanitizeText(link) || '';
                        }
                    }
                } catch (_) {}
            } else {
                // Prefill from roster if available
                const roster = membersArray || [];
                const existing = roster.find(m => String(m.id) === String(sid));
                fillProfileForm({
                    name: (existing && existing.name) || '',
                    studentId: sid || '',
                    home: (existing && existing.home) || '',
                    school: (existing && existing.school) || '',
                    college: (existing && existing.college) || '',
                    bloodGroup: (existing && existing.bloodGroup) || '',
                    nickname: (existing && existing.nickname) || '',
                    bio: (existing && existing.bio) || '',
                    fb_profile_link: (existing && existing.fb_profile_link) || ''
                });
                try {
                    const sidToUse = String(sid || '').trim();
                    if (/^\d{7}$/.test(sidToUse)) {
                        const fbDoc = await db.collection('fbLinksById').doc(sidToUse).get();
                        if (fbDoc.exists) {
                            const link = (fbDoc.data() || {}).link || '';
                            if (profileFacebook) profileFacebook.value = sanitizeText(link) || '';
                        }
                    }
                } catch (_) {}
            }
        } catch (err) {
            console.error('Failed to load profile', err);
        }
    }

    async function saveProfile(e) {
        e.preventDefault();
        try {
            await ensureFirebase();
            const user = window.auth && window.auth.currentUser ? window.auth.currentUser : null;
            if (!user) {
                alert('Please sign in first.');
                return;
            }
            const email = (user.email || '').toLowerCase();
            const sidFromEmail = studentIdFromEmail(email);
            const data = {
                name: sanitizeText(profileName.value),
                studentId: sidFromEmail,
                nickname: sanitizeText(profileNickname && profileNickname.value),
                home: sanitizeText(profileHome.value),
                school: sanitizeText(profileSchool.value),
                college: sanitizeText(profileCollege.value),
                bloodGroup: sanitizeText(profileBloodGroup && profileBloodGroup.value),
                bio: sanitizeText(profileBio.value)
            };
            const errors = validateProfileData(data, sidFromEmail);
            if (errors.length) {
                alert(errors.join('\n'));
                return;
            }
            const now = new Date();
            const writeData = Object.assign({}, data, { uid: user.uid, email: email, updatedAt: now.toISOString() });
            await db.collection('profiles').doc(user.uid).set(writeData, { merge: true });

            // Also update public profile for shared access (readable by everyone)
            const publicData = {
                studentId: data.studentId,
                name: data.name,
                nickname: data.nickname || null,
                home: data.home || null,
                school: data.school || null,
                college: data.college || null,
                bloodGroup: data.bloodGroup || null,
                bio: data.bio || null,
                updatedAt: now.toISOString()
            };
            await db.collection('publicProfiles').doc(String(data.studentId)).set(publicData, { merge: true });

            // Save Facebook link
            try {
                const fbRaw = sanitizeText(profileFacebook.value);
                const fbLink = fbRaw ? normalizeFacebookUrl(fbRaw) : null;
                await db.collection('fbLinksById').doc(String(data.studentId)).set({ link: fbLink, updatedAt: now.toISOString() }, { merge: true });
                try {
                    fbLinksById[String(data.studentId)] = fbLink;
                } catch (_) {}
                try {
                    const memberId = String(data.studentId);
                    const member = (membersArray || []).find(m => String(m.id) === memberId);
                    if (member) {
                        member.fb_profile_link = fbLink;
                    }
                } catch (_) {}
            } catch (e) {
                console.error('Failed to save Facebook link', e);
            }

            // Update local roster data for immediate reflection
            try {
                const id = String(data.studentId);
                const member = (membersArray || []).find(m => String(m.id) === id);
                if (member) {
                    member.name = data.name;
                    member.nickname = data.nickname || null;
                    member.home = data.home || null;
                    member.school = data.school || null;
                    member.college = data.college || null;
                    member.bloodGroup = data.bloodGroup || null;
                    member.bio = data.bio || null;
                    const card = document.querySelector(`.member-card[data-id="${id}"]`);
                    if (card) {
                        const h3 = card.querySelector('h3');
                        if (h3) h3.textContent = member.nickname || member.name || 'Unknown';
                        const p = card.querySelector('p');
                        if (p) {
                            p.innerHTML = '';
                            const span = document.createElement('span');
                            span.style.color = 'rgb(250, 21, 136)';
                            span.style.fontWeight = 'bolder';
                            span.textContent = '#';
                            p.appendChild(span);
                            p.appendChild(document.createTextNode(id));
                        }
                        const bgEl = card.querySelector('.member-blood');
                        if (bgEl) {
                          bgEl.textContent = member.bloodGroup ? `🩸 ${member.bloodGroup}` : '';
                          if (!member.bloodGroup) bgEl.remove();
                        } else if (member.bloodGroup) {
                          const bloodDiv = document.createElement('div');
                          bloodDiv.className = 'member-blood';
                          bloodDiv.textContent = `🩸 ${member.bloodGroup}`;
                          card.appendChild(bloodDiv);
                        }
                    }
                }
            } catch (_) {}

            alert('Profile saved successfully.');
            closeProfileModal();
        } catch (err) {
            console.error('Failed to save profile', err);
            alert(err && err.message ? err.message : 'Failed to save profile. Please try again.');
        }
    }

    if (profileForm) profileForm.addEventListener('submit', saveProfile);

    async function signInWithGoogleCuetOnly() {
        const maxRetries = 3;
        let retryCount = 0;
        
        // Show loading state
        if (googleBtn) {
            const originalText = googleBtn.textContent;
            googleBtn.textContent = '🔄 Initializing...';
            googleBtn.disabled = true;
        }
        
        try {
            while (retryCount < maxRetries) {
            try {
                // Update loading text
                if (googleBtn) {
                    googleBtn.textContent = `🔄 Attempt ${retryCount + 1}/${maxRetries}...`;
                }
                
                await ensureFirebase();
                
                // Ensure Firebase Auth is properly initialized
                if (!window.auth || !window.firebase) {
                    console.error('Firebase auth check failed:', {
                        hasAuth: !!window.auth,
                        hasFirebase: !!window.firebase,
                        authType: typeof window.auth,
                        firebaseType: typeof window.firebase
                    });
                    throw new Error('Firebase authentication not properly initialized. Please refresh the page and try again.');
                }
                
                const provider = new window.firebase.auth.GoogleAuthProvider();
                try { provider.setCustomParameters({ prompt: 'select_account', hd: 'student.cuet.ac.bd' }); } catch (_) {}

                let result;
                try {
                    result = await window.auth.signInWithPopup(provider);
                } catch (popupErr) {
                    // Fallback to redirect if popup is blocked
                    if (popupErr && (popupErr.code === 'auth/popup-blocked' || popupErr.code === 'auth/popup-closed-by-user')) {
                        await window.auth.signInWithRedirect(provider);
                        return; // Flow will continue after redirect
                    }
                    throw popupErr;
                }

            const user = result && result.user ? result.user : (window.auth.currentUser || null);
            const email = user && user.email ? user.email.toLowerCase() : null;
            if (!email) {
                throw new Error('No email returned from Google. Please try again.');
            }

            if (!email.endsWith('@student.cuet.ac.bd') || !isValidEduMail(email)) {
                try { await window.auth.signOut(); } catch (_) {}
                window.localStorage.removeItem('cuetStudentSession');
                alert('Only CUET student emails (u<id>@student.cuet.ac.bd) are allowed.');
                return;
            }

            const sid = studentIdFromEmail(email);
            if (!sid) {
                try { await window.auth.signOut(); } catch (_) {}
                window.localStorage.removeItem('cuetStudentSession');
                alert('Invalid CUET email format. Expected u<id>@student.cuet.ac.bd');
                return;
            }

            const session = { studentId: sid, email, loggedInAt: Date.now() };
            window.localStorage.setItem('cuetStudentSession', JSON.stringify(session));
            welcomeText.textContent = `Welcome, ${sid}!`;
            showView('loggedin');
            // Switch button to profile
            if (studentBtn) {
                studentBtn.textContent = '👤 Your Profile';
                studentBtn.onclick = openProfileModal;
            }
            alert(`Welcome ${email}!`);

            // After successful login: kick off concurrent data preloads
            try {
                const preload = async () => {
                    try { await ensureFirebase(); } catch (_) {}
                    const tasks = [];
                    // Preload events, courses, notices, extra classes
                    try { tasks.push(loadEventsFromFirebase()); } catch (_) {}
                    try { tasks.push(loadCoursesFromFirebase()); } catch (_) {}
                    try { tasks.push(loadNoticesFromFirebase()); } catch (_) {}
                    try { tasks.push(loadExtraClassesFromFirebase()); } catch (_) {}
                    await Promise.allSettled(tasks);
                };
                // Use idle callback when available to not block UI
                if ('requestIdleCallback' in window) {
                    requestIdleCallback(() => { preload().catch(() => {}); });
                } else {
                    setTimeout(() => { preload().catch(() => {}); }, 0);
                }
            } catch (_) {}
        } catch (err) {
            console.error(`Google Sign-In attempt ${retryCount + 1} failed:`, err);
            retryCount++;
            
            if (retryCount >= maxRetries) {
                alert(err && err.message ? err.message : 'Sign-in failed after multiple attempts. Please refresh the page and try again.');
                return;
            }
            
            // Wait a bit before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
        }
        
        // If we get here, sign-in was successful
        break;
    }
    } finally {
        // Always restore button state
        if (googleBtn) {
            googleBtn.textContent = 'Sign in with Google (CUET only)';
            googleBtn.disabled = false;
        }
    }

    if (googleBtn) googleBtn.addEventListener('click', signInWithGoogleCuetOnly);

    async function doLogout() {
        const confirmed = await window.showThemedConfirm('Are you sure you want to logout?', { type: 'warning', okText: 'Logout', cancelText: 'Stay' });
        if (!confirmed) return;
        try {
            await ensureFirebase();
            if (window.auth) {
                try { await window.auth.signOut(); } catch (_) {}
            }
        } catch (error) {
            console.warn('Firebase logout failed:', error);
        } finally {
            window.localStorage.removeItem('cuetStudentSession');
            showView('google');
            if (studentBtn) {
                studentBtn.textContent = '👨‍🎓 Student Login';
                studentBtn.onclick = () => openStudentAuthModal('google');
            }
            alert('Logged out successfully.');
        }
    }
    if (logoutBtn) logoutBtn.addEventListener('click', doLogout);
    if (profileLogoutBtn) profileLogoutBtn.addEventListener('click', doLogout);

    (function initSessionUI() {
        try {
            const raw = window.localStorage.getItem('cuetStudentSession');
            if (!raw) return;
            const session = JSON.parse(raw);
            if (session && session.studentId) {
                welcomeText.textContent = `Welcome, ${session.studentId}!`;
            }
        } catch (_) {}
    })();

    if (studentBtn) {
        studentBtn.addEventListener('click', () => {
            const raw = window.localStorage.getItem('cuetStudentSession');
            if (raw) {
                try {
                    const session = JSON.parse(raw);
                    if (session && session.studentId) {
                        // Already logged in → open profile
                        openProfileModal();
                        return;
                    }
                } catch (_) {}
            }
            openStudentAuthModal('google');
        });
    }

    // Keep session in sync with Firebase auth state
    document.addEventListener('DOMContentLoaded', async () => {
        try { 
            await ensureFirebase(); 
        } catch (error) {
            console.warn('Firebase initialization failed on DOM load:', error);
            return;
        }
        
        if (!window.auth) {
            console.warn('Firebase auth not available after initialization');
            return;
        }
        
        window.auth.onAuthStateChanged(async (user) => {
            try {
                if (!user) {
                    window.localStorage.removeItem('cuetStudentSession');
                    if (studentBtn) {
                        studentBtn.textContent = '👨‍🎓 Student Login';
                        studentBtn.onclick = () => openStudentAuthModal('google');
                    }
                    return;
                }
                const email = (user.email || '').toLowerCase();
                if (!email.endsWith('@student.cuet.ac.bd') || !isValidEduMail(email)) {
                    if (window.auth) {
                        try { await window.auth.signOut(); } catch (_) {}
                    }
                    window.localStorage.removeItem('cuetStudentSession');
                    alert('Only CUET student emails (u<id>@student.cuet.ac.bd) are allowed.');
                    return;
                }
                const m = email.match(/^u(\d{7})@student\.cuet\.ac\.bd$/i);
                if (m) {
                    const sid = m[1];
                    const session = { studentId: sid, email, loggedInAt: Date.now() };
                    window.localStorage.setItem('cuetStudentSession', JSON.stringify(session));
                    if (studentBtn) {
                        studentBtn.textContent = '👤 Your Profile';
                        studentBtn.onclick = openProfileModal;
                    }
                }
            } catch (err) {
                console.error('Auth state change error:', err);
            }
        });
    });
})();

function applyPublicProfileToUI(profileData) {
    try {
        if (!profileData) return;
        const id = String(profileData.studentId || '');
        if (!/^\d{7}$/.test(id)) return;
        const member = (typeof membersArray !== 'undefined' && membersArray) ? membersArray.find(m => String(m.id) === id) : null;
        if (!member) return;
        if (profileData.name) member.name = profileData.name;
        if (profileData.nickname !== undefined) member.nickname = profileData.nickname || null;
        if (profileData.home !== undefined) member.home = profileData.home || null;
        if (profileData.school !== undefined) member.school = profileData.school || null;
        if (profileData.college !== undefined) member.college = profileData.college || null;
        if (profileData.bloodGroup !== undefined) member.bloodGroup = profileData.bloodGroup || null;
        if (profileData.bio !== undefined) member.bio = profileData.bio || null;
        const card = document.querySelector(`.member-card[data-id="${id}"]`);
        if (card) {
            const h3 = card.querySelector('h3');
            if (h3) h3.textContent = member.nickname || member.name || 'Unknown';
            let bgEl = card.querySelector('.member-blood');
            if (bgEl) {
                bgEl.textContent = member.bloodGroup ? `🩸 ${member.bloodGroup}` : '';
                if (!member.bloodGroup) bgEl.remove();
            } else if (member.bloodGroup) {
                bgEl = document.createElement('div');
                bgEl.className = 'member-blood';
                bgEl.textContent = `🩸 ${member.bloodGroup}`;
                card.appendChild(bgEl);
            }
        }

        // Update modal if open for this member
        const modal = document.getElementById('modalOverlay');
        if (modal && modal.classList.contains('show')) {
            const currentIdEl = document.getElementById('modalId');
            if (currentIdEl && currentIdEl.textContent && currentIdEl.textContent.includes(id)) {
                try {
                    document.getElementById('modalName').innerHTML = `<strong style=\"color: hotpink\">Full Name:</strong> ${member.name}`;
                    document.getElementById('modalHome').innerHTML = `<strong style=\"color: hotpink\">Home:</strong> ${member.home || 'Not specified'}`;
                    document.getElementById('modalCollege').innerHTML = `<strong style=\"color: hotpink\">College:</strong> ${member.college || 'Not specified'}`;
                    document.getElementById('modalSchool').innerHTML = `<strong style=\"color: hotpink\">School:</strong> ${member.school || 'Not specified'}`;
                    const bloodEl = document.getElementById('modalBlood');
                    if (bloodEl) bloodEl.innerHTML = `<strong style=\"color: hotpink\">Blood Group:</strong> ${member.bloodGroup || 'Not specified'}`;
                } catch (_) {}
            }
        }
    } catch (_) {}
}

let __unsubscribePublicProfiles = null;
function subscribeToPublicProfilesUpdates() {
    try {
        if (typeof db === 'undefined' || !db) return;
        if (__unsubscribePublicProfiles) return; // already subscribed
        __unsubscribePublicProfiles = db.collection('publicProfiles').onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const data = change.doc.data() || {};
                data.studentId = data.studentId || change.doc.id;
                applyPublicProfileToUI(data);
            });
        }, (err) => {
            console.error('publicProfiles listener error', err);
        });
    } catch (err) {
        console.error('Failed to subscribe to publicProfiles', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ensureFirebase().then(() => {
        try { subscribeToPublicProfilesUpdates(); } catch (_) {}
    }).catch(() => {});
});
