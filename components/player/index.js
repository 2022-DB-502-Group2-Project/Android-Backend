const { OralceConnector } = require('../oracle-connector')

class Players extends OralceConnector{
    constructor(){
        // Call parent class's constructor
        super();
    }

    async get_player_count(){
        const sql = "SELECT COUNT(*) FROM player_info";
        return this.execute(sql);
    }
    
    async get_player_list_all(){
        const sql  ="SELECT ROWNUM, player_info.* FROM player_info";
        return this.execute(sql);
    }

    async get_player_list_pagination(pagination_start,unit=10){
        // const sql = "SELECT * FROM (SELECT ROWNUM as seqnum, player_info.* FROM player_info) WHERE seqnum BETWEEN :range_start AND :range_end";
        const sql = "SELECT * FROM player_info OFFSET :range_start ROWS FETCH NEXT :unit ROWS ONLY";
        const bucket = {
            range_start : pagination_start,
            unit: unit
        };
        return this.execute(sql,bucket);
    }

    async get_team_name(teamid){
        const sql = "SELECT teamname FROM team_info WHERE teamid=:teamid";
        const bucket = {
            teamid
        }
        return this.execute(sql,bucket)
    }

    async get_player_list_individual(playerid){
        const sql = "SELECT * FROM player_info WHERE playerid=:playerid";
        const bucket = {
            playerid
        }
        return this.execute(sql,bucket);
    }
}

module.exports = Players