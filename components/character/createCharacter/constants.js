const selectRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const STEP_NAMES = [
  "RACE",
  "CLASS",
  "ABILITIES",
  "BACKGROUND",
  "PERSONALITY",
  "ALIGNMENT",
  "EQUIPMENT",
  "STARTING GOLD",
  "CHARACTER NAME",
];
export const RACE_GENDER = ["male", "female", "diverse"];

export const RACE = [
  {
    name: "Arakocra",
    description:
      "Soaring through the skies, Arakocra are bird-like creatures from the Elemental Plane of Air, renowned for their unparalleled flight and agility. Their keen sense of vision makes them exceptional scouts and fierce combatants.",
  },
  {
    name: "Aasimar",
    description:
      "Blessed with celestial heritage, Aasimars are divine protectors, embodying the light and justice of the Upper Planes. Their radiant presence and healing abilities make them invaluable allies in any adventuring party.",
  },
  {
    name: "Air Genasi",
    description:
      "Born of the breezes, Air Genasi are part-genie beings with a close connection to the Elemental Plane of Air, granting them control over winds and superior agility. They often appear as free-spirited and unpredictable as a summer storm.",
  },
  {
    name: "Astral Elf",
    description:
      "Hailing from the enigmatic Astral Plane, Astral Elves possess otherworldly grace and longevity, often pursuing paths of both arcane and martial excellence. Their connection to astral energy grants them unique magical abilities and insights.",
  },
  {
    name: "Autognome",
    description:
      "Crafted by gnome inventors, Autognomes are mechanical beings with a heart-like drive for adventure, exhibiting both resilience and curiosity. Their intricate design often imbues them with remarkable versatility and problem-solving skills.",
  },
  {
    name: "Bugbear",
    description:
      "Lurking in shadows, Bugbears are hulking, goblinoid brutes known for their strength and stealth, often surprising foes with deadly ambushes. Their natural affinity for intimidation makes them fearsome adversaries.",
  },
  {
    name: "Centaur",
    description:
      "Half-human, half-horse, Centaurs combine the power and speed of a steed with the intellect and dexterity of a humanoid. As guardians of woodland realms, they are often skilled warriors and wise druids.",
  },
  {
    name: "Changeling",
    description:
      "Masters of disguise, Changelings possess the uncanny ability to alter their appearance at will, making them exceptional spies and infiltrators. Their fluid identities reflect a complex relationship with trust and self-expression.",
  },
  {
    name: "Deep Gnome",
    description:
      "Residing in the Underdark, Deep Gnomes are elusive, secretive beings with a deep connection to stone and minerals. Their natural camouflage and innate magical abilities make them exceptional miners and scouts.",
  },
  {
    name: "Dragonborn",
    description:
      "Proud and noble, Dragonborn are dragon-kin warriors with the power to unleash devastating breath attacks. Their clan-based societies are driven by honor and a strong sense of destiny.",
  },
  { name: "Drow", description: "" },
  {
    name: "Duergar",
    description:
      "Dark and doughty, Duergar are a subrace of dwarves that dwell deep in the Underdark, known for their grim demeanor and psionic abilities. Their mastery of stealth and stonecraft makes them formidable foes and skilled artisans.",
  },
  {
    name: "Dwarf",
    description:
      "Stout and hardy, Dwarves are resilient beings famous for their craftsmanship, combat prowess, and unyielding loyalty. Their deep connection to mountains and stone imbues them with a strong sense of tradition and community.",
  },
  {
    name: "Earth Genasi",
    description:
      "Solid and unyielding, Earth Genasi are descendants of earth elementals, possessing rocky skin and an affinity for stone and soil. Their physical strength and durability make them formidable defenders and laborers.",
  },
  {
    name: "Eladrin",
    description:
      "Hailing from the Feywild, Eladrin are fey-touched elves who embody the seasons, each granting them distinct abilities and moods. Their grace and magical prowess are as changing and enchanting as the seasons themselves.",
  },
  {
    name: "Elf",
    description:
      "Graceful and wise, Elves are immortal beings deeply connected to nature and magic, exuding both elegance and lethal skill. Their centuries-long lifespans grant them unparalleled expertise in arts, combat, and lore.",
  },
  {
    name: "Fairy",
    description:
      "Tiny and enchanting, Fairies are whimsical beings from the Feywild, with the innate ability to fly and cast charming spells. Their playful nature and boundless curiosity often lead them to grand adventures.",
  },
  {
    name: "Feral Tiefling",
    description:
      "Born of fiendish ancestry, Feral Tieflings possess a sinister beauty and a fierce independence, marked by their horns, tails, and infernal heritage. Their cunning and agility make them deadly rogues and spellcasters.",
  },
  {
    name: "Firbolg",
    description:
      "Gentle giants attuned to nature, Firbolgs reside in secluded forests, harmonizing with flora and fauna around them. Their druidic magic and enormous strength make them both guardians and protectors of the wild.",
  },
  {
    name: "Fire Genasi",
    description:
      "With hair like flames and skin that radiates warmth, Fire Genasi are descendants of fire elementals, capable of conjuring and withstanding intense heat. Their fiery temperament often matches their elemental heritage.",
  },
  {
    name: "Giff",
    description:
      "Giff are brawny, hippopotamus-like beings known for their military discipline and a penchant for gunpowder weapons. Their robust constitution and martial prowess make them formidable opponents on any battlefield.",
  },
  {
    name: "Githyanki",
    description:
      "Fierce and warlike, Githyanki are astral pirates and raiders armed with psionics and combat skill, constantly battling their ancient enemies. Their strict hierarchy and martial culture foster ruthless efficiency.",
  },
  {
    name: "Githzerai",
    description:
      "Ascetic and introspective, Githzerai dwell in Limbo's chaos, honing their psionic powers and mastering their minds. Their monastic discipline and mental prowess make them highly potent in both combat and meditation.",
  },
  {
    name: "Gnome",
    description:
      "Whimsical and inventive, Gnomes are known for their cheerful demeanor and unparalleled talent for tinkering and illusion magic. Their inexhaustible curiosity drives them to explore and create wonders of both history and magic.",
  },
  {
    name: "Goblin",
    description:
      "Small but scrappy, Goblins are cunning survivors with a knack for mischief and traps, often thriving through sheer opportunism. Their agility and resourcefulness make them expert scavengers and stealthy fighters.",
  },
  {
    name: "Goliath",
    description:
      "Towering and robust, Goliaths are mountain-dwelling nomads, embodying the relentless might of stone and ice. Their physical strength and competitive spirit make them natural athletes and warriors.",
  },
  {
    name: "Grung",
    description:
      "Frog-like and agile, Grungs are tree-dwelling amphibians with toxic skin and an affinity for guerrilla tactics. Their unique biology and combat style make them dangerous opponents in their jungle homes.",
  },
  {
    name: "Hadozee",
    description:
      "Arboreal and agile, Hadozees resemble flying primates, capable of gliding between tree canopies. Their adventurous spirit and skyward mobility make them hard to pin down and thrilling to watch.",
  },
  {
    name: "Half-Elf",
    description:
      "Blending human versatility and elven grace, Half-Elves excel in adaptability, balancing a life between two worlds. Their charisma and diverse skill set make them natural diplomats and adventurers.",
  },
  {
    name: "Half-Orc",
    description:
      "Combining human tenacity with orcish might, Half-Orcs are fierce warriors marked by their resilience and combat prowess. Their intimidating presence and inner strength make them formidable leaders and fighters.",
  },
  {
    name: "Halfling",
    description:
      "Small and spry, Halflings are eternally optimistic and lucky, bringing joy and courage to any adventuring party. Their resourcefulness and stealth are often underestimated by their larger foes.",
  },
  {
    name: "Harengon",
    description:
      "High-spirited and quick, Harengons are rabbitfolk kin to the Feywild, known for their agility and luck. Their boundless energy and sharp reflexes help them evade dangers and spring into action with ease.",
  },
  {
    name: "Hobgoblin",
    description:
      "Disciplined and martial, Hobgoblins are warlike goblinoids who value strength, hierarchy, and strategic might. Their rigid military structure and tactical brilliance make them formidable foes and commanders.",
  },
  {
    name: "Human",
    description:
      "Versatile and ambitious, Humans are known for their adaptability and the drive to achieve greatness across all endeavors. Their varied cultures and experiences make them the most diverse and influential race.",
  },
  {
    name: "Kalashtar",
    description:
      "Mystically connected to spirits from the Plane of Dreams, Kalashtar are serene and telepathic beings exceptional in psychic abilities. Their spiritual insight often guides them towards a path of peace and enlightenment.",
  },
  {
    name: "Kender",
    description:
      "Inquisitive and fearless, Kender are small humanoids known for their boundless curiosity and lack of fear, often getting into trouble. Their insatiable wanderlust and kleptomaniac tendencies lead to unexpected adventures.",
  },
  {
    name: "Kenku",
    description:
      "Mimicking birds of an eerie nature, Kenku communicate mostly through sounds they've heard, making them excellent spies and charlatans. Their lack of original speech only sharpens their creativity and cunning.",
  },
  {
    name: "Kobold",
    description:
      "Loyal and crafty, Kobolds are small draconic humanoids renowned for their trap-making and cunning tactics. Their pack mentality and ingenuity often compensate for their physical frailty.",
  },
  {
    name: "Leonin",
    description:
      "Proud and fierce, Leonin are lion-like warriors from the plains of Theros, embodying both strength and bravery. Their pride-driven culture values honor, combat prowess, and the defense of their kin.",
  },
  {
    name: "Lizardfolk",
    description:
      "Pragmatic and stoic, Lizardfolk are reptilian beings with a keen survival instinct and a unique view of the world. Their cold logic and resourcefulness make them formidable in both crafting and combat.",
  },
  {
    name: "Loxodon",
    description:
      "Wise and serene, Loxodons are elephantine beings with an unshakable sense of community and calm. Their immense strength and tranquil demeanor make them natural leaders and stalwart guardians.",
  },
  {
    name: "Minotaur",
    description:
      "Fierce and honorable, Minotaurs are powerful bovine humanoids with a labyrinthine sense of strategy and strength. Their warrior culture values strength, honor, and a clear sense of purpose.",
  },
  {
    name: "Orc",
    description:
      "Savage and fierce, Orcs are mighty warriors with a tribal society deeply rooted in strength and conquest. Their relentless aggression and brute force make them feared combatants across many lands.",
  },
  {
    name: "Plasmoid",
    description:
      "Amorphous and adaptable, Plasmoids are sentient ooze creatures capable of shifting their shape and form. Their unique biology grants them extraordinary flexibility and resilience in various environments.",
  },
  {
    name: "Satyr",
    description:
      "Joyful and mischievous, Satyrs are fey creatures embodying the wild revelry and chaos of nature. Their musical talent and carefree spirit often lead them into adventures filled with both danger and delight.",
  },
  {
    name: "Sea Elf",
    description:
      "Graceful and aquatic, Sea Elves are at home in the ocean depths, skilled in swimming and underwater combat. Their connection to the sea and its creatures makes them exceptional sailors and guardians of marine realms.",
  },
  {
    name: "Shadar-Kai",
    description:
      "Dark and elusive, Shadar-Kai are shadowy elves from the Shadowfell, marked by their affinity for necrotic energies and stealth. Their enigmatic presence and mastery of shadow magic make them both feared and revered.",
  },
  {
    name: "Shifter",
    description:
      "Wild and instinctive, Shifters are lycanthropic descendants capable of temporarily enhancing their physical abilities. Their primal nature and versatility make them formidable hunters and survivors.",
  },
  {
    name: "Simic Hybrid",
    description:
      "Genetically enhanced by the Simic Combine, Simic Hybrids are amalgamations of various life forms, possessing unique biological adaptations. Their engineered abilities often grant them unparalleled versatility and strength.",
  },
  {
    name: "Tabaxi",
    description:
      "Nimble and curious, Tabaxi are feline humanoids with an insatiable thirst for knowledge and adventure. Their agility and keen senses make them exceptional explorers and rogues.",
  },
  {
    name: "Thri-Kreen",
    description:
      "Insectoid and enigmatic, Thri-Kreen are mantis-like beings with a hive mentality and natural psionic abilities. Their alien perspective and physical prowess make them both fascinating and formidable.",
  },
  {
    name: "Tiefling",
    description:
      "Marked by infernal heritage, Tieflings are often misunderstood beings with fiendish traits and an affinity for dark magic. Their resilience and charisma often hide a tumultuous inner struggle between good and evil.",
  },
  {
    name: "Tortle",
    description:
      "Calm and contemplative, Tortles are turtle-like humanoids with a deep connection to the earth and sea. Their natural armor and serene outlook make them both sturdy defenders and wise sages.",
  },
  {
    name: "Triton",
    description:
      "Regal and aquatic, Tritons are guardians of the deep, with the ability to command sea creatures and control water. Their noble bearing and dedication to protecting the ocean make them natural leaders.",
  },
  {
    name: "Vedalken",
    description:
      "Logical and meticulous, Vedalken are blue-skinned scholars and inventors with a penchant for perfection. Their analytical minds and passion for knowledge drive them to excel in both arcane and scientific endeavors.",
  },
  {
    name: "Verdan",
    description:
      "Adaptive and ever-changing, Verdan are goblinoid beings blessed with rapid evolution, often shifting in size and abilities. Their mutable nature and curiosity lead them to constantly explore and adapt.",
  },
  {
    name: "Warforgerd",
    description:
      "Created for war but yearning for purpose, Warforged are sentient constructs with a blend of metal and organic material. Their resilience and combat prowess are matched by their quest for identity and meaning.",
  },
  {
    name: "Water Genasi",
    description:
      "Flowing and fluid, Water Genasi are beings with elemental water heritage, granting them control over aquatic environments. Their adaptability and calm demeanor often hide a deep well of power and emotion.",
  },
  {
    name: "Wood-elf",
    description:
      "Swift and reclusive, Wood Elves are forest dwellers with an unparalleled connection to nature and archery. Their agility and stealth make them exceptional scouts and guardians of the wild.",
  },
  {
    name: "Yuan-ti",
    description:
      "Cunning and serpentine, Yuan-ti Purebloods are humanoids with a serpentine heritage, often possessing innate charm and magical abilities. Their secretive and manipulative nature makes them both dangerous and alluring.",
  },
];
export const ALIGNMENT = [
  {
    name: "true good",
    description:
      "They strive to help others without bias or expectation, acting as pure beacons of benevolence in a chaotic world. Their actions seek to create a balance where good flourishes without being restricted by law or thrown into anarchy.",
  },
  {
    name: "Lawful Good",
    description:
      "They are the moral crusaders bound by honor and duty, upholding laws and traditions to champion justice. Every decision reflects a commitment to righteousness tempered by fairness and discipline.",
  },
  {
    name: "chaotic good",
    description:
      "Freedom and kindness fuel their actions, as they believe in breaking down unjust systems to bring about positive change. Their inherently rebellious nature makes them champions for personal liberty and benevolent rebels.",
  },
  {
    name: "true neutral",
    description:
      "Balance is their guiding principle, neither swinging to extremes of good or evil, law or chaos. They act as maintainers of equilibrium, ensuring no side wields too much power.",
  },
  {
    name: "lawful neutral",
    description:
      "Order and structure come above all else, adhering to laws and systems regardless of moral outcomes. They might enforce harsh rules if they believe it will preserve the stability of society.",
  },
  {
    name: "chaotic neutral",
    description:
      "They are wild spirits who value their autonomy above all, acting according to whim and personal desire. Unpredictable and free-spirited, they reject any form of constraint, whether moral or legal.",
  },
  {
    name: "true evil",
    description:
      "Pure self-interest motivates them, as they exploit any opportunity for personal gain without either societal or moral regard. They can be methodical or opportunistic, as long as their own benefit is served.",
  },
  {
    name: "lawful evil",
    description:
      "They wield power through strict hierarchies and oppressive systems, manipulating structures to achieve their own dark ambitions within the bounds of law. Their tyranny is both systematic and devastating.",
  },
  {
    name: "chaotic evil",
    description:
      "They thrive on destruction, unleashing havoc with no regard for rules, order, or the suffering they cause. Their actions are driven by pure malice, making them the embodiment of unbridled chaos and malevolence.",
  },
];

