
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    titulo: DataTypes.STRING,
    artista: DataTypes.STRING,
    genero: DataTypes.STRING,
    album: DataTypes.STRING,
    albumImagenUrl: DataTypes.STRING,
    youtubeId: DataTypes.STRING,
    letra: DataTypes.TEXT,
    tab: DataTypes.TEXT
  })

  return Song
}
