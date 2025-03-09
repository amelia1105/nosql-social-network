const usernames = [
'user123',
'coolguy',
'techgal',
'coder123',
'devwizard',
'hackerqueen',
'ninjaCoder',
'proGamer',
'alphaTester',
'betaUser',
'charlieDev',
'deltaForce',
'echoCoder',
'foxtrotDev',
'golfHacker',
'hotelTech',
'indiaCoder',
'julietDev',
'kiloHacker',
'limaTech',
'mikeCoder',
'novemberDev',
'oscarHacker',
'papaTech',
'quebecCoder',
'romeoDev',
'sierraHacker',
'tangoTech',
'uniformCoder',
'victorDev',
'whiskeyHacker',
'xrayTech',
'yankeeCoder',
'zuluDev'
];

const thoughts = [
  'I love coding!',
  'I am a coding wizard!',
  'JavaScript is awesome!',
  'TypeScript makes coding so much better!',
  'I enjoy solving complex problems.',
  'Debugging is like being a detective.',
  'Learning new programming languages is fun!',
  'I love contributing to open source projects.',
  'Coding challenges keep my skills sharp.',
  'Pair programming is a great way to learn.',
  'I enjoy building web applications.',
  'Refactoring code makes it cleaner and more efficient.',
  'Unit tests are essential for reliable code.',
  'I love the feeling of solving a tough bug.',
  'Code reviews help improve code quality.',
  'Continuous integration is a game changer.',
  'I enjoy working with APIs.',
  'Version control with Git is a must.',
  'I love automating repetitive tasks.',
  'Writing clean code is important.',
  'I enjoy learning about new technologies.',
  'Coding is both an art and a science.',
];

const reactions = [
  '😆',
  '😂',
  '😍',
  '🤩',
  '🥳',
  '🤓',
  '😎',
  '🤯',
];

// Get a random item given an array
const getRandomArrItem = (arr: any) => arr[Math.floor(Math.random() * arr.length)];

// Get a random username
export const getRandomUsername =() =>
  `${getRandomArrItem(usernames)} ${getRandomArrItem(usernames)}`;

// Generate random thoughts that we can add to user object
export const getRandomThoughts = (int: number) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push(getRandomArrItem(thoughts));
  }
  return results;
};

// Generate random friends that we can add to user object
export const getRandomFriends = (int: number, currentUser: string) => {
  const results: string[] = [];
  while (results.length < int) {
    const friend = getRandomUsername();
    if (friend !== currentUser && !results.includes(friend)) {
      results.push(friend);
    }
  }
  return results;
};

// Generate random reactions that we can add to thought object
export const getRandomReactions = (int: number) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push(getRandomArrItem(reactions));
  }
  return results;
}