export const BACKGROUND = [
  {
    name: "Arcane Scholar",
    description:
      "You have dedicated your life to the study of the mystical arts, pouring over ancient tomes and manuscripts to unlock the secrets of the arcane. Your deep knowledge of magic makes you a valued and insightful advisor, but also places you amidst the powerful and mysterious shadows of the magical world.",
  },
  {
    name: "City Watch",
    description:
      "As a vigilant member of the city watch, you have spent years patrolling the streets, maintaining law and order, and confronting the dark underbelly of urban life. You're familiar with the rhythms of the city and have developed instincts that help you sense trouble before it starts.",
  },
  {
    name: "Criminal Underworld",
    description:
      "You grew up amidst rogues, thieves, and schemers, learning the tricks of the trade from a young age. The criminal underworld is your home, where you navigate intrigues and shadows with uncanny skill, always seeking the next big score.",
  },
  {
    name: "Dungeon Delver",
    description:
      "Exploring dark, forgotten places filled with ancient traps and treasures is your calling. Your experiences in perilous caverns and ruins have honed your senses and fighting skills, making you an invaluable companion on any adventure.",
  },
  {
    name: "Entertainer Extraordinaire",
    description:
      "With a flair for the dramatic and a talent for captivating audiences, you have performed in taverns and grand theaters alike. Your charisma and stage presence open doors and hearts, making you a beloved figure wherever you go.",
  },
  {
    name: "Far Traveler",
    description:
      "Drawn to distant lands and diverse cultures, you have wandered far from your homeland. Exposure to myriad traditions and languages has made you a repository of exotic knowledge and unique perspectives.",
  },
  {
    name: "Fey-Touched",
    description:
      "Your life has been shaped by the touch of the fey, granting you a mystical connection to the forces of nature and whimsy. This enchantment makes you a conduit of otherworldly magic, influencing fate and fortune in unpredictable ways.",
  },
  {
    name: "Folk Hero",
    description:
      "The people sing songs of your deeds, celebrating you as a savior who stood against tyranny and injustice. Your down-to-earth roots and inspirational presence rally those around you, spurring them to acts of bravery.",
  },
  {
    name: "Guild Artisan",
    description:
      "Mastering a specific trade, you have risen through the ranks of a craftsman’s guild, producing sought-after works of art and utility. Your craftsmanship and business acumen grant you access to a network of influential contacts and patrons.",
  },
  {
    name: "Haunted Survivor",
    description:
      "Having endured a tragic encounter with the supernatural, you bear the scars of your past both physically and mentally. Your ability to sense and understand eerie phenomena makes you a steadfast ally against otherworldly threats.",
  },
  {
    name: "Hermit Mystic",
    description:
      "Years of seclusion have granted you profound wisdom and inner peace, along with an intimate understanding of nature's mysteries. Your insights often provide unique solutions to problems, despite your occasional struggle with social interactions.",
  },
  {
    name: "Knight Errant",
    description:
      "Sworn to uphold chivalry and defend the innocent, you roam the land in search of wrongs to right. Your combat prowess and unwavering sense of honor make you a beacon of hope in troubled times.",
  },
  {
    name: "Mercenary Veteran",
    description:
      "Your past campaigns as a hired soldier have left you with a wealth of battlefield experience and tactical prowess. Your gritty determination and hardened demeanor make you a formidable presence in any fight.",
  },
  {
    name: "Monster Hunter",
    description:
      "Specialized in tracking and confronting fearsome beasts, you have learned the skills and courage necessary to survive against the most dangerous creatures. Your knowledge of monster lore and combat tactics makes you a crucial asset in perilous encounters.",
  },
  {
    name: "Noble Exile",
    description:
      "Once part of the ruling class, you were cast out of your aristocratic life under tragic or unjust circumstances. This fall from grace has hardened your resolve, and you now seek to reclaim your lost honor or forge a new path.",
  },
  {
    name: "Outlander Wanderer",
    description:
      "Raised in the remote wilderness, you possess unparalleled survival skills and a deep kinship with the natural world. Your knowledge of the land’s secrets allows you to navigate and thrive in terrain where others would falter.",
  },
  {
    name: "Sage Scholar",
    description:
      "With a voracious appetite for knowledge, you have pored over countless volumes in pursuit of understanding. Your encyclopedic mind and analytical skills often provide crucial information and insights in times of need.",
  },
  {
    name: "Sailor of the High Seas",
    description:
      "The call of the ocean has guided you through many adventures on the tumultuous waves. Your seafaring skills and familiarity with maritime lore help you navigate both the literal and metaphorical storms you encounter.",
  },
  {
    name: "Street Urchin",
    description:
      "Growing up in the alleys and backstreets, you have learned to survive by your wits and agility. The urban sprawl is your playground, where you evade danger and seize opportunities amidst poverty and crime.",
  },
  {
    name: "Explorer of the Unknown",
    description:
      "Driven by insatiable curiosity, you embark on expeditions to uncover the secrets of uncharted lands. Your experiences on the edges of known civilization equip you with invaluable knowledge and resilience.",
  },
  {
    name: "Lost Heir",
    description:
      "A twist of fate has hidden your true lineage, leaving you in search of your rightful place and heritage. Your quest for identity and belonging fuels your journey, uncovering secrets about both your past and your future.",
  },
  {
    name: "Shadow Agent",
    description:
      "Skilled in espionage and subterfuge, you operate in the shadows, gathering secrets and manipulating events from behind the scenes. Your covert actions have far-reaching impacts, even as you remain an enigma to most.",
  },
  {
    name: "Spiritual Guide",
    description:
      "With a deep connection to the divine or the spiritual realm, you offer wisdom and comfort to those seeking enlightenment. Your guidance is often sought in matters of faith, morality, and the unseen forces shaping the world.",
  },
  {
    name: "Wilderness Scout",
    description:
      "As a seasoned scout, you are adept at navigating and surviving the wilds, often serving as the eyes and ears of your group. Your expertise in tracking, foraging, and stealth makes you an indispensable guide in untamed regions.",
  },
];

