/**
* Site.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  autoPK: false,
  attributes: {
    id:{
      type:'string',
      primaryKey: true,
      required:true
    },
    link:{
      type:'string',
      //required:'true'
    },
    image:{
      type:'string',
      defaultsTo: 'Logo not available'
    },
    upvotes:{
      type:'string',
      defaultsTo:'0'
    },
    thoughts:{
      collection:'thought',
      via:'reference'
    }
  }
};

