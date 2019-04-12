
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../scraper/database.db'
});

const musicStruct = {
    id: { type: Sequelize.NUMBER, primaryKey: true },
    name: Sequelize.TEXT,
    artist: Sequelize.TEXT,
    link: Sequelize.TEXT,
    chords: Sequelize.JSON
};

const Todos = sequelize.define('todos', {...musicStruct}, {
    timestamps: false,
    tableName: 'todos'
})

const Alternativo = sequelize.define('alternativo', {...musicStruct}, {
    timestamps: false,
    tableName: 'alternativo'
})

const Rock = sequelize.define('rock', {...musicStruct}, {
    timestamps: false,
    tableName: 'rock'
})

const Samba = sequelize.define('samba', {...musicStruct}, {
    timestamps: false,
    tableName: 'samba'
})

const Pop = sequelize.define('pop', {...musicStruct}, {
    timestamps: false,
    tableName: 'pop'
})

const PopRock = sequelize.define('poprock', {...musicStruct}, {
    timestamps: false,
    tableName: 'poprock'
})

const Axe = sequelize.define('axe', {...musicStruct}, {
    timestamps: false,
    tableName: 'axe'
})

const Bossa = sequelize.define('bossa_nova', {...musicStruct}, {
    timestamps: false,
    tableName: 'bossa_nova'
})

const db = {
    sequelize,
    types: {
        Todos,
        Bossa,
        Alternativo,
        Rock,
        Samba,
        Pop,
        PopRock,
        Axe,
    }
}

module.exports = db;

