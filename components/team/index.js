const { OralceConnector } = require('../oracle-connector')

class Team extends OralceConnector{
    constructor(){
        // Call parent class's constructor
        super();
    }

    async get_team_count(){
        const sql = "SELECT COUNT(*) FROM team_info";
        return this.execute(sql);
    }

    async get_team_list(){
        const sql = "SELECT ROWNUM as seqnum, team_info.* FROM team_info";
        return this.execute(sql);
    }

    async get_team_list_pagination(pagination_start,unit=10){
        // const sql = "SELECT * FROM (SELECT ROWNUM as seqnum,team_info.* FROM team_info) WHERE seqnum BETWEEN :range_start AND :range_end";
        const sql = "SELECT * FROM team_info OFFSET :range_start ROWS FETCH NEXT :unit ROWS ONLY";
        const bucket = {
            range_start : pagination_start,
            unit: unit
        };
        return this.execute(sql,bucket);
    }

    async get_team_stadium(teamid){
        const sql = "SELECT stadiumname FROM team_homeground WHERE teamid=:teamid";
        const bucket = {
             teamid
        }
        return this.execute(sql,bucket);
    }

    async get_team_individual(teamid){
        const sql = "SELECT * FROM team_info WHERE teamid=:teamid";
        const bucket = {
            teamid
        }
        return this.execute(sql,bucket);
    }

    async get_team_players_count(teamid){
        const sql = "SELECT count(*) FROM player_info WHERE teamid=:teamid";
        const bucket = {
            teamid
        }
        return this.execute(sql,bucket);
    }
    
    async get_team_players_list(teamid){
        const sql = "SELECT * FROM player_info WHERE teamid=:teamid";
        const bucket = {
            teamid
        }
        return this.execute(sql,bucket);
    }

    async get_team_players_pagination(teamid,pagination_start,unit=10){
        // const sql = "SELECT * FROM (SELECT ROWNUM as seqnum, player_info.* FROM player_info) WHERE seqnum BETWEEN :range_start AND :range_end";
        const sql = "SELECT * FROM (SELECT * FROM player_info WHERE teamid=:teamid) OFFSET :range_start ROWS FETCH NEXT :unit ROWS ONLY";
        const bucket = {
            teamid,
            range_start : pagination_start,
            unit
        }
        return this.execute(sql,bucket);
    }
}

module.exports = Team;