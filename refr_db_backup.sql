-- MySQL dump 10.13  Distrib 9.2.0, for Win64 (x86_64)
--
-- Host: localhost    Database: refr_db
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `addressId` int NOT NULL,
  `city` varchar(90) NOT NULL,
  `street` varchar(90) NOT NULL,
  `appartment` varchar(90) NOT NULL,
  `zip` varchar(90) NOT NULL,
  PRIMARY KEY (`addressId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'Київ','Кирилівська','23','03495'),(2,'Львів','Андріївська','2','03185'),(3,'Полтава','Прилужна','54б','04829'),(4,'Харків','Івана Дзюби','15','02323'),(5,'Запоріжжя','Волноваська','55','02455'),(6,'1','1','1','1'),(7,'1','1','1','1'),(8,'Киевская область','Киев, ул. Ушакова','123','03179'),(9,'Киевская область','1','234','03179'),(10,'Киевская область','ул. ewq','we','03179'),(11,'Киевская область','Киев, ул. Ушакова','23','03179'),(12,'а','Киев, ул. Ушакова','123','03179');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `authorId` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `authorImg` text NOT NULL,
  PRIMARY KEY (`authorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Conor Hopkins','/img/blog/01/authorImg.jpg'),(2,'Sumaiya Elliott','/img/blog/02/authorImg.jpg'),(3,'Andrew Micken','/img/blog/03/authorImg.jpg');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `blogId` int NOT NULL AUTO_INCREMENT,
  `title_us` varchar(255) NOT NULL,
  `title_ua` varchar(255) DEFAULT NULL,
  `bgImg` text NOT NULL,
  `topicTitles_us` json NOT NULL,
  `topicTexts_us` json NOT NULL,
  `date` text NOT NULL,
  `authorId` int NOT NULL,
  `viewId` int NOT NULL,
  `topicTitles_ua` json DEFAULT NULL,
  `topicTexts_ua` json DEFAULT NULL,
  PRIMARY KEY (`blogId`),
  KEY `authorId_idx` (`authorId`),
  KEY `viewId_idx` (`viewId`),
  CONSTRAINT `authorId` FOREIGN KEY (`authorId`) REFERENCES `authors` (`authorId`),
  CONSTRAINT `viewId` FOREIGN KEY (`viewId`) REFERENCES `viewdir` (`viewId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,'Authentic belgian brussels waffles recipe','Автентичний рецепт бельгійських брюссельських вафель','/img/blog/01/bgImg.jpeg','[\"The history of brussels waffles\", \"Ingredients\", \"Instructions\"]','[\"The brussels waffles is the oldest type of waffle and dates its first occurrence back to 1842/43. The swiss baker, florian dacher, who came from brussels introduced these special waffles for the first time in the city of ghent, belgium. The first written recipe would later be published in 1864 by philippe cauderlier in the his book “la pâtisserie et la confiture”\", \"2 cups (500g) French T55 flour, 4 tbsp. (50g) sugar, 1 ½ tbsp. (20g) baking powder, ¾ tsp (4g) salt, ¾ stick (80g) melted butter, 1 ½ cups (360 ml) milk, 4 whole eggs, 5 egg white\", \"Combine the flour, sugar, baking powder, and salt in bowl. Using your whisk, mix all the previous ingredients. Add whole eggs to mix. Gradually whisk milk into the mix. Add melted butter to the mix. In a separate bowl, using your whisk or mixer beat egg whites to peaks until it forms into whip cream. Gradually work in the whip cream into the mix using a spatula. Pre-heat waffle iron to 410-430°F (210-220°C) and cook for 3-4 min. Remember to swivel your iron around for even distribution of batter.\"]','2025-02-02',1,1,'[\"Історія брюссельських вафель\", \"Інгредієнти\", \"Інструкції\"]','[\"Брюссельські вафлі — найстаріший тип вафель, перша згадка про які датується 1842/43 роками. Швейцарський пекар Флоріан Даше, який прибув із Брюсселя, вперше представив ці особливі вафлі в місті Гент, Бельгія. Перший письмовий рецепт був опублікований пізніше, у 1864 році, Філіппом Кодерльє в його книзі «La Pâtisserie et la Confiture»\", \"2 склянки (500 г) французького борошна Т55, 4 ст. ложки (50 г) цукру, 1,5 ст. ложки (20 г) розпушувача, ¾ ч. ложки (4 г) солі, ¾ палички (80 г) розтопленого вершкового масла, 1,5 склянки (360 мл) молока, 4 цілих яйця, 5 яєчних білків\", \"Змішайте борошно, цукор, розпушувач і сіль у мисці. За допомогою вінчика перемішайте усі попередні інгредієнти. Додайте цілі яйця до суміші. Поступово влийте молоко, перемішуючи вінчиком. Додайте розтоплене вершкове масло. В окремій мисці збийте яєчні білки вінчиком або міксером до утворення піків, поки вони не перетворяться на збиті вершки. Поступово вмішайте збиті вершки в суміш за допомогою лопатки. Розігрійте вафельницю до 210-220°C і випікайте 3-4 хвилини. Не забудьте повертати вафельницю для рівномірного розподілу тіста.\"]'),(2,'Health Benefits of Oranges','Користь для здоров’я від апельсинів','/img/blog/02/bgImg.jpg','[\"Health Benefits\", \"Fiber\", \"Calcium\", \"Portion Sizes\"]','[\"Oranges are a nutritional powerhouse, packed with vitamins and minerals. The most noteworthy of these is vitamin C, a water-soluble antioxidant that prevents cell damage. How does it work? Every cell in the body contains DNA, which is vulnerable to damage, or mutations, when exposed to free radicals. When DNA mutates, it can lead to the growth of cancerous cells. Vitamin C neutralizes free radicals and can prevent this mutation.\", \"The fiber in oranges can keep blood sugar levels in check and reduce high cholesterol to prevent cardiovascular disease.\", \"Oranges contain approximately 55 milligrams of calcium, or 6% of your daily requirement. This nutrient is important for building strong bones and maintaining bone health. It\'s typically associated with dairy products like milk — but whole vegetables and fruits, like oranges, are also a good source.\", \"Oranges are high in potassium, so if you\'re on beta-blockers, eating too many can lead to kidney damage. If you have a condition called hemochromatosis and your body stores excess iron, too much vitamin C can increase iron levels and lead to tissue damage. If you prefer to drink your fruits, stick to one or two glasses of OJ a day. Juices are higher in sugar and lower in fiber. Excess sugar can lead to weight gain.\"]','2025-02-02',2,1,'[\"Користь для здоров’я\", \"Клітковина\", \"Кальцій\", \"Розміри порцій\"]','[\"Апельсини — це справжнє джерело поживних речовин, наповнене вітамінами та мінералами. Найвизначнішим з них є вітамін С, водорозчинний антиоксидант, який запобігає пошкодженню клітин. Як це працює? Кожна клітина в організмі містить ДНК, яка вразлива до пошкоджень або мутацій під впливом вільних радикалів. Коли ДНК мутує, це може призвести до росту ракових клітин. Вітамін С нейтралізує вільні радикали і може запобігти цим мутаціям.\", \"Клітковина в апельсинах допомагає контролювати рівень цукру в крові та знижувати високий рівень холестерину, запобігаючи серцево-судинним захворюванням.\", \"Апельсини містять приблизно 55 міліграмів кальцію, що становить 6% вашої добової потреби. Цей поживний елемент важливий для формування міцних кісток і підтримки здоров’я кісток. Зазвичай його асоціюють із молочними продуктами, такими як молоко, але цілі овочі та фрукти, як апельсини, також є хорошим джерелом.\", \"Апельсини багаті на калій, тому, якщо ви приймаєте бета-блокатори, надмірне їх споживання може призвести до пошкодження нирок. Якщо у вас є стан, який називається гемохроматозом, і ваш організм накопичує надлишок заліза, занадто багатовітаміну С може підвищити рівень заліза і призвести до пошкодження тканин. Якщо ви віддаєте перевагу пити фрукти, обмежтеся однією-двома склянками апельсинового соку на день. Соки містять більше цукру і менше клітковини. Надлишок цукру може призвести до набору ваги.\"]'),(3,'What are the Benefits of Eating Salads?','Які переваги вживання салатів?','/img/blog/03/bgImg.jpg','[\"Healthy Salads Help You Get Enough Fruits and Vegetables\", \"Vegetable and Fruit Salads are Full of Fibre\", \"A Salad Provides Water\"]','[\"Some people struggle when it comes to eating enough fruits and vegetables to maintain a healthy diet. Having a fresh salad every day can make it easy to get all of the servings you need, plus it supports a clean eating lifestyle. To get the most benefit, try to keep the majority of the ingredients in their raw form. These pack the biggest punch when it comes to creating a truly healthy salad, plus they\'re full of flavour and satisfying crunch.\", \"Fibre is a wonderful thing; it helps you feel full longer and can provide a range of health benefits. For example, a fibre-rich diet can help alleviate and prevent constipation and lower cholesterol. It can also make it easier to maintain a healthy body weight which reduces your risk of developing heart disease and diabetes. Your blood sugar levels may also stay more even, helping to prevent cravings for sugary foods.\", \"Some people are surprised to hear that fruits and vegetables are actually great sources of water. In fact, watermelon and strawberries are around 92 percent water while cucumber and certain lettuces are a startling 96 percent water. Eating a combination of vegetables and fruits will high water contents can help you stay hydrated even if you don\'t have the opportunity to grab a glass of water to drink. Plus, the water consumption from foods does count towards your daily needs.\"]','2025-02-02',3,2,'[\"Здорові салати допомагають отримувати достатньо фруктів і овочів\", \"Овочеві та фруктові салати багаті на клітковину\", \"Салат забезпечує воду\"]','[\"Деяким людям важко споживати достатньо фруктів і овочів, щоб підтримувати здорове харчування. Щоденний свіжий салат може полегшити отримання всіх необхідних порцій, а також підтримує здоровий спосіб життя. Для максимальної користі намагайтеся залишати більшість інгредієнтів у сирому вигляді. Вони мають найбільший ефект для створення дійсно здорового салату, а також сповнені смаку та приємної хрусткості.\", \"Клітковина — це чудова річ; вона допомагає довше відчувати ситість і може принести низку переваг для здоров’я. Наприклад, дієта, багата на клітковину, може допомогти полегшити та запобігти закрепам і знизити рівень холестерину. Вона також полегшує підтримання здорової ваги тіла, що знижує ризик розвитку серцевих захворювань і діабету. Рівень цукру в крові також може залишатися більш стабільним, що допомагає запобігти тязі до солодкої їжі.\", \"Деякі люди здивовані, дізнавшись, що фрукти та овочі насправді є чудовими джерелами води. Наприклад, кавун і полуниця містять приблизно 92% води, тоді як огірок і деякі види салату вражають вмістом води на рівні 96%. Споживання комбінації овочів і фруктів з високим вмістом води може допомогти залишатися зволоженим, навіть якщо у вас немає можливості випити склянку води. Крім того, вода, отримана з їжі, враховується у ваших щоденних потребах.\"]');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs_tags`
--

DROP TABLE IF EXISTS `blogs_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs_tags` (
  `blogId` int DEFAULT NULL,
  `tagId` int DEFAULT NULL,
  KEY `blogId` (`blogId`),
  KEY `tagId` (`tagId`),
  CONSTRAINT `blogs_tags_ibfk_1` FOREIGN KEY (`blogId`) REFERENCES `blogs` (`blogId`),
  CONSTRAINT `blogs_tags_ibfk_2` FOREIGN KEY (`tagId`) REFERENCES `tagsdir` (`tagId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs_tags`
--

LOCK TABLES `blogs_tags` WRITE;
/*!40000 ALTER TABLE `blogs_tags` DISABLE KEYS */;
INSERT INTO `blogs_tags` VALUES (1,1),(1,2),(1,3),(2,2),(2,4),(2,7),(3,2),(3,5),(3,7);
/*!40000 ALTER TABLE `blogs_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `title_us` varchar(50) NOT NULL,
  `title_ua` varchar(50) NOT NULL,
  `path` varchar(50) NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Bakery','Випічка','bakery'),(2,'Fruits and vegetables','Фрукти та овочі','frnveg'),(3,'Meat and fish','М\'ясо та риба','meatnfish'),(4,'Drinks','Напої','drinks');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveriesdir`
--

DROP TABLE IF EXISTS `deliveriesdir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveriesdir` (
  `deliveryId` int NOT NULL,
  `deliveryTitle` varchar(70) NOT NULL,
  PRIMARY KEY (`deliveryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveriesdir`
--

LOCK TABLES `deliveriesdir` WRITE;
/*!40000 ALTER TABLE `deliveriesdir` DISABLE KEYS */;
INSERT INTO `deliveriesdir` VALUES (0,'Ukrpost'),(1,'Nova post');
/*!40000 ALTER TABLE `deliveriesdir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farms`
--

DROP TABLE IF EXISTS `farms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farms` (
  `farmId` int NOT NULL AUTO_INCREMENT,
  `title_us` varchar(75) NOT NULL,
  `title_ua` varchar(45) NOT NULL,
  `descr` json NOT NULL,
  PRIMARY KEY (`farmId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farms`
--

LOCK TABLES `farms` WRITE;
/*!40000 ALTER TABLE `farms` DISABLE KEYS */;
INSERT INTO `farms` VALUES (1,'Grocery Farm Fields','Поля Ферми \"Гросері\"','[\"We work hard to ensure that the fruit and vegetables we sell are fresh and high in quality. If we don\'t grow them ourselves, we source them from carefully chosen suppliers, preferring to buy locally whenever possible.\", \"РњРё РЅР°РїРѕР»РµРіР»РёРІРѕ РїСЂР°С†СЋС”РјРѕ РЅР°Рґ С‚РёРј, С‰РѕР± С„СЂСѓРєС‚Рё С‚Р° РѕРІРѕС‡С–, СЏРєС– РјРё РїСЂРѕРґР°С”РјРѕ, Р±СѓР»Рё СЃРІС–Р¶РёРјРё С‚Р° РІРёСЃРѕРєРѕС— СЏРєРѕСЃС‚С–. РЇРєС‰Рѕ РјРё РЅРµ РІРёСЂРѕС‰СѓС”РјРѕ С—С… СЃР°РјС–, РјРё РѕС‚СЂРёРјСѓС”РјРѕ С—С… РІС–Рґ СЂРµС‚РµР»СЊРЅРѕ РІС–РґС–Р±СЂР°РЅРёС… РїРѕСЃС‚Р°С‡Р°Р»СЊРЅРёРєС–РІ, РІС–РґРґР°СЋС‡Рё РїРµСЂРµРІР°РіСѓ Р·Р°РєСѓРїС–РІР»С– РЅР° РјС–СЃС†С–, РєРѕР»Рё С†Рµ РјРѕР¶Р»РёРІРѕ.\"]'),(2,'Golden Valley','Золота Долина','[\"We work hard to ensure that the fruit and vegetables we sell are fresh and high in quality. If we don\'t grow them ourselves, we source them from carefully chosen suppliers, preferring to buy locally whenever possible.\", \"РњРё РЅР°РїРѕР»РµРіР»РёРІРѕ РїСЂР°С†СЋС”РјРѕ РЅР°Рґ С‚РёРј, С‰РѕР± С„СЂСѓРєС‚Рё С‚Р° РѕРІРѕС‡С–, СЏРєС– РјРё РїСЂРѕРґР°С”РјРѕ, Р±СѓР»Рё СЃРІС–Р¶РёРјРё С‚Р° РІРёСЃРѕРєРѕС— СЏРєРѕСЃС‚С–. РЇРєС‰Рѕ РјРё РЅРµ РІРёСЂРѕС‰СѓС”РјРѕ С—С… СЃР°РјС–, РјРё РѕС‚СЂРёРјСѓС”РјРѕ С—С… РІС–Рґ СЂРµС‚РµР»СЊРЅРѕ РІС–РґС–Р±СЂР°РЅРёС… РїРѕСЃС‚Р°С‡Р°Р»СЊРЅРёРєС–РІ, РІС–РґРґР°СЋС‡Рё РїРµСЂРµРІР°РіСѓ Р·Р°РєСѓРїС–РІР»С– РЅР° РјС–СЃС†С–, РєРѕР»Рё С†Рµ РјРѕР¶Р»РёРІРѕ.\"]'),(3,'Dragon Hill Ranch','Драконовий Пагорб','[\"We work hard to ensure that the fruit and vegetables we sell are fresh and high in quality. If we don\'t grow them ourselves, we source them from carefully chosen suppliers, preferring to buy locally whenever possible.\", \"РњРё РЅР°РїРѕР»РµРіР»РёРІРѕ РїСЂР°С†СЋС”РјРѕ РЅР°Рґ С‚РёРј, С‰РѕР± С„СЂСѓРєС‚Рё С‚Р° РѕРІРѕС‡С–, СЏРєС– РјРё РїСЂРѕРґР°С”РјРѕ, Р±СѓР»Рё СЃРІС–Р¶РёРјРё С‚Р° РІРёСЃРѕРєРѕС— СЏРєРѕСЃС‚С–. РЇРєС‰Рѕ РјРё РЅРµ РІРёСЂРѕС‰СѓС”РјРѕ С—С… СЃР°РјС–, РјРё РѕС‚СЂРёРјСѓС”РјРѕ С—С… РІС–Рґ СЂРµС‚РµР»СЊРЅРѕ РІС–РґС–Р±СЂР°РЅРёС… РїРѕСЃС‚Р°С‡Р°Р»СЊРЅРёРєС–РІ, РІС–РґРґР°СЋС‡Рё РїРµСЂРµРІР°РіСѓ Р·Р°РєСѓРїС–РІР»С– РЅР° РјС–СЃС†С–, РєРѕР»Рё С†Рµ РјРѕР¶Р»РёРІРѕ.\"]'),(4,'Blueberry Hill Ridge','Чорничний Скеля','[\"We work hard to ensure that the fruit and vegetables we sell are fresh and high in quality. If we don\'t grow them ourselves, we source them from carefully chosen suppliers, preferring to buy locally whenever possible.\", \"РњРё РЅР°РїРѕР»РµРіР»РёРІРѕ РїСЂР°С†СЋС”РјРѕ РЅР°Рґ С‚РёРј, С‰РѕР± С„СЂСѓРєС‚Рё С‚Р° РѕРІРѕС‡С–, СЏРєС– РјРё РїСЂРѕРґР°С”РјРѕ, Р±СѓР»Рё СЃРІС–Р¶РёРјРё С‚Р° РІРёСЃРѕРєРѕС— СЏРєРѕСЃС‚С–. РЇРєС‰Рѕ РјРё РЅРµ РІРёСЂРѕС‰СѓС”РјРѕ С—С… СЃР°РјС–, РјРё РѕС‚СЂРёРјСѓС”РјРѕ С—С… РІС–Рґ СЂРµС‚РµР»СЊРЅРѕ РІС–РґС–Р±СЂР°РЅРёС… РїРѕСЃС‚Р°С‡Р°Р»СЊРЅРёРєС–РІ, РІС–РґРґР°СЋС‡Рё РїРµСЂРµРІР°РіСѓ Р·Р°РєСѓРїС–РІР»С– РЅР° РјС–СЃС†С–, РєРѕР»Рё С†Рµ РјРѕР¶Р»РёРІРѕ.\"]'),(5,'Honeybuzz Meadow','Медове Гудіння','[\"We work hard to ensure that the fruit and vegetables we sell are fresh and high in quality. If we don\'t grow them ourselves, we source them from carefully chosen suppliers, preferring to buy locally whenever possible.\", \"РњРё РЅР°РїРѕР»РµРіР»РёРІРѕ РїСЂР°С†СЋС”РјРѕ РЅР°Рґ С‚РёРј, С‰РѕР± С„СЂСѓРєС‚Рё С‚Р° РѕРІРѕС‡С–, СЏРєС– РјРё РїСЂРѕРґР°С”РјРѕ, Р±СѓР»Рё СЃРІС–Р¶РёРјРё С‚Р° РІРёСЃРѕРєРѕС— СЏРєРѕСЃС‚С–. РЇРєС‰Рѕ РјРё РЅРµ РІРёСЂРѕС‰СѓС”РјРѕ С—С… СЃР°РјС–, РјРё РѕС‚СЂРёРјСѓС”РјРѕ С—С… РІС–Рґ СЂРµС‚РµР»СЊРЅРѕ РІС–РґС–Р±СЂР°РЅРёС… РїРѕСЃС‚Р°С‡Р°Р»СЊРЅРёРєС–РІ, РІС–РґРґР°СЋС‡Рё РїРµСЂРµРІР°РіСѓ Р·Р°РєСѓРїС–РІР»С– РЅР° РјС–СЃС†С–, РєРѕР»Рё С†Рµ РјРѕР¶Р»РёРІРѕ.\"]'),(6,'Sweet Milk Acres','Луг Солодкого Молока','[\"We work hard to ensure that the fruit and vegetables we sell are fresh and high in quality. If we don\'t grow them ourselves, we source them from carefully chosen suppliers, preferring to buy locally whenever possible.\", \"РњРё РЅР°РїРѕР»РµРіР»РёРІРѕ РїСЂР°С†СЋС”РјРѕ РЅР°Рґ С‚РёРј, С‰РѕР± С„СЂСѓРєС‚Рё С‚Р° РѕРІРѕС‡С–, СЏРєС– РјРё РїСЂРѕРґР°С”РјРѕ, Р±СѓР»Рё СЃРІС–Р¶РёРјРё С‚Р° РІРёСЃРѕРєРѕС— СЏРєРѕСЃС‚С–. РЇРєС‰Рѕ РјРё РЅРµ РІРёСЂРѕС‰СѓС”РјРѕ С—С… СЃР°РјС–, РјРё РѕС‚СЂРёРјСѓС”РјРѕ С—С… РІС–Рґ СЂРµС‚РµР»СЊРЅРѕ РІС–РґС–Р±СЂР°РЅРёС… РїРѕСЃС‚Р°С‡Р°Р»СЊРЅРёРєС–РІ, РІС–РґРґР°СЋС‡Рё РїРµСЂРµРІР°РіСѓ Р·Р°РєСѓРїС–РІР»С– РЅР° РјС–СЃС†С–, РєРѕР»Рё С†Рµ РјРѕР¶Р»РёРІРѕ.\"]'),(7,'Flour Dreams','Пухкі мрії','[\"We work hard to ensure that the fruit and vegetables we sell are fresh and high in quality. If we don\'t grow them ourselves, we source them from carefully chosen suppliers, preferring to buy locally whenever possible.\", \"РњРё РЅР°РїРѕР»РµРіР»РёРІРѕ РїСЂР°С†СЋС”РјРѕ РЅР°Рґ С‚РёРј, С‰РѕР± С„СЂСѓРєС‚Рё С‚Р° РѕРІРѕС‡С–, СЏРєС– РјРё РїСЂРѕРґР°С”РјРѕ, Р±СѓР»Рё СЃРІС–Р¶РёРјРё С‚Р° РІРёСЃРѕРєРѕС— СЏРєРѕСЃС‚С–. РЇРєС‰Рѕ РјРё РЅРµ РІРёСЂРѕС‰СѓС”РјРѕ С—С… СЃР°РјС–, РјРё РѕС‚СЂРёРјСѓС”РјРѕ С—С… РІС–Рґ СЂРµС‚РµР»СЊРЅРѕ РІС–РґС–Р±СЂР°РЅРёС… РїРѕСЃС‚Р°С‡Р°Р»СЊРЅРёРєС–РІ, РІС–РґРґР°СЋС‡Рё РїРµСЂРµРІР°РіСѓ Р·Р°РєСѓРїС–РІР»С– РЅР° РјС–СЃС†С–, РєРѕР»Рё С†Рµ РјРѕР¶Р»РёРІРѕ.\"]');
/*!40000 ALTER TABLE `farms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farms_categories`
--

DROP TABLE IF EXISTS `farms_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farms_categories` (
  `farmId` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  KEY `farmId` (`farmId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `farms_categories_ibfk_1` FOREIGN KEY (`farmId`) REFERENCES `farms` (`farmId`),
  CONSTRAINT `farms_categories_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farms_categories`
--

LOCK TABLES `farms_categories` WRITE;
/*!40000 ALTER TABLE `farms_categories` DISABLE KEYS */;
INSERT INTO `farms_categories` VALUES (1,2),(2,2),(2,3),(3,2),(4,2),(4,3),(5,1),(5,4),(6,3),(6,4),(7,1);
/*!40000 ALTER TABLE `farms_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measuredir`
--

DROP TABLE IF EXISTS `measuredir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measuredir` (
  `measureId` int NOT NULL AUTO_INCREMENT,
  `title_us` varchar(30) NOT NULL,
  `title_ua` varchar(35) NOT NULL,
  PRIMARY KEY (`measureId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measuredir`
--

LOCK TABLES `measuredir` WRITE;
/*!40000 ALTER TABLE `measuredir` DISABLE KEYS */;
INSERT INTO `measuredir` VALUES (1,'kg','кг'),(2,'lt','л'),(3,'pc','шт.'),(4,'g','г');
/*!40000 ALTER TABLE `measuredir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderId` int NOT NULL,
  `complete` tinyint NOT NULL DEFAULT '0',
  `date` timestamp NOT NULL,
  `info` text,
  `paymentId` int DEFAULT NULL,
  `deliveryId` int DEFAULT NULL,
  `addressId` int DEFAULT NULL,
  PRIMARY KEY (`orderId`),
  KEY `paymentId_idx` (`paymentId`),
  KEY `deliveryId_idx` (`deliveryId`),
  KEY `addressId_idx` (`addressId`),
  CONSTRAINT `addressId` FOREIGN KEY (`addressId`) REFERENCES `addresses` (`addressId`),
  CONSTRAINT `deliveryId` FOREIGN KEY (`deliveryId`) REFERENCES `deliveriesdir` (`deliveryId`),
  CONSTRAINT `paymentId` FOREIGN KEY (`paymentId`) REFERENCES `paymentsdir` (`paymentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'2025-04-02 10:05:30',NULL,0,0,1),(2,0,'2025-04-02 14:57:10','фцыфв',0,0,6),(3,0,'2025-04-02 14:59:01','фцыфв',0,0,7),(4,0,'2025-04-02 15:02:08','',0,0,8),(5,0,'2025-04-02 15:05:11','sdfsdfsdfsf',0,0,9),(6,0,'2025-04-04 11:36:51','',0,0,10),(7,0,'2025-04-04 11:37:31','',0,0,11),(8,0,'2025-04-04 11:48:47','',0,0,12);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentsdir`
--

DROP TABLE IF EXISTS `paymentsdir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentsdir` (
  `paymentId` int NOT NULL,
  `paymentTitle` varchar(60) NOT NULL,
  PRIMARY KEY (`paymentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentsdir`
--

LOCK TABLES `paymentsdir` WRITE;
/*!40000 ALTER TABLE `paymentsdir` DISABLE KEYS */;
INSERT INTO `paymentsdir` VALUES (0,'Card'),(1,'Cash');
/*!40000 ALTER TABLE `paymentsdir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL,
  `title_us` varchar(255) NOT NULL,
  `title_ua` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `datedPrice` decimal(10,2) DEFAULT NULL,
  `descr_us` text NOT NULL,
  `descr_ua` text NOT NULL,
  `rating` int NOT NULL,
  `imgUrl` text NOT NULL,
  `amount` int NOT NULL,
  `freshness` int NOT NULL,
  `shipping` int NOT NULL,
  `sells` int NOT NULL,
  `measureId` int NOT NULL,
  `farmId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`productId`),
  KEY `products_ibfk_1` (`measureId`),
  KEY `products_ibfk_2` (`farmId`),
  KEY `products_ifbk_3_idx` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`measureId`) REFERENCES `measuredir` (`measureId`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`farmId`) REFERENCES `farms` (`farmId`),
  CONSTRAINT `products_ifbk_3` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`),
  CONSTRAINT `products_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5))),
  CONSTRAINT `products_chk_2` CHECK (((`shipping` >= 1) and (`shipping` <= 5)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Carrots','Морква ',12.43,15.34,'Fresh, crisp carrots bursting with sweetness and packed with vitamins A and C. Perfect for salads, snacks, or cooking.','Свіжа, хрустка морква, наповнена солодкістю та вітамінами А та С. Ідеально підходить для салатів, закусок або кулінарії.',5,'[\"/img/items/01/carrot01.jpg\",\"/img/items/01/carrot02.jpg\"]',154,1,1,142,1,2,2),(2,'Apples','Яблука',5.43,NULL,'Juicy, hand-picked apples with a delightful sweet-tart crunch. A healthy, everyday snack option.','Соковиті, зібрані вручну яблука з чудовим солодко-терпким хрускотом. Здоровий щоденний варіант перекусу.',4,'[\"/img/items/02/apples01.jpg\"]',56,1,1,23,1,3,2),(3,'Peaches','Персики',5.34,NULL,'Plump, ripe peaches with velvety skin and a juicy, sweet flavor. Ideal for desserts or fresh eating.','Пухкі стиглі персики з оксамитовою шкіркою та соковитим солодким смаком. Ідеально підходить для десертів або свіжого споживання.',4,'[\"/img/items/03/peaches01.jpg\"]',76,1,2,54,1,4,2),(4,'Bananas','Банани',5.34,8.95,'Smooth, ripe bananas offering a creamy texture and natural sweetness. Great for smoothies or on-the-go energy.','Гладкі стиглі банани з кремовою текстурою та природною солодкістю. Чудово підходить для смузі або енергії в дорозі.',4,'[\"/img/items/04/bananas01.jpg\"]',35,1,2,55,1,2,2),(5,'Mango','Манго',4.54,6.72,'Luscious, tropical mangoes with vibrant color and a rich, sweet taste. A perfect treat or recipe enhancer.','Соковиті тропічні манго з яскравим кольором і насиченим солодким смаком. Ідеальне ласощі або підсилювач рецептів.',3,'[\"/img/items/05/mango01.jpg\"]',24,1,3,122,1,1,2),(6,'Passion fruit','Маракуйя',7.56,9.92,'Exotic passion fruits with a zesty, juicy pulp. Add a tropical twist to drinks or desserts.','Екзотичні маракуйї з пікантною соковитою м\'якоттю. Додайте тропічний відтінок напоям чи десертам.',4,'[\"/img/items/06/pasfruit01.jpg\"]',22,1,4,654,1,3,2),(7,'Honey Oat Rolls','Вівсяні рулетики',4.24,NULL,'Soft, golden rolls sweetened with farm-fresh honey and topped with wholesome oats.','М’які булочки золотистого кольору, підсолоджені свіжим фермерським медом і посипані вівсом.',4,'[\"/img/items/Bakery/Honey_Oat_Rolls/Honey_Oat_Rolls2.jpg\", \"/img/items/Bakery/Honey_Oat_Rolls/Honey_Oat_Rolls.webp\"]',30,5,1,100,4,5,1),(8,'Cheese Scones','Сирні булочки',2.33,3.99,'Savory scones packed with aged farm cheese, perfect for a hearty snack or breakfast.','Пікантні скони з витриманим фермерським сиром, ідеальні для ситного перекусу чи сніданку.',4,'[\"/img/items/Bakery/Cheese_Scones/Cheese_Scones1.webp\", \"/img/items/Bakery/Cheese_Scones/Cheese_Scones2.jpg\"]',44,5,1,244,4,7,1),(9,'Cinnamon Buns','Булочки з корицею',3.54,3.99,'Warm, sticky buns swirled with cinnamon and sugar, made with real butter from our farm.','Теплі, липкі булочки з корицею та цукром, приготовані з справжнім фермерським маслом.',5,'[\"/img/items/Bakery/Cinnamon_Buns/Cinnamon_Buns1.jpg\", \"/img/items/Bakery/Cinnamon_Buns/Cinnamon_Buns2.jpg\"]',50,5,1,254,4,7,1),(10,'Rye Bread','Ржаний хліб',2.56,NULL,'A dense, flavorful bread crafted from rye flour, ideal for pairing with soups or cheeses.','Густий, ароматний хліб із житнього борошна, чудово пасує до супів чи сирів.',5,'[\"/img/items/Bakery/Rye_Bread/Rye_Bread1.webp\"]',30,4,1,244,4,5,1),(11,'Poppy Seed Bagels','Бублик',6.54,NULL,'Chewy bagels sprinkled with poppy seeds, boiled and baked for an authentic taste.','Жувальні бублики з маком, відварені та випечені для справжнього смаку.',3,'[\"/img/items/Bakery/Poppy_Seed_Bagels/Poppy_Seed_Bagels1.jpg\"]',50,5,1,243,4,5,1),(12,'Apple Pie','Яблучний пиріг',12.99,15.00,'A classic pie filled with sweet, farm-grown apples and a flaky, buttery crust.','Класичний пиріг із солодкими яблуками, вирощеними на фермі, та хрустким масляним тістом.',5,'[\"/img/items/Bakery/Apple_Pie/Apple_Pie1.jpg\"]',25,5,2,245,4,7,1),(13,'Grass-Fed Beef Steak','Еко-стейк з яловичини',35.99,NULL,'Juicy, tender steak from cows raised on lush pastures, free of hormones.','Соковитий, ніжний стейк із яловичини, вирощеної на соковитих пасовищах без гормонів.',4,'[\"/img/items/MeatAndFish/Grass-Fed_Beef_Steak/Grass-Fed_Beef_Steak1.webp\", \"/img/items/MeatAndFish/Grass-Fed_Beef_Steak/Grass-Fed_Beef_Steak2.jpg\"]',100,5,2,254,1,2,3),(14,'Farmhouse Pork Sausages','Фермерські сосиски',27.99,NULL,'Handmade sausages from free-range pork, seasoned with natural herbs and spices.','Домашні ковбаски зі свинини вільного вигулу, приправлені натуральними травами та спеціями.',4,'[\"/img/items/MeatAndFish/Farmhouse_Pork_Sausages/Farmhouse_Pork_Sausages1.jpg\",\"/img/items/MeatAndFish/Farmhouse_Pork_Sausages/Farmhouse_Pork_Sausages2.jpg\" ]',68,5,2,345,1,4,3),(15,'Smoked Chicken Breast','Копчена курка',29.99,35.99,'Succulent chicken breast smoked over oak wood for a rich, savory flavor.','Соковита куряча грудка, копчена на дубовій деревині для насиченого смаку.',5,'[\"/img/items/MeatAndFish/Smoked_Chicken_Breast/Smoked_Chicken_Breast1.jpg\"]',99,5,1,256,1,2,3),(16,'Fresh River Trout','Свіжа форель',44.99,NULL,'Whole trout caught fresh from clear river waters, perfect for grilling or baking.','Свіжа річкова форель, виловлена з чистої води, ідеальна для гриля чи запікання.',2,'[\"/img/items/MeatAndFish/Fresh_River_Trout/Fresh_River_Trout1.webp\"]',196,5,1,123,1,4,3),(17,'Lamb Ribs','Баранячі ребра',50.00,55.99,'Tender, flavorful ribs from pasture-raised lambs, great for slow cooking.','Ніжні, ароматні ребра ягнят, вирощених на пасовищах, чудові для повільного приготування.',3,'[\"/img/items/MeatAndFish/Lamb_Ribs/Lamb_Ribs1.jpg\"]',200,5,1,154,1,2,3),(18,'Duck Confit','Качине конфі',47.99,NULL,'Rich and tender duck legs slow-cooked in their own fat, a farm delicacy.','Насичені та ніжні качині ніжки, повільно приготовані у власному жирі, фермерський делікатес.',2,'[\"/img/items/MeatAndFish/Duck_Confit/Duck_Confit.jpg\"]',100,5,1,154,3,4,3),(19,'Homemade Bacon','Домашній бекон',19.99,NULL,'Thick-cut bacon cured and smoked in-house using traditional methods.','Товсто нарізаний бекон, засолений і копчений за традиційними методами.',4,'[\"/img/items/MeatAndFish/Homemade_Bacon/Homemade_Bacon.jpg\"]',196,5,1,158,1,6,3),(20,'Turkey Fillet','Філе індички',22.99,25.99,'Lean, juicy turkey fillet from free-range birds, perfect for healthy meals.','Пісне, соковите філе індички від птахів вільного вигулу, ідеальне для здорових страв.',5,'[\"/img/items/MeatAndFish/Turkey_Fillet/Turkey_Fillet1.webp\"]',195,4,1,546,1,6,3),(21,'Smoked Mackerel','Скумбрія копчена',38.99,NULL,'Fatty, flavorful mackerel smoked to perfection, sourced from sustainable fisheries.','Жирна, ароматна скумбрія, копчена до досконалості, з екологічно чистих джерел.',5,'[\"/img/items/MeatAndFish/Smoked_Mackerel/Smoked_Mackerel1.jpg\"]',100,4,1,654,3,6,3),(22,'Beef Jerky','В\'ялена яловичина',30.99,NULL,'Chewy, spiced beef strips dried naturally, a protein-packed snack.','Жувальні, пряні смужки яловичини, висушені натуральним способом, багатий на білок перекус.',5,'[\"/img/items/MeatAndFish/Beef_Jerky/Beef_Jerky1.webp\"]',87,4,1,654,1,6,3),(23,'Fresh Apple Juice','Свіжий яблучний сік',10.99,13.99,'Pure, unfiltered juice pressed from ripe farm apples, no added sugar.','Чистий, нефільтрований сік із стиглих фермерських яблук, без доданого цукру.',3,'[\"/img/items/Drinks/Fresh_Apple_Juice/Fresh_Apple_Juice1.jpg\", \"/img/items/Drinks/Fresh_Apple_Juice/Fresh_Apple_Juice2.jpg\"]',60,4,1,980,2,5,4),(24,'Herbal Tea Blend','Трав\'яна чайна суміш',8.99,NULL,'A soothing mix of farm-grown chamomile, mint, and lavender.','Заспокійлива суміш із фермерської ромашки, м’яти та лаванди.',4,'[\"/img/items/Drinks/Herbal_Tea_Blend/Herbal_Tea_Blend1.webp\", \"/img/items/Drinks/Herbal_Tea_Blend/Herbal_Tea_Blend2.jpg\"]',60,4,1,678,4,6,4),(25,'Raw Milk','Свіже молоко',5.99,NULL,'Creamy, unpasteurized milk straight from our cows, full of natural goodness.','Кремове, непастеризоване молоко прямо від наших корів, сповнене натуральної користі.',5,'[\"/img/items/Drinks/Raw_Milk/Raw_Milk1.jpg\"]',500,5,1,675,2,5,4),(26,'Berry Kombucha','Ягідний чайний гриб',10.99,13.99,'Fizzy, fermented tea infused with fresh farm berries for a tangy taste.','Газований, ферментований чай із свіжими фермерськими ягодами для пікантного смаку.',4,'[\"/img/items/Drinks/Berry_Kombucha/Berry_Kombucha1.jpg\"]',200,5,1,456,2,6,4),(27,'Elderflower Lemonade','Лимонад з бузини',9.99,NULL,'Refreshing lemonade made with wild elderflowers and zesty lemons.','Освіжаючий лимонад із диких квітів бузини та соковитих лимонів.',5,'[\"/img/items/Drinks/Elderflower_Lemonade/Elderflower_Lemonade1.jpg\"]',200,5,1,646,2,5,4),(28,'Spiced Mulled Wine Mix','Суміш глінтвейну зі спеціями',0.09,NULL,'A dry mix of spices and dried fruits to create warm mulled wine at home.','Суха суміш спецій і сушених фруктів для приготування теплого глінтвейну вдома.',4,'[\"/img/items/Drinks/Spiced_Mulled_Wine_Mix/Spiced_Mulled_Wine_Mix1.webp\"]',100,5,1,789,4,6,4),(29,'Cherry Nectar','Вишневий нектар',15.99,NULL,'Thick, sweet nectar made from hand-picked farm cherries.','Густий, солодкий нектар із фермерських вишень, зібраних вручну.',4,'[\"/img/items/Drinks/Cherry_Nectar/Cherry_Nectar1.jpg\"]',200,3,1,122,2,5,4),(30,'Beetroot','Буряк',5.99,NULL,'Deep red, earthy beets grown in fertile soil, perfect for soups or roasting.','Насичено-червоні буряки із землистим смаком, вирощені на родючому ґрунті, ідеальні для супів чи запікання.',4,'[\"/img/items/FruitsAndVegetables/Onion/Onion1.jpg\"]',255,3,1,153,1,1,2),(31,'Onion','Цибуля',3.99,NULL,'Crisp, pungent onions harvested fresh from the farm, a kitchen staple.','Хрустка, гостра цибуля, щойно зібрана на фермі, незамінна на кухні.',3,'[\"/img/items/FruitsAndVegetables/Beetroot/Beetroot.webp\"]',350,5,1,164,1,1,2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewId` int NOT NULL AUTO_INCREMENT,
  `author` varchar(100) NOT NULL,
  `imgUrl` text NOT NULL,
  `text_ua` text NOT NULL,
  `text_us` text NOT NULL,
  PRIMARY KEY (`reviewId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Andrew Milton','/img/reviews/face1.jpg','Дуже люблю свіжі продукти з цього магазину! Хліб на заквасці просто неймовірний, а яблучний сік наче щойно з саду. Доставка також швидка!','Absolutely love the fresh produce from this store! The sourdough bread is to die for, and the apple juice tastes like it’s straight from the orchard. Fast delivery too!'),(2,'Sara Dolc','/img/reviews/face2.jpg','Найкращий фермерський магазин, який я пробувала! Копчена куряча грудка дуже смачна, а булочки з медом і вівсом — улюбленці всієї родини. Усе здається домашнім і справжнім.','The best farm shop I’ve tried! The smoked chicken breast is so flavorful, and the honey oat rolls are a family favorite. Everything feels homemade and authentic.'),(3,'Tom Sonor','/img/reviews/face1.jpg','Тут м’ясо і овочі найвищої якості! Стейк із яловичини на трав’яному вигулі соковитий і ніжний, а буряк додав такого насиченого смаку моєму борщу. Дуже рекомендую!','Top-quality meat and veggies here! The grass-fed beef steak was juicy and tender, and the beetroot added such a rich flavor to my borscht. Highly recommend!'),(4,'Sam Morton','/img/reviews/face4.jpg','Цей магазин — справжня знахідка! Лимонад із бузини освіжаючий і незвичайний, а домашній бекон — найкращий, що я куштувала. Скоро замовлю ще!','This store is a gem! The elderflower lemonade is refreshing and unique, and the homemade bacon is the best I’ve ever had. I’ll be ordering again soon!'),(5,'Mike Konor','/img/reviews/face5.jpg','Чудові продукти і відмінний сервіс! Вишневий нектар — справжнє задоволення, а житній хліб ідеально смакує з їхніми сирними сконами. Обов’язково спробуйте, якщо любите фермерську їжу','Fantastic products and great service! The cherry nectar is pure bliss, and the rye bread pairs perfectly with their cheese scones. A must-try for farm food lovers!');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tagsdir`
--

DROP TABLE IF EXISTS `tagsdir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tagsdir` (
  `tagId` int NOT NULL AUTO_INCREMENT,
  `title_us` varchar(100) DEFAULT NULL,
  `title_ua` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`tagId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tagsdir`
--

LOCK TABLES `tagsdir` WRITE;
/*!40000 ALTER TABLE `tagsdir` DISABLE KEYS */;
INSERT INTO `tagsdir` VALUES (1,'Recipes','Рецепти'),(2,'Food','Їжа'),(3,'Vaffles','Вафлі'),(4,'Oranges','Апельсини'),(5,'Salads','Салати'),(6,'Meat','М\'ясо'),(7,'Vegetarian','Вегетеріанство');
/*!40000 ALTER TABLE `tagsdir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `phone` text NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'ghghg@gmail.com','$2b$10$kNojhBk0ZYeYVtZQoFc2eOLNSY1Pl8CZUjkuS2BQ1hzLNCZABLpgO','qwe','qwer','+380987650280'),(5,'masjf@gmail.com','$2b$10$vvPQ2mxHd1vlhu9WkWLwp.877BFVZr1dfoNao1sCOQBNNEw0b4gp6','name','surname','+380675747284'),(6,'1','$2b$10$0P4t/vKMKH1U0hp06mxvxezZEomgYK6UUMQjVyzPyQUZyC.JEGMkm','1','1','+380875647284'),(7,'2','$2b$10$HJx8tn.7wrAG7DbnNcvIhu3Kqjfy5T6CkQku70wPhcnXk.8QAyJNu','2','2','2'),(8,'3','$2b$10$l4rdusePBeKAwGsYg8M9GOhbKQDoOwle8PxXnRSXjOmVP0rZFTj2K','3','3','3'),(9,'asd','$2b$10$hf8S1Lm1A.cieF6yCwEgEeUDjf/jndRdQjql6hb4VE7SlH2onKQHi','asd','asd','asd'),(10,'fasf','$2b$10$SiniAVP/XSfo6WaCphaY.OpgW6F4P6Rekk63oHdJ0S08VR15px7YK','wadasd','saf','asfas'),(11,'qwe','$2b$10$aEwalfehXB6usEna4CptNO7.pb5vUy9N0cJk1fa9dLF8ICyH1hKMy','qwe','qwe','dasd'),(12,'fdgdfg','$2b$10$kjwwVT3mnDdtWosMgtlj6.MEn.0fuliVxvLDMe4nADZvL9qkJvAlu','dfg','fg','dfgfdg'),(13,'цуйцу','$2b$10$ZQvK2ufOsD77r0XLSGiXHuxQYzTYI3nLRBEGELmnT.n7dwBgVE93q','йцу','йцуй','йцуйц'),(14,'уйцуйц','$2b$10$u9I8835WiK09pksA/uBR8u9ut6PdN6/zMyCvssRk1geso9KH.kPSK','йцу','йцуйц','уйцу'),(15,'йцу','$2b$10$8bFD5ylWI7/WvxylOGNOAOJXefRsjxr03eUmJV0a118ix61sfrrNi','йцу','йцу','кккк');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_orders_products`
--

DROP TABLE IF EXISTS `users_orders_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_orders_products` (
  `userId` int NOT NULL,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `amount` int NOT NULL DEFAULT '1',
  KEY `userId_idx` (`userId`),
  KEY `orderId_idx` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `orderId` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  CONSTRAINT `users_orders_products_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_orders_products`
--

LOCK TABLES `users_orders_products` WRITE;
/*!40000 ALTER TABLE `users_orders_products` DISABLE KEYS */;
INSERT INTO `users_orders_products` VALUES (6,2,25,1),(6,2,2,1),(6,2,23,1),(6,3,25,1),(6,3,2,1),(6,3,23,1),(6,4,25,1),(6,4,2,1),(6,4,23,1),(6,5,25,1),(6,5,2,1),(6,5,23,1),(6,6,1,1),(6,7,1,1),(6,8,2,1);
/*!40000 ALTER TABLE `users_orders_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viewdir`
--

DROP TABLE IF EXISTS `viewdir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viewdir` (
  `viewId` int NOT NULL,
  `title` varchar(70) NOT NULL,
  PRIMARY KEY (`viewId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viewdir`
--

LOCK TABLES `viewdir` WRITE;
/*!40000 ALTER TABLE `viewdir` DISABLE KEYS */;
INSERT INTO `viewdir` VALUES (1,'big'),(2,'small');
/*!40000 ALTER TABLE `viewdir` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-27 15:31:01
