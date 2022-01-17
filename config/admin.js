module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '03444de6ac81654a576f437ac1c524ea'),
  },
});
