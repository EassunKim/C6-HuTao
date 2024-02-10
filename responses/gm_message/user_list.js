const gmUser = require('./user_class');


const users = [
    new gmUser( //Todd
        'todd',
        '254436057087606786',
        ["1.webp","2.webp","3.webp","4.webp", "5.webp", "furina_pic.jpg"],
        'Good Morning Todd!! Did you take your vitamins today?'
    ),

    new gmUser( //fgsky
        'fgsky',
        '97116639727738880',
        ['cyno.jpg'],
        "Good morning FGSky these vitamins aren't going to take themselves"
    ),

    new gmUser( //jooah
        'jooah',
        '687452592745349152',
        ['yuka.webp'],
        "Good morning Jooah~ your breakfast is on the way!"
    ),

    new gmUser( //kyle
        'kyle',
        '478973799145013258',
        ['nunu.gif'],
        "gm kyle lets drift"
    ),

    new gmUser( //matt
        'matt',
        '1160719966551687199',
        ['1.webp'],
        "gmm"
    ),

];

module.exports = users;