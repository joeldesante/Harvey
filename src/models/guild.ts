import { DataTypes, type InferAttributes, type InferCreationAttributes, Model, type Sequelize } from 'sequelize';

class Guild extends Model<InferAttributes<Guild>, InferCreationAttributes<Guild>> {
    declare guildId: string;
}

const GuildModelInit = (sequelize: Sequelize) => {
    Guild.init({
        guildId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Guild'
    });
};

export { Guild, GuildModelInit };