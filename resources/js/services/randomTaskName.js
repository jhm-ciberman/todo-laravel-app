const tasks = [
    'Bake world\'s largest cookie',
    'Swim with dolphins',
    'Invent time travel',
    'Visit Hogwarts',
    'Conduct a tea party for stuffed animals',
    'Choreograph a dance number for squirrels',
    'Collect all 7 dragon balls',
    'Write a novel with my feet',
    'Lead the marching band as a Darth Vader impersonator',
    'Build a lifesize gingerbread house',
    'Direct a stage musical about socks',
    'Learn to yodel',
    'Become a professional chocolate taste tester',
    'Take a selfie with Bigfoot',
    'Host a slumber party for aliens',
    'Start my own Bakugan collection',
    'Collect the Infinity Stones',
    'Adopt a flock of chickens',
    'Organize the world\'s largest tickle fight',
    'Invent a rainbow machine',
    'Become a professional bubble wrap popper',
    'Learn to speak whale',
    'Buy a pet unicorn',
    'Desmytify the Loch Ness Monster',
];

export function getRandomTaskName() {
    return tasks[Math.floor(Math.random() * tasks.length)];
}
