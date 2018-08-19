import { Meteor } from 'meteor/meteor';

import { Episodes } from 'imports/collections/episodes';

Meteor.publish('episodes', function() {

  return Episodes.find({});
});