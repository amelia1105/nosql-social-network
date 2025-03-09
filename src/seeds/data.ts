export const getRandomUsers = (num: number) => {
  const users = [];
  const usernames = ['ninjaCoder', 'deltaForce', 'webDevGuru', 'codingMaster', 'superStar', 'codeKid'];
  const emails = ['coder@gmail.com', 'dev@yahoo.com', 'guru@aol.com', 'master@hotmail.com', 'awesomecoder@outlook.com'];

  for (let i = 0; i < num; i++) {
      const username = usernames[i % usernames.length];
      const email = emails[i % emails.length];
      users.push({ username, email });
  }

  return users;
};

export const getRandomThoughts = (num: number) => {
  const thoughts = [];
  const sampleThoughts = ['Just learned something new!', 'Feeling great today!', 'Having fun coding.', 'Feeling awesome.', 'Feeling excited about this project.', 'Feeling accomplished.'];

  for (let i = 0; i < num; i++) {
      thoughts.push(sampleThoughts[i % sampleThoughts.length]);
  }

  return thoughts;
};

export const getRandomReactions = (num: number) => {
  const reactions = ['🤩', '😎', '😂', '😍', '😭', '😡', '😱'];
  const reactionUsernames = ['ninjaCoder', 'deltaForce', 'webDevGuru', 'codingMaster', 'superStar', 'codeKid'];

  const randomReactions = [];
  for (let i = 0; i < num; i++) {
      const reactionBody = reactions[Math.floor(Math.random() * reactions.length)];
      const username = reactionUsernames[Math.floor(Math.random() * reactionUsernames.length)];
      randomReactions.push({
          reactionBody,
          username,
          createdAt: new Date()
      });
  }

  return randomReactions;
};
