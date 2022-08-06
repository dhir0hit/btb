db.users.insertOne({
    username:"admin",
    password:"admin123",

    profilePic:"1",

    firstName:"ad",
    lastName:"min",

    phoneNumber:"1234567890",
    email:"admin@mail.com",

    address1:"Sample address1",
    address2:"Sample address2",
    city:"Sample City",
    province:"Sample province",
    postalCode:"A1A1A1",

    ///* can edit or not */
    businessAccount:true,

    cart: []
})

db.products.insertOne({
    id:1,
    name:"Zilcremo Women 2022 Summer Sleeveless Dress Casual V Neck Loose Split Tshirt Long Dresses",
    productType:"Dress",
    brandName:"Zilcremo",
    features:["Deep V neck","sleeveless design for more cool feeling", "side split"],
    price: 26.99,
    stock:7,
    review:[4.4],
    tags:["Zilcremo","Women 2022 ","Summer Sleeveless Dress","Casual V Neck","Tshirt Long Dresses"]
})
db.products.insertOne({
    id:2,
    name:"ASUS VivoBook 15 X515 Thin and Light Laptop",
    productType:"Laptop",
    brandName:"ASUS",
    features:["Powerful Intel Pentium Silver N5030 Processor 1.1GHz (4M Cache, up to 3.1 GHz, 4 cores) and Intel UHD Graphics 605.VGA Camera"],
    price: 396.81,
    stock:7,
    review:[4.8],
    tags:["ASUS"," VivoBook"," 15 X515 Thin and Light Laptop"]
})
db.products.insertOne({
    id:3,
    name:"Under Armour Mens Rival Fleece Full Zip Hoodie Zip Up Sweatshirt",
    productType:"Hoodies&Sweatshirts",
    brandName:"Under Armour",
    features:["20% polyester", "Fit: regular", "Style: full-zip", "Hood: drawstring"],
    price: 32.99,
    stock:10,
    review:[5],
    tags:["Under Armour"," Mens","Rival Fleece Full Zip Hoodie", "Zip Up SweatShirt"]
})
db.products.insertOne({
    id:4,
    name:"adidas Womens Vario Sport Running Shoe",
    productType:"Fashion Sneakers",
    brandName:"Adidas",
    features:["Regular Fit", "brand with 3 Stripes"],
    price: 69.99 ,
    stock:8,
    review:[2.0],
    tags:["adidas","Womens","Vario Sport", "Running Shoe"]
})
db.products.insertOne({
    id:5,
    name:"River of the Gods: Genius, Courage, and Betrayal in the Search for the Source of the Nile Hardcover – May 17 2022",
    productType:"Books",
    brandName:"Candice Millard",
    features:["The harrowing story of one of the great feats of exploration of all time and its complicated legacy", "from the New York Times bestselling author of The River of Doubt and Destiny of the Republic"],
    price: 39.07 ,
    stock:4,
    review:[4.7],
    tags:["River of the Gods"," Genius","Courage", "Betrayal ","Search for the Source", "Nile Hardcover"]
})
db.products.insertOne({
    id:6,
    name:"Smart Watch for Android and iOS Phone",
    productType:"Smart Watch",
    brandName:"IFOLO",
    features:["Alarm Clock", "Pedometer", "Waterproof", "Activity Fitness Tracker Heart Rate Sleep Monitor"],
    price: 47.99 ,
    stock:6,
    review:[2.6],
    tags:["Smart Watch","Android ","iOS Phone"]
})
db.products.insertOne({
    id:7,
    name:"Hamilton Beach Juicer Machine",
    productType:"Juicer",
    brandName:"Hamilton",
    features:["Easy to Clean", "Centrifugal Extractor", "800W Motor", "BPA Free", "Stainless Steel"],
    price: 106.75 ,
    stock:3,
    review:[1.9],
    tags:["Hamilton Beach","Juicer ","Machine"]
})
db.products.insertOne({
    id:8,
    name:"Innsky 10.6 Quart Air Fryer Oven with Rotisserie & Dehydrator",
    productType:"Air Fryer",
    brandName:"Innsky",
    features:["Original Design - Space & Energy Saving", "Versatile All-in-1 Machine", "Healthy but Delicious Lifestyle", "Extra Accessories for More Cooking Options"],
    price: 159.99,
    stock:3,
    review:[3.9],
    tags:["Innsky 10.6 Quart"," Air Fryer ","Oven with Rotisserie & Dehydrator"]
})
db.products.insertOne({
    id:9,
    name:"Amazon Fire TV 55 4-Series 4K UHD smart TV",
    productType:"Television",
    brandName:"Amazon",
    features:["Brilliant 4K entertainment", "Scenes that leap off the screen", "Fire TV Alexa Voice Remote", "Connect all your devices"],
    price: 509.99 ,
    stock:2,
    review:[5.0],
    tags:["Amazon","Fire TV 55 4","Series 4K UHD smart TV"]
})
db.products.insertOne({
    id:10,
    name:"Gotrax Folding Electric Bike 16 - 15.5MPH & 27.9 Mile Range",
    productType:"Bikes",
    brandName:"Gotrax",
    features:["ALL New Folding E-Bike by GOTRAX", "Up to 27.9 Miles per charge", "Compact Folding Design ", "Control at Your Fingertips"],
    price: 899.99 ,
    stock:5,
    review:[4.5],
    tags:["Gotrax","Folding Electric Bike","27.9 Mile Range"]
})
db.products.insertOne({
    id:11,
    name:"Spikeball Game Set",
    productType:"Outdoor Games & Activities",
    brandName:"Spikeball",
    features:["Drawstring Bag", "Rule Book", "EASY TO LEARN "],
    price: 69.99 ,
    stock:7,
    review:[3.6],
    tags:["Spikeball ","Game Set"]
})
db.products.insertOne({
    id:12,
    name:"LEGO City Police Car 60312 Building Kit for Kids Aged 5 and Up",
    productType:"Toys&Games",
    brandName:"LEGO",
    features:["Building toy for imaginative play", "Play on the go ", "A fun anytime gift"],
    price: 12.67 ,
    stock:7,
    review:[3.7],
    tags:["LEGO City Police Car ","Building Kit for Kids"]
})
db.products.insertOne({
    id:13,
    name:"GREENIES Dog Treats Original REGULAR Natural Dental Care",
    productType:"Pet Supplies",
    brandName:"Greenies",
    features:["Chewy texture cleans teeth", "GREENIES Dental Treats for Dogs are veterinarian recommended for dental care"],
    price: 44.64,
    stock:16,
    review:[4.1],
    tags:["GREENIES Dog Treats","REGULAR Natural Dental Care"]
})
db.products.insertOne({
    id:14,
    name:"Tetra Aquarium Kit with Waterfall",
    productType:"Pet Supplies",
    brandName:"Tetra",
    features:["Small Fish Tank: 1.8 Gallon", "pump-driven filter", "small Bio-Bag", "Include LED Lights"],
    price: 169.15 ,
    stock:7,
    review:[4.2],
    tags:["Tetra","Aquarium Kit with Waterfall"]
})
db.products.insertOne({
    id:15,
    name:"ID IDAODAN Electric Balloon Pump Portable Blue Dual Nozzle Electric Air Balloon Blower Pump",
    productType:"Party Supplies",
    brandName:"ID IDAODAN",
    features:["Light Weight & Portable", "Fast & Efficient", "Item Specification"],
    price: 29.99 ,
    stock:20,
    review:[5.0],
    tags:["ID IDAODAN","Electric Balloon Pump","Portable Blue Dual Nozzle Electric Air Balloon Blower Pump"]
})
db.products.insertOne({
    id:16,
    name:"Webber Naturals Turmeric Curcumin",
    productType:"Herbal Supplements",
    brandName:"Webber Natural Stores",
    features:["Natural Joint Stiffness Relief", "Inflammation", "Indigestion Relief"],
    price: 11.37,
    stock:7,
    review:[3.6],
    tags:["Webber Naturals","Turmeric"," Curcumin"]
})
db.products.insertOne({
    id:17,
    name:"Ray-Ban RB3447 Metal Round Sunglasses",
    productType:"Glasses",
    brandName:"Ray-Ban Store",
    features:["Rx-able Lenses", "product of meticulous"],
    price: 160.46,
    stock:5,
    review:[2.8],
    tags:["Ray-Ban"," RB3447","Metal Round ","Sunglasses"]
})
db.products.insertOne({
    id:18,
    name:"Novation Bass Station II Analog Mono-Synth",
    productType:"Keyboard",
    brandName:"Novation",
    features:["Analog synth layout", "brand new version of the classic Novation Bass Station"],
    price: 699,
    stock:5,
    review:[1.9],
    tags:["Novation","Bass Station","Analog ","Mono-Synth"]
})