export const CLASSES = [
  {
    name: "Artificer",
    description:
      "Innovators and tinkerers, Artificers blend magic with technology to create astonishing gadgets and potent magical items. From arcane grenades to mechanical companions, their ingenuity turns the tide of any battle.",
  },
  {
    name: "Barbarian",
    description:
      "Fueled by primal fury, Barbarians unleash devastating power and unmatched resilience in combat. Their rage makes them the eye of any storm, shrugging off blows that would fell lesser warriors.",
  },
  {
    name: "Bard",
    description:
      "Masters of music and magic, Bards weave enchanting melodies and stirring tales to inspire allies and befuddle foes. Their versatile spellcasting and charismatic presence bring both joy and chaos to any adventure.",
  },
  {
    name: "Blood Hunter",
    description:
      "Driven by dark pacts and intense discipline, Blood Hunters use hemocraft—blood magic—to hunt monstrous threats. These warriors sacrifice their own vitality to gain supernatural abilities and take down evil from within and without.",
  },
  {
    name: "Cleric",
    description:
      "Divine agents of the gods, Clerics heal, protect, and smite with holy power. Their prayers are answered by miracles, making them indispensable spiritual and martial champions against darkness.",
  },
  {
    name: "Druid",
    description:
      "Guardians of the natural world, Druids call upon the primal forces of nature to cast spells and shapeshift into beasts. Their symbiosis with the environment makes them versatile adventurers and formidable foes.",
  },
  {
    name: "Fighter",
    description:
      "Masters of weaponry and tactics, Fighters are the backbone of any combat scenario. Whether as nimble duelists or heavily armored juggernauts, their martial prowess dominates the battlefield.",
  },
  {
    name: "Monk",
    description:
      "Embodying the spirit of perfection and discipline, Monks harness their ki to perform incredible physical feats. Their mastery of martial arts allows them to strike with blinding speed and evade even the most lethal attacks.",
  },
  {
    name: "Paladin",
    description:
      "Sworn to an oath, Paladins combine martial skill with divine magic to uphold justice and fight evil. Their sacred vows grant them miraculous powers and a relentless drive to protect the innocent and punish the wicked.",
  },
  {
    name: "Ranger",
    description:
      "Expert trackers and survivalists, Rangers thrive in the wilds and bring down foes with deadly precision. Their magical bond with nature, along with their combat prowess, makes them formidable scouts and warriors.",
  },
  {
    name: "Rogue",
    description:
      "Stealthy and cunning, Rogues excel in sneaking, thievery, and striking from the shadows. Their guile and agility allow them to outmaneuver foes and deliver devastating, precise attacks.",
  },
  {
    name: "Sorcerer",
    description:
      "Innately gifted with arcane power, Sorcerers unleash wild magic or refined spells straight from their bloodline. Their raw magical talent makes them unpredictable but incredibly powerful spellcasters.",
  },
  {
    name: "Warlock",
    description:
      "Bounded by a pact with otherworldly entities, Warlocks wield arcane powers and dark secrets in exchange for servitude. Their unique connection grants them mysterious and formidable spellcasting abilities.",
  },
  {
    name: "Wizard",
    description:
      "Scholarly spellcasters of unmatched versatility, Wizards accumulate arcane knowledge to cast a vast array of powerful spells. Their deep understanding of magic makes them formidable and adaptable arcane masters.",
  },
];

