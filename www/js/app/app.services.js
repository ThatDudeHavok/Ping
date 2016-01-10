// Add services into this file

angular.module('Ping.app.services', [])

.factory('FriendsList', function() {
  var FriendsList = [];

  return FriendsList;
})

.factory('MessageTpls', function() {

  var tpls = [
  
    {
      tpl: '       _,'
    + '\n    .-\'_|    ,'
    + '\n   _| (_|   _|\\'
    + '\n  (_|      (_|',
      keywords: ['music', 'musical', 'notes', 'song']
    },
    {

      tpl: '( •_•)σ',
      keywords: ['poke']
    },
    {

      tpl: '(╯°□°)╯ ︵ ┻━┻ ',
      keywords: ['rage', 'flip', 'table']
    },
    {

      tpl: '─────────▄▀▀█'
      + '\n─────▄▄▀▀──▄▀'
      + '\n▄▄▄▀▀───▀▀▀▀▀▀▀▀▀▀▀▀▀▀▄'
      + '\n█───────────▄▄▄▄▄▄▄▄▄▄▀'
      + '\n█───────────────█'
      + '\n█───────────▀▀▀█'
      + '\n█──────────▄▄▄▄▀'
      + '\n▀▀▀▄▄▄▄▄▄▄▄▄─▄▀',
      keywords: ['hand', 'poke']
    },
    {

      tpl: '[̲̅P̲̅][̲̅o̲̅][̲̅k̲̅][̲̅e̲̅]',
      keywords: ['poke']
    }

  ];

  //tpls.map((e) => console.log(e.tpl));

  return tpls;
});
