import {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLObjectType
} from 'graphql';

import {
  UserDefinitionBase
} from './user';

var MeDefinitionExtension = {
  privateTracksCount: {
    type: GraphQLInt,
    description: 'The number of private tracks the current user owns.',
    resolve: (me) => me.private_tracks_count
  },
  privatePlaylistsCount: {
    type: GraphQLInt,
    description: 'The number of playlists the current user owns.',
    resolve: (me) => me.private_playlists_count
  },
  primaryEmailConfirmed: {
    type: GraphQLBoolean,
    description: 'Whether the user\'s primary email has been confirmed.',
    resolve: (me) => me.primary_email_confirmed
  }
};

var MeType = new GraphQLObjectType({
  name: 'Me',
  description: 'The current user, if authenticated. Otherwise, an error.',
  fields: () => (Object.assign({}, UserDefinitionBase, MeDefinitionExtension))
});

export default MeType;