export const PERSONALITIES = {
  personality: [
    "Adventurous",
    "Brave",
    "Charismatic",
    "Diplomatic",
    "Enigmatic",
    "Sociable",
    "Honorable",
    "Inquisitive",
  ],
  ideal: [
    "Freedom",
    "Harmony",
    "Justice",
    "Knowledge",
    "Power",
    "Tradition",
    "Unity",
    "Victory",
  ],
  bond: [
    "Family",
    "Honor",
    "Loyalty",
    "Redemption",
    "Revenge",
    "Service",
    "Solitude",
    "Treasure",
  ],
  flaw: [
    "Addiction",
    "Cleptomania",
    "Greed",
    "Impulsive",
    "Jealousy",
    "Paranoia",
    "Recklessness",
    "Temptation",
  ],
};

export const EQUIPMENTS = {
  weapon: [
    "Battered Dagger",
    "Rusty Handcannon",
    "Wooden Hammer",
    "Wooden Bow",
    "Novice Wand",
    "Wooden club",
    "Battered Axe",
    "Staff",

  ],
  secondaryweapon: [
    "Shield",
    "foldable ladder",
    "Cleric symbol",
    "War drum",
    "Tarot deck",
    "Book of shadows",
    "Harp",
    "Fishing rod",
  ],
  armour: ["no armor", "cloth armor", "wooden armor", "leather armor", "plate armor"],
  "tool&ammo": [
    "horse",
    "thieves tools",
    "health potion",
    "simple compass",
    "animal bait",
    "herbalism kit",
    "disguise kit",
    "holy water",
  ],
};

