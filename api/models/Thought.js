/**
* Thought.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    body:{
      type:'string',
      required:true
    },
    author:{
      type:'string',
      defaultsTo: 'Anonymous'
  },
     upvotes:{
      type:'string',
      defaultsTo:'0'
    },
    reference:{
      model:'site'
    }

  }
};

