const prompts = require('prompts');

const questions = [
    {
      type: 'text',
      name: 'query',
      message: 'Enter a search query:'
    },
    {
      type: 'number',
      name: 'amount',
      message: 'How many images would you like to download?'
    },
    {
      type: 'text',
      name: 'dir',
      message: 'Where should the images be saved?'
    },
    {
        type: 'text',
        name: 'prefix',
        message: 'Give your images a prefix:'  
    }
  ];
   
(async () => {
    console.clear();
    const responses = await prompts(questions);
    require('./index.js')(responses);
})();