export const INITIAL_CHARACTER = {
  race: {
    name: RACE[0].name,
    description: RACE[0].description,
    gender: RACE_GENDER[0],
  },
  class: {
    name: CLASSES[0].name,
    description: CLASSES[0].description,
  },
  abilities: {
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8,
  },
  background: {
    name: BACKGROUND[0].name,
    description: BACKGROUND[0].description,
  },
  personality: {
    ideal: selectRandom(PERSONALITIES.ideal),
    bond: selectRandom(PERSONALITIES.bond),
    personality: selectRandom(PERSONALITIES.personality),
    flaw: selectRandom(PERSONALITIES.flaw),
  },
  alignment: {
    name: ALIGNMENT[0].name,
    description: ALIGNMENT[0].description,
  },
  equipment: {
    weapon: selectRandom(EQUIPMENTS.weapon),
    secondary: selectRandom(EQUIPMENTS.secondaryweapon),
    armor: selectRandom(EQUIPMENTS.armour),
    "tool&ammo": selectRandom(EQUIPMENTS["tool&ammo"]),
  },
  gold: null,
  name: "",
  pointsToSpend: 27,
};
export const dummy = {
  race: {
    name: "Arakocra",
    gender: "female",
  },
  class: "Barbarian",
  abilities: {
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8,
  },
  background: "Dungeon Delver",
  personality: {
    ideal: "freedom",
    bond: "family",
    personality: "Adventurous",
    flaw: "addiction",
  },
  alignment: "true good",
  equipment: {
    weapon: "Battered Dagger",
    secondary: "shield",
    armor: "cloth armor",
    "tool&ammo": "wooden arrows",
  },
  gold: 50,
  name: "Character",
};
