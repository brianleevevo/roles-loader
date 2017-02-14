const roles = [
  // TEMPLATE ROLES
  'template-admin',
  'template-contentprovider',
  'template-label',
  'template-editor',
  'template-marketing',

  // FEED ROLES
  'feed-admin',
  'feed-read',
  'feed-write',

  // FEATURED ROLES
  'featured-admin',
  'featured-read',
  'featured-write',

  // TASTEMAKER ROLES
  'tastemakers-admin',
  'tastemakers-read',
  'tastemakers-write',

  // VIDEO ROLES
  'videos-admin',
  'videos-read',
  'videos-write',
  'videos-overview-admin',
  'videos-overview-read',
  'videos-overview-write',
  'videos-overview-shortlink-read',
  'videos-overview-shortlink-write',
  'videos-metadata-admin',
  'videos-metadata-read',
  'videos-metadata-write',
  'videos-image-admin',
  'videos-image-read',
  'videos-image-write',
  'videos-clip-admin',
  'videos-clip-read',
  'videos-clip-write',
  'videos-policy-admin',
  'videos-policy-write',
  'videos-policy-read',
  'videos-videosource-admin',
  'videos-videosource-read',
  'videos-videosource-write',

  // ARTIST ROLES
  'artists-admin',
  'artists-read',
  'artists-write',
  'artists-disable',
  'artists-delete',
  'artists-account-admin',
  'artists-account-read',
  'artists-account-write',
  'artists-image-account',
  'artists-image-read',
  'artists-image-write',
  'artists-video-read',
  'artists-tour-read',

  // PLAYLIST ROLES
  'playlists-admin',
  'playlists-read',
  'playlists-write',
  'playlists-global-admin',
  'playlists-global-write',
  'playlists-global-read',
  'playlists-featured-read',
  'playlists-featured-write',
  'playlists-featured-admin',
  'playlists-shows-read',
  'playlists-shows-write',
  'playlists-shows-admin',
  'playlists-shortlink-read',
  'playlists-shortlink-write',

  // PREMIERE ROLES
  'premieres-admin',
  'premieres-read',
  'premieres-write',

  // VANITY URL ROLES
  'vanityurl-admin',
  'vanityurl-read',
  'vanityurl-write',

  // CONTENT PROVIDER ROLES
  'contentproviders-admin',
  'contentproviders-read',
  'contentproviders-write',

  // YOUTUBE ROLES
  'youtube-admin',
  'youtube-read',
  'youtube-write',

  // USER ADMIN ROLE
  'users-admin'
];

const constantsFromArray = (roles, prefix = 'cms-') =>
  roles.reduce((acc, role) =>
    Object.assign({ [`${role}`.toUpperCase().replace(/[-]/g, '_')]: prefix + role }, acc)
  , { });

export default constantsFromArray(roles